import { JSDOM } from 'jsdom';
import { sliderChunk } from './slider-factory.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { extract } from './snapshot-pilot.mjs';
const base = 'https://sd-env-2025-2e4590d75f1a2db700cfbb4c7c1.webflow.io';
const routes = {}, configs = [];
for (const path of ['/', '/home-sd', '/work-v2', '/home-sd-v2', '/work-v1', '/project-page', '/about', '/press']) {
  const response = await fetch(base + path); if (!response.ok) throw Error(`Unable to fetch ${path}`);
  const doc = new JSDOM(await response.text()).window.document;
  const scripts = [...doc.scripts].map(s => s.src).filter(s => s.includes('/js/webflow.'));
  let config;
  for (const url of scripts) {
    const source = await (await fetch(url)).text();
    try { config = extract(source); break; } catch { /* Runtime chunks contain no registrations. */ }
  }
  if (!config) throw Error('No data-only IX2 + IX3 registration found');
  configs.push(JSON.stringify(config));
  routes[path] = { page: doc.documentElement.getAttribute('data-wf-page'), site: doc.documentElement.getAttribute('data-wf-site'), scripts,
    sheets: [...doc.querySelectorAll('link[rel="stylesheet"]')].map(el => el.href),
    styles: [...doc.querySelectorAll('head style')].map(el => el.textContent) };
}
for (const script of routes['/home-sd'].scripts) {
  const source = await (await fetch(script)).text();
  if (!source.includes('define("slider"')) continue;
  const factory = source.match(/\{(\d+):function[^]*?define\("slider"/);
  if (!factory) throw Error('Slider chunk layout changed');
  await writeFile('public/sd-slider.js', sliderChunk(source, Number(factory[1])));
  routes['/home-sd'].slider = { script: 'sd-slider.js', factory: Number(factory[1]) };
  break;
}
if (!routes['/home-sd'].slider) throw Error('Missing audited slider factory');
if (configs.some(config => config !== configs[0])) throw Error('Interaction payloads differ; review adapter before certifying');
await mkdir('src/sd', { recursive: true });
await writeFile('src/sd/routes.json', JSON.stringify(routes));
await writeFile('src/sd/interactions.json', configs[0]);
console.log('SD shared pages snapshot updated. Rebuild, test and publish a new pinned version.');
