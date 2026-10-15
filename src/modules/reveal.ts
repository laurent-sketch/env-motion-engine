import { gsap } from 'gsap';
import type { MotionModule } from '../lifecycle';
export const reveal: MotionModule = {name:'reveal', mount({root,reducedMotion,cleanup}) {
  if (reducedMotion) return;
  const context = gsap.context(()=>{},root);
  cleanup(()=>context.revert());
  const observer = new IntersectionObserver(entries=>{
    for (const entry of entries) if(entry.isIntersecting) {
      context.add(()=>{gsap.from(entry.target,{y:24,opacity:0,duration:0.6,ease:'power2.out',clearProps:'transform,opacity'});});
      observer.unobserve(entry.target);
    }
  },{threshold:0.12});
  cleanup(()=>observer.disconnect());
  root.querySelectorAll('[data-env-reveal]').forEach(el=>observer.observe(el));
}};
