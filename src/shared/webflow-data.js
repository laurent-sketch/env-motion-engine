import { parse } from 'acorn';

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
