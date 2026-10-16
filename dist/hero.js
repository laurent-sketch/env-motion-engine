
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  const hero = document.querySelector('.hero-wrapper');
  const slider = hero?.querySelector('.sd-slider');
  if (!slider) return;

  // Setting this attribute after Webflow initialization cannot stop its existing timer.
  // Disable native Autoplay in the Designer before installing this replacement.
  if (/^(true|1)$/.test(slider.getAttribute('data-autoplay') || '')) {
    console.error('[Hero] Disable native Webflow Autoplay to use the replacement timer.');
    return;
  }

  const links = [...hero.querySelectorAll('.slider-nav-link')];
  const nav = slider.querySelector('.w-slider-nav');
  const slides = [...slider.querySelectorAll('.w-slider-mask > .w-slide')];
  const dots = nav ? [...nav.querySelectorAll('.w-slider-dot')] : [];
  if (!dots.length || dots.length !== links.length || dots.length !== slides.length) {
    console.error('[Hero] Expected one navigation link and native dot per slide.');
    return;
  }

  hero.__envHeroCleanup?.();
  const delay = 6000; // Full display time for each slide, in milliseconds.
  let timer;
  let current = -1;
  const controller = new AbortController();

  function schedule() {
    clearTimeout(timer);
    if (document.hidden || current < 0 || dots.length < 2) return;
    timer = setTimeout(function () {
      dots[(current + 1) % dots.length].click();
    }, delay);
  }

  function sync(force) {
    const index = dots.findIndex(dot => dot.classList.contains('w-active'));
    if (index < 0 || (index === current && !force)) return;
    current = index;
    links.forEach((link, i) => link.classList.toggle('active', i === index));

    slides.forEach(function (slide, i) {
      slide.querySelectorAll('video').forEach(function (video) {
        video.pause();
        if (i !== index) return;
        try { video.currentTime = 0; } catch (_) { /* Media may not be seekable yet. */ }
        if (!document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const playback = video.play();
          if (playback) playback.catch(() => {});
        }
      });
    });
    schedule();
  }

  links.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      dots[index].click();
      // Clicking the already-active title also restarts its full display time/video.
      sync(true);
    }, { signal: controller.signal });
  });

  const observer = new MutationObserver(() => sync(false));
  dots.forEach(dot => observer.observe(dot, { attributes: true, attributeFilter: ['class'] }));

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearTimeout(timer);
      slider.querySelectorAll('video').forEach(video => video.pause());
    } else {
      sync(true);
    }
  }, { signal: controller.signal });

  hero.__envHeroCleanup = function () {
    clearTimeout(timer);
    observer.disconnect();
    controller.abort();
  };
  sync(true);
});
