import { afterEach, expect, it, vi } from 'vitest';
import { installPreload } from '../src/sd/preload.js';
function fixture() {
  const handlers = new Map<string, Function[]>(), pages = new Map();
  const hooks = { on: (n, f) => handlers.set(n, [...(handlers.get(n) || []), f]), before: (n, f) => hooks.on(n, f), off: vi.fn() };
  const emit = async (n, ...args) => { for (const f of handlers.get(n) || []) await f(...args); };
  const swup = { hooks, cache: { has: u => pages.has(u), delete: u => pages.delete(u), set: (u, p) => { pages.set(u, p); void emit('cache:set', null, { page: p }); } } };
  return { swup, pages, emit };
}
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); document.body.innerHTML = ''; });
it('preloads three unique menu HTML pages sequentially without parsing media and reuses the cache', async () => {
  vi.useFakeTimers(); document.body.innerHTML = '<nav class="navbar-logo-center"><a class="nav-link-sd" href="https://other.example/">External</a><a class="nav-link-sd" href="/search?q=x">Search</a><a class="nav-link-sd" href="/work">Work</a><a class="nav-link-sd" href="/about">About</a><a class="nav-link-sd" href="/press">Press</a><a class="link-menu-overlay" href="/press">Press</a><a class="nav-link-sd" href="/four">Four</a></nav>';
  const { swup, pages } = fixture();
  const fetchHTML = vi.fn(async url => ({ ok: true, url: location.origin + url, headers: new Headers({ 'content-type': 'text/html' }), text: async () => '<html><img src="heavy.jpg"><script>throw Error()</script></html>' }));
  const stop = installPreload(swup, { fetchHTML });
  expect(fetchHTML).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(1200);
  expect(fetchHTML.mock.calls.map(c => c[0])).toEqual(['/work', '/about', '/press']);
  expect(pages.size).toBe(3);
  expect(document.querySelector('img')).toBeNull();
  document.querySelector('a')!.dispatchEvent(new Event('pointerover', { bubbles: true }));
  expect(fetchHTML).toHaveBeenCalledTimes(3); stop();
});
it('does not prefetch on data saver', async () => {
  vi.useFakeTimers(); document.body.innerHTML = '<nav class="navbar-logo-center"><a class="nav-link-sd" href="/press">Press</a></nav>';
  const { swup } = fixture(); const fetchHTML = vi.fn();
  const stop = installPreload(swup, { fetchHTML, win: { ...window, navigator: { connection: { saveData: true } }, location, setTimeout, clearTimeout } });
  await vi.advanceTimersByTimeAsync(5000); expect(fetchHTML).not.toHaveBeenCalled(); stop();
});
it('reuses a pending preload when the user clicks and expires cache entries', async () => {
  vi.useFakeTimers(); document.body.innerHTML = '<nav class="navbar-logo-center"><a class="nav-link-sd" href="/press">Press</a></nav>';
  const { swup, pages, emit } = fixture(); let done;
  const fetchHTML = vi.fn(() => new Promise(resolve => { done = resolve; }));
  const stop = installPreload(swup, { fetchHTML, ttl: 100 });
  document.querySelector('a')!.dispatchEvent(new Event('pointerover', { bubbles: true }));
  const loading = emit('page:load', { to: { url: '/press' }, cache: { read: true } });
  done({ ok: true, url: location.origin + '/press', headers: new Headers({ 'content-type': 'text/html' }), text: async () => '<html>Press</html>' });
  await loading; expect(pages.has('/press')).toBe(true); expect(fetchHTML).toHaveBeenCalledTimes(1);
  await vi.advanceTimersByTimeAsync(101); await emit('page:load', { to: { url: '/press' }, cache: { read: true } });
  expect(pages.has('/press')).toBe(false); stop();
});
