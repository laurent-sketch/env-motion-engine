import { afterEach, expect, it, vi } from 'vitest';
import { mountInlineHeroRelease } from '../src/sd/inline-about-hero.js';

afterEach(() => {
  (document.querySelector('.hero-about') as any)?.__envReleaseCleanup?.();
  document.body.innerHTML = '';
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function fixture() {
  document.body.innerHTML = '<div id="env-sd-page"><div><section class="section hero-about"></section><section class="section about-second"></section><section class="section third-bloc"></section></div><section class="section footer static"></section></div>';
  const hero = document.querySelector('.hero-about')!;
  const positions = { content: 100, following: 1500, footer: 3000 };
  for (const [selector, key] of [['.about-second', 'content'], ['.third-bloc', 'following'], ['.section.footer', 'footer']]) {
    vi.spyOn(document.querySelector(selector)!, 'getBoundingClientRect').mockImplementation(() => ({ top: positions[key as keyof typeof positions] } as DOMRect));
  }
  vi.stubGlobal('innerHeight', 800);
  return { hero, positions };
}

it('keeps the hero visible before the story covers it', () => {
  const { hero } = fixture();
  mountInlineHeroRelease();
  expect(hero.hasAttribute('data-env-hero-released')).toBe(false);
});

it.each(['content', 'following', 'footer'] as const)('releases through the %s boundary even when the sticky section stays below zero', boundary => {
  const { hero, positions } = fixture();
  positions[boundary] = boundary === 'footer' ? 799 : 0;
  mountInlineHeroRelease();
  expect(hero.hasAttribute('data-env-hero-released')).toBe(true);
});

it('restores the hero on return and removes its marker on cleanup', async () => {
  const { hero, positions } = fixture();
  positions.footer = 700;
  mountInlineHeroRelease();
  expect(hero.hasAttribute('data-env-hero-released')).toBe(true);
  positions.footer = 3000;
  window.dispatchEvent(new Event('scroll'));
  await new Promise(resolve => requestAnimationFrame(resolve));
  expect(hero.hasAttribute('data-env-hero-released')).toBe(false);
  (hero as any).__envReleaseCleanup();
  expect((hero as any).__envReleaseCleanup).toBeUndefined();
});
