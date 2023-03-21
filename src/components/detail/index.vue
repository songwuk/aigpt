<script setup>
import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
import '@jambonn/vue-concise-carousel/lib/vue-concise-carousel.css'
import { onMounted, reactive, ref } from 'vue'
import { productsImage, productsQuery } from '../../url'
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
const forList = ref([])
const listData = reactive({
  views: 0,
  likes: 0,
  product_name: '',
  product_logo: '',
  product_url: '',
  product_short_desc: '',
  product_imgs: [],
  social_media: {},
})
const carousel = ref('')
const forward = () => {
  carousel.value.handleNavigation('forward')
}
const backward = () => {
  carousel.value.handleNavigation('backward')
}
onMounted(async () => {
  const id = localStorage.getItem('detail')
  const { data } = await productsQuery(id)
  const dataSource = data.value
  if (dataSource && dataSource.code === 0) {
    listData.product_logo = productsImage(dataSource.data.product_logo)
    listData.product_imgs = dataSource.data.product_imgs.map(it => productsImage(it))
    listData.views = dataSource.data.views
    listData.likes = dataSource.data.likes
    listData.product_name = dataSource.data.product_name
    listData.product_detail = dataSource.data.product_detail
    listData.product_url = dataSource.data.product_url
    listData.product_short_desc = dataSource.data.product_short_desc
    listData.social_media = dataSource.data.social_media
    listData.product_model = dataSource.data.product_model
    forList.value.push(...dataSource.data.product_categry, dataSource.data.product_model, dataSource.data.product_applications, dataSource.data.product_generative_ai)
    forList.value = forList.value.filter(value => (value !== '' && value !== undefined && value !== null))
  }
})
</script>

<template>
  <div
    w-full flex items-center justify-center class="h-366px text-45px"
    style=" background: linear-gradient(269deg, #1C82FE 0%, #5106FE 100%);font-family: Charter-Black, Charter; font-weight: 900; color: #FFFFFF;"
  >
    <span sm:text-center text-left>Revolutionary Generative AI, Empowered Workflows</span>
  </div>
  <div w-full class="bg-[#201f24] 2xl:pl-[158px] 2xl:pr-[161px] pl-[2vw] pr-[2vw]  pb-200px">
    <div class="leftBottom">
      <div flex items-center justify-between>
        <div class="w-170px h-170px rounded-[16px] mt-[-80px] overflow-hidden" style="border: 2px solid #FFFFFF;">
          <img w-full :src="listData.product_logo" alt="product_logo">
        </div>
        <div>
          <div flex items-center justify-end class="mt-[-10px] mr-[18px] text-sm">
            <span flex items-center justify-center><img
              :src="See"
              class="w-16px mr-4px"
            >{{ listData.views }}</span>
            <span cursor-pointer flex items-center justify-center><img
              :src="Like"
              class="w-14px mr-4px ml-8px"
            >{{ listData.likes }}</span>
          </div>
        </div>
      </div>
      <div class="mt-21px mb-[17px]" flex items-center justify-between>
        <span class="text-26px">{{ listData.product_name }}</span>
        <aside flex items-center justify-center class="shareImg">
          <i>
            <a :href="listData.social_media?.facebook ? listData.social_media.facebook : 'javascript:void(0) '">
              <img class="w-13px" :src="Facebook" alt="Facebook">
            </a>
          </i>
          <i>
            <a :href="listData.social_media?.instagram ? listData.social_media.instagram : 'javascript:void(0) '">
              <img class="w-22px" :src="Instagram" alt="Instagram">
            </a>
          </i>
          <i>
            <a :href="listData.social_media?.discord ? listData.social_media.discord : 'javascript:void(0) '">
              <img class="w-24px" :src="Discord" alt="Discord">
            </a>
          </i>
          <i>
            <a :href="listData.social_media?.twitter ? listData.social_media.twitter : 'javascript:void(0) '">
              <img class="w-22px" :src="Twitter" alt="Twitter">
            </a>
          </i>
          <i>
            <img class="w-22px" :src="StartOff" alt="StartOff">
          </i>
          <i>
            <img class="w-22px" :src="ShareConversation" alt="ShareConversation">
          </i>
        </aside>
      </div>
      <span block class="text-18px mb-26px">{{ listData.product_short_desc }}</span>
    </div>
    <div
      flex items-start justify-start style="font-family: Helvetica;" class=" mb160px"
    >
      <aside sm:shrink-0 class="2xl:text-lg mt-18px mb-11px xl:w-300px sm:w-50" c-white>
        <span block class="text-18px mb-11px">TAGS</span>
        <aside flex item-center justify-start flex-wrap>
          <span v-for="(item, index) in forList" :key="index" cursor-pointer block :class="item === 'Application' ? 'Application' : ''" class="mb-17px mr-10px bg-[#BEE3F8]  rounded-15px py-5px px-12px text-16px">{{ item }}</span>
        </aside>
        <a :href="listData.product_url" target="_blank">
          <button
            class="w-158px h-40px rounded-8px"
            style="background: linear-gradient(315deg, #1C82FE 0%, #5106FE 100%);"
          >
            View Website
          </button>
        </a>
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
          {{ listData.product_model }}
        </h2>
        <p class="text-left">
          {{ listData.product_detail }}
        </p>
      </section>
    </div>
    <div
      relative
      class="2xl:ml-352px sm:ml-55 2xl:w-1160px 2xl:h-676px sm:w-200 sm:h-100 w-full"
    >
      <Carousel ref="carousel" :per-page="1" pagination-active-color="#05D4FD" :adjustable-height="true">
        <Slide v-for="(it, index) in listData.product_imgs" :key="index">
          <img :src="it" alt="product_imgs">
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
