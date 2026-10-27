import { expect, it, vi } from 'vitest';
import { resumePageVisit } from '../src/sd/alternative-history.js';
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
