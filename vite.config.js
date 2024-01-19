import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import cssInject from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), cssInject()],
  build :{
    lib: {
      entry: resolve("src","cmpntlib"),
      formats : ["es"],
      name: "uiLib",
      fileName: "uiLib"
    }
  }
})
