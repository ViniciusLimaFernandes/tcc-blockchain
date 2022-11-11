import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import nodePolyfills from "vite-plugin-node-stdlib-browser";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  build: { target: "es2020" },
  optimizeDeps: {
    esbuildOptions: { target: "es2020", supported: { bigint: true } },
  },
  define: {
    "process.env": process.env,
  },
  plugins: [vue(), vueJsx(), vuetify({ autoImport: true }), nodePolyfills()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      mqtt: "mqtt/dist/mqtt.js",
    },
  },
});
