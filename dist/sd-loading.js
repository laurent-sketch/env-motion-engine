/* ENV SD first-visit screen + HTML preload opt-in. Inline first in Head. */
(() => {
  window.ENVSDPreload = true;
  const key = 'env-sd-first-load-v2';
  try { if (sessionStorage.getItem(key)) return; } catch {}
  const style = document.createElement('style');
  style.textContent = 'html.env-sd-first-load{overflow:hidden;scrollbar-gutter:stable}html.env-sd-first-load .w-webflow-badge{visibility:hidden!important}html.env-sd-first-load::before{content:"";position:fixed;inset:0;background:#fff;z-index:2147483646;pointer-events:auto}html.env-sd-first-load::after{content:"Said Differently.";position:fixed;inset:0;display:grid;place-items:center;color:#11263a;font-family:Georgia,"Times New Roman",serif;font-size:clamp(32px,6vw,80px);line-height:1;letter-spacing:-.05em;z-index:2147483647;pointer-events:auto;background:linear-gradient(#2f7fff,#2f7fff) center calc(50% + 65px)/96px 2px no-repeat;animation:env-sd-load 1.2s ease-in-out infinite}@keyframes env-sd-load{0%,100%{opacity:.55}50%{opacity:1}}@media(prefers-reduced-motion:reduce){html.env-sd-first-load::after{animation:none}}';
  document.head.append(style);
  document.documentElement.classList.add('env-sd-first-load');
  let ended = false, status, preparing;
  const addStatus = () => {
    if (ended) return;
    status = document.createElement('span'); status.setAttribute('role', 'status');
    status.textContent = 'Loading'; status.style.cssText = 'position:fixed;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);pointer-events:none';
    document.body.append(status);
  };
  if (document.body) addStatus(); else document.addEventListener('DOMContentLoaded', addStatus, { once: true });
  // Prepare only the initial viewport. Never wait for the full video or later sections.
  const prepare = () => {
    if (ended) return Promise.resolve();
    if (preparing) return preparing;
    preparing = new Promise(resolve => {
      const cleanups = [];
      let settled = false;
      const complete = () => { if (settled) return; settled = true; clearTimeout(deadline); cleanups.forEach(fn => fn()); resolve(); };
      const deadline = setTimeout(complete, 1800);
      const readyImage = image => new Promise(done => {
        const decode = () => { if (image.decode) image.decode().catch(() => {}).then(done); else done(); };
        if (image.complete) { decode(); return; }
        const loaded = () => { cleanup(); decode(); };
        const cleanup = () => { image.removeEventListener('load', loaded); image.removeEventListener('error', loaded); };
        cleanups.push(cleanup);
        image.addEventListener('load', loaded, { once: true }); image.addEventListener('error', loaded, { once: true });
      });
      const images = [...document.images].filter(image => {
        const rect = image.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth && getComputedStyle(image).display !== 'none';
      }).slice(0, 8);
      const hero = document.querySelector('.hero-wrapper .sd-slider');
      const slides = hero ? [...hero.querySelectorAll('.w-slider-mask > .w-slide')] : [];
      const active = hero ? [...hero.querySelectorAll('.w-slider-dot')].findIndex(dot => dot.classList.contains('w-active')) : -1;
      const poster = slides[active >= 0 ? active : 0]?.querySelector('video')?.poster;
      if (poster) { const image = new Image(); image.src = poster; images.push(image); }
      Promise.all([document.fonts?.ready || Promise.resolve(), ...images.map(readyImage)]).then(complete, complete);
    });
    return preparing;
  };
  window.ENVSDLoader = { prepare };
  const finish = event => {
    ended = true; document.documentElement.classList.remove('env-sd-first-load'); status?.remove();
    clearTimeout(timer); window.removeEventListener('env:sd-ready', finish);
    if (event?.type === 'env:sd-ready') { try { sessionStorage.setItem(key, '1'); } catch {} }
    if (window.ENVSDLoader?.prepare === prepare) delete window.ENVSDLoader;
  };
  const timer = setTimeout(finish, 6000);
  window.addEventListener('env:sd-ready', finish, { once: true });
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
})();
