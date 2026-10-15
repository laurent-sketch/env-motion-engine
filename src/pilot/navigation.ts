import type { NavigationAdapter } from '../index';

export interface Snapshot {
  path: string; pageId: string; siteId: string; bootstrap: string; configUrl: string;
  stylesheets: string[]; styles: string; headStyles: string[]; spline: boolean;
  ix2: Record<string, unknown>; interactions: Record<string, unknown>[]; timelines: Record<string, unknown>[];
}
interface IX2 { init(data: unknown): void; destroy(): void }
interface IX3Instance { setFeatures(features: { timelineGroups: boolean }): void; register(interactions: unknown[], timelines: unknown[]): void }
interface IX3 { ready(): Promise<void>; destroy(): void; getInstance(): IX3Instance | undefined }
interface SplineInstance { destroy(): void }
interface Spline {
  getInstance(element: Element): SplineInstance | undefined;
  createInstance(element: Element, url: string): Promise<SplineInstance>;
  destroyInstance(element: Element): void;
}
interface Navbar { ready(): void; destroy(): void }
export interface WebflowRuntime { require(name: string): unknown }
const snapshots = {
  '/': () => import('./snapshots/home.json').then(module => module.default as unknown as Snapshot),
  '/about': () => import('./snapshots/about.json').then(module => module.default as unknown as Snapshot),
};
export type CertifiedPath = keyof typeof snapshots;
export const certifiedPaths: CertifiedPath[] = ['/', '/about'];

export async function snapshotFor(path: string): Promise<Snapshot> {
  const load = snapshots[path as CertifiedPath];
  if (!load) throw Error('[ENV] Page outside the certified pilot routes');
  return load();
}
export function validatePage(document: Document, snapshot: Snapshot, live = false) {
  if (document.documentElement.getAttribute('data-wf-site') !== snapshot.siteId ||
      document.documentElement.getAttribute('data-wf-page') !== snapshot.pageId ||
      document.querySelectorAll('[data-env-page]').length !== 1) throw Error('[ENV] Page identity/container changed');
  const script = [...document.scripts].find(element => /\/js\/webflow\.[^/]+\.js$/.test(element.src));
  if (script?.src !== snapshot.bootstrap) throw Error('[ENV] Webflow export changed; refresh the pilot snapshots');
  const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map(el => el.getAttribute('href')).sort();
  const styles = [...document.querySelectorAll('head style')].map(el => el.textContent).join('\n');
  const sheetsMatch = live
    ? snapshot.stylesheets.every(href => stylesheets.includes(href)) && stylesheets.every(href => snapshot.stylesheets.includes(href!) || /^https?:\/\/fonts\.googleapis\.com\//.test(href ?? ''))
    : JSON.stringify(stylesheets) === JSON.stringify(snapshot.stylesheets);
  const actualStyles=[...document.querySelectorAll('head style')].map(el=>el.textContent ?? '');
  const runtimeOutline='.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}';
  const inlineMatch=live ? snapshot.headStyles.every(text=>actualStyles.includes(text)) && actualStyles.every(text=>snapshot.headStyles.includes(text) || text===runtimeOutline || !text.trim()) : styles===snapshot.styles;
  if (!sheetsMatch || !inlineMatch) throw Error('[ENV] Page styles changed (stylesheets=' + sheetsMatch + ', expected=' + snapshot.headStyles.map(t=>t.length).join(',') + ', actual=' + [...document.querySelectorAll('head style')].map(el=>el.textContent?.length).join(',') + ')');
  for (const element of document.scripts) {
    const text = element.textContent ?? '';
    if (/new\s+Swiper\s*\(/.test(text) || /querySelectorAll\(['"]\.faq-item['"]\)/.test(text)) throw Error('[ENV] Legacy widget script remains');
    if (/CRISP_WEBSITE_ID|client\.crisp\.chat/.test(text + element.src)) throw Error('[ENV] Page-specific chat is not certified for replacement');
    if (element.src) {
      const src = new URL(element.getAttribute('src')!, location.href);
      const localCheck = ['127.0.0.1', 'localhost'].includes(location.hostname) && src.origin === location.origin && /^\/(?:@vite\/|\.pilot-check\/|tests\/pilot-browser\.ts)/.test(src.pathname);
      const known = src.href === snapshot.bootstrap || /^https:\/\/ajax\.googleapis\.com\/ajax\/libs\/webfont\//.test(src.href) || /^https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-/.test(src.href) || /^https:\/\/cdn\.prod\.website-files\.com\/gsap\//.test(src.href) || /^https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@12\//.test(src.href);
      if (!known && !localCheck) throw Error('[ENV] Additional script needs a lifecycle adapter');
    } else if (text.trim() && element.type !== 'application/ld+json' && !/WebFont\.load\(|w-mod-|createPilotEngine|createEngine/.test(text)) {
      throw Error('[ENV] Additional inline script needs a lifecycle adapter');
    }

  }
  if (document.querySelector('.w-form, .w-tabs, .w-slider, .w-background-video')) throw Error('[ENV] Unsupported page component; use native navigation');
}


export function wrapPage(document: Document) {
  const existing = document.querySelector<HTMLElement>('[data-env-shell]');
  if (existing) return existing;
  const shell = document.createElement('div');
  shell.setAttribute('data-env-shell', '');
  const nodes = [...document.body.childNodes].filter(node =>
    !(node.nodeType === 1 && (node as Element).matches('script, style, link, .w-webflow-badge')));
  document.body.insertBefore(shell, document.body.firstChild);
  nodes.forEach(node => shell.appendChild(node));
  return shell;
}

export function syncMetadata(incoming: Document, current: Document = document) {
  for (const name of ['data-wf-page', 'data-wf-site', 'lang', 'dir']) {
    const value = incoming.documentElement.getAttribute(name);
    if (value === null) current.documentElement.removeAttribute(name);
    else current.documentElement.setAttribute(name, value);
  }
  current.body.className = incoming.body.className;
  current.head.querySelectorAll('style[data-env-head]').forEach(el => el.remove());
  incoming.head.querySelectorAll('style').forEach(el => {
    const clone=el.cloneNode(true) as HTMLStyleElement;clone.setAttribute('data-env-head','');current.head.append(clone);
  });
  const selector = 'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], meta[property^="twitter:"], link[rel="canonical"], link[rel="alternate"][hreflang]';
  current.head.querySelectorAll(selector).forEach(element => element.remove());
  incoming.head.querySelectorAll(selector).forEach(element => current.head.append(element.cloneNode(true)));
}

/** Experimental bridge pinned to the audited Webflow exports; no downloaded code execution. */
export async function createWebflowNavigation(runtime: WebflowRuntime, initialPath: string): Promise<NavigationAdapter> {
  const initial = await snapshotFor(initialPath);
  validatePage(document, initial, true);
  const ix2 = runtime.require('ix2') as IX2 | undefined;
  const ix3 = runtime.require('ix3') as IX3 | undefined;
  const navbar = runtime.require('navbar') as Navbar | undefined;
  const spline = runtime.require('spline') as Spline | undefined;
  if (!ix2?.init || !ix2.destroy || !ix3?.ready || !ix3.destroy || !ix3.getInstance || !navbar?.ready || !navbar.destroy) throw Error('[ENV] Unsupported Webflow runtime API');
  document.head.querySelectorAll('style').forEach(el => {
    if(initial.headStyles.includes(el.textContent ?? '')) el.setAttribute('data-env-head','');
  });
  wrapPage(document);
  const initialSheets = JSON.stringify(initial.stylesheets);
  let pending: Snapshot | undefined;
  let sceneCleanups: { retire(): void; release(): void }[] = [];
  const watchScene = (element: Element) => {
    let retired = false;
    const onLoad = () => {
      element.removeEventListener('w-spline-load', onLoad);
      if (retired) spline?.destroyInstance(element);
    };
    element.addEventListener('w-spline-load', onLoad);
    return {release:()=>element.removeEventListener('w-spline-load', onLoad),retire:() => {
      retired = true;
      if (spline?.getInstance(element)) {
        element.removeEventListener('w-spline-load', onLoad);
        spline.destroyInstance(element);
      }
      // A pending native Spline load is disposed when it eventually resolves.
    }};
  };
  document.querySelectorAll('[data-animation-type="spline"]').forEach(element => sceneCleanups.push(watchScene(element)));
  const disposeScenes = () => { sceneCleanups.splice(0).forEach(cleanup => cleanup.retire()); };
  return {
    async prepare(incoming, url) {
      const next = await snapshotFor(new URL(url, location.href).pathname);
      validatePage(incoming, next);
      if (JSON.stringify(next.stylesheets) !== initialSheets) throw Error('[ENV] Styles differ from the loaded page');
      if (next.spline && (!spline?.createInstance || !spline.destroyInstance)) throw Error('[ENV] Spline runtime unavailable; loading this page natively');
      wrapPage(incoming);
      pending = next;
    },
    leave() {
      ix2.destroy(); ix3.destroy(); navbar.destroy(); disposeScenes();
    },
    async enter(incoming) {
      if (!pending) throw Error('[ENV] No prepared page');
      syncMetadata(incoming);
      navbar.ready();
      ix2.init(pending.ix2);
      await ix3.ready();
      const instance = ix3.getInstance();
      if (!instance) throw Error('[ENV] IX3 did not restart');
      instance.setFeatures({ timelineGroups: false });
      instance.register(pending.interactions, pending.timelines);
      document.documentElement.classList.add('w-mod-ix3');
      document.querySelectorAll('[data-animation-type="spline"]').forEach(element => {
        const url = element.getAttribute('data-spline-url');
        if (!url || !spline) return;
        sceneCleanups.push(watchScene(element));
        // Native runtime dispatches w-spline-load; do not block the transition on the scene.
        void spline.createInstance(element, url).catch(error => console.warn('[ENV] Spline scene failed', error));
      });
      pending = undefined;
    },
    // Removing ENV does not tear down the native animations of the current page.
    destroy() {
      sceneCleanups.splice(0).forEach(cleanup=>cleanup.release());
      const shell=document.querySelector('[data-env-shell]');
      if(shell) shell.replaceWith(...shell.childNodes);
    },
  };
}
