/* ENV global loader — experimental. Replace old component initializers. */
(() => {
  'use strict';
  if (window.ENVSite) return;
  const entry = document.currentScript;
  const base = new URL('.', entry.src);
  const requests = new Map();
  const status = {};
  window.ENVSite = { status };
  function load(name, url = new URL(name, base).href) {
    if (!requests.has(name)) requests.set(name, new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => { status[name] = 'ready'; resolve(); };
      script.onerror = () => { status[name] = 'error'; requests.delete(name); script.remove(); reject(new Error(`ENV: ${name} failed`)); };
      status[name] = 'loading'; document.head.append(script);
    }));
    return requests.get(name);
  }
  const report = error => console.error('[ENV Site]', error);
  async function animations() {
    if (!document.querySelector('[data-env-reveal], [data-env-text]')) return;
    const cdn = 'https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/';
    if (!window.gsap) await load('gsap', cdn + 'gsap.min.js');
    if (document.querySelector('[data-env-text]') && !window.SplitText) await load('SplitText', cdn + 'SplitText.min.js');
    if (document.querySelector('[data-env-trigger="scrub"]') && !window.ScrollTrigger) await load('ScrollTrigger', cdn + 'ScrollTrigger.min.js');
    await load('animations.js');
  }
  function news() {
    const roots = [...document.querySelectorAll('.swiper-news[data-env-news]')];
    if (!roots.length) return;
    if (!window.IntersectionObserver) { load('news.js').catch(report); return; }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      observer.disconnect(); load('news.js').catch(report);
    }, { rootMargin: '600px' });
    roots.forEach(root => observer.observe(root));
  }
  function smoothScroll() {
    if (entry.getAttribute('data-env-lenis') === 'false' || window.lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = async () => {
      if (!window.Lenis) await load('Lenis', 'https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js');
      if (window.lenis) return;
      const lenis = new window.Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      window.lenis = lenis;
      requestAnimationFrame(function frame(time) { lenis.raf(time); requestAnimationFrame(frame); });
    };
    const idle = () => {
      if (window.requestIdleCallback) requestIdleCallback(() => start().catch(report), { timeout: 2000 });
      else setTimeout(() => start().catch(report), 250);
    };
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
  }
  function boot() {
    if (document.querySelector('.hero-wrapper .sd-slider')) load('hero.js').catch(report);
    animations().catch(report);
    news(); smoothScroll();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
