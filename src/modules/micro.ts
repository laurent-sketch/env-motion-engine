import { animate, hover } from 'motion';
import type { MotionModule } from '../lifecycle';
export const micro: MotionModule = {name:'micro',mount({root,reducedMotion,signal,cleanup}) {
  if(reducedMotion) return;
  root.querySelectorAll<HTMLElement>('[data-env-hover]').forEach(el=>{
    const initial = el.getAttribute('style');
    let control: ReturnType<typeof animate> | undefined;
    const play=(scale:number)=>{control?.cancel(); control=animate(el,{scale},{duration:0.18});};
    cleanup(hover(el,()=>{play(1.035);return()=>play(1);}));
    el.addEventListener('focus',()=>play(1.035),{signal});
    el.addEventListener('blur',()=>play(1),{signal});
    cleanup(()=>{control?.cancel();if(initial===null) el.removeAttribute('style');else el.setAttribute('style',initial);});
  });
}};
