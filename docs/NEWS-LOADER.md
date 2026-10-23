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

Automated regressions cover mode changes, pending loads, CMS wrappers, restoration and empty collections. The current CMS adapter is tested on the published Home V2 structure. Physical iPhone touch remains a separate device check.

Both modes zero margins and paddings on the container and track. Spacing between cards remains controlled by data-env-news-gap. The marquee does not inject a Play/Pause button. Outer section/ancestor spacing is owned by Webflow and is not modified.


## Webflow CMS Collections

Both engines accept the original direct wrapper and this native CMS structure:

```text
.swiper-news [data-env-news="marquee" or "swiper"]
└── .w-dyn-list                  Collection List Wrapper
    ├── .swiper-wrapper-news.w-dyn-items   Collection List
    │   └── .swiper-slide-news.w-dyn-item  Collection Item
    │       └── card content bound to CMS fields
    └── .w-dyn-empty             optional empty state
```

Keep the mode and speed attributes on `.swiper-news`; no new custom attributes are needed. Marquee measures and clones the Collection Items inside the existing list. Swiper mounts on `.w-dyn-list`, so the Collection List remains its direct wrapper without moving CMS nodes. Manual arrows remain in the surrounding section. Both modes restore authored styles when switching/destroying. The empty state remains readable if no items are published.

This uses the CMS items rendered in the current published page. It does not automatically fetch later pagination pages. After a separate client-side filtering/loading plugin changes the items, refresh the News engine; such integrations are not part of this adapter. CMS links must be bound to their intended URL field: a published `href="#"` remains a placeholder.


## Automatic alternating media formats

Set `data-env-news-layout="alternating"` once on `.swiper-news`, beside the existing mode and speed attributes. No CMS field is needed. Original Collection Items receive a repeating `data-env-news-shape` sequence before the selected driver mounts: `big-square`, `small-square`, `landscape`, then repeat. Loop clones inherit their original shape, so a group with a non-multiple-of-three item count still repeats without a format mismatch at the seam. Disabling the layout restores authored shape attributes.

The defaults follow the manual Home: large square 420×420px and landscape approximately 775×436px. The compact square is explicitly set to 320×320px (a proposed size; the old `_1-1` class only declared a ratio). Mobile widths are 85vw, 70vw and 92vw respectively, preserving square/16:9 ratios. Only opted-in News have their media wrapper sizing and image cover rules overridden. Existing CMS `_1-1-big` combo classes can remain; the attribute-scoped rules override their dimensions.

For custom sizes, define these variables on the opted-in root in your CSS: `--env-news-big`, `--env-news-small`, `--env-news-landscape`. Put custom overrides after the loader styles or use a more specific selector. A CMS reorder automatically changes the next published layout sequence. After client-side reordering, call `ENVNews.refresh()` to reassign the indices and remeasure the loop. A mode change reuses the same layout sequence for marquee or Swiper.
