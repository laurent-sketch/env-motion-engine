// Preserve only declarative page-module settings across Swup swaps. Scripts
// are never copied/executed from incoming HTML; mount loads our known module.
export function syncPageAnimation(live, incoming) {
  const source = incoming.querySelector('script[data-env-page-animation="about"], meta[data-env-page-animation="about"]');
  const attributes = source ? [...source.attributes].filter(attr =>
    attr.name === 'data-env-page-animation' || attr.name.startsWith('data-env-about-')) : [];
  live.querySelectorAll('[data-env-page-animation="about"]').forEach(marker => marker.remove());
  if (!attributes.length) return;
  const marker = live.createElement('meta');
  attributes.forEach(attr => marker.setAttribute(attr.name, attr.value));
  live.head.append(marker);
}
