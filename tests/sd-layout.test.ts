import { expect, it } from 'vitest';
import { wrap, validate } from '../src/sd/layout.js';
import routes from '../src/sd/routes.json';
function fixture(path: keyof typeof routes) {
  const record = routes[path];
  const doc = document.implementation.createHTMLDocument('SD');
  doc.documentElement.setAttribute('data-wf-site', record.site!);
  doc.documentElement.setAttribute('data-wf-page', record.page!);
  record.scripts.forEach(src => { const el = doc.createElement('script'); el.src = src; doc.body.append(el); });
  record.sheets.forEach(href => { const el = doc.createElement('link'); el.rel = 'stylesheet'; el.href = href; doc.head.append(el); });
  const main = doc.createElement('main'); main.className = 'main-wrapper'; doc.body.prepend(main);
  return doc;
}
it('keeps the menu outside the replaceable main/footer wrapper', () => {
  const doc = fixture('/home-sd');
  const nav = doc.createElement('nav'); nav.className = 'navbar-logo-center'; doc.body.prepend(nav);
  const footer = doc.createElement('section'); footer.className = 'section footer static'; doc.body.append(footer);
  const root = wrap(doc);
  expect(doc.body.firstElementChild).toBe(nav);
  expect(root.contains(nav)).toBe(false);
  expect(root.contains(footer)).toBe(true);
  expect(root.querySelector('script')).toBeNull();
  expect(wrap(doc)).toBe(root);
});
it('accepts the certified exports and rejects changed runtime or page identity', () => {
  const doc = fixture('/work-v2');
  expect(() => validate(doc, '/work-v2')).not.toThrow();
  doc.documentElement.setAttribute('data-wf-page', 'changed');
  expect(() => validate(doc, '/work-v2')).toThrow('Uncertified');
  const another = fixture('/home-sd'); another.querySelector('script')!.remove();
  expect(() => validate(another, '/home-sd')).toThrow('export changed');
});
it('rejects leftover legacy initialization and widgets without an adapter', () => {
  const doc = fixture('/home-sd');
  const old = doc.createElement('script'); old.textContent = "const brand = document.querySelector('.navbar-brand-three');"; doc.body.append(old);
  expect(() => validate(doc, '/home-sd')).toThrow('legacy brand');
  old.remove();
  const form = doc.createElement('div'); form.className = 'w-form'; doc.body.append(form);
  expect(() => validate(doc, '/home-sd')).toThrow('Unsupported');
});
