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
