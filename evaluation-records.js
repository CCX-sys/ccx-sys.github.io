(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EvalRecords=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const dimensions=['建筑理解能力','建筑视觉生成','建筑动画能力','任务执行完成度','多轮修改能力'];
  const clone=r=>JSON.parse(JSON.stringify(r));
  const validSide=side=>side==='A'||side==='B';
  function target(record,mode='manual'){if(!['manual','ai'].includes(mode))throw new Error('评分类型无效');return mode==='ai'?record.ai:record;}
  function checkPosition(side,index){if(!validSide(side)||!Number.isInteger(index)||index<0||index>=dimensions.length)throw new Error('评分对象或维度无效');}
  function createRecord(caseId,seed){
    if(typeof caseId!=='string'||!caseId)throw new Error('案例无效');
    const empty=()=>({scores:{A:Array(5).fill(null),B:Array(5).fill(null)},reasons:{A:Array(5).fill(''),B:Array(5).fill('')},source:'display-draft'});
    let out={caseId,rubricVersion:'1.7',dimensionSet:seed?(seed.dimensionSet||'legacy-agent'):'video-task-completion',...empty(),ai:{...empty(),note:''},preference:null,note:'',issues:[],status:'draft',updatedAt:null};
    if(seed){
      for(const mode of ['manual','ai'])for(const side of ['A','B'])for(let i=0;i<5;i++){
        const input=mode==='ai'?(seed.ai||seed):seed;
        out=setScore(out,side,i,input.scores[side][i],mode);
        out=setReason(out,side,i,input.reasons[side][i],mode);
      }
      out=setPreference(out,seed.preference??null);out.note=seed.note||'';out.ai.note=seed.ai?.note||seed.note||'';
      for(const issue of seed.issues||[])out=addIssue(out,issue);
    }
    return out;
  }
  function setScore(record,side,index,score,mode='manual'){
    checkPosition(side,index);
    if(score!==null&&(!Number.isInteger(score)||score<1||score>5))throw new Error('分数需为 1–5 的整数');
    const out=clone(record);target(out,mode).scores[side][index]=score;out.status='draft';return out;
  }
  function setReason(record,side,index,reason,mode='manual'){
    checkPosition(side,index);if(typeof reason!=='string'||reason.length>2000)throw new Error('维度说明不得超过 2000 字');
    const out=clone(record);target(out,mode).reasons[side][index]=reason;out.status='draft';return out;
  }
  function setPreference(record,preference){if(![null,'A','tie','B'].includes(preference))throw new Error('比较结果无效');const out=clone(record);out.preference=preference;out.status='draft';return out;}
  function average(record,side,mode='manual'){
    if(!validSide(side))throw new Error('评分对象无效');
    const values=target(record,mode).scores[side].filter(v=>v!==null);
    return values.length?values.reduce((a,b)=>a+b,0)/values.length:null;
  }
  function coverage(record,side,mode='manual'){if(!validSide(side))throw new Error('评分对象无效');return target(record,mode).scores[side].filter(v=>v!==null).length;}
  function addIssue(record,issue){
    if(!issue||!validSide(issue.side)||!Number.isFinite(issue.time)||issue.time<0||issue.time>3600||typeof issue.note!=='string'||!issue.note.trim()||issue.note.length>2000)throw new Error('请选择视频、有效时间，并填写问题描述');
    const out=clone(record);out.issues.push({side:issue.side,time:issue.time,note:issue.note.trim()});out.status='draft';return out;
  }
  function validateRecord(value,caseIds){
    if(!value||typeof value!=='object'||!caseIds.includes(value.caseId))throw new Error('文件包含未知案例');
    if(value.rubricVersion!=='1.7'||!['draft','submitted'].includes(value.status))throw new Error('记录版本无效；四维记录不能直接对应五维');
    let out=createRecord(value.caseId);
    if(value.dimensionSet!==undefined&&!['legacy-agent','video-task-completion'].includes(value.dimensionSet))throw new Error('评分维度定义无效');
    out.dimensionSet=value.dimensionSet||'legacy-agent';
    for(const mode of ['manual','ai']){
      const input=target(value,mode);
      if(!input||!['display-draft','edited'].includes(input.source))throw new Error('评分来源无效');
      for(const side of ['A','B']){
        if(!Array.isArray(input.scores?.[side])||input.scores[side].length!==5||!Array.isArray(input.reasons?.[side])||input.reasons[side].length!==5)throw new Error('评分维度无效');
        for(let i=0;i<5;i++){out=setScore(out,side,i,input.scores[side][i],mode);out=setReason(out,side,i,input.reasons[side][i],mode);}
      }
      target(out,mode).source=input.source;
    }
    out=setPreference(out,value.preference);
    if(typeof value.note!=='string'||value.note.length>10000||!Array.isArray(value.issues)||value.issues.length>200)throw new Error('记录内容无效');
    out.note=value.note;
    const aiNote=value.ai.note??value.note;if(typeof aiNote!=='string'||aiNote.length>10000)throw new Error('AI 判断依据无效');out.ai.note=aiNote;
    for(const issue of value.issues)out=addIssue(out,issue);
    if(value.updatedAt!==null&&(typeof value.updatedAt!=='string'||!Number.isFinite(Date.parse(value.updatedAt))))throw new Error('记录日期无效');
    out.status=value.status;out.updatedAt=value.updatedAt;return out;
  }
  function csvCell(value){let text=String(value??'');if(/^[\s]*[=+\-@]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';}
  function toCSV(records){
    const rows=[['案例','评分类型','视频',...dimensions,'有效项均分','有效维度数',...dimensions.map(n=>n+'·依据'),'相对比较','判断依据','问题记录','来源','状态']];
    for(const r of records)for(const mode of ['manual','ai'])for(const side of ['A','B']){
      const t=target(r,mode);
      rows.push([r.caseId,mode==='ai'?'AI 参考评分':'人工复评',side,...t.scores[side].map(v=>v===null?'N/A':v),average(r,side,mode),coverage(r,side,mode),...t.reasons[side],r.preference,t.note,JSON.stringify(r.issues.filter(i=>i.side===side)),t.source==='edited'?'本机复评记录':'样例预填参考',r.status==='submitted'?'已保存':'编辑中']);
    }
    return rows.map(row=>row.map(csvCell).join(',')).join('\r\n');
  }
  return {dimensions,createRecord,setScore,setReason,setPreference,average,coverage,addIssue,validateRecord,toCSV};
});
