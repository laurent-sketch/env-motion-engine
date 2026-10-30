import { afterEach, expect, it, vi } from 'vitest';
import { createAlternativeTransition } from '../src/sd/alternative-transition.js';
afterEach(() => { document.body.innerHTML = ''; vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function fixture(reduced = false) {
  document.body.innerHTML = '<nav id="menu"></nav><div id="env-sd-page"><main class="main-wrapper"><h1 id="title" data-env-reveal="fade-up">Work</h1><script>example()</script></main></div>';
  vi.stubGlobal('matchMedia', () => ({ matches: reduced }));
  const cancel = vi.fn();
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, writable: true, value: vi.fn(() => ({ finished: Promise.resolve(), cancel })) });
  return { runtime: createAlternativeTransition(), cancel };
}
it('creates an inert visual snapshot without duplicate IDs, scripts, or reveal targets', () => {
  const { runtime } = fixture(); runtime.capture();
  const snapshot = document.querySelector('[data-env-transition-snapshot]')!;
  expect(snapshot.getAttribute('aria-hidden')).toBe('true');
  expect(snapshot.querySelector('[id],script,[data-env-reveal]')).toBeNull();
  expect(document.querySelectorAll('#menu')).toHaveLength(1);
  runtime.cleanup(); expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
});
it('restores incoming inline styles after revealing and removes the old snapshot', async () => {
  const { runtime, cancel } = fixture(); runtime.capture();
  const root = document.querySelector('#env-sd-page') as HTMLElement;
  root.style.color = 'red'; const original = root.getAttribute('style');
  runtime.prepare(root); expect(root.style.clipPath).toContain('100%');
  await runtime.reveal(root);
  expect(root.getAttribute('style')).toBe(original);
  expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
  expect(cancel).toHaveBeenCalledTimes(3);
});
it('leaves navigation instantaneous with reduced motion', async () => {
  const { runtime } = fixture(true); runtime.capture();
  await runtime.reveal(document.querySelector('#env-sd-page'));
  expect(Element.prototype.animate).not.toHaveBeenCalled();
  expect(document.querySelector('[data-env-transition-snapshot]')).toBeNull();
});

it('uses viewport-sized mask travel and synchronizes a black shade with both page layers', async () => {
  const { runtime } = fixture(); runtime.capture();
  const root = document.querySelector('#env-sd-page') as HTMLElement;
  const shade = document.querySelector('[data-env-transition-shade]') as HTMLElement;
  expect(shade.style.background).toBe('rgb(0, 0, 0)');
  runtime.prepare(root); await runtime.reveal(root);
  const calls = vi.mocked(Element.prototype.animate).mock.calls;
  expect(calls).toHaveLength(3);
  expect(calls[1][0][0].clipPath).toContain(`${window.innerHeight}px`);
  expect(calls[1][0][0].clipPath).not.toContain('100%,100% 110%');
  expect(calls[2][0]).toEqual([{ opacity: 0 }, { opacity: 0.35 }]);
  expect(calls.map(call => call[1])).toEqual([calls[0][1], calls[0][1], calls[0][1]]);
});

// Webflow centers background videos with negative offsets and auto margins.
// Omitting those resolved margins places the captured frame outside its wrapper.
it('preserves background video centering when replacing it with a frame', () => {
  const { runtime } = fixture();
  const root = document.querySelector('#env-sd-page')!;
  root.innerHTML = '<div class="w-background-video"><video style="position:absolute;top:-100px;left:-200px;width:200px;height:100px;margin:100px 200px;object-fit:cover"></video></div>';
  const source = root.querySelector('video')!;
  Object.defineProperty(source, 'readyState', { value: 4 });
  const drawImage = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage } as any);
  runtime.capture();
  const frame = document.querySelector('[data-env-transition-snapshot] canvas') as HTMLCanvasElement;
  expect(drawImage).toHaveBeenCalled();
  expect(frame.style.marginTop).toBe('100px');
  expect(frame.style.marginLeft).toBe('200px');
  expect(frame.style.top).toBe('-100px');
  expect(frame.style.left).toBe('-200px');
  runtime.cleanup();
});

it('freezes outgoing page styles before destination CSS and slider initialization change', () => {
  const { runtime } = fixture();
  const sheet = document.createElement('style');
  sheet.textContent = '#title { color: red; margin-top: 42px; } .w-slide { width: 300px; }';
  document.head.append(sheet);
  document.querySelector('#title')!.classList.add('w-slide');
  runtime.capture();
  sheet.textContent = '.w-slide { width: 900px; }';
  const heading = document.querySelector('[data-env-transition-snapshot] h1') as HTMLElement;
  expect(heading.style.color).toBe('rgb(255, 0, 0)');
  expect(heading.style.marginTop).toBe('42px');
  expect(heading.style.width).toBe('300px');
  expect(heading.classList.contains('w-slide')).toBe(false);
  runtime.cleanup(); sheet.remove();
});

it('compensates section displacement caused by freezing auto heights', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section class="section news">News</section>';
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const top = this.closest('[data-env-transition-snapshot]') ? 44 : 100;
    return { top, left: 0, bottom: top + 200, right: 300, width: 300, height: 200, x: 0, y: top, toJSON() {} };
  });
  runtime.capture();
  const section = document.querySelector('[data-env-transition-snapshot] .news') as HTMLElement;
  expect(section.style.transform).toContain('translate(0px,56px)');
  runtime.cleanup();
});

it('isolates the frozen footer from class-targeted Webflow parallax', () => {
  const { runtime } = fixture();
  document.querySelector('#env-sd-page')!.insertAdjacentHTML('beforeend', '<footer class="section footer static" style="transform:translateY(-2px)">Footer</footer>');
  runtime.capture();
  const snapshot = document.querySelector('[data-env-transition-snapshot]')!;
  expect(snapshot.querySelector('.footer')).toBeNull();
  expect((snapshot.querySelector('footer') as HTMLElement).style.transform).toContain('-2px');
  runtime.cleanup();
});

it('removes attribute-based services targets only from the outgoing snapshot', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<div data-services="reveal"><div class="bloc-100 gap24 padding-right" style="opacity:1">Brand strategy</div></div>';
  runtime.capture();
  expect(document.querySelector('[data-env-transition-snapshot] [data-services]')).toBeNull();
  expect(document.querySelector('[data-env-transition-snapshot] .bloc-100')).toBeNull();
  expect(document.querySelector('#env-sd-page [data-services="reveal"]')).not.toBeNull();
  expect((document.querySelector('[data-env-transition-snapshot] main > div > div') as HTMLElement).style.opacity).toBe('1');
  runtime.cleanup();
});

it('freezes nested sticky titles without changing the live page', () => {
  const { runtime } = fixture();
  document.querySelector('.main-wrapper')!.innerHTML = '<section><div class="sticky" style="position:sticky;top:112px"><h1>Built Differently</h1></div></section>';
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const top = this.closest('[data-env-transition-snapshot]') ? -200 : 112;
    return { top, left: 0, bottom: top + 100, right: 300, width: 300, height: 100, x: 0, y: top, toJSON() {} };
  });
  runtime.capture();
  const live = document.querySelector('#env-sd-page .sticky') as HTMLElement;
  const frozen = document.querySelector('[data-env-transition-snapshot] .sticky') as HTMLElement;
  expect(live.style.position).toBe('sticky');
  expect(frozen.style.position).toBe('relative');
  expect(frozen.style.inset).toBe('auto');
  expect(frozen.style.transform).toContain('translate(');
  runtime.cleanup();
});

it('copies painted canvas pixels into the transition snapshot', () => {
  const { runtime } = fixture();
  const source = document.createElement('canvas');source.width=600;source.height=300;
  document.querySelector('.main-wrapper')!.append(source);
  const drawImage=vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({drawImage} as any);
  runtime.capture();
  const frozen=document.querySelector('[data-env-transition-snapshot] canvas') as HTMLCanvasElement;
  expect(frozen.width).toBe(600);expect(frozen.height).toBe(300);
  expect(drawImage).toHaveBeenCalledWith(source,0,0);
  runtime.cleanup();
});
