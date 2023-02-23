<script setup>
import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
import '@jambonn/vue-concise-carousel/lib/vue-concise-carousel.css'
import { ref } from 'vue'
import See from '../img/see.png'
import Like from '../img/like.png'
import Facebook from '../img/facebook.png'
import Instagram from '../img/instagram.png'
import Discord from '../img/discord.png'
import Twitter from '../img/twitter.png'
import StartOff from '../img/shoucang_2.png'
import ShareConversation from '../img/ShareConversation.png'
import Right from '../img/right.png'
import Right1 from '../img/right_1.png'
import Left1 from '../img/left_1.png'
import Game from '../img/game.png'
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
const detailLine = 'WithGen-1Runwayislaunching Video to Video,a form of generative Al that uses l out ofexisting ones.Runwayis also the original startup behind Stable Diffusion Al systemsfor image and video synthesis are quickly becoming more precise, realis the forefront ofthese developments and is dedicated to ensuring the future of are empowering for all.'
const forList = ref([
  'Categories',
  'Application',
  'Generative AI',
  'Model',
])
const carousel = ref('')
const forward = () => {
  carousel.value.handleNavigation('forward')
}
const backward = () => {
  carousel.value.handleNavigation('backward')
}
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
      sm:text-center
      text-left
    >Revolutionary Generative AI, Empowered Workflows</span>
  </div>
  <div w-full class="bg-[#201f24] 2xl:pl-[158px] 2xl:pr-[161px] pl-[2vw] pr-[2vw]  pb-200px">
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
      flex items-start justify-start style="font-family: Helvetica;" class=" mb160px"
    >
      <aside sm:shrink-0 class="2xl:text-lg mt-18px mb-11px xl:w-300px sm:w-50" c-white>
        <span block class="text-18px mb-11px">TAGS</span>
        <aside flex item-center justify-start flex-wrap>
          <span v-for="(item, index) in forList" :key="index" block :class="item === 'Application' ? 'Application' : ''" class="mb-17px mr-10px bg-[#BEE3F8]  rounded-15px py-5px px-12px text-16px">{{ item }}</span>
        </aside>
        <button
          class="w-158px h-40px rounded-8px"
          style="background: linear-gradient(315deg, #1C82FE 0%, #5106FE 100%);"
        >
          View Website
        </button>
      </aside>
      <section class="2xl:ml-[22px] mt-[18px]" sm:w-full w-auto>
        <div flex items-center justify-start>
          <span class="c-#979797 text-14px">APPS</span>
          <i class="mx-6px">
            <img class="w-8px" :src="Right" alt="Right">
          </i>
          <span class="c-#05D4FD text-14px">GEN-1</span>
        </div>
        <h2 class="mt-35px text-26px mb-19px">
          About
        </h2>
        <p class="text-left" v-html="detailLine" />
      </section>
    </div>
    <div
      relative
      class="2xl:ml-352px sm:ml-55 2xl:w-1160px 2xl:h-676px sm:w-200 sm:h-100 w-full"
    >
      <Carousel ref="carousel" :per-page="1" pagination-active-color="#05D4FD" :adjustable-height="true">
        <Slide>
          <img :src="Game" alt="Game">
        </Slide>
        <Slide>
          <img :src="Game" alt="Game">
        </Slide>
      </Carousel>
      <i sm:block hidden absolute left-0 class="top-[50%] mt-[-22.5px] ml-[-6%]" cursor-pointer @click="backward">
        <img class="2xl:w-45px w-30px" :src="Left1">
      </i>
      <i sm:block hidden absolute right-0 class="top-[50%] mt-[-22.5px] mr-[-6%]" cursor-pointer @click="forward">
        <img class="2xl:w-45px w-30px" :src="Right1">
      </i>
    </div>
  </div>
</template>

<style>
.leftBottom {
  border-bottom: 1px solid #6D6D6D;
}
.shareImg i {
  margin: 0 14px;
  cursor: pointer;
}
.Application {
  background: #FFB9B7 !important;
}
.VueCarousel-dot-container {
  margin-top: 0 !important;
}
</style>
