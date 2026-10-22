import { expect, it } from 'vitest';
import { wrap, validate, syncMenuVariants } from '../src/sd/layout.js';
import routes from '../src/sd/routes.json';
function fixture(path: keyof typeof routes) {
  const record = routes[path];
  const doc = document.implementation.createHTMLDocument('SD');
  doc.documentElement.setAttribute('data-wf-site', record.site!);
  doc.documentElement.setAttribute('data-wf-page', record.page!);
  record.scripts.forEach(src => { const el = doc.createElement('script'); el.src = src; doc.body.append(el); });
  record.sheets.forEach(href => { const el = doc.createElement('link'); el.rel = 'stylesheet'; el.href = href; doc.head.append(el); });
  const nav = doc.createElement('nav'); nav.className = 'navbar-logo-center'; doc.body.prepend(nav);
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

it('adopts destination menu colors in both directions without replacing persistent nodes', () => {
  const live = document.implementation.createHTMLDocument('Home');
  const work = document.implementation.createHTMLDocument('Work');
  live.body.innerHTML = '<nav class="navbar-logo-center is-past-hero"><a class="nav-link-sd white w--current"></a><div class="dot-link"></div></nav>';
  work.body.innerHTML = '<nav class="navbar-logo-center"><a class="nav-link-sd"></a><div class="dot-link dark"></div></nav>';
  const link = live.querySelector('a')!;
  syncMenuVariants(live, work);
  expect(link.classList.contains('white')).toBe(false);
  expect(link.classList.contains('w--current')).toBe(true);
  expect(live.querySelector('.dot-link')!.classList.contains('dark')).toBe(true);
  work.querySelector('a')!.classList.add('white');
  work.querySelector('.dot-link')!.classList.remove('dark');
  syncMenuVariants(live, work);
  expect(live.querySelector('a')).toBe(link);
  expect(link.classList.contains('white')).toBe(true);
  expect(live.querySelector('.dot-link')!.classList.contains('dark')).toBe(false);
});

it('accepts any internal path sharing a verified runtime and SD layout', () => {
  const doc = fixture('/work-v2');
  doc.documentElement.setAttribute('data-wf-page', 'new-project-page');
  expect(() => validate(doc, '/projects/new-name')).not.toThrow();
  doc.querySelector('.navbar-logo-center')!.remove();
  expect(() => validate(doc, '/projects/new-name')).toThrow('shared SD menu');
});
