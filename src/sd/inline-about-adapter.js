import patterns from './inline-about-patterns.json';
// Compare only audited script structure. Incoming code is never evaluated.
// The two plain-data settings objects may change without invalidating the mask.
const canonical = source => source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, '').replace(/\s+/g, '');
const fields = new Set(['start', 'end', 'distance', 'distanceMobile', 'blur', 'downDuration', 'downEase', 'upDuration', 'upEase']);
function groupData(source) {
  const groups = {};
  let replaced = source;
  for (const name of ['firstGroup', 'secondGroup']) {
    const expression = new RegExp(`const\\s+${name}\\s*=\\s*(\\{[\\s\\S]*?\\});`);
    const found = replaced.match(expression);
    if (!found) return null;
    let value;
    try {
      const json = found[1].replace(/\b([A-Za-z]\w*)\s*:/g, '"$1":').replace(/,\s*}/g, '}');
      value = JSON.parse(json);
    } catch (_) { return null; }
    if (!value || Object.keys(value).length !== fields.size || Object.keys(value).some(key => !fields.has(key))) return null;
    for (const key of fields) {
      const data = value[key];
      if (key === 'start' || key === 'end') {
        if (typeof data !== 'string' || !/^top\s+(?:\d+(?:\.\d+)?)%$/.test(data) || Number(data.match(/[\d.]+/)[0]) > 150) return null;
      } else if (key.endsWith('Ease')) {
        if (typeof data !== 'string' || !/^(?:none|linear|(?:power[0-4]|sine|expo|circ)\.(?:in|out|inOut))$/.test(data)) return null;
      } else {
        const max = key === 'blur' ? 60 : key.includes('Duration') ? 5 : 2;
        if (typeof data !== 'number' || !Number.isFinite(data) || data < 0 || data > max) return null;
      }
    }
    groups[name] = value;
    replaced = replaced.replace(expression, `const ${name} = {};`);
  }
  return { groups, signature: canonical(replaced) };
}
const signatures = Object.fromEntries(['responsive', 'legacy'].map(name => [name, groupData(patterns[name]).signature]));
export function inspectInlineAbout(doc) {
  const profile = { sources: [], story: null, hero: false, mask: false };
  for (const script of doc.scripts) {
    if (script.src || !script.textContent.trim()) continue;
    const text = script.textContent;
    if (text.includes('ENVAboutPageTest')) {
      const data = groupData(text);
      if (!data) continue;
      const mode = Object.keys(signatures).find(name => signatures[name] === data.signature);
      if (!mode || profile.story) continue;
      profile.story = { groups: data.groups, responsive: mode === 'responsive' };
    } else if (canonical(text) === canonical(patterns.hero)) profile.hero = true;
    else if (canonical(text) === canonical(patterns.mask)) profile.mask = true;
    else continue;
    profile.sources.push(text);
  }
  return profile;
}
export function prepareInlineLogo(doc) {
  const layers = new Map();
  doc.querySelectorAll('#env-sd-page .hero-about > .big--logo.middle[data-env-reveal="fade-scale"]').forEach(logo => {
    const layer = doc.createElement('div');
    layer.setAttribute('data-env-about-logo-layer', '');
    layer.style.cssText = 'display:grid;place-items:center;width:100%;height:100%;min-width:0;flex-shrink:0;';
    logo.before(layer); layer.append(logo); layers.set(logo, layer);
  });
  return () => layers.forEach((layer, logo) => { if (logo.parentElement === layer) layer.replaceWith(logo); });
}
