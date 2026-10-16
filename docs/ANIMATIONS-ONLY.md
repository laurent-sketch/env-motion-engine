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
| `data-env-text-effect` | `fade` | Opacity only; no movement or scale |
| `data-env-text-effect` | `up` | Fade + upward movement (default) |
| `data-env-text-effect` | `scale` | Fade + scale 0.98 → 1; no vertical movement |
| `data-env-reveal` | `fade-up` | Native browser preview reveal: fade + 16px upward reveal, 0.75s, cubic-bezier(.2,.65,.2,1) |
| `data-env-reveal` | `fade-scale` | Original ENV fade + scale 0.99 → 1 |
| `data-env-trigger` | `scrub` | Progress follows scrolling in both directions |

Without `data-env-trigger="scrub"`, the original one-time reveal remains the default. Scrub works with all text effects and block reveals. It requires global GSAP ScrollTrigger loaded before this file; if unavailable, the target uses a one-time reveal with a console warning. No automatic dependency download occurs.

Example: add `data-env-text="words"`, `data-env-text-effect="fade"`, and `data-env-trigger="scrub"` to a paragraph. Its animation progresses as the top of the paragraph moves from 85% to 35% of the viewport height and reverses when scrolling back. Optional `data-env-scroll-start="85"` and `data-env-scroll-end="35"` customize those percentages. Keep end smaller than start. Unlike one-time reveals, scrub targets retain their SplitText wrappers to remain reversible; teardown restores the original markup. Delay is ignored in scrub mode, easing is linear, and scroll distance determines the overall playback speed.

Optional attributes: `data-env-delay`, `data-env-duration`, `data-env-stagger` (seconds). Duration controls text/fade-up and child-group reveals; an ordinary fade-scale block retains the original two-track timing. Total text stagger is capped at 1.2 seconds. Apply text attributes to an individual heading/paragraph, not a rich-text container. Text containing links or controls animates as a block to preserve their semantics.

Remove competing Webflow interactions from attributed targets, and keep their normal style visible. No global CSS hiding rule is needed. A reveal runs once, including for initially visible targets. Reduced-motion users see normal content. SplitText restores the original markup after completion and recalculates lines during animation on resize. Existing classes retain all styling responsibilities.

Targets inside Webflow sliders, initialized Swipers, or `[data-env-ignore]` are excluded. Nested animation targets are skipped to avoid duplicate opacity/transforms: attribute either the parent block or its individual text children. Generic usage is independent of site-specific class names.

`window.ENVAnimations.refresh()` registers newly inserted targets and restores interrupted animations. `window.ENVAnimations.destroy()` removes observers, tweens, splitting, and preference listeners. Refresh does not replay targets already started.

This script does not install dependencies, manage sliders, or intercept links. Unit checks cover initialization, split cleanup, exclusions and reduced-motion cleanup; verify actual typography and animation appearance on each published site.

The classic `fade-up` uses the Web Animations API, matching the approved standalone preview. It respects the existing delay/duration attributes, preserves authored opacity/transforms, and cancels cleanly on refresh, destroy, or reduced-motion changes. It adds no persistent inline styles. GSAP remains responsible for split text, fade-scale and scrub; browsers lacking `Element.animate()` use the GSAP fallback. Overall perceived smoothness still depends on the host page and competing interactions.


## Stagger de blocs enfants (sans découpage de texte)

Ajoutez `data-env-stagger` au même élément que `data-env-reveal` pour animer ses enfants directs à la place du parent. L'entrée du parent dans le viewport déclenche toute la séquence, une seule fois. Aucune bibliothèque SplitText n'est nécessaire.

```html
<div data-env-reveal="fade-scale"
     data-env-stagger="0.1"
     data-env-delay="0.2"
     data-env-duration="0.75">
  <article>Carte 1</article>
  <article>Carte 2</article>
  <article>Carte 3</article>
</div>
```

| Attribut sur le parent | Réglage |
| --- | --- |
| `data-env-reveal="fade-scale"` | Fade et scale 0.99 vers la taille normale, sur chaque enfant direct |
| `data-env-reveal="fade-up"` | Fade et montée de 16px, sur chaque enfant direct |
| `data-env-stagger="0.1"` | 0,1 seconde entre les débuts des enfants ; ordre du DOM |
| `data-env-delay="0.2"` | Délai avant la séquence ; 0 par défaut, maximum 5 secondes |
| `data-env-duration="0.75"` | Durée par enfant ; 0,75 seconde par défaut, maximum 5 secondes |

Le stagger accepte 0 (tous les enfants ensemble) à 1 seconde. Une valeur vide ou invalide utilise 0,1 seconde. Le groupe n'a pas le plafond de 1,2 seconde du stagger de texte : éviter des séquences trop longues.

Pour `fade-scale`, le décalage historique de 0,2 seconde est conservé en plus de `data-env-delay`. Dans l'exemple ci-dessus, les enfants commencent donc à 0,4 / 0,5 / 0,6 seconde après le déclenchement. Leur scale dure 0,75 seconde et le fade dure au maximum 0,5 seconde (ou la durée indiquée si plus courte).

Sans `data-env-stagger`, le parent continue de s'animer en bloc. Un parent vide avec stagger ne produit aucune animation. Les petits-enfants ne sont pas animés séparément : ils suivent leur enfant direct. Ne pas ajouter de reveal sur chaque enfant : les cibles imbriquées sont ignorées pour éviter les doubles animations. Les enfants directs `script`, `style`, `template`, `[hidden]`, `[data-env-ignore]`, `.w-slider` et `.swiper-initialized` sont exclus.

La préférence de réduction des animations et la restauration au destroy s'appliquent au groupe. En mode `data-env-trigger="scrub"`, la séquence suit le scroll ; le délai initial et l'offset de 0,2 seconde sont ignorés.

### Avec le chargeur global

Le chargeur `env.js` récupère `animations.js` dans le même dossier et à la même version GitHub. Pour activer une nouvelle fonctionnalité, remplacer le hash du lien `env.js` par le commit publié qui la contient. Ne pas ajouter un deuxième lien `animations.js` en parallèle. Les anciens liens figés restent sur leur version précédente.
