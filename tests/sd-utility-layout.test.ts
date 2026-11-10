import { afterEach, expect, it } from 'vitest';
import { normalizeUtilityLayout, syncOptionalNavigation } from '../src/sd/utility-layout.js';
import { wrap } from '../src/sd/layout.js';
const page = (id: string, html: string) => new DOMParser().parseFromString(`<html data-wf-site="68bb0b6fbfff68e3dfd32f3f" data-wf-page="${id}"><body>${html}</body></html>`, 'text/html');
const missing = () => page('6af2216acddf96f8782c12c8','<section class="section full-dark-blue"><a href="/">Back Home</a></section>');
afterEach(() => { document.body.replaceChildren(); });
it('wraps only the known 404 section and preserves its design without a menu', () => {
 const doc=missing(); normalizeUtilityLayout(doc); normalizeUtilityLayout(doc);
 expect(doc.querySelectorAll('main')).toHaveLength(1);
 expect(wrap(doc).querySelector('a')!.textContent).toBe('Back Home');
 expect(doc.querySelector('nav')).toBeNull();
 const other=page('unknown','<section class="section full-dark-blue"></section>'); normalizeUtilityLayout(other); expect(other.querySelector('main')).toBeNull();
});
it('hides and restores the same persistent navigation with its original attributes', () => {
 document.body.innerHTML='<nav class="navbar-logo-center" style="color:red" aria-hidden="false"></nav><div id="env-sd-page"></div>';
 const nav=document.querySelector('nav')!; const original=nav.getAttribute('style');
 syncOptionalNavigation(document, missing()); syncOptionalNavigation(document, missing());
 expect(nav.style.display).toBe('none'); expect(nav.hasAttribute('inert')).toBe(true);
 syncOptionalNavigation(document,page('home','<nav class="navbar-logo-center"></nav>'));
 expect(document.querySelector('nav')).toBe(nav); expect(nav.getAttribute('style')).toBe(original); expect(nav.getAttribute('aria-hidden')).toBe('false'); expect(nav.hasAttribute('hidden')).toBe(false);
});
it('adds incoming navigation when Back Home starts from a direct 404 load', () => {
 document.body.innerHTML='<div id="env-sd-page"></div>';
 expect(syncOptionalNavigation(document,page('home','<nav class="navbar-logo-center"><a href="/work">Work</a></nav>'))).toBe(true);
 expect(document.body.firstElementChild!.tagName).toBe('NAV');
 expect(() => syncOptionalNavigation(document,page('unknown',''))).toThrow('Missing destination navigation');
});
