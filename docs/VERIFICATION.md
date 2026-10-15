# Vérification — 15 octobre 2026

Parcours : clic de lien → récupération HTML locale via Swup → transition GSAP → remplacement du main → remontage des modules → interaction FAQ.

- TypeScript strict, build Vite et déclarations : réussis.
- Vitest : 2 tests réussis (nettoyage inverse et idempotent, retrait des écouteurs, nettoyage après échec partiel).
- Navigateur intégré : accueil → explorer → accueil, titre mis à jour, second bouton FAQ ouvert après retour, contenu associé affiché. Aucune erreur ou alerte console dans les logs consultés.
- Test automatisé Playwright fourni mais NON exécuté jusqu’au bout : Chromium ne démarre pas dans le sandbox macOS (bootstrap_check_in Permission denied). Ne pas considérer ses assertions d’historique, préférence de mouvement et allers-retours répétés comme validées.
- PageSpeed/Lighthouse : non mesurés. Poids gzip du build : socle environ 41,8 Ko, Motion additionnel environ 29,7 Ko ; ce sont des tailles du build, pas des poids transférés mesurés sur le pilote.
- Production : aucune modification. Publication GitHub/CDN : préparée, non réalisée.

Limites : comportement natif Webflow, Swiper, formulaires, historique de scroll, liens d’ancre, métadonnées et routes hétérogènes restent à vérifier sur staging. La bibliothèque générique ne revendique pas une intégration complète au pilote.

## Livraison 0.2.0 — widgets du pilote

- Compilation stricte et build multi-entrées : réussis (env-motion.js + pilot.js).
- 6 tests réussis : cycle de vie initial (2), FAQ clavier/groupes/retour au DOM initial, slider/redimensionnement/nettoyage/timers, refus de double Swiper et restauration après échec de construction (4).
- Test navigateur intégré sur une copie HTML locale de Home, About et Features avec les ressources CSS/JS du pilote, anciennes initialisations retirées et module pilote ajouté : initialisation confirmée sur les trois pages, sans erreur console observée. Navigation native utilisée.
- Home : clic FAQ n°2 et image correspondante, slider passé à 2/6, destruction/remontage, FAQ n°3 activée via Entrée et image correspondante. Une alerte de version Spline préexistante reste présente.
- Cette vérification est locale : elle ne remplace pas le contrôle après publication Webflow. Pas de transition Swup validée sur le pilote, pas de score PageSpeed mesuré.
- Les scripts actuels du pilote sont lus via HTTP GET uniquement. Aucune modification ni publication Webflow effectuée par l’agent.
