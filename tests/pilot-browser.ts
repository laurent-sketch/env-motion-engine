// Local-only diagnostic harness. Uses the production build, never mutates Webflow.
import { createPilotEngine } from '../dist/pilot.js';
const session = crypto.randomUUID();
const engine = await createPilotEngine({ legacyScriptsRemoved: true, navigation: true });
Object.assign(window, { envMotion: engine });
function report() {
  document.documentElement.dataset.envTestSession = session;
  console.info('[ENV navigation test]', location.pathname, 'session=' + session, 'swup=' + !!engine?.swup);
}
report();
engine?.swup?.hooks.on('visit:end', report);
