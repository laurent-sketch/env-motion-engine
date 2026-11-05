/* ENV About — scrubbed story reveals; viewport-trigger fallback without GSAP. */
(() => {
  window.ENVAboutReveals?.destroy();
  const page = document.querySelector('#env-sd-page') || document;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const records = new Map();
  let observer;
  const scrub = window.gsap && window.ScrollTrigger;
  if (scrub) window.gsap.registerPlugin(window.ScrollTrigger);
  const lineSelector = '.bloc-big-text > img';
  const textSelector = '.float-text-left .regular-text, .float-text-right .regular-text, .center-bloc .regular-text';
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
    const distance = innerWidth <= 767 ? 30 : 64;
    const x = line ? (index % 2 ? -distance : distance) : 0;
    const y = line ? 0 : 22;
    const transform = `translate3d(${x}px,${y}px,0) ${baseline.transform === 'none' ? '' : baseline.transform}`;
    element.style.setProperty('will-change', 'opacity,transform,filter');
    record.animation = element.animate([
      { opacity: 0, transform, filter: `blur(${line ? 8 : 5}px) ${baseline.filter === 'none' ? '' : baseline.filter}` },
      { opacity: baseline.opacity, transform: baseline.transform, filter: baseline.filter }
    ], {
      duration: line ? 1100 : 850,
      delay: line ? index % 2 * 65 : 0,
      easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both'
    });
    record.animation.finished.then(() => finish(record), () => {});
  }
  function scrubReveal(record) {
    const { element, line, index, baseline } = record;
    const from = () => {
      const distance = innerWidth <= 767 ? 30 : 64;
      const x = line ? (index % 2 ? -distance : distance) : 0;
      return { opacity: 0,
        transform: `translate3d(${x}px,${line ? 0 : 22}px,0) ${baseline.transform === 'none' ? '' : baseline.transform}`,
        filter: `blur(${line ? 8 : 5}px) ${baseline.filter === 'none' ? '' : baseline.filter}` };
    };
    element.dataset.envAboutReveal = 'scrub';
    record.context = window.gsap.context(() => {
      window.gsap.fromTo(element, { opacity: 0, transform: () => from().transform, filter: from().filter }, {
        opacity: baseline.opacity, transform: baseline.transform, filter: `blur(0px) ${baseline.filter === 'none' ? '' : baseline.filter}`,
        duration: 1, ease: 'none',
        scrollTrigger: { trigger: element, start: 'top 90%', end: 'top 55%', scrub: .6, invalidateOnRefresh: true }
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
      const candidates = root.querySelectorAll(`${lineSelector},${textSelector}`);
      candidates.forEach(element => {
        if (records.has(element) || element.closest('[data-env-reveal],[data-env-text],[data-env-ignore]')) return;
        const line = element.matches(lineSelector);
        const index = line ? [...element.parentElement.querySelectorAll(':scope > img')].indexOf(element) : 0;
        const css = getComputedStyle(element);
        const record = { element, line, index, revealed: false, animation: null, context: null,
          opacity: save(element, 'opacity'), willChange: save(element, 'will-change'),
          marker: element.getAttribute('data-env-about-reveal'), loading: element.getAttribute('loading'),
          baseline: { opacity: css.opacity, transform: css.transform, filter: css.filter } };
        records.set(element, record);
        // SVG text without authored dimensions must load before it reaches the viewport.
        if (line) element.setAttribute('loading', 'eager');
        if (scrub && !preference.matches) {
          scrubReveal(record);
          if (line && !element.complete) element.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true, signal: controller.signal });
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
    records.forEach(record => {
      finish(record);
      if (record.marker === null) record.element.removeAttribute('data-env-about-reveal');
      else record.element.setAttribute('data-env-about-reveal', record.marker);
      if (record.line) {
        if (record.loading === null) record.element.removeAttribute('loading');
        else record.element.setAttribute('loading', record.loading);
      }
    });
    records.clear();
  }
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    records.forEach(record => { reveal(record, false); finish(record); });
  }, { signal: controller.signal });
  window.ENVAboutReveals = { refresh, destroy };
  refresh();
  if (scrub && document.fonts?.ready) document.fonts.ready.then(() => { if (!controller.signal.aborted) window.ScrollTrigger.refresh(); });
})();
