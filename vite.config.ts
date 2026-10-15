/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      // Prerender every page to static HTML; no server output.
      static: true,
      prerender: {
        routes: [
          '/',
          '/updates',
          '/about',
          '/404',
          {
            contentDir: 'src/updates',
            transform: (file) => `/updates/${file.attributes['slug']}`,
          },
        ],
        sitemap: {
          host: 'https://quantum.observer',
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
