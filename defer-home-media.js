(() => {
  const videos = [...document.querySelectorAll('video[data-home-loop][data-src]')];
  const load = video => {
    if (!video.dataset.src) return;
    video.src = video.dataset.src;
    delete video.dataset.src;
    video.muted = true;
    video.load();
    video.play().catch(() => {});
  };
  if (!('IntersectionObserver' in window)) { videos.forEach(load); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { load(entry.target); observer.unobserve(entry.target); }
    });
  }, {rootMargin: '160px 0px'});
  videos.forEach(video => observer.observe(video));
})();
