(() => {
  'use strict';
  const root=document.getElementById('about');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton=document.getElementById('motion-toggle');
  const motionLabel=motionButton.querySelector('span');
  let manualPause=preference.matches;
  const updateMotion=()=>{
    root.classList.toggle('motion-paused',manualPause||document.hidden);
    root.classList.toggle('reduced-motion',preference.matches);
    motionButton.setAttribute('aria-pressed',String(manualPause));
    motionButton.disabled=preference.matches;
    motionButton.setAttribute('aria-label',preference.matches?'已按系统偏好关闭背景动效':manualPause?'播放背景动效':'暂停背景动效');
    motionLabel.textContent=preference.matches?'静态背景':manualPause?'播放动效':'暂停动效';
  };
  motionButton.addEventListener('click',()=>{manualPause=!manualPause;updateMotion();});
  preference.addEventListener('change',()=>{manualPause=preference.matches;updateMotion();});
  document.addEventListener('visibilitychange',updateMotion);updateMotion();
  const hero=root;
  const header=document.querySelector('.portfolio-header');
  const updateNavigation=()=>header?.classList.toggle('at-home',hero.getBoundingClientRect().bottom>90);
  window.addEventListener('scroll',updateNavigation,{passive:true});
  window.addEventListener('pageshow',updateNavigation);
  updateNavigation();
  if(matchMedia('(pointer:fine)').matches){
    let pending=false,position={x:0,y:0};
    hero.addEventListener('pointermove',event=>{
      if(manualPause||preference.matches)return;
      position={x:(event.clientX/innerWidth-.5)*14,y:(event.clientY/innerHeight-.5)*10};
      if(pending)return;pending=true;
      requestAnimationFrame(()=>{root.style.setProperty('--shift-x',position.x+'px');root.style.setProperty('--shift-y',position.y+'px');pending=false;});
    });
    hero.addEventListener('pointerleave',()=>{root.style.setProperty('--shift-x','0px');root.style.setProperty('--shift-y','0px');});
  }
})();
