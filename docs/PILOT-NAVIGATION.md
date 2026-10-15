# Navigation pilote 0.3.0 — activation progressive

## Périmètre

Cette version expérimentale active Home ↔ About seulement, via `navigation: true`. Features conserve un chargement natif : vidéos Webflow et chat Crisp propre à cette page demandent encore un adaptateur. Contact et Chat restent natifs également.

Lorsqu’un visiteur arrive directement sur About, le runtime Spline n’existe pas dans ce document. Son premier trajet vers Home est donc natif. Après ce chargement de Home, Home ↔ About peut fonctionner sans rechargement. Aucun bundle Webflow récupéré n’est exécuté pour contourner ce cas.

L’option est désactivée par défaut. La fusion du code GitHub n’active rien sur Webflow.

## Installation après fusion

Conserver les imports Webflow, GSAP, SplitText, ScrollTrigger et Swiper ainsi que leurs CSS. Les anciennes initialisations FAQ/slider doivent rester retirées.

Remplacer le seul chargeur ENV de Footer code par le bloc ci-dessous ; utiliser le SHA complet du commit fusionné à la place de COMMIT_SHA. Publier sur le domaine pilote seulement.

```html
<script type="module">
  import { createPilotEngine } from 'https://cdn.jsdelivr.net/gh/laurent-sketch/env-motion-engine@COMMIT_SHA/dist/pilot.js';
  async function startENV() {
    try {
      window.envMotion = await createPilotEngine({
        legacyScriptsRemoved: true,
        navigation: true
      });
      console.info('[ENV Motion]', window.envMotion?.swup
        ? 'Navigation progressive active'
        : 'Modules prêts — navigation native');
    } catch (error) {
      console.error('[ENV Motion] Initialisation interrompue', error);
    }
  }
  if (document.readyState === 'complete') startENV();
  else window.addEventListener('load', startENV, { once: true });
</script>
```

## Ce que fait le pont Webflow

- Crée automatiquement un conteneur `data-env-shell` autour de la navbar, du contenu et du footer. Le body, les scripts globaux et le badge Webflow sont conservés. Aucun ajout manuel d’attribut n’est requis.
- Valide le site, l’ID de page, le bootstrap Webflow, les feuilles de styles, les styles intégrés et les scripts/composants pris en charge avant de démonter l’ancienne page.
- Nettoie FAQ/Swiper puis les moteurs IX2/IX3 et la navbar. Les scènes Spline chargées sont détruites ; une scène encore en chargement est détruite dès que sa promesse native aboutit après son départ.
- Remplace le contenu, met à jour `data-wf-page`, langue, classe du body, description, robots, Open Graph, Twitter, canonical et hreflang, puis les styles intégrés de la nouvelle page.
- Relance la navbar, IX2 et IX3 avec les données exactes extraites des exports audités. Recrée Spline au retour sur Home sans bloquer la transition sur son téléchargement.
- Remonte FAQ/Swiper et donne le focus au main. Le plugin Scroll de Swup gère ancres et positions de défilement historiques, sans animation de scroll ajoutée.
- Réutilise le GSAP global du pilote pour les transitions. Sans GSAP fourni, le moteur générique charge sa propre copie à la demande. Les modules optionnels restent séparés.

L’extraction des configurations utilise Acorn au moment de la préparation : seules des données littérales sont acceptées. Aucun `eval`, aucune exécution des scripts de la réponse HTML, aucun événement global simulé pour forcer Webflow.

## Repli et maintenance

Le pont utilise des API Webflow observées dans les exports, qui ne constituent pas un contrat public stable. Il est spécifique à ce pilote ; le cœur du moteur reste réutilisable avec d’autres adaptateurs.

Si Webflow change son export, ses styles, ses scripts ou ses composants, la navigation repasse en chargement natif. Un échec de validation pendant une visite est propagé depuis le hook de remplacement (les hooks d’observation Swup absorbent les exceptions) et déclenche le repli natif de Swup. Une trace console peut accompagner ce repli.

Après modification des interactions dans le Designer : `npm run snapshot:pilot`, vérifier les différences, reconstruire, tester, puis publier une nouvelle version immuable. Les snapshots source sont dans `src/pilot/snapshots/`. Le script ne publie rien dans Webflow. Les fichiers de distribution forment un ensemble : conserver tous les chunks sous `dist/`.

Test reproductible du pilote : `npm ci`, puis `npm run dev:pilot`. Cette commande lit les pages publiques, retire les anciennes initialisations et l’ancien chargeur dans les seules copies HTML locales, construit le moteur et démarre les copies locales. Elle ne modifie pas le site. Le harnais `tests/pilot-browser.ts` utilise le build dist et affiche un identifiant de document en console ; ce même identifiant doit rester stable pendant les transitions Swup.

## Vérification avant élargissement

Tester sur le site publié : Home → About → Home plusieurs fois, FAQ clic/clavier, slider jusqu’au dernier témoignage, menu mobile, précédent/suivant, ancres, contenu IX2 et textes IX3, scène Spline. Comparer les métadonnées avec un chargement natif. Vérifier ensuite Safari/iOS et Chrome/Android sur appareils réels ; la validation locale intégrée ne les remplace pas.

Les préférences de mouvement réduit sont respectées par ENV (transitions, scroll ajouté et slider). Les animations créées dans Webflow restent régies par Webflow et ne sont pas réécrites par ce pont.

Aucune mesure PageSpeed ni preuve d’absence de fuite mémoire sur longue durée n’est revendiquée. Le runtime Spline distant reste géré par Webflow et dépend également du support WebGPU/WebGL du navigateur.

## Retour arrière

Remplacer `navigation: true` par `navigation: false` et republier. La FAQ et le slider restent gérés par ENV ; les pages retrouvent leur chargement natif. Conserver une seule instance du moteur. Appeler `destroy()` lorsqu’une instance n’est plus nécessaire ; pour désactiver la navigation sur le site, préférer l’option et une nouvelle publication, plutôt qu’une destruction pendant une visite.

## Références

- https://swup.js.org/hooks/
- https://swup.js.org/getting-started/reloading-javascript/
- https://swup.js.org/plugins/scroll-plugin/
- Les URLs de bootstrap et de configuration auditées sont enregistrées dans chaque snapshot ; le pont reste expérimental, sans promesse d’API IX3 publique.
