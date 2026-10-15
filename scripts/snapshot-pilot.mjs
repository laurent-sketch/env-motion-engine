import { parse } from 'acorn';
import { mkdir, writeFile } from 'node:fs/promises';

// Published config is JavaScript, not JSON. Accept data-only syntax; never eval it.
export function literal(node) {
  if (node.type === 'Literal' && !(node.value instanceof RegExp)) return node.value;
  if (node.type === 'ArrayExpression') return node.elements.map(value => value ? literal(value) : null);
  if (node.type === 'ObjectExpression') return Object.fromEntries(node.properties.map(property => {
    if (property.type !== 'Property' || property.computed || property.method || property.kind !== 'init') throw Error('Unsupported object property');
    const key = property.key.type === 'Identifier' ? property.key.name : String(literal(property.key));
    if (['__proto__', 'constructor', 'prototype'].includes(key)) throw Error('Unsafe key');
    return [key, literal(property.value)];
  }));
  if (node.type === 'UnaryExpression') {
    const value = literal(node.argument);
    if (node.operator === '!') return !value;
    if (node.operator === '-') return -value;
    if (node.operator === '+') return +value;
    if (node.operator === 'void') return null;
  }
  throw Error(`Non-data syntax rejected: ${node.type}`);
}
export function extract(source) {
  const ast = parse(source, { ecmaVersion: 'latest' });
  let ix2, ix3;
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
      const method = node.callee.property.name;
      if (method === 'register' && node.arguments.length === 2 && node.arguments.every(arg => arg.type === 'ArrayExpression')) {
        if (ix3) throw Error('Multiple IX3 registrations');
        ix3 = node.arguments.map(literal);
      }
      if (method === 'init' && node.arguments[0]?.type === 'ObjectExpression') {
        const value = literal(node.arguments[0]);
        if (value.events && value.actionLists && value.site) {
          if (ix2) throw Error('Multiple IX2 registrations');
          ix2 = value;
        }
      }
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === 'start' || key === 'end') continue;
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(ast);
  if (!ix2 || !ix3) throw Error('Expected IX2 + IX3 data not found');
  return { ix2, interactions: ix3[0], timelines: ix3[1] };
}
if (process.argv[1]?.endsWith('snapshot-pilot.mjs')) {
  const { JSDOM } = await import('jsdom');
  const base = 'https://template-env002.webflow.io';
  await mkdir('src/pilot/snapshots', { recursive: true });
  for (const [name, path] of [['home', '/'], ['about', '/about'], ['features', '/features']]) {
    const html = await (await fetch(base + path)).text();
    const document = new JSDOM(html).window.document;
    const bootstrap = [...document.scripts].map(el => el.src).find(src => /\/js\/webflow\.[^/]+\.js$/.test(src));
    if (!bootstrap) throw Error('No Webflow bootstrap');
    const source = await (await fetch(bootstrap)).text();
    const finalChunkId = [...source.matchAll(/\.then\(\(\)=>\w\.e\("(\d+)"\)/g)].at(-1)?.[1];
    const hash = source.match(new RegExp(`(?:\\{|,)${finalChunkId}:"([a-f0-9]+)"`))?.[1];
    if (!hash) throw Error('Unrecognized bootstrap layout');
    const configUrl = new URL(`webflow.achunk.${hash}.js`, bootstrap).href;
    const config = extract(await (await fetch(configUrl)).text());
    const record = {
      path, pageId: document.documentElement.getAttribute('data-wf-page'),
      siteId: document.documentElement.getAttribute('data-wf-site'), bootstrap, configUrl,
      stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map(el=>el.getAttribute('href')).sort(),
      styles: [...document.querySelectorAll('head style')].map(el=>el.textContent).join('\n'),
      headStyles: [...document.querySelectorAll('head style')].map(el=>el.textContent),
      bodyClass: document.body.className,
      spline: !!document.querySelector('[data-animation-type="spline"]'),
      backgroundVideo: !!document.querySelector('.w-background-video'),
      ...config,
    };
    await writeFile(`src/pilot/snapshots/${name}.json`, JSON.stringify(record));
    if(process.argv.includes('--fixtures')) {
      await mkdir('.pilot-check',{recursive:true});
      let fixture=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,script=>/new\s+Swiper\s*\(|querySelectorAll\(['"]\.faq-item['"]\)|createPilotEngine|createEngine/.test(script)?'':script);
      fixture=fixture.replace('</body>','<script type="module" src="/tests/pilot-browser.ts"></script></body>');
      await writeFile(`.pilot-check/nav-${name}.html`,fixture);
    }
    console.log(`${path}: IX2 ${Object.keys(config.ix2.events).length} events, IX3 ${config.interactions.length} interactions, spline=${record.spline}`);
  }
}
