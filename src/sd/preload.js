// Opt-in, document-local HTML cache. Never parse or execute prefetched pages.
export function installPreload(swup, { doc = document, win = window, fetchHTML = fetch, now = Date.now, ttl = 300000, limit = 8, delay = 1200, concurrency = 1, pendingWait = 180, warmPage } = {}) {
  const stamps = new Map(), pending = new Map(), controllers = new Map(), abort = new AbortController();
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
    if (!anchor || anchor.closest('[data-no-swup]') || anchor.matches('[aria-current="page"],.w--current') || anchor.hasAttribute('download') || anchor.hasAttribute('target')) return;
    const url = new URL(anchor.getAttribute('href'), win.location.href);
    if (url.origin !== win.location.origin || url.search || url.hash || url.pathname === win.location.pathname || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    return url.pathname;
  }
  async function preload(url) {
    prune();
    if (stopped || restricted() || swup.cache.has(url)) return;
    if (pending.has(url)) return pending.get(url);
    const controller = new AbortController();
    controllers.set(url, controller);
    const timeout = win.setTimeout(() => controller.abort(), 4000);
    const task = (async () => {
      try {
        const response = await fetchHTML(url, { headers: { 'X-Requested-With': 'swup', Accept: 'text/html' }, credentials: 'same-origin', signal: controller.signal, priority: 'low' });
        if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return;
        const final = new URL(response.url || url, win.location.href);
        if (final.origin !== win.location.origin || final.pathname !== url || final.search) return;
        const html = await response.text();
        if (!stopped && !controller.signal.aborted && html && html.length < 1000000) {
          swup.cache.set(url, { url, html });
          if (warmPage) void Promise.resolve().then(() => warmPage(html)).catch(() => {});
        }
      } catch { /* An optional preload failure must never interrupt a real visit. */ }
      finally { win.clearTimeout(timeout); if (controllers.get(url) === controller) { controllers.delete(url); pending.delete(url); } }
    })();
    pending.set(url, task);
    return task;
  }
  function schedule() {
    win.clearTimeout(timer);
    if (stopped || restricted()) return;
    timer = win.setTimeout(async () => {
      if (busy || doc.hidden || stopped) return;
      const urls = [...new Set([...doc.querySelectorAll('.navbar-logo-center a[href]')].map(candidate).filter(Boolean))].slice(0, 3);
      let cursor = 0;
      const worker = async () => {
        while (!busy && !stopped && !doc.hidden && cursor < urls.length) await preload(urls[cursor++]);
      };
      await Promise.all(Array.from({ length: Math.min(Math.max(1, concurrency), 2, urls.length) }, worker));
    }, delay);
  }
  const start = () => { busy = true; win.clearTimeout(timer); };
  const finish = () => { busy = false; schedule(); };
  const beforeLoad = async visit => {
    prune();
    const url = visit.to.url, task = pending.get(url);
    if (!visit.cache.read || !task) return;
    let deadline;
    await Promise.race([task, new Promise(resolve => { deadline = win.setTimeout(resolve, pendingWait); })]);
    win.clearTimeout(deadline);
    // Do not let a low-priority speculative fetch hold a real click for four seconds.
    if (!swup.cache.has(url) && pending.get(url) === task) { controllers.get(url)?.abort(); controllers.delete(url); pending.delete(url); }
  };
  swup.hooks.on('visit:start', start);
  swup.hooks.before('page:load', beforeLoad);
  for (const name of ['page:view', 'visit:fail', 'visit:abort']) swup.hooks.on(name, finish);
  const intent = event => { if (!busy && !doc.hidden) { const url = candidate(event.target.closest?.('.navbar-logo-center a[href]')); if (url) void preload(url); } };
  doc.addEventListener('pointerover', intent, { passive: true, signal: abort.signal });
  doc.addEventListener('pointerdown', intent, { passive: true, signal: abort.signal });
  doc.addEventListener('focusin', intent, { signal: abort.signal });
  doc.addEventListener('visibilitychange', () => { if (!doc.hidden && !busy) schedule(); }, { signal: abort.signal });
  schedule();
  return () => {
    stopped = true; win.clearTimeout(timer); abort.abort();
    controllers.forEach(controller => controller.abort()); controllers.clear(); pending.clear();
    swup.hooks.off('cache:set', onSet); swup.hooks.off('visit:start', start); swup.hooks.off('page:load', beforeLoad);
    for (const name of ['page:view', 'visit:fail', 'visit:abort']) swup.hooks.off(name, finish);
  };
}
