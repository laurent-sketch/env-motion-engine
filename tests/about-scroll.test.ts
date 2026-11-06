import { afterEach, expect, it, vi } from 'vitest';
import { installAboutScroll } from '../src/sd/about-scroll.js';
afterEach(() => { document.body.replaceChildren(); document.documentElement.removeAttribute('data-env-transition-active'); vi.useRealTimers(); vi.unstubAllGlobals(); });
function fixture(split = true) {
  vi.useFakeTimers(); vi.stubGlobal('innerHeight', 1000);
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn() }));
  document.body.innerHTML = `<main><div class="about-hero"><section class="hero-about"></section><div data-reveal-text="trigger"><div data-reveal-text="text-white">${split ? '<span class="gsap_split_word">Hello</span><span class="gsap_split_word">world</span>' : 'Hello world'}</div></div></div><section class="section mask"></section></main>`;
  const root = document.querySelector('main')!, trigger = root.querySelector('[data-reveal-text="trigger"]')!;
  const mask = root.querySelector('.mask') as HTMLElement;
  let top = 1200;
  trigger.getBoundingClientRect = () => ({ top, height: 200 } as DOMRect);
  mask.getBoundingClientRect = () => ({ top } as DOMRect);
  return { root, mask, trigger, setTop(y) { top = y; window.dispatchEvent(new Event('scroll')); }, opacity() { return [...root.querySelectorAll('.gsap_split_word')].map((e: HTMLElement) => Number(e.style.getPropertyValue('--env-about-opacity'))); } };
}
it('tracks large scroll jumps in either direction using the current rendered box', async () => {
  const f = fixture(), motion = installAboutScroll(f.root);
  await vi.advanceTimersByTimeAsync(32);
  expect(f.opacity()).toEqual([.1, .1]); expect(f.mask.style.getPropertyValue('--env-about-inset')).toBe('10.0000%');
  f.setTop(-400); await vi.advanceTimersByTimeAsync(1000);
  expect(f.opacity()).toEqual([1, 1]); expect(f.mask.style.getPropertyValue('--env-about-inset')).toBe('0.0000%');
  f.setTop(1200); await vi.advanceTimersByTimeAsync(1000);
  expect(f.opacity()).toEqual([.1, .1]); expect(f.mask.style.getPropertyValue('--env-about-inset')).toBe('10.0000%');
  motion.destroy();
});
it('stops during the navigation mask and resumes without a stale progress on return', async () => {
  const f = fixture(), motion = installAboutScroll(f.root);
  await vi.advanceTimersByTimeAsync(32);
  document.documentElement.setAttribute('data-env-transition-active', ''); f.setTop(-400);
  await vi.advanceTimersByTimeAsync(300); expect(f.opacity()).toEqual([.1, .1]);
  document.documentElement.removeAttribute('data-env-transition-active');
  await vi.advanceTimersByTimeAsync(300); expect(f.opacity()).toEqual([1, 1]);
  motion.destroy(); expect(f.mask.hasAttribute('data-env-about-mask')).toBe(false);
  expect(f.root.querySelector('[data-env-about-word]')).toBeNull();
});
it('adopts native SplitText regeneration without applying opacity twice to its parent', async () => {
  const f = fixture(false), motion = installAboutScroll(f.root);
  await vi.advanceTimersByTimeAsync(32);
  const text = f.root.querySelector('[data-reveal-text="text-white"]')!;
  expect(text.hasAttribute('data-env-about-word')).toBe(true);
  text.innerHTML = '<span class="gsap_split_word">Hello</span><span class="gsap_split_word">world</span>';
  await vi.advanceTimersByTimeAsync(32);
  expect(text.hasAttribute('data-env-about-word')).toBe(false);
  expect(f.opacity()).toEqual([.1, .1]);
  motion.destroy();
});
