import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/news.js', 'utf8');
const api = () => (window as Window & { ENVNews?: { destroy(): void; init(): void } }).ENVNews!;
afterEach(() => { api()?.destroy(); vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.replaceChildren(); document.head.replaceChildren(); });
async function flush() { for (let i = 0; i < 8; i++) await Promise.resolve(); }
function setup(mode: string) {
  document.body.innerHTML = `<section><div class="swiper-news" data-env-news="${mode}"><div class="swiper-wrapper-news"><article class="swiper-slide-news" style="width:200px">Card</article></div></div><button class="swiper-button-prev"></button><button class="swiper-button-next"></button></section>`;
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
  const root = document.querySelector('.swiper-news') as HTMLElement;
  const init = vi.fn(), marqueeDestroy = vi.fn(), swiperDestroy = vi.fn();
  vi.stubGlobal('ENVNewsMarquee', { init, destroy: marqueeDestroy });
  const construct = vi.fn();
  vi.stubGlobal('Swiper', class {
    constructor(el: Element, params: unknown) { construct(el, params); Object.assign(el, { swiper: this }); }
    destroy() { swiperDestroy(); delete (root as HTMLElement & { swiper?: unknown }).swiper; }
  });
  new Function(source)();
  return { root, init, marqueeDestroy, swiperDestroy, construct };
}
it('uses the selected mode and switches both ways without two active engines', async () => {
  const f = setup('marquee');
  expect(f.init).toHaveBeenCalledWith(f.root);
  f.root.setAttribute('data-env-news', 'swiper'); await flush();
  document.querySelector('link')!.dispatchEvent(new Event('load')); await flush();
  expect(f.marqueeDestroy).toHaveBeenCalledWith(f.root);
  expect(f.construct).toHaveBeenCalledOnce();
  expect(f.construct.mock.calls[0][1].mousewheel.forceToAxis).toBe(true);
  f.root.setAttribute('data-env-news', 'marquee'); await flush();
  expect(f.swiperDestroy).toHaveBeenCalledOnce();
  expect(f.init).toHaveBeenCalledTimes(2);
  api().destroy(); expect(f.marqueeDestroy).toHaveBeenCalledTimes(2);
});
it('keeps an unconfigured container inactive and prevents duplicate initialization', async () => {
  const f = setup('off');
  expect(f.init).not.toHaveBeenCalled(); expect(f.construct).not.toHaveBeenCalled();
  f.root.setAttribute('data-env-news', 'marquee'); await flush();
  api().init(); expect(f.init).toHaveBeenCalledOnce();
});
it('discards a pending Swiper initialization after the mode changes', async () => {
  const f = setup('swiper');
  f.root.setAttribute('data-env-news', 'marquee'); await flush();
  document.querySelector('link')!.dispatchEvent(new Event('load')); await flush();
  expect(f.construct).not.toHaveBeenCalled(); expect(f.init).toHaveBeenCalledOnce();
});
