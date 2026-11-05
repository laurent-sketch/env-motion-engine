import { expect, it } from 'vitest';
import { normalizeAboutComponent } from '../src/sd/about-component.js';
const nav = '<nav class="navbar-logo-center"><a class="navbar-brand-three" href="/">Logo</a><a href="/about">About</a><div class="contact-modal-bloc"><form></form></div></nav>';
function fixture(story = true) {
  const doc = document.implementation.createHTMLDocument('About');
  doc.body.innerHTML = `${nav}<main class="main-wrapper">${story ? '<section class="section hero-about"></section><section class="section about-second"></section>' : ''}${nav}</main>`;
  return doc;
}
it('keeps the persistent menu and removes only its repeated copy inside About', () => {
  const doc = fixture(), first = doc.querySelector('nav');
  normalizeAboutComponent(doc); normalizeAboutComponent(doc);
  expect(doc.querySelectorAll('nav')).toHaveLength(1);
  expect(doc.querySelectorAll('form')).toHaveLength(1);
  expect(doc.querySelector('nav')).toBe(first);
});
it('leaves other pages and different secondary navigation unchanged', () => {
  const doc = fixture(false);
  normalizeAboutComponent(doc);
  expect(doc.querySelectorAll('nav')).toHaveLength(2);
  const about = fixture();
  about.querySelector('main a[href="/about"]')!.setAttribute('href', '/press');
  normalizeAboutComponent(about);
  expect(about.querySelectorAll('nav')).toHaveLength(2);
});
