import { defineConfig } from 'vite';
export default defineConfig({build:{lib:{entry:'src/index.ts',formats:['es'],fileName:()=> 'env-motion.js'},sourcemap:true},test:{environment:'jsdom'}});
