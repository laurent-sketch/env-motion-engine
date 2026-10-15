import { createEngine } from '../src/index';
Object.assign(window,{envMotion:await createEngine({pages:['/','/demo/second.html']})});
