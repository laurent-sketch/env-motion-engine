import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/about-page.js', 'utf8');
afterEach(() => {
  (window as any).ENVAboutPage?.destroy();
  delete (window as any).ENVAboutPage; delete (window as any).Webflow;
  document.body.innerHTML = ''; document.head.querySelectorAll('[data-env-page-animation]').forEach(e => e.remove());
  vi.unstubAllGlobals();
});
function setup(marked = true) {
  document.body.innerHTML = `${marked ? '<script data-env-page-animation="about" data-env-about-last-end="25"></script>' : ''}<div id="env-sd-page"><div class="section-animation-about"><section class="hero-about"><img class="big--logo middle" data-env-reveal="fade-scale" data-env-blur="12"></section><section class="about-second"><div class="bloc-big-text">${Array.from({ length: 6 }, (_, i) => `<img class="line-${i}" loading="lazy">`).join('')}</div><p class="regular-text">Native copy</p></section></div></div>`;
  const revert = vi.fn(), kill = vi.fn(), progress = vi.fn(), invalidate = vi.fn();
  const fromTo = vi.fn(() => ({ progress, invalidate })), to = vi.fn(() => ({ kill }));
  const create = vi.fn();
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {} }));
  vi.stubGlobal('gsap', { registerPlugin: vi.fn(), set: vi.fn(), fromTo, to, context(cb: any) { cb(); return { revert }; } });
  vi.stubGlobal('ScrollTrigger', { create, refresh: vi.fn() });
  window.eval(source);
  (window as any).ENVAboutPage.init();
  return { fromTo, to, create, revert, kill };
}
it('does not create About motion on an unmarked page', () => {
  const f = setup(false);
  expect(f.fromTo).not.toHaveBeenCalled();
  expect(document.querySelector('[data-env-about-logo-layer]')).toBeNull();
});
it('keeps two independently timed groups, blur and separate directional easing', () => {
  const f = setup();
  expect(f.fromTo).toHaveBeenCalledTimes(6);
  expect(f.create.mock.calls[0][0].end).toBe('top 35%');
  expect(f.create.mock.calls[4][0].end).toBe('top 25%');
  expect(f.fromTo.mock.calls[0][1].filter).toContain('blur(20px)');
  const trigger = f.create.mock.calls[4][0];
  trigger.onUpdate({ direction: 1, progress: .7 });
  expect(f.to.mock.calls.at(-1)![1]).toMatchObject({ duration: .95, ease: 'power3.out' });
  trigger.onUpdate({ direction: -1, progress: .4 });
  expect(f.to.mock.calls.at(-1)![1]).toMatchObject({ duration: .7, ease: 'power1.out' });
  expect(document.querySelector('.regular-text')!.getAttribute('style')).toBeNull();
});
it('cleans observers, follower tweens and the logo layer on departure and remounts once', () => {
  const f = setup();
  f.create.mock.calls[0][0].onUpdate({ direction: 1, progress: .5 });
  (window as any).ENVAboutPage.destroy();
  expect(f.kill).toHaveBeenCalled();
  expect(f.revert).toHaveBeenCalledOnce();
  expect(document.querySelector('[data-env-about-logo-layer]')).toBeNull();
  expect(document.querySelector('.bloc-big-text img')!.getAttribute('loading')).toBe('lazy');
  expect(document.querySelector('.bloc-big-text img')!.hasAttribute('data-env-ignore')).toBe(false);
  (window as any).ENVAboutPage.init();
  expect(document.querySelectorAll('[data-env-about-logo-layer]')).toHaveLength(1);
  expect(f.fromTo).toHaveBeenCalledTimes(12);
});
