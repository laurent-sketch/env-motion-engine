/* ENV About page only. Opt in with data-env-page-animation="about" on its script. */
(() => {
  if (window.ENVAboutPage?.version === 'page-1') return;
  let dispose = () => {};
  function init() {
    dispose();
    const marker = document.querySelector('[data-env-page-animation="about"]');
    if (!marker) return;
    const page = document.querySelector('#env-sd-page') || document;
    const root = page.querySelector('.section-animation-about') || page.querySelector('.section.hero-about')?.parentElement;
    if (!root || root.closest('[data-env-transition-snapshot]')) return;
    const lines = [...root.querySelectorAll('.bloc-big-text > img')];
    if (!lines.length || !window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const abort = new AbortController();
    const layers = new Map(), originals = new Map(), followers = new Set();
    let context, frame, disposed = false;
    const number = (group, key, fallback, max) => {
      const raw = marker.getAttribute(`data-env-about-${group}-${key}`);
      const value = raw === null || !raw.trim() ? NaN : Number(raw);
      return Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : fallback;
    };
    const settings = (group, last = false) => ({
      start: number(group, 'start', last ? 105 : 110, 150),
      end: number(group, 'end', last ? 40 : 35, 100),
      distance: number(group, 'distance', last ? .32 : .42, 1),
      mobile: number(group, 'mobile-distance', last ? .42 : .55, 1),
      blur: number(group, 'blur', 20, 40),
      down: number(group, 'duration', last ? .95 : .7, 3),
      up: number(group, 'up-duration', last ? .7 : .55, 3)
    });
    const first = settings('first'), last = settings('last', true);
    const overflow = [root.style.getPropertyValue('overflow-x'), root.style.getPropertyPriority('overflow-x')];
    const save = (el, attr) => el.getAttribute(attr);
    const restore = (el, attr, value) => value === null ? el.removeAttribute(attr) : el.setAttribute(attr, value);
    function refresh() {
      if (disposed || frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        if (!disposed && root.isConnected) ScrollTrigger.refresh();
      });
    }
    dispose = () => {
      if (disposed) return;
      disposed = true;
      abort.abort(); cancelAnimationFrame(frame);
      followers.forEach(tween => tween.kill()); followers.clear();
      context?.revert();
      originals.forEach((attrs, line) => {
        restore(line, 'data-env-ignore', attrs.ignore);
        restore(line, 'data-env-about-reveal', attrs.state);
        restore(line, 'loading', attrs.loading);
      });
      layers.forEach((layer, logo) => { if (logo.parentElement === layer) layer.replaceWith(logo); });
      if (overflow[0]) root.style.setProperty('overflow-x', ...overflow);
      else root.style.removeProperty('overflow-x');
    };
    // Entrance on the transparent layer, native scroll exit on the image.
    root.querySelectorAll('.hero-about > .big--logo.middle[data-env-reveal="fade-scale"]').forEach(logo => {
      const layer = document.createElement('div');
      layer.setAttribute('data-env-about-logo-layer', '');
      layer.style.cssText = 'display:grid;place-items:center;width:100%;height:100%;min-width:0;flex-shrink:0;';
      logo.before(layer); layer.append(logo); layers.set(logo, layer);
    });
    if (reduced.matches) return;
    gsap.registerPlugin(ScrollTrigger);
    context = gsap.context(() => {
      gsap.set(root, { overflowX: 'clip' });
      lines.forEach((line, index) => {
        // Other explicit reveal controllers retain ownership of their targets.
        if (line.closest('[data-env-ignore],[data-env-reveal],[data-env-text]')) return;
        originals.set(line, { ignore: save(line, 'data-env-ignore'), state: save(line, 'data-env-about-reveal'), loading: save(line, 'loading') });
        line.setAttribute('data-env-ignore', '');
        line.setAttribute('data-env-about-reveal', 'scrub');
        line.setAttribute('loading', 'eager');
        const config = index < 4 ? first : last;
        const css = getComputedStyle(line);
        const baseline = { opacity: css.opacity, transform: css.transform, filter: css.filter };
        const direction = index % 2 === 0 ? -1 : 1;
        const state = { progress: 0 };
        let follower;
        const animation = gsap.fromTo(line, {
          transform: () => `translate3d(${direction * Math.min(innerWidth * (innerWidth <= 767 ? config.mobile : config.distance), 720)}px,0,0) ${baseline.transform === 'none' ? '' : baseline.transform}`,
          opacity: 0,
          filter: `blur(${config.blur}px)${baseline.filter === 'none' ? '' : ` ${baseline.filter}`}`
        }, { transform: baseline.transform, opacity: baseline.opacity, filter: baseline.filter, duration: 1, ease: 'none', paused: true });
        function follow(trigger, immediate = false) {
          if (follower) { follower.kill(); followers.delete(follower); }
          if (immediate) { state.progress = trigger.progress; animation.progress(state.progress); return; }
          follower = gsap.to(state, {
            progress: trigger.progress,
            duration: trigger.direction >= 0 ? config.down : config.up,
            ease: trigger.direction >= 0 ? 'power3.out' : 'power1.out',
            onUpdate: () => animation.progress(state.progress),
            onComplete: () => followers.delete(follower)
          });
          followers.add(follower);
        }
        ScrollTrigger.create({
          trigger: line,
          start: `top ${config.start}%`, end: `top ${Math.min(config.end, config.start - 1)}%`,
          onUpdate: trigger => follow(trigger),
          onRefresh: trigger => { animation.invalidate(); follow(trigger, true); }
        });
        if (!line.complete) line.addEventListener('load', refresh, { once: true, signal: abort.signal });
      });
    }, root);
    reduced.addEventListener('change', () => { if (reduced.matches) dispose(); }, { signal: abort.signal });
    document.fonts?.ready.then(refresh); refresh();
  }
  window.ENVAboutPage = { version: 'page-1', init, destroy: () => dispose() };
  // A plain Webflow page also works without our navigation engine. With the
  // engine present, it owns mount/unmount timing after the mask, not this file.
  if (![...document.scripts].some(script => script.src.includes('/sd-navigation-alternative.js'))) {
    window.Webflow = window.Webflow || [];
    window.Webflow.push(init);
  }
})();
