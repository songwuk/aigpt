<template>
  <div class="footer bg-[#131415]" w-full flex="~ items-center justify-center">
    <section flex-1 class="ml-[61px]" flex items-center justify-start >
      <div class="ml-[43px]">
        <span cursor-pointer class="mr-[28px] c-[#6D6D6D] hover:c-[#05D4FD]" v-for="(item, idx) in leftFooter" :key="idx">{{ item }}</span>
      </div>
    </section>
    <section flex-1 class="mr-[64px]"  flex items-center justify-end>
      <img cursor-pointer class="w-[30px] mr-[24px]" :src="Twitter" alt="Twitter">
      <img cursor-pointer class="w-[26px] mr-[24px]" :src="Discord" alt="Discord">
      <img cursor-pointer class="w-[26px]" :src="Telegram" alt="Telegram">
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Twitter from './img/twitter.png'
import Telegram from './img/telegram.png'
import Discord from './img/discord.png'
const leftFooter = ref([
  'About',
  "Privacy Policy",
  "Terms of Servuce"
])
</script>
<style>
.footer {
  height: 64px;
}
</style>
