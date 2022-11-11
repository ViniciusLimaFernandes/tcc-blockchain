import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import inject from "@rollup/plugin-inject";
//import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
  },
  define: {
    "process.env": process.env,
  },
  plugins: [vue(), vueJsx(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      mqtt: "mqtt/dist/mqtt.js",
      stream: "stream-browserify",
      process: "process/browser",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      supported: { bigint: true },
    },
  },
});
