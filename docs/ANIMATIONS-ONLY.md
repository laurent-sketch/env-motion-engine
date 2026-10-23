# Animations only — any Webflow site

`public/animations.js` is an independent classic script, copied to `dist/animations.js` by Vite. It imports no pilot, navigation, FAQ, Swiper, or Motion package. It uses the site's global GSAP (3.13+) and optional SplitText (3.13+). Without SplitText, text uses a block reveal. Without GSAP, content stays visible.

After merging, pin the CDN URL to the merge commit. Place this after the site's GSAP and SplitText scripts, before `</body>`:

```html
<script defer src="https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT/dist/animations.js"></script>
```

Replace COMMIT with the full published commit hash. The script starts at DOM readiness and waits at most 500ms for fonts. Never add another GSAP instance if Webflow already provides it. Do not run this script alongside the pilot reveal module on the same attributed elements.

| Webflow custom attribute | Value | Effect |
| --- | --- | --- |
| `data-env-text` | `lines` | Masked line reveal |
| `data-env-text` | `words` | Staggered word reveal |
| `data-env-text` | `chars` | Staggered character reveal |
| `data-env-text-effect` | `fade` | Opacity only; no movement or scale |
| `data-env-text-effect` | `up` | Fade + upward movement (default) |
| `data-env-text-effect` | `scale` | Fade + scale 0.98 → 1; no vertical movement |
| `data-env-text-effect` | `blur` | Fade + scale 1.05 → 1 + blur 30px → 0; no vertical movement |
| `data-env-blur` | `12` | Optional starting blur in px (number only) on an existing block/text reveal |
| `data-env-reveal` | `fade-up` | Native browser preview reveal: fade + 16px upward reveal, 0.75s, cubic-bezier(.2,.65,.2,1) |
| `data-env-reveal` | `fade-scale` | Original ENV fade + scale 0.99 → 1 |
| `data-env-trigger` | `scrub` | Progress follows scrolling in both directions |

Without `data-env-trigger="scrub"`, the original one-time reveal remains the default. Scrub works with all text effects and block reveals. It requires global GSAP ScrollTrigger loaded before this file; if unavailable, the target uses a one-time reveal with a console warning. No automatic dependency download occurs.

Example: add `data-env-text="words"`, `data-env-text-effect="fade"`, and `data-env-trigger="scrub"` to a paragraph. Its animation progresses as the top of the paragraph moves from 85% to 35% of the viewport height and reverses when scrolling back. Optional `data-env-scroll-start="85"` and `data-env-scroll-end="35"` customize those percentages. Keep end smaller than start. Unlike one-time reveals, scrub targets retain their SplitText wrappers to remain reversible; teardown restores the original markup. Delay is ignored in scrub mode and scroll distance determines the overall playback speed. Existing effects use linear easing and direct scrub; the text blur preset follows the approved GSAP snippet with `power2.out` and `scrub: 1`.

Optional attributes: `data-env-delay`, `data-env-duration`, `data-env-stagger` (seconds). Duration controls text/fade-up and child-group reveals; an ordinary fade-scale block retains the original two-track timing. Total text stagger is capped at 1.2 seconds for the older presets; blur uses the numeric stagger directly, matching the approved snippet. Apply text attributes to an individual heading/paragraph, not a rich-text container. Text containing links or controls animates as a block to preserve their semantics.

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


### Opacité des liens actifs et inactifs

Conserver l'opacité normale dans le CSS (par exemple `.slider-nav-link { opacity: .3 }` et `.slider-nav-link.active { opacity: 1 }`). Les reveals de groupe capturent l'opacité visible avant de masquer les enfants. À la fin de la séquence, ils restaurent la déclaration inline d'origine (ou retirent celle ajoutée par l'animation) pour laisser les classes actives/hover reprendre la main. Le fade-scale de bloc libère également son opacité. Ne pas définir une opacité initiale de zéro pour préparer le reveal : le script gère le masquage de départ. En mode scrub, l'opacité reste pilotée par la séquence pour permettre le retour arrière.


### Group reveals inside a News loop

On browsers with `Element.animate`, non-scrub child groups use native effects with the preview cubic-bezier(.2,.65,.2,1) and `fill: backwards`. The effect disappears on completion, preserving current active/hover CSS. Both fade and movement/scale use `data-env-duration` in this path; the 0.2s fade-scale offset and per-child stagger remain. No temporary inline styles are copied into marquee duplicates. Generated `[data-env-news-clone]` children are excluded. The GSAP fallback retains its two-track fade-scale timing and scrub remains GSAP-controlled.


## Blur lettre par lettre et option de flou

Sur le titre `.h3.first` (ou tout autre texte), ajouter :

| Name | Value |
| --- | --- |
| `data-env-text` | `chars` |
| `data-env-text-effect` | `blur` |
| `data-env-trigger` | `scrub` |

La progression suit le scroll, de `top 85%` à `top 35%`, dans les deux sens : scale 1.05 → 1, opacité 0 → 1, blur 30px → 0 par caractère. Aucun déplacement vertical. Sans `scrub`, c’est un reveal autonome joué une seule fois à l’entrée dans l’écran. Les réglages existants de seuil, durée et stagger restent disponibles. Durée de référence : 1 seconde ; stagger numérique par défaut de cette variante : 0,035 seconde, sans plafond sur la séquence. Le preset reprend `power2.out` et `scrub: 1` (rattrapage lissé sur une seconde), comme le snippet approuvé. En scrub, la distance de scroll détermine la vitesse et le délai est ignoré.

Pour ajouter seulement un flou à un `fade-scale` existant :

| Name | Value |
| --- | --- |
| `data-env-reveal` | `fade-scale` |
| `data-env-blur` | `12` |

Le scale de ce reveal existant reste 0.99 → 1. `data-env-blur` s’applique aussi aux autres effets de texte, au fade-up et aux enfants directs d’un parent avec `data-env-stagger`. Une valeur est un nombre **sans `px`**, limité entre 0 et 60. `0` désactive le flou. Sans cet attribut, aucun flou n’est ajouté aux effets existants ; seule la nouvelle variante texte `blur` utilise 30px par défaut. Si l’attribut est présent mais vide/invalide, 30px est utilisé. Une valeur de 8 à 12 convient pour un flou plus léger.

Le filtre CSS d’origine est composé avec le blur, puis restauré à la fin d’un reveal autonome. Les groupes natifs n’ajoutent pas de style inline temporaire qui pourrait être copié dans les clones News. Destroy/refresh/restauration de mouvement réduit retirent le flou animé. Les textes scrub conservent les wrappers pour permettre le retour arrière. Sans SplitText (ou pour un texte contenant un lien/contrôle), l’effet reste un reveal du bloc : le HTML et les liens sont conservés.

GSAP et SplitText doivent être activés pour le découpage, et ScrollTrigger pour `scrub`. Ne pas conserver les snippets GSAP manuels précédents sur les mêmes titres. La variante masquée de `.large-text.first` n’est pas ajoutée.

### Installation sur le site SD

Le module global `sd-navigation.js` charge `animations.js` depuis le même dossier et le même commit. Mettre à jour uniquement le pin du Footer global pour récupérer les variantes. Ne pas ajouter un deuxième script `animations.js`. Le Head du loader et des vidéos reste identique. Les installations standalone peuvent utiliser directement le lien `dist/animations.js` au même commit.

Le 23 octobre : les attributs publiés étaient corrects, mais la Home chargeait encore le pin a1c2de7, antérieur au blur. Le correctif synchronise aussi le snapshot Webflow actuel. Un nouveau pin du module global est obligatoire ; le Head reste inchangé.
