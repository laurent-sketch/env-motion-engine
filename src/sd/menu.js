// The light Home has two mobile logo images; inner pages have a single dark logo.
export function installMobileMenuStyles(doc = document) {
  if (doc.querySelector('style[data-env-sd-mobile-nav]')) return;
  const style = doc.createElement('style'); style.dataset.envSdMobileNav = '';
  style.textContent = `.navbar-logo-center .btn-sd.nav{transition:color 400ms ease,background-color 400ms ease,border-color 400ms ease,transform 400ms cubic-bezier(.23,1,.32,1)}
.navbar-logo-center:has(.navbar-brand-three .nav-link-sd.white):not(.is-past-hero) .btn-sd.nav{color:#fff;background-color:transparent;background-image:none;border-color:transparent;box-shadow:none}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .btn-sd.nav{transition:none}}
@media(max-width:991px){
.navbar-logo-center .burger-menu-wrap .line-burger{transition:background-color 400ms ease}
.navbar-logo-center.is-past-hero .burger-menu-wrap .line-burger{background-color:var(--_colors---dark-blue,var(--nav-dark-blue,#11263a))}
.navbar-logo-center .logo-mobile>.logo-nav{transition:opacity 400ms ease}
.navbar-logo-center .logo-mobile>.logo-nav.bis{position:absolute;top:0;left:0;margin:0;opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile:has(>.logo-nav.bis)>.logo-nav:not(.bis){opacity:0}
.navbar-logo-center.is-past-hero .logo-mobile>.logo-nav.bis{opacity:1}
}
@media(prefers-reduced-motion:reduce){.navbar-logo-center .logo-mobile>.logo-nav,.navbar-logo-center .burger-menu-wrap .line-burger{transition:none}}`;
  doc.head.append(style);
}
