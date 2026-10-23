# SD global navigation

Install `public/sd-head.js` inline in the global Webflow Head, then the existing `public/videos.js` inline immediately afterwards. Keep the CSS and native Webflow scripts. Install the single module loader from `SD-FOOTER.template.html` in the global Footer. Replace COMMIT_SHA with the published revision. Remove former ENV/brand initializers from page settings and Embeds. Do not add Swup separately.

The engine now considers every same-origin page link, with no Home/Work pathname allowlist. Hash navigation, downloads, external links, targets and `data-no-swup` retain their native semantics. The SD navbar remains in place. Its white/dark color variants, logo image sources and link destinations follow the incoming page, while `.is-past-hero` is recalculated from the incoming hero. Reveals, hero slider, News, videos and native slider/navbar/dropdown/tabs restart for the destination. Old observers, video records and animations are released.

## Shared page contract

Pages need `.navbar-logo-center` with matching link/image structure and a direct `body > main.main-wrapper`. The optional direct `.section.footer` joins the replacement container automatically. No manual Swup wrapper is required. Pages copied from this structure can use arbitrary paths, including nested project paths, as long as their Webflow runtime matches a verified profile. Page-specific styles, body class, page ID, metadata and title follow the destination.

The currently verified exports are `/home-sd`, `/home-sd-v2`, `/work-v2`, `/work-v1` , `/project-page`, `/about` and `/press`. Their IX2/IX3 data are identical; `scripts/snapshot-sd.mjs` verifies this before updating snapshots. Unknown paths are accepted by matching the shared runtime and site, not by their name. Changed runtime exports or interaction payloads require a new snapshot/build. The audited optional native slider factory is registered if the entry page omitted it; this uses Webflow internals and must be checked after Webflow runtime updates.

## Pages requiring adaptation

The current `/`, `/cookie-policy` and `/privacy-policy` exports belong to the older site structure: no shared SD navbar/main, and several independent legacy scripts. They cannot keep the SD menu without first adopting the shared layout and migrating those scripts. These pages load normally rather than silently losing their scripts. Forms, Spline and unknown inline scripts also cause native navigation until an adapter exists. Additional third-party/custom page scripts need explicit lifecycle support, since fetched inline scripts are never blindly executed.

## Loading and motion

Head preparation hides only reveal targets, leaving the menu and media/background visible, and fails open after five seconds. Webflow readiness starts the engine without waiting for window.load; animation preparation starts at DOMContentLoaded and waits at most 500ms for fonts. Hero setup and animation preparation load in parallel. Reduced-motion visitors skip entrance/exit fades. The first page waits for animation preparation, then reveals; subsequent pages use the existing reveal system. Lenis remains a singleton. Back/forward scroll is restored. Existing gtag receives a page_view after successful transitions; check analytics settings to avoid automatic duplicate history pageviews.

## Validation

79 automated tests and production build pass. Browser fixtures use the published HTML/CSS/fonts/images with a small local video to isolate lifecycle behavior; real video transfer performance and physical-phone touch behavior need separate verification. Installation alone does not rewrite incorrect authored links in Webflow: the persistent menu deliberately adopts those links from each destination.

## Rollback

Replace the global module loader with the former ENV/brand loader and remove Head boot preparation. Preserve the video interceptor if still wanted. Republish the site.

The native-navigation fallback keeps the Head reveal gate until `env:animations-ready`. If initialization or the watchdog times out, visible reveal targets are shown once and skipped by a late entrance instead of being hidden again. Verified with a frame audit of the hero logo in normal and forced-fallback fixtures; neither was visible before animation preparation.

## Responsive Home menu (23 October 2026)

On tablet/mobile (up to 991px), the light Home's `.logo-mobile` contains a white `.logo-nav` and a blue `.logo-nav.bis`. The engine injects scoped CSS that crossfades these images on `.is-past-hero`, puts the blue image in the same position without shifting the layout, and turns only `.burger-menu-wrap .line-burger` dark blue. The divider lines inside the menu modal are not affected. The single blue logo on inner pages remains unchanged. Reduced motion disables these transitions.

The persistent mobile brand link is retained across navigation. Its logo images may change from two to one and back; image synchronization now matches the desktop brand, mobile brand and modal texture separately. Burger white variants and the optional mobile contact underline follow the destination page. The header color controller runs even if the desktop Boutique Scale markup is missing or hidden. The existing global Head does not need to change for this update: replace only the module URL in the global Footer. Keep the authored `.logo-nav.bis` blue asset on light Home pages.

News marquee touch input now uses a dedicated Touch Events stream with a non-passive horizontal move handler, immediate finger tracking and coarse-pointer hover guards. See NEWS-MARQUEE.md for gesture behavior and physical-device verification limits.

News supports the CMS Collection List wrapper in both marquee and Swiper modes; the global loader initializes either structure without an extra page-specific script.

The News root may opt into `data-env-news-layout="alternating"` for automatic positional media sizes, without per-item CMS fields. See NEWS-LOADER.md.

The persistent mobile modal also adopts the destination `.menu-modal.darker` background and `.link-overlay.dark` text variants on every page transition, retaining its nodes and native animation styles.

CSS-only Webflow publishes are accepted at startup when the audited JavaScript runtime still matches. Incoming pages must share the exact stylesheet URLs already loaded in the active document; incompatible page styles still use native navigation.

Optional native slider registration is shipped as `sd-slider.js`, containing only audited factory 4345 from the published Webflow export. It registers into the active shared runtime without executing a second page bootstrap. `scripts/snapshot-sd.mjs` regenerates this asset with the runtime snapshot.

## Persistent inner-page gradient

`src/sd/gradient.js` moves the rendering of the authored `.hero-wrapper.gradient-blue` background into a single `#env-sd-gradient` layer outside `#env-sd-page`. It copies computed Webflow background properties and measures the actual header rectangle; no hardcoded gradient colors or header heights. The original background is suppressed and its main wrapper made transparent only while adapted. Article/media gradients remain unchanged.

Between inner pages, the layer stays at opacity 1 while the content fades; its height adapts over 350ms. ResizeObserver/window resize keep mobile/tablet measurements aligned. Entering/leaving a page without the authored gradient (Home) fades this layer in/out once the incoming content is prepared. Normal document scrolling is preserved: the gradient remains at its header's document position, not fixed over the full page. Reduced motion removes layer transitions. Cached initial markers are cleared before reading authored styles, and generated gradient styles are excluded from incoming page-style cloning.

Install by replacing only the global Footer module pin; the Head/loader/video blocks stay as installed. Prior pinned version for rollback: `81c1057ffc5663e271be4ff8012e90a5d3cf5bed`.


Runtime snapshot updates accept page-scoped IX3 additions when the IX2 runtime remains identical. `scripts/merge-sd-configs.mjs` deduplicates common interaction/timeline IDs, retains the original page scopes, accepts extra interactions only for known audited page IDs, and rejects conflicting definitions or missing timelines. On 23 October the current Work V1 export added a scoped native text-color interaction; it stays limited to Work rather than preventing the refreshed Home runtime from booting.
