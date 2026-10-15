# Audit du pilote — 15 octobre 2026

Source : requêtes GET en lecture seule sur https://template-env002.webflow.io/ et les chemins /about, /features, /contact, /chat. Inventaire reproductible dans inventory.json. Audit du HTML livré ; il ne constitue pas une mesure Lighthouse, de CPU ou de Core Web Vitals.

| Page | HTML non compressé | Images / lazy | Nœuds data-w-id | Formulaires |
|---|---:|---:|---:|---:|
| / | 41 236 octets | 35 / 35 | 11 | 0 |
| /about | 41 412 | 20 / 20 | 14 | 0 |
| /features | 48 518 | 21 / 21 | 14 | 0 |
| /contact | 16 748 | 2 / 2 | 0 | 1 |
| /chat | 14 175 | 0 / 0 | 0 | 0 |

Les cinq chemins répondent 200. Les quatre premiers ont `main#top.main-wrapper` ; /chat n’a pas de main. La navbar et le footer sont hors main. Les identifiants Webflow et les fichiers JavaScript générés varient selon la page : un remplacement de main seul n’assure pas la compatibilité IX2.

Sept scripts externes sur chaque page : WebFont 1.6.26, jQuery 3.5.1, runtime Webflow propre à la page, GSAP 3.15.0, SplitText, ScrollTrigger, Swiper 12 (ce dernier en defer). Swup et Motion ne figurent pas dans cet inventaire. L’accueil charge Lato avec de nombreuses graisses et italiques, plus Cormorant 300/400. Réduire aux variantes réellement utilisées et envisager des fontes locales après mesure.

Sur l’accueil, le script FAQ et le script témoignages Swiper s’appuient sur DOMContentLoaded. Cet événement ne se répète pas avec Swup. Le slider crée un ResizeObserver, un écouteur resize, un timeout et des requestAnimationFrame sans fonction de démontage. Le conserver tel quel accumulerait des ressources lors des visites si on le relançait. Il personnalise snapGrid : porter ce comportement et ses offsets avec des tests de mise en page, plutôt qu’un remplacement générique.

Toutes les images HTML sont lazy, y compris les premières : vérifier visuellement le candidat LCP, puis donner à cette image loading=eager/fetchpriority=high si approprié. Ne pas modifier toutes les images à l’aveugle. Le CSS Swiper et son JS sont présents même sur /chat sans image ; les charger selon les composants après vérification de leur usage. Aucun gain chiffré n’est affirmé.

## Priorités

P0 : staging, conteneur commun, compatibilité runtime Webflow, portage des scripts et nettoyage. Garder /contact et /chat en navigation native.

P1 : supprimer les doubles dépendances GSAP après migration, charger Swiper/SplitText seulement où nécessaires, revoir image LCP et fontes. Mesurer avant/après sur mêmes pages avec Lighthouse mobile (3 passages, médiane), cache froid, puis inspection réseau et long tasks. Relever LCP, CLS, TBT et poids transféré ; INP nécessite des interactions et idéalement des données terrain.

P2 : metadata/head, défilement historique, composants persistants et QA clavier/tactile/formulaires. Aucun script récupéré ne doit être exécuté automatiquement.

## Sources techniques

- https://swup.js.org/getting-started/animations/ — hooks de transitions JS.
- https://swup.js.org/hooks/ — cycle de navigation.
- https://gsap.com/docs/v3/GSAP/gsap.context()/ — nettoyage des animations.
- https://motion.dev/docs/hover — interactions et retrait des écouteurs.
