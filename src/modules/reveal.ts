import type { gsap as GSAP } from 'gsap';
import type { MotionModule } from '../lifecycle';

/** Explicit attributes transfer ownership to ENV; never add them to native animated targets. */
export function createReveal(gsap: typeof GSAP): MotionModule {
  return { name: 'reveal', mount({ root, reducedMotion, cleanup }) {
    if (reducedMotion || typeof IntersectionObserver === 'undefined') return;
    const context = gsap.context(() => {}, root);
    cleanup(() => context.revert());
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        context.add(() => {
          const element = entry.target as HTMLElement;
          if (element.dataset.envReveal === 'fade-scale') {
            const timeline = gsap.timeline();
            timeline.from(element, { scale: 0.99, duration: 0.75, ease: 'power3.out' }, 0.2);
            timeline.from(element, { opacity: 0, duration: 0.5, ease: 'none' }, 0.2);
          } else {
            gsap.from(element, { y: 24, opacity: 0, duration: 0.6, ease: 'power2.out' });
          }
        });
      }
    }, { threshold: 0 });
    cleanup(() => observer.disconnect());
    root.querySelectorAll<HTMLElement>('[data-env-reveal]').forEach(element => {
      // The loader runs after Webflow: keep already-visible content stable, including the hero.
      // Offscreen content stays visible until it actually intersects; a failed script never hides it.
      // Webflow IDs can include a page prefix. Refuse active IX2 ownership.
      const id = element.getAttribute('data-w-id');
      const runtime = (window as Window & { Webflow?: { require(name: string): unknown } }).Webflow;
      const ix2 = runtime?.require('ix2') as { store?: { getState(): { ixData?: { events?: Record<string, { target?: { id?: string }; targets?: { id?: string }[] }> } } } } | undefined;
      const events = Object.values(ix2?.store?.getState().ixData?.events ?? {});
      if (id && events.some(event => [event.target, ...(event.targets ?? [])].some(target => target?.id?.split('|').pop() === id))) {
        console.warn('[ENV] Reveal skipped: remove the native interaction before transferring this element', element);
        return;
      }
      const rect = element.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) return;
      observer.observe(element);
    });
  } };
}
