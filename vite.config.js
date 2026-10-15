import { defineConfig } from 'vite';
export default defineConfig({build:{lib:{entry:{'env-motion':'src/index.ts',pilot:'src/pilot/index.ts'},formats:['es'],fileName:(_format,name)=> `${name}.js`},sourcemap:true},test:{environment:'jsdom'}});
