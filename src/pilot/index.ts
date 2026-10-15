import { createEngine, type EngineOptions } from '../index';
import { waitForDeferredScripts } from './ready';
import { pilotFaq } from './faq';
import { createTestimonials, type SliderConstructor } from './testimonials';

export interface PilotOptions {
  /** Explicit migration contract: both legacy custom scripts must be removed. */
  legacyScriptsRemoved: true;
  /** Experimental: Home ↔ About, guarded by the audited export snapshots. */
  navigation?: boolean;
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
  const gsap=(window as Window & {gsap?:EngineOptions['gsap']}).gsap;
  const modules = [pilotFaq];
  if (root.querySelector('.testimonial-section')) {
    const Swiper = options.Swiper ?? (window as Window & { Swiper?: SliderConstructor }).Swiper;
    if (!Swiper) throw new Error('[ENV] Swiper 12 must load before the pilot module');
    modules.push(createTestimonials(Swiper));
  }
  if (options.navigation && ['/', '/about'].includes(location.pathname)) {
    const { createWebflowNavigation, certifiedPaths } = await import('./navigation');
    const runtime=(window as Window & {Webflow?: import('./navigation').WebflowRuntime}).Webflow;
    if(!runtime?.require) throw Error('[ENV] Webflow runtime not ready');
    let adapter;
    try { adapter=await createWebflowNavigation(runtime,location.pathname); }
    catch(error) {
      console.warn('[ENV] Navigation guard: using native navigation',error);
      return createEngine({pages:[],modules,gsap});
    }
    const {default:ScrollPlugin}=await import('@swup/scroll-plugin');
    const spline=runtime.require('spline') as {createInstance?:unknown} | undefined;
    const pages=spline?.createInstance ? certifiedPaths : certifiedPaths.filter(path=>path!=='/');
    const engine=await createEngine({container:'[data-env-shell]',pages,modules,gsap,adapter,transitionOffset:0});
    engine.swup?.use(new ScrollPlugin({animateScroll:{betweenPages:false,samePageWithHash:false,samePage:false}}));
    return engine;
  }
  return createEngine({ pages: [], modules, gsap });
}
