<script setup>
import { ref } from 'vue'
import AiGPT_1 from '../img/AiGPT_1.png'
import OpenAi from '../img/OpenAi.png'
import Examples from '../img/examples.png'
import Capabilities from '../img/capabilities.png'
import Limitations from '../img/limitations.png'
const homeList = ref([
  {
    name: 'Examples',
    mean: '"Explain quantum computing in simple terms" ->',
    img: Examples,
  },
  {
    name: 'Capabilities',
    mean: 'Remembers what user said earlier in the conversation',
    img: Capabilities,
  },
  {
    name: 'Limitations',
    mean: 'May occasionally generate incorrect information',
    img: Limitations,
  },
])
const textareaask = ref('')
const submit = async (event) => {
  if (event.keyCode === 13 && !event.ctrlKey) {
    event.preventDefault()
    window.location.href = '/chat'
  }
}
</script>

<template>
  <div flex sm:items-center justify-start flex-col items-start class="w-full sm:h-[652px]" style="background: linear-gradient(269deg, #1C82FE 0%, #5106FE 100%);">
    <div class="mt-[90px] mb-[26px]" text-center>
      <span style="font-size: 48px;font-weight: bold;color: #FFFFFF;">Connect ChatGPT & AIGC to Web3</span>
    </div>
    <div flex items-center justify-center sm:flex-row flex-col w-full>
      <img style=" margin-top: 4px;" class="w-[135px]" :src="AiGPT_1">
      <span style="margin: 17px 0 0 7px;" class="text-[24px] c-white">Powerd by</span>
      <img style="margin-left: 7px;" class="w-[180px]" :src="OpenAi">
    </div>
    <div relative flex items-center justify-center class="sm:w-[900px] sm:h-[220px] mt-[51px] w-full h-500px" style="">
      <div absolute top-0 left-0 style="opacity: 0.33; border-radius: 10px; background: #09159F;" class="sm:w-[900px] sm:h-[220px] w-full h-500px" />
      <div class="kill sm:w-[900px] sm:h-[220px] w-full h-auto " absolute top-0 left-0 z-2 flex items-center justify-center sm:flex-row flex-col>
        <section v-for="(item, index) in homeList" :key="index" class="sm:my-0 my-10px" c-white flex items-center justify-center flex-col style="opacity:1">
          <img class="w-[46px]" :src="item.img" alt="">
          <h4 font-bold class="mt-[20px] mb-[13px]" style="font-size: 18px">
            {{ item.name }}
          </h4>
          <p style="font-size: 16px;font-weight: 400;line-height: 22px;width: 239px" text-center>
            {{ item.mean }}
          </p>
        </section>
      </div>
    </div>
    <div class="sm:w-[900px] mt-[34px] w-full">
      <div class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        <textarea v-model="textareaask" placeholder="Ask chatGPT anything" tabindex="0" data-id="root" style="outline: none;border: none; max-height:200px;height:24px;overflow-y:hidden;" rows="1" class="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0" @keydown="submit" />
        <a href="/chat">
          <button class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" data-v-f9ee6f8f="">
              <line x1="22" y1="2" x2="11" y2="13" data-v-f9ee6f8f="" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" data-v-f9ee6f8f="" />
            </svg>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kill section:nth-child(2) {
  margin: 0 62px;
}
</style>
