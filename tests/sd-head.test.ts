import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/sd-head.js', 'utf8');
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); document.documentElement.classList.remove('env-sd-boot'); document.head.querySelectorAll('style').forEach(e => e.remove()); history.replaceState(null, '', '/'); });
it('prepares initial paint only on pilot routes and fails open', () => {
  vi.useFakeTimers(); vi.stubGlobal('matchMedia', () => ({ matches: false }));
  history.replaceState(null, '', '/home-sd'); new Function(source)();
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(true);
  vi.advanceTimersByTime(5000);
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
});
it('leaves V2 and reduced-motion users visible', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  history.replaceState(null, '', '/home-sd-v2'); new Function(source)();
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  history.replaceState(null, '', '/work-v2'); new Function(source)();
  expect(document.documentElement.classList.contains('env-sd-boot')).toBe(false);
});
