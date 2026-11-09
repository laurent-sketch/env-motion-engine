import { afterEach, expect, it, vi } from 'vitest';
import { planStylesheetUpdate, stageStylesheetUpdate } from '../src/sd/stylesheet-update.js';
const site = '68bb0b6fbfff68e3dfd32f3f';
const css = version => `https://cdn.prod.website-files.com/${site}/css/saiddifferently-2026.webflow.shared.${version}.min.css`;
const before = css('068141109'), after = css('42419dded');
function documentWith(hrefs) { const doc = document.implementation.createHTMLDocument('Page'); hrefs.forEach(href => { const link = doc.createElement('link'); link.rel = 'stylesheet'; link.href = href; doc.head.append(link); }); return doc; }
afterEach(() => vi.useRealTimers());
it('accepts a new version of the same shared CSS but rejects different sites, families and extra dependencies', () => {
  expect(planStylesheetUpdate(documentWith([after]), [before], site).replacements).toEqual([{ from: before, to: after, media: 'all' }]);
  for (const href of [after.replace(site,'another-site'),after.replace('saiddifferently-2026','another-project'),after.replace('cdn.prod.website-files.com','example.com'),after+'?changed=1']) {
    expect(() => planStylesheetUpdate(documentWith([href]),[before],site)).toThrow('Stylesheets changed');
  }
  expect(() => planStylesheetUpdate(documentWith([after,'https://example.com/widget.css']),[before],site)).toThrow();
});
it('loads new CSS without applying it and switches only at the content handover', async () => {
  const live = documentWith([before]), plan = planStylesheetUpdate(documentWith([after]),[before],site);
  const promise = stageStylesheetUpdate(live,plan);
  const staged = live.querySelector('[data-env-staged-sheet]') as HTMLLinkElement;
  expect(staged.media).toBe('not all'); expect(live.querySelectorAll('link')).toHaveLength(2);
  staged.dispatchEvent(new Event('load'));
  const update = await promise;
  expect(live.querySelector('link')!.getAttribute('href')).toBe(before);
  update.commit();
  expect(live.querySelectorAll('link')).toHaveLength(1); expect(staged.media).toBe('all');
  expect(staged.hasAttribute('data-env-staged-sheet')).toBe(false);
  update.rollback(); expect(staged.isConnected).toBe(true);
});
it('retains the previous stylesheet if loading fails or a visit is cancelled', async () => {
  const live = documentWith([before]), plan = planStylesheetUpdate(documentWith([after]),[before],site);
  const promise = stageStylesheetUpdate(live,plan);
  const failed = expect(promise).rejects.toThrow('stylesheet update failed');
  live.querySelector('[data-env-staged-sheet]')!.dispatchEvent(new Event('error')); await failed;
  expect(live.querySelectorAll('link')).toHaveLength(1);
  const second = stageStylesheetUpdate(live,plan);
  live.querySelector('[data-env-staged-sheet]')!.dispatchEvent(new Event('load'));
  (await second).rollback(); expect(live.querySelectorAll('link')).toHaveLength(1);
  expect(live.querySelector('link')!.getAttribute('href')).toBe(before);
});
it('does no stylesheet work on visits within one publication', async () => {
  const live = documentWith([before]);
  const update = await stageStylesheetUpdate(live,planStylesheetUpdate(documentWith([before]),[before],site));
  update.commit(); expect(live.querySelectorAll('link')).toHaveLength(1);
});
