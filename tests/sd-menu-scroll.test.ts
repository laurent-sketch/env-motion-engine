import { expect, it } from 'vitest';
import { menuHasScrolled, menuBrandElements } from '../src/sd/menu.js';
it('activates the menu near the top and avoids flicker on small scroll reversals', () => {
  let active = false;
  const values = [0, 7, 9, 6, 3, 2, 5, 9, 0, -15];
  expect(values.map(y => active = menuHasScrolled(y, active))).toEqual([false, false, true, true, true, false, false, true, false, false]);
});
it('supports the new icon brand and legacy text without selecting mobile logo images', () => {
  document.body.innerHTML = '<div class="navbar-brand-three"><img class="main-picto"><img class="logo-nav"></div><div class="logo-mobile"><img class="logo-nav"></div>';
  const brand = document.querySelector('.navbar-brand-three')!;
  const [picto, logo] = menuBrandElements(brand);
  expect(picto).toBe(brand.querySelector('.main-picto'));
  expect(logo).toBe(brand.querySelector('.logo-nav'));
  brand.innerHTML = '<span class="nav-link-sd">Boutique Scale.</span><img class="logo-nav">';
  expect(menuBrandElements(brand)[0]).toBe(brand.querySelector('.nav-link-sd'));
  document.body.innerHTML = '';
});
