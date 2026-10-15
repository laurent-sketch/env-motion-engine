import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
import { gsap } from 'gsap';

const source = readFileSync('public/animations.js', 'utf8');
type API = { destroy(): void; refresh(): void };
const api = () => (window as Window & { ENVAnimations?: API }).ENVAnimations!;
afterEach(() => {
  api()?.destroy();
  vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.replaceChildren();
});
async function setup(html: string, reduced = false) {
  document.body.innerHTML = html;
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
  let change!: () => void;
  const media = { matches: reduced, addEventListener: vi.fn((_name, cb) => { change = cb; }), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', () => media);
  vi.stubGlobal('gsap', gsap);
  let callback!: IntersectionObserverCallback;
  const observe = vi.fn(), disconnect = vi.fn(), unobserve = vi.fn();
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb: IntersectionObserverCallback) { callback = cb; }
    observe = observe; disconnect = disconnect; unobserve = unobserve;
  });
  new Function(source)();
  await Promise.resolve();
  return { observe, disconnect, media, change: () => change(), enter: (target: Element) => callback([{ target, isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver) };
}
it('reveals once and restores authored styles on destroy', async () => {
  const f = await setup('<h2 data-env-reveal="fade-up" style="color:red">Title</h2>');
  const el = document.querySelector('h2')!;
  f.enter(el); f.enter(el);
  expect(gsap.getTweensOf(el)).toHaveLength(1);
  api().destroy();
  expect(gsap.getTweensOf(el)).toHaveLength(0);
  expect(el.style.opacity).toBe('');
  expect(el.style.color).toBe('red');
  expect(f.disconnect).toHaveBeenCalled();
});
it('excludes widgets, explicit ignores, and nested targets', async () => {
  const f = await setup('<div class="swiper-initialized"><h2 data-env-text>Slide</h2></div><div data-env-ignore><p data-env-text>Ignore</p></div><div data-env-reveal id="parent"><p data-env-text>Nested</p></div>');
  expect(f.observe).toHaveBeenCalledTimes(1);
  expect(f.observe).toHaveBeenCalledWith(document.querySelector('#parent'));
});
it('keeps content visible and clears animation when reduced motion changes', async () => {
  const f = await setup('<p data-env-text="lines">Text</p>', true);
  expect(f.observe).not.toHaveBeenCalled();
  f.media.matches = false; f.change();
  const el = document.querySelector('p')!;
  f.enter(el);
  expect(gsap.getTweensOf(el)).toHaveLength(1);
  f.media.matches = true; f.change();
  expect(gsap.getTweensOf(el)).toHaveLength(0);
  expect(el.style.opacity).toBe('');
});
it('restores split markup after completion and preserves nested links via a block reveal', async () => {
  const revert = vi.fn();
  const create = vi.fn((el: HTMLElement, options: { onSplit(self: { words: Element[] }): gsap.core.Tween }) => {
    const html = el.innerHTML;
    el.innerHTML = '<span>One</span><span>Two</span>';
    const self = { words: [...el.children], revert: () => { revert(); el.innerHTML = html; } };
    options.onSplit(self);
    return self;
  });
  vi.stubGlobal('SplitText', { create });
  vi.spyOn(gsap, 'registerPlugin').mockImplementation(() => {});
  const f = await setup('<h2 data-env-text="words">One Two</h2><p data-env-text="words"><a href="#">Link</a></p>');
  const el = document.querySelector('h2')!;
  f.enter(el);
  gsap.getTweensOf([...el.children]).forEach(t => t.progress(1));
  await Promise.resolve();
  expect(el.innerHTML).toBe('One Two');
  expect(revert).toHaveBeenCalledOnce();
  f.enter(document.querySelector('p')!);
  expect(create).toHaveBeenCalledOnce();
  expect(document.querySelector('a')?.getAttribute('aria-hidden')).toBeNull();
});

it.each(['fade', 'up', 'scale'])('applies the %s text variant without adding unwanted movement', async effect => {
  const from = vi.spyOn(gsap, 'from');
  const create = vi.fn((el: HTMLElement, options: { onSplit(self: { words: Element[] }): gsap.core.Tween }) => {
    options.onSplit({ words: [el] });
    return { revert: vi.fn() };
  });
  vi.stubGlobal('SplitText', { create });
  vi.spyOn(gsap, 'registerPlugin').mockImplementation(() => {});
  const f = await setup(`<h2 data-env-text="words" data-env-text-effect="${effect}">Title</h2>`);
  f.enter(document.querySelector('h2')!);
  const vars = from.mock.calls.at(-1)![1];
  expect(vars.opacity).toBe(0);
  expect(vars.yPercent).toBe(effect === 'up' ? 65 : undefined);
  expect(vars.scale).toBe(effect === 'scale' ? 0.98 : undefined);
});
