import { beginMenuColors } from './alternative-menu-colors.js';
// TEMPORARY alternative: stable src/sd/index.js is intentionally unchanged.
import { createAlternativeTransition } from './alternative-transition.js';
import Swup from 'swup';
import { installPreload } from './preload.js';
import { installGradient } from './gradient.js';
import ScrollPlugin from '@swup/scroll-plugin';
import config from './interactions.json';
import legacyRoutes from './routes.json';
import testRoutes from './test-routes.json';
import testInline from './test-inline.json';
const routes = { ...legacyRoutes, ...testRoutes };
const validation = { profiles: routes, inlineScripts: testInline, persistentContact: true };
import { runFallback } from './boot.js';
import { installMobileMenuStyles } from './menu.js';
import { wrap, validate, syncMenuVariants, syncMenuImages } from './layout.js';

// Keep authored reveal targets hidden until the page mask has cleared.
const revealGate = document.createElement('style');
revealGate.dataset.envAlternativeRevealGate = '';
revealGate.textContent = '.navbar-logo-center [data-modal="contact"]{pointer-events:auto!important}' + '#env-sd-page[data-env-alt-reveal-wait] :is([data-env-reveal],[data-env-text]):not([data-env-ignore]):not([data-env-ignore] *):not(.w-slider *):not(.swiper-initialized *){visibility:hidden!important}';
document.head.append(revealGate);

// Shared SD layouts with verified runtime profiles. No fetched JS eval.
const base = new URL(import.meta.url);
base.pathname = base.pathname.replace(/[^/]*$/, '');
const path = () => location.pathname.replace(/\/$/, '') || '/';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const main = () => document.querySelector('main.main-wrapper');
let cleanMenu = () => {}, newsObserver, busyAnimation, gradient;
let pageMasks = [];
const loaded = new Set();
const releaseBoot = () => { document.documentElement.classList.remove('env-sd-boot'); window.dispatchEvent(new Event('env:sd-ready')); };
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
function script(name, again = false) {
  if (!again && loaded.has(name)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const el = document.createElement('script'); el.src = new URL(name, base).href;
    const timeout = setTimeout(() => { el.remove(); reject(Error(`ENV SD timeout: ${name}`)); }, 8000);
    el.onload = () => { clearTimeout(timeout); loaded.add(name); el.remove(); resolve(); };
    el.onerror = () => { clearTimeout(timeout); el.remove(); reject(Error(`ENV SD could not load ${name}`)); };
    el.dataset.envSdModule = name; document.head.append(el);
  });
}
function metadata(doc) {
  const finishColors = beginMenuColors();
  try {
  syncMenuVariants(document, doc);
  syncMenuImages(document, doc);
  const liveLinks = [...document.querySelectorAll('.navbar-logo-center a[href]')];
  const nextLinks = [...doc.querySelectorAll('.navbar-logo-center a[href]')];
  liveLinks.forEach((link, i) => { if (nextLinks[i]) link.setAttribute('href', nextLinks[i].getAttribute('href')); });
  for (const attr of ['lang', 'dir']) {
    const value = doc.documentElement.getAttribute(attr);
    if (value === null) document.documentElement.removeAttribute(attr); else document.documentElement.setAttribute(attr, value);
  }
  document.documentElement.setAttribute('data-wf-page', doc.documentElement.getAttribute('data-wf-page'));
  document.body.className = doc.body.className;
  const selectors = 'meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]';
  document.head.querySelectorAll(selectors).forEach(e => e.remove());
  doc.head.querySelectorAll(selectors).forEach(e => document.head.append(e.cloneNode(true)));
  document.head.querySelectorAll('style[data-env-sd-page-style]').forEach(e => e.remove());
  doc.head.querySelectorAll('style:not([data-env-sd-mobile-nav]):not([data-env-sd-gradient-style])').forEach(e => { const copy = e.cloneNode(true); copy.dataset.envSdPageStyle = ''; document.head.append(copy); });
  } finally { finishColors(); }
}
function menu() {
  cleanMenu();
  const nav = document.querySelector('.navbar-logo-center');
  const brand = nav?.querySelector('.navbar-brand-three');
  const text = brand?.querySelector('.nav-link-sd'), logo = brand?.querySelector('.logo-nav');
  if (!nav) return;
  installMobileMenuStyles();
  const abort = new AbortController();
  let state, animations = [], pending = false;
  function update(force = false) {
    const hero = document.querySelector('.hero-wrapper');
    const show = !hero || hero.getBoundingClientRect().bottom <= 0;
    nav.classList.toggle('is-past-hero', show);
    if (!force && show === state) return;
    const initial = state === undefined; state = show;
    if (!text || !logo || !text.getClientRects().length) {
      animations.forEach(a => a.cancel()); animations = []; return;
    }
    const elements = [text, logo];
    const starts = elements.map(el => ({ transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity }));
    animations.forEach(a => a.cancel());
    const before = elements.map(el => el.style.transform);
    elements.forEach(el => el.style.transform = 'none');
    const a = text.getBoundingClientRect(), b = logo.getBoundingClientRect();
    elements.forEach((el, i) => el.style.transform = before[i]);
    const ends = [
      { transform: `translateY(${show ? -a.height * 1.2 : 0}px)`, opacity: show ? 0 : 1 },
      { transform: `translate(${a.left - b.left}px,${a.top + a.height / 2 - b.top - b.height / 2 + (show ? 0 : a.height * 1.2)}px)`, opacity: show ? 1 : 0 }
    ];
    animations = elements.map((el, i) => el.animate([starts[i], ends[i]], { duration: initial || reduced.matches ? 0 : 550, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }));
  }
  function schedule() { if (pending) return; pending = true; requestAnimationFrame(() => { pending = false; update(); }); }
  addEventListener('scroll', schedule, { passive: true, signal: abort.signal });
  addEventListener('resize', () => update(true), { signal: abort.signal });
  logo?.addEventListener('load', () => update(true), { signal: abort.signal });
  update();
  document.querySelectorAll('.navbar-logo-center a[href]').forEach(a => {
    const url = new URL(a.href); const current = url.origin === location.origin && url.pathname === location.pathname && !url.hash;
    a.classList.toggle('w--current', current);
    if (current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  cleanMenu = () => { abort.abort(); animations.forEach(a => a.cancel()); };
}
async function animations() {
  if (!document.querySelector('[data-env-reveal],[data-env-text]')) return;
  if (!window.gsap) throw Error('GSAP unavailable');
  let done;
  const ready = new Promise(resolve => { done = resolve; });
  window.addEventListener('env:animations-ready', done, { once: true });
  try { await script('animations.js', true); await Promise.race([ready, wait(1500)]); }
  finally { window.removeEventListener('env:animations-ready', done); }
}
async function mount({ deferReveals = false } = {}) {
  menu();
  window.ENVVideos?.refresh();
  if (window.gsap && window.ScrollTrigger) {
    document.querySelectorAll('#env-sd-page .section.mask').forEach(section => {
      if (section.dataset.maskInitialized) return;
      section.dataset.maskInitialized = 'true';
      pageMasks.push(window.gsap.fromTo(section, { clipPath: 'inset(10%)' }, { clipPath: 'inset(0%)', ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 15%', scrub: .6, invalidateOnRefresh: true } }));
    });
  }
  await Promise.all([
    document.querySelector('.hero-wrapper .sd-slider') ? script('hero.js', true) : Promise.resolve(),
    deferReveals ? Promise.resolve() : animations()
  ]);
  const roots = [...document.querySelectorAll('.swiper-news[data-env-news]')];
  if (roots.length) {
    newsObserver = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { newsObserver.disconnect(); script('news.js', true).catch(console.error); }
    }, { rootMargin: '600px' }); roots.forEach(el => newsObserver.observe(el));
  }
}
function unmount() {
  pageMasks.forEach(tween => { tween.scrollTrigger?.kill(); tween.kill(); }); pageMasks = [];
  window.ScrollTrigger?.getAll().filter(trigger => trigger.trigger?.matches?.('#env-sd-page .section.mask')).forEach(trigger => trigger.kill());
  cleanMenu(); newsObserver?.disconnect();
  document.querySelector('.hero-wrapper')?.__envHeroCleanup?.();
  window.ENVAnimations?.destroy(); window.ENVNews?.destroy(); window.ENVNewsMarquee?.destroy();
  const root = document.querySelector('#env-sd-page'); if (root) window.ENVVideos?.release(root);
}
async function fade(el, from, to, duration) {
  if (reduced.matches) return;
  busyAnimation = el.animate([{ opacity: from }, { opacity: to }], { duration, easing: 'ease', fill: 'forwards' });
  await busyAnimation.finished.catch(() => {});
}
async function start() {
  if (window.ENVSD) { releaseBoot(); return; }
  if (!window.ENVVideos?.stage || !window.ENVVideos?.release) throw Error('Install the matching SD head block before enabling navigation');
  const transition = createAlternativeTransition();
  const useMask = window.ENVSDTransition === 'mask';
  document.documentElement.dataset.envTransitionMode = useMask ? 'mask' : 'classic';
  const runtime = window.Webflow;
  const ix2 = runtime?.require('ix2'), ix3 = runtime?.require('ix3');
  let native;
  if (!ix2?.init || !ix3?.ready) throw Error('Webflow runtime unavailable');
  // A CSS-only Webflow publish changes the URL without changing the audited JS runtime.
  // Use the styles actually loaded in this document as the navigation compatibility baseline.
  const activeSheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map(el => el.getAttribute('href'));
  const gsapScripts = [...document.scripts].map(el => el.src).filter(url => url.includes('/gsap/'));
  const profile = validate(document, path(), activeSheets, { refreshRuntime: true, gsapScripts, ...validation });
  let configModule;
  const configuration = async record => {
    if (!record.runtimeChanged && !record.currentExport) return config;
    configModule ||= import('./runtime-config.js');
    return (await configModule).runtimeConfig(record.dataScripts || record.bootstrap, record.site);
  };
  const warmPage = html => {
    const urls = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(match => match[1]);
    const bootstrap = urls.find(url => /\/js\/webflow\.(?![sa]chunk\.)[^/]+\.js$/.test(url));
    if (!bootstrap || Object.values(routes).some(record => !record.currentExport && record.scripts.includes(bootstrap))) return;
    return configuration({ runtimeChanged: true, bootstrap, dataScripts: urls.filter(url => url.includes('/js/webflow.')).slice(2), site: profile.site });
  };
  const ensureSlider = async () => {
    if (runtime.require('slider')?.ready) return;
    const slider = profile.slider || routes['/home-sd'].slider;
    await script(slider.script);
    let registered = false;
    // Activate only the audited slider factory from the official shared chunk.
    // Loading Work's bootstrap alone does not call this optional factory.
    window.webpackChunk.push([[`env-sd-slider-${Date.now()}`], {}, require => { require(slider.factory); registered = true; }]);
    if (!registered || !runtime.require('slider')?.ready) throw Error('Audited slider factory unavailable');
  };
  native = ['slider', 'navbar', 'dropdown', 'tabs'].map(name => runtime.require(name)).filter(Boolean);
  wrap(document);
  gradient = useMask ? null : installGradient();
  document.head.querySelectorAll('style').forEach(el => { if (profile.styles.includes(el.textContent)) el.dataset.envSdPageStyle = ''; });
  await window.ENVSDLoader?.prepare?.();
  await mount();
  // Keep the menu DOM and do not replay its initial reveal on later visits.
  document.querySelector('.navbar-logo-center')?.setAttribute('data-env-ignore', '');
  const swup = new Swup({ containers: ['#env-sd-page'], animationSelector: false, cache: window.ENVSDPreload === true,
    plugins: [new ScrollPlugin({ animateScroll: { betweenPages: false, samePageWithHash: !reduced.matches, samePage: !reduced.matches } })],
    linkSelector: 'a[href]:not([download]):not([target]):not([data-no-swup])',
    ignoreVisit: (url, { el } = {}) => { const u = new URL(url, location.href); return u.origin !== location.origin || /\.(?:pdf|zip|png|jpe?g|webp|svg|mp4|webm|css|js)$/i.test(u.pathname) || !!el?.closest('[data-no-swup]'); }
  });
  window.ENVSD = { swup, status: 'ready' };
  if (window.ENVSDPreload === true) {
    window.ENVSD.stopPreload = installPreload(swup, { warmPage });
    // Warm the already-loaded entry export too; sibling pages often share its data chunk.
    void configuration(profile).catch(() => {});
  }
  document.documentElement.setAttribute('data-env-sd-document', crypto.randomUUID());
  // Swup normally clones containers; moving them preserves staged video sources.
  swup.replaceContent = visit => {
    const root = document.querySelector('#env-sd-page');
    const next = visit.to.document?.querySelector('#env-sd-page');
    if (!root || !next) return false;
    window.ENVVideos?.stage(next);
    root.replaceWith(next);
    document.title = visit.to.document.querySelector('title')?.textContent || '';
    return true;
  };
  swup.hooks.replace('animation:out:await', async () => {
    if (useMask) transition.capture();
    else await fade(document.querySelector('#env-sd-page'), 1, 0, 200);
  });
  swup.hooks.replace('content:replace', async (visit, args, replace) => {
    const doc = visit.to.document;
    if (!doc || !replace) throw Error('Missing incoming page');
    const record = validate(doc, new URL(visit.to.url, location.href).pathname, activeSheets, { refreshRuntime: true, gsapScripts, ...validation });
    const incomingConfig = await configuration(record);
    if (doc.querySelectorAll('.navbar-logo-center a[href]').length !== document.querySelectorAll('.navbar-logo-center a[href]').length) throw Error('Menu structure changed');
    const next = wrap(doc); next.classList.add('env-sd-pending'); if (useMask) next.setAttribute('data-env-alt-reveal-wait', '');
    if (next.querySelector('.w-slider') && !runtime.require('slider')?.ready) {
      await ensureSlider();
      const slider = runtime.require('slider'); if (!native.includes(slider)) native.push(slider);
    }
    window.lenis?.stop();
    unmount(); native.forEach(module => module.destroy?.()); ix2.destroy(); ix3.destroy();
    busyAnimation?.cancel();
    await replace(visit, args);
    metadata(doc);
    gradient?.prepare();
    if (useMask) transition.prepare(document.querySelector('#env-sd-page'));
    native.forEach(module => module.ready?.());
    ix2.init(incomingConfig.ix2);
    await Promise.race([ix3.ready(), wait(4000).then(() => { throw Error('Webflow interaction restart timeout'); })]);
    const instance = ix3.getInstance(); if (!instance) throw Error('Webflow interactions did not restart');
    instance.setFeatures({ timelineGroups: false }); instance.register(incomingConfig.interactions, incomingConfig.timelines);
    document.documentElement.classList.add('w-mod-ix3');

  });
  swup.hooks.replace('animation:in:await', async () => {
    const el = document.querySelector('#env-sd-page');
    if (useMask) {
      await transition.reveal(el);
      try { await animations(); }
      finally { el.removeAttribute('data-env-alt-reveal-wait'); window.lenis?.start(); }
    } else {
      await fade(el, 0, 1, 350); busyAnimation?.cancel();
    }
  });
  swup.hooks.on('page:view', async visit => {
    try {
    // ScrollPlugin restores the destination in a queued animation frame. Wait for
    // that frame before syncing Lenis or measuring the viewport mask. Otherwise
    // a scrolled outgoing page can offset the mask below the visible viewport.
    await new Promise(resolve => requestAnimationFrame(resolve));
    window.lenis?.resize();
    window.lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    if (!useMask) window.lenis?.start();
    await mount({ deferReveals: useMask });
    document.querySelector('#env-sd-page')?.classList.remove('env-sd-pending');
    gradient?.commit();
    if (!['localhost', '127.0.0.1'].includes(location.hostname) && typeof window.gtag === 'function') window.gtag('event', 'page_view', { page_title: document.title, page_location: location.href });
    const content = main(); if (content) { const tab = content.getAttribute('tabindex'); content.setAttribute('tabindex', '-1'); content.focus({ preventScroll: true }); if (tab === null) content.removeAttribute('tabindex'); else content.setAttribute('tabindex', tab); }
    } catch (error) {
      document.querySelector('#env-sd-page')?.classList.remove('env-sd-pending');
      console.error('[ENV SD] Page initialization failed; native fallback', error);
      window.location.assign(visit.to.url);
    }
  });
  const recover = () => { document.querySelector('#env-sd-page')?.removeAttribute('data-env-alt-reveal-wait'); transition.cleanup(); gradient?.refresh(); releaseBoot(); window.lenis?.start(); busyAnimation?.cancel(); document.querySelector('#env-sd-page')?.classList.remove('env-sd-pending'); };
  swup.hooks.on('visit:fail', recover);
  swup.hooks.on('visit:abort', recover);
  releaseBoot();
  // Optional smooth scrolling must not hold menu interception or the initial loader.
  void (async () => {
  if (!window.lenis && !reduced.matches) {
    try {
      await script('https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js');
      window.lenis = new window.Lenis({ duration: 1.2, smoothWheel: true, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      requestAnimationFrame(function frame(time) { window.lenis?.raf(time); requestAnimationFrame(frame); });
    } catch (error) { console.warn('[ENV SD] Native scroll retained', error); }
  }
  })();
}
const boot = () => start().catch(error => {
  console.error('[ENV SD] Native navigation retained', error);
  // Still initialize ordinary widgets when the certified export has changed.
  runFallback(() => script('env.js'), () => {
    if (![...document.scripts].some(s => /const brand =/.test(s.textContent) && !/ENV SD/.test(s.textContent))) menu();
  }).catch(error => console.error('[ENV SD] Widget fallback failed', error)).finally(releaseBoot);
});
// Webflow's ready queue waits for its modules/DOM, not every image and video.
window.Webflow = window.Webflow || [];
window.Webflow.push(boot);
