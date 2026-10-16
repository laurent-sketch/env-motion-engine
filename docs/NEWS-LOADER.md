# One News loader, two modes

The animation script (`animations.js`) stays independent. For the News carousel use only `news.js`, which selects a driver from the container attribute and loads its dependencies on demand.

```html
<script defer src="https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT/dist/news.js"></script>
```

Pin COMMIT to the published revision. The loader resolves the sibling `news-marquee.js` from the same pinned URL. Swiper mode reuses an existing global Swiper or downloads the Swiper 12 bundle and its CSS. Marquee mode needs neither Swiper nor GSAP. The source/build files for both drivers remain separate for maintenance; Webflow needs one carousel script tag.

On `.swiper-news`, use exactly one custom attribute:

| Name | Value | Behavior |
| --- | --- | --- |
| `data-env-news` | `swiper` | Original card slider, free widths, arrows, horizontal trackpad; no autoplay/loop by default |
| `data-env-news` | `marquee` | Continuous autoplay, seamless loop, damped drag, hover/focus pause |

Remove the old News initialization block and the direct `news-marquee.js` script. Keep ENV animations and the separate native hero navigation script. The Swiper library itself may stay if other widgets use it; it does not initialize the News container on its own. Existing card styling and the original class hierarchy are retained.

Changing `data-env-news` is enough to select the mode; publish Webflow after editing the attribute in the Designer. The loader also observes runtime changes to that attribute, cleaning the previous driver before mounting its replacement. Invalid/missing values keep the container inactive. An active Swiper from an external initializer produces a warning instead of installing a competing engine.

Shared option: `data-env-news-gap` in pixels (Swiper defaults to 16; marquee uses authored CSS gap or 16). Swiper-specific: `data-env-news-transition` in milliseconds, default 700. Marquee-specific: `data-env-news-speed` in px/s, default 25, and `data-env-news-damping`, default 8. See NEWS-MARQUEE.md for details. Driver option changes other than mode take effect after `window.ENVNews.refresh()` or page reload.

`window.ENVNews.init()` discovers new containers. `refresh()` remounts current selections, and `destroy()` disconnects mode observers, invalidates pending asynchronous loads and tears down owned drivers. It does not remove globally loaded vendor libraries that may be used elsewhere.

Local comparison page includes Swiper/Marquee controls. Validation: 41 tests pass, including selection, repeated initialization and discarded asynchronous initialization after mode changes. Native browser confirmed Swiper initialization, arrow movement, a return to marquee with one Pause button and the expected copies, and no warning/error logs. Physical mobile/trackpad checks remain to be performed on devices.
