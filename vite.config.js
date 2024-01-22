// https://vitejs.dev/config/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
import cssInject from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react({
    include: '**/*.{jsx, tsx}'
  }), 
  eslint(), svgr(), cssInject()],
  build :{
    lib: {
      entry: resolve("src","cmpntlib"),
      formats : ["es"],
      name: "uiLib",
      fileName: "uiLib"
    }
  },
  test:{
    environment: 'jsdom',
    globals: true,              
    exclude: ['**/node_modules/**', 'automation'], // Exclude specific paths from tests
    setupFiles: './setupTest.js'
  },
  server: {
    host: true,
    port: 3000,
  }
})
