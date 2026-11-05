(() => {
  'use strict';

  const { cases, dimensions } = window.ARCH_DATA;
  const models = { A: '可灵', B: 'Lovart' };
  const sides = Object.keys(models);
  const legacyCases = {
    CASE_009: 'residence',
    CASE_040: 'waterfront',
    CASE_049: 'competition-main',
    CASE_049_DETAIL: 'competition-entry',
    CASE_049_DUSK: 'competition-dusk',
  };
  const $ = id => document.getElementById(id);
  const videos = { A: $('video-a'), B: $('video-b') };
  const isLocalPreview = ['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname);
  const caseButtons = new Map();
  const asset = (id, side, ext) => 'assets/arch-eval/video-20261105/' + id + '-' + side.toLowerCase() + '.' + ext;
  const fmt = time => (Number.isFinite(time) ? time : 0).toFixed(2);
  const text = (id, value) => { $(id).textContent = value; };
  let current = cases[0];
  let playRequest = 0;
  let enlargedSide;
  let previewRequest;

  function node(tag, className, content) {
    const item = document.createElement(tag);
    item.className = className;
    if (content !== undefined) item.textContent = content;
    return item;
  }

  function pauseAll() {
    playRequest += 1;
    sides.forEach(side => videos[side].pause());
  }

  function duration(side) {
    return Number.isFinite(videos[side].duration) ? videos[side].duration : current.videos[side].duration;
  }

  function updateControls() {
    for (const side of sides) {
      const video = videos[side];
      const lower = side.toLowerCase();
      text('time-' + lower, fmt(video.currentTime) + ' / ' + fmt(duration(side)));
      $('seek-' + lower).max = duration(side);
      $('seek-' + lower).value = video.currentTime;
      const button = $('play-' + lower);
      button.textContent = video.paused ? '播放' : '暂停';
      button.setAttribute('aria-pressed', String(!video.paused));
    }
    text('play-both', sides.some(side => !videos[side].paused) ? '暂停两段视频' : '播放两段视频');
  }

  async function seek(side, time, linked = true) {
    pauseAll();
    const request = playRequest;
    if (time > 0 && previewRequest) await previewRequest.ready;
    if (request !== playRequest) return;
    const safe = Math.min(Math.max(0, time), Math.max(0, duration(side) - .001));
    videos[side].currentTime = safe;
    if (linked && $('link-progress').checked) {
      const other = side === 'A' ? 'B' : 'A';
      videos[other].currentTime = safe / duration(side) * duration(other);
    }
    updateControls();
  }

  function updateRates() {
    const speed = Number($('playback-speed').value);
    videos.A.playbackRate = speed;
    videos.B.playbackRate = $('link-progress').checked ? speed * duration('B') / duration('A') : speed;
  }

  async function play(selected) {
    const request = ++playRequest;
    text('media-status', '');
    try {
      if (previewRequest) await previewRequest.ready;
      if (request !== playRequest) return;
      for (const side of selected) {
        if (videos[side].ended || videos[side].currentTime >= duration(side) - .03) {
          videos[side].currentTime = 0;
        }
      }
      if (selected.length === 2 && $('link-progress').checked) {
        videos.B.currentTime = videos.A.currentTime / duration('A') * duration('B');
      }
      updateRates();
      await Promise.all(selected.map(side => videos[side].play()));
    } catch {
      if (request !== playRequest) return;
      pauseAll();
      text('media-status', '视频暂时无法播放。请尝试单侧播放或刷新页面。');
    }
    updateControls();
  }

  function renderRatings() {
    for (const side of sides) {
      const { scores, points } = current.videos[side];
      const average = scores.reduce((sum, [score]) => sum + score, 0) / dimensions.length;
      text('average-' + side, average.toFixed(2));
      const list = $('evidence-' + side);
      list.replaceChildren();
      for (const [time, note] of points) {
        const item = node('li', 'evidence-point');
        const button = node('button', 'evidence-button', fmt(time) + ' 秒');
        button.type = 'button';
        button.setAttribute('aria-label', models[side] + ' · 定位 ' + fmt(time) + ' 秒');
        button.setAttribute('aria-controls', videos[side].id);
        button.addEventListener('click', () => seek(side, time, false));
        item.append(button, node('span', '', note));
        list.append(item);
      }
    }

    $('rating-list').replaceChildren(...dimensions.map(({ title, focus }, index) => {
      const section = node('section', 'rating-row');
      const heading = node('div', 'rating-heading');
      heading.append(node('h3', '', title), node('p', '', focus));
      const pair = node('div', 'rating-pair');
      for (const side of sides) {
        const [score, reason] = current.videos[side].scores[index];
        const result = node('div', 'rating-side');
        const label = node('div', 'rating-label');
        label.append(node('span', '', side + ' · ' + models[side]), node('strong', '', score + ' / 5'));
        result.append(label, node('p', '', reason));
        pair.append(result);
      }
      section.append(heading, pair);
      return section;
    }));
  }

  async function loadPreviewClip(video, src, signal) {
    const previous = video.getAttribute('src');
    video.removeAttribute('src');
    video.load();
    if (previous?.startsWith('blob:')) URL.revokeObjectURL(previous);
    try {
      // The desktop preview serves complete files. A Blob enables local seeking.
      const response = await fetch(src, { signal });
      if (!response.ok) throw new Error('Video unavailable');
      const clip = await response.blob();
      if (!signal.aborted) video.src = URL.createObjectURL(clip);
    } catch {
      if (!signal.aborted) video.src = src;
    }
  }

  function loadClips(item) {
    previewRequest?.controller.abort();
    previewRequest = isLocalPreview ? { controller: new AbortController() } : null;
    const tasks = sides.map(side => {
      const video = videos[side];
      video.poster = asset(item.id, side, 'jpg');
      const src = asset(item.id, side, 'mp4');
      if (previewRequest) return loadPreviewClip(video, src, previewRequest.controller.signal);
      video.src = src;
      video.load();
    });
    if (previewRequest) previewRequest.ready = Promise.all(tasks);
  }

  function chooseCase(item) {
    pauseAll();
    current = item;
    text('case-title', item.label);
    text('case-brief', item.brief);
    text('case-summary', item.summary);
    text('media-status', '');
    $('task-checks').replaceChildren(...item.checks.map(rule => node('li', '', rule)));
    $('link-progress').checked = false;
    $('playback-speed').value = '1';
    loadClips(item);
    for (const [id, button] of caseButtons) button.setAttribute('aria-pressed', String(id === item.id));
    renderRatings();
    updateControls();
    history.replaceState(null, '', '#case=' + item.id);
  }

  for (const item of cases) {
    const button = node('button', 'case-choice');
    button.type = 'button';
    button.setAttribute('aria-label', item.label);
    button.setAttribute('aria-controls', 'case-review');
    const thumbnail = node('img', '');
    thumbnail.src = asset(item.id, 'B', 'jpg');
    thumbnail.alt = '';
    button.append(thumbnail, node('span', '', item.shortLabel));
    button.addEventListener('click', () => { if (current !== item) chooseCase(item); });
    caseButtons.set(item.id, button);
    $('case-queue').append(button);
  }

  $('play-both').addEventListener('click', () => {
    if (sides.some(side => !videos[side].paused)) {
      pauseAll();
      updateControls();
    } else {
      play(sides);
    }
  });
  $('reset-playback').addEventListener('click', () => {
    seek('A', 0, false);
    seek('B', 0, false);
  });
  $('playback-speed').addEventListener('change', updateRates);
  $('link-progress').addEventListener('change', () => {
    if ($('link-progress').checked) videos.B.currentTime = videos.A.currentTime / duration('A') * duration('B');
    updateRates();
  });
  $('view-ratings').addEventListener('click', event => {
    event.preventDefault();
    $('score-heading').focus();
  });

  for (const side of sides) {
    const lower = side.toLowerCase();
    const video = videos[side];
    for (const event of ['loadedmetadata', 'timeupdate', 'play', 'pause', 'ended']) {
      video.addEventListener(event, updateControls);
    }
    video.addEventListener('error', () => text('media-status', '视频暂时无法读取，请刷新页面后重试。'));
    function toggleVideo() {
      if (video.paused) play([side]);
      else video.pause();
    }
    video.addEventListener('click', toggleVideo);
    $('play-' + lower).addEventListener('click', toggleVideo);
    $('seek-' + lower).addEventListener('input', event => seek(side, Number(event.target.value)));
  }
  document.querySelectorAll('[data-step]').forEach(button => {
    button.addEventListener('click', () => {
      const { side, step } = button.dataset;
      seek(side, videos[side].currentTime + Number(step) / 24);
    });
  });
  document.querySelectorAll('[data-enlarge]').forEach(button => {
    button.addEventListener('click', async () => {
      pauseAll();
      const request = playRequest;
      if (previewRequest) await previewRequest.ready;
      if (request !== playRequest) return;
      enlargedSide = button.dataset.enlarge;
      const video = $('enlarged-video');
      video.src = videos[enlargedSide].src;
      video.currentTime = videos[enlargedSide].currentTime;
      text('enlarged-title', current.label + ' · ' + enlargedSide + ' · ' + models[enlargedSide]);
      $('video-modal').showModal();
    });
  });
  $('close-video').addEventListener('click', () => $('video-modal').close());
  $('video-modal').addEventListener('close', () => {
    const video = $('enlarged-video');
    video.pause();
    seek(enlargedSide, video.currentTime, false);
  });

  const requested = new URLSearchParams(location.hash.slice(1)).get('case');
  chooseCase(cases.find(item => item.id === (legacyCases[requested] || requested)) || cases[0]);
})();
