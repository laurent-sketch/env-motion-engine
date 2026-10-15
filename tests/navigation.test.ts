import { afterEach, expect, it, vi } from 'vitest';
import { validatePage, snapshotFor, syncMetadata, wrapPage, createWebflowNavigation } from '../src/pilot/navigation';
import { extract, literal } from '../scripts/snapshot-pilot.mjs';
function documentFor(snapshot:Awaited<ReturnType<typeof snapshotFor>>) {
 const doc=document.implementation.createHTMLDocument('Pilot');
 doc.documentElement.setAttribute('data-wf-site',snapshot.siteId);doc.documentElement.setAttribute('data-wf-page',snapshot.pageId);
 for(const href of snapshot.stylesheets){const link=doc.createElement('link');link.rel='stylesheet';link.setAttribute('href',href);doc.head.append(link);}
 snapshot.headStyles.forEach(text=>{const style=doc.createElement('style');style.textContent=text;doc.head.append(style);});
 const script=doc.createElement('script');script.src=snapshot.bootstrap;doc.body.append(script);doc.body.insertAdjacentHTML('beforeend','<nav>Menu</nav><main data-env-page>Page</main><footer>Footer</footer>');return doc;
}
afterEach(()=>{document.head.querySelectorAll('style,link,meta').forEach(el=>el.remove());document.body.replaceChildren();document.documentElement.removeAttribute('data-wf-page');document.documentElement.removeAttribute('data-wf-site');});
it('accepts audited pages and rejects changed exports, legacy scripts and unsupported widgets',async()=>{
 const snap=await snapshotFor('/');const doc=documentFor(snap);expect(()=>validatePage(doc,snap)).not.toThrow();
 doc.querySelector('script')!.src='https://example.com/js/webflow.changed.js';expect(()=>validatePage(doc,snap)).toThrow('export changed');doc.querySelector('script')!.src=snap.bootstrap;
 const legacy=doc.createElement('script');legacy.textContent='new Swiper(container, {})';doc.body.append(legacy);expect(()=>validatePage(doc,snap)).toThrow('Legacy');legacy.remove();
 doc.body.insertAdjacentHTML('beforeend','<div class="w-form"></div>');expect(()=>validatePage(doc,snap)).toThrow('Unsupported');
 await expect(snapshotFor('/features')).rejects.toThrow('outside');
});
it('preserves body and global scripts/badge while wrapping all visual content, once',()=>{
 const body=document.body;body.innerHTML='<script src="/runtime.js"></script><nav>Nav</nav><main>Page</main><footer>Footer</footer><a class="w-webflow-badge">Badge</a>';
 const shell=wrapPage(document);expect(wrapPage(document)).toBe(shell);expect(shell.querySelectorAll('nav,main,footer')).toHaveLength(3);expect(body).toBe(document.body);expect(body.querySelector(':scope > script')).not.toBeNull();expect(body.querySelector(':scope > .w-webflow-badge')).not.toBeNull();
});
it('updates metadata and page CSS while preserving runtime-generated styles',async()=>{
 const incoming=documentFor(await snapshotFor('/about'));incoming.documentElement.lang='fr';incoming.body.className='new-body';incoming.head.insertAdjacentHTML('beforeend','<meta name="description" content="new"><link rel="canonical" href="https://example.com/about">');
 document.head.innerHTML='<meta name="description" content="old"><style data-env-head>.old{}</style><style data-runtime>.runtime{}</style>';
 syncMetadata(incoming);expect(document.documentElement.lang).toBe('fr');expect(document.body.className).toBe('new-body');expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('new');expect(document.head.textContent).not.toContain('.old');expect(document.querySelector('style[data-runtime]')).not.toBeNull();
});
it('waits for and disposes a Spline scene that finishes loading after its page leaves',async()=>{
 const snap=await snapshotFor('/');const initial=documentFor(snap);document.head.innerHTML=initial.head.innerHTML;document.body.innerHTML=initial.body.innerHTML;document.documentElement.setAttribute('data-wf-site',snap.siteId);document.documentElement.setAttribute('data-wf-page',snap.pageId);
 const scene=document.createElement('div');scene.setAttribute('data-animation-type','spline');document.querySelector('main')!.append(scene);
 let loaded=false;const spline={getInstance:vi.fn(()=>loaded?{}:undefined),destroyInstance:vi.fn(),createInstance:vi.fn()};const ix2={init:vi.fn(),destroy:vi.fn()},instance={register:vi.fn(),setFeatures:vi.fn()},ix3={ready:vi.fn(async()=>{}),destroy:vi.fn(),getInstance:()=>instance},navbar={ready:vi.fn(),destroy:vi.fn()};
 const modules:Record<string,unknown>={ix2,ix3,navbar,spline};const adapter=await createWebflowNavigation({require:name=>modules[name]},'/');
 await adapter.prepare(documentFor(await snapshotFor('/about')),'/about');await adapter.leave();expect(spline.destroyInstance).not.toHaveBeenCalled();loaded=true;scene.dispatchEvent(new Event('w-spline-load'));expect(spline.destroyInstance).toHaveBeenCalledExactlyOnceWith(scene);
 await adapter.enter(documentFor(await snapshotFor('/about')),'/about');expect(ix2.init).toHaveBeenCalledOnce();expect(instance.register).toHaveBeenCalledOnce();adapter.destroy?.();expect(document.querySelector('[data-env-shell]')).toBeNull();
});
it('data extraction rejects executable syntax and keeps literal values',()=>{
 expect(()=>literal({type:'CallExpression'})).toThrow('Non-data');
 const source='a.register([{id:"i",deleted:!1}],[{id:"t",duration:1e3}]);Webflow.require("ix2").init({events:{},actionLists:{},site:{}})';
 const data=extract(source);expect(data.interactions[0].deleted).toBe(false);expect(data.timelines[0].duration).toBe(1000);
});
