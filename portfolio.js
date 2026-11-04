(() => {
  'use strict';
  const header=document.querySelector('.portfolio-header');
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.portfolio-nav');
  const setHeader=()=>header?.classList.toggle('solid',scrollY>30||document.body.classList.contains('detail-page'));
  setHeader();window.addEventListener('scroll',setHeader,{passive:true});
  const closeMenu=()=>{nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');};
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){closeMenu();menu.focus();}});
  if('IntersectionObserver' in window){
    const chapters=[...document.querySelectorAll('main > [data-chapter]')];
    const observer=new IntersectionObserver(()=>{
      const focusLine=innerHeight*.35;
      const chosen=chapters.reduce((current,chapter)=>chapter.getBoundingClientRect().top<=focusLine?chapter:current,chapters[0]);
      if(!chosen)return;
      nav?.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')==='#'+chosen.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    },{rootMargin:'-20% 0px -45% 0px',threshold:0});
    chapters.forEach(s=>observer.observe(s));
  }
  document.querySelectorAll('[data-explore-image]').forEach(button=>button.addEventListener('click',()=>{
    const group=button.closest('.image-explorer');
    group.querySelector('img').src=button.dataset.exploreImage;
    group.querySelector('img').alt=button.dataset.exploreCaption;
    group.querySelector('.explorer-stage p').textContent=button.dataset.exploreCaption;
    group.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
  document.querySelectorAll('[data-video-start]').forEach(button=>button.addEventListener('click',async()=>{
    const video=button.parentElement.querySelector('video');video.controls=true;button.hidden=true;
    try{await video.play();}catch(e){video.controls=false;button.hidden=false;button.setAttribute('aria-label','重新播放视频');}
  }));
  const homePreviews=[...document.querySelectorAll('video[data-home-loop]')];
  const playHomePreviews=()=>{
    if(document.hidden)return;
    homePreviews.forEach(video=>{
      video.muted=true;video.defaultMuted=true;video.loop=true;
      if(video.paused)video.play().catch(()=>{});
    });
  };
  homePreviews.forEach(video=>video.addEventListener('loadeddata',playHomePreviews));
  playHomePreviews();
  window.addEventListener('pageshow',playHomePreviews);
  document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>{
    if(document.body.classList.contains('eval-page')||video.hasAttribute('data-home-loop'))return;
    document.querySelectorAll('video:not([data-home-loop])').forEach(other=>{if(other!==video)other.pause();});
  }));
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)document.querySelectorAll('video').forEach(video=>video.pause());
    else playHomePreviews();
  });
})();
