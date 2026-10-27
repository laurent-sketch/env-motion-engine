import { afterEach, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
const source = readFileSync('public/hero.js', 'utf8');
afterEach(() => { (document.querySelector('.hero-wrapper') as any)?.__envHeroCleanup?.(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.innerHTML = ''; });
function fixture(links = 0) {
  vi.useFakeTimers(); vi.stubGlobal('matchMedia', () => ({ matches: false }));
  Object.defineProperty(document, 'hidden', { configurable: true, value: false });
  document.body.innerHTML = `<div class="hero-wrapper"><div class="sd-slider" data-autoplay="false"><div class="w-slider-mask"><div class="w-slide"></div><div class="w-slide"></div></div><div class="w-slider-nav"><div class="w-slider-dot w-active"></div><div class="w-slider-dot"></div></div></div>${'<a class="slider-nav-link" href="#"></a>'.repeat(links)}</div>`;
  const dots = [...document.querySelectorAll('.w-slider-dot')];
  dots.forEach(dot => dot.addEventListener('click', () => dots.forEach(d => d.classList.toggle('w-active', d === dot))));
  (window as any).Webflow = [];
  new Function(source)(); (window as any).Webflow[0]();
  return dots;
}
it('autoplays and loops without custom navigation links', async () => {
  const dots = fixture();
  await vi.advanceTimersByTimeAsync(6000); expect(dots[1].classList.contains('w-active')).toBe(true);
  await vi.advanceTimersByTimeAsync(6000); expect(dots[0].classList.contains('w-active')).toBe(true);
});
it('keeps custom navigation functional when present', async () => {
  const dots = fixture(2);
  (document.querySelectorAll('.slider-nav-link')[1] as HTMLElement).click();
  expect(dots[1].classList.contains('w-active')).toBe(true);
  expect(document.querySelectorAll('.slider-nav-link')[1].classList.contains('active')).toBe(true);
});
it('clears the autoplay timer on page cleanup', async () => {
  const dots = fixture();
  (document.querySelector('.hero-wrapper') as any).__envHeroCleanup();
  await vi.advanceTimersByTimeAsync(12000); expect(dots[0].classList.contains('w-active')).toBe(true);
});
