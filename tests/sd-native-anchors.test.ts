import { afterEach, expect, it, vi } from 'vitest';
import { installNativeAnchors, nativeAnchorTarget } from '../src/sd/native-anchors.js';
let cleanup = () => {};
afterEach(() => { cleanup(); document.body.replaceChildren(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function fixture() {
  document.body.innerHTML = '<a id="anchor" href="#work">Explore</a><section id="work"></section><a id="contact" href="#" data-modal="contact">Contact</a><a id="page" href="/about">About</a>';
  cleanup = installNativeAnchors();
  return document.getElementById('anchor')!;
}
it('leaves the native default action enabled but bypasses delegated Webflow/Swup scrolling', () => {
  const link = fixture(), native = vi.fn();
  document.addEventListener('click', native, { once: true });
  const event = new MouseEvent('click', { bubbles: true, cancelable: true });
  link.dispatchEvent(event);
  expect(event.defaultPrevented).toBe(false);
  expect(native).not.toHaveBeenCalled();
  document.getElementById('contact')!.click();
  expect(native).toHaveBeenCalledTimes(1);
});
it('only accepts a resolved target on the current origin, path and query', () => {
  fixture();
  expect(nativeAnchorTarget('#work')).toBe(document.getElementById('work'));
  for (const href of ['#', '#missing', '#%xx', '/about#work', '?other=1#work', 'https://example.org/#work']) expect(nativeAnchorTarget(href)).toBeNull();
});
it('keeps modified clicks, new windows and non-anchor actions untouched', () => {
  const link = fixture(), delegated = vi.fn();
  document.body.addEventListener('click', delegated);
  link.dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true }));
  link.setAttribute('target', '_blank'); link.click();
  document.getElementById('page')!.addEventListener('click', event => event.preventDefault());
  document.getElementById('page')!.click();
  expect(delegated).toHaveBeenCalledTimes(3);
});
it('cancels an existing wheel tween without computing an anchor position or restarting a stopped Lenis', () => {
  const link = fixture(), lenis = { isStopped: false, isScrolling: 'smooth', stop: vi.fn(), start: vi.fn(), scrollTo: vi.fn() };
  vi.stubGlobal('lenis', lenis);
  link.click();
  expect(lenis.stop).toHaveBeenCalledTimes(1); expect(lenis.start).toHaveBeenCalledTimes(1);
  expect(lenis.scrollTo).not.toHaveBeenCalled();
  lenis.isStopped = true; link.click();
  expect(lenis.start).toHaveBeenCalledTimes(1);
});
it('closes an open mobile menu through its native burger without suppressing anchor default', () => {
  fixture();
  document.body.innerHTML = '<nav class="navbar-logo-center is-env-menu-open"><button class="burger-menu-wrap">Close</button><div class="menu-modal"><a href="#work">Work</a></div></nav><section id="work"></section>';
  const close = vi.fn(); document.querySelector('button')!.addEventListener('click', close);
  const event = new MouseEvent('click', { bubbles: true, cancelable: true });
  document.querySelector('a')!.dispatchEvent(event);
  expect(close).toHaveBeenCalledTimes(1); expect(event.defaultPrevented).toBe(false);
});
