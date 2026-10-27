# Temporary page transition experiment

Stable `src/sd/index.js` and the deployed module URL remain unchanged. The independent entry `src/sd/alternative.js` is a temporary fork of the current navigation engine, built only with `vite.alternative.config.js` into `dist-alternative`. Do not run the stable and alternative entries together. For a Webflow test, replace only the existing navigation module loader with the pinned alternative module and its global selector. Keep the Head, video and contact modal scripts. Publish the site after installing. Keep the classic-only URL below for rollback.

The outgoing page is preserved as an inert visual DOM snapshot without IDs, scripts, reveal targets or live videos. Available video frames are drawn to canvas; otherwise posters are used. Incoming native Webflow modules initialize once against the next page, then the diagonal bottom-to-top clip reveal runs. Authored ENV reveal targets stay hidden behind a scoped visibility gate; their animation engine initializes only after the mask completes, before the gate is removed. Existing per-element delays begin at that point rather than under the mask. Native Webflow interactions are still initialized with page content and are not part of this ENV reveal gate. The snapshot translates upward by 12vh and scales to 1.04 without rotation over 850ms. The incoming clip is measured in viewport pixels (with restored-scroll offset), not percentages of the full document height. A black shade over the outgoing snapshot animates from 0 to 35% on the same clock as both page layers. Menu stacking remains above both layers. Scroll is blocked during the handover. Reduced motion skips the transition. Cleanup restores prior inline root styles and releases the snapshot on completion, failure or abort.

The alternative also includes audited October 26 exports for /sd-2026-grid-a, /work, /about and /press. It accepts the exact current contact and About-mask inline scripts without evaluating fetched JavaScript, preserves the contact form in the persistent menu, and adapts the current Webflow slider runtime. Forms elsewhere and unsupported runtime/custom-code changes retain native-navigation fallback. The site's old root page has no compatible shared menu. Local current-export verification uses lightweight fixture videos and does not measure real media bandwidth or test form submission.

Validation: 112 automated tests pass and the independent alternative Vite build passes. Browser verification on current-export copies: Home → About retains document identity; the contact modal opens before and after navigation. Both mask and classic modes were exercised. Production installation is performed manually in Webflow; the existing deployed loader is unchanged until replaced.

Preview server is in the task's `work/sd-global/server-alternative.py`, port 5203. Enter at /work-v1. Use the main menu to visit About, Press and Home. Closing the preview leaves the production site untouched.

Persistent menu colors are explicitly interpolated for 400ms in either direction around metadata/style replacement, starting from the currently rendered color. CSS transitions are suspended only while resolving the destination palette, then restored. Interrupted color effects are replaced from their visible intermediate color; reduced motion skips interpolation.

## One global selector

Set `window.ENVSDTransition = "mask"` before the navigation module to enable the diagonal mask, outgoing shade and delayed ENV reveals. Set it to `"classic"` for the original 200ms fade-out / 350ms fade-in path, with normal reveal initialization. Missing/unrecognized values default to classic. Selection is read once at startup, remains for all client-side page visits, and changes on document reload. No page attributes are required. The unified test entry retains symmetric menu color interpolation in either mode.

The local server defaults to mask. Open `/?transition=classic` to compare classic mode or `/?transition=mask` to compare mask mode; this query handling is confined to the local preview server, not the production engine. Stable classic-only module remains pinned at `479fdf09cf4fe05867cfd9fc6cb1e4a28cedd3f8/dist/sd-navigation.js`, and its source/build files are untouched.

## Anchor scrolling

Same-page anchors and return-to-top links use smooth scrolling unless reduced motion is enabled. Between-page scroll restoration stays instantaneous so mask measurements remain stable.

Hover video playback restarts at zero on each pointer entry or keyboard activation. Replace the synchronous inline Head video controller to apply this behavior; changing the Footer navigation module alone does not replace an already-installed ENVVideos controller.

In mask mode, each incoming page retains its authored header background. No shared gradient layer is installed or reconstructed on the incoming root. Classic mode retains the shared gradient behavior.
