import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/about-reveals.js', 'utf8');
let callback: any, observe: any, unobserve: any, cancel: any;
function setup(reduced = false) {
  document.body.innerHTML = `<div id="env-sd-page"><div>
    <section class="section hero-about"><img class="big--logo" data-env-reveal="fade-scale"></section>
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
  expect(observe).toHaveBeenCalledTimes(5);
  expect(document.querySelector('.line-one')!.getAttribute('loading')).toBe('eager');
  expect((document.querySelector('.line-one') as HTMLElement).style.opacity).toBe('0');
  expect(document.querySelector('.big--logo')!.hasAttribute('data-env-about-reveal')).toBe(false);
  expect(document.querySelector('[data-env-transition-snapshot] img')!.hasAttribute('data-env-about-reveal')).toBe(false);
  (window as any).ENVAboutReveals.refresh(); expect(observe).toHaveBeenCalledTimes(5);
});

it('alternates SVG line entrances, preserves authored end opacity, and reveals once', () => {
  setup();
  const first = document.querySelector('.line-one')!, second = document.querySelector('.line-two')!;
  const text = document.querySelector('.regular-text')!;
  callback([first, second, text].map(target => ({ target, isIntersecting: true })));
  const calls = vi.mocked(Element.prototype.animate).mock.calls;
  expect(calls[0][0][0].transform).toContain('64px,0px');
  expect(calls[1][0][0].transform).toContain('-64px,0px');
  expect(calls[2][0][0].transform).toContain('0px,22px');
  expect(calls[2][0][1].opacity).toBe('0.7');
  callback([{ target: first, isIntersecting: true }]);
  expect(Element.prototype.animate).toHaveBeenCalledTimes(3);
  (window as any).ENVAboutReveals.destroy();
  expect(cancel).toHaveBeenCalledTimes(3);
  expect((text as HTMLElement).style.opacity).toBe('0.7');
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
