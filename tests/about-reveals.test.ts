import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/about-reveals.js', 'utf8');
let callback: any, observe: any, unobserve: any, cancel: any;
function setup(reduced = false) {
  document.body.innerHTML = `<div id="env-sd-page"><div>
    <section class="section hero-about"><img class="big--logo middle" data-env-reveal="fade-scale" data-env-blur="12" data-env-duration="1.2"></section>
    <section class="section about-second"><div class="bloc-big-text"><img class="line-one" loading="lazy"><img class="line-two"></div>
    <div class="float-text-left"><div class="regular-text" style="opacity:.7">Copy</div></div></section>
    <section class="section third-bloc"><div class="bloc-big-text"><img class="line-five"><img class="line-six"></div></section>
  </div></div><div data-env-transition-snapshot><div class="section-animation-about"><div class="bloc-big-text"><img></div></div></div>`;
  observe = vi.fn(); unobserve = vi.fn(); cancel = vi.fn();
  vi.stubGlobal('matchMedia', () => ({ matches: reduced, addEventListener() {} }));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb: any) { callback = cb; }
    observe = observe; unobserve = unobserve; disconnect = vi.fn();
  });
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, writable: true,
    value: vi.fn(() => ({ finished: new Promise(() => {}), cancel })) });
  window.eval(source);
}
afterEach(() => {
  (window as any).ENVAboutReveals?.destroy(); delete (window as any).ENVAboutReveals;
  document.body.innerHTML = ''; vi.restoreAllMocks(); vi.unstubAllGlobals();
});

it('finds the published unclassed story and skips the existing hero and mask copies', () => {
  setup();
  expect(observe).toHaveBeenCalledTimes(4);
  expect(document.querySelector('.line-one')!.getAttribute('loading')).toBe('eager');
  expect((document.querySelector('.line-one') as HTMLElement).style.opacity).toBe('0');
  expect(document.querySelector('.big--logo')!.hasAttribute('data-env-about-reveal')).toBe(false);
  expect(document.querySelector('[data-env-transition-snapshot] img')!.hasAttribute('data-env-about-reveal')).toBe(false);
  (window as any).ENVAboutReveals.refresh(); expect(observe).toHaveBeenCalledTimes(4);
});

it('alternates wide entrances without changing authored alignment or regular text', () => {
  setup();
  const first = document.querySelector('.line-one')!, second = document.querySelector('.line-two')!;
  const text = document.querySelector('.regular-text') as HTMLElement;
  callback([first, second].map(target => ({ target, isIntersecting: true })));
  const calls = vi.mocked(Element.prototype.animate).mock.calls;
  expect(calls[0][0][0].transform).toMatch(/^translate3d\(-[0-9.]+px,0px/);
  expect(calls[1][0][0].transform).toMatch(/^translate3d\([0-9.]+px,0px/);
  expect(calls[0][0][0]).not.toHaveProperty('filter');
  expect((first as HTMLElement).style.alignSelf).toBe('');
  expect((second as HTMLElement).style.alignSelf).toBe('');
  expect(text.style.opacity).toBe('0.7');
  expect(text.hasAttribute('data-env-about-reveal')).toBe(false);
  callback([{ target: first, isIntersecting: true }]);
  expect(Element.prototype.animate).toHaveBeenCalledTimes(2);
  (window as any).ENVAboutReveals.destroy();
  expect(cancel).toHaveBeenCalledTimes(2);
  expect((first as HTMLElement).style.alignSelf).toBe('');
  expect(first.getAttribute('loading')).toBe('lazy');
  expect(first.hasAttribute('data-env-about-reveal')).toBe(false);
});

it('shows text without animation for reduced motion and for elements already passed', () => {
  setup(true);
  expect(observe).not.toHaveBeenCalled();
  expect(Element.prototype.animate).not.toHaveBeenCalled();
  expect((document.querySelector('.line-one') as HTMLElement).style.opacity).toBe('');
  (window as any).ENVAboutReveals.destroy();
  setup();
  const first = document.querySelector('.line-one')!;
  callback([{ target: first, isIntersecting: false, boundingClientRect: { bottom: -20 } }]);
  expect(first.getAttribute('data-env-about-reveal')).toBe('visible');
  expect(Element.prototype.animate).not.toHaveBeenCalled();
});

it('scrubs every story element independently and reverts its contexts on unmount', () => {
  const fromTo = vi.fn(), revert = vi.fn(), registerPlugin = vi.fn();
  const plugin = { refresh: vi.fn() };
  vi.stubGlobal('gsap', { fromTo, registerPlugin, context: (callback: any) => { callback(); return { revert }; } });
  vi.stubGlobal('ScrollTrigger', plugin);
  setup();
  expect(registerPlugin).toHaveBeenCalledWith(plugin);
  expect(fromTo).toHaveBeenCalledTimes(4);
  expect(observe).not.toHaveBeenCalled();
  const [target, from, to] = fromTo.mock.calls[0];
  expect(target).toBe(document.querySelector('.line-one'));
  expect(from.transform()).toMatch(/^translate3d\(-[0-9.]+px,0,/);
  expect(from).not.toHaveProperty('filter');
  expect(to).not.toHaveProperty('filter');
  expect(to.scrollTrigger.trigger).toBe(document.querySelector('.hero-about')!.parentElement);
  expect(to.scrollTrigger.start()).toBe('top+=0 110%');
  expect(to.scrollTrigger.end()).toBe('top+=0 65%');
  expect(to.scrollTrigger.scrub).toBe(.6);
  expect(to.ease).toBe('power2.out');
  expect(document.querySelector('.line-one')!.getAttribute('data-env-about-reveal')).toBe('scrub');
  (window as any).ENVAboutReveals.destroy();
  expect(revert).toHaveBeenCalledTimes(4);
  expect(document.querySelector('.line-one')!.hasAttribute('data-env-about-reveal')).toBe(false);
});

it('isolates logo entry while retaining the authored image attributes and native scroll target', () => {
  setup();
  const logo = document.querySelector('.big--logo')!;
  const hero = document.querySelector('.hero-about')!;
  expect(logo.parentElement!.hasAttribute('data-env-about-logo-layer')).toBe(true);
  expect(logo.closest('.hero-about')).toBe(hero);
  expect(logo.getAttribute('data-env-blur')).toBe('12');
  expect(logo.getAttribute('data-env-reveal')).toBe('fade-scale');
  (window as any).ENVAboutReveals.refresh();
  expect(document.querySelectorAll('[data-env-about-logo-layer]')).toHaveLength(1);
  (window as any).ENVAboutReveals.destroy();
  expect(logo.parentElement).toBe(hero);
  expect(logo.getAttribute('data-env-duration')).toBe('1.2');
});
