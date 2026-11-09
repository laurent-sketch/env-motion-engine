import { afterEach, expect, it, vi } from 'vitest';
import { installMobileContact } from '../src/sd/mobile-contact.js';
afterEach(() => { document.body.replaceChildren(); vi.unstubAllGlobals(); });
function fixture() {
  document.body.innerHTML = '<nav><div class="contact-modal-bloc" style="display:none"><div class="close-bloc"><img class="close-btn"><span>Back</span></div></div></nav>';
  const media = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', query => { expect(query).toBe('(max-width: 767px)'); return media; });
  const nav = document.querySelector('nav')!, modal = nav.querySelector('.contact-modal-bloc') as HTMLElement;
  const close = nav.querySelector('.close-bloc') as HTMLElement, icon = close.querySelector('img')!;
  const native = vi.fn();
  const controller = new AbortController();
  document.addEventListener('click', event => {
    if ((event.target as Element).closest('.close-btn')) { event.preventDefault(); event.stopPropagation(); native(); }
  }, { capture: true, signal: controller.signal });
  const dispose = installMobileContact(nav);
  return { nav, modal, close, icon, media, native, dispose() { dispose(); controller.abort(); } };
}
it('delegates the Back text and wrapper to the existing close icon exactly once', () => {
  const f = fixture();
  f.close.querySelector('span')!.click(); expect(f.native).toHaveBeenCalledTimes(1);
  f.close.click(); expect(f.native).toHaveBeenCalledTimes(2);
  f.icon.click(); expect(f.native).toHaveBeenCalledTimes(3);
  f.dispose();
});
it('keeps the white menu through closing and restores its prior theme afterward', async () => {
  const f = fixture();
  expect(f.nav.classList.contains('is-env-contact-open')).toBe(false);
  f.modal.style.display = 'flex'; f.modal.setAttribute('aria-hidden', 'false'); await Promise.resolve();
  expect(f.nav.classList.contains('is-env-contact-open')).toBe(true);
  f.modal.style.opacity = '0'; await Promise.resolve();
  expect(f.nav.classList.contains('is-env-contact-open')).toBe(true);
  f.modal.style.display = 'none'; f.modal.setAttribute('aria-hidden', 'true'); await Promise.resolve();
  expect(f.nav.classList.contains('is-env-contact-open')).toBe(false);
  f.dispose();
});
it('limits Back behavior and menu styling to 767px and restores attributes on desktop', async () => {
  const f = fixture(); f.modal.style.display = 'flex'; await Promise.resolve();
  expect(f.close.getAttribute('role')).toBe('button'); expect(f.close.tabIndex).toBe(0);
  f.close.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
  f.close.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
  expect(f.native).toHaveBeenCalledTimes(2);
  f.media.matches = false; f.media.addEventListener.mock.calls[0][1]();
  expect(f.nav.classList.contains('is-env-contact-open')).toBe(false);
  expect(f.close.hasAttribute('role')).toBe(false);
  f.close.querySelector('span')!.click(); expect(f.native).toHaveBeenCalledTimes(2);
  f.dispose(); expect(f.close.hasAttribute('aria-label')).toBe(false);
});
