/* ENV News: one loader, data-env-news="swiper" or "marquee".
 * Install this instead of the old News initializer/direct marquee script.
 */
(() => {
  'use strict';
  const base = new URL('.', document.currentScript?.src || location.href);
  const scripts = new Map(), records = new Map();
  let disposed = false, cssPromise;
  const number = (root, attr, fallback, min, max) => {
    const raw = root.getAttribute(attr), n = raw === null || raw.trim() === '' ? NaN : Number(raw);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
  };
  function script(src) {
    if (!scripts.has(src)) scripts.set(src, new Promise((resolve, reject) => {
      const el = document.createElement('script'); el.src = src; el.async = true;
      el.onload = resolve; el.onerror = () => { el.remove(); scripts.delete(src); reject(new Error(`Unable to load ${src}`)); };
      document.head.append(el);
    }));
    return scripts.get(src);
  }
  function css() {
    if (!cssPromise) cssPromise = new Promise((resolve, reject) => {
      let el = [...document.querySelectorAll('link[rel="stylesheet"]')].find(link => /swiper-bundle(?:\.min)?\.css/.test(link.href));
      if (el?.sheet) { resolve(); return; }
      if (!el) { el = document.createElement('link'); el.rel = 'stylesheet'; el.href = 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css'; document.head.append(el); }
      el.addEventListener('load', resolve, { once: true });
      el.addEventListener('error', () => { cssPromise = undefined; reject(new Error('Unable to load Swiper stylesheet')); }, { once: true });
    });
    return cssPromise;
  }
  function stop(record) {
    record.cleanup?.(); record.cleanup = undefined;
    record.layoutCleanup?.(); record.layoutCleanup = undefined; record.mode = null;
  }
  async function select(root, record, force = false) {
    const mode = root.getAttribute('data-env-news');
    if (!force && mode === record.mode) return;
    const revision = ++record.revision;
    stop(record);
    if (!['swiper', 'marquee'].includes(mode)) return;
    const track = root.querySelector(':scope > .swiper-wrapper-news, :scope > .w-dyn-list > .swiper-wrapper-news');
    const host = track?.parentElement;
    // Empty CMS collections keep their authored empty state.
    if (!track || ![...track.children].some(el => el.matches('.swiper-slide-news'))) return;
    // A stale external initializer must not compete with the selected engine.
    if ([root, host].some(el => el?.swiper && !el.swiper.destroyed)) {
      console.warn('[ENV News] Remove the old News Swiper initializer before using this loader.', root); return;
    }
    if (root.getAttribute('data-env-news-layout') === 'alternating') {
      const shapes = ['big-square', 'small-square', 'landscape'];
      const cards = [...track.children].filter(el => el.matches('.swiper-slide-news:not([data-env-news-clone])'));
      const authored = cards.map(el => [el, el.getAttribute('data-env-news-shape')]);
      cards.forEach((el, i) => el.setAttribute('data-env-news-shape', shapes[i % shapes.length]));
      record.layoutCleanup = () => authored.forEach(([el, value]) => value === null ? el.removeAttribute('data-env-news-shape') : el.setAttribute('data-env-news-shape', value));
    }
    try {
      if (mode === 'marquee') {
        if (!window.ENVNewsMarquee) await script(new URL('news-marquee.js', base).href);
        if (disposed || revision !== record.revision) return;
        if (!window.ENVNewsMarquee) throw new Error('Marquee module unavailable');
        window.ENVNewsMarquee.init(root);
        record.cleanup = () => window.ENVNewsMarquee?.destroy(root);
      } else {
        await Promise.all([css(), window.Swiper ? Promise.resolve() : script('https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js')]);
        if (disposed || revision !== record.revision) return;
        if (!window.Swiper) throw new Error('Swiper unavailable');
        const section = root.closest('section') || root.parentElement;
        const nodes = [...new Set([root, host, track, ...track.children].filter(Boolean))];
        const styles = nodes.map(el => [el, el.getAttribute('style')]);
        if (host !== root) Object.assign(host.style, { position: 'relative', minWidth: '0', width: '100%', touchAction: 'pan-y' });
        const instance = new window.Swiper(host, {
          wrapperClass: 'swiper-wrapper-news', slideClass: 'swiper-slide-news',
          slidesPerView: 'auto', slidesPerGroup: 1,
          spaceBetween: number(root, 'data-env-news-gap', 16, 0, 200),
          speed: number(root, 'data-env-news-transition', 700, 0, 3000),
          grabCursor: true, allowTouchMove: true, simulateTouch: true,
          loop: false, rewind: false, watchOverflow: true, resizeObserver: true,
          mousewheel: { enabled: true, forceToAxis: true, releaseOnEdges: true, sensitivity: 1 },
          navigation: { prevEl: section?.querySelector('.swiper-button-prev'), nextEl: section?.querySelector('.swiper-button-next') },
          a11y: { enabled: true, prevSlideMessage: 'Slide précédente', nextSlideMessage: 'Slide suivante' }
        });
        record.cleanup = () => {
          instance.destroy(true, true);
          styles.forEach(([el, style]) => style === null ? el.removeAttribute('style') : el.setAttribute('style', style));
        };
      }
      record.mode = mode;
      root.dispatchEvent(new CustomEvent('env:news-ready', { detail: { mode } }));
    } catch (error) { console.error('[ENV News]', error); }
  }
  function init() {
    if (disposed) return;
    if (!document.querySelector('style[data-env-news-base]')) {
      const el = document.createElement('style'); el.setAttribute('data-env-news-base', '');
      el.textContent = '.swiper-news[data-env-news]{margin:0;padding:0}.swiper-news[data-env-news] .swiper-wrapper-news{margin:0;padding:0}.swiper-news[data-env-news="swiper"]{position:relative;overflow:hidden;min-width:0;touch-action:pan-y}.swiper-news[data-env-news="swiper"] .swiper-wrapper-news{position:relative;display:flex;flex-wrap:nowrap;width:100%;box-sizing:content-box;transition-property:transform;gap:0}.swiper-news[data-env-news="swiper"] .swiper-wrapper-news>.swiper-slide-news{position:relative;flex-shrink:0;box-sizing:border-box}.swiper-news[data-env-news="swiper"] .swiper-navigation-icon{display:none}';
      el.textContent += `
.swiper-news[data-env-news-layout="alternating"]{--env-news-big:420px;--env-news-small:320px;--env-news-landscape:775.111px}
.swiper-news[data-env-news-layout="alternating"] .swiper-slide-news[data-env-news-shape]{width:var(--env-news-width);flex-shrink:0}
.swiper-news[data-env-news-layout="alternating"] [data-env-news-shape="big-square"]{--env-news-width:var(--env-news-big);--env-news-ratio:1}
.swiper-news[data-env-news-layout="alternating"] [data-env-news-shape="small-square"]{--env-news-width:var(--env-news-small);--env-news-ratio:1}
.swiper-news[data-env-news-layout="alternating"] [data-env-news-shape="landscape"]{--env-news-width:var(--env-news-landscape);--env-news-ratio:16/9}
.swiper-news[data-env-news-layout="alternating"] .swiper-slide-news[data-env-news-shape] .news-item{width:100%;min-width:0}
.swiper-news[data-env-news-layout="alternating"] .swiper-slide-news[data-env-news-shape] .media-project-wrap{position:relative;width:100%;height:auto;aspect-ratio:var(--env-news-ratio);overflow:hidden;flex:none}
.swiper-news[data-env-news-layout="alternating"] .swiper-slide-news[data-env-news-shape] .image-news{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
@media(max-width:767px){.swiper-news[data-env-news-layout="alternating"]{--env-news-big:85vw;--env-news-small:70vw;--env-news-landscape:92vw}}
`;
      document.head.append(el);
    }
    document.querySelectorAll('.swiper-news').forEach(root => {
      if (records.has(root)) return;
      const record = { revision: 0, mode: null, cleanup: undefined, observer: undefined };
      record.observer = new MutationObserver(mutations => select(root, record, mutations.some(m => m.attributeName === 'data-env-news-layout')));
      record.observer.observe(root, { attributes: true, attributeFilter: ['data-env-news', 'data-env-news-layout'] });
      records.set(root, record); select(root, record);
    });
  }
  window.ENVNews?.destroy?.();
  window.ENVNews = {
    init,
    refresh() { records.forEach((record, root) => select(root, record, true)); init(); },
    destroy() { disposed = true; records.forEach(record => { record.revision++; record.observer.disconnect(); stop(record); }); records.clear(); }
  };
  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();
