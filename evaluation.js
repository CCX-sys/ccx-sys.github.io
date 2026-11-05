(() => {
  'use strict';
  const data=window.ARCH_DATA.cases;
  const R=window.EvalRecords;
  const $=id=>document.getElementById(id);
  const videos={A:$('video-a'),B:$('video-b')};
  const ids=data.map(c=>c.id);
  const key='ccx-portfolio-evaluations-v2-20261105';
  let records={},current=data[0],record,openSide=null,mode='ai',storageReadable=true;
  const fmt=t=>(Number.isFinite(t)?t:0).toFixed(2);
  const text=(id,value)=>{$(id).textContent=value;};
  function status(message,error=false){text('evaluation-status',message);$('evaluation-status').classList.toggle('error',error);}
  function pauseAll(){Object.values(videos).forEach(v=>v.pause());}
  function duration(side){return Number.isFinite(videos[side].duration)?videos[side].duration:current.videos.find(v=>v.side===side).duration;}
  function hasWork(r){return r.preference!==null||r.note||r.issues.length||['A','B'].some(s=>r.scores[s].some(v=>v!==null)||r.ai.scores[s].some(v=>v!==null));}
  function store(){
    if(!storageReadable){status('已有记录无法读取，未覆盖浏览器原数据。请先导出本次记录。',true);return false;}
    try{localStorage.setItem(key,JSON.stringify({type:'portfolio-local-evaluations',version:2,records}));return true;}
    catch(e){status('浏览器未允许本地保存，请导出文件保留本次记录。',true);return false;}
  }
  try{
    const saved=localStorage.getItem(key);
    if(saved){const parsed=JSON.parse(saved);if(parsed.type!=='portfolio-local-evaluations'||parsed.version!==2||!parsed.records||typeof parsed.records!=='object'||Array.isArray(parsed.records))throw new Error();const staged={};for(const [id,value] of Object.entries(parsed.records)){const valid=R.validateRecord(value,ids);if(valid.caseId!==id)throw new Error();staged[id]=valid;}records=staged;}
  }catch(e){storageReadable=false;status('本机已有记录无法读取；原数据未改写。请先导出或检查浏览器存储。',true);}
  for(const c of data)if(!records[c.id])records[c.id]=R.createRecord(c.id,window.EVAL_SEEDS[c.id]);
  function persist(message=true){record.updatedAt=new Date().toISOString();records[current.id]=record;if(store()&&message)status(record.status==='submitted'?'评分已保存在本机。':'评分变更已自动保存。');updateTotals();}
  function updateTotals(){
    for(const side of ['A','B']){
      const average=R.average(record,side,mode),count=R.coverage(record,side,mode);
      text('total-'+side,average===null?'N/A':average.toFixed(2));text('coverage-'+side,count+' / 5 项');
      text('video-result-score-'+side,(mode==='ai'?'AI 参考评分':'人工复评')+' · '+(average===null?'N/A':average.toFixed(2)+' / 5')+' · '+count+' 项有效');
      const active=mode==='ai'?record.ai:record;
      text('video-result-reason-'+side,active.reasons[side][0]||'请在对应维度记录判断依据。');
    }
    document.querySelectorAll('[data-preference]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preference===record.preference)));
    document.querySelectorAll('[data-case-id]').forEach(b=>b.classList.toggle('has-record',!!records[b.dataset.caseId]&&hasWork(records[b.dataset.caseId])));
  }
  function updateControls(){
    for(const side of ['A','B']){
      const v=videos[side],lower=side.toLowerCase();
      text('time-'+lower,fmt(v.currentTime)+' / '+fmt(duration(side)));
      $('seek-'+lower).max=duration(side);$('seek-'+lower).value=v.currentTime;
      const button=document.querySelector('[data-play="'+side+'"]');button.textContent=v.paused?'播放':'暂停';button.setAttribute('aria-pressed',String(!v.paused));
    }
    text('play-both',Object.values(videos).some(v=>!v.paused)?'暂停两段视频':'播放两段视频');
  }
  function seek(side,time,linked=true){
    pauseAll();
    const safe=Math.min(Math.max(0,time),Math.max(0,duration(side)-.001));videos[side].currentTime=safe;
    if(linked&&$('link-progress').checked){const other=side==='A'?'B':'A';videos[other].currentTime=safe/duration(side)*duration(other);}
    updateControls();
  }
  function rates(){const speed=Number($('playback-speed').value);videos.A.playbackRate=speed;videos.B.playbackRate=$('link-progress').checked?speed*duration('B')/duration('A'):speed;}
  async function play(sides){
    try{for(const side of sides){if(videos[side].ended||videos[side].currentTime>=duration(side)-.03)videos[side].currentTime=0;}rates();await Promise.all(sides.map(side=>videos[side].play()));text('media-status','');}
    catch(e){pauseAll();text('media-status','视频暂时无法播放。请尝试单侧播放或重新打开页面。');}
    updateControls();
  }
  $('play-both').addEventListener('click',()=>{if(Object.values(videos).some(v=>!v.paused)){pauseAll();updateControls();}else{if($('link-progress').checked)videos.B.currentTime=videos.A.currentTime/duration('A')*duration('B');play(['A','B']);}});
  $('reset-playback').addEventListener('click',()=>{seek('A',0,false);seek('B',0,false);});
  $('playback-speed').addEventListener('change',rates);
  $('link-progress').addEventListener('change',()=>{if($('link-progress').checked)videos.B.currentTime=videos.A.currentTime/duration('A')*duration('B');rates();});
  for(const side of ['A','B']){
    const v=videos[side];
    for(const event of ['loadedmetadata','timeupdate','play','pause','ended'])v.addEventListener(event,updateControls);
    v.addEventListener('error',()=>text('media-status','视频暂时无法读取，请刷新页面后重试。'));
    v.addEventListener('click',()=>v.paused?play([side]):v.pause());
    document.querySelector('[data-play="'+side+'"]').addEventListener('click',()=>v.paused?play([side]):v.pause());
    $('seek-'+side.toLowerCase()).addEventListener('input',e=>seek(side,Number(e.target.value)));
  }
  document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{const side=b.dataset.side,fps=current.videos.find(v=>v.side===side).fps;seek(side,videos[side].currentTime+Number(b.dataset.step)/fps);}));
  function renderIssues(){
    $('issue-list').replaceChildren();
    record.issues.forEach((issue,i)=>{
      const li=document.createElement('li');const point=document.createElement('button');point.textContent=issue.side+' · '+fmt(issue.time)+'s';point.addEventListener('click',()=>seek(issue.side,issue.time,false));
      const note=document.createElement('span');note.textContent=issue.note;
      const remove=document.createElement('button');remove.className='delete-issue';remove.textContent='×';remove.setAttribute('aria-label','移除问题记录 '+(i+1));remove.addEventListener('click',()=>{record.issues.splice(i,1);record.status='draft';persist();renderIssues();});li.append(point,note,remove);$('issue-list').append(li);
    });
  }
  function fitReasons(){document.querySelectorAll('.dimension-reason').forEach(input=>{input.style.height='auto';input.style.height=(input.scrollHeight+2)+'px';});}
  window.addEventListener('resize',fitReasons);
  function showRecord(){
    const active=mode==='ai'?record.ai:record;
    for(const side of ['A','B'])active.scores[side].forEach((value,i)=>{$('score-'+side+'-'+i).value=value===null?'':String(value);$('reason-'+side+'-'+i).value=active.reasons[side][i];});
    $('evaluation-note').value=active.note;$('issue-note').value='';$('issue-time').value='0.00';renderIssues();updateTotals();fitReasons();
  }
  function setMode(next){
    mode=next;
    document.querySelectorAll('[data-score-mode]').forEach(b=>{const selected=b.dataset.scoreMode===mode;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});
    $('score-panel').setAttribute('aria-labelledby','mode-'+mode);
    showRecord();
  }
  const modeTabs=[...document.querySelectorAll('[data-score-mode]')];
  modeTabs.forEach(b=>{
    b.addEventListener('click',()=>setMode(b.dataset.scoreMode));
    b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?1:1-modeTabs.indexOf(b);setMode(modeTabs[next].dataset.scoreMode);modeTabs[next].focus();});
  });
  function chooseCase(id){
    pauseAll();current=data.find(c=>c.id===id)||data[0];record=R.validateRecord(records[current.id],ids);
    document.body.dataset.currentCase=current.id;text('case-title',current.label);text('case-brief','任务要求：'+current.brief);text('case-kind',current.type);text('prompt-text',current.prompt);
    $('task-checks').replaceChildren(...current.checks.map(rule=>{const item=document.createElement('li');item.textContent=rule;return item;}));
    for(const item of current.videos){const v=videos[item.side];v.poster=item.poster;v.src=item.src;v.load();text('video-label-'+item.side,item.side+' · '+item.model);text('video-meta-'+item.side,item.width+' × '+item.height+' · '+item.fps+' fps');}
    document.querySelectorAll('[data-case-id]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.caseId===current.id)));
    $('link-progress').checked=false;$('playback-speed').value='1';showRecord();updateControls();history.replaceState(null,'','#case='+current.id);
    if(!$('evaluation-status').classList.contains('error'))status('');
  }
  data.forEach(c=>{const b=document.createElement('button');b.type='button';b.dataset.caseId=c.id;const im=document.createElement('img');im.src=c.videos[1].poster;im.alt='';const label=document.createElement('span');label.textContent=c.label;b.append(im,label);b.addEventListener('click',()=>chooseCase(c.id));$('case-queue').append(b);});
  document.querySelectorAll('[data-score-side]').forEach(select=>select.addEventListener('change',()=>{record=R.setScore(record,select.dataset.scoreSide,Number(select.dataset.dimension),select.value===''?null:Number(select.value),mode);(mode==='ai'?record.ai:record).source='edited';persist();}));
  document.querySelectorAll('[data-reason-side]').forEach(input=>input.addEventListener('input',()=>{record=R.setReason(record,input.dataset.reasonSide,Number(input.dataset.dimension),input.value,mode);(mode==='ai'?record.ai:record).source='edited';persist();fitReasons();}));
  document.querySelectorAll('[data-preference]').forEach(b=>b.addEventListener('click',()=>{record=R.setPreference(record,b.dataset.preference);persist();}));
  $('evaluation-note').addEventListener('input',e=>{(mode==='ai'?record.ai:record).note=e.target.value;record.status='draft';persist();});
  $('use-current-time').addEventListener('click',()=>{$('issue-time').value=fmt(videos[$('issue-side').value].currentTime);});
  $('add-issue').addEventListener('click',()=>{try{const side=$('issue-side').value,time=Number($('issue-time').value);if(time>duration(side))throw new Error('时间超过视频长度');record=R.addIssue(record,{side,time,note:$('issue-note').value});persist();renderIssues();$('issue-note').value='';}catch(e){status(e.message,true);}});
  $('save-evaluation').addEventListener('click',()=>{
    record.status='submitted';persist();
  });
  function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function exportRecords(){if(hasWork(record))records[current.id]=record;return Object.values(records).filter(hasWork);}
  $('export-json').addEventListener('click',()=>{const list=exportRecords();if(!list.length){status('填写评分或观察后再导出。',true);return;}download('AI视频评测平台.json',JSON.stringify({type:'portfolio-local-evaluations',version:2,exportedAt:new Date().toISOString(),records:list},null,2),'application/json');status('已导出人工与 AI 两套评测记录。');});
  $('export-csv').addEventListener('click',()=>{const list=exportRecords();if(!list.length){status('填写评分或观察后再导出。',true);return;}download('建筑视频评测.csv','\ufeff'+R.toCSV(list),'text/csv;charset=utf-8');status('已导出 CSV 评分表。');});
  $('import-json').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;
    try{if(!storageReadable)throw new Error('请先备份并修复本机无法读取的记录');if(file.size>1024*1024)throw new Error('文件超过 1 MB');const input=JSON.parse(await file.text());if(input.type!=='portfolio-local-evaluations'||input.version!==2||!Array.isArray(input.records)||input.records.length>ids.length)throw new Error('请选择新版五维 JSON 文件；旧版四维记录原样保留，不能直接套入五维');const staged={...records},seen=new Set();for(const item of input.records){const valid=R.validateRecord(item,ids);if(seen.has(valid.caseId))throw new Error('文件中有重复案例');seen.add(valid.caseId);staged[valid.caseId]=valid;}const previous=records;records=staged;if(!store()){records=previous;throw new Error('无法保存导入结果');}chooseCase(current.id);status('已导入 '+seen.size+' 个案例的人工与 AI 记录。');}
    catch(err){status('导入未完成：'+err.message+'。原有记录保留。',true);}
    e.target.value='';
  });
  document.querySelectorAll('[data-enlarge]').forEach(b=>b.addEventListener('click',()=>{pauseAll();openSide=b.dataset.enlarge;const v=$('enlarged-video');v.src=videos[openSide].src;v.currentTime=videos[openSide].currentTime;text('enlarged-title',current.label+' · '+openSide+' · '+current.videos.find(item=>item.side===openSide).model);$('video-modal').showModal();}));
  $('close-video').addEventListener('click',()=>$('video-modal').close());$('video-modal').addEventListener('close',()=>{const v=$('enlarged-video');v.pause();if(openSide)seek(openSide,v.currentTime,false);});
  document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['INPUT','TEXTAREA','SELECT','BUTTON','A'].includes(document.activeElement.tagName)&&!$('video-modal').open){e.preventDefault();$('play-both').click();}});
  chooseCase(new URLSearchParams(location.hash.slice(1)).get('case')||data[0].id);
})();
