import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
