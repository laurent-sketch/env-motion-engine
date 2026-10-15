import Swup from 'swup';
import { gsap } from 'gsap';
import { PageScope, type MotionModule } from './lifecycle';
export { PageScope, type MotionModule, type PageContext } from './lifecycle';
export interface EngineOptions {
  container?: string;
  /** Explicitly certified paths only. Empty = native navigation. */
  pages?: string[];
  modules?: MotionModule[];
}
export async function createEngine(options: EngineOptions = {}) {
  const selector=options.container ?? '[data-env-page]';
  const getRoot=()=>document.querySelector<HTMLElement>(selector);
  if(!getRoot()) throw new Error(`[ENV] Missing container ${selector}`);
  const modules=[...(options.modules ?? [])];
  const root=getRoot()!;
  if(document.documentElement.hasAttribute('data-env-reveal') || root.querySelector('[data-env-reveal]')) modules.push((await import('./modules/reveal')).reveal);
  // Load micro interactions only when a project opts in on its initial page.
  const microEnabled=document.documentElement.hasAttribute('data-env-micro') || !!root.querySelector('[data-env-hover]');
  if(microEnabled) modules.push((await import('./modules/micro')).micro);
  if(document.documentElement.hasAttribute('data-env-faq')) modules.push((await import('./modules/faq')).faq);
  let scope: PageScope | undefined;
  let transition: gsap.core.Tween | undefined;
  let transitionState: { element: HTMLElement; style: string | null } | undefined;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let destroyed=false;
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
    if(!media.matches){transition=gsap.to(el,{opacity:0,y:-8,duration:0.18});await transition;}
  });
  swup?.hooks.before('content:replace',()=>{scope?.destroy();scope=undefined;restore();});
  swup?.hooks.on('page:view',()=>{
    mount();
    document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(a=>{const current=a.origin===location.origin&&a.pathname===location.pathname;a.classList.toggle('w--current',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    const el=getRoot()!;window.scrollTo(0,0);const tabindex=el.getAttribute('tabindex');el.setAttribute('tabindex','-1');el.focus({preventScroll:true});if(tabindex===null)el.removeAttribute('tabindex');else el.setAttribute('tabindex',tabindex);
  });
  swup?.hooks.replace('animation:in:await',async()=>{
    const el=getRoot()!;transitionState={element:el,style:el.getAttribute('style')};
    if(!media.matches){transition=gsap.fromTo(el,{opacity:0,y:8},{opacity:1,y:0,duration:0.25});await transition;restore();}
  });
  swup?.hooks.on('fetch:error',()=>restore());
  swup?.hooks.on('visit:abort',()=>restore());
  const onPreference=()=>{if(!destroyed){restore();mount();}};
  media.addEventListener('change',onPreference);
  return {swup,destroy(){if(destroyed)return;destroyed=true;swup?.destroy();restore();scope?.destroy();media.removeEventListener('change',onPreference);}};
}
