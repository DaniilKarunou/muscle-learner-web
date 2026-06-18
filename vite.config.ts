import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      includeAssets: ["apple-touch-icon.png", "pwa-192.png", "pwa-512.png", "pwa-512-maskable.png"],
      manifest: {
        id: "/muscle-learner-web/",
        name: "Muscle Learner Premium Atlas",
        short_name: "Muscle Learner",
        description: "Mobilny atlas mięśni z quizami, obrazami i trybem nauki zaprojektowanym pod telefon.",
        theme_color: "#101a2f",
        background_color: "#eef2f9",
        display: "standalone",
        display_override: ["standalone", "minimal-ui", "browser"],
        orientation: "portrait",
        scope: "/muscle-learner-web/",
        start_url: "/muscle-learner-web/",
        lang: "pl",
        categories: ["education", "medical", "health", "reference"],
        icons: [
          {
            src: "/muscle-learner-web/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/muscle-learner-web/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/muscle-learner-web/pwa-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
        navigateFallback: "/muscle-learner-web/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "atlas-images",
              expiration: {
                maxEntries: 160,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\/.+$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "wikimedia-media",
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
      },
    }),
  ],
  base: "/muscle-learner-web/",
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
