import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { VitePWA } from "vite-plugin-pwa";

const pwaOptions = {
  // mode: "development",
  base: "/",
  includeAssets: ["/favicon.png"],
  manifest: {
    name: "YT Playlist Notifier",
    short_name: "YT Playlist Notifier",
    description: "Get notifications when YouTube playlists are updated.",
    theme_color: "#ced4da",
    icons: [
      {
        src: "icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
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
