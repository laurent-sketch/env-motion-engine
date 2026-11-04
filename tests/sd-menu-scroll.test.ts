import { expect, it } from 'vitest';
import { menuHasScrolled, menuBrandElements, menuBrandFrames, installMobileMenuStyles, prepareMenuPictoImages } from '../src/sd/menu.js';
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

it('keeps the picto visible and reveals the wordmark at its authored position to the right', () => {
  document.body.innerHTML = '<div><img class="main-picto"><img class="logo-nav"></div>';
  const picto = document.querySelector('.main-picto')!, logo = document.querySelector('.logo-nav')!;
  expect(menuBrandFrames(picto, logo, true)).toEqual([{transform:'none',opacity:1},{transform:'translateX(0px)',opacity:1}]);
  expect(menuBrandFrames(picto, logo, false)).toEqual([{transform:'none',opacity:1},{transform:'translateX(-10px)',opacity:0}]);
  document.body.innerHTML = '';
});

it('keeps the wordmark hidden when its Web Animations effect is removed during navigation', () => {
  document.head.querySelector('style[data-env-sd-mobile-nav]')?.remove();
  document.body.innerHTML='<nav class="navbar-logo-center"><a class="navbar-brand-three"><img class="main-picto"><img class="logo-nav"></a></nav>';
  installMobileMenuStyles(document);
  const logo=document.querySelector('.navbar-brand-three .logo-nav')!;
  expect(getComputedStyle(logo).opacity).toBe('0');
  document.querySelector('nav')!.classList.add('is-past-hero');
  expect(getComputedStyle(logo).opacity).toBe('0');
  document.head.querySelector('style[data-env-sd-mobile-nav]')?.remove();document.body.innerHTML='';
});

it('restores authored primary-button styles on the white navbar without altering page buttons', () => {
  const baseline=document.createElement('style');baseline.textContent='.btn-primary{background-color:rgb(47,127,255);color:rgb(255,255,255)}';document.head.append(baseline);
  document.body.innerHTML='<nav class="navbar-logo-center"><div class="nav-menu-three"><a class="nav-link-sd white">Work</a></div><a class="btn-primary"><span class="btn-text-main">Talk</span></a></nav><main><a class="btn-primary">Other</a></main>';
  installMobileMenuStyles(document);
  const button=document.querySelector('nav .btn-primary')!;
  expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)');
  expect(getComputedStyle(button).color).toBe('rgb(255, 255, 255)');
  expect(getComputedStyle(document.querySelector('main .btn-primary')!).backgroundColor).toBe('rgb(47, 127, 255)');
  document.querySelector('nav')!.classList.add('is-past-hero');
  expect(getComputedStyle(button).backgroundColor).toBe('rgb(47, 127, 255)');
  baseline.remove();document.head.querySelector('style[data-env-sd-mobile-nav]')?.remove();document.body.innerHTML='';
});

it('colors the single mobile picto without replacing unrelated mobile wordmarks', () => {
  document.body.innerHTML='<nav><div class="navbar-brand-three"><img class="main-picto" src="icon.svg"></div><div class="logo-mobile"><img class="logo-nav mobile" src="https://cdn.example.com/id_sd-picto.svg"></div></nav>';
  const nav=document.querySelector('nav')!, mobile=document.querySelector('.logo-mobile img')!;
  prepareMenuPictoImages(nav,'https://cdn.example.com/sd-picto-blue.svg');
  expect(mobile.getAttribute('src')).toBe('https://cdn.example.com/sd-picto-blue.svg');
  expect(mobile.classList.contains('is-env-nav-picto')).toBe(true);
  mobile.setAttribute('src','https://cdn.example.com/SD.svg');mobile.classList.remove('is-env-nav-picto');
  prepareMenuPictoImages(nav,'https://cdn.example.com/sd-picto-blue.svg');
  expect(mobile.getAttribute('src')).toBe('https://cdn.example.com/SD.svg');
  expect(mobile.classList.contains('is-env-nav-picto')).toBe(false);
  document.body.innerHTML='';
});
