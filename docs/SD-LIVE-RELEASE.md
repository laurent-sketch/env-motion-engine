# Webflow preproduction — fixed URLs

Channel branch: `webflow-live`. Created at the user's request on November 5, 2026.

Replace the existing videos.js Head tag once, at the same early synchronous position:

```html
<script src="https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@webflow-live/dist-alternative/videos.js"></script>
```

Replace only the global navigation Footer block once:

```html
<script>window.ENVSDTransition = "mask";</script>
<script type="module" src="https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@webflow-live/dist-alternative/sd-navigation-live.js"></script>
```

Keep existing loading Head and optional page animation scripts. Do not install a second video controller or second navigation engine. The live entry imports the tested immutable release, currently `12686923c8db1546da83279d7f142237a828c85d`; its lazy modules therefore stay pinned together rather than mixing mutable CDN versions. The standalone video controller stays behind the fixed channel URL.

## Future updates

For this user's Webflow preproduction, maintain these fixed installed URLs. Build and validate a release; push its immutable commit first. Update the import in `public/sd-navigation-live.js` to that commit and build/copy it into `dist-alternative`. Commit the live entry and corresponding standalone public assets, push the working branch, then fast-forward `webflow-live` to this tested commit. Never force-overwrite unrelated channel changes; inspect the remote first. Verify the served live entry, pinned modules, and video bytes against the release. Do not claim that Webflow has been republished or that every visitor has the new cache until observed.

jsDelivr documents a 12-hour cache for branch URLs: https://www.jsdelivr.com/documentation. Browser cache can also retain the response. Purge only through supported jsDelivr tooling when available, and verify the actual served bytes. Do not promise immediate propagation. A fixed channel deliberately permits remote changes without another Webflow publish; roll back by publishing a new channel commit that imports a known-good immutable release and restores its video controller, with the same cache limits.

Immediate manual fallback: the previous immutable Footer is `12686923c8db1546da83279d7f142237a828c85d/dist-alternative/sd-navigation-alternative.js` and the tested video controller is `1350098898b43e954eb4daaa91fa5ee79539fe01/dist-alternative/videos.js`.
