<script setup>
import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
import '@jambonn/vue-concise-carousel/lib/vue-concise-carousel.css'
import { onMounted, reactive, ref } from 'vue'
import { productsImage, productsMemberFavorite, productsQuery } from '../../url'
import See from '../img/see.png'
import Like from '../img/like.png'
import Facebook from '../img/facebook.png'
import InstagramOff from '../img/instagram_1.png'
import Discord from '../img/discord.png'
import Twitter from '../img/twitter.png'

import Instagram from '../img/instagram.png'
import FacebookOff from '../img/facebook_1.png'
import DiscordOff from '../img/discord_1.png'
import TwitterOff from '../img/twitter_1.png'
import StartOff from '../img/shoucang_2.png'
import ShareConversation from '../img/ShareConversation.png'
import ShareConversationStatusOff from '../img/share.png'
import shoucang from '../img/shoucang.png'
import Right from '../img/right.png'
import Right1 from '../img/right_1.png'
import Left1 from '../img/left_1.png'
import Start from '../img/start.png'
import { useUserStore } from '@/store'
import { NumUtils, parseQuery } from '@/utils'
const categoriesC = ref('bg-#BEE3F8')
const applicationC = ref('bg-#FFB9B7')
const generativeC = ref('bg-#B7FBF0')
const modelC = ref('bg-#E9D8FD')
const userStore = useUserStore()
const forList = ref([])
const listData = reactive({
  views: 0,
  likes: 0,
  product_name: '',
  product_logo: '',
  product_url: '',
  product_short_desc: '',
  product_imgs: [],
  isFavorite: false,
  social_media: {
    facebook: '',
    instagram: '',
    discord: '',
    twitter: '',
  },
})
const carousel = ref('')
const forward = () => {
  carousel.value.handleNavigation('forward')
}
const backward = () => {
  carousel.value.handleNavigation('backward')
}
const orderSearch = window.location.search
const id = parseQuery(orderSearch).id
const idDetail = ref('')
idDetail.value = id
onMounted(async () => {
  const { data } = await productsQuery(id, userStore.userInfo._id ?? '')
  const dataSource = data.value
  if (dataSource && dataSource.code === 0) {
    listData.product_logo = productsImage(dataSource.data.product_logo)
    listData.product_imgs = dataSource.data.product_imgs.map(it => productsImage(it))
    listData.views = NumUtils.formatWithK(dataSource.data.views)
    listData.likes = NumUtils.formatWithK(dataSource.data.likes)
    listData.product_name = dataSource.data.product_name
    listData.isFavorite = dataSource.data.isFavorite
    listData.product_detail = dataSource.data.product_detail
    listData.product_url = dataSource.data.product_url
    listData.product_short_desc = dataSource.data.product_short_desc
    if (dataSource.data.social_media)
      listData.social_media = dataSource.data.social_media

    listData.product_model = dataSource.data.product_model
    if (typeof dataSource.data.product_categry === 'object') {
      dataSource.data.product_categry.forEach((x) => {
        forList.value.push({
          name: x,
          key: 'categry',
        })
      })
    }
    else {
      dataSource.data.product_categry && dataSource.data.product_categry.split(',').forEach((x) => {
        forList.value.push({
          name: x,
          key: 'categry',
        })
      })
    }

    if (dataSource.data.product_applications) {
      forList.value.push({
        name: dataSource.data.product_applications,
        key: 'application',
      })
    }
    dataSource.data.product_model && dataSource.data.product_model.split(',').forEach((x) => {
      forList.value.push({
        name: x,
        key: 'model',
      })
    })
    if (dataSource.data.product_generative_ai) {
      forList.value.push({
        name: dataSource.data.product_generative_ai,
        key: 'generative',
      })
    }
  }
})
const shareConversationShow = ref(false)
const copyLink = () => {
  const link = `${import.meta.env.PUBLIC_WEB}/detail?id=${idDetail.value}`
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(link)
      .then((_) => {
        // eslint-disable-next-line no-console
        console.log('复制成功', link)
        alert('copy successfully')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('复制失败', err)
      })
  }
  else {
    // 创建text area
    const textArea = document.createElement('textarea')
    textArea.value = link
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    new Promise((resolve, reject) => {
      if (document.execCommand('copy'))
        resolve(true)
      else
        reject(new Error('error'))
      // 执行复制命令并移除文本框
      textArea.remove()
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('复制成功')
        alert('copy successfully')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err, '复制失败')
      })
  }
}
const FacebookStatus = ref(true)
const InstagramStatus = ref(true)
const DiscordStatus = ref(true)
const TwitterStatus = ref(true)
const ShareConversationStatus = ref(true)
const isFavoriteStatus = ref(true)
const URL = `${import.meta.env.PUBLIC_WEB}/detail?id=${idDetail.value}`
const ORIGIN = 'AiGPTme'
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
          <i v-show="listData.social_media.facebook">
            <a target="_blank" :href="listData.social_media?.facebook ? listData.social_media.facebook : 'javascript:void(0) '">
              <img class="w-13px" :src="!FacebookStatus ? FacebookOff : Facebook" alt="Facebook" @mouseleave="FacebookStatus = true" @mouseenter.stop.prevent="FacebookStatus = false">
            </a>
          </i>
          <i v-show="listData.social_media.instagram">
            <a target="_blank" :href="listData.social_media?.instagram ? listData.social_media.instagram : 'javascript:void(0) '">
              <img class="w-22px" :src="!InstagramStatus ? Instagram : InstagramOff" alt="Instagram" @mouseleave="InstagramStatus = true" @mouseenter.stop.prevent="InstagramStatus = false">
            </a>
          </i>
          <i v-show="listData.social_media.discord">
            <a target="_blank" :href="listData.social_media?.discord ? listData.social_media.discord : 'javascript:void(0) '">
              <img class="w-24px" :src="DiscordStatus ? Discord : DiscordOff" alt="Discord" @mouseleave="DiscordStatus = true" @mouseenter.stop.prevent="DiscordStatus = false">
            </a>
          </i>
          <i v-show="listData.social_media.twitter">
            <a target="_blank" :href="listData.social_media?.twitter ? listData.social_media.twitter : 'javascript:void(0) '">
              <img class="w-22px" :src="TwitterStatus ? Twitter : TwitterOff" alt="Twitter" @mouseleave="TwitterStatus = true" @mouseenter.stop.prevent="TwitterStatus = false">
            </a>
          </i>
          <i relative style=" font-style: normal;">
            <img
              class="w-22px" :src="!isFavoriteStatus ? shoucang : listData.isFavorite ? Start : StartOff" alt="StartOff" @mouseleave="isFavoriteStatus = true" @mouseenter.stop.prevent="isFavoriteStatus = false" @click.stop.prevent="async () => {
                if (!listData.isFavorite){
                  await productsMemberFavorite({
                    user_id: userStore.userInfo._id ?? '',
                    product_id: idDetail,
                    type: 0,
                  })
                  listData.isFavorite = true
                }
                else {
                  await productsMemberFavorite({
                    user_id: userStore.userInfo._id ?? '',
                    product_id: idDetail,
                    type: 1,
                  })
                  listData.isFavorite = false
                }
              }"
            >
          </i>
          <i relative style=" font-style: normal;" @click="shareConversationShow = !shareConversationShow">
            <div v-show="shareConversationShow" flex items-center justify-center flex-col absolute class="right-50% top-50% translate-x-0% translate-y-15% text-center -top-50px w-204px text-16px bg-#33333E border rounded-5px border-transparent">
              <div class="py-12px w-full" @click.stop="copyLink">Copy link</div>
              <a
                id="J-share-facebook" class="facebook"
                :href="`https://www.facebook.com/sharer/sharer.php?u=${URL}`" target="_blank"
              >
                <div class="py-12px  w-full border border-t-#5C5C60 border-transparent">Share on Facebook</div>
              </a>
              <a id="J-share-twitter" class="twitter" :href="`https://twitter.com/intent/tweet?text=${listData.product_name}&url=${URL}&via=${ORIGIN}`" target="_blank">
                <div class="py-12px w-full border border-t-#5C5C60 border-transparent" @click.stop="shareTwitter">Share on Twitter</div>
              </a>

            </div>
            <img class="w-22px" :src="!ShareConversationStatus ? ShareConversationStatusOff : ShareConversation" alt="ShareConversation" @mouseleave="ShareConversationStatus = true" @mouseenter.stop.prevent="ShareConversationStatus = false">
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
          <span v-for="(item, index) in forList" :key="index" cursor-pointer block :class="item.key === 'categry' ? categoriesC : item.key === 'model' ? modelC : item.key === 'application' ? applicationC : generativeC" class="mb-17px mr-10px bg-[#BEE3F8]  rounded-15px py-5px px-12px text-16px c-black">{{ item.name }}</span>
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
          <a href="/">
            <span class="c-#979797 text-14px hover:c-#05D4FD">APPS</span>
          </a>
          <i class="mx-6px">
            <img class="w-8px" :src="Right" alt="Right">
          </i>
          <span class="c-#05D4FD text-14px">{{ listData.product_name }}</span>
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
