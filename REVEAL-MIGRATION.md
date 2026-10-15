# Migration des apparitions — étape préparatoire

Cette version ajoute le preset `data-env-reveal="fade-scale"`. Elle ne modifie pas le site publié et ne supprime aucune interaction Webflow.

## Effet

Zoom 0,99 → 1 en 750 ms (power3.out), opacité 0 → 1 en 500 ms, départ après 200 ms. Les éléments déjà visibles au montage restent stables : le hero ne rejoue pas tardivement après le chargement. Les éléments hors écran se révèlent une fois. Aucun CSS global ne cache le contenu avant le chargement du moteur.

Le GSAP du moteur est réutilisé. Le module est téléchargé uniquement si l'attribut est présent sur la page initiale, ou si `data-env-reveal` est ajouté sur `<html>` pour activer cette famille sur toutes les pages. Les styles sont restaurés et les animations annulées au nettoyage. Les préférences de mouvement réduit sont respectées.

## Procédure Webflow, après validation de cette version

1. Choisir un seul bloc hors écran utilisant l'interaction classique « Fadein Scale ». Ne pas commencer par un titre découpé animé par les nouvelles interactions GSAP.
2. Ajouter l'attribut personnalisé : nom `data-env-reveal`, valeur `fade-scale`.
3. Retirer uniquement le déclencheur d'apparition de ce bloc. Vérifier que son état normal a une opacité de 100 % et une échelle de 1. Conserver son contenu et ses classes.
4. Installer le script CDN de la nouvelle version avec `navigation: false` pendant la migration. Publier ensemble ces changements. Ne pas ajouter l'attribut à la version .3 actuellement publiée : celle-ci applique l'ancien preset générique.
5. Contrôler le bloc au défilement, au clavier et avec le mouvement réduit. Recharger pour vérifier que le contenu reste lisible si ENV ne démarre pas.
6. Migrer ensuite les autres blocs de cette famille. Conserver Webflow pour les boutons, les textes, le menu et Spline à cette étape.
7. Régénérer les snapshots de navigation après la publication, puis tester et réactiver Home ↔ About. Les anciens snapshots contiennent encore les apparitions natives ; ne pas les réutiliser après le transfert.

L'anti-collision refuse un élément dont le data-w-id est encore ciblé par les événements IX2. Il ne certifie pas les interactions IX3 ou les animations de classes : ne pas transférer ces éléments avec ce preset.

## Validation locale

21 tests passent, dont 4 dédiés aux apparitions : nettoyage, styles, contenu visible, mouvement réduit, absence d'IntersectionObserver et collision IX2. Compilation TypeScript et build réussis. Module ~0,77 Ko gzip, sans nouvelle copie de GSAP lorsque l'instance hôte est fournie. Le rendu sur le site publié et le score PageSpeed avant/après restent à vérifier après le transfert Webflow. Aucun gain PageSpeed n'est annoncé à ce stade.
