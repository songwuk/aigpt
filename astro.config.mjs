import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import UnoCSS from 'unocss/astro'
// https://astro.build/config
export default defineConfig({
  // Enable Vue to support Vue components.
  experimental: { integrations: true },
  integrations: [vue({ appEntrypoint: '/src/pages/_app/app' }), UnoCSS()],
  vite: {
    server: {
      proxy: {
        '/chatai': {
          // target: 'http://10.33.236.71:8080/gap-h5-backend',
          target: 'https://test-api.aigpt.me',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/chatai/, ''),
        },
      },
    },
  },
})
