import { readFileSync } from 'node:fs';
import { afterEach, expect, it, vi } from 'vitest';
const source = readFileSync('public/sd-loading.js', 'utf8');
afterEach(() => { window.dispatchEvent(new Event('env:sd-ready')); vi.useRealTimers(); sessionStorage.clear(); document.documentElement.classList.remove('env-sd-first-load'); document.head.querySelectorAll('style').forEach(e => e.remove()); document.body.innerHTML = ''; });
it('shows once per tab session, finishes when prepared, and opts into preload on subsequent loads', () => {
  vi.useFakeTimers(); new Function(source)();
  expect(document.documentElement.classList.contains('env-sd-first-load')).toBe(true);
  window.dispatchEvent(new Event('env:sd-ready'));
  expect(document.documentElement.classList.contains('env-sd-first-load')).toBe(false);
  expect(document.querySelector('[role=status]')).toBeNull();
  new Function(source)(); expect(document.documentElement.classList.contains('env-sd-first-load')).toBe(false);
  expect(window.ENVSDPreload).toBe(true);
});
it('fails open after six seconds without marking the first load as completed', () => {
  vi.useFakeTimers(); new Function(source)(); vi.advanceTimersByTime(6000);
  expect(document.documentElement.classList.contains('env-sd-first-load')).toBe(false);
  expect(sessionStorage.getItem('env-sd-first-load-v1')).toBeNull();
});
