import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { VitePWA } from "vite-plugin-pwa";

const pwaOptions = {
  // mode: "development",
  base: "/",
  includeAssets: ["/favicon.png"],
  manifest: {
    name: "notification",
    short_name: "notification",
    description: "Get notifications",
    theme_color: "#ced4da",
  },
  srcDir: "src/service",
  strategies: "injectManifest",
  filename: "firebase-messaging-sw.js",
};


export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
  },
});
