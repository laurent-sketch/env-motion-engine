# SD — essai Home ↔ Work avec menu persistant

Routes : `/home-sd` et `/work-v2` uniquement. Les autres liens restent natifs. Ce pont expérimental utilise Swup 4, son plugin Scroll et les exports Webflow audités le 22 octobre 2026. Aucun réglage dans le Designer ne suffit seul : installer ensemble le head et le chargeur footer générés pour cette version.

## Installation

1. Conserver les styles du site, les scripts natifs Webflow, GSAP, SplitText et ScrollTrigger.
2. Dans le Head, remplacer seulement l'ancien intercepteur vidéo inline par le bloc complet fourni `env-sd-head.html`. Ce bloc contient la préparation du premier affichage et la version vidéo avec le cycle de navigation. Le placer avant les autres scripts personnalisés qui touchent les vidéos. Ne pas utiliser async/defer ni un lien externe pour ce bloc.
3. Dans Before `</body>`, remplacer l'ancien lien `env.js` ET le script séparé Boutique Scale/logo par le contenu de `env-sd-footer.html`. Une seule installation : si ces scripts sont dans les réglages globaux du site, remplacer à cet endroit et retirer les éventuelles copies au niveau des pages. Le chargeur fourni garde l'ancien env.js et l'ancien script de marque sur les autres routes, dont Home V2.
4. Aucune modification manuelle de conteneur requise : le pont crée `#env-sd-page` autour de `main.main-wrapper` et du footer. Le menu reste en dehors. Les liens Home/Work doivent viser les vraies pages.
5. Publier sur le staging, puis tester les deux directions et le retour navigateur. Les fichiers sont figés sur un commit : ne pas mélanger des versions.

## Déroulement

- Premier affichage : le head prépare le document avant le rendu. Les valeurs finales CSS d'opacité restent intactes. Le démarrage attend le runtime Webflow et les polices, prépare les reveals visibles puis dévoile la page. Une sécurité de 5 secondes rend le contenu visible si le module échoue ; JavaScript désactivé laisse le contenu visible. La réduction des animations n'active pas le masquage initial.
- Sortie : fondu de 200 ms sur le contenu et le footer, menu conservé. Entrée globale : fondu de 350 ms, avec les reveals des éléments. Les attributs existants de délai/durée/stagger sont conservés.
- Avant remplacement : démontage hero, animations, News, médias et listeners de la page sortante ; arrêt de Lenis ; démontage des modules natifs nécessaires.
- Remplacement : navigation native Swup limitée aux deux routes, sans exécuter les scripts du HTML reçu. Les sources vidéos sont interceptées AVANT insertion, le conteneur est déplacé plutôt que cloné afin de conserver ces sources en mémoire.
- Webflow : ID de page, métadonnées, styles intégrés et liens du menu actualisés. Navbar/slider/dropdown, IX2 et IX3 relancés avec les configurations extraites comme données via Acorn. Les bootstraps Webflow des pages entrantes ne sont pas réexécutés. En arrivée directe sur Work, le module slider optionnel manque : le pont charge le chunk partagé officiel audité et active uniquement sa factory slider via le runtime Webpack existant, pour que Work → Home reste fluide. Cette intégration interne est également figée sur l'export testé.
- Après scroll : initialisation du hero/vidéos/reveals/News sur la nouvelle page ; menu relié au nouveau hero sans recréer son DOM. L'introduction du menu ne se rejoue pas. Lenis est une seule instance. Le plugin Scroll restaure les positions Précédent/Suivant et gère les ancres sans animation de scroll ajoutée.
- Analytics : les visites Swup envoient un page_view via le gtag existant (pas sur localhost). Aucune nouvelle destination de tracking. Vérifier avec la configuration Analytics/consentement du site pour éviter un doublon si des pageviews d'historique sont déjà configurées ailleurs.

## Compatibilité et repli

L'API des runtimes d'interactions Webflow n'est pas un contrat public stable. Les identifiants du site/de page, les imports Webflow et les feuilles de styles sont vérifiés. Si l'export change, la navigation revient au chargement natif. Les widgets ordinaires restent initialisés via env.js en cas de refus du pont au démarrage. Forms, Tabs et Spline ne sont pas pris en charge dans cet essai. Un script inline inconnu demande un adaptateur. Les anciennes initialisations ENV/nav doivent être retirées sur les routes pilotes.

Après une modification de structure ou d'interactions dans Webflow, exécuter `node scripts/snapshot-sd.mjs`, examiner les nouvelles données et reconstruire/tester/publier. Le script n'exécute pas le JavaScript récupéré : il accepte uniquement les données littérales. Les snapshots des deux routes doivent partager la même configuration d'interactions.

L'autre Home (`/home-sd-v2`) reste en navigation native avec son ancien loader dans le footer conditionnel. L'option vidéo `data-env-video="hover"` continue de fonctionner ; les projets sans attribut conservent leur fonctionnement. Le suivi de bouton à la souris, s'il est ajouté plus tard en script distinct, devra disposer de son propre montage/démontage : il n'est pas installé sur les exports actuellement audités.

## Vérification effectuée

- Build et tests unitaires, dont masquage initial avec réaffichage de sécurité, préservation V2/réduction des animations, wrapper qui exclut le menu, refus d'exports modifiés et retrait des médias sans remettre leurs sources.
- Copies locales des exports Home/Work avec médias vidéo de contrôle : Home → Work → Home ; même identifiant de document et mêmes éléments de menu ; hero actif, lecture/pause des vidéos, parallax natif ; retour navigateur à la position enregistrée ; arrivée directe sur Work puis Home.
- Les tentatives de simulation mobile n'ont pas produit un viewport effectif de 390px dans ce navigateur. La validation du menu mobile et les tests sur Safari/iOS/Android réels restent à faire sur la préprod. Aucun gain PageSpeed ni absence de fuite mémoire à long terme n'est revendiqué.

## Retour arrière

Remettre l'ancien bloc vidéo dans le head et l'ancien couple env.js + script de marque dans le footer, puis republier. Ne pas laisser les deux chargeurs en parallèle. Aucun contenu Webflow n'a besoin d'être reconstruit.

## Références

- https://swup.js.org/hooks/
- https://swup.js.org/plugins/scroll-plugin/
