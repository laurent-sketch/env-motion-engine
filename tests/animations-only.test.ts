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
async function setup(html: string, reduced = false, state = 'complete') {
  document.body.innerHTML = html;
  vi.spyOn(document, 'readyState', 'get').mockReturnValue(state as DocumentReadyState);
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

it('keeps scrub text split after completion so reversing remains possible', async () => {
  const revert = vi.fn();
  const originalFrom = gsap.from;
  const from = vi.spyOn(gsap, 'from').mockImplementation((targets, vars) => {
    const { scrollTrigger, ...rest } = vars;
    return originalFrom(targets, { ...rest, paused: true });
  });
  const create = vi.fn((el: HTMLElement, options: { onSplit(self: { words: Element[] }): gsap.core.Tween }) => {
    el.innerHTML = '<span>Text</span>';
    options.onSplit({ words: [...el.children] });
    return { revert };
  });
  vi.stubGlobal('SplitText', { create });
  vi.stubGlobal('ScrollTrigger', {});
  vi.spyOn(gsap, 'registerPlugin').mockImplementation(() => {});
  const f = await setup('<h2 data-env-text="words" data-env-text-effect="fade" data-env-trigger="scrub">Text</h2>');
  expect(f.observe).not.toHaveBeenCalled();
  const vars = from.mock.calls.at(-1)![1];
  const trigger = vars.scrollTrigger as { scrub: boolean; start(): string; end(): string };
  expect(trigger.scrub).toBe(true);
  expect(trigger.start()).toBe('top 85%');
  expect(trigger.end()).toBe('top 35%');
  expect(vars.ease).toBe('none');
  const tween = from.mock.results.at(-1)!.value as gsap.core.Tween;
  tween.progress(1);
  await Promise.resolve();
  expect(revert).not.toHaveBeenCalled();
  tween.progress(0.2);
  expect(document.querySelector('h2 span')).not.toBeNull();
  api().destroy();
  expect(revert).toHaveBeenCalledOnce();
});

it('falls back to a normal reveal when ScrollTrigger is missing', async () => {
  vi.stubGlobal('ScrollTrigger', undefined);
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const f = await setup('<p data-env-text data-env-trigger="scrub">Text</p>');
  expect(warn).toHaveBeenCalled();
  expect(f.observe).toHaveBeenCalledOnce();
  f.enter(document.querySelector('p')!);
  expect(gsap.getTweensOf(document.querySelector('p')!)).toHaveLength(1);
});

it('matches the approved preview reveal timing, distance and cubic-bezier curve', async () => {
  const f = await setup('<div data-env-reveal="fade-up">Block</div>');
  const el = document.querySelector('div')!;
  f.enter(el);
  const tween = gsap.getTweensOf(el)[0];
  expect(tween.vars.y).toBe(16);
  expect(tween.duration()).toBe(0.75);
  const ease = tween.vars.ease as (progress: number) => number;
  expect(ease(0)).toBe(0);
  expect(ease(1)).toBe(1);
  // At Bezier parameter t=.5, x=.275 and y=.74375.
  expect(ease(0.275)).toBeCloseTo(0.74375, 5);
});

it('uses the native preview animation for fade-up, with delay and authored transform preserved', async () => {
  const f = await setup('<div data-env-reveal="fade-up" data-env-delay="0.15" style="transform:scale(0.9);opacity:0.8">Block</div>');
  const el = document.querySelector('div')!;
  let finish!: () => void;
  const animation = { finished: new Promise<void>(resolve => { finish = resolve; }), cancel: vi.fn() };
  const animate = vi.fn(() => animation);
  Object.defineProperty(el, 'animate', { value: animate });
  f.enter(el); f.enter(el);
  expect(animate).toHaveBeenCalledOnce();
  expect(animate).toHaveBeenCalledWith([
    { opacity: 0, transform: 'translateY(16px) scale(0.9)' },
    { opacity: '0.8', transform: 'scale(0.9)' }
  ], { duration: 750, delay: 150, easing: 'cubic-bezier(.2,.65,.2,1)', fill: 'backwards' });
  expect(gsap.getTweensOf(el)).toHaveLength(0);
  finish(); await Promise.resolve();
  expect(animation.cancel).toHaveBeenCalledOnce();
  expect(el.style.transform).toBe('scale(0.9)');
  expect(el.style.opacity).toBe('0.8');
});

it('cancels native fade-up when the reduced-motion preference changes', async () => {
  const f = await setup('<div data-env-reveal="fade-up">Block</div>');
  const el = document.querySelector('div')!;
  const animation = { finished: new Promise<void>(() => {}), cancel: vi.fn() };
  Object.defineProperty(el, 'animate', { value: vi.fn(() => animation) });
  f.enter(el);
  f.media.matches = true; f.change();
  expect(animation.cancel).toHaveBeenCalledOnce();
  expect(el.style.opacity).toBe('');
});


it('staggers direct children from one parent trigger and restores their styles', async () => {
  const f = await setup('<section data-env-reveal="fade-scale" data-env-stagger="0.1" data-env-delay="0.3" data-env-duration="0.9"><div style="color:red"><span>Nested</span></div><button>Next</button><div data-env-ignore>Skip</div></section>');
  const parent = document.querySelector('section')!;
  const [first, second, ignored] = [...parent.children] as HTMLElement[];
  expect(f.observe).toHaveBeenCalledOnce();
  f.enter(parent);
  expect(gsap.getTweensOf(parent)).toHaveLength(0);
  expect(gsap.getTweensOf(first)).toHaveLength(2);
  expect(gsap.getTweensOf(second)).toHaveLength(2);
  expect(gsap.getTweensOf(first.firstElementChild!)).toHaveLength(0);
  expect(gsap.getTweensOf(ignored)).toHaveLength(0);
  const a = gsap.getTweensOf(first).find(t => t.vars.scale !== undefined)!;
  const b = gsap.getTweensOf(second).find(t => t.vars.scale !== undefined)!;
  expect(a.startTime()).toBeCloseTo(0.2);
  expect(b.startTime()).toBeCloseTo(0.3);
  expect(a.parent!.delay()).toBeCloseTo(0.3);
  expect(a.duration()).toBe(0.9);
  api().destroy();
  expect(first.style.color).toBe('red');
  expect(first.style.opacity).toBe('');
  expect(second.style.transform).toBe('');
});

it('keeps ordinary fade-scale on the parent when stagger is absent', async () => {
  const f = await setup('<section data-env-reveal="fade-scale"><div>Child</div></section>');
  const parent = document.querySelector('section')!;
  f.enter(parent);
  expect(gsap.getTweensOf(parent)).toHaveLength(2);
  expect(gsap.getTweensOf(parent.firstElementChild!)).toHaveLength(0);
});

it('supports simultaneous child reveals and reduced-motion cleanup', async () => {
  const f = await setup('<section data-env-reveal="fade-up" data-env-stagger="0"><div>A</div><div>B</div></section>');
  const parent = document.querySelector('section')!;
  f.enter(parent);
  const children = [...parent.children];
  const tweens = children.map(el => gsap.getTweensOf(el)[0]);
  expect(tweens[0].startTime()).toBe(tweens[1].startTime());
  f.media.matches = true; f.change();
  children.forEach(el => expect(gsap.getTweensOf(el)).toHaveLength(0));
});

it('finishes every scale group child at its authored opacity', async () => {
  const f = await setup('<section data-env-reveal="fade-scale" data-env-stagger="0.2"><div>A</div><a style="opacity:0.8">B</a><a>C</a></section>');
  const parent = document.querySelector('section')!;
  f.enter(parent);
  const timeline = gsap.getTweensOf(parent.children[0])[0].parent!;
  timeline.totalProgress(1);
  [...parent.children].forEach((el, i) => expect((el as HTMLElement).style.opacity).toBe(i === 1 ? '0.8' : '')); 
});

it('releases group opacity to current active classes after progressive playback', async () => {
  const f = await setup('<style>.slide-link{opacity:0.3}.slide-link.active{opacity:1}</style><section data-env-reveal="fade-scale" data-env-stagger="0.2"><a class="slide-link active">A</a><a class="slide-link">B</a><a style="opacity:0.6">C</a></section>');
  const parent = document.querySelector('section')!;
  const [a, b, c] = [...parent.children] as HTMLElement[];
  f.enter(parent);
  const timeline = gsap.getTweensOf(a)[0].parent!;
  for (let t = 0; t < 0.5; t += 0.02) timeline.time(t);
  a.classList.remove('active'); b.classList.add('active');
  for (let t = 0.5; t < 2; t += 0.02) timeline.time(t);
  timeline.totalProgress(1);
  expect(a.style.opacity).toBe(''); expect(b.style.opacity).toBe('');
  expect(getComputedStyle(a).opacity).toBe('0.3');
  expect(getComputedStyle(b).opacity).toBe('1');
  expect(c.style.opacity).toBe('0.6');
});

it('uses non-inline group effects so loop copies do not inherit hidden slides', async () => {
  const f = await setup('<section data-env-reveal="fade-scale" data-env-stagger="0.2"><div style="width:200px">A</div><div>B</div><div data-env-news-clone>Copy</div></section>');
  const parent = document.querySelector('section')!;
  const animations = [...parent.children].map(el => {
    const animation = { finished: new Promise<void>(() => {}), cancel: vi.fn() };
    const animate = vi.fn(() => animation);
    Object.defineProperty(el, 'animate', { value: animate });
    return { animate, animation };
  });
  f.enter(parent);
  expect(animations[0].animate).toHaveBeenCalledOnce();
  expect(animations[1].animate).toHaveBeenCalledOnce();
  expect(animations[2].animate).not.toHaveBeenCalled();
  expect((parent.children[0].cloneNode(true) as HTMLElement).style.opacity).toBe('');
  expect((parent.children[0].cloneNode(true) as HTMLElement).style.transform).toBe('');
  expect((animations[1].animate.mock.calls[0] as unknown as [unknown, { delay: number }])[1].delay).toBe(400);
  api().destroy();
  expect(animations[0].animation.cancel).toHaveBeenCalled();
});

it('starts at DOM readiness without waiting for images/window load', async () => {
  const listener = vi.fn();
  window.addEventListener('env:animations-ready', listener, { once: true });
  await setup('<h2 data-env-reveal="fade-up">Ready</h2>', false, 'interactive');
  expect(listener).toHaveBeenCalledOnce();
});
