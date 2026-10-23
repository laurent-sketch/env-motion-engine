// Combine audited page-scoped additions without widening their page scope.
export function mergeSDConfigs(configs, pageIds) {
  const first = configs[0];
  if (!first || configs.some(config => JSON.stringify(config.ix2) !== JSON.stringify(first.ix2))) throw Error('IX2 payloads differ; review adapter before certifying');
  const known = new Set(pageIds);
  const interactions = new Map(), timelines = new Map();
  const baseIds = new Set(first.interactions.map(item => item.id));
  for (const config of configs) {
    for (const item of config.interactions) {
      if (!baseIds.has(item.id) && (item.scope?.type !== 'pages' || !item.scope.value?.length || item.scope.value.some(id => !known.has(id)))) throw Error('Unreviewed interaction scope');
      const previous = interactions.get(item.id);
      if (previous && JSON.stringify(previous) !== JSON.stringify(item)) throw Error('Conflicting interaction definition');
      interactions.set(item.id, item);
    }
    for (const item of config.timelines) {
      const previous = timelines.get(item.id);
      if (previous && JSON.stringify(previous) !== JSON.stringify(item)) throw Error('Conflicting timeline definition');
      timelines.set(item.id, item);
    }
  }
  const referenced = new Set([...interactions.values()].flatMap(item => item.timelineIds));
  if ([...referenced].some(id => !timelines.has(id))) throw Error('Missing interaction timeline');
  return { ...first, interactions: [...interactions.values()], timelines: [...timelines.values()].filter(item => referenced.has(item.id)) };
}
