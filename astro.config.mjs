import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import UnoCSS from 'unocss/astro'
// https://astro.build/config
export default defineConfig({
  // Enable Vue to support Vue components.
  experimental: { integrations: true },
  integrations: [vue(), UnoCSS()],
})
