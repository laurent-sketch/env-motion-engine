import { afterEach, expect, it, vi } from 'vitest';
import { installMobileMenu } from '../src/sd/mobile-menu.js';
afterEach(() => { document.body.replaceChildren(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function fixture(reduced = false) {
  document.body.innerHTML = '<nav><div class="burger-menu-wrap"><i class="line-burger top"></i><i class="line-burger bottom"></i></div><div class="menu-modal" style="display:none;opacity:0"><img class="logo-menu-mobile"><a class="link-menu-overlay" href="#work">Work</a><a class="link-menu-overlay" href="#about">About</a></div></nav>';
  const mobile = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', (q: string) => q.includes('991') ? mobile : { matches: reduced });
  const effects: any[] = [];
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, writable: true, value: vi.fn(() => { const effect = { finished: new Promise(() => {}), cancel: vi.fn() }; effects.push(effect); return effect; }) });
  const nav = document.querySelector('nav')!, burger = nav.querySelector('.burger-menu-wrap') as HTMLElement, modal = nav.querySelector('.menu-modal') as HTMLElement;
  const native = vi.fn(() => { const opening = modal.style.opacity === '0'; modal.style.display = 'block'; modal.style.opacity = opening ? '1' : '0'; });
  burger.addEventListener('click', native);
  Object.defineProperty(burger.querySelector('.top'), 'offsetTop', { value: 10 });
  Object.defineProperty(burger.querySelector('.bottom'), 'offsetTop', { value: 19 });
  const dispose = installMobileMenu(nav);
  return { nav, burger, modal, native, mobile, effects, dispose };
}
it('keeps one native modal click and adds an accessible open state with ordered link reveals', async () => {
  const f = fixture();
  const event = new MouseEvent('click', { bubbles: true, cancelable: true });
  f.burger.dispatchEvent(event); await Promise.resolve();
  expect(event.defaultPrevented).toBe(false);
  expect(f.native).toHaveBeenCalledTimes(1);
  expect(f.nav.classList.contains('is-env-menu-open')).toBe(true);
  expect(f.burger.getAttribute('aria-expanded')).toBe('true');
  expect(f.modal.inert).toBe(false);
  expect(f.burger.style.getPropertyValue('--env-burger-shift')).toBe('4.5px');
  const calls = vi.mocked(Element.prototype.animate).mock.calls;
  expect(calls).toHaveLength(3);
  expect(calls.map(call => call[1].delay)).toEqual([70, 135, 200]);
  f.burger.click(); await Promise.resolve();
  expect(f.native).toHaveBeenCalledTimes(2);
  expect(f.nav.classList.contains('is-env-menu-open')).toBe(false);
  expect(f.burger.getAttribute('aria-expanded')).toBe('false');
  expect(f.modal.inert).toBe(true);
  expect(f.effects.every(effect => effect.cancel.mock.calls.length === 1)).toBe(true);
  f.dispose();
});
it('closes through Webflow on a link or Escape and delegates keyboard activation', async () => {
  const f = fixture();
  f.burger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })); await Promise.resolve();
  expect(f.native).toHaveBeenCalledTimes(1);
  f.modal.querySelector('a')!.click(); await Promise.resolve();
  expect(f.native).toHaveBeenCalledTimes(2);
  expect(f.burger.getAttribute('aria-expanded')).toBe('false');
  f.burger.click(); await Promise.resolve();
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); await Promise.resolve();
  expect(f.native).toHaveBeenCalledTimes(4);
  expect(f.burger.getAttribute('aria-expanded')).toBe('false');
  f.dispose();
});
it('follows an independently animated native modal and restores only adapter-owned state', async () => {
  const f = fixture();
  f.modal.style.display = 'block'; f.modal.style.opacity = '.5'; await Promise.resolve();
  expect(f.nav.classList.contains('is-env-menu-open')).toBe(true);
  f.modal.style.opacity = '.2'; await Promise.resolve();
  expect(f.nav.classList.contains('is-env-menu-open')).toBe(false);
  f.dispose();
  expect(f.nav.className).toBe('');
  expect(f.burger.hasAttribute('role')).toBe(false);
  expect(f.modal.style.opacity).toBe('0.2');
  f.burger.click(); expect(f.native).toHaveBeenCalledTimes(1);
});
it('keeps native behavior without stagger for reduced motion and avoids desktop state changes', () => {
  const f = fixture(true);
  f.burger.click();
  expect(Element.prototype.animate).not.toHaveBeenCalled();
  expect(f.nav.classList.contains('is-env-menu-open')).toBe(true);
  f.mobile.matches = false;
  f.mobile.addEventListener.mock.calls[0][1]();
  expect(f.nav.classList.contains('is-env-menu-open')).toBe(false);
  f.dispose();
});

it('keeps the mobile menu open for an intercepted mask visit, but closes for same-page anchors', async () => {
  const f = fixture();
  vi.stubGlobal('ENVSD', { status: 'ready' });
  vi.stubGlobal('ENVSDTransition', 'mask');
  const link = f.modal.querySelector('a')!;
  link.href = '/press';
  f.burger.click(); await Promise.resolve();
  document.addEventListener('click', event => event.preventDefault(), { once: true });
  link.click(); await Promise.resolve();
  expect(f.native).toHaveBeenCalledTimes(1);
  expect(f.burger.getAttribute('aria-expanded')).toBe('true');
  // Simulate content replacement: the navigation adapter closes behind its copy.
  f.burger.click(); await Promise.resolve();
  expect(f.burger.getAttribute('aria-expanded')).toBe('false');
  link.href = '#work'; f.burger.click(); link.click(); await Promise.resolve();
  expect(f.burger.getAttribute('aria-expanded')).toBe('false');
  f.dispose();
});
