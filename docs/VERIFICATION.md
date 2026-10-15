# Vérification — 15 octobre 2026

Parcours : clic de lien → récupération HTML locale via Swup → transition GSAP → remplacement du main → remontage des modules → interaction FAQ.

- TypeScript strict, build Vite et déclarations : réussis.
- Vitest : 2 tests réussis (nettoyage inverse et idempotent, retrait des écouteurs, nettoyage après échec partiel).
- Navigateur intégré : accueil → explorer → accueil, titre mis à jour, second bouton FAQ ouvert après retour, contenu associé affiché. Aucune erreur ou alerte console dans les logs consultés.
- Test automatisé Playwright fourni mais NON exécuté jusqu’au bout : Chromium ne démarre pas dans le sandbox macOS (bootstrap_check_in Permission denied). Ne pas considérer ses assertions d’historique, préférence de mouvement et allers-retours répétés comme validées.
- PageSpeed/Lighthouse : non mesurés. Poids gzip du build : socle environ 41,8 Ko, Motion additionnel environ 29,7 Ko ; ce sont des tailles du build, pas des poids transférés mesurés sur le pilote.
- Production : aucune modification. Publication GitHub/CDN : préparée, non réalisée.

Limites : comportement natif Webflow, Swiper, formulaires, historique de scroll, liens d’ancre, métadonnées et routes hétérogènes restent à vérifier sur staging. La bibliothèque générique ne revendique pas une intégration complète au pilote.
