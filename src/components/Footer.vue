<script setup>
import { ref } from 'vue'
import Twitter from './img/twitter.png'
import Telegram from './img/telegram.png'
import Discord from './img/discord.png'
const leftFooter = ref([
  'About',
  'Privacy Policy',
  'Terms of Servuce',
])
</script>

<template>
  <div sm:p-0 class="p-[10px] bg-[#131415] sm:h-64px  w-full flex sm:items-center sm:justify-center sm:flex-row flex-col items-start justify-start">
    <section flex-1 class="sm:ml-[61px]" flex items-center justify-start>
      <div class="sm:ml-[43px]">
        <span v-for="(item, idx) in leftFooter" :key="idx" cursor-pointer class="mr-[28px] c-[#6D6D6D] hover:c-[#05D4FD]">{{ item }}</span>
      </div>
    </section>
    <span sm:my-0 flex items-center justify-center flex-1 class="c-[#6D6D6D] my-[10px]">Copyright © 2023 AIGPT.me All Rights Reserved</span>
    <section flex-1 class="sm:mr-[64px]" flex items-center justify-end>
      <a href="https://twitter.com/AiGPTme" target="_blank">
        <img cursor-pointer class="w-[30px] mr-[24px]" :src="Twitter" alt="Twitter">
      </a>
      <a href="https://discord.gg/aigpt" target="_blank">
        <img cursor-pointer class="w-[26px] mr-[24px]" :src="Discord" alt="Discord">
      </a>
      <a href="https://t.me/aigptdao" target="_blank">
        <img cursor-pointer class="w-[26px]" :src="Telegram" alt="Telegram">
      </a>
    </section>
  </div>
</template>
