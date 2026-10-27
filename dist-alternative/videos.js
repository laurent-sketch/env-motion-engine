/* ENV Videos — experimental Webflow interception. Load synchronously FIRST in <head>.
 * No defer/async: a late script cannot undo requests the browser already started.
 */
(() => {
  'use strict';
  if (window.ENVVideos) return;
  if (typeof IntersectionObserver === 'undefined') return;
  const records = new Map(), abort = new AbortController();
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const hoverDevice = matchMedia('(hover: hover) and (pointer: fine)');
  const coverStyle = document.createElement('style');
  coverStyle.textContent = '[data-env-video="hover"]:not(.is-env-video-playing) .cover-project{opacity:1!important}[data-env-video="hover"].is-env-video-playing .cover-project{opacity:0!important}';
  document.head.append(coverStyle);
  let ready = false, destroyed = false, near, visible, timer;
  const supported = video => video.closest('[data-env-video="hover"]') || (video.closest('.w-background-video') && video.closest('.sd-slider, .item-video'));
  const pause = video => { try { video.pause(); } catch (_) {} };
  function allowed(record) {
    if (document.hidden || preference.matches || !record.visible) return false;
    const slider = record.video.closest('.sd-slider');
    if (!slider) return !record.hoverRoot || (hoverDevice.matches && (record.hovering || record.focused));
    return record.video.closest('.w-slide') === activeSlide(slider);
  }
  function play(record) {
    if (!record.loaded || !allowed(record)) { record.hoverRoot?.classList.remove('is-env-video-playing'); pause(record.video); return; }
    if (record.restartPending) {
      try { record.video.currentTime = 0; record.restartPending = false; } catch (_) { /* Retry when media becomes seekable. */ }
    }
    const result = record.video.play();
    if (result?.catch) result.catch(() => {});
  }
  function capture(video) {
    if (!supported(video)) return;
    let record = records.get(video);
    if (!record) {
      record = { video, loaded: false, visible: false, sources: new Map(), direct: null,
        autoplay: video.hasAttribute('autoplay'), preload: video.getAttribute('preload'), aria: video.getAttribute('aria-hidden'), early: false };
      record.hoverRoot = !video.closest('.sd-slider') ? video.closest('[data-env-video="hover"]') : null;
      record.hovering = false; record.focused = false;
      record.controller = new AbortController();
      records.set(video, record);
      if (record.hoverRoot) {
        const root = record.hoverRoot;
        const activate = () => { if (allowed(record)) hydrate(record, true); else play(record); };
        root.addEventListener('pointerenter', event => { if (event.pointerType === 'touch') return; record.hovering = true; record.restartPending = true; activate(); }, { signal: record.controller.signal });
        root.addEventListener('pointerleave', () => { record.hovering = false; activate(); }, { signal: record.controller.signal });
        root.addEventListener('focusin', event => { record.focused = event.target.matches(':focus-visible'); if (record.focused && !record.hovering) record.restartPending = true; activate(); }, { signal: record.controller.signal });
        root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) { record.focused = false; activate(); } }, { signal: record.controller.signal });
        video.addEventListener('playing', () => {
          if (allowed(record)) root.classList.add('is-env-video-playing'); else play(record);
        }, { signal: record.controller.signal });
        ['pause', 'waiting', 'error', 'emptied'].forEach(type => video.addEventListener(type, () => root.classList.remove('is-env-video-playing'), { signal: record.controller.signal }));
      }
      video.removeAttribute('autoplay'); video.preload = 'none'; pause(video);
      video.setAttribute('aria-hidden', 'true'); // Deferred media is represented by its poster, not an empty media control.
      const poster = video.closest('.w-background-video')?.getAttribute('data-poster-url');
      record.poster = video.getAttribute('poster');
      if (poster && !record.poster) video.poster = poster;
      video.addEventListener('play', () => { if (!allowed(record)) pause(video); }, { signal: record.controller.signal });
      video.addEventListener('loadeddata', () => { play(record); prefetch(); }, { signal: record.controller.signal });
      if (ready) observe(record);
    }
    if (record.loaded) return;
    if (video.currentSrc || video.networkState === 2) record.early = true;
    if (video.hasAttribute('src')) { record.direct = video.getAttribute('src'); video.removeAttribute('src'); }
    video.querySelectorAll('source[src]').forEach(source => { record.sources.set(source, source.getAttribute('src')); source.removeAttribute('src'); });
    if (video.hasAttribute('autoplay')) video.removeAttribute('autoplay');
  }
  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.matches('video')) capture(node);
    if (node.matches('source')) { const video = node.closest('video'); if (video) capture(video); }
    node.querySelectorAll('video').forEach(capture);
  }
  function hydrate(record, start = false) {
    if (!record.loaded && (record.direct || record.sources.size)) {
      record.loaded = true;
      if (record.aria === null) record.video.removeAttribute('aria-hidden'); else record.video.setAttribute('aria-hidden', record.aria);
      record.video.preload = 'auto';
      if (record.direct) record.video.src = record.direct;
      record.sources.forEach((url, source) => source.setAttribute('src', url));
      record.video.load();
    }
    if (start) play(record);
  }
  function activeSlide(slider) {
    const slides = [...slider.querySelectorAll('.w-slider-mask > .w-slide')];
    const index = [...slider.querySelectorAll('.w-slider-dot')].findIndex(dot => dot.classList.contains('w-active'));
    return slides[index >= 0 ? index : 0];
  }
  function syncHero() {
    if (!ready || destroyed) return;
    records.forEach(record => {
      const slider = record.video.closest('.sd-slider');
      if (!slider) return;
      if (record.visible && record.video.closest('.w-slide') === activeSlide(slider)) hydrate(record, true);
      else pause(record.video);
    });
  }
  function prefetch() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (destroyed || document.hidden || preference.matches) return;
      document.querySelectorAll('.sd-slider').forEach(slider => {
        const slides = [...slider.querySelectorAll('.w-slider-mask > .w-slide')];
        const active = activeSlide(slider);
        const current = [...records.values()].find(r => r.video.closest('.w-slide') === active);
        if (!current?.visible || current.video.readyState < 2 || slider.getAttribute('data-env-video-prefetch-next') === 'false') return;
        const next = slides[(slides.indexOf(active) + 1) % slides.length];
        records.forEach(record => { if (record.video.closest('.w-slide') === next) hydrate(record); });
      });
    }, 1500);
  }
  function observe(record) {
    const region = record.video.closest('.sd-slider') || record.video.closest('.w-background-video') || record.hoverRoot || record.video;
    record.region = region; near.observe(region); visible.observe(region);
  }
  function init() {
    if (ready || destroyed) return;
    ready = true;
    near = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting || preference.matches) return;
      records.forEach(record => { if (record.region === entry.target && !record.video.closest('.sd-slider') && !record.hoverRoot) hydrate(record); });
    }), { rootMargin: '300px 0px', threshold: 0 });
    visible = new IntersectionObserver(entries => {
      entries.forEach(entry => records.forEach(record => {
        if (record.region !== entry.target) return;
        record.visible = entry.isIntersecting;
        if (record.visible && !preference.matches) {
          if (!record.video.closest('.sd-slider') && (!record.hoverRoot || allowed(record))) hydrate(record, true);
        } else play(record);
      }));
      syncHero();
    }, { threshold: 0 });
    document.querySelectorAll('video').forEach(capture);
    records.forEach(observe);
  }
  const observer = new MutationObserver(mutations => {
    let heroChanged = false;
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') mutation.addedNodes.forEach(scan);
      else if (mutation.target.matches('video,source')) scan(mutation.target);
      if (mutation.target.closest?.('.sd-slider')) heroChanged = true;
    });
    if (heroChanged) syncHero();
  });
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'autoplay', 'class', 'aria-hidden'] });
  document.querySelectorAll('video').forEach(capture);
  const preferenceChanged = () => {
    records.forEach(record => { if (record.visible && !document.hidden && !preference.matches && !record.video.closest('.sd-slider') && (!record.hoverRoot || allowed(record))) hydrate(record, true); else play(record); });
    syncHero();
  };
  preference.addEventListener('change', preferenceChanged);
  hoverDevice.addEventListener('change', preferenceChanged);
  document.addEventListener('visibilitychange', preferenceChanged, { signal: abort.signal });
  window.ENVVideos = {
    stage(root = document) { root.querySelectorAll('video').forEach(capture); },
    refresh() { document.querySelectorAll('video').forEach(capture); syncHero(); },
    release(root) {
      records.forEach((record, video) => {
        if (!root.contains(video)) return;
        record.controller.abort(); pause(video);
        near?.unobserve?.(record.region); visible?.unobserve?.(record.region);
        records.delete(video);
      });
    },
    audit() { return [...records.values()].map(r => ({ id: r.video.id, loaded: r.loaded, visible: r.visible, interceptionPossiblyLate: r.early, sources: r.sources.size + Number(!!r.direct) })); },
    destroy() {
      if (destroyed) return; destroyed = true; observer.disconnect(); near?.disconnect(); visible?.disconnect();
      clearTimeout(timer); abort.abort(); preference.removeEventListener('change', preferenceChanged); hoverDevice.removeEventListener('change', preferenceChanged); coverStyle.remove();
      records.forEach(record => {
        record.controller.abort();
        record.hoverRoot?.classList.remove('is-env-video-playing');
        if (!record.loaded) { if (record.direct) record.video.src = record.direct; record.sources.forEach((url, source) => source.src = url); }
        if (record.autoplay) record.video.setAttribute('autoplay', '');
        if (record.aria === null) record.video.removeAttribute('aria-hidden'); else record.video.setAttribute('aria-hidden', record.aria);
        if (record.preload === null) record.video.removeAttribute('preload'); else record.video.setAttribute('preload', record.preload);
        if (record.poster === null) record.video.removeAttribute('poster'); else record.video.setAttribute('poster', record.poster);
      });
      records.clear(); delete window.ENVVideos;
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true, signal: abort.signal }); else init();
})();
