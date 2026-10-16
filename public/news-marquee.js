/* ENV News alternative: independent continuous marquee, opt in explicitly. */
(() => {
  'use strict';
  const instances = new Map();
  const mod = (x, n) => ((x % n) + n) % n;
  const num = (el, attr, fallback, min, max) => {
    const raw = el.getAttribute(attr), n = raw === null ? NaN : Number(raw);
    return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
  };
  function mount(root) {
    if (instances.has(root)) return;
    if (root.swiper && !root.swiper.destroyed) {
      console.warn('[ENV News] Disable the Swiper initializer on this container first.'); return;
    }
    const track = root.querySelector(':scope > .swiper-wrapper-news');
    const cards = track ? [...track.children].filter(el => el.matches('.swiper-slide-news')) : [];
    if (!track || !cards.length) return;
    const abort = new AbortController(), preference = matchMedia('(prefers-reduced-motion: reduce)');
    const saved = [root, track, ...cards].map(el => [el, el.getAttribute('style')]);
    const oldTab = root.getAttribute('tabindex');
    const speed = num(root, 'data-env-news-speed', 25, 0, 200);
    const damping = num(root, 'data-env-news-damping', 8, 2, 30);
    const cssGap = parseFloat(getComputedStyle(track).columnGap);
    const gap = num(root, 'data-env-news-gap', Number.isFinite(cssGap) ? cssGap : 16, 0, 200);
    let clones = [], offsets = [], period = 0, position = 0, target = 0, rate = 0;
    let raf = 0, last = 0, visible = true, hover = false, focused = false;
    let pointer = null, dragging = false, suppressClick = false, destroyed = false;
    Object.assign(root.style, { margin: '0', padding: '0', overflow: 'hidden', touchAction: 'pan-y pinch-zoom', cursor: 'grab' });
    if (getComputedStyle(root).position === 'static') root.style.position = 'relative';
    Object.assign(track.style, { margin: '0', padding: '0', display: 'flex', flexWrap: 'nowrap', width: 'max-content', maxWidth: 'none', transition: 'none', willChange: 'transform' });
    track.style.columnGap = `${gap}px`;
    if (oldTab === null) root.setAttribute('tabindex', '0');
    function clone(card) {
      const copy = card.cloneNode(true);
      copy.setAttribute('data-env-news-clone', ''); copy.setAttribute('aria-hidden', 'true');
      [copy, ...copy.querySelectorAll('*')].forEach(el => {
        ['id', 'data-env-reveal', 'data-env-text', 'data-env-trigger', 'autofocus'].forEach(a => el.removeAttribute(a));
        if (el.matches('a,button,input,select,textarea,[tabindex]')) el.setAttribute('tabindex', '-1');
      });
      copy.querySelectorAll('script').forEach(el => el.remove());
      copy.querySelectorAll('video').forEach(video => { video.removeAttribute('autoplay'); video.pause(); });
      track.append(copy); clones.push(copy); return copy;
    }
    function render() {
      if (period) track.style.transform = `translate3d(${-mod(position, period)}px,0,0)`;
      root.scrollLeft = 0;
    }
    function measure() {
      if (destroyed) return;
      const phase = period ? mod(position, period) / period : 0;
      clones.forEach(el => el.remove()); clones = [];
      // Resolve percentage widths against the original viewport before making the track intrinsic.
      track.style.width = '100%';
      saved.slice(2).forEach(([el, style]) => { if (style === null) el.removeAttribute('style'); else el.setAttribute('style', style); el.style.flexShrink = '0'; });
      const widths = cards.map(el => el.getBoundingClientRect().width);
      track.style.width = 'max-content';
      cards.forEach((el, i) => { el.style.width = `${widths[i]}px`; el.style.flexShrink = '0'; });
      const first = clone(cards[0]);
      period = first.getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
      if (!(period > 0)) { clones.forEach(el => el.remove()); clones = []; period = 0; return; }
      cards.slice(1).forEach(clone);
      for (let i = 1; i < Math.ceil(root.clientWidth / period) + 1; i++) cards.forEach(clone);
      offsets = cards.map(el => el.getBoundingClientRect().left - cards[0].getBoundingClientRect().left);
      position = target = phase * period; render(); wake();
    }
    function tick(time) {
      raf = 0;
      if (destroyed || !visible || document.hidden || !period) { last = 0; return; }
      const dt = last ? Math.min((time - last) / 1000, .05) : 0; last = time;
      const desired = !preference.matches && !hover && !focused && !dragging ? 1 : 0;
      rate += (desired - rate) * (1 - Math.exp(-(desired ? 4 : 7) * dt));
      if (!dragging) target += speed * rate * dt;
      position += (target - position) * (1 - Math.exp(-damping * dt));
      if (Math.abs(target - position) < .01) position = target;
      if (!pointer && Math.abs(position) > period * 100) { const shift = Math.floor(position / period) * period; position -= shift; target -= shift; }
      render();
      if (desired || rate > .001 || Math.abs(target - position) > .01) raf = requestAnimationFrame(tick); else last = 0;
    }
    function wake() { if (!raf && !destroyed && visible && !document.hidden) raf = requestAnimationFrame(tick); }
    const on = (type, fn, options = {}) => root.addEventListener(type, fn, { ...options, signal: abort.signal });
    on('mouseenter', () => { hover = true; wake(); }); on('mouseleave', () => { hover = false; wake(); });
    on('focusin', event => {
      focused = !pointer;
      const index = cards.findIndex(card => card.contains(event.target));
      if (index >= 0 && !pointer) { position = target = offsets[index] || 0; render(); }
      wake();
    });
    on('focusout', event => { if (!root.contains(event.relatedTarget)) { focused = false; wake(); } });
    on('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || event.target.closest('button,input,select,textarea')) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, target }; dragging = false; suppressClick = false;
    });
    on('pointermove', event => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
      if (!dragging) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
        if (event.pointerType === 'touch' && Math.abs(dy) > Math.abs(dx)) { pointer = null; return; }
        dragging = true; suppressClick = true; root.setPointerCapture(event.pointerId); root.style.cursor = 'grabbing';
      }
      event.preventDefault(); target = pointer.target - dx;
      if (preference.matches) position = target; render(); wake();
    });
    function release(event) {
      if (!pointer || pointer.id !== event.pointerId) return;
      pointer = null; dragging = false; root.style.cursor = 'grab';
      if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
      wake();
    }
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => on(type, release));
    document.addEventListener('pointerup', release, { signal: abort.signal });
    on('dragstart', event => event.preventDefault());
    on('click', event => {
      if (!suppressClick || event.detail === 0) return;
      suppressClick = false; event.preventDefault(); event.stopImmediatePropagation();
    }, { capture: true });
    on('wheel', event => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault(); suppressClick = false;
      target += event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? root.clientWidth : 1);
      if (preference.matches) position = target; render(); wake();
    }, { passive: false });
    function step(direction) {
      target += direction * ((cards[0].getBoundingClientRect().width || 300) + (parseFloat(getComputedStyle(track).columnGap) || 0));
      if (preference.matches) position = target; render(); wake();
    }
    on('keydown', event => {
      if (event.target === root && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1); }
    });
    const section = root.closest('section');
    const controls = [section?.querySelector('.swiper-button-prev'), section?.querySelector('.swiper-button-next')].map((el, i) => {
      if (!el) return null;
      const attrs = ['class', 'disabled', 'aria-disabled', 'tabindex', 'role'].map(a => [a, el.getAttribute(a)]);
      el.classList.remove('swiper-button-disabled', 'swiper-button-lock'); el.removeAttribute('disabled');
      el.setAttribute('aria-disabled', 'false'); el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
      el.addEventListener('click', () => step(i ? 1 : -1), { signal: abort.signal });
      el.addEventListener('keydown', event => { if (el.tagName !== 'BUTTON' && ['Enter', ' '].includes(event.key)) { event.preventDefault(); el.click(); } }, { signal: abort.signal });
      return { el, attrs };
    }).filter(Boolean);
    function changed() { rate = 0; position = target; render(); wake(); }
    preference.addEventListener('change', changed);
    document.addEventListener('visibilitychange', () => { last = 0; if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else wake(); }, { signal: abort.signal });
    const resize = new ResizeObserver(measure); resize.observe(root);
    // Images loading can alter intrinsic card widths; remeasure after their load.
    cards.forEach(card => card.querySelectorAll('img').forEach(img => img.addEventListener('load', measure, { signal: abort.signal })));
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (!visible) { cancelAnimationFrame(raf); raf = 0; last = 0; } else wake(); }); intersection.observe(root);
    const instance = { refresh: measure, destroy() {
      if (destroyed) return; destroyed = true; cancelAnimationFrame(raf); abort.abort();
      resize.disconnect(); intersection.disconnect(); preference.removeEventListener('change', changed);
      clones.forEach(el => el.remove());
      saved.forEach(([el, style]) => style === null ? el.removeAttribute('style') : el.setAttribute('style', style));
      if (oldTab === null) root.removeAttribute('tabindex'); else root.setAttribute('tabindex', oldTab);
      controls.forEach(({ el, attrs }) => attrs.forEach(([attr, value]) => value === null ? el.removeAttribute(attr) : el.setAttribute(attr, value)));
      instances.delete(root);
    } };
    instances.set(root, instance); measure();
    document.fonts?.ready.then(() => { if (!destroyed) measure(); });
  }
  window.ENVNewsMarquee?.destroy?.();
  window.ENVNewsMarquee = {
    init(root) { if (root) mount(root); else document.querySelectorAll('.swiper-news[data-env-news="marquee"]').forEach(mount); },
    refresh(root) { if (root) instances.get(root)?.refresh(); else instances.forEach(instance => instance.refresh()); },
    destroy(root) { if (root) instances.get(root)?.destroy(); else instances.forEach(instance => instance.destroy()); }
  };
  if (document.readyState === 'complete') window.ENVNewsMarquee.init();
  else window.addEventListener('load', () => window.ENVNewsMarquee?.init(), { once: true });
})();
