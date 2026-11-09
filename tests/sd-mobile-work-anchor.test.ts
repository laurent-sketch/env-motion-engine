import { afterEach, expect, it, vi } from 'vitest';
import { installMobileWorkAnchor } from '../src/sd/mobile-work-anchor.js';
let dispose = () => {};
afterEach(() => { dispose(); document.body.replaceChildren(); document.documentElement.removeAttribute('style'); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function fixture(mobile = true, reduced = false) {
  document.body.innerHTML = '<a id="explore" href="#work">Explore</a><section id="work"></section><a id="page" href="/about">About</a><a id="contact" href="#">Contact</a>';
  vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('767') ? mobile : reduced }));
  const scrollTo = vi.fn(); vi.stubGlobal('lenis', { isStopped: false, scrollTo });
  dispose = installMobileWorkAnchor();
  const link = document.getElementById('explore')!;
  return { scrollTo, link, event: () => new MouseEvent('click', { bubbles: true, cancelable: true }) };
}
it('uses one Lenis scroll for the mobile work target, respecting existing CSS padding', () => {
  const f = fixture(); document.documentElement.style.scrollPaddingTop = '106px';
  const delegated = vi.fn(); document.body.addEventListener('click', delegated);
  const e = f.event(); f.link.dispatchEvent(e);
  expect(e.defaultPrevented).toBe(true); expect(delegated).not.toHaveBeenCalled();
  expect(f.scrollTo).toHaveBeenCalledExactlyOnceWith(document.getElementById('work'), { offset: -106, immediate: false });
});
it('uses 90px without a CSS override, and never changes desktop or other page/modal links', () => {
  const f = fixture(); f.link.click();
  expect(f.scrollTo).toHaveBeenCalledWith(document.getElementById('work'), { offset: -90, immediate: false });
  for (const id of ['page', 'contact']) {
    const link = document.getElementById(id)!;
    link.addEventListener('click', event => event.preventDefault()); link.click();
  }
  expect(f.scrollTo).toHaveBeenCalledTimes(1);
  dispose(); const desktop = fixture(false); const e = desktop.event(); desktop.link.dispatchEvent(e);
  expect(e.defaultPrevented).toBe(false); expect(desktop.scrollTo).not.toHaveBeenCalled();
});
it('retains other anchors and modified/new-tab clicks', () => {
  const f = fixture();
  for (const href of ['#missing', '/about#work', 'https://example.org/#work']) {
    f.link.setAttribute('href', href); const e = f.event();
    f.link.addEventListener('click', event => event.preventDefault(), { once: true }); f.link.dispatchEvent(e);
  }
  f.link.setAttribute('href', '#work'); f.link.setAttribute('target', '_blank'); f.link.click();
  expect(f.scrollTo).not.toHaveBeenCalled();
});
it('falls back to native smooth scroll without restarting stopped Lenis and respects reduced motion', () => {
  const f = fixture(true, true), native = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.stubGlobal('lenis', { isStopped: true, scrollTo: f.scrollTo });
  vi.spyOn(document.getElementById('work')!, 'getBoundingClientRect').mockReturnValue({ top: 620 } as DOMRect);
  f.link.click();
  expect(f.scrollTo).not.toHaveBeenCalled(); expect(native).toHaveBeenCalledWith({ top: 530, behavior: 'instant' });
});
