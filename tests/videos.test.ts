import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/videos.js', 'utf8');
const api = () => (window as Window & { ENVVideos?: { destroy(): void; audit(): {loaded: boolean}[] } }).ENVVideos!;
afterEach(() => { api()?.destroy(); vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.replaceChildren(); });
async function setup(hover = false, touch = false) {
  document.body.innerHTML = '<div class="project-item"><div class="item-video w-background-video" data-poster-url="poster.jpg"><video id="project" autoplay loop><source src="project.mp4"></video></div></div><div class="sd-slider"><div class="w-slider-mask"><div class="w-slide"><div class="slide-video w-background-video"><video id="hero" autoplay><source src="hero.mp4"></video></div></div><div class="w-slide" aria-hidden="true"><div class="slide-video w-background-video"><video id="next" autoplay><source src="next.mp4"></video></div></div></div><div class="w-slider-dot w-active"></div><div class="w-slider-dot"></div></div>';
  if (hover) document.querySelector('.project-item')!.setAttribute('data-env-video', 'hover');
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  const load = vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  const ios: { cb: IntersectionObserverCallback; options: IntersectionObserverInit }[] = [];
  vi.stubGlobal('IntersectionObserver', class {
    constructor(cb: IntersectionObserverCallback, options: IntersectionObserverInit) { ios.push({ cb, options }); }
    observe() {} disconnect() {}
  });
  let changed!: () => void;
  const media = { matches: false, addEventListener: vi.fn((_n, cb) => { changed = cb; }), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', (query: string) => query.includes('pointer: fine') ? { matches: !touch, addEventListener() {}, removeEventListener() {} } : media);
  new Function(source)(); await Promise.resolve();
  return { play, load, media, changed: () => changed(), enter(i: number, target: Element, visible = true) { ios[i].cb([{ target, isIntersecting: visible }] as IntersectionObserverEntry[], {} as IntersectionObserver); } };
}
it('stages existing sources and retains the poster without changing layout', async () => {
  await setup();
  expect(document.querySelector('video source')?.hasAttribute('src')).toBe(false);
  expect(document.querySelector('video')?.hasAttribute('autoplay')).toBe(false);
  expect(document.querySelector('video')?.getAttribute('poster')).toBe('poster.jpg');
  expect(api().audit().every(r => !r.loaded)).toBe(true);
});
it('loads a nearby project and starts it only when visible', async () => {
  const f = await setup(), wrapper = document.querySelector('.item-video')!;
  f.enter(0, wrapper);
  expect(document.querySelector('#project source')?.getAttribute('src')).toBe('project.mp4');
  expect(f.play).not.toHaveBeenCalled();
  f.enter(1, wrapper); expect(f.play).toHaveBeenCalled();
});
it('loads the active hero slide, deferring the inactive one until selected', async () => {
  const f = await setup(), slider = document.querySelector('.sd-slider')!;
  f.enter(1, slider);
  expect(document.querySelector('#hero source')?.hasAttribute('src')).toBe(true);
  expect(document.querySelector('#next source')?.hasAttribute('src')).toBe(false);
  document.querySelectorAll('.w-slider-dot')[0].classList.remove('w-active');
  document.querySelectorAll('.w-slider-dot')[1].classList.add('w-active');
  await Promise.resolve(); await Promise.resolve();
  expect(document.querySelector('#next source')?.hasAttribute('src')).toBe(true);
});
it('restores deferred markup on destroy and stages dynamically inserted sources', async () => {
  await setup();
  const el = document.createElement('source'); el.src = 'extra.webm';
  document.querySelector('#project')!.append(el);
  await Promise.resolve(); await Promise.resolve();
  expect(el.hasAttribute('src')).toBe(false);
  api().destroy();
  expect(el.getAttribute('src')).toContain('extra.webm');
  expect(document.querySelector('#project')?.hasAttribute('autoplay')).toBe(true);
});


it('defers opted-in projects until hover and uncovers only after playback starts', async () => {
  const f = await setup(true), root = document.querySelector('.project-item')!, wrapper = document.querySelector('.item-video')!, video = document.querySelector('#project')!;
  f.enter(0, wrapper); f.enter(1, wrapper);
  expect(video.querySelector('source')?.hasAttribute('src')).toBe(false);
  root.dispatchEvent(new Event('pointerenter'));
  expect(video.querySelector('source')?.getAttribute('src')).toBe('project.mp4');
  expect(root.classList.contains('is-env-video-playing')).toBe(false);
  video.dispatchEvent(new Event('playing'));
  expect(root.classList.contains('is-env-video-playing')).toBe(true);
  root.dispatchEvent(new Event('pointerleave'));
  expect(root.classList.contains('is-env-video-playing')).toBe(false);
  video.dispatchEvent(new Event('playing'));
  expect(root.classList.contains('is-env-video-playing')).toBe(false);
});

it('keeps hover videos unloaded on touch and with reduced motion', async () => {
  const f = await setup(true, true), root = document.querySelector('.project-item')!, wrapper = document.querySelector('.item-video')!;
  f.enter(0, wrapper); f.enter(1, wrapper);
  root.dispatchEvent(new Event('pointerenter'));
  expect(document.querySelector('#project source')?.hasAttribute('src')).toBe(false);
  api().destroy();
  const g = await setup(true);
  g.media.matches = true;
  g.enter(1, document.querySelector('.item-video')!);
  document.querySelector('.project-item')!.dispatchEvent(new Event('pointerenter'));
  expect(document.querySelector('#project source')?.hasAttribute('src')).toBe(false);
});

it('releases retired page records without restoring sources, and stages the next page', async () => {
  await setup();
  const runtime = api() as ReturnType<typeof api> & { release(root: Element): void; stage(root: Element): void };
  const oldPage = document.querySelector('.project-item')!;
  runtime.release(oldPage);
  expect(oldPage.querySelector('source')?.hasAttribute('src')).toBe(false);
  expect(runtime.audit()).toHaveLength(2);
  const next = document.createElement('section');
  next.innerHTML = '<div class="item-video w-background-video"><video><source src="new.mp4"></video></div>';
  runtime.stage(next);
  expect(next.querySelector('source')?.hasAttribute('src')).toBe(false);
  expect(runtime.audit()).toHaveLength(3);
});

it('supports native videos in arbitrary opt-in containers without Webflow classes', async () => {
  const f = await setup();
  const root = document.createElement('article'); root.dataset.envVideo = 'hover';
  root.innerHTML = '<video id="generic" muted poster="cover.jpg" autoplay><source src="generic.mp4"></video>';
  document.body.append(root);
  await Promise.resolve(); await Promise.resolve();
  const video = root.querySelector('video')!;
  expect(video.querySelector('source')!.hasAttribute('src')).toBe(false);
  expect(video.getAttribute('poster')).toBe('cover.jpg');
  f.enter(0, root); f.enter(1, root);
  expect(video.querySelector('source')!.hasAttribute('src')).toBe(false);
  root.dispatchEvent(new Event('pointerenter'));
  expect(video.querySelector('source')!.getAttribute('src')).toBe('generic.mp4');
  video.dispatchEvent(new Event('playing'));
  expect(root.classList.contains('is-env-video-playing')).toBe(true);
  root.dispatchEvent(new Event('pointerleave'));
  expect(root.classList.contains('is-env-video-playing')).toBe(false);
});

it('keeps hero autoplay behavior inside an opted-in ancestor', async () => {
  const f = await setup();
  const slider = document.querySelector('.sd-slider')!;
  api().destroy();
  slider.setAttribute('data-env-video', 'hover');
  new Function(source)(); await Promise.resolve();
  // Fresh observers are appended by the second initialization.
  f.enter(3, slider);
  expect(document.querySelector('#hero source')!.hasAttribute('src')).toBe(true);
});
