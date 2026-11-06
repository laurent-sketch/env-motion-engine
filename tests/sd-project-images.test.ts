import { afterEach, expect, it, vi } from 'vitest';
import { installProjectImageSizes } from '../src/sd/project-images.js';
afterEach(() => { document.body.replaceChildren(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function fixture() {
  document.body.innerHTML = '<main><img class="image-project" sizes="144px" src="large.avif" srcset="small.avif 500w, large.avif 5376w"><img class="cover-project" sizes="144px" srcset="small.avif 500w, large.avif 1600w"><img class="image-project next" sizes="(max-width: 991px) 100vw, 1151px" srcset="small.avif 500w, large.avif 1600w"><img class="image-news" sizes="144px" srcset="small.avif 500w, large.avif 1600w"></main><aside><img class="image-project" sizes="144px" srcset="small.avif 500w, large.avif 1600w"></aside>';
  let callback;
  const disconnect = vi.fn(), observe = vi.fn();
  vi.stubGlobal('ResizeObserver', class { constructor(cb) { callback = cb; } observe = observe; disconnect = disconnect; });
  const root = document.querySelector('main')!;
  const [large, cover] = root.querySelectorAll('img');
  let width = 1184;
  vi.spyOn(large, 'clientWidth', 'get').mockImplementation(() => width);
  vi.spyOn(cover, 'clientWidth', 'get').mockReturnValue(590);
  return { root, large, cover, disconnect, observe, resize(w) { width = w; callback([{ target: large }]); } };
}
it('repairs wrong fixed project sizes while keeping srcset, lazy loading and other images intact', () => {
  const f = fixture(); f.large.setAttribute('loading', 'lazy');
  const dispose = installProjectImageSizes(f.root);
  expect(f.large.getAttribute('sizes')).toBe('1184px');
  expect(f.cover.getAttribute('sizes')).toBe('590px');
  expect(f.large.getAttribute('srcset')).toContain('5376w');
  expect(f.large.getAttribute('loading')).toBe('lazy');
  expect(f.root.querySelector('.next')!.getAttribute('sizes')).toContain('max-width');
  expect(f.root.querySelector('.image-news')!.getAttribute('sizes')).toBe('144px');
  expect(document.querySelector('aside img')!.getAttribute('sizes')).toBe('144px');
  expect(f.observe).toHaveBeenCalledTimes(2);
  dispose(); expect(f.disconnect).toHaveBeenCalledOnce();
});
it('updates responsive layout changes and waits when an image is hidden', () => {
  const f = fixture(), dispose = installProjectImageSizes(f.root);
  f.resize(0); expect(f.large.getAttribute('sizes')).toBe('1184px');
  f.resize(342); expect(f.large.getAttribute('sizes')).toBe('342px');
  dispose(); f.resize(900); expect(f.large.getAttribute('sizes')).toBe('342px');
});
it('ignores outgoing detached pages after navigation', () => {
  const f = fixture(), dispose = installProjectImageSizes(f.root);
  f.root.remove(); f.resize(900);
  expect(f.large.getAttribute('sizes')).toBe('1184px');
  dispose();
});
