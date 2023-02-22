<script setup>
import { ref } from 'vue'
import Left from './img/left.png'
import LeftOff from './img/leftoff.png'
import FenLeiOff from './img/fenleioff.png'
import FenLei from './img/fenlei.png'
import Filter from './img/filter.png'
import FilterOff from './img/filteroff.png'
import Shoucang from './img/shoucang.png'
import ShoucangOff from './img/shoucangoff.png'
import JurassicWait from './img/jurassicwait.png'
import JurassicWaitOff from './img/jurassicwaitoff.png'
import Bottom from './img/bottom.png'
import Right from './img/right.png'
import Search from './img/search.png'
import Quest from './img/quest.png'
import See from './img/see.png'
import Like from './img/like.png'
import Start from './img/start.png'
import StartOff from './img/startOff.png'
const stable = ref([
  {
    name: 'Categories',
    on: FenLei,
    off: FenLeiOff,
  },
  {
    name: 'Trending',
    on: Filter,
    off: FilterOff,
  },
  {
    name: 'Favorite',
    on: Shoucang,
    off: ShoucangOff,
  },
  {
    name: 'History',
    on: JurassicWait,
    off: JurassicWaitOff,
  },
])
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
const categories = ref('')
const changeOnce = () => {

}
const leftshow = ref(true)
const leftOff = () => {
  leftshow.value = !leftshow.value
}
const clickBar = (idx) => {
  leftStatus.value[idx].bar = !leftStatus.value[idx].bar
}
const clickBarStatus = ref('')
const searchAll = (name) => {
  clickBarStatus.value = name
}
const startStatus = ref(false)
const goInto = () => {
  localStorage.setItem('setDetail', 1)
  window.location.href = '/detail'
}
</script>

<template>
  <div class="bg-[#201f24] 2xl:pl-[158px] 2xl:pr-[161px] pl-[2vw] pr-[2vw]" w-full>
    <div class="leftBottom pt-[27px] pb-[19px]" flex items-center justify-start>
      <div flex items-center justify-center @click="leftOff">
        <span cursor-pointer flex items-center justify-center block class=" bg-[#475369] rounded-[23px] 2xl:w-[72px] 2xl:h-[46px] w-12 h-8">
          <img class="w-[20px] h-[20px]" :src="leftshow ? LeftOff : Left" alt="Left">
        </span>
      </div>
      <div flex items-center justify-center class="2xl:ml-36px ml-1">
        <span class="2xl:mr-36px mr-1 bg-[#3C3C3E] rounded-[26px] 2xl:w-[190px] 2xl:h-[46px] w-45 h-10" cursor-pointer flex items-center justify-center c-white @click="changeOnce">
          <img class="w-[16px]" :src="FenLei" alt="FenLei">
          <span class="ml-[16px] mr-[9px]">Categories</span>
          <i> <img class="w-[14px]" :src="Bottom" alt="Bottom"></i>
        </span>
        <span class="2xl:mr-36px mr-1 bg-[#3C3C3E] rounded-[26px] 2xl:w-[184px] 2xl:h-[46px] w-45 h-10" cursor-pointer flex items-center justify-center c-white @click="changeOnce">
          <img class="w-[20px]" :src="FilterOff" alt="FilterOff">
          <span class="ml-[16px] mr-[9px]">Trending</span>
          <i> <img class="w-[14px]" :src="Bottom" alt="Bottom"></i>
        </span>
        <span class="2xl:mr-36px mr-1 bg-[#3C3C3E] rounded-[26px] 2xl:w-[194px] 2xl:h-[46px] w-45 h-10" cursor-pointer flex items-center justify-center c-white @click="changeOnce">
          <img class="w-[27px]" :src="ShoucangOff" alt="ShoucangOff">
          <span class="ml-[16px] mr-[9px]">Favorite</span>
          <i> <img class="w-[14px]" :src="Bottom" alt="Bottom"></i>
        </span>
        <span class="2xl:mr-36px mr-1 bg-[#3C3C3E] rounded-[26px] 2xl:w-[197px] 2xl:h-[46px] w-45 h-10" cursor-pointer flex items-center justify-center c-white @click="changeOnce">
          <img class="w-[26px]" :src="JurassicWaitOff" alt="JurassicWaitOff">
          <span class="ml-[16px] mr-[9px]">History</span>
          <i> <img class="w-[14px]" :src="Bottom" alt="Bottom"></i>
        </span>
      </div>
      <aside w-full>
        <div class="px-4 py-1 pr-8" baseline flex items-center justify-center style="height: 46px;background: #3C3C3E;border-radius: 26px;">
          <input v-model="categories" class="c-[#6D6D6D]" placeholder="Search for apps,categories" style="background: #3C3C3E;" outline-none border-none w-full type="text">
          <img
            cursor-pointer
            class="w-[22px]"
            :src="Search"
          >
        </div>
      </aside>
    </div>
    <div
      flex items-start justify-start style="font-family: Helvetica;"
    >
      <aside v-show="leftshow" class="pr-[19px] w-50 2xl:text-lg 2xl:w-[236px] border-r b-r-[#6D6D6D]" c-white>
        <div v-for="(item, index) in leftStatus" :key="index" sm:cursor-pointer class="p-b-[15px] pt-[19px] leftBar " @click.stop="clickBar(index)">
          <div flex items-center justify-between>
            <span>{{ item.name }}</span>
            <i class="pr-[1px]"><img class="w-[10px]" :src="Right" alt="Right"></i>
          </div>
          <aside v-if="item.bar" class="2xl:ml-13px 2xl:text-sm c-[#D8D8D8] ml-5">
            <div v-for="(it, idx) in item.children" :key="idx" flex items-center justify-between class=" my-2 2xl:my-13px hover:c-[#05D4FD]" :class="[clickBarStatus === it.name ? 'c-[#05D4FD]' : '']" @click.stop="searchAll(it.name)">
              <span> {{ it.name }}</span>
              <span> {{ it.num }}</span>
            </div>
          </aside>
        </div>
      </aside>
      <section class="ml-[22px] mt-[25px]" w-full>
        <span c-white>{{ clickBarStatus }}</span>
        <div class="mt-24px">
          <div relative c-white class="w-[320px] h-118px rounded-[10px]" style="border: 1px solid rgb(151 151 151 / 33%);" @click="goInto">
            <div class="w-[320px] h-118px rounded-[10px]" />
            <div absolute top-0 left-0 right-0 z-2>
              <div flex items-center justify-end class="mt-[12px] mr-[18px] text-sm">
                <span flex items-center justify-center><img
                  :src="See"
                  class="w-16px mr-4px"
                >22</span>
                <span cursor-pointer flex items-center justify-center><img
                  :src="Like"
                  class="w-14px mr-4px ml-8px"
                >21</span>
                <img
                  cursor-pointer
                  :src="startStatus ? Start : StartOff"
                  class="w-16px ml-8px"
                  @click="startStatus = !startStatus"
                >
              </div>
              <div class="ml-18px" flex items-center justify-start>
                <img
                  class="w-[32px]"
                  :src="Quest"
                  alt="Quest"
                >
                <span class="ml-11px">Quest 3</span>
              </div>
              <div class="ml-18px mt-12px">
                Arrakis is a protocol specialized in
              </div>
            </div>
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
.leftBar:not(:last-child) {
  border-bottom: 1px solid #6D6D6D;
}
</style>
