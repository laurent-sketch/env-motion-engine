# Alternative News marquee

Standalone `public/news-marquee.js`, copied by Vite to `dist/news-marquee.js`. No GSAP or Swiper dependencies. This is an alternative to the News Swiper, not a script to run alongside its initializer on the same container. No hero slider changes.

## Install on a test page

1. Keep the existing `.swiper-news > .swiper-wrapper-news > .swiper-slide-news` markup, card widths and image styles.
2. Disable the News `new Swiper(...)` initializer on that page. If keeping it globally, add this immediately after finding its container: `if (container?.getAttribute('data-env-news') === 'marquee') return;`.
3. On `.swiper-news`, add `data-env-news="marquee"`.
4. Load the new classic script before `</body>` using a CDN URL pinned to the published commit: `https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT/dist/news-marquee.js`.
5. Keep the separate ENV animations script. The alternative does not need the Swiper library, though it may remain if another widget uses it.

The opt-in attribute is mandatory. Without it, the script leaves the page alone. It refuses to mount over an active Swiper instance. Disable legacy Swiper autoplay/navigation for this container by disabling its initializer, rather than combining both engines.

## Options on the container

| Attribute | Default | Meaning |
| --- | --- | --- |
| `data-env-news-speed` | `25` | Automatic leftward movement in pixels per second |
| `data-env-news-damping` | `8` | Exponential position response, per second; lower is softer, higher follows more tightly |
| `data-env-news-gap` | Existing CSS gap, otherwise `16` | Space between cards, in pixels |

Desktop hover decelerates the autoplay to zero; leaving resumes it. Keyboard focus on card content also pauses it. Drag holds the autoplay target and follows the hand with time-based damping; release settles the remaining distance without a velocity-projected fling. Horizontal trackpad gestures navigate, vertical gestures keep scrolling the page. Touch uses horizontal axis intent and retains vertical scrolling and pinch zoom. A drag threshold suppresses accidental link clicks.

The content is repeated enough to cover the viewport plus the loop boundary, even when the source group is short. The repeated group includes spacing at the seam. Duplicate IDs and animation attributes are removed; duplicate content is hidden from screen readers and removed from tab order. Native anchor links in copies still work; use delegated listeners for custom card actions, since arbitrary direct JS listeners are not cloned. Videos in copies do not autoplay.

A Pause/Play button is added with `.env-news-pause`, which can be restyled. Existing `.swiper-button-prev` / `.swiper-button-next` in the same section remain manual controls; there are no terminal ends. Left/right arrow keys also work when the carousel container itself has focus. Reduced-motion users get manual navigation; they may explicitly select Play. Motion pauses offscreen and in hidden tabs.

Responsive measurements resolve authored card widths against the viewport before creating the repeated track. This supports percentage and viewport widths. `window.ENVNewsMarquee.refresh()` remeasures widths; `destroy()` restores authored styles and controls and removes copies/listeners/animation frames. `init()` mounts opted-in uninitialized containers. Adding/removing source cards requires destroy then init.

Local visual comparison: `news-alternative.html` next to the existing prototype, using its assets. Tests cover duplicate semantics/cleanup, autoplay/hover, horizontal wheel, reduced motion, and refusal to override Swiper; native browser drag additionally checked for movement and click suppression. Physical mobile touch and a physical trackpad still need device testing.
