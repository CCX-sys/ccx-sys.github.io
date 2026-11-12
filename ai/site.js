(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const home=document.body.classList.contains('home'), header=$('.site-header');
  const updateHeader=()=>header?.classList.toggle('stuck',!home||scrollY>40);
  addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  const menu=$('.menu-toggle'),nav=$('#site-nav');
  const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','展开导航');nav?.classList.remove('open');};
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'收起导航':'展开导航');nav.classList.toggle('open',open);});
  $$('#site-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menu.focus();}});
  const current=location.pathname.split('/').pop();
  $$('#site-nav a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page');});
  const chapters=$$('.chapter[id]'),links=$$('.chapter-nav a');
  if(chapters.length){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting){links.forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
    },{rootMargin:'-155px 0px -50% 0px',threshold:0});
    chapters.forEach(c=>observer.observe(c));links[0]?.classList.add('active');
  }
  function tabKeys(buttons,onSelect){
    buttons.forEach((b,i)=>b.addEventListener('keydown',e=>{
      let next=i;
      if(e.key==='ArrowRight')next=(i+1)%buttons.length;
      else if(e.key==='ArrowLeft')next=(i+buttons.length-1)%buttons.length;
      else if(e.key==='Home')next=0;
      else if(e.key==='End')next=buttons.length-1;
      else return;
      e.preventDefault();onSelect(buttons[next]);buttons[next].focus();
    }));
  }
  const explanations={subject:'主体部分描述建筑是什么、外形怎样。',modifier:'这一部分说明从哪里看建筑，以及画面中的光线。',detail:'材料和外墙细节根据纹理、板缝和反射等可见特征描述。',style:'这一部分描述建筑外形和画面的表现方式。'};
  const highlights=$$('[data-highlight]');
  function highlight(part){
    highlights.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.highlight===part)));
    $$('[data-caption-part]').forEach(s=>s.classList.toggle('highlighted',s.dataset.captionPart===part));
    if($('#caption-explanation'))$('#caption-explanation').textContent=explanations[part];
  }
  highlights.forEach(b=>b.addEventListener('click',()=>highlight(b.dataset.highlight)));
  if(highlights.length)highlight('subject');
  const gallery=$('.dataset-gallery');
  if(gallery){
    const samples=[
  {
    "file": "6b9b194477d131a51c6f65e1d7641c32.jpg",
    "width": 1200,
    "height": 857,
    "title": "黄昏中的玻璃建筑",
    "alt": "多层建筑沿街道排列，各部分高低不同。画面从街道对面看向建筑，天空渐暗，室内亮起暖色灯光。",
    "labels": {
      "type": "",
      "form": "几何体块",
      "material": "玻璃幕墙",
      "light": "黄昏暖光",
      "view": "人视视角",
      "style": "现代主义"
    },
    "parts": {
      "subject": "多层建筑沿街道排列，各部分高低不同。",
      "modifier": "画面从街道对面看向建筑，天空渐暗，室内亮起暖色灯光。",
      "detail": "玻璃外墙由竖向构件分隔，部分位置能看见室内，入口连着人行道。前景有车辆和行道树，路面反射着灯光。",
      "style": "建筑外形简洁，窗框和各层之间的变化清楚可见。"
    }
  },
  {
    "file": "abb772f9688f139f008bb6c260ba95d0.jpg",
    "width": 750,
    "height": 672,
    "title": "木色建筑和周边道路",
    "alt": "几组长方形的木色建筑错层排列，沿场地转折。画面从上方斜看，周围道路和树木以灰白色绘出。",
    "labels": {
      "type": "",
      "form": "几何体块、水平延展、架空/悬挑",
      "material": "木材",
      "light": "",
      "view": "轴测/分析",
      "style": "现代主义"
    },
    "parts": {
      "subject": "几组长方形的木色建筑错层排列，沿场地转折。",
      "modifier": "画面从上方斜看，周围道路和树木以灰白色绘出。",
      "detail": "外墙能看见板条和竖向格栅，部分楼层向外伸出，下方留出开放空间。几个平屋顶和露台分布在不同高度。",
      "style": "木色主体与周围环境区分清楚，便于看清建筑的组合方式。"
    }
  },
  {
    "file": "fceb395c092bcd02227a13dadf427a18.jpg",
    "width": 736,
    "height": 920,
    "title": "水边的建筑和庭院",
    "alt": "弯曲的建筑围绕庭院布置，一侧靠近水边。画面从上方斜看，能同时看见建筑、庭院和周围道路。",
    "labels": {
      "type": "",
      "form": "曲线/流线形态、围合式",
      "material": "",
      "light": "白天自然光",
      "view": "鸟瞰视角",
      "style": "现代主义"
    },
    "parts": {
      "subject": "弯曲的建筑围绕庭院布置，一侧靠近水边。",
      "modifier": "画面从上方斜看，能同时看见建筑、庭院和周围道路。",
      "detail": "浅色外墙面向庭院，屋顶布置了绿化和平台，与地面上的树木、步道相接。道路与广场通向建筑入口。",
      "style": "白天光线下，建筑的弯曲边缘、绿化和水面清楚可见。"
    }
  },
  {
    "file": "juzhiyuan-office-uag-p02-northwest-perspective.jpg",
    "width": 1700,
    "height": 1370,
    "title": "沿街的玻璃建筑",
    "alt": "几栋圆角建筑沿道路排列，楼栋高低不同。画面从街道一侧看向建筑，天空光线柔和。",
    "labels": {
      "type": "",
      "form": "几何体块",
      "material": "玻璃幕墙",
      "light": "",
      "view": "人视视角",
      "style": "现代主义"
    },
    "parts": {
      "subject": "几栋圆角建筑沿道路排列，楼栋高低不同。",
      "modifier": "画面从街道一侧看向建筑，天空光线柔和。",
      "detail": "玻璃外墙被浅色竖向构件分隔，分格延续到圆角处。底部可以看见入口、连廊和绿化，周围道路、人行道与行道树交代了建筑的位置。",
      "style": "各楼层的窗框排列整齐，近处和远处的楼栋都能看清。"
    }
  },
  {
    "file": "lynk-mec-muda-007.jpg",
    "width": 1700,
    "height": 1066,
    "title": "向外伸出的楼层",
    "alt": "建筑的几层向外伸出，在不同方向上错开。画面从道路一侧看向建筑，阴天光线较为柔和。",
    "labels": {
      "type": "",
      "form": "架空/悬挑、水平延展",
      "material": "金属",
      "light": "阴天漫射光",
      "view": "人视视角",
      "style": "现代主义"
    },
    "parts": {
      "subject": "建筑的几层向外伸出，在不同方向上错开。",
      "modifier": "画面从道路一侧看向建筑，阴天光线较为柔和。",
      "detail": "浅色金属外墙能看见板缝，几层之间夹着玻璃窗，部分区域留出架空空间。入口平台靠着草坡，前方有道路和一辆橙色汽车。",
      "style": "建筑的折线轮廓与金属、玻璃的不同表面清楚可见。"
    }
  }
];
    let sampleIndex=0;
    const thumbs=$$('[data-sample-index]',gallery), image=$('#dataset-image');
    const labelOptions=$$('[data-label-option]');
    const labelGroups=$$('[data-label-group]');
    const labelStatus=$('#dataset-label-status');
    const multiLabelDimensions=new Set(['form','material','style']);
    const allowedLabels=Object.fromEntries(labelGroups.map(group=>[group.dataset.labelGroup,new Set(labelOptions.filter(button=>button.dataset.labelOption===group.dataset.labelGroup).map(button=>button.dataset.labelValue))]));
    const labelStorageKey='ccx-architectural-dataset:labels:v1';
    function normalizeLabels(values,dimension){
      const allowed=allowedLabels[dimension];
      const result=[...new Set(values.filter(value=>typeof value==='string'&&allowed?.has(value)))];
      if(result.includes('N/A'))return ['N/A'];
      return multiLabelDimensions.has(dimension)?result:result.slice(0,1);
    }
    function loadLabelOverrides(){
      try{
        const stored=JSON.parse(localStorage.getItem(labelStorageKey)||'null');
        if(!stored||stored.version!==1||!stored.images||typeof stored.images!=='object')return {};
        const result={};
        for(const sample of samples){
          const record=stored.images[sample.file];if(!record||typeof record!=='object')continue;
          const cleaned={};
          for(const dimension of Object.keys(allowedLabels))if(Array.isArray(record[dimension]))cleaned[dimension]=normalizeLabels(record[dimension],dimension);
          if(Object.keys(cleaned).length)result[sample.file]=cleaned;
        }
        return result;
      }catch{return {};}
    }
    const labelOverrides=loadLabelOverrides();
    function selectedLabels(sample){
      const saved=labelOverrides[sample.file]||{};
      return Object.fromEntries(Object.keys(allowedLabels).map(dimension=>{
        const values=Object.prototype.hasOwnProperty.call(saved,dimension)?saved[dimension]:(sample.labels[dimension]||'').split('、').filter(Boolean);
        return [dimension,normalizeLabels(values,dimension)];
      }));
    }
    function renderLabelSelections(sample){
      const labels=selectedLabels(sample);
      labelOptions.forEach(button=>button.setAttribute('aria-pressed',String(labels[button.dataset.labelOption].includes(button.dataset.labelValue))));
    }
    function chooseLabel(button){
      const sample=samples[sampleIndex],dimension=button.dataset.labelOption,value=button.dataset.labelValue;
      const current=selectedLabels(sample)[dimension];let next;
      if(value==='N/A')next=current.includes('N/A')?[]:['N/A'];
      else if(multiLabelDimensions.has(dimension)){
        const regular=current.filter(label=>label!=='N/A');
        next=regular.includes(value)?regular.filter(label=>label!==value):[...regular,value];
      }else next=current.includes(value)?[]:[value];
      if(!labelOverrides[sample.file])labelOverrides[sample.file]={};
      labelOverrides[sample.file][dimension]=normalizeLabels(next,dimension);
      renderLabelSelections(sample);
      try{localStorage.setItem(labelStorageKey,JSON.stringify({version:1,images:labelOverrides}));if(labelStatus)labelStatus.textContent='已自动保存当前图片的标签';}
      catch{if(labelStatus)labelStatus.textContent='选择已保留，当前浏览器无法自动保存';}
    }
    labelOptions.forEach(button=>button.addEventListener('click',()=>chooseLabel(button)));
    function setSample(index,announce=true){
      sampleIndex=(index+samples.length)%samples.length;
      const sample=samples[sampleIndex];
      image.src='assets/dataset/'+sample.file;image.alt=sample.alt;image.width=sample.width;image.height=sample.height;
      $('#dataset-image-title').textContent=sample.title;
      $('#dataset-image-count').textContent=String(sampleIndex+1).padStart(2,'0')+' / '+String(samples.length).padStart(2,'0');
      renderLabelSelections(sample);
      if(labelStatus)labelStatus.textContent=labelOverrides[sample.file]?'已载入这张图片保存的标签':'选择后自动保存';
      $$('[data-caption-part]').forEach(el=>{el.textContent=sample.parts[el.dataset.captionPart];});
      thumbs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===sampleIndex)));
      highlight(highlights.find(b=>b.getAttribute('aria-pressed')==='true')?.dataset.highlight||'subject');
      if(announce)$('#dataset-gallery-status').textContent='第'+(sampleIndex+1)+'张，共'+samples.length+'张：'+sample.title+'。图片、标签与描述已更新。';
    }
    thumbs.forEach((b,i)=>b.addEventListener('click',()=>setSample(i)));
    $$('[data-sample-step]',gallery).forEach(b=>b.addEventListener('click',()=>setSample(sampleIndex+Number(b.dataset.sampleStep))));
    tabKeys(thumbs,b=>setSample(Number(b.dataset.sampleIndex)));
    setSample(0,false);
  }
})();
