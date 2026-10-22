/* ENV SD — inline in head, before body parsing. Fail open if the application cannot boot. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const style = document.createElement('style');
  style.textContent = 'html.env-sd-boot :is([data-env-reveal],[data-env-text]):not([data-env-ignore]):not([data-env-ignore] *):not(.w-slider *):not(.swiper-initialized *){visibility:hidden}.env-sd-pending{visibility:hidden}';
  document.head.append(style);
  document.documentElement.classList.add('env-sd-boot');
  const release = () => document.documentElement.classList.remove('env-sd-boot');
  setTimeout(release, 5000);
  addEventListener('pageshow', event => { if (event.persisted) release(); });
})();
