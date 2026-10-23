/* ENV SD experimental loader + HTML preload opt-in. Inline in Head. */
(() => {
  window.ENVSDPreload = true;
  const key = 'env-sd-first-load-v1';
  try { if (sessionStorage.getItem(key)) return; } catch {}
  const style = document.createElement('style');
  style.textContent = 'html.env-sd-first-load::after{content:"";position:fixed;top:0;left:0;width:100%;height:3px;background:#2f7fff;transform-origin:left;animation:env-sd-load 1.2s ease-in-out infinite;z-index:2147483647;pointer-events:none}@keyframes env-sd-load{0%{transform:scaleX(.08);opacity:.5}50%{transform:scaleX(.65);opacity:1}100%{transform:scaleX(1);opacity:0}}@media(prefers-reduced-motion:reduce){html.env-sd-first-load::after{animation:none;transform:scaleX(.4)}}';
  document.head.append(style);
  document.documentElement.classList.add('env-sd-first-load');
  let ended = false, status;
  const addStatus = () => {
    if (ended) return;
    status = document.createElement('span'); status.setAttribute('role', 'status');
    status.textContent = 'Loading'; status.style.cssText = 'position:fixed;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);pointer-events:none';
    document.body.append(status);
  };
  if (document.body) addStatus(); else document.addEventListener('DOMContentLoaded', addStatus, { once: true });
  const finish = event => {
    ended = true; document.documentElement.classList.remove('env-sd-first-load'); status?.remove();
    clearTimeout(timer); window.removeEventListener('env:sd-ready', finish);
    if (event?.type === 'env:sd-ready') { try { sessionStorage.setItem(key, '1'); } catch {} }
  };
  const timer = setTimeout(finish, 6000);
  window.addEventListener('env:sd-ready', finish, { once: true });
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
})();
