# SD loader and HTML cache trial

This opt-in trial lives on `feature/sd-preload-loader`. Stable rollback version: `0b28f2994c37e34557b78dd2ee4fec67b9213059`. Existing pinned scripts remain unchanged.

## Install

Add the contents of `public/sd-loading.js` inside a synchronous inline `<script>` at the top of the existing global Head. Keep the existing reveal gate, early video interceptor and custom styles. Replace only the global Footer navigation module URL with the pinned trial version. Publish all pages.

The Head snippet opts in with `window.ENVSDPreload = true`. Without it, this build retains the original uncached navigation behavior.

## Behavior

- A 3px blue indeterminate line at the top of the viewport appears on the first document load per tab session. It does not cover or hide content and does not wait for background preloads. It disappears when the current page is prepared, or after six seconds if startup fails. Reduced motion disables its animation.
- A ready signal marks the tab session as initialized. A new session may show the line again; it does not appear on Swup page transitions.
- Swup uses its in-memory HTML cache. Entries expire after five minutes and are capped at eight. Reloading the document clears the cache; no service worker, localStorage page cache or cross-session stale HTML.
- After page initialization, wait 1.2 seconds, then preload at most three unique internal destinations from the main menu, sequentially. Menu pointer/focus intent can also preload a destination. Pause the automatic queue during navigation or while the document is hidden.
- Only HTML strings are fetched. No DOM insertion, parsing, script execution, image/video warm-up or analytics page-view for a preload. Assets still load when a real visit inserts the page.
- Respect data saver and reported slow-2g/2g connections. Ignore external links, hashes, queries, downloads, targets, file extensions and `data-no-swup`. Redirects/non-HTML/failures are not cached by the preloader.
- A click arriving during a preload reuses the pending request rather than starting another HTML request. Normal page compatibility validation and native fallback remain active when visiting cached content.

## Rollback

Remove only the loader/preload Head addition. Restore the stable Footer URL pinned at `0b28f2994c37e34557b78dd2ee4fec67b9213059`, then republish. Leave the existing global Head intact.

## Validation

Automated coverage: bounded menu queue, duplicate/cache reuse, no media DOM creation, data saver, external/query exclusion, in-flight click reuse, expiry, first-load session marker, loader ready signal and timeout.
Browser test on local copies of published exports: Home V2 preloads Work V1/About/Press once each; clicking Press sends no new HTML request and preserves the document/menu. Fixture videos are substituted; this validates cache behavior, not production media performance.
