import { afterEach, expect, it, vi } from 'vitest';
import { installAboutLayout } from '../src/sd/about-layout.js';
afterEach(() => { document.body.replaceChildren(); document.documentElement.removeAttribute('data-env-transition-active'); vi.useRealTimers(); vi.unstubAllGlobals(); });
function fixture() {
  vi.useFakeTimers();
  document.body.innerHTML = '<main><section class="section hero-about"></section><section class="section"><div class="bloc-big-text"><img loading="lazy"><img loading="lazy" width="800" height="200"></div></section><section class="section mask"></section><img class="portrait" loading="lazy"></main>';
  const root = document.querySelector('main')!;
  const [image, sized] = root.querySelectorAll('img');
  [image, sized].forEach(img => { Object.defineProperty(img, 'naturalWidth', { value: 923 }); Object.defineProperty(img, 'naturalHeight', { value: 202 }); });
  const refresh = vi.fn(), resize = vi.fn(), disconnect = vi.fn();
  vi.stubGlobal('ScrollTrigger', { refresh }); vi.stubGlobal('lenis', { resize });
  let resized;
  vi.stubGlobal('ResizeObserver', class { constructor(cb) { resized = cb; } observe() {} disconnect = disconnect; });
  return { root, image, sized, refresh, resize, disconnect, change(h) { resized([{ target: root.querySelector('.mask'), contentRect: { width: 1000, height: h } }]); } };
}
it('loads SVG headlines early and preserves intrinsic dimensions and authored ratios', async () => {
  const f = fixture(), layout = installAboutLayout(f.root);
  expect(f.image.loading).toBe('eager');
  expect(f.image.getAttribute('width')).toBe('923');
  expect(f.sized.getAttribute('width')).toBe('800');
  expect(f.root.querySelector('.portrait')!.getAttribute('loading')).toBe('lazy');
  await vi.advanceTimersByTimeAsync(32);
  expect(f.refresh).toHaveBeenCalled();
  layout.destroy(); expect(f.disconnect).toHaveBeenCalled();
});
it('coalesces layout changes until rapid scrolling stops and ignores equal box sizes', async () => {
  const f = fixture(), layout = installAboutLayout(f.root);
  await vi.advanceTimersByTimeAsync(32); f.refresh.mockClear();
  f.change(100); f.change(100); await vi.advanceTimersByTimeAsync(32);
  expect(f.refresh).not.toHaveBeenCalled();
  window.dispatchEvent(new Event('scroll')); f.change(400);
  await vi.advanceTimersByTimeAsync(100); window.dispatchEvent(new Event('scroll'));
  await vi.advanceTimersByTimeAsync(100); expect(f.refresh).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(100); expect(f.refresh).toHaveBeenCalledOnce();
  layout.destroy();
});
it('defers refreshing during page transitions and cancels detached page work', async () => {
  const f = fixture(); document.documentElement.setAttribute('data-env-transition-active', '');
  const layout = installAboutLayout(f.root);
  await vi.advanceTimersByTimeAsync(200); expect(f.refresh).not.toHaveBeenCalled();
  document.documentElement.removeAttribute('data-env-transition-active');
  await vi.advanceTimersByTimeAsync(200); expect(f.refresh).toHaveBeenCalledOnce();
  layout.refresh(); layout.destroy(); f.image.dispatchEvent(new Event('load'));
  await vi.advanceTimersByTimeAsync(400); expect(f.refresh).toHaveBeenCalledOnce();
});
it('does nothing on other pages', () => {
  document.body.innerHTML = '<main><img loading="lazy"></main>';
  const layout = installAboutLayout(document.querySelector('main'));
  expect(document.querySelector('img')!.getAttribute('loading')).toBe('lazy'); layout.destroy();
});
