import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/news-marquee.js', 'utf8');
const api = () => (window as Window & { ENVNewsMarquee?: { destroy(): void; init(): void; refresh(): void } }).ENVNewsMarquee!;
afterEach(() => { api()?.destroy(); vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.replaceChildren(); });
function setup(reduced = false, swiper = false) {
  document.body.innerHTML = '<section><div class="swiper-news" data-env-news="marquee" style="color:red"><div class="swiper-wrapper-news"><article class="swiper-slide-news" id="original" style="width:200px"><a href="#one" data-env-reveal="fade-up">One</a><img loading="lazy" src="/one.jpg"></article><article class="swiper-slide-news" style="width:300px"><a href="#two">Two</a></article></div></div><button class="swiper-button-prev" disabled>Prev</button><button class="swiper-button-next">Next</button></section>';
  const root = document.querySelector('.swiper-news') as HTMLElement;
  if (swiper) Object.assign(root, { swiper: { destroyed: false } });
  Object.defineProperty(root, 'clientWidth', { value: 600 });
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function(this: HTMLElement) {
    const width = parseFloat(this.style.width) || 600;
    let left = 0;
    if (this.matches('.swiper-slide-news')) {
      for (const el of [...this.parentElement!.children]) { if (el === this) break; left += (parseFloat((el as HTMLElement).style.width) || 200) + 20; }
    }
    return { x: left, y: 0, left, top: 0, bottom: 200, right: left + width, width, height: 200, toJSON() {} };
  });
  const frames = new Map<number, FrameRequestCallback>(); let id = 0, time = 0;
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => { frames.set(++id, fn); return id; });
  vi.stubGlobal('cancelAnimationFrame', (n: number) => frames.delete(n));
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('matchMedia', () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }));
  Object.assign(root, { setPointerCapture: vi.fn(), hasPointerCapture: () => false, releasePointerCapture: vi.fn() });
  new Function(source)();
  return { root, track: root.firstElementChild as HTMLElement, frames, advance(n: number) { for (let i = 0; i < n; i++) { time += 16.667; const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(time)); } } };
}
it('creates enough seamless copies while excluding duplicates from keyboard navigation', () => {
  const { root } = setup();
  expect(root.querySelectorAll('[data-env-news-clone]')).toHaveLength(6);
  expect(root.querySelectorAll('#original')).toHaveLength(1);
  root.querySelectorAll('[data-env-news-clone] a').forEach(a => { expect(a.getAttribute('tabindex')).toBe('-1'); expect(a.hasAttribute('data-env-reveal')).toBe(false); });
  api().init();
  expect(root.querySelectorAll('.env-news-pause')).toHaveLength(0);
  expect(root.style.margin).toBe('0px');
  expect(root.style.padding).toBe('0px');
  api().destroy();
  expect(root.querySelectorAll('.swiper-slide-news')).toHaveLength(2);
  expect(root.getAttribute('style')).toBe('color:red');
  expect(document.querySelector('.swiper-button-prev')?.hasAttribute('disabled')).toBe(true);
});
it('moves automatically, settles on hover and resumes afterward', () => {
  const f = setup(); f.advance(60);
  const initial = f.track.style.transform;
  f.root.dispatchEvent(new MouseEvent('mouseenter')); f.advance(120);
  const paused = f.track.style.transform; f.advance(30);
  expect(f.track.style.transform).toBe(paused);
  expect(paused).not.toBe(initial);
  f.root.dispatchEvent(new MouseEvent('mouseleave')); f.advance(60);
  expect(f.track.style.transform).not.toBe(paused);
});
it('allows vertical scrolling and handles horizontal wheel gestures', () => {
  const f = setup(true); f.advance(2);
  const before = f.track.style.transform;
  expect(f.root.dispatchEvent(new WheelEvent('wheel', { deltaY: 80, cancelable: true }))).toBe(true);
  expect(f.root.dispatchEvent(new WheelEvent('wheel', { deltaX: 100, cancelable: true }))).toBe(false);
  expect(f.track.style.transform).not.toBe(before);
});
it('keeps reduced-motion navigation manual and refuses an active Swiper instance', () => {
  const f = setup(true); f.advance(60);
  expect(f.track.style.transform).toBe('translate3d(0px,0,0)');
  (document.querySelector('.swiper-button-next') as HTMLElement).click();
  expect(f.track.style.transform).not.toBe('translate3d(0px,0,0)');
  api().destroy();
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const busy = setup(false, true);
  expect(busy.root.querySelector('[data-env-news-clone]')).toBeNull();
  expect(warn).toHaveBeenCalledOnce();
});

it('suppresses the link click after a drag but preserves a subsequent ordinary click', () => {
  const f = setup(true);
  const pointer = (type: string, x: number) => {
    const e = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(e, { isPrimary: true, button: 0, pointerId: 1, clientX: x, clientY: 0, pointerType: 'mouse' });
    f.root.dispatchEvent(e);
  };
  pointer('pointerdown', 200); pointer('pointermove', 100); pointer('pointerup', 100);
  expect(f.root.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }))).toBe(false);
  expect(f.root.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }))).toBe(true);
});

it('prepares images in loop copies before they reach the viewport', () => {
  const { root } = setup();
  expect(root.querySelector('article:not([data-env-news-clone]) img')?.getAttribute('loading')).toBe('lazy');
  root.querySelectorAll('[data-env-news-clone] img').forEach(img => expect(img.getAttribute('loading')).toBe('eager'));
});

it('keeps horizontal movement inside a filled loop across large forward and reverse gestures', () => {
  const f = setup(true);
  [100000, -200000, 1000, -1000].forEach(deltaX => {
    f.root.dispatchEvent(new WheelEvent('wheel', { deltaX, cancelable: true }));
    const x = -Number(f.track.style.transform.match(/translate3d\(([^p]+)px/)![1]);
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(540);
  });
});
