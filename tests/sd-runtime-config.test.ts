import { expect, it, vi } from 'vitest';
import { runtimeConfig } from '../src/sd/runtime-config.js';
const site = 'test-site';
const url = name => `https://cdn.prod.website-files.com/${site}/js/webflow.${name}.js`;
const source = `window.neverExecuteThis();Webflow.require('ix2').init({events:{},actionLists:{},site:{}});Webflow.require('ix3').register([{id:'i',timelineIds:['t']}],[{id:'t',actions:[]}]);`;
const response = (text = source) => ({ ok: true, text: async () => text });
it('reads data without executing JavaScript and reuses concurrent configuration requests', async () => {
  const request = vi.fn(async () => response());
  const first = runtimeConfig(url('shared'), site, { request });
  const second = runtimeConfig(url('shared'), site, { request });
  expect(await second).toEqual(await first);
  expect((await first).interactions[0].id).toBe('i');
  expect(request).toHaveBeenCalledTimes(1);
});
it('rejects calls in configuration literals, unsafe URLs and incomplete timelines', async () => {
  await expect(runtimeConfig('https://other.example/data.js', site)).rejects.toThrow('Untrusted');
  await expect(runtimeConfig(url('unsafe') + '?redirect=1', site)).rejects.toThrow('Untrusted');
  const request = vi.fn(async () => response(source.replace('events:{}', 'events:steal()')));
  await expect(runtimeConfig(url('calls'), site, { request })).rejects.toThrow('Non-data syntax');
  await expect(runtimeConfig(url('missing'), site, { request: async () => response(source.replace("id:'t',actions", "id:'other',actions")) })).rejects.toThrow('Incomplete');
});
it('rejects redirects and retries failed loads rather than caching failures', async () => {
  const request = vi.fn().mockResolvedValueOnce({ ...response(), url: 'https://other.example/x.js' }).mockResolvedValueOnce(response());
  await expect(runtimeConfig(url('retry'), site, { request })).rejects.toThrow('response changed');
  expect((await runtimeConfig(url('retry'), site, { request })).timelines).toHaveLength(1);
  expect(request).toHaveBeenCalledTimes(2);
});
it('finds published data in a shared config chunk when the bootstrap contains only runtime wiring', async () => {
  const request = vi.fn(async value => response(value.includes('schunk') ? source : '(()=>{var runtime=1})()'));
  const result = await runtimeConfig([url('runtime'), url('schunk.config'), url('bootstrap')], site, { request });
  expect(result.interactions[0].id).toBe('i');
  expect(request).toHaveBeenCalledTimes(2);
});
