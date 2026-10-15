# Installation progressive sur template-env002.webflow.io

Les trois conteneurs data-env-page ont été vérifiés publiés sur /, /about et /features. Ne pas activer pages:['/','/about','/features'] avant portage des interactions : leurs runtimes Webflow diffèrent.

## Étape suivante après publication des fichiers GitHub

Utiliser une URL épinglée au SHA complet du commit contenant dist. Le module ES importe d’autres chunks : conserver tout dist dans le dépôt.

Dans Site settings → Custom code → Footer code, ajouter le script suivant en remplaçant COMMIT_SHA. Ce premier test vérifie uniquement le chargement ; aucune navigation Swup n’est activée et aucune animation n’est ajoutée.

```html
<script type="module">
  import { createEngine } from 'https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT_SHA/dist/env-motion.js';
  if (document.querySelector('[data-env-page]')) {
    window.envMotion = await createEngine({ pages: [] });
    console.info('[ENV Motion] bibliothèque chargée — navigation native');
  }
</script>
```

Publier uniquement sur le domaine webflow.io de test. Vérifier l’absence d’erreur de chargement, et le fonctionnement normal des pages, navbar, FAQ, slider et formulaire. Les micro-interactions restent inactives sans les attributs correspondants.

Ensuite : porter FAQ et Swiper dans des modules dédiés, retirer leurs anciennes initialisations, adapter le runtime Webflow et les métadonnées. Certifier chaque page, puis seulement ajouter ses chemins à pages. L’adaptateur pilote n’est pas encore implémenté dans cette livraison.

Retour arrière : retirer le script ajouté dans Footer code puis republier. Les attributs data-env-page peuvent rester.
