import { mkdir, writeFile } from 'node:fs/promises';
import { extract } from '../src/shared/webflow-data.js';
export { literal, extract } from '../src/shared/webflow-data.js';

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
