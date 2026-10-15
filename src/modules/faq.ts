import type { MotionModule } from '../lifecycle';
export const faq: MotionModule = {name:'faq',mount({root,signal,cleanup}) {
  const items=[...root.querySelectorAll<HTMLElement>('[data-env-faq]')];
  const images=[...root.querySelectorAll<HTMLElement>('[data-env-faq-content]')];
  const snapshots=[...items,...images].map(el=>({el,active:el.classList.contains('active'),expanded:el.getAttribute('aria-expanded')}));
  const activate=(id:string|undefined)=>{
    items.forEach(el=>{const active=el.dataset.envFaq===id;el.classList.toggle('active',active);el.setAttribute('aria-expanded',String(active));});
    images.forEach(el=>el.classList.toggle('active',el.dataset.envFaqContent===id));
  };
  items.forEach(el=>el.addEventListener('click',()=>activate(el.dataset.envFaq),{signal}));
  if(items.length) activate(items[0].dataset.envFaq);
  cleanup(()=>snapshots.forEach(({el,active,expanded})=>{el.classList.toggle('active',active);if(expanded===null)el.removeAttribute('aria-expanded');else el.setAttribute('aria-expanded',expanded);}));
}};
