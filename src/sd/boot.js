// Keep the initial reveal gate until fallback animations have prepared their first frame.
export async function runFallback(load, initializeMenu, { doc = document, events = window, timeout = 4000 } = {}) {
  let prepared = !doc.querySelector('[data-env-reveal],[data-env-text]');
  let resolveReady, timer;
  const ready = prepared ? Promise.resolve() : new Promise(resolve => { resolveReady = resolve; timer = setTimeout(resolve, timeout); });
  const onReady = () => { prepared = true; resolveReady?.(); };
  events.addEventListener('env:animations-ready', onReady, { once: true });
  try {
    await load();
    initializeMenu();
    await ready;
  } finally {
    clearTimeout(timer);
    events.removeEventListener('env:animations-ready', onReady);
    if (!prepared) doc.documentElement.setAttribute('data-env-sd-reveal-expired', '');
    doc.documentElement.classList.remove('env-sd-boot');
  }
}
