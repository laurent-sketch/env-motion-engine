import { extract } from '../shared/webflow-data.js';
const cache = new Map();

// Only read literal data from official immutable assets; never execute fetched JS.
function load(url, request, timeout) {
  if (cache.has(url.href)) return cache.get(url.href);
  const task = (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await request(url.href, { credentials: 'omit', signal: controller.signal });
      if (!response.ok || (response.url && response.url !== url.href)) throw Error('Webflow data response changed');
      const source = await response.text();
      if (source.length > 3000000) throw Error('Webflow data source too large');
      // Optional widget chunks/bootstrap wiring do not contain IX3 registrations.
      if (!/\.register\s*\(/.test(source)) return null;
      const config = extract(source);
      const ids = new Set(config.timelines.map(item => item.id));
      if (config.interactions.some(item => !Array.isArray(item.timelineIds) || item.timelineIds.some(id => !ids.has(id)))) throw Error('Incomplete Webflow timelines');
      return config;
    } finally { clearTimeout(timer); }
  })();
  cache.set(url.href, task);
  task.catch(() => { if (cache.get(url.href) === task) cache.delete(url.href); });
  while (cache.size > 16) cache.delete(cache.keys().next().value);
  return task;
}
export async function runtimeConfig(scripts, site, { request = fetch, timeout = 5000 } = {}) {
  const candidates = (Array.isArray(scripts) ? scripts : [scripts]).map(value => new URL(value));
  for (const url of candidates) {
    if (url.origin !== 'https://cdn.prod.website-files.com' || !url.pathname.startsWith(`/${site}/js/webflow.`) || !/\.js$/.test(url.pathname) || url.search || url.hash || url.username || url.password) throw Error('Untrusted Webflow data URL');
  }
  for (const url of candidates) {
    const config = await load(url, request, timeout);
    if (config) return config;
  }
  throw Error('Expected IX2 + IX3 data not found');
}
