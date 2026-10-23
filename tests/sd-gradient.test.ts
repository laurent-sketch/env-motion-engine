import { afterEach, expect, it, vi } from 'vitest';
import { installGradient } from '../src/sd/gradient.js';
let stop;
afterEach(() => { stop?.(); stop = null; document.head.innerHTML = ''; document.body.innerHTML = ''; vi.unstubAllGlobals(); });
function page(gradient = true, height = 500) {
  const root = document.createElement('div'); root.id = 'env-sd-page';
  root.innerHTML = '<main class="main-wrapper"><section class="hero-wrapper '+(gradient ? 'gradient-blue' : '')+'" style="background-image:linear-gradient(#bed5e8,#fff)"><h1>Title</h1></section></main>';
  const hero = root.querySelector('section')!;
  hero.getBoundingClientRect = () => ({ top: 0, left: 0, width: 1000, height } as DOMRect);
  return root;
}
it('keeps the same backdrop outside the fading root across inner pages and restores authored styles', () => {
  document.body.append(page()); const manager = installGradient(); stop = manager.destroy;
  const layer = document.querySelector('#env-sd-gradient') as HTMLElement;
  expect(document.querySelector('#env-sd-page')!.contains(layer)).toBe(false);
  expect(layer.style.height).toBe('500px'); expect(layer.style.opacity).toBe('1');
  expect(layer.style.backgroundImage).toContain('linear-gradient');
  const cached = page(true, 800); cached.querySelector('section')!.setAttribute('data-env-sd-gradient-source', '');
  document.querySelector('#env-sd-page')!.replaceWith(cached); manager.prepare();
  expect(document.querySelector('#env-sd-gradient')).toBe(layer);
  expect(layer.style.opacity).toBe('1'); expect(layer.style.height).toBe('800px');
  manager.commit(); expect(layer.style.opacity).toBe('1');
  manager.refresh(); expect(layer.style.backgroundImage).toContain('linear-gradient');
  manager.destroy(); stop = null;
  expect(document.querySelector('[data-env-sd-gradient-source]')).toBeNull();
  expect(document.querySelector('section')!.style.backgroundImage).toContain('linear-gradient');
});
it('retains the outgoing backdrop until Home content is ready and restores it on inner-page entry', () => {
  document.body.append(page()); const manager = installGradient(); stop = manager.destroy;
  const layer = document.querySelector('#env-sd-gradient') as HTMLElement;
  document.querySelector('#env-sd-page')!.replaceWith(page(false)); manager.prepare();
  expect(layer.style.opacity).toBe('1');
  expect(document.querySelector('#env-sd-page')!.hasAttribute('data-env-sd-gradient-page')).toBe(false);
  manager.commit(); expect(layer.style.opacity).toBe('0');
  document.querySelector('#env-sd-page')!.replaceWith(page()); manager.prepare();
  expect(layer.style.opacity).toBe('0'); manager.commit(); expect(layer.style.opacity).toBe('1');
});
