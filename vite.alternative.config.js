import { defineConfig } from 'vite';
export default defineConfig({ build: { outDir: 'dist-alternative', lib: { entry: { 'sd-navigation-alternative': 'src/sd/alternative.js' }, formats: ['es'], fileName: (_format, name) => `${name}.js` }, sourcemap: true } });
