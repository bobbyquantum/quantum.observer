/// <reference types="vitest" />

import { defineConfig, type Plugin } from 'vite';
import analog from '@analogjs/platform';

/**
 * Analog builds the client and server environments in parallel with one shared Angular compiler,
 * and each environment's compile resets the output the other is reading. Whichever loses the race
 * falls back to uncompiled (JIT) components, which break in the browser. Running the two builds
 * one after the other avoids it.
 */
function sequentialEnvironmentBuilds(): Plugin {
  return {
    name: 'qo:sequential-environment-builds',
    enforce: 'post',
    config(config) {
      const buildApp = config.builder?.buildApp;
      if (!buildApp) return;
      return {
        builder: {
          buildApp: async (builder) => {
            const build = builder.build.bind(builder);
            let queue: Promise<unknown> = Promise.resolve();
            builder.build = (environment) => {
              const next = queue.then(() => build(environment));
              queue = next.catch(() => undefined);
              return next;
            };
            return buildApp(builder);
          },
        },
      };
    },
  };
}

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
    sequentialEnvironmentBuilds(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
