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

### About component: isolated scrub and logo entrance

The global alternative loader downloads `about-reveals.js` only if `.section-animation-about` or the published `.section.hero-about + .section.about-second` group is present. Roots outside `#env-sd-page` and outgoing mask snapshots are excluded. No About targets are created on other pages.

Only `.bloc-big-text > img` is animated: alternating horizontal travel of 42vw desktop / 55vw mobile, capped at 720px, opacity 0 → authored opacity, `power2.out`, `scrub: .6`. Start/end are the line's layout position at 110% / 65% viewport height, measured relative to the untransformed story root. Webflow's translated section does not feed back into the measurements. Authored alignment is preserved; regular-text elements, gradients and native small-text animations are untouched. Image-load/font refreshes are coalesced per animation frame. Reduced motion shows content immediately; without GSAP a one-time viewport reveal remains available.

The hero image keeps its Designer attributes (`data-env-reveal="fade-scale"`, `data-env-blur`, `data-env-duration`, `data-env-delay`). The component inserts a transparent grid layer around the logo, keeping its authored size and centered position. ENV entrance opacity/scale/blur animate this layer; native IX2 continues to own the image's scroll scale/blur. The background is not faded. These independent layers allow scrolling during the entrance without two engines overwriting the same properties.

On navigation, ENV entrance effects are cancelled before component contexts/layers are reverted. Mask visits initialize reveals after the mask clears. There is no whole-document mutation observer. One structurally identical menu copy inside the About main wrapper is removed when the persistent menu already exists outside it; different secondary navigation and other pages are left alone.

**Installation:** replace the global `sd-navigation-alternative.js` URL with this release and remove the former page-inline About scrub IIFE (the one containing `const lines = [...root.querySelectorAll(".bloc-big-text > img")]` and `ENVAboutReveals?.destroy()`). Remove any separate `about-reveals.js` loader as well. Do not remove the logo's attributes, native Webflow interactions, contact-modal script or SD head block. Arbitrary inline code is still rejected by navigation validation; this integration does not weaken that check. Publish the affected pages together so their shared stylesheet stays consistent.

Verified with 63 targeted tests, plus a fresh local mirror of the published pages: About New → Work → browser Back retains the document and mask, mounts six scrubbed lines and one logo layer, and leaves zero About layers/line markers on Work. Duplicate menu/form count changes from two to one on About. The Webflow site itself is not modified by the repository release.

The desktop `.logo-nav` wordmark uses the same white filter as the picto on the transparent light menu. It returns to its authored blue asset when the navbar has its white background. The transparent dark-menu variant keeps the blue wordmark. Hover/focus affects visibility only; reduced motion disables the filter transition.
