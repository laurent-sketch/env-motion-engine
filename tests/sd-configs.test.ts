import { expect, it } from 'vitest';
import { mergeSDConfigs } from '../scripts/merge-sd-configs.mjs';
const base = { ix2: { events: {} }, interactions: [{ id: 'shared', scope: { type: 'site' }, timelineIds: ['t1'] }], timelines: [{ id: 't1', actions: [] }] };
function addition(scope = { type: 'pages', value: ['work'] }) { return { ...base, interactions: [...base.interactions, { id: 'work-only', scope, timelineIds: ['t2'] }], timelines: [...base.timelines, { id: 't2', actions: [] }] }; }
it('merges a page-scoped native interaction without expanding its scope or duplicating common definitions', () => {
  const result = mergeSDConfigs([base, addition()], ['home', 'work']);
  expect(result.interactions.map(item => item.id)).toEqual(['shared', 'work-only']);
  expect(result.interactions[1].scope).toEqual({ type: 'pages', value: ['work'] });
  expect(result.timelines.map(item => item.id)).toEqual(['t1', 't2']);
  expect(base.interactions).toHaveLength(1);
});
it('rejects changed shared runtimes, conflicting definitions, and unknown page scope', () => {
  expect(() => mergeSDConfigs([base, { ...base, ix2: { events: { changed: true } } }], ['work'])).toThrow('IX2');
  expect(() => mergeSDConfigs([base, { ...base, timelines: [{ id: 't1', actions: ['different'] }] }], ['work'])).toThrow('Conflicting timeline');
  expect(() => mergeSDConfigs([base, addition()], ['home'])).toThrow('scope');
  expect(() => mergeSDConfigs([base, addition({ type: 'site' } as any)], ['work'])).toThrow('scope');
});
