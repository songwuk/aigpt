<script setup>
import { onMounted, ref } from 'vue'
import See from '../img/see.png'
import Like from '../img/like.png'
import Facebook from '../img/facebook.png'
import Instagram from '../img/instagram.png'
import Discord from '../img/discord.png'
import Twitter from '../img/twitter.png'
import StartOff from '../img/shoucang_2.png'
import ShareConversation from '../img/ShareConversation.png'
const leftStatus = ref([
  {
    name: 'Model',
    children: [
      {
        name: 'ChatGPT',
        num: 1,
      },
      {
        name: 'OpenAI CLIP',
        num: 22,
      },
      {
        name: 'DALL·E',
        num: 1,
      },
    ],
    bar: false,
  },
  {
    name: 'Generative AI',
    children: [
      {
        name: 'Text to Text',
        num: 1,
      },
      {
        name: 'Text to Image',
        num: 22,
      },
      {
        name: 'Text to Video',
        num: 22,
      },
      {
        name: 'Text to Code',
        num: 22,
      },
      {
        name: 'Text to Audio',
        num: 22,
      },
      {
        name: 'Text to 3D',
        num: 22,
      },
    ],
    bar: false,
  },
  {
    name: 'Application',
    children: [
      {
        name: 'Website',
        num: 1,
      },
      {
        name: 'Apps',
        num: 22,
      },
      {
        name: 'Web3',
        num: 22,
      },
      {
        name: 'Chrome Extension',
        num: 1,
      },
    ],
    bar: false,
  },
])
onMounted(() => {
  console.log(localStorage.getItem('setDetail'))
})
</script>

<template>
  <div
    w-full
    flex
    items-center
    justify-center
    class="h-366px text-45px"
    style="
      background: linear-gradient(269deg, #1C82FE 0%, #5106FE 100%);
      font-family: Charter-Black, Charter;
      font-weight: 900;
      color: #FFFFFF;"
  >
    <span
      text-center
    >Revolutionary Generative AI, Empowered Workflows</span>
  </div>
  <div class="bg-[#201f24] 2xl:pl-[158px] 2xl:pr-[161px] pl-[2vw] pr-[2vw]">
    <div class="leftBottom">
      <div flex items-center justify-between>
        <div class="w-170px h-170px rounded-[16px] mt-[-80px]" style="border: 2px solid #FFFFFF;" />
        <div>
          <div flex items-center justify-end class="mt-[-10px] mr-[18px] text-sm">
            <span flex items-center justify-center><img
              :src="See"
              class="w-16px mr-4px"
            >22</span>
            <span cursor-pointer flex items-center justify-center><img
              :src="Like"
              class="w-14px mr-4px ml-8px"
            >21</span>
          </div>
        </div>
      </div>
      <div class="mt-21px mb-[17px]" flex items-center justify-between>
        <span class="text-26px">WEB3 Space</span>
        <aside flex items-center justify-center class="shareImg">
          <i>
            <img class="w-13px" :src="Facebook" alt="Facebook">
          </i>
          <i>
            <img class="w-22px" :src="Instagram" alt="Facebook">
          </i>
          <i>
            <img class="w-24px" :src="Discord" alt="Facebook">
          </i>
          <i>
            <img class="w-22px" :src="Twitter" alt="Facebook">
          </i>
          <i>
            <img class="w-22px" :src="StartOff" alt="Facebook">
          </i>
          <i>
            <img class="w-22px" :src="ShareConversation" alt="Facebook">
          </i>
        </aside>
      </div>
      <span block class="text-18px mb-26px">Aweb natives community to support web3 projects worldwidell AMA. Partnership & Giveaway</span>
    </div>
    <div
      flex items-start justify-start style="font-family: Helvetica;"
    >
      <aside class="pr-[19px] w-50 2xl:text-lg 2xl:w-[236px]" c-white>
        <span>TAGS</span>
        <aside>
          <span>sdsdsd</span>
        </aside>
      </aside>
      <section class="ml-[22px] mt-[25px]" w-full>
        <span c-white>{{ clickBarStatus }}</span>
        <div class="mt-24px">
          <div cursor-pointer relative c-white class="w-[320px] h-118px rounded-[10px]" style="border: 1px solid rgb(151 151 151 / 33%);" @click="goInto">
            <span>sdsdsdsd</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.leftBottom {
  border-bottom: 1px solid #6D6D6D;
}
.shareImg i {
  margin: 0 14px;
  cursor: pointer;
}
</style>
