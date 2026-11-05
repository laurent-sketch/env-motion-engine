import { afterEach, expect, it, vi } from 'vitest';
import { mountInlineAbout } from '../src/sd/inline-about-motion.js';
import { inspectInlineAbout } from '../src/sd/inline-about-adapter.js';
import patterns from '../src/sd/inline-about-patterns.json';
afterEach(() => {
  (window as any).ENVAboutPageTest?.destroy();delete (window as any).ENVAboutPageTest;
  document.body.innerHTML='';vi.unstubAllGlobals();
});
it.each([true,false])('mounts the preserved inline animation with mobile=%s', mobile => {
  document.body.innerHTML='<div class="section-animation-about"><div class="bloc-big-text"><img></div></div>';
  const fromTo=vi.fn(() => ({ progress:vi.fn(),invalidate:vi.fn() }));
  const context=vi.fn((cb: any)=>{cb();return { revert:vi.fn() };});
  const match={ add:vi.fn((_query: any,cb: any)=>cb({conditions:{mobile}})),revert:vi.fn() };
  vi.stubGlobal('Webflow',{push:(cb: any)=>cb()});
  vi.stubGlobal('matchMedia',()=>({matches:false}));
  vi.stubGlobal('gsap',{registerPlugin:vi.fn(),set:vi.fn(),context,matchMedia:()=>match,fromTo,to:vi.fn()});
  vi.stubGlobal('ScrollTrigger',{create:vi.fn(),refresh:vi.fn()});
  const doc=document.implementation.createHTMLDocument('Settings');
  const script=doc.createElement('script');script.textContent=patterns.responsive;doc.body.append(script);
  const groups=inspectInlineAbout(doc).story!.groups;
  mountInlineAbout(groups,true);
  const from=fromTo.mock.calls[0][1];
  if(mobile){expect(from).toEqual({opacity:.1});}
  else{expect(from.opacity).toBe(0);expect(from.filter).toBe('blur(20px)');expect(from.x()).toBeLessThan(0);}
  (window as any).ENVAboutPageTest.destroy();
  expect(match.revert).toHaveBeenCalled();
});
