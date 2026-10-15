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

## Correctif d’ordre de chargement

Le contrôle sur le site publié a révélé que le module peut s’exécuter à readyState=interactive avant le script Swiper defer placé plus bas. Le test loading seul était insuffisant. Le module attend désormais DOMContentLoaded ou, si déjà passé, load. Trois tests de régression couvrent interactive, événement déjà passé et document complet (9 tests au total, tous réussis ; build réussi).

Solution immédiate compatible avec le CDN 40e1062b : différer l’appel createPilotEngine jusqu’à window.load (ou appeler immédiatement si readyState=complete). Test navigateur local avec cette version CDN exacte : FAQ n°2 active et slider à 2/6, message de succès sans erreur observée. Aucune correction publiée directement dans Webflow. Recontrôle du site requis après remplacement du chargeur par l’utilisateur.

## Livraison 0.3.0 — Home ↔ About

**Parcours :** lien → fetch Swup → validation du document → démontage widgets/IX2/IX3/navbar/Spline → remplacement du contenu visible → métadonnées/styles → reprise native et widgets → transition d’entrée.

- Compilation TypeScript, build Vite et 17 tests réussis : données extraites sans exécution, guards de compatibilité, conservation du body/scripts/badge, styles/métadonnées, scène Spline finissant de charger après son départ, transaction du hook de remplacement et destruction pendant validation async, en plus des tests précédents.
- Navigateur intégré, copies HTML locales réelles avec ressources CSS/JS distantes du pilote : Home → About → Home et deux allers-retours supplémentaires. L’identifiant de document est resté identique sur les 4 dernières visites (bc906aac-098d-422e-8725-4c98a8d89845) : absence de rechargement confirmée.
- FAQ About au clavier et image n°3, slider About 2/4 ; après retour, FAQ Home et slider 2/6 opérationnels. Hero Home visible après animation (opacity=1, transform identité), canvas Spline revenu avec dimensions 768×873. Cela vérifie la reprise observée, pas l’intégralité des animations ou leur conformité pixel par pixel.
- Menu mobile à 390×844 : ouverture sur About après transitions, puis ouverture de la navbar remontée sur Home.
- Historique : retour About → Home avec position de défilement restaurée à 6484,375 px après un départ depuis le footer ; lien #top exercé.
- Arrivée directe About : premier trajet Home natif confirmé par changement d’identifiant. Modification artificielle d’un style de la copie locale About : repli natif confirmé par changement d’identifiant ; la copie a ensuite été restaurée. Ce test a révélé puis permis de corriger une exception absorbée par un hook d’observation Swup : la transaction utilise désormais le hook de remplacement, qui propage les échecs.
- Build dist final avec GSAP global : Home → About → Home, même identifiant 5acd9946-8a34-47a1-bd94-1ddc59b609ca. Tests et compilation réussis après les dernières modifications.
- Alertes de version Spline présentes. Des erreurs de validation GPU Spline ont été capturées autour d’un rechargement complet du document de test ; elles n’ont pas été reproduites pendant les transitions Home/About suivantes. La stabilité Spline multi-navigateurs reste à vérifier sur appareils réels.
- Poids gzip du build final : cœur Swup ~9,46 Ko, pilote ~2,35 Ko, pont ~2,63 Ko, Scroll ~4,03 Ko, snapshot Home ~6,54 Ko, About différé ~6,81 Ko. GSAP générique ~32,70 Ko séparé, évité par les transitions du pilote grâce au GSAP global ; module reveal indépendant peut encore importer sa copie s’il est explicitement activé. Ce sont des tailles du build, pas des mesures réseau/PageSpeed sur le site.
- Features (Crisp/vidéos), Contact et Chat restent natifs. Aucun déploiement ni modification Webflow effectué. L’activation et le contrôle du pilote publié restent à faire après fusion et changement du chargeur par l’utilisateur.
