/* ENV About — scrubbed story reveals; viewport-trigger fallback without GSAP. */
(() => {
  window.ENVAboutReveals?.destroy();
  const page = document.querySelector('#env-sd-page') || document;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const records = new Map();
  const rootStyles = new Map();
  const logoLayers = new Map();
  let refreshFrame;
  let observer;
  const scrub = window.gsap && window.ScrollTrigger;
  if (scrub) window.gsap.registerPlugin(window.ScrollTrigger);
  const lineSelector = '.bloc-big-text > img';
  // Measure layout rather than the transform Webflow applies to about-second.
  const layoutTop = element => {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) top += node.offsetTop || 0;
    return top;
  };
  const queueRefresh = () => {
    if (controller.signal.aborted || refreshFrame || !scrub) return;
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = null;
      if (!controller.signal.aborted) window.ScrollTrigger.refresh();
    });
  };
  const save = (element, property) => [element.style.getPropertyValue(property), element.style.getPropertyPriority(property)];
  const restore = (element, property, [value, priority]) => {
    if (value) element.style.setProperty(property, value, priority);
    else element.style.removeProperty(property);
  };
  function finish(record) {
    record.context?.revert(); record.context = null;
    restore(record.element, 'opacity', record.opacity);
    restore(record.element, 'will-change', record.willChange);
    record.animation?.cancel(); record.animation = null;
  }
  function reveal(record, animate = true) {
    if (!record || record.revealed) return;
    record.revealed = true;
    observer?.unobserve(record.element);
    record.element.dataset.envAboutReveal = 'visible';
    if (!animate || preference.matches) { finish(record); return; }
    const { element, line, index, baseline } = record;
    const distance = Math.min(innerWidth * (innerWidth <= 767 ? .55 : .42), 720);
    const x = index % 2 ? distance : -distance;
    const y = 0;
    const transform = `translate3d(${x}px,${y}px,0) ${baseline.transform === 'none' ? '' : baseline.transform}`;
    element.style.setProperty('will-change', 'opacity,transform');
    record.animation = element.animate([
      { opacity: 0, transform },
      { opacity: baseline.opacity, transform: baseline.transform }
    ], {
      duration: line ? 1100 : 850,
      delay: line ? index % 2 * 65 : 0,
      easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both'
    });
    record.animation.finished.then(() => finish(record), () => {});
  }
  function scrubReveal(record) {
    const { element, root, index, baseline } = record;
    const from = () => {
      const distance = Math.min(innerWidth * (innerWidth <= 767 ? .55 : .42), 720);
      const x = index % 2 ? distance : -distance;
      return { opacity: 0,
        transform: `translate3d(${x}px,0,0) ${baseline.transform === 'none' ? '' : baseline.transform}` };
    };
    element.dataset.envAboutReveal = 'scrub';
    record.context = window.gsap.context(() => {
      window.gsap.fromTo(element, { opacity: 0, transform: () => from().transform }, {
        opacity: baseline.opacity, transform: baseline.transform,
        duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: root,
          start: () => `top+=${layoutTop(element) - layoutTop(root)} 110%`,
          end: () => `top+=${layoutTop(element) - layoutTop(root)} 65%`,
          scrub: .6, invalidateOnRefresh: true }
      });
    }, element);
  }
  if (!scrub && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const record = records.get(entry.target);
        if (entry.isIntersecting) reveal(record);
        // Direct/history visits below the story must not leave preceding text hidden.
        else if (entry.boundingClientRect.bottom < 0) reveal(record, false);
      });
    }, { threshold: .12, rootMargin: '0px 0px -10% 0px' });
  }
  function roots() {
    const result = new Set(page.querySelectorAll('.section-animation-about'));
    // Also supports the group currently published without its wrapper class.
    page.querySelectorAll('.section.hero-about').forEach(hero => {
      const parent = hero.parentElement;
      if ([...parent.children].some(el => el.matches('.section.about-second')) &&
          [...parent.children].some(el => el.matches('.section.third-bloc'))) result.add(parent);
    });
    return [...result].filter(root => !root.closest('[data-env-transition-snapshot]'));
  }
  function refresh() {
    roots().forEach(root => {
      // Entrance and native scroll exit need separate transform/filter owners.
      // Keep all Designer attributes on the image; animations.js uses this layer.
      root.querySelectorAll('.section.hero-about > .big--logo.middle[data-env-reveal="fade-scale"]').forEach(logo => {
        if (logoLayers.has(logo)) return;
        const layer = document.createElement('div');
        layer.setAttribute('data-env-about-logo-layer', '');
        layer.style.cssText = 'display:grid;place-items:center;width:100%;height:100%;min-width:0;flex-shrink:0;';
        logo.before(layer); layer.append(logo); logoLayers.set(logo, layer);
      });
      if (!rootStyles.has(root)) {
        rootStyles.set(root, save(root, 'overflow-x'));
        root.style.setProperty('overflow-x', 'clip');
      }
      const candidates = root.querySelectorAll(lineSelector);
      candidates.forEach(element => {
        if (records.has(element) || element.closest('[data-env-reveal],[data-env-text],[data-env-ignore]')) return;
        const line = element.matches(lineSelector);
        const index = line ? [...element.parentElement.querySelectorAll(':scope > img')].indexOf(element) : 0;
        const css = getComputedStyle(element);
        const record = { element, root, line, index, revealed: false, animation: null, context: null,
          alignSelf: save(element, 'align-self'), opacity: save(element, 'opacity'), willChange: save(element, 'will-change'),
          marker: element.getAttribute('data-env-about-reveal'), loading: element.getAttribute('loading'),
          baseline: { opacity: css.opacity, transform: css.transform, filter: css.filter } };
        records.set(element, record);
        // SVG text without authored dimensions must load before it reaches the viewport.
        if (line) element.setAttribute('loading', 'eager');
        if (scrub && !preference.matches) {
          scrubReveal(record);
          if (line && !element.complete) element.addEventListener('load', queueRefresh, { once: true, signal: controller.signal });
          return;
        }
        if (!observer || preference.matches || typeof element.animate !== 'function') { reveal(record, false); return; }
        element.style.opacity = '0'; element.dataset.envAboutReveal = 'pending';
        observer.observe(element);
      });
    });
  }
  function destroy() {
    controller.abort(); observer?.disconnect();
    if (refreshFrame) cancelAnimationFrame(refreshFrame);
    records.forEach(record => {
      finish(record);
      restore(record.element, 'align-self', record.alignSelf);
      if (record.marker === null) record.element.removeAttribute('data-env-about-reveal');
      else record.element.setAttribute('data-env-about-reveal', record.marker);
      if (record.line) {
        if (record.loading === null) record.element.removeAttribute('loading');
        else record.element.setAttribute('loading', record.loading);
      }
    });
    records.clear();
    logoLayers.forEach((layer, logo) => { if (logo.parentElement === layer) layer.replaceWith(logo); });
    logoLayers.clear();
    rootStyles.forEach((value, root) => restore(root, 'overflow-x', value)); rootStyles.clear();
  }
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    records.forEach(record => { reveal(record, false); finish(record); });
  }, { signal: controller.signal });
  window.ENVAboutReveals = { refresh, destroy };
  refresh();
  queueRefresh();
  if (scrub && document.fonts?.ready) document.fonts.ready.then(queueRefresh);
})();
