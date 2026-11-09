// A small hysteresis prevents flicker from elastic scrolling near the top.
export function menuHasScrolled(scroll, previous = false) {
  return Math.max(0, scroll) > (previous ? 2 : 8);
}
export function menuBrandElements(brand) {
  return [brand?.querySelector('.main-picto') || brand?.querySelector('.nav-link-sd'), brand?.querySelector('.logo-nav')];
}
// Enter through the visible picto, then keep the reveal while crossing the letters.
export function bindMenuBrandPreview(brand, picto, change, signal, win = window) {
  if (!brand || !picto?.matches('.main-picto')) return;
  let hover = false, focus = false;
  const emit = () => change(hover || focus);
  picto.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch' || !win.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    hover = true; emit();
  }, { signal });
  brand.addEventListener('pointerleave', () => { hover = false; emit(); }, { signal });
  brand.addEventListener('focusin', () => { focus = true; emit(); }, { signal });
  brand.addEventListener('focusout', event => {
    if (event.relatedTarget && brand.contains(event.relatedTarget)) return;
    focus = false; emit();
  }, { signal });
}
export function prepareMenuPictoImages(nav, darkSrc) {
  nav?.querySelectorAll('.navbar-brand-three img.main-picto, .logo-mobile img.logo-nav').forEach(image => {
    if (!image.matches('.main-picto') && !/sd-picto(?:-blue)?\.svg(?:[?#]|$)/i.test(image.getAttribute('src') || '')) return;
    image.classList.add('is-env-nav-picto');
    image.removeAttribute('srcset');
    image.src = darkSrc;
  });
}
export function menuBrandFrames(first, logo, show) {
  if (first.matches('.main-picto')) return [
    { transform: 'none', opacity: 1 },
    { transform: `translateX(${show ? 0 : -10}px)`, opacity: show ? 1 : 0 }
  ];
  const a = first.getBoundingClientRect(), b = logo.getBoundingClientRect();
  return [
    { transform: `translateY(${show ? -a.height * 1.2 : 0}px)`, opacity: show ? 0 : 1 },
    { transform: `translate(${a.left - b.left}px,${a.top + a.height / 2 - b.top - b.height / 2 + (show ? 0 : a.height * 1.2)}px)`, opacity: show ? 1 : 0 }
  ];
}
// The light Home has two mobile logo images; inner pages have a single dark logo.
export function installMobileMenuStyles(doc = document) {
  if (doc.querySelector('style[data-env-sd-mobile-nav]')) return;
  const style = doc.createElement('style'); style.dataset.envSdMobileNav = '';
  style.textContent = `.navbar-logo-center .btn-sd.nav{transition:color 400ms ease,background-color 400ms ease,border-color 400ms ease,transform 400ms cubic-bezier(.23,1,.32,1)}
.navbar-logo-center:not(.is-past-hero) .btn-sd.nav:not(:hover):not(:focus-visible){color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a));background-color:transparent;background-image:none;border-color:transparent;box-shadow:none}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .btn-sd.nav:not(:hover):not(:focus-visible){color:#fff;background-color:transparent;background-image:none;border-color:transparent;box-shadow:none}
.navbar-logo-center .btn-primary{transition:background-color 400ms ease,color 400ms ease,border-color 400ms ease}
.navbar-logo-center .btn-primary :is(.btn-text-main,.btn-text-scd){transition:color 400ms ease}
.navbar-logo-center:not(.is-past-hero) .btn-primary:not(:hover):not(:focus-visible){color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a));background-color:transparent;background-image:none;border-color:transparent;box-shadow:none}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .btn-primary:not(:hover):not(:focus-visible){color:#fff}
.navbar-logo-center:not(.is-past-hero) .btn-primary:not(:hover):not(:focus-visible) :is(.btn-text-main,.btn-text-scd){color:inherit}
.see-more-bloc{cursor:pointer}
.see-more-bloc:is(:hover,:focus-within) img,a:focus-visible .see-more-bloc img{animation:env-see-more-arrow 450ms cubic-bezier(.22,1,.36,1)}
@keyframes env-see-more-arrow{0%{transform:translate(0,0);opacity:1}40%{transform:translate(10px,-10px);opacity:0}41%{transform:translate(-10px,10px);opacity:0}100%{transform:translate(0,0);opacity:1}}
@media(prefers-reduced-motion:reduce){.see-more-bloc img{animation:none!important}}
@media(max-width:767px){.project-item .btn-sd.more.mobile{opacity:1!important;visibility:visible!important;transform:none!important;pointer-events:auto!important}}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .btn-primary,.navbar-logo-center .btn-primary :is(.btn-text-main,.btn-text-scd){transition:none}}
.navbar-logo-center .link-box:has(a.w--current) .dot-link,.navbar-logo-center .link-box.w--current .dot-link{opacity:1;width:100%;transform:translateY(0)}
.navbar-logo-center .contact-modal-bloc{max-height:100vh;max-height:100dvh;overflow-y:auto!important;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom}
.navbar-logo-center .contact-modal-bloc .contact-form-wrapper{min-height:0!important;max-height:calc(100vh - 24px)!important;max-height:calc(100dvh - 24px)!important;overflow-y:auto!important;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom}
.navbar-logo-center .navbar-brand-three:has(.main-picto) .logo-nav{opacity:0}
.navbar-logo-center .navbar-brand-three .logo-nav{filter:brightness(1) invert(0);transition:filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .navbar-brand-three .logo-nav{filter:brightness(0) invert(1)}
.navbar-logo-center .navbar-brand-three .main-picto{filter:brightness(1) invert(0);transition:filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .navbar-brand-three .main-picto{filter:brightness(0) invert(1)}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .navbar-brand-three .main-picto,.navbar-logo-center .navbar-brand-three .logo-nav{transition:none}}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .btn-sd.nav{transition:none}}
@media(max-width:991px){
.navbar-logo-center .menu-modal{max-height:100vh;max-height:100dvh;overflow-y:auto!important;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom}
.navbar-logo-center .menu-modal-element-wrapper{height:auto!important;min-height:100%;flex-shrink:0}
.navbar-logo-center .burger-menu-wrap .line-burger{transition:background-color 400ms ease}
.navbar-logo-center.is-env-burger-managed .burger-menu-wrap{position:relative;z-index:5;cursor:pointer}
.navbar-logo-center.is-env-burger-managed .burger-menu-wrap .line-burger{transform:none!important;transform-origin:center;transition:transform 450ms cubic-bezier(.22,1,.36,1),background-color 300ms ease}
.navbar-logo-center.is-env-burger-managed.is-env-menu-open .burger-menu-wrap .line-burger.top{transform:translateY(var(--env-burger-shift,4.5px)) rotate(45deg)!important}
.navbar-logo-center.is-env-burger-managed.is-env-menu-open .burger-menu-wrap .line-burger.bottom{transform:translateY(calc(-1 * var(--env-burger-shift,4.5px))) rotate(-45deg)!important}
.navbar-logo-center.is-env-menu-open .burger-menu-wrap .line-burger{background-color:#fff!important}
.navbar-logo-center.is-env-menu-open .logo-mobile>.logo-nav{filter:brightness(0) invert(1)!important}
.navbar-logo-center.is-env-menu-open::before{opacity:0!important}
.navbar-logo-center.is-env-burger-managed:not(.is-env-menu-open) .menu-modal{pointer-events:none!important}
.navbar-logo-center.is-past-hero .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))}
.navbar-logo-center .logo-mobile>.logo-nav{transition:opacity 400ms ease}
.navbar-logo-center .logo-mobile>.logo-nav.is-env-nav-picto{filter:brightness(1) invert(0);transition:opacity 400ms ease,filter 400ms ease}
.navbar-logo-center:has(.nav-menu-three .nav-link-sd.white):not(.is-past-hero) .logo-mobile>.logo-nav.is-env-nav-picto{filter:brightness(0) invert(1)}
.navbar-logo-center .logo-mobile>.logo-nav.bis{position:absolute;top:0;left:0;margin:0;opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile:has(>.logo-nav.bis)>.logo-nav:not(.bis){opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile>.logo-nav.bis{opacity:1}
}
@media(max-width:767px){
.navbar-logo-center .contact-modal-bloc{top:var(--env-modal-header-height,78px)!important;bottom:0!important;height:calc(100vh - var(--env-modal-header-height,78px))!important;height:calc(100dvh - var(--env-modal-header-height,78px))!important;max-height:calc(100vh - var(--env-modal-header-height,78px))!important;max-height:calc(100dvh - var(--env-modal-header-height,78px))!important}
.navbar-logo-center .contact-modal-bloc .contact-form-wrapper{box-sizing:border-box;height:100%!important;max-height:100%!important;padding-top:24px!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open){background:#fff!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open)::before{opacity:1!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open) .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open) :is(.navbar-brand-three .main-picto,.navbar-brand-three .logo-nav,.logo-mobile>.logo-nav){filter:brightness(1) invert(0)!important}
.navbar-logo-center.is-env-contact-open:not(.is-env-menu-open) .nav-link-sd{color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))!important}
.navbar-logo-center .contact-modal-bloc .close-bloc{cursor:pointer}
}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .logo-mobile>.logo-nav,.navbar-logo-center .logo-mobile>.logo-nav.is-env-nav-picto,.navbar-logo-center.is-env-burger-managed .burger-menu-wrap .line-burger{transition:none!important}}`;
  doc.head.append(style);
}
