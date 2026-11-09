import { afterEach, expect, it, vi } from 'vitest';
import { footerRevealProgress, installFooterReveal } from '../src/sd/footer-reveal.js';
afterEach(() => { document.body.replaceChildren(); document.documentElement.removeAttribute('data-env-transition-active'); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
it('depends on footer geometry, never global page height or scroll percentage', () => {
  expect(footerRevealProgress(1000,720,960)).toBe(0);
  expect(footerRevealProgress(600,720,960)).toBe(.5);
  expect(footerRevealProgress(240,720,960)).toBe(1);
  expect(footerRevealProgress(0,1400,960)).toBe(1);
});
it('owns only footer translation, freezes under the mask and restores state on cleanup', async () => {
  document.body.innerHTML='<div id="root"><section class="section footer static"><img class="big--logo" style="opacity:.4"></section></div>';
  const root=document.querySelector('#root')!, footer=root.firstElementChild as HTMLElement;
  vi.stubGlobal('matchMedia',(query:string)=>({matches:query.includes('768'),addEventListener:vi.fn(),removeEventListener:vi.fn()}));
  let callback:FrameRequestCallback; vi.stubGlobal('requestAnimationFrame',(fn:FrameRequestCallback)=>{callback=fn;return 1;});
  let top=600; let y=0;
  vi.spyOn(footer,'getBoundingClientRect').mockImplementation(()=>({top:top+y,height:720} as DOMRect));
  vi.stubGlobal('innerHeight',960);
  const cleanup=installFooterReveal(root);
  y=parseFloat(footer.style.getPropertyValue('--env-footer-y'));
  expect(y).toBe(-150); expect(root.querySelector('img')!.style.opacity).toBe('0.4');
  document.documentElement.setAttribute('data-env-transition-active',''); await Promise.resolve(); callback!(1000);
  top=240; window.dispatchEvent(new Event('scroll')); callback!(2000);
  expect(footer.style.getPropertyValue('--env-footer-y')).toBe('-150.000px');
  document.documentElement.removeAttribute('data-env-transition-active'); await Promise.resolve();
  for(let t=2100;t<4100;t+=64){callback!(t);y=parseFloat(footer.style.getPropertyValue('--env-footer-y'));}
  expect(y).toBeCloseTo(0, 3);
  cleanup(); expect(footer.hasAttribute('data-env-footer-reveal')).toBe(false); expect(footer.style.getPropertyValue('--env-footer-y')).toBe('');
});
it('leaves reduced-motion footers stationary',()=>{
  document.body.innerHTML='<main><section class="section footer static"></section></main>';
  vi.stubGlobal('matchMedia',()=>({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()}));
  const cleanup=installFooterReveal(document.querySelector('main'));
  expect(document.querySelector('section')!.style.getPropertyValue('--env-footer-y')).toBe('0.000px');cleanup();
});

it('keeps the existing mobile footer stationary',()=>{
  document.body.innerHTML='<main><section class="section footer static"></section></main>';
  vi.stubGlobal('matchMedia',()=>({matches:false,addEventListener:vi.fn(),removeEventListener:vi.fn()}));
  const cleanup=installFooterReveal(document.querySelector('main'));
  expect(document.querySelector('section')!.style.getPropertyValue('--env-footer-y')).toBe('0.000px');cleanup();
});
