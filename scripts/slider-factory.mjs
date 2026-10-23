import { parse } from 'acorn';

// Emit only the audited slider module, never the page bootstrap around it.
export function sliderChunk(source, id) {
  let factory;
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'Property' && String(node.key?.value ?? node.key?.name) === String(id) && node.value?.type === 'FunctionExpression') {
      if (factory) throw Error('Ambiguous slider factory');
      factory = node.value;
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(parse(source, { ecmaVersion: 'latest' }));
  if (!factory) throw Error('Missing slider factory');
  const code = source.slice(factory.start, factory.end);
  if (!code.includes('define("slider"')) throw Error('Unexpected slider module');
  return `/* Audited Webflow slider factory only; no page bootstrap. */\n(self.webpackChunk=self.webpackChunk||[]).push([["env-sd-slider-module"],{${id}:${code}}]);\n`;
}
