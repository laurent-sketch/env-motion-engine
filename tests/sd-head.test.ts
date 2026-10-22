import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/sd-head.js', 'utf8');
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); document.documentElement.classList.remove('env-sd-boot'); document.documentElement.removeAttribute('data-env-sd-reveal-expired'); document.head.querySelectorAll('style').forEach(e => e.remove()); history.replaceState(null, '', '/'); });
it('prepares initial paint on all routes and fails open', () => {
  vi.useFakeTimers(); vi.stubGlobal('matchMedia', () => ({ matches: false }));
  history.replaceState(null, '', '/home-sd'); new Function(source)();
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(true);
  const css = document.head.querySelector('style')!.textContent;
  expect(css).not.toContain('body{visibility:hidden}');
  expect(css).toContain('[data-env-reveal]');
  vi.advanceTimersByTime(5000);
  expect(document.documentElement.hasAttribute('data-env-sd-reveal-expired')).toBe(true);
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
});
it('prepares V2 too and leaves reduced-motion users visible', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  history.replaceState(null, '', '/home-sd-v2'); new Function(source)();
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(true);
  document.documentElement.classList.remove('env-sd-boot');
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  history.replaceState(null, '', '/work-v2'); new Function(source)();
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
});
