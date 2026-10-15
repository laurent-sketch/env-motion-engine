# ENV Motion Engine V1 — prototype 0.1.0

Bibliothèque TypeScript / ES modules pour Webflow. Développement local indépendant : aucune modification du site pilote, aucun paquet npm publié. Le dépôt de livraison est https://github.com/laurent-sketch/env-motion-engine.

## Essayer

Node 22.12+ : `npm ci`, `npm run dev`, ouvrir http://127.0.0.1:5173/.
`npm test` valide le cycle de vie. `npm run build` produit les modules CDN et les déclarations TypeScript.
Test navigateur : démarrer le serveur, installer Chromium avec `npx playwright install chromium`, puis `node tests/browser.mjs` (variable PLAYWRIGHT_BROWSERS_PATH si nécessaire).

## Contrat d’intégration

Toutes les pages certifiées possèdent un unique `<main data-env-page>…</main>`. Navigation et pied de page peuvent rester persistants uniquement s’ils sont identiques sur ces pages. Ajouter `data-env-micro data-env-reveal data-env-faq` sur `<html>` pour charger les modules applicables à toutes les pages, même absents de la page initiale. Marquer les éléments avec `data-env-reveal`, `data-env-hover`. FAQ : boutons natifs `data-env-faq="1"` et contenus `data-env-faq-content="1"`, avec une règle CSS pour afficher uniquement `.active`.

```html
<script type="module">
  import { createEngine } from 'URL_CDN_VERSIONNEE/dist/env-motion.js';
  const engine = await createEngine({ pages: ['/page-validee', '/autre-page-validee'] });
</script>
```

URL à remplacer après publication, ce n’est pas une URL active. Charger le module une seule fois après les scripts Webflow. Par défaut `pages: []` conserve les chargements natifs. Les pages hors liste, les liens externes, téléchargements et `data-no-swup` conservent la navigation native. Ne pas certifier `/chat` ou `/contact` avant adaptation et vérification des formulaires. Les ancres et l’historique sont pris en charge par Swup ; les positions de défilement historiques personnalisées restent à ajouter.

Chaque module reçoit `{ root, signal, reducedMotion, cleanup }`. Les écouteurs doivent utiliser `signal`; observers, timers et instances doivent enregistrer leur destruction avec `cleanup`. Un module peut retourner un nettoyage synchrone. Les initialisations asynchrones ne font pas partie du contrat V1 : charger les dépendances avant `createEngine`. Une seule instance du moteur par document. `engine.destroy()` libère les ressources.

## Adaptation du pilote avant activation

1. Travailler sur une copie staging Webflow. Ajouter le conteneur commun.
2. Remplacer les scripts FAQ actuels par le module : ne pas cumuler les deux initialisations.
3. Porter Swiper dans un module de projet qui appelle `destroy(true,true)`, déconnecte ResizeObserver et annule frames/timeouts. La V1 générique ne contient pas Swiper ni SplitText.
4. Les fichiers Webflow diffèrent par page : garder la navigation native tant que IX2, navbar, sliders et formulaires ne sont pas validés entre chaque paire de pages. Le moteur n’exécute pas les scripts HTML récupérés et n’appelle pas aveuglément Webflow.destroy()/ready(). Prévoir un adaptateur spécifique au runtime exporté.
5. Valider les métadonnées : Swup met à jour le titre, mais cette V1 ne synchronise pas canonical, descriptions, styles et données `data-wf-page`. Ajouter un adaptateur/head plugin avant certification de pages hétérogènes.
6. Ne jamais animer le même élément avec IX2 et ENV : utiliser un wrapper dédié. Retirer les dépendances devenues inutiles seulement après inventaire staging.

## Performance et distribution

GSAP/Swup constituent le socle ; Motion est un chunk séparé chargé uniquement si activé. Les apparitions utilisent IntersectionObserver ; aucun masquage CSS initial, aucun écouteur de scroll continu. La préférence de mouvement réduit est suivie en direct. Les animations utilisent opacité/transform. Le build ne garantit aucun score PSI.

Publier tout `dist/` ensemble, avec les chunks à noms hashés : copier uniquement env-motion.js casse les imports. Préparer un dépôt GitHub puis une release immuable ; pour jsDelivr utiliser `https://cdn.jsdelivr.net/gh/OWNER/REPO@TAG/dist/env-motion.js`. Choisir une licence avant publication (GSAP conserve ses propres conditions). Vérifier les licences des dépendances, définir propriétaire et nom de dépôt ; aucun de ces choix n’a été inventé ici. Le dossier dist est inclus dans cette proposition et peut être servi par jsDelivr à partir du SHA du commit. La configuration GitHub Actions reste à ajouter séparément. Les artefacts Actions seuls ne sont pas une distribution jsDelivr.

Voir [audit](docs/AUDIT.md). Cette version démontre le moteur ; l’intégration complète au pilote nécessite les adaptations ci-dessus et votre accord avant toute modification de production.

## Site pilote

Suivre [l’installation progressive](docs/WEBFLOW-INSTALL.md). La première vérification de chargement conserve la navigation native.
