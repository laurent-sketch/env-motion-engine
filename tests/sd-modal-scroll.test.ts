import { afterEach, expect, it, vi } from 'vitest';
import { installModalScroll } from '../src/sd/modal-scroll.js';
afterEach(() => { document.body.replaceChildren(); document.body.removeAttribute('style'); document.documentElement.removeAttribute('style'); document.documentElement.removeAttribute('data-env-transition-active'); document.documentElement.removeAttribute('data-env-modal-scroll-lock'); vi.unstubAllGlobals(); });
function fixture(stopped = false) {
  document.body.innerHTML = '<nav><div class="menu-modal" style="display:none;opacity:0"><div style="overflow-y:auto" class="menu-content">Links</div></div><div class="contact-modal-bloc" style="display:none"><div class="contact-form-wrapper" style="overflow-y:auto"><div class="form-content">Form</div></div></div></nav><main>Background</main>';
  const media = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', () => media);
  const lenis = { isStopped: stopped, stop: vi.fn(), start: vi.fn() }; vi.stubGlobal('lenis', lenis);
  const nav = document.querySelector('nav')!, contact = nav.querySelector('.contact-modal-bloc') as HTMLElement, menu = nav.querySelector('.menu-modal') as HTMLElement, panel = nav.querySelector('.contact-form-wrapper') as HTMLElement;
  Object.defineProperty(panel, 'clientHeight', { value: 200 }); Object.defineProperty(panel, 'scrollHeight', { value: 800 });
  const dispose = installModalScroll(nav);
  return { nav, contact, menu, panel, media, lenis, dispose, async open() { contact.style.display = 'flex'; await Promise.resolve(); }, wheel(target, deltaY) { const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY }); target.dispatchEvent(event); return event.defaultPrevented; } };
}
it('freezes the page without repositioning it and allows native scrolling inside the form', async () => {
  const f = fixture(); document.body.style.overflow = 'clip';
  await f.open(); expect(f.lenis.stop).toHaveBeenCalledOnce();
  expect(document.documentElement.style.overflow).toBe('hidden'); expect(document.body.style.position).toBe('');
  expect(f.contact.hasAttribute('data-lenis-prevent')).toBe(true);
  expect(f.wheel(document.querySelector('main'), 80)).toBe(true);
  expect(f.wheel(f.panel.firstElementChild, 80)).toBe(false);
  f.panel.scrollTop = 600; expect(f.wheel(f.panel.firstElementChild, 80)).toBe(true);
  expect(f.wheel(f.panel.firstElementChild, -80)).toBe(false);
  f.contact.style.display = 'none'; await Promise.resolve();
  expect(document.body.style.overflow).toBe('clip'); expect(f.lenis.start).toHaveBeenCalledOnce();
  f.dispose(); expect(f.contact.hasAttribute('data-lenis-prevent')).toBe(false);
});
it('keeps one lock until the last overlay has finished closing', async () => {
  const f = fixture(); await f.open();
  f.menu.style.display = 'block'; f.menu.style.opacity = '1'; await Promise.resolve();
  f.contact.style.display = 'none'; await Promise.resolve();
  expect(f.lenis.start).not.toHaveBeenCalled();
  f.menu.style.opacity = '0'; await Promise.resolve();
  expect(f.lenis.start).toHaveBeenCalledOnce(); expect(f.lenis.stop).toHaveBeenCalledOnce();
  f.dispose();
});
it('does not restart Lenis stopped by another owner or during a navigation mask', async () => {
  const f = fixture(true); await f.open(); f.dispose(); expect(f.lenis.start).not.toHaveBeenCalled();
  const next = fixture(); await next.open();
  document.documentElement.setAttribute('data-env-transition-active', ''); next.dispose();
  expect(next.lenis.start).not.toHaveBeenCalled(); expect(document.documentElement.style.overflow).toBe('');
});
it('releases a menu-only lock when switching to desktop while keeping contact locking on desktop', async () => {
  const f = fixture(); f.menu.style.display = 'block'; f.menu.style.opacity = '1'; await Promise.resolve();
  f.media.matches = false; f.media.addEventListener.mock.calls[0][1]();
  expect(f.lenis.start).toHaveBeenCalledOnce();
  await f.open(); expect(f.lenis.stop).toHaveBeenCalledTimes(2);
  f.dispose();
});
