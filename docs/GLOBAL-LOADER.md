# ENV global — essai local

Entrée : env.js. Modules voisins : hero.js, animations.js, news.js, news-marquee.js.

Installation future, après hébergement de tous ces fichiers au même emplacement :

```html
<script defer src="URL/env.js"></script>
```

Remplacer les anciens scripts hero (les deux), animations, news, le chargement direct news-marquee et Lenis avec son initialisation. Conserver les scripts natifs Webflow. Conserver l'interception vidéo inline dans le head. Ne retirer les dépendances GSAP configurées dans Webflow qu'après vérification qu'aucune interaction native ne les utilise.

Le chargeur réutilise GSAP/SplitText/ScrollTrigger déjà présents ; sinon il charge GSAP, SplitText uniquement pour data-env-text et ScrollTrigger uniquement pour data-env-trigger="scrub". Draggable n'est pas requis par ces modules. Lenis démarre après load en période disponible ; désactiver avec data-env-lenis="false" sur la balise env.js.

News est chargé à 600px du viewport ; news.js choisit ensuite marquee ou Swiper selon data-env-news. Aucun script de suivi n'a été modifié.

Vérification navigateur du 16 octobre : copie locale de la structure Webflow, vidéos remplacées par un petit média de contrôle. Hero : clic vers slide 3 et autoplay observés. News absent au démarrage et encore absent à environ 4900px ; news.js + news-marquee.js présents à l'approche (383px), clones et transformation du marquee actifs. Aucun warning/erreur console relevé. Reveal chargé, page navigable. SplitText et mode Swiper ne sont pas revalidés dans cet essai. Aucun gain PageSpeed mesuré ; préprod inchangée et fichiers pas encore publiés sur GitHub.


## Stagger des enfants

Le module animations supporte `data-env-reveal="fade-scale"` ou `fade-up` avec `data-env-stagger="0.1"` sur un parent pour animer ses enfants directs. Voir [ANIMATIONS-ONLY.md](ANIMATIONS-ONLY.md) pour les délais, durées et exemples. Mettre à jour la version du lien `env.js` pour recevoir le module correspondant ; ne pas ajouter de lien animations supplémentaire.
