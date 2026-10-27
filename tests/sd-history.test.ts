import { expect, it, vi } from 'vitest';
import { resumePageVisit, syncDestinationScroll } from '../src/sd/alternative-history.js';
it.each(['backwards', 'forwards'])('restores scrolling and reveals on %s history visits', async direction => {
  const root = document.createElement('div'); root.setAttribute('data-env-alt-reveal-wait', '');
  const transition = { cleanup: vi.fn() }, lenis = { start: vi.fn() }, mount = vi.fn();
  await resumePageVisit({ visit: { animation: { animate: false }, history: { direction } }, useMask: true, transition, root, lenis, mount });
  expect(transition.cleanup).toHaveBeenCalledOnce(); expect(lenis.start).toHaveBeenCalledOnce();
  expect(root.hasAttribute('data-env-alt-reveal-wait')).toBe(false);
  expect(mount).toHaveBeenCalledWith({ deferReveals: false });
});
it('keeps normal mask reveals deferred until animation:in', async () => {
  const transition = { cleanup: vi.fn() }, lenis = { start: vi.fn() }, mount = vi.fn();
  await resumePageVisit({ visit: { animation: { animate: true } }, useMask: true, transition, root: document.createElement('div'), lenis, mount });
  expect(transition.cleanup).not.toHaveBeenCalled(); expect(lenis.start).not.toHaveBeenCalled();
  expect(mount).toHaveBeenCalledWith({ deferReveals: true });
});

it('resets native and smooth scrolling before incoming page initialization', () => {
  const win = { scrollY: 5953, scrollX: 0, scrollTo: vi.fn() };
  const lenis = { resize: vi.fn(), scrollTo: vi.fn() };
  syncDestinationScroll({ history: { popstate: false }, scroll: { reset: true }, to: { hash: '' } }, win, lenis);
  expect(win.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  expect(lenis.scrollTo).toHaveBeenCalledWith(0, { immediate: true, force: true });
});
it.each([
  { history: { popstate: true }, scroll: { reset: false }, to: { hash: '' } },
  { history: { popstate: false }, scroll: { reset: true }, to: { hash: '#leadership' } }
])('preserves history and anchor scroll positions', visit => {
  const win = { scrollY: 840, scrollX: 0, scrollTo: vi.fn() };
  const lenis = { resize: vi.fn(), scrollTo: vi.fn() };
  syncDestinationScroll(visit, win, lenis);
  expect(win.scrollTo).not.toHaveBeenCalled();
  expect(lenis.scrollTo).toHaveBeenCalledWith(840, { immediate: true, force: true });
});
