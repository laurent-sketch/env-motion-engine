# Experimental Background Video loading, without replacing Webflow components

## Install only on preproduction initially

Place this as the FIRST executable script in Webflow's Head code, without async or defer:

```html
<script src="https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT/dist/videos.js"></script>
```

Replace COMMIT with the pinned published revision. Keep the existing Background Video elements, their wrappers/classes/posters, the native Webflow script, ENV animations, News loader, and hero navigation script. Do not put this in the footer: requests already started cannot be undone. A synchronous head script itself adds a loading dependency, so retest the net effect, not just video count.

Scope is Background Videos inside `.sd-slider` or `.item-video`, including the extra background video outside the project links on SD. Other video elements remain untouched.

## Behavior

A MutationObserver starts before body parsing. It captures added video/source nodes, removes autoplay and src from deferred videos, retains source URLs privately, and keeps posters visible. Projects load within 300px of the viewport and play when visible. The hero loads its active slide, then prefetches the next 1.5 seconds after media readiness. Inactive slides and offscreen projects pause. Prefetch can be disabled by `data-env-video-prefetch-next="false"` on `.sd-slider`. Hidden-tab and reduced-motion preferences are respected. Restoring motion preferences while a project is visible triggers its load/play.

The script does not reset currentTime: the existing hero navigation script retains ownership of replay-on-selection. Once a video is hydrated, its sources remain assigned; returning does not explicitly reload it. No methods on HTMLMediaElement are monkey-patched.

`window.ENVVideos.audit()` reports managed video states and a best-effort flag for possibly late interception. This flag is not proof that no request occurred: validate requests at the server/browser network level. `destroy()` removes observers/listeners and restores deferred sources/autoplay/preload/poster/ARIA, which may cause the original autoplay downloads to resume. With no IntersectionObserver support the interceptor does not activate.

## Verification and limits

On a local copy of SD's published HTML, retaining the external Webflow runtime and scripts, media source URLs were redirected to instrumented local endpoints serving one control MP4. Before interception, the initial log contained 10 media requests across 4 distinct URLs. With the head interceptor, the initial log contained 2 requests across 2 URLs. Deferred project sources remained absent; scrolling loaded/played the first project; selecting another hero title loaded/played its slide. These are request-count/behavior checks in the available browser, not a measured saving of production megabytes and not Lighthouse results. The media payloads were control files, not the site's original ten videos.

Unit checks cover staging, poster retention, nearby vs visible behavior, active hero selection, new source insertion and teardown. Browser speculative loading can race a MutationObserver; zero early downloads on every device/browser is not guaranteed. Real CDN assets, Webflow initialization order, mobile Safari and throttled conditions need preproduction verification. No public staging change has been performed.

After installing and publishing to the same staging URL, verify posters, native cross transitions, manual selection, scroll loading and the absence of concurrent unwanted playback. Then repeat PageSpeed mobile/desktop against the earlier baseline: mobile 73, LCP 3.9s, 44,842KiB; desktop 95, LCP 1.1s, 53,747KiB. Compare resource transfers as well as score. A later partial-load score must not be presented as a guaranteed score gain.


## Opt-in hover projects (V2)

Add `data-env-video="hover"` to individual `.project-item` elements that contain `.item-video` and `.cover-project`. Install the updated complete videos.js inline synchronously in head, replacing the old inline interceptor. Do not add a second interceptor or defer it. No env.js update is required for this feature.

Unmarked projects retain the original near-viewport hydration/visible playback. Hero behavior is unchanged. On hover-capable fine-pointer devices, marked projects hydrate only on pointer entry (or keyboard focus-visible), play only while visible and hovered/focused, and pause on exit or page hide. `.is-env-video-playing` is set on actual `playing`, not on pointer entry. The injected scoped cover rule keeps `.cover-project` opaque until then, including during buffering or failures. Existing cover fade transitions remain responsible for timing. Removing the pointer pauses without resetting currentTime, so another hover resumes. A previously hydrated video may continue buffering after pause; there is no promise that leaving aborts network transfer.

On touch/coarse-pointer devices and with reduced motion, hover projects retain their covers and sources stay deferred. The project link remains unchanged: no first-tap interception. Do not set this attribute on projects without a cover. This setting is static at initial capture: set it in the Designer before publishing, rather than toggling via late JS.

Verification: 55 tests, including unchanged unmarked project and hero behavior, opt-in source deferral, readiness-gated cover, late playback after pointerleave, touch and reduced motion. Browser fixture: unmarked video plays on visibility; marked video has no source until pointer entry, reveals cover on actual playback, pauses and restores cover on exit while unmarked video continues.
