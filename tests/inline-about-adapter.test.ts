import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import patterns from '../src/sd/inline-about-patterns.json';
import { inspectInlineAbout, prepareInlineLogo } from '../src/sd/inline-about-adapter.js';
import { validate } from '../src/sd/layout.js';
import routes from '../src/sd/routes.json';
const docFor = (source: string) => {
  const doc = document.implementation.createHTMLDocument('About');
  const script = doc.createElement('script'); script.textContent = source; doc.body.append(script); return doc;
};
it('recognizes responsive and original page-only scripts with bounded editable settings', () => {
  for (const mode of ['responsive', 'legacy'] as const) {
    const source = patterns[mode].replace('end: "top 60%"', 'end: "top 45%"').replace('blur: 20', 'blur: 30');
    const profile = inspectInlineAbout(docFor(source));
    expect(profile.sources).toEqual([source]);
    expect(profile.story?.responsive).toBe(mode === 'responsive');
    expect(profile.story?.groups.firstGroup.end).toBe('top 45%');
    expect(profile.story?.groups.firstGroup.blur).toBe(30);
  }
});
it('refuses modified executable logic and non-data configuration', () => {
  expect(inspectInlineAbout(docFor(patterns.responsive.replace('opacity: 0.1', 'opacity: alert(1)'))).story).toBeNull();
  expect(inspectInlineAbout(docFor(patterns.responsive.replace('blur: 20', 'blur: (() => 20)()'))).story).toBeNull();
  expect(inspectInlineAbout(docFor(patterns.responsive.replace('blur: 20', 'blur: 999'))).story).toBeNull();
});
it('recognizes the separate hero-release and section-mask blocks', () => {
  expect(inspectInlineAbout(docFor(patterns.hero)).hero).toBe(true);
  expect(inspectInlineAbout(docFor(patterns.mask)).mask).toBe(true);
  expect(inspectInlineAbout(docFor(patterns.hero + ';otherCode()')).hero).toBe(false);
});
it('allows recognized inline scripts while retaining the unknown-script validation guard', () => {
  const route = routes['/about']; const doc = docFor(patterns.responsive);
  doc.documentElement.setAttribute('data-wf-site', route.site);
  doc.documentElement.setAttribute('data-wf-page', route.page);
  route.scripts.forEach(src => { const s = doc.createElement('script'); s.src = src; doc.body.append(s); });
  route.sheets.forEach(href => { const l = doc.createElement('link'); l.rel='stylesheet';l.href=href;doc.head.append(l); });
  doc.body.insertAdjacentHTML('afterbegin','<nav class="navbar-logo-center"></nav><main class="main-wrapper"></main>');
  expect(() => validate(doc, '/about')).toThrow('Additional inline script');
  expect(() => validate(doc, '/about', undefined, { inlineScripts: inspectInlineAbout(doc).sources })).not.toThrow();
  const extra = doc.createElement('script'); extra.textContent='unregistered()';doc.body.append(extra);
  expect(() => validate(doc, '/about', undefined, { inlineScripts: inspectInlineAbout(doc).sources })).toThrow('Additional inline script');
});
it('creates a reversible entrance layer without removing the image attributes', () => {
  const doc = document.implementation.createHTMLDocument('About');
  doc.body.innerHTML='<div id="env-sd-page"><section class="hero-about"><img class="big--logo middle" data-env-reveal="fade-scale"></section></div>';
  const restore = prepareInlineLogo(doc);
  expect(doc.querySelector('[data-env-about-logo-layer] > img')).not.toBeNull();
  restore();
  expect(doc.querySelector('.hero-about > img')!.getAttribute('data-env-reveal')).toBe('fade-scale');
});
it('compiles the audited responsive behavior rather than evaluating incoming script text', () => {
  const source = readFileSync('src/sd/inline-about-motion.js','utf8');
  expect(source).toContain('responsive && context.conditions.mobile');
  expect(source).toContain('opacity: 0.1');
  expect(source).not.toMatch(/new Function|eval\(/);
  expect(source).not.toContain('new MutationObserver');
});
