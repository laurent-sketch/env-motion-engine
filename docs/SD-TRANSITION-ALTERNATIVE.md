# Temporary page transition experiment

Stable `src/sd/index.js` and the deployed module URL remain unchanged. The independent entry `src/sd/alternative.js` is a temporary fork of the current navigation engine, built only with `vite.alternative.config.js` into `dist-alternative`. Do not run the stable and alternative entries together. For a Webflow test, replace only the existing navigation module loader with the pinned alternative module and its global selector. Keep the Head, video and contact modal scripts. Publish the site after installing. Keep the classic-only URL below for rollback.

The outgoing page is preserved as an inert visual DOM snapshot without IDs, scripts, reveal targets or live videos. Available video frames are drawn to canvas; otherwise posters are used. Incoming native Webflow modules initialize once against the next page, then the horizontal bottom-to-top clip reveal runs. Authored ENV reveal targets stay hidden behind a scoped visibility gate; their animation engine initializes only after the mask completes, before the gate is removed. Existing per-element delays begin at that point rather than under the mask. Native Webflow interactions are still initialized with page content and are not part of this ENV reveal gate. The snapshot translates upward by 12vh and scales to 1.04 without rotation over 850ms. The incoming clip is measured in viewport pixels (with restored-scroll offset), not percentages of the full document height. A black shade over the outgoing snapshot animates from 0 to 35% on the same clock as both page layers. Menu stacking remains above both layers. Scroll is blocked during the handover. Reduced motion skips the transition. Cleanup restores prior inline root styles and releases the snapshot on completion, failure or abort.

The alternative also includes audited October 26 exports for /sd-2026-grid-a, /work, /about and /press. It accepts the exact current contact and About-mask inline scripts without evaluating fetched JavaScript, preserves the contact form in the persistent menu, and adapts the current Webflow slider runtime. Forms elsewhere and unsupported runtime/custom-code changes retain native-navigation fallback. The site's old root page has no compatible shared menu. Local current-export verification uses lightweight fixture videos and does not measure real media bandwidth or test form submission.

Validation: 112 automated tests pass and the independent alternative Vite build passes. Browser verification on current-export copies: Home → About retains document identity; the contact modal opens before and after navigation. Both mask and classic modes were exercised. Production installation is performed manually in Webflow; the existing deployed loader is unchanged until replaced.

Preview server is in the task's `work/sd-global/server-alternative.py`, port 5203. Enter at /work-v1. Use the main menu to visit About, Press and Home. Closing the preview leaves the production site untouched.

Persistent menu colors are explicitly interpolated for 400ms in either direction around metadata/style replacement, starting from the currently rendered color. CSS transitions are suspended only while resolving the destination palette, then restored. Interrupted color effects are replaced from their visible intermediate color; reduced motion skips interpolation.

## One global selector

Set `window.ENVSDTransition = "mask"` before the navigation module to enable the horizontal mask, outgoing shade and delayed ENV reveals. Set it to `"classic"` for the original 200ms fade-out / 350ms fade-in path, with normal reveal initialization. Missing/unrecognized values default to classic. Selection is read once at startup, remains for all client-side page visits, and changes on document reload. No page attributes are required. The unified test entry retains symmetric menu color interpolation in either mode.

The local server defaults to mask. Open `/?transition=classic` to compare classic mode or `/?transition=mask` to compare mask mode; this query handling is confined to the local preview server, not the production engine. Stable classic-only module remains pinned at `479fdf09cf4fe05867cfd9fc6cb1e4a28cedd3f8/dist/sd-navigation.js`, and its source/build files are untouched.

## Anchor scrolling

Same-page anchors and return-to-top links use smooth scrolling unless reduced motion is enabled. Between-page scroll restoration stays instantaneous so mask measurements remain stable.

Hover video playback restarts at zero on each pointer entry or keyboard activation. Replace the synchronous inline Head video controller to apply this behavior; changing the Footer navigation module alone does not replace an already-installed ENVVideos controller.

In mask mode, each incoming page retains its authored header background. No shared gradient layer is installed or reconstructed on the incoming root. Classic mode retains the shared gradient behavior.

## Menu scroll background

The home (`/home-sd-2026-vf`, or `/` when used as the homepage) switches after `.hero-wrapper` leaves the viewport. Other pages switch to white at 320 px and retain white until scroll drops below 80 px. The white background uses a separate opacity layer, excluded from page color handover. Reduced motion disables the fade.

History visits that skip Swup animations explicitly release the reveal gate, clean transition scroll locks, resume Lenis and initialize reveals without waiting for animation:in. ScrollTrigger refreshes after destination mounting.

The hero timer supports both layouts: no custom slider navigation, or exactly one custom link per slide. Native slider dots remain required. Disable native Webflow Autoplay before using this timer.

Ordinary page links reset both native and Lenis scroll before Webflow interaction registration, after viewport refresh and immediately before the incoming reveal. History and explicit anchor visits retain restoration. Verified locally from About footer to Press (0 px) and Home VF footer to About (0 px, quote starts at opacity 0.1), with Back restoring Home scroll.

One-time fade-scale reveals on Webflow-animated elements use an independent native scale effect instead of caching GSAP transform. This prevents a hero logo from retaining its restored-scroll translation after loading at the page bottom and returning to the top. Native effects are cancelled on completion/cleanup and reduced motion keeps the existing no-reveal behavior.

The CTA blob pointer controller is installed on page mount and destroyed on unmount. The exact legacy standalone CTA blob script is accepted as an audited inline script, without executing fetched scripts. Remove that standalone script after installing this navigation version; keep the blob CSS and HTML.

Organic canvas blobs marked data-env-blob="orange" are mounted and destroyed with page visits. Keep their HTML attribute and CSS; remove the standalone ENVOrganicBlob inline script. Outgoing canvas pixels are copied before widget teardown so the atmosphere remains visible under the mask.

The `.btn-sd.nav` contact button follows both menu variants automatically. Before `.is-past-hero`, its background and border are transparent with no shadow: white text for the light Home menu (`.nav-link-sd.white` on the brand), dark blue text otherwise. The transparent override applies only at rest (`:not(:hover):not(:focus-visible)`), so the authored Webflow hover and keyboard focus styles remain available on both menu variants. Once the navbar gains its white background, the authored Webflow button styles return. Color/background/border transitions remain smooth, and padding stays unchanged to avoid layout shifts. These rules are injected with persistent menu styles and follow internal page navigation. Remove older standalone CSS overrides for this button to avoid competing rules.


## Procedural hero shapes

The optional `hero-shape.js` module loads only when the incoming page contains `[data-env-hero-shape]`. It generates three morphing volumes with independent pointer inertia and amplitude, no pointer magnification, no image dependency. Mobile uses automatic movement. Offscreen/hidden tabs stop rendering; reduced motion draws a static view. The navigation destroys the instances on unmount and recreates them on return. Existing outgoing canvas snapshots preserve the visible frame.

Add the combo class `hero-motion` to a hero section with an authored height and place this Embed inside it (keep the Embed unpositioned):

```html
<style>
.hero-motion { position: relative; isolation: isolate; overflow: hidden; }
.hero-motion [data-env-hero-shape] { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
</style>
<div data-env-hero-shape aria-hidden="true"></div>
```

No inline initializer or additional script is needed; use the corresponding published alternative navigation module. The shapes render behind the hero content and do not intercept links or scrolling. Pointer events are observed on the containing `.hero-motion` / `.hero-wrapper`, not on the decorative layer with `pointer-events:none`, so hovering text and links still drives the shapes. WebGL failure leaves the green fallback background.


## Menu picto and early scroll

The desktop brand now selects `.main-picto` before the legacy `.nav-link-sd`, then transitions to `.logo-nav` using the authored position and dimensions. Image load and resize recompute alignment. Across all pages, the white navbar layer and normal logo activate after 8px of scroll, and reset at 2px or less; this small hysteresis avoids top-edge flicker. Hero height and the old 320px threshold are no longer used. The contact button's white/dark transparent state follows `.nav-menu-three .nav-link-sd.white`, independent of the brand's former text element. Native hover styles remain active.

The procedural hero background includes a 30% dark-blue (`#11263a`) overlay inside its fragment shader; hero text and interactive content are not dimmed.


The current horizontal picto/wordmark arrangement retains the authored 12px gap. `.main-picto` remains visible at all scroll positions. On scroll, `.logo-nav` fades/slides 10px into its natural position to the right; returning to the top reverses only the wordmark. In the white-link menu variant the existing monochrome picto image is filtered white before scrolling; on the white navbar it uses the bundled `sd-picto-blue.svg`, a copy of the authored white SVG with its path fill changed to `#11263a`. The engine supplies this asset automatically; no Designer SVG replacement is required. Legacy text-brand markup retains its former swap behavior.


## November 4 Webflow runtime update

The published shared core changed from `0e4a7967fd438f05` to `86352264da6a98d3`, then `c4dfe6d040dda842`. The first revision adds the external-scroll-style guard and native dialog/form dismissal behavior; the second removes the unused EDITOR environment enum and renames minified bindings. Navbar, IX2 and IX3 lifecycle contracts remain compatible. Exact additional core URL pairs are listed in `audited-cores.json`; unknown cores still fall back to native navigation. Current Home VF, Work, About and Press profiles and the isolated slider factory were refreshed from their published exports. IX configuration is still extracted as literal data rather than executed.

A persistent CSS default keeps the picto brand's `.logo-nav` at opacity 0 whenever its Web Animations effect is canceled, preventing the authored opacity 1 from flashing between page mounts. The scroll animation overrides this default only when the letters should be visible.


## New primary contact button and mobile project buttons

The navbar `.btn-primary` is transparent only while the menu has no white background and the button is neither hovered nor keyboard-focused. Its two text layers (`.btn-text-main`, `.btn-text-scd`) inherit the appropriate white/dark-blue menu color in that state. Hover/focus and the scrolled white navbar retain the authored `.btn-primary` styling and native text rollover animation. Other primary buttons on the page are not changed. Page handovers include both text-layer colors.

At viewport widths <=767px, `.project-item .btn-sd.more.mobile` is always visible, unshifted and interactive, including on desktop computers with fine pointers. This targets the authored mobile button variant; authored display breakpoints remain in control, and the desktop cursor-follow button is unchanged.


The single mobile `sd-picto.svg` now uses the same bundled dark-blue SVG as the desktop picto, with a white filter only while a white-link navbar is transparent. It does not require a second `.bis` image. Other mobile wordmark assets retain the existing one/two-image behavior. Variant detection is repeated after each page handover.


The later November 4 export uses the additional audited core pair `181a2070a530b302` / `471ffd7ff3ef9f20`. It adds code-island and supporting library modules; the currently published Home, Work, About and Press contain no code-island widgets. The IX2/IX3 and navbar lifecycle entry points remain available, and current page interaction data is still parsed as literal configuration. The slider chunk remains `bdf58efcee47c042`. Initial mount plus Home-to-About mask navigation were verified against fresh published HTML in the local mirror. Unknown future pairs remain subject to compatibility review.


## Functional compatibility gate (supersedes filename-only checks)

Alternative navigation now checks the live Webflow lifecycle before mounting: `require`, IX2 `init/destroy`, IX3 `ready/destroy/getInstance`, the live IX3 instance `register/setFeatures`, and the lifecycle methods of loaded native widgets. It waits up to 4 seconds for the initial asynchronous IX3 instance instead of initializing it a second time. The inspection itself never destroys or restarts the current page.

New shared-core filenames no longer disable transitions on their own when that functional check passes. Such cores must still use immutable hashed URLs on the official site's Webflow CDN. The exact audited URL list remains a legacy baseline, not the sole gate in alternative mode. Destination interaction config remains parsed as literal data, and page layout, shared menu, stylesheet, custom-script and widget compatibility checks remain in place. Unsupported runtime APIs, unknown data syntax and failed reinitialization retain the native navigation fallback. Genuine Webflow API/feature changes can still require an adapter; this is not a guarantee against all future changes.

Verification: regressions for rotated core names, untrusted hosts, missing lifecycle methods, asynchronous readiness and readiness timeout; local mirror Work → Home (four native slider dots, one active) → About with the horizontal mask and no console errors.

### Freeze the outgoing page at navigation start

Mask visits capture the outgoing viewport in `visit:start`, before Swup applies its navigation classes or scroll hooks. During loading and the mask, outgoing-page Web Animations, GSAP tweens and ScrollTriggers are paused without reverting transforms or pin positions; Lenis is stopped. The persistent menu and mask keep their own animations. Incoming reveals retain their existing gate and start after the mask clears. Same-page anchors, classic navigation and reduced-motion visits do not use this freeze. On failed/aborted visits the connected outgoing page resumes; removed page instances are never resumed.

Home's native IX2 scroll targets `.project-row.grid-8` and `.project-work.grid.is-padding` must also be isolated in the frozen snapshot. Their computed appearance is copied first, then their class attribute is removed only from the clone. This prevents a destination IX2 restart from resetting the outgoing grid to its initial blur/scale while the mask is moving; the live page retains its classes.

### Preview the desktop wordmark before scrolling

On fine-pointer devices, entering `.navbar-brand-three .main-picto` previews the same letter reveal used on scroll. It stays open while the pointer crosses into the wordmark and closes when leaving the brand. Keyboard focus previews it too. Only the letter visibility changes: the white background is still controlled exclusively by scroll. After scrolling, letters remain visible on pointer leave. Touch taps and legacy text-brand menus are unchanged. Event listeners are removed on page unmount.

### Read-more arrow hover

The shared injected stylesheet animates images inside `.see-more-bloc` once per hover: 10px up/right with fade out, then re-entry from 10px down/left, over 450ms. Keyboard focus inside the block or on an enclosing link triggers the same effect. Text does not move. Reduced motion disables it. The persistent stylesheet covers fetched CMS items and later page visits without listeners or per-page code.

### Next Project snapshot alignment

The outgoing snapshot now compensates nested `.main-row` containers after top-level sections are aligned and before sticky boxes are frozen. A centered CMS Next Project row could lose its block-parent centering when all resolved sizes were copied, shifting its title/media horizontally inside an otherwise correctly placed section. On the published Marc Jacobs mirror at a wide viewport, the media shifted from x=710.833px to 585.5px; the correction retains x=710.833px and the original y=205.573px. The live layout and hover styles are unchanged. Rows are corrected outer-first so nested layouts do not double-compensate.

### About: explicit page script, no component auto-activation

The global navigation no longer auto-loads `about-reveals.js` when it finds the About component. `about-page.js` is a separate file opted into only by a script tag on the desired page:

```html
<script defer src="RELEASE_BASE/about-page.js"
  data-env-page-animation="about"
  data-env-about-first-end="35"
  data-env-about-last-end="40"
  data-env-about-last-duration="0.95"></script>
```

Replace `RELEASE_BASE` with the same immutable `dist-alternative` release directory as the global engine. Remove the earlier inline test IIFE and older About loader on that page. Keep the SD head, native Webflow interactions and hero logo attributes. Unknown inline scripts are still rejected; incoming executable scripts are never copied or evaluated.

The global adapter copies only declarative `data-env-page-animation` / `data-env-about-*` settings into a metadata marker and loads the known separate module after the mask. On departure it destroys the page module, cancels progress-following tweens and clears the marker; other pages never acquire About effects. On return it initializes the module once. Without the alternative navigation engine, the page script initializes using Webflow's ready queue.

Only `.bloc-big-text > img` is animated. Lines 1–4 and lines 5–6 each have independent start/end, distance, blur and follow durations. All lines retain their authored final placement. The two groups default to:

| Setting | First four | Last two |
| --- | --- | --- |
| start / end (% viewport) | 110 / 35 | 105 / 40 |
| horizontal distance (desktop / mobile viewport fraction) | .42 / .55 | .32 / .42 |
| blur (px) | 20 | 20 |
| follow duration down / up (seconds) | .7 / .55 | .95 / .7 |

Set attributes with prefix `data-env-about-first-` or `data-env-about-last-` and suffix `start`, `end`, `distance`, `mobile-distance`, `blur`, `duration`, `up-duration`. Values are bounded numbers. Each line follows scroll progress with `power3.out` down and `power1.out` up; progress remains continuous when direction changes. These are direction-dependent smoothing curves, not separate automatic animations. Regular text remains exclusively under authored Webflow control. SVG-load/font refreshes are coalesced per animation frame. Reduced motion keeps content visible.

The hero image retains its original `data-env-reveal="fade-scale"`, blur, duration and delay attributes. A transparent layer owns the entrance while the image keeps native IX2 scroll scale/blur, preserving the background and logo placement. ENV entrance effects are cancelled before the module removes its layer. Page-only observers, markers, styles and loading attributes are restored on unmount. One identical duplicate menu inside About is still normalized while the persistent menu stays outside the replaceable root.

Verified locally: Marc Jacobs → Brookfield with an 8-second simulated response delay retains the exact Next Project x/y while the snapshot is displayed; About New → Work → browser Back keeps the same document and mask, clears all About markers/layers on Work, then mounts six line effects and one logo layer on return with no console errors. The repository release does not itself change published Webflow code.

### Freeze native Step interactions during the mask

About's published native IX2 events e-451/e-452 resolve `.step-single-item` by class across the whole document. They drive the child `.bg-services-wrapper` parallax and the card's scale .88→1 / blur 10→0. Pausing GSAP/ScrollTrigger alone does not prevent a destination IX2 restart from registering the frozen copies as new targets.

After copying computed styles, snapshot cards lose only the `step-single-item` and `bg-services-wrapper` targeting classes. Their live originals keep every class and animation. Frozen nodes also lose `data-reveal-text` markers, alongside existing ID/services/reveal sanitization, so destination text interactions cannot split or animate them. The retained inline transform/filter preserve the exact appearance at click, including an entrance that was only partially complete. No Step CSS or authored interaction is disabled on the live page.

Verification: 24 targeted transition/history tests, including destination-style reset simulation and native text marker isolation. On a fresh local mirror, About → Work with a delayed response preserved two Steps at scale 1 / blur 0 and the next at scale .965388 / blur 2.8843px; frozen Step/background selector counts were zero and navigation finished without console errors. The explicit page-only About animation module is unchanged.

### Hover video touch taps

The separately installed Head `videos.js` now starts unlinked `data-env-video="hover"` blocks on touch/pen tap. Linked cards retain navigation on the first tap. Playback restarts at zero and tap activation clears outside the viewport. Replace the Head video controller to opt into this behavior; the global Footer URL need not change. See VIDEOS-EXPERIMENT.md for installation and validation.

### Audited inline About scripts can retain mask navigation

The published About New page kept the full responsive inline story, section clip and hero-release code. The earlier navigation validator rejected those blocks (`Additional inline script needs an adapter`) and deliberately retained native navigation despite `ENVSDTransition="mask"`.

Navigation now recognizes the audited legacy and responsive About script structures plus the separate mask/hero-release blocks. It reads the two plain-data settings objects with JSON parsing and bounded type/field validation. Whitespace/comments and valid firstGroup/secondGroup settings changes are accepted; unknown fields, executable expressions or changed executable logic are not. Unknown inline scripts still follow the existing native fallback. Incoming script text is never executed/evaluated: bundled lifecycle adapters implement the recognized behavior instead.

At initial entry, recognized already-running story/hero instances are retired before mounting one managed instance. At incoming visits, the adapters mount from the destination's profile: hero release and the section mask during page setup, story after the page mask clears. On departure, direction-following tweens/media contexts and hero listeners are destroyed. The logo entrance still uses an independent transparent layer. No body-wide mutation observer is needed by the managed story instance.

The authored full code remains in that page; no about-page.js tag is required in this mode. The responsive version retains mobile opacity .1→1 at ≤767px, desktop left/right+blur, and independent 1–4 / 5–6 settings. The native section clip starts at 15% when the recognized page block is present. Ordinary pages without these recognized scripts acquire no About animation.

Verification: 61 targeted tests pass for recognition/validation, responsive mount, mask snapshots, settings handover and video touch behavior. A fresh local mirror uses the current published About New HTML with its inline scripts unchanged, changing only the global module URL to the local build. About New → Work → browser Back retains the same document and mask with no console warnings/errors; no About logo layers or line elements remain on Work. The published Webflow site itself still needs its global loader URL replaced.

### Incoming fixed About hero participates in the page mask

The current `/about` hero is viewport-fixed while a first-child margin reserves one viewport before the content. The outgoing snapshot moved correctly, but the fixed incoming hero could paint outside the clipped root; the root's positive viewport offset also moved the clip's travel below the visible screen.

During `prepare`, the incoming root temporarily uses `display: flow-root` to contain that first-child margin. Fixed `.section.hero-about` elements are measured before changing the clipping context and temporarily positioned absolutely at the same rendered x/y and size. The clip then reveals the hero and content together. Viewport-to-root clip coordinates no longer clamp away negative offsets. Cleanup on finish/abort restores each hero's exact original inline style and the root's original style. Menu, authored page markup, logo entrance and post-transition fixed/release behavior remain unchanged.

Verification: 36 targeted transition/history/inline-adapter tests pass, including below-viewport roots, fixed-hero preservation, repeated prepare, abort restoration and fixed menu isolation. Fresh published Work/About HTML in the local mirror shows the incoming texture confined to the bottom revealed strip, then restores hero position fixed at y=0 and root clip none. Work → About was also exercised after scrolling, without console errors. Only the global Footer loader URL needs replacement; the existing Head video loader and page-inline About code remain valid.

### About hero release on shorter mobile stories

The managed hero release also checks the following flow section reaching the viewport top and the actual `footer` / `.section.footer` entering the viewport. This covers a short sticky `.about-second` whose top remains positive on mobile. Nested footer class names on text and links are excluded. Returning above all three boundaries restores the hero. The existing page-inline script remains recognized and requires no edits; replace only the global Footer module URL.

Verification: 31 hero/adapter/transition tests pass, including the positive sticky-top case and release reversal. The local published-page mirror confirms a hidden absolute hero at the footer. Physical iPhone verification remains to be done after publishing.


## Navigation responsiveness — 5 November 2026

The alternative entry now enables its bounded, document-local HTML cache by default. An explicit `window.ENVSDPreload = false` still disables speculative work. The stable classic-only entry keeps its previous opt-in policy. Existing Webflow Head/video code does not need replacing for this release.

- After current-page setup, the menu queue starts after 400 ms and fetches at most three unique destinations, with at most two HTML requests at once. It includes the brand/Home link and skips the current page. Hover, focus and pointer-down can anticipate a destination. Data Saver and reported 2G still suppress speculative fetches.
- Cached HTML expires after five minutes, with at most eight pages retained for the current document. Nothing is stored across reloads. No project video or image is prefetched by this queue.
- Native interaction data is prepared from the official immutable bootstrap first, then checked shared chunks if required. This avoids downloading several non-data chunks in sequence before finding current-page timelines. All origin/site checks and static data parsing remain intact; fetched JavaScript is never executed.
- Destination-specific ENV scripts may be fetched through `rel=prefetch` before a real visit. They execute only through the existing validated page mount.
- A click reuses a pending preload for at most 180 ms. A slower speculative request is aborted and Swup continues with its normal navigation request, rather than waiting up to the preloader’s four-second timeout. Late aborted responses cannot populate the HTML cache.
- In mask mode, the frozen outgoing snapshot stays spatially stationary during preparation; only a subtle shade (up to 8%) starts immediately. Its upward movement and the incoming horizontal mask start together on one 850 ms clock. The shade continues from its visible opacity. This removes the earlier small departure followed by a second acceleration. Cold network visits can still wait for destination readiness; this is responsive feedback rather than a promise of zero network latency.
- Failures/aborts cancel both early effects and the main mask, restore incoming styles and release scroll locks. Reduced motion skips both. The menu remains persistent.

Targeted regression coverage includes bounded parallelism, reuse of fast pending fetches, stalled fetch promotion, late-response suppression, disposal cancellation, early departure continuity and recovery. Browser checks are recorded with this release separately from public-site installation: installing still requires replacing the Footer pin and publishing Webflow.


The outgoing snapshot now resolves full visual styles only for elements within a buffered viewport, their ancestors, and the page’s structural boxes. Offscreen split words remain outside the painting region; fixed descendants are included using their own rendered bounds even when their parent is offscreen. Each full style is written as one CSSOM assignment rather than hundreds of individual mutations. Visible sections/rows/sticky boxes retain position correction.

Local Webflow-export checks (fixture video substituted): About-at-top capture measured 645 ms before the viewport optimization and 41 ms afterward; this is capture preparation only, not a claim about total public-site latency. Work footer → About retained the outgoing footer top exactly at −0.143229 px in the first snapshot, with the same document identity. Menu HTML cache reuse was verified via the local server request counter. The current public Webflow site continues to use its previous immutable pin until installation.

The hero controller and its page-mount condition now select only inside the live `#env-sd-page` (with standalone fallback when there is no navigation root). An outgoing Home snapshot can no longer trigger a redundant hero script or be mistaken for the incoming slider during About/Work mounting.

## Promoting an audited page to Home — November 5

Alternative navigation resolves an audited Webflow page by its same-site data-wf-page identity when its new pathname conflicts with a historical route profile (for example Home VF moved to `/`). All native runtime, CSS, widget and inline adapter checks remain active. An unknown page identity replacing a known route still falls back to native navigation. This avoids the previous `Uncertified page` on the new Home without disabling validation.

## Lower Work rows — November 6

At deeper scroll positions, the frozen outgoing page could lose a row gap (observed about 112px on DXC), while the first project rows remained aligned. Snapshot preparation now resolves styles for all structural Work/Home project rows and native-targeted Work cards even outside the viewport before removing their interaction classes. Visible `.project-work` and `.project-row` containers receive the same outer-first position correction as `.main-row`. Distant video elements keep a sized inert box without drawing/loading an irrelevant frame or poster; the viewport buffer still includes the 12vh departure travel. Live page markup, hover playback and incoming project media remain unchanged.

Regression checks cover offscreen grid geometry, visible row alignment and distant video placeholders. Local browser check on the current Work/DXC HTML: clicked DXC card y=-372.385px, frozen y=-372.406px before departure (about 0.02px drift). Source videos use local control MP4s in this copy; verify the installed release on Webflow after republishing.

## Responsive project images — November 6

Some published project images have `sizes="144px"` while CSS displays them across a full-width row, so the browser selects a 500w thumbnail even when the source asset is 5376px. The alternative engine now corrects fixed pixel `sizes` values for `img.image-project[srcset]` and `img.cover-project[srcset]` inside the live page root. It uses the untransformed CSS client width, retains `srcset`, source URLs, lazy loading and authored media-query sizes, and observes responsive layout changes with ResizeObserver (resize fallback where unavailable). Hidden images wait for a positive layout width. News images and external/persistent nodes are excluded.

Installation runs before the first-visit loader prepares images and immediately after destination replacement, as well as through idempotent page mounting. Teardown disconnects observers without restoring incorrect sizes or touching frozen transition copies. Scope includes project covers on Home/Work if they have the same incorrect fixed sizes; no original 5K asset is forced.

Browser check on a local copy of published Brightspeed: a full-row image at 1360 CSS pixels / DPR 1.5 selected its 2600w AVIF instead of the previous 500w variant. Unit regressions cover adaptive widths, hidden and detached images, preserved media-query values, lazy loading and exclusion of News/outside nodes. The public site still requires installing the new immutable Footer URL and republishing.
