import Swup from 'swup';
import { PageScope, type MotionModule } from './lifecycle';
export { PageScope, type MotionModule, type PageContext } from './lifecycle';
export interface NavigationAdapter {
  prepare(document: Document, url: string): Promise<void> | void;
  leave(): Promise<void> | void;
  enter(document: Document, url: string): Promise<void> | void;
  destroy?(): void;
}
export interface EngineOptions {
  adapter?: NavigationAdapter;
  /** Reuse a host GSAP instance instead of downloading another copy. */
  gsap?: typeof import('gsap')['gsap'];
  transitionOffset?: number;
  container?: string;
  /** Explicitly certified paths only. Empty = native navigation. */
  pages?: string[];
  modules?: MotionModule[];
}
export async function createEngine(options: EngineOptions = {}) {
  const selector=options.container ?? '[data-env-page]';
  const getRoot=()=>document.querySelector<HTMLElement>(selector);
  if(!getRoot()) throw new Error(`[ENV] Missing container ${selector}`);
  const gsap=options.gsap ?? (await import('gsap')).gsap;
  const modules=[...(options.modules ?? [])];
  const root=getRoot()!;
  if(document.documentElement.hasAttribute('data-env-reveal') || root.querySelector('[data-env-reveal]')) modules.push((await import('./modules/reveal')).reveal);
  // Load micro interactions only when a project opts in on its initial page.
  const microEnabled=document.documentElement.hasAttribute('data-env-micro') || !!root.querySelector('[data-env-hover]');
  if(microEnabled) modules.push((await import('./modules/micro')).micro);
  if(document.documentElement.hasAttribute('data-env-faq')) modules.push((await import('./modules/faq')).faq);
  let scope: PageScope | undefined;
  let transition: ReturnType<NonNullable<EngineOptions['gsap']>['to']> | undefined;
  let transitionState: { element: HTMLElement; style: string | null } | undefined;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let destroyed=false;
  const offset=options.transitionOffset ?? 8;
  const mount=()=>{scope?.destroy();scope=new PageScope(getRoot()!,modules,media.matches);};
  mount();
  const pages=new Set(options.pages ?? []);
  const swup=pages.has(location.pathname) ? new Swup({containers:[selector],animationSelector:false,linkSelector:'a[href]:not([download]):not([target]):not([data-no-swup])',ignoreVisit:(url,{el}={})=>{
    const target=new URL(url,location.href);
    return target.origin!==location.origin || !pages.has(target.pathname) || !!el?.closest('[data-no-swup]');
  }}) : undefined;
  const restore=()=>{
    const state=transitionState;transitionState=undefined;
    transition?.progress(1);transition?.kill();transition=undefined;
    if(state){if(state.style===null)state.element.removeAttribute('style');else state.element.setAttribute('style',state.style);}
  };
  swup?.hooks.replace('animation:out:await',async()=>{
    const el=getRoot()!;transitionState={element:el,style:el.getAttribute('style')};
    if(!media.matches){transition=gsap.to(el,{opacity:0,y:-offset,duration:0.18});await transition;}
  });
  // Use the replacement handler: Swup intentionally swallows errors from observer hooks.
  // Errors here propagate to Swup's native-navigation fallback.
  swup?.hooks.replace('content:replace',async (visit,args,replace)=>{
    const incoming=visit.to.document;
    if(!incoming || !replace) throw new Error('[ENV] Missing incoming document/replacement handler');
    try { await options.adapter?.prepare(incoming,visit.to.url); }
    catch(error) { restore();console.info('[ENV] Native navigation fallback',error);throw error; }
    if(destroyed || visit.done) return;
    scope?.destroy();scope=undefined;restore();
    await options.adapter?.leave();
    if(destroyed || visit.done) return;
    await replace(visit,args);
    await options.adapter?.enter(incoming,visit.to.url);
    if(!destroyed && !visit.done) mount();
  });
  swup?.hooks.on('page:view',()=>{
    document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(a=>{if(a.getAttribute('href')?.includes('#'))return;const current=a.origin===location.origin&&a.pathname===location.pathname;a.classList.toggle('w--current',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    const root=getRoot()!;const el=root.matches('body, [data-env-shell]') ? root.querySelector<HTMLElement>('main') ?? root : root;const tabindex=el.getAttribute('tabindex');el.setAttribute('tabindex','-1');el.focus({preventScroll:true});if(tabindex===null)el.removeAttribute('tabindex');else el.setAttribute('tabindex',tabindex);
  });
  swup?.hooks.replace('animation:in:await',async()=>{
    const el=getRoot()!;transitionState={element:el,style:el.getAttribute('style')};
    if(!media.matches){transition=gsap.fromTo(el,{opacity:0,y:offset},{opacity:1,y:0,duration:0.25});await transition;restore();}
  });
  swup?.hooks.on('fetch:error',()=>restore());
  swup?.hooks.on('visit:abort',()=>restore());
  swup?.hooks.on('visit:fail',()=>restore());
  const onPreference=()=>{if(!destroyed){restore();mount();}};
  media.addEventListener('change',onPreference);
  return {swup,destroy(){if(destroyed)return;destroyed=true;void swup?.destroy();restore();scope?.destroy();options.adapter?.destroy?.();media.removeEventListener('change',onPreference);}};
}
