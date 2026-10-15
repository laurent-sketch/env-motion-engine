# Animations only — any Webflow site

`public/animations.js` is an independent classic script, copied to `dist/animations.js` by Vite. It imports no pilot, navigation, FAQ, Swiper, or Motion package. It uses the site's global GSAP (3.13+) and optional SplitText (3.13+). Without SplitText, text uses a block reveal. Without GSAP, content stays visible.

After merging, pin the CDN URL to the merge commit. Place this after the site's GSAP and SplitText scripts, before `</body>`:

```html
<script defer src="https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT/dist/animations.js"></script>
```

Replace COMMIT with the full published commit hash. The script waits for load and fonts. Never add another GSAP instance if Webflow already provides it. Do not run this script alongside the pilot reveal module on the same attributed elements.

| Webflow custom attribute | Value | Effect |
| --- | --- | --- |
| `data-env-text` | `lines` | Masked line reveal |
| `data-env-text` | `words` | Staggered word reveal |
| `data-env-text` | `chars` | Staggered character reveal |
| `data-env-reveal` | `fade-up` | Fade + 24px upward reveal |
| `data-env-reveal` | `fade-scale` | Original ENV fade + scale 0.99 → 1 |

Optional attributes: `data-env-delay`, `data-env-duration`, `data-env-stagger` (seconds). Duration controls text/fade-up; fade-scale retains the original two-track timing. Total text stagger is capped at 1.2 seconds. Apply text attributes to an individual heading/paragraph, not a rich-text container. Text containing links or controls animates as a block to preserve their semantics.

Remove competing Webflow interactions from attributed targets, and keep their normal style visible. No global CSS hiding rule is needed. A reveal runs once, including for initially visible targets. Reduced-motion users see normal content. SplitText restores the original markup after completion and recalculates lines during animation on resize. Existing classes retain all styling responsibilities.

Targets inside Webflow sliders, initialized Swipers, or `[data-env-ignore]` are excluded. Nested animation targets are skipped to avoid duplicate opacity/transforms: attribute either the parent block or its individual text children. Generic usage is independent of site-specific class names.

`window.ENVAnimations.refresh()` registers newly inserted targets and restores interrupted animations. `window.ENVAnimations.destroy()` removes observers, tweens, splitting, and preference listeners. Refresh does not replay targets already started.

This script does not install dependencies, manage sliders, or intercept links. Unit checks cover initialization, split cleanup, exclusions and reduced-motion cleanup; verify actual typography and animation appearance on each published site.
