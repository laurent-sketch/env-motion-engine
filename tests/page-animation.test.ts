import { expect, it } from 'vitest';
import { syncPageAnimation } from '../src/sd/page-animation.js';
it('carries page-only About settings without executing incoming scripts', () => {
  const live = document.implementation.createHTMLDocument('Work');
  const next = document.implementation.createHTMLDocument('About');
  next.body.innerHTML = '<script src="about-page.js" data-env-page-animation="about" data-env-about-last-end="25" onload="bad()"></script>';
  syncPageAnimation(live, next);
  const marker = live.querySelector('[data-env-page-animation]')!;
  expect(marker.tagName).toBe('META');
  expect(marker.getAttribute('data-env-about-last-end')).toBe('25');
  expect(marker.hasAttribute('src')).toBe(false);
  expect(marker.hasAttribute('onload')).toBe(false);
  syncPageAnimation(live, document.implementation.createHTMLDocument('Other'));
  expect(live.querySelector('[data-env-page-animation]')).toBeNull();
});
it('removes the entry page script marker on departure so other pages stay inactive', () => {
  const doc = document.implementation.createHTMLDocument('About');
  doc.body.innerHTML = '<script data-env-page-animation="about" src="about-page.js"></script>';
  syncPageAnimation(doc, document.implementation.createHTMLDocument('Work'));
  expect(doc.querySelector('[data-env-page-animation]')).toBeNull();
});
