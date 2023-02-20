<script setup lang="ts">
import { ref } from 'vue'
import * as htmlToImage from 'html-to-image'
const refPng = ref<HTMLElement | null>(null)
async function createImage(dataUrl: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.crossOrigin = 'anonymous'
    img.decoding = 'sync'
    img.src = dataUrl
  }) as Promise<Record<string, any>>
}
const toPng = async () => {
  const dataUrl = await htmlToImage.toPng(refPng.value!)
  const mathRandom = Math.random().toString(36)
  const alink = document.createElement('a')
  const { src } = await createImage(dataUrl) as HTMLImageElement
  alink.href = src
  alink.download = `${mathRandom}.png`
  alink.click()
}
const toUrl = async () => {
  const dataUrl = await htmlToImage.toPng(refPng.value!)
}
</script>

<template>
  <div ref="refPng">
    <span bg-red c-gray>这是span</span>
    <button>这是按钮</button>
  </div>
  <button btn @click="toPng">
    生成图片
  </button>
  <button @click="toUrl">
    生成短链
  </button>
</template>
