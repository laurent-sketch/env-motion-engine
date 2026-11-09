import { afterEach, expect, it } from 'vitest';
import { normalizeLegalLayout } from '../src/sd/legal-layout.js';
import { wrap } from '../src/sd/layout.js';
afterEach(() => { document.body.replaceChildren(); document.documentElement.removeAttribute('data-wf-site'); document.documentElement.removeAttribute('data-wf-page'); });
it('normalizes both known legal layouts and preserves menu, footer and trailing media order', () => {
  for (const id of ['68bb0b6fbfff68e3dfd32f3d','68bb0b6fbfff68e3dfd32f3e']) {
    document.documentElement.setAttribute('data-wf-site','68bb0b6fbfff68e3dfd32f3f');
    document.documentElement.setAttribute('data-wf-page',id);
    document.body.innerHTML='<nav class="navbar-logo-center"></nav><section class="section blue policy"><h1>Policy</h1></section><section class="section padding-top-bottom relative">Text</section><section class="section footer static">Footer</section><div class="uplaod--video w-background-video">Video</div><script type="application/ld+json">{}</script>';
    const menu=document.querySelector('nav'); normalizeLegalLayout(document); normalizeLegalLayout(document);
    expect(document.querySelectorAll('main')).toHaveLength(1);
    const root=wrap(document);
    expect([...root.children].map(e=>e.tagName)).toEqual(['MAIN','SECTION','DIV']);
    expect(root.querySelector('main')!.children).toHaveLength(2);
    expect(menu!.parentElement).toBe(document.body);
    expect(document.querySelector('script')!.parentElement).toBe(document.body);
  }
});
it('does not silently adapt unrelated pages or incomplete legal structures', () => {
  document.body.innerHTML='<section class="section policy"></section><section class="section footer"></section>';
  normalizeLegalLayout(document); expect(document.querySelector('main')).toBeNull();
  document.documentElement.setAttribute('data-wf-site','68bb0b6fbfff68e3dfd32f3f'); document.documentElement.setAttribute('data-wf-page','68bb0b6fbfff68e3dfd32f3d');
  normalizeLegalLayout(document); expect(document.querySelector('main')).toBeNull();
});
