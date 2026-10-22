/* ENV SD — inline in head, before body parsing. Fail open if the application cannot boot. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const style = document.createElement('style');
  style.textContent = 'html.env-sd-boot body{visibility:hidden}.env-sd-pending{visibility:hidden}';
  document.head.append(style);
  document.documentElement.classList.add('env-sd-boot');
  const release = () => document.documentElement.classList.remove('env-sd-boot');
  setTimeout(release, 5000);
  addEventListener('pageshow', event => { if (event.persisted) release(); });
})();
