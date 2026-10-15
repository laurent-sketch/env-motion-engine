# Migration pilote — 0.2.0 : FAQ et témoignages

Cette livraison remplace les deux scripts personnalisés du pilote et conserve les chargements de page natifs. Elle ne certifie pas encore la navigation Swup sur le pilote.

## 1. Préserver le code existant

Avant toute suppression, copier les blocs de code concernés dans un fichier texte local. Conserver les imports Webflow, jQuery, GSAP, ScrollTrigger, SplitText, Swiper et son CSS. Ne pas supprimer un bloc complet s’il contient du code sans rapport.

## 2. Retirer uniquement les anciennes initialisations

Sur Home, About et Features, trouver le bloc FAQ contenant ces repères :

```js
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');
  const contentImages = document.querySelectorAll('.img-faq-content');
```

Il se trouve dans un Embed ou dans le code personnalisé de la page. Supprimer le script FAQ entier, de son `<script>` à son `</script>`, uniquement si ces balises n’encadrent que ce script. Conserver le HTML et le CSS de la FAQ.

Trouver ensuite le bloc témoignages contenant :

```js
const section = document.querySelector(".testimonial-section");
```

Il initialise `new Swiper`, un `ResizeObserver` et un écouteur `window.resize`. Retirer toute cette initialisation, mais conserver le chargement de `swiper-bundle.min.js` et le CSS Swiper. Si le code est global, une seule suppression suffit ; s’il est dupliqué au niveau des pages, retirer chaque copie.

Ne pas publier entre suppression des anciennes initialisations et ajout du nouveau chargeur.

## 3. Remplacer le chargeur ENV dans Footer code

Remplacer uniquement le précédent `<script type="module">` qui importe `createEngine`. Utiliser le SHA complet du commit contenant cette livraison à la place de COMMIT_SHA :

```html
<script type="module">
  import { createPilotEngine } from 'https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT_SHA/dist/pilot.js';
  try {
    window.envMotion = await createPilotEngine({ legacyScriptsRemoved: true });
    console.info('[ENV Motion] Modules pilote prêts — navigation native');
  } catch (error) {
    console.error('[ENV Motion] Initialisation interrompue', error);
  }
</script>
```

`legacyScriptsRemoved: true` est une déclaration de migration, pas un détecteur automatique d’anciens écouteurs FAQ. Le module refuse en revanche de créer un second Swiper si une instance existe déjà.

Les sélecteurs de la FAQ et du slider sont ceux déjà publiés sur le site : aucun nouvel attribut n’est requis. Le module utilise Swiper 12 déjà chargé par le site et n’ajoute aucune seconde copie.

## 4. Publication et contrôle

Publier les modifications ensemble sur le seul domaine template-env002.webflow.io. Tester Home, About et Features : FAQ au clic et clavier, correspondance de l’image, slider jusqu’au dernier témoignage, retour, redimensionnement mobile et desktop. Le slider utilise une vitesse nulle si la préférence de mouvement réduit est activée.

Contact et Chat gardent leur comportement natif. La navigation entre les trois pages recharge encore le document : c’est attendu à cette étape.

## Retour arrière

Restaurer les deux anciennes initialisations et retirer le chargeur `createPilotEngine`, dans la même publication. Ne jamais laisser les deux versions actives ensemble.

## Prochaine barrière : animations Webflow

L’inspection des bundles publiés confirme IX2 et IX3 (`Webflow.require('ix3')`, `getInstance().register(...)`) et Spline sur l’accueil. Le redémarrage d’IX2 seul ne couvre pas ces ressources. Aucun script du HTML récupéré n’est exécuté pour contourner ce problème. L’adaptation de ces moteurs, les métadonnées, la navbar persistante et les positions de défilement restent à certifier avant d’activer des chemins Swup.
