// Opt-in, document-local HTML cache. Never parse or execute prefetched pages.
export function installPreload(swup, { doc = document, win = window, fetchHTML = fetch, now = Date.now, ttl = 300000, limit = 8, delay = 1200 } = {}) {
  const stamps = new Map(), pending = new Map(), abort = new AbortController();
  let timer, busy = false, stopped = false;
  const connection = win.navigator.connection;
  const restricted = () => connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');
  function prune() {
    for (const [url, time] of stamps) if (now() - time >= ttl) { swup.cache.delete(url); stamps.delete(url); }
    while (stamps.size > limit) { const url = stamps.keys().next().value; swup.cache.delete(url); stamps.delete(url); }
  }
  const onSet = (_visit, { page }) => { stamps.delete(page.url); stamps.set(page.url, now()); prune(); };
  swup.hooks.on('cache:set', onSet);
  for (const [url] of swup.cache.all || []) stamps.set(url, now());
  prune();
  function candidate(anchor) {
    if (!anchor || anchor.closest('[data-no-swup]') || anchor.hasAttribute('download') || anchor.hasAttribute('target')) return;
    const url = new URL(anchor.getAttribute('href'), win.location.href);
    if (url.origin !== win.location.origin || url.search || url.hash || url.pathname === win.location.pathname || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    return url.pathname;
  }
  async function preload(url) {
    prune();
    if (stopped || restricted() || swup.cache.has(url)) return;
    if (pending.has(url)) return pending.get(url);
    const controller = new AbortController();
    const timeout = win.setTimeout(() => controller.abort(), 4000);
    const task = (async () => {
      try {
        const response = await fetchHTML(url, { headers: { 'X-Requested-With': 'swup', Accept: 'text/html' }, credentials: 'same-origin', signal: controller.signal, priority: 'low' });
        if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return;
        const final = new URL(response.url || url, win.location.href);
        if (final.origin !== win.location.origin || final.pathname !== url || final.search) return;
        const html = await response.text();
        if (!stopped && html && html.length < 1000000) swup.cache.set(url, { url, html });
      } catch { /* An optional preload failure must never interrupt a real visit. */ }
      finally { win.clearTimeout(timeout); pending.delete(url); }
    })();
    pending.set(url, task);
    return task;
  }
  function schedule() {
    win.clearTimeout(timer);
    if (stopped || restricted()) return;
    timer = win.setTimeout(async () => {
      if (busy || doc.hidden || stopped) return;
      const urls = [...new Set([...doc.querySelectorAll('.navbar-logo-center .nav-link-sd[href], .navbar-logo-center .link-menu-overlay[href]')].map(candidate).filter(Boolean))].slice(0, 3);
      for (const url of urls) { if (busy || stopped || doc.hidden) break; await preload(url); }
    }, delay);
  }
  const start = () => { busy = true; win.clearTimeout(timer); };
  const finish = () => { busy = false; schedule(); };
  const beforeLoad = async visit => { prune(); if (visit.cache.read && pending.has(visit.to.url)) await pending.get(visit.to.url); };
  swup.hooks.on('visit:start', start);
  swup.hooks.before('page:load', beforeLoad);
  for (const name of ['page:view', 'visit:fail', 'visit:abort']) swup.hooks.on(name, finish);
  const intent = event => { if (!busy && !doc.hidden) { const url = candidate(event.target.closest?.('.navbar-logo-center a[href]')); if (url) void preload(url); } };
  doc.addEventListener('pointerover', intent, { passive: true, signal: abort.signal });
  doc.addEventListener('focusin', intent, { signal: abort.signal });
  schedule();
  return () => {
    stopped = true; win.clearTimeout(timer); abort.abort();
    swup.hooks.off('cache:set', onSet); swup.hooks.off('visit:start', start); swup.hooks.off('page:load', beforeLoad);
    for (const name of ['page:view', 'visit:fail', 'visit:abort']) swup.hooks.off(name, finish);
  };
}
