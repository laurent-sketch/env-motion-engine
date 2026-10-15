/* ENV Animations — standalone Webflow reveals. Requires GSAP 3.13+.
 * SplitText 3.13+ enables lines/words/chars; otherwise text fades as a block.
 * Add attributes only to elements without competing Webflow animations.
 */
(() => {
  'use strict';
  let observer;
  let context;
  let disposed = false;
  const splits = new Set();
  const nativeAnimations = new Set();
  const seen = new WeakSet();
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Match the approved preview's CSS cubic-bezier(.2, .65, .2, 1),
  // solving the curve's x coordinate rather than treating its parameter as time.
  function previewEase(progress) {
    if (progress <= 0 || progress >= 1) return Math.max(0, Math.min(1, progress));
    let low = 0, high = 1;
    for (let i = 0; i < 20; i++) {
      const t = (low + high) / 2;
      const x = 0.6 * t * (1 - t) + t * t * t;
      if (x < progress) low = t;
      else high = t;
    }
    const t = (low + high) / 2;
    return 1.95 * (1 - t) * (1 - t) * t + 3 * (1 - t) * t * t + t * t * t;
  }
  const number = (el, key, fallback, max) => {
    const raw = el.getAttribute(key);
    const value = raw === null || raw.trim() === '' ? NaN : Number(raw);
    return Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : fallback;
  };

  function stop() {
    observer?.disconnect();
    nativeAnimations.forEach(animation => animation.cancel());
    nativeAnimations.clear();
    context?.revert();
    context = undefined;
    splits.forEach(split => split.revert());
    splits.clear();
  }

  function start() {
    if (disposed) return;
    stop();
    if (media.matches) return;
    const gsap = window.gsap;
    if (!gsap || !window.IntersectionObserver) {
      console.warn('[ENV Animations] GSAP or IntersectionObserver unavailable. Content stays visible.');
      return;
    }
    const SplitText = window.SplitText;
    const ScrollTrigger = window.ScrollTrigger;
    if (SplitText) gsap.registerPlugin(SplitText);
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    context = gsap.context(() => {});

    function play(el, scrub = false) {
      if (!scrub) seen.add(el);
      observer.unobserve(el);
      context.add(() => {
        const scroll = scrub ? {
          trigger: el,
          start: () => `top ${number(el, 'data-env-scroll-start', 85, 100)}%`,
          end: () => {
            const start = number(el, 'data-env-scroll-start', 85, 100);
            const end = number(el, 'data-env-scroll-end', 35, 100);
            return `top ${Math.max(0, Math.min(end, start - 1))}%`;
          },
          scrub: true,
          invalidateOnRefresh: true
        } : undefined;
        const text = el.hasAttribute('data-env-text');
        const delay = number(el, 'data-env-delay', 0, 5);
        const duration = number(el, 'data-env-duration', text ? 0.8 : 0.75, 5);
        const type = el.getAttribute('data-env-text') || 'lines';
        const requestedEffect = el.getAttribute('data-env-text-effect');
        const effect = ['fade', 'up', 'scale'].includes(requestedEffect) ? requestedEffect : 'up';
        if (!text && !scrub && el.dataset.envReveal === 'fade-up' && typeof el.animate === 'function') {
          const style = getComputedStyle(el);
          const baseTransform = style.transform === 'none' ? '' : style.transform;
          const animation = el.animate([
            { opacity: 0, transform: `translateY(16px) ${baseTransform}`.trim() },
            { opacity: style.opacity, transform: baseTransform || 'translateY(0)' }
          ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(.2,.65,.2,1)',
            fill: 'backwards'
          });
          nativeAnimations.add(animation);
          const release = () => {
            nativeAnimations.delete(animation);
            animation.cancel(); // Release the effect and return to authored CSS.
          };
          animation.finished.then(release, () => nativeAnimations.delete(animation));
          return;
        }
        // Preserve nested link/control semantics by animating these texts as a block.
        const interactive = el.querySelector('a, button, input, select, textarea, [tabindex]');
        if (text && SplitText && !interactive && ['lines', 'words', 'chars'].includes(type)) {
          let split;
          split = SplitText.create(el, {
            type: type === 'chars' ? 'words,chars' : type,
            mask: type === 'lines' && effect === 'up' ? 'lines' : undefined,
            autoSplit: true,
            aria: 'auto',
            onSplit(self) {
              const targets = self[type];
              const defaultStagger = type === 'chars' ? 0.018 : type === 'words' ? 0.045 : 0.1;
              const stagger = number(el, 'data-env-stagger', defaultStagger, 1);
              return gsap.from(targets, {
                ...(effect === 'up' ? { yPercent: type === 'lines' ? 110 : 65 } : {}),
                ...(effect === 'scale' ? { scale: 0.98 } : {}),
                opacity: 0,
                duration,
                delay: scrub ? 0 : delay,
                ease: scrub ? 'none' : 'power3.out',
                ...(scrub ? { scrollTrigger: scroll } : {}),
                stagger: { each: stagger, amount: Math.min(stagger * Math.max(targets.length - 1, 0), 1.2) },
                onComplete() {
                  if (scrub) return; // Keep split targets alive for reverse scrolling.
                  // Restore original markup after the reveal, including natural line wrapping.
                  queueMicrotask(() => {
                    if (!split || !splits.has(split)) return;
                    split.revert();
                    splits.delete(split);
                  });
                }
              });
            }
          });
          splits.add(split);
          return;
        }
        const scale = !text && el.dataset.envReveal === 'fade-scale';
        const timeline = gsap.timeline({ delay: scrub ? 0 : delay, ...(scrub ? { scrollTrigger: scroll } : {}) });
        if (scale) {
          timeline.from(el, { scale: 0.99, duration: 0.75, ease: scrub ? 'none' : 'power3.out' }, scrub ? 0 : 0.2);
          timeline.from(el, { opacity: 0, duration: 0.5, ease: 'none' }, scrub ? 0 : 0.2);
        } else {
          timeline.from(el, {
            ...(!text || effect === 'up' ? { y: 16 } : {}),
            ...(text && effect === 'scale' ? { scale: 0.98 } : {}),
            opacity: 0, duration, ease: scrub ? 'none' : previewEase
          });
        }
      });
    }

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !seen.has(entry.target)) play(entry.target);
      });
    }, { threshold: 0 });

    document.querySelectorAll('[data-env-reveal], [data-env-text]').forEach(el => {
      const scrub = el.getAttribute('data-env-trigger') === 'scrub';
      if ((!scrub && seen.has(el)) || el.closest('[data-env-ignore], .w-slider, .swiper-initialized')) return;
      // Avoid compounded transforms/opacity on an animated ancestor and its text.
      if (el.parentElement?.closest('[data-env-reveal], [data-env-text]')) return;
      if (scrub && ScrollTrigger) play(el, true);
      else {
        if (scrub) console.warn('[ENV Animations] ScrollTrigger unavailable; using a one-time reveal.', el);
        observer.observe(el);
      }
    });
  }

  function ready() {
    const boot = () => { if (!disposed) start(); };
    if (document.fonts?.ready) document.fonts.ready.then(boot, boot);
    else boot();
  }
  window.ENVAnimations?.destroy?.();
  window.ENVAnimations = {
    refresh: start,
    destroy() {
      disposed = true;
      stop();
      media.removeEventListener('change', start);
      window.removeEventListener('load', ready);
    }
  };
  media.addEventListener('change', start);
  if (document.readyState === 'complete') ready();
  else window.addEventListener('load', ready, { once: true });
})();
