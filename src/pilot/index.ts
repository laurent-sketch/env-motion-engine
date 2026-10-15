import { createEngine } from '../index';
import { waitForDeferredScripts } from './ready';
import { pilotFaq } from './faq';
import { createTestimonials, type SliderConstructor } from './testimonials';

export interface PilotOptions {
  /** Explicit migration contract: both legacy custom scripts must be removed. */
  legacyScriptsRemoved: true;
  /** Injectable for self-hosted Swiper; otherwise reuse window.Swiper. */
  Swiper?: SliderConstructor;
}

/** Phase 1: adopt existing widgets while preserving Webflow's native navigation. */
export async function createPilotEngine(options: PilotOptions) {
  if (options.legacyScriptsRemoved !== true) throw new Error('[ENV] Remove the legacy FAQ and testimonial scripts before migration');
  // Defer until all defer scripts (including the site's Swiper) have executed.
  await waitForDeferredScripts();
  const root = document.querySelector<HTMLElement>('[data-env-page]');
  if (!root) return undefined; // /chat has no page container.
  const modules = [pilotFaq];
  if (root.querySelector('.testimonial-section')) {
    const Swiper = options.Swiper ?? (window as Window & { Swiper?: SliderConstructor }).Swiper;
    if (!Swiper) throw new Error('[ENV] Swiper 12 must load before the pilot module');
    modules.push(createTestimonials(Swiper));
  }
  // IX2 + IX3 + Spline are not yet certified for page replacement.
  return createEngine({ pages: [], modules });
}
