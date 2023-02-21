<script setup>
import { ref } from 'vue'
import Left from './img/left.png'
import FenLeiOff from './img/fenleioff.png'
import FenLei from './img/fenlei.png'
import Filter from './img/filter.png'
import FilterOff from './img/filteroff.png'
import Shoucang from './img/shoucang.png'
import ShoucangOff from './img/shoucangoff.png'
import JurassicWait from './img/jurassicwait.png'
import JurassicWaitOff from './img/jurassicwaitoff.png'
import Bottom from './img/bottom.png'
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
const categories = ref('')
const changeOnce = () => {

}
</script>

<template>
  <div class="bg-[#201f24] pl-[158px] pr-[161px]" w-full>
    <div class="leftBottom pt-[27px] pb-[19px]" flex items-center justify-start>
      <div flex items-center justify-center>
        <span cursor-pointer flex items-center justify-center block class=" bg-[#475369] rounded-[23px] 2xl:w-[72px] 2xl:h-[46px] w-12 h-8">
          <img class="w-[20px] h-[20px]" :src="Left" alt="Left">
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
        <div class="px-4 py-1 pr-8" flex items-center justify-center style="height: 46px;background: #3C3C3E;border-radius: 26px;">
          <input v-model="categories" class="c-[#6D6D6D]" placeholder="Search for apps,categories" style="background: #3C3C3E;" outline-none border-none w-full type="text">
          <img
            cursor-pointer
            class="label_5"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4f735fd0eb05095211e2b6cfeb3c978aaf0bfc7fb16535ee915ed2780cc68f9e"
          >
        </div>
      </aside>
    </div>
    <span mt-2>++++</span>
  </div>
</template>

<style scoped>
.leftBottom {
  border-bottom: 1px solid #6D6D6D;
}
</style>
