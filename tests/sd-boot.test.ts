import { afterEach, expect, it, vi } from 'vitest';
import { runFallback } from '../src/sd/boot.js';
afterEach(() => { vi.useRealTimers(); document.body.replaceChildren(); document.documentElement.classList.remove('env-sd-boot'); document.documentElement.removeAttribute('data-env-sd-reveal-expired'); });
function prepare() { document.body.innerHTML = '<h1 data-env-reveal="fade-up">Title</h1>'; document.documentElement.classList.add('env-sd-boot'); }
it('keeps targets hidden until fallback animation readiness, even after the script loads', async () => {
  prepare();
  const pending = runFallback(() => Promise.resolve(), () => {});
  await Promise.resolve();
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(true);
  window.dispatchEvent(new Event('env:animations-ready'));
  await pending;
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
  expect(document.documentElement.hasAttribute('data-env-sd-reveal-expired')).toBe(false);
});
it('fails open and prevents a late entrance when readiness never arrives', async () => {
  vi.useFakeTimers(); prepare();
  const pending = runFallback(() => Promise.resolve(), () => {}, { timeout: 100 });
  await vi.advanceTimersByTimeAsync(100);
  await pending;
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
  expect(document.documentElement.hasAttribute('data-env-sd-reveal-expired')).toBe(true);
});
it('releases targets when the fallback loader fails', async () => {
  prepare();
  await expect(runFallback(() => Promise.reject(Error('network')), () => {})).rejects.toThrow('network');
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
  expect(document.documentElement.hasAttribute('data-env-sd-reveal-expired')).toBe(true);
});
