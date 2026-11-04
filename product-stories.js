(() => {
  'use strict';
  const parse = el => JSON.parse(el.textContent);
  const imageDialog = document.getElementById('project-image-dialog');
  const picture = imageDialog?.querySelector('img');
  const caption = imageDialog?.querySelector('[data-viewer-caption]');
  const zoom = imageDialog?.querySelector('[data-viewer-zoom]');
  let imageInvoker = null;
  document.querySelectorAll('[data-project-image]').forEach(button => {
    button.addEventListener('click', () => {
      imageInvoker = button;
      picture.src = button.dataset.projectImage;
      picture.alt = button.dataset.caption || '作品预览';
      caption.textContent = picture.alt;
      imageDialog.classList.remove('is-actual');
      zoom.textContent = '原尺寸';
      zoom.setAttribute('aria-pressed', 'false');
      imageDialog.showModal();
    });
  });
  zoom?.addEventListener('click', () => {
    const actual = imageDialog.classList.toggle('is-actual');
    zoom.textContent = actual ? '适合窗口' : '原尺寸';
    zoom.setAttribute('aria-pressed', String(actual));
  });
  imageDialog?.querySelector('[data-viewer-close]').addEventListener('click', () => imageDialog.close());
  imageDialog?.addEventListener('close', () => imageInvoker?.focus({preventScroll: true}));
  imageDialog?.addEventListener('click', event => {
    if (event.target !== imageDialog) return;
    const r = imageDialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) imageDialog.close();
  });

  document.querySelectorAll('[data-story-gallery]').forEach(gallery => {
    const items = parse(gallery.querySelector('[data-gallery-data]'));
    const controls = [...gallery.querySelectorAll('[data-gallery-select]')];
    const stage = gallery.querySelector('.gallery-stage button');
    const image = stage.querySelector('img');
    const select = index => {
      const item = items[index];
      gallery.querySelector('[data-gallery-title]').textContent = item.title;
      gallery.querySelector('[data-gallery-description]').textContent = item.description;
      gallery.querySelector('[data-gallery-caption]').textContent = item.caption;
      gallery.querySelector('[data-gallery-count]').textContent = `${index + 1} / ${items.length}`;
      stage.dataset.projectImage = item.image;
      stage.dataset.caption = item.caption;
      stage.setAttribute('aria-label', `放大：${item.caption}`);
      image.src = item.image;
      image.alt = item.caption;
      controls.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    };
    controls.forEach((button, index) => {
      button.addEventListener('click', () => select(index));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? controls.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + controls.length) % controls.length;
        select(next);
        controls[next].focus({preventScroll: true});
      });
    });
  });

  document.querySelectorAll('[data-flow-viewer]').forEach(viewer => {
    const content = parse(viewer.querySelector('[data-flow-data]'));
    const {nodes} = content;
    const diagramNodes = [...viewer.querySelectorAll('svg [data-node-id]')];
    const mobileNodes = [...viewer.querySelectorAll('[data-flow-select]')];
    const edges = [...viewer.querySelectorAll('svg [data-edge-from]')];
    const title = viewer.querySelector('[data-flow-title]');
    const action = viewer.querySelector('[data-flow-action]');
    const reason = viewer.querySelector('[data-flow-reason]');
    const counter = viewer.querySelector('[data-flow-counter]');
    const play = viewer.querySelector('[data-flow-play]');
    const theme = viewer.querySelector('[data-flow-theme-toggle]');
    const expand = viewer.querySelector('[data-flow-expand]');
    const modal = document.getElementById('story-flow-dialog');
    const mount = viewer.parentElement;
    let current = -1;
    let timer = null;
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
      play.textContent = '逐步浏览';
      play.setAttribute('aria-pressed', 'false');
    };
    const select = index => {
      current = index;
      const node = nodes[index];
      const selected = node?.id;
      const neighbors = new Set(selected ? [selected] : []);
      edges.forEach(edge => {
        const connected = edge.dataset.edgeFrom === selected || edge.dataset.edgeTo === selected;
        edge.classList.toggle('is-active', Boolean(selected && connected));
        edge.classList.toggle('is-muted', Boolean(selected && !connected));
        if (connected) { neighbors.add(edge.dataset.edgeFrom); neighbors.add(edge.dataset.edgeTo); }
      });
      diagramNodes.forEach(el => {
        el.classList.toggle('is-selected', el.dataset.nodeId === selected);
        el.classList.toggle('is-muted', Boolean(selected && !neighbors.has(el.dataset.nodeId)));
        el.setAttribute('aria-pressed', String(el.dataset.nodeId === selected));
      });
      mobileNodes.forEach(el => el.setAttribute('aria-pressed', String(el.dataset.flowSelect === selected)));
      const graphic = viewer.querySelector('.flow-graphic');
      if (graphic && matchMedia('(max-width:760px)').matches) {
        const target = diagramNodes.find(el => el.dataset.nodeId === selected);
        const targetBox = target?.getBoundingClientRect();
        const frameBox = graphic.getBoundingClientRect();
        const left = targetBox ? graphic.scrollLeft + targetBox.left - frameBox.left - (graphic.clientWidth - targetBox.width) / 2 : 0;
        graphic.scrollTo({left, behavior: 'auto'});
      }
      title.textContent = node ? node.title : '链路总览';
      action.textContent = node ? node.action : content.overview;
      reason.textContent = node ? node.reason : '点选图中环节，在这里查看对应的行为与判断。';
      counter.textContent = node ? `${index + 1} / ${nodes.length} · ${node.title}` : '链路总览';
      viewer.querySelector('[data-flow-kicker]').textContent = node ? '环节与设计判断' : '设计要点';
    };
    const pick = id => { stop(); select(nodes.findIndex(node => node.id === id)); };
    diagramNodes.forEach(el => {
      el.setAttribute('aria-label', `查看：${el.dataset.nodeLabel}`);
      el.addEventListener('click', () => pick(el.dataset.nodeId));
      el.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        pick(el.dataset.nodeId);
      });
    });
    mobileNodes.forEach(el => el.addEventListener('click', () => pick(el.dataset.flowSelect)));
    viewer.querySelector('[data-flow-reset]').addEventListener('click', () => { stop(); select(-1); });
    viewer.querySelector('[data-flow-prev]').addEventListener('click', () => { stop(); select(current < 0 ? nodes.length - 1 : (current - 1 + nodes.length) % nodes.length); });
    viewer.querySelector('[data-flow-next]').addEventListener('click', () => { stop(); select((current + 1) % nodes.length); });
    play.addEventListener('click', () => {
      if (timer) { stop(); return; }
      select((current + 1) % nodes.length);
      play.textContent = '暂停浏览';
      play.setAttribute('aria-pressed', 'true');
      timer = window.setInterval(() => select((current + 1) % nodes.length), 2200);
    });
    theme.addEventListener('click', () => {
      const dark = viewer.dataset.flowTheme !== 'dark';
      viewer.dataset.flowTheme = dark ? 'dark' : 'light';
      theme.textContent = dark ? '浅色' : '深色';
      theme.setAttribute('aria-pressed', String(dark));
    });
    expand.addEventListener('click', () => {
      stop();
      if (modal.open) { modal.close(); return; }
      mount.style.minHeight = `${viewer.getBoundingClientRect().height}px`;
      modal.appendChild(viewer);
      expand.textContent = '退出全屏';
      expand.setAttribute('aria-expanded', 'true');
      modal.showModal();
      select(current);
    });
    modal.addEventListener('close', () => {
      mount.appendChild(viewer);
      select(current);
      mount.style.minHeight = '';
      expand.textContent = '全屏';
      expand.setAttribute('aria-expanded', 'false');
      expand.focus({preventScroll: true});
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting && !modal.open) stop();
    }).observe(mount);
  });
})();
