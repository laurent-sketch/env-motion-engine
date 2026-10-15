import { afterEach, expect, it, vi } from 'vitest';
import { gsap } from 'gsap';
import { createReveal } from '../src/modules/reveal';
import { PageScope } from '../src/lifecycle';
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.replaceChildren(); });
function setup() {
  document.body.innerHTML = '<main><div data-env-reveal="fade-scale" style="color:red"></div></main>';
  const root = document.querySelector('main')!;
  const target = root.firstElementChild as HTMLElement;
  vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ top: 2000, bottom: 2100 } as DOMRect);
  let callback!: IntersectionObserverCallback;
  const observe = vi.fn(), disconnect = vi.fn(), unobserve = vi.fn();
  vi.stubGlobal('IntersectionObserver', class { constructor(cb: IntersectionObserverCallback) { callback = cb; } observe = observe; disconnect = disconnect; unobserve = unobserve; });
  return { root, target, observe, disconnect, unobserve, enter: () => callback([{ isIntersecting: true, target }] as IntersectionObserverEntry[], {} as IntersectionObserver) };
}
it('animates once with the injected GSAP and restores authored styles on teardown', () => {
  const fixture = setup();
  const scope = new PageScope(fixture.root, [createReveal(gsap)], false);
  expect(fixture.observe).toHaveBeenCalledWith(fixture.target);
  fixture.enter();
  expect(fixture.unobserve).toHaveBeenCalledWith(fixture.target);
  expect(gsap.getTweensOf(fixture.target).length).toBeGreaterThan(0);
  scope.destroy();
  expect(fixture.target.getAttribute('style')).toBe('color: red;');
  expect(gsap.getTweensOf(fixture.target)).toHaveLength(0);
  expect(fixture.disconnect).toHaveBeenCalledOnce();
});
it('keeps initially visible content stable and respects reduced motion', () => {
  const fixture = setup();
  vi.mocked(fixture.target.getBoundingClientRect).mockReturnValue({ top: 0, bottom: 100 } as DOMRect);
  const scope = new PageScope(fixture.root, [createReveal(gsap)], false);
  expect(fixture.observe).not.toHaveBeenCalled(); scope.destroy();
  const reduced = new PageScope(fixture.root, [createReveal(gsap)], true);
  expect(fixture.observe).not.toHaveBeenCalled(); reduced.destroy();
});
it('leaves content readable when IntersectionObserver is unavailable', () => {
  const fixture = setup(); vi.stubGlobal('IntersectionObserver', undefined);
  const scope = new PageScope(fixture.root, [createReveal(gsap)], false);
  expect(fixture.target.style.opacity).toBe(''); scope.destroy();
});
it('refuses elements still owned by a native Webflow interaction', () => {
  const fixture = setup(); fixture.target.setAttribute('data-w-id', 'native-target');
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  Object.assign(window, { Webflow: { require: () => ({ store: { getState: () => ({ ixData: { events: { event: { target: { id: 'page|native-target' } } } } }) } }) } });
  const scope = new PageScope(fixture.root, [createReveal(gsap)], false);
  expect(fixture.observe).not.toHaveBeenCalled(); expect(warn).toHaveBeenCalledOnce();
  scope.destroy(); delete (window as Window & { Webflow?: unknown }).Webflow;
});
