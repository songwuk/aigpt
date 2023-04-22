<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue'
import { debounce } from 'lodash-es'
import type { ReturnData, ReturnPageData } from '../types'
import { favoriteOfPage, historyOfPage, productsImage, productsLoadCateg, productsMemberClearHistory, productsMemberFavorite, productsMemberLike, productsPage } from '../url'
import Left from './img/left_off.png'
import LeftOff from './img/left.png'
import FenLeiOff from './img/fenleioff.png'
import FenLei from './img/fenlei.png'
import Filter from './img/filter.png'
import FilterOff from './img/filteroff.png'
import AddSub from './img/addSub.png'
import Shoucang from './img/shoucang.png'
import ShoucangOff from './img/shoucangoff.png'
import JurassicWait from './img/jurassicwait.png'
import JurassicWaitOff from './img/jurassicwaitoff.png'
import Bottom from './img/bottom.png'
import Right from './img/right.png'
import Search from './img/search.png'
import DeleteImg from './img/clear.png'
import See from './img/see.png'
import Like from './img/like.png'
import Start from './img/start.png'
import StartOff from './img/startoff.png'
import NoHistory from './img/no_history.png'
import NoFavorite from './img/no_favorite.png'
import { useUserStore } from '@/store'
import { NumUtils } from '@/utils'
const userStore = useUserStore()
const sort = ref('a-z')
const leftStatus = ref([
  {
    name: 'Model',
    children: [],
    bar: true,
  },
  {
    name: 'Generative AI',
    children: [],
    bar: true,
  },
  {
    name: 'Use Case',
    children: [],
    bar: true,
  },
])
const keyword = ref('')
const leftshow = ref(true)
const historyOrFavorite = ref(false)
const getPageShow = ref(true)
const leftOff = () => {
  leftshow.value = !leftshow.value
}
const clickBar = (idx) => {
  leftStatus.value[idx].bar = !leftStatus.value[idx].bar
}
const clickBarStatus = ref('')
const clickBarText = ref('')
const getPageList = ref([])
const product_categry = ref('')
const isEmpty = ref(false)
const product_model = ref('')
const pageInfo = reactive({
  page: 1,
  size: 12,
})
const product_applications = ref('')
const product_generative_ai = ref('')
const isPageChange = ref(false)
const getPage = async () => {
  historyOrFavorite.value = false
  getPageShow.value = true
  if (!isPageChange.value) {
    pageInfo.page = 1
    getPageList.value = []
  }
  const { data } = await productsPage<ReturnPageData>({
    page: pageInfo.page,
    size: pageInfo.size,
    condition: {
      product_categry: product_categry.value,
      product_model: product_model.value,
      product_applications: product_applications.value,
      product_generative_ai: product_generative_ai.value,
      sort: sort.value,
      user_id: userStore.userInfo._id,
    },

  })
  const dataSource = data.value
  if (dataSource && dataSource.code === 0) {
    const nowData = dataSource.data.productList.map((item) => {
      const strlikes = NumUtils.formatWithK(item.likes)
      const strviews = NumUtils.formatWithK(item.views)
      return {
        ...item,
        likes: strlikes,
        views: strviews,
        product_logo: productsImage(item.product_logo),
        product_imgs: item.product_imgs.map(it => productsImage(it)),
      }
    })
    if (nowData.length === 0)
      isEmpty.value = true
    else
      isEmpty.value = false

    getPageList.value.push(...nowData)
  }
  isPageChange.value = false
}

const goInto = (id) => {
  localStorage.setItem('detail', id)
  window.location.href = `/detail?id=${id}`
}
const showdot = ref(null)
const clickButton = ref([])
const categoriesShow = ref(false)
const trendingShow = ref(false)
const favoriteShow = ref(false)
const historyShow = ref(false)
const trendingShowf = async () => {
  trendingShow.value = !trendingShow.value
  favoriteShow.value = false
  historyShow.value = false
  clickBarStatus.value = 'Trending'
}
const searchAll = async (name, text, itemName) => {
  clickBarStatus.value = name
  clickBarText.value = text
  product_model.value = ''
  product_applications.value = ''
  product_generative_ai.value = ''
  sort.value = ''
  product_categry.value = ''
  favoriteShow.value = false
  historyShow.value = false
  if (itemName === 'Model')
    product_model.value = text
  else if (itemName === 'Application')
    product_applications.value = text
  else if (itemName === 'Generative AI')
    product_generative_ai.value = text
  await getPage()
}
const topAndBottom = ref(-1)
const favoriteShowf = async () => {
  historyOrFavorite.value = true
  getPageShow.value = false
  isEmpty.value = true
  pageInfo.page = 1
  getPageList.value = []
  clickBarText.value = ''
  trendingShow.value = false
  showdot.value = null
  historyShow.value = false
  favoriteShow.value = true
  clickBarStatus.value = 'Favorite'
  const { data } = await favoriteOfPage<ReturnPageData>(pageInfo.page, userStore.userInfo._id)
  const dataSource = data.value
  if (dataSource && dataSource.code === 0 && dataSource.data.productList.length > 0) {
    getPageList.value = dataSource.data.productList.map((item) => {
      const strlikes = NumUtils.formatWithK(item.likes)
      const strviews = NumUtils.formatWithK(item.views)
      return {
        ...item,
        likes: strlikes,
        views: strviews,
        product_logo: productsImage(item.product_logo),
        product_imgs: item.product_imgs.map(it => productsImage(it)),
      }
    })
  }
}
const historyShowf = async () => {
  historyOrFavorite.value = true
  getPageShow.value = false
  isEmpty.value = true
  pageInfo.page = 1
  getPageList.value = []
  clickBarText.value = ''
  trendingShow.value = false
  favoriteShow.value = false
  historyShow.value = true
  showdot.value = null
  clickBarStatus.value = 'History'
  const { data } = await historyOfPage<ReturnPageData>(pageInfo.page, userStore.userInfo._id)
  const dataSource = data.value
  if (dataSource && dataSource.code === 0 && dataSource.data.productList.length > 0) {
    getPageList.value = dataSource.data.productList.map((item) => {
      const strlikes = NumUtils.formatWithK(item.likes)
      const strviews = NumUtils.formatWithK(item.views)
      return {
        ...item,
        likes: strlikes,
        views: strviews,
        product_logo: productsImage(item.product_logo),
        product_imgs: item.product_imgs.map(it => productsImage(it)),
      }
    })
  }
}

const trending = ref([
  {
    name: 'A-Z',
    href: 'javascript:void(0)',
    key: 'a-z',
  },
  {
    name: 'Trending',
    href: 'javascript:void(0)',
    key: 'trending',
  },
  {
    name: 'Latest',
    href: 'javascript:void(0)',
    key: 'latest',
  },
  {
    name: 'Like',
    href: 'javascript:void(0)',
    key: 'like',
  },
])
const handleCurrentChange = () => {
  pageInfo.page++
  isPageChange.value = true
}
clickBarText.value = 'A-Z'
const dotfn = async (idx) => {
  sort.value = trending.value[idx].key
  clickBarText.value = trending.value[idx].name
  showdot.value = idx
  trendingShow.value = false
  product_model.value = ''
  product_applications.value = ''
  product_generative_ai.value = ''
  isPageChange.value = false
  await getPage()
}

const itemRefs = ref([])
const searchList = ref([])
const isLoading = ref(false)
const getSearchPage = async () => {
  isLoading.value = true
  const { data } = await productsPage<ReturnPageData>({
    page: pageInfo.page,
    size: pageInfo.size,
    condition: {
      keyword: keyword.value,
    },
  })
  const dataSource = data.value
  if (dataSource && dataSource.code === 0) {
    const nowData = dataSource.data.productList.map((item) => {
      const strlikes = NumUtils.formatWithK(item.likes)
      const strviews = NumUtils.formatWithK(item.views)
      return {
        ...item,
        likes: strlikes,
        views: strviews,
        product_logo: productsImage(item.product_logo),
        product_imgs: item.product_imgs.map(it => productsImage(it)),
      }
    })
    topAndBottom.value = 0
    searchList.value = nowData
  }
  isLoading.value = false
}
const inputModule = debounce(async () => {
  await getSearchPage()
}, 500)

const onmouseover = (index) => {
  itemRefs.value[index].querySelectorAll('div')[2].style.display = 'flex'
}
const isOnCategories = ref(false)
const onmouseout = (index) => {
  itemRefs.value[index].querySelectorAll('div')[2].style.display = '-webkit-box'
}
const mouseOut = debounce(() => {
  if (categoriesShow.value && isOnCategories.value)
    categoriesShow.value = true
  else
    categoriesShow.value = false
}, 100)

const useCase = async (name) => {
  // product_model.value = ''
  // product_applications.value = ''
  // product_generative_ai.value = ''
  product_categry.value = name
  await getPage()
  categoriesShow.value = false
}
watch(() => pageInfo.page, async (newPage) => {
  if (newPage === 1)
    getPageList.value = []
  if (newPage > 1)
    await getPage()
})
const searchOut = (idx: number) => {
  topAndBottom.value = -1
}
const searchIn = (idx: number) => {
  topAndBottom.value = idx
}
onMounted(async () => {
  const { data } = await productsLoadCateg<ReturnData>()
  const chatDataSource = data.value
  if (chatDataSource && chatDataSource.code === 0) {
    // eslint-disable-next-line array-callback-return
    clickButton.value = chatDataSource.data.categry.sort((a, b) => {
      const nameA = a.name.toUpperCase() // ignore upper and lowercase
      const nameB = b.name.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB)
        return -1

      if (nameA > nameB)
        return 1
    })
    leftStatus.value[0].children = chatDataSource.data.model.map((item, index) => {
      return { key: `${item.name}model${index}`, ...item }
    })
    leftStatus.value[1].children = chatDataSource.data.generativeAi.map((item, index) => {
      return { key: `${item.name}generativeAi${index}`, ...item }
    })
    leftStatus.value[2].children = chatDataSource.data.applications.map((item, index) => {
      return { key: `${item.name}applications${index}`, ...item }
    })
    showdot.value = 0
    await getPage()
  }
  window.addEventListener('scroll', debounce(() => {
    if ((document.documentElement.scrollHeight - 200 <= document.documentElement.scrollTop + window.innerHeight) && !isEmpty.value)
      handleCurrentChange()
  }, 500))
  const cardDom = document.querySelector('.cardDom') as HTMLElement
  cardDom.addEventListener('scroll', debounce(() => {
    if ((cardDom.scrollHeight - 200 <= cardDom.scrollTop + 750) && !isEmpty.value)
      handleCurrentChange()
  }, 500))
  window.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.keyCode === 38) { // --
      ev.preventDefault()
      topAndBottom.value -= 1
      if (topAndBottom.value < 0)
        topAndBottom.value = searchList.value.length - 1
    }
    else if (ev.keyCode === 40) { // ++
      ev.preventDefault()
      topAndBottom.value += 1
      if (topAndBottom.value > searchList.value.length - 1)
        topAndBottom.value = 0
    }
    else if (ev.keyCode === 13 && topAndBottom.value > -1) {
      const id = searchList.value[topAndBottom.value].id
      goInto(id)
    }
  })
  window.addEventListener('click', (ev) => {
    searchList.value = []
    keyword.value = ''
  })
})
const deletFn = async () => {
  const { data } = await productsMemberClearHistory<any>(userStore.userInfo._id)
  if (data.value.code === 0)
    getPageList.value = []
}
const submitPath = () => {
  window.location.href = '/submit'
}
</script>

<template>
  <div class="bg-[#201f24] 2xl:pl-[158px] 2xl:pr-[161px] pl-[2vw] pr-[2vw]" w-full>
    <div class="leftBottom pt-[27px] pb-[19px]" flex sm:items-center justify-start relative sm:flex-row flex-col items-start>
      <div flex items-center justify-center @click="leftOff">
        <span sm:cursor-pointer flex items-center justify-center block class=" hover:bg-[#475369] bg-[#3C3C3E] rounded-[23px] 2xl:w-[72px] 2xl:h-[46px] w-12 h-8">
          <img class="w-[20px] h-[20px]" :src="leftshow ? LeftOff : Left" alt="Left">
        </span>
      </div>
      <div flex items-center justify-center sm:flex-nowrap flex-wrap class="2xl:ml-36px sm:ml-1 ml-0 sm:my-0 my-10px">
        <span class="2xl:mr-36px mr-1 hover:bg-[#475369] bg-[#3C3C3E] rounded-[26px] 2xl:w-[190px] 2xl:h-[46px] w-45 h-10 sm:my-0 my-5px" sm:cursor-pointer flex items-center justify-center c-white @mouseleave="mouseOut" @mouseenter.stop.prevent="categoriesShow = true" @click="categoriesShow = !categoriesShow">
          <img class="w-[16px]" :src="categoriesShow ? FenLei : FenLeiOff" alt="FenLei">
          <span class="ml-[16px] mr-[9px]" :class="categoriesShow ? 'c-[#05D4FD]' : 'c-white' ">Categories</span>
          <i>
            <img v-if="categoriesShow" class="w-[14px]" :src="Bottom" alt="Bottom">
            <img v-else class="w-[8px]" :src="Right" alt="Right">
          </i>
        </span>
        <span relative class=" hover:bg-[#475369] 2xl:mr-36px mr-1 bg-[#3C3C3E] rounded-[26px] 2xl:w-[184px] 2xl:h-[46px] w-45 h-10 sm:my-0 my-5px" sm:cursor-pointer flex items-center justify-center c-white @click.stop="trendingShowf">
          <img class="w-[20px]" :src="trendingShow || showdot !== null ? Filter : FilterOff" alt="FilterOff">
          <span class="ml-[16px] mr-[9px]" :class="trendingShow || showdot !== null ? 'c-[#05D4FD]' : 'c-white' ">Trending</span>
          <div
            v-show="trendingShow"
            class="absolute right-0 z-10 mt-50 origin-top-right rounded-md border border-transparent
            c-white bg-zinc-800 shadow-xl ring-black focus:outline-none divide-zinc-400 dark:divide-zinc-700"
          >
            <div className="py-1">
              <div v-for="(item, index) in trending" :key="index">
                <div>
                  <a
                    class="block px-4 py-2 text-sm hover:c-[#05D4FD] hover:dark:c-zinc-700"
                    :class="index === showdot ? 'c-[#05D4FD]' : 'c-white'"
                    flex items-center justify-between :href="item.href" @click.stop="dotfn(index)"
                  >
                    {{ item.name }}
                    <span v-show="index === showdot" block class="w-[8px] h-[8px] ml-20px bg-[#05D4FD] rounded-full" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </span>
        <span class="2xl:mr-36px mr-1 hover:bg-[#475369] bg-[#3C3C3E] rounded-[26px] 2xl:w-[194px] 2xl:h-[46px] w-45 h-10 sm:my-0 my-5px" sm:cursor-pointer flex items-center justify-center c-white @click="favoriteShowf">
          <img class="w-[27px]" :src=" favoriteShow ? Shoucang : ShoucangOff" alt="ShoucangOff">
          <span class="ml-[16px] mr-[9px]" :class="favoriteShow ? 'c-[#05D4FD]' : 'c-white' ">Favorite</span>
        </span>
        <span class="2xl:mr-36px mr-1 hover:bg-[#475369] bg-[#3C3C3E] rounded-[26px] 2xl:w-[197px] 2xl:h-[46px] w-45 h-10 sm:my-0 my-5px" sm:cursor-pointer flex items-center justify-center c-white @click="historyShowf">
          <img class="w-[26px]" :src="historyShow ? JurassicWait : JurassicWaitOff" alt="JurassicWaitOff">
          <span class="ml-[16px] mr-[9px]" :class="historyShow ? 'c-[#05D4FD]' : 'c-white' ">History</span>
        </span>
      </div>
      <aside w-full>
        <div relative class="px-4 py-1 pr-8" baseline flex items-center justify-center style="height: 46px;background: #3C3C3E;border-radius: 26px;">
          <el-icon v-if="isLoading" class="is-loading mr-5px !c-white">
            <Loading />
          </el-icon>
          <input v-model="keyword" class="c-white" placeholder="Search for apps,categories" style="background: #3C3C3E; text-indent: 10px" outline-none border-none w-full type="text" @click.stop="() => {}" @input="inputModule">
          <img
            sm:cursor-pointer
            class="w-[20px]"
            :src="Search"
            @click="inputModule"
          >
          <div v-show="searchList.length > 0" class="c-white search_content top-46px bg-#3C3C3E h-100  overflow-y-scroll over" absolute left-0 right-0 z-10 style="border-radius: 10px; padding: 5px 5px;">
            <div v-for="(item, index) in searchList" :key="index" flex items-center justify-start :class="[topAndBottom === index ? 'bg-[#6D6D6D]' : '']" class="w-full h-50px cursor-pointer hover:bg-[#6D6D6D] my-5px px-5px" @click.stop="goInto(item.id)" @mouseleave="searchOut(index)" @mouseenter.stop.prevent="searchIn(index)">
              <img
                class="w-[32px] mr-10px"
                loading="lazy" :src="item.product_logo" alt=""
              >
              <p truncate>
                {{ item.product_short_desc }}
              </p>
            </div>
          </div>
        </div>
      </aside>
      <div v-show="categoriesShow" z-10 absolute class="top-[85px] 2xl:left-[108px] left-12 2xl:w-[calc(100%-108px)]  w-[calc(100%-3rem)]  rounded-10px " style="background-color: #33333E;" @mouseleave="categoriesShow = false; isOnCategories = false" @mouseenter="categoriesShow = true; isOnCategories = true">
        <button
          style="width: 190px;height: 36px;background: linear-gradient(315deg, #1C82FE 0%, #5106FE 100%);" c-white
          class="ml-[24px] mt-[24px] rounded-8px text-[18px]"
        >
          All Use Cases {{ clickButton.length }}
        </button>
        <div w-full h-100>
          <div class="mt-[31px] ml-[24px] pb-10px overflow-y-scroll" flex items-start justify-start flex-wrap flex-row>
            <span
              v-for="(it, idx) in clickButton"
              :key="idx" sm:cursor-pointer style="background: #BEE3F8;font-family: Helvetica;"
              class="text-[14px] rounded-17px px-[16px] py-[7px] mr-16px mb-20px"
              text-center
              @click="useCase(it.name)"
            >{{ it.name }} {{ it.count }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      flex items-start justify-start style="font-family: Helvetica;"
    >
      <aside v-show="leftshow" overflow-y-scroll class="pr-[19px] w-75 2xl:text-lg border-r b-r-[#6D6D6D] h-750px sm:mr-[22px] mr-[5px]" c-white>
        <div v-for="(item, index) in leftStatus" :key="index" sm:sm:cursor-pointer class="p-b-[15px] pt-[19px] leftBar " @click.stop="clickBar(index)">
          <div flex items-center justify-between>
            <span>{{ item.name }}</span>
            <i class="pr-[1px]"><img class="w-[10px]" :src="Right" alt="Right"></i>
          </div>
          <aside v-if="item.bar" class="2xl:ml-13px 2xl:text-sm c-[#D8D8D8] ml-5">
            <div v-for="(it, idx) in item.children" :key="idx" flex items-center justify-between class=" my-2 2xl:my-13px hover:c-[#05D4FD]" :class="[clickBarStatus === it.key ? 'c-[#05D4FD]' : '']" @click.stop="searchAll(it.key, it.name, item.name)">
              <span> {{ it.name }}</span>
              <span> {{ it.count }}</span>
            </div>
          </aside>
        </div>
      </aside>
      <section class="cardDom sm:mt-[25px]  h-750px  overflow-scroll" w-full relative>
        <span c-white>{{ clickBarText }}</span>
        <div v-if="getPageShow" overflow-y-auto flex items-start justify-start sm:flex-row flex-col sm:flex-wrap flex-nowrap class="mt-24px card">
          <div v-for="(item, index) in getPageList" :key="index" sm:cursor-pointer c-white class=" hover:bg-#131313 hover:b-[transparent] border-1 b-[#97979754] sm:w-[260px] xl-w[300px] 3xl:w-[380px] w-full h-auto rounded-[10px] sm:mr-20px mr-0 sm:my-0 my-10px sm:mb-20px" @mouseover="onmouseover(index)" @mouseout="onmouseout(index)" @click="goInto(item.id)">
            <div ref="itemRefs" class="hover:bg-#131313 border-1  rounded-[10px] b-[transparent] ">
              <div flex items-center justify-end class="mt-[12px] mr-[18px] text-sm">
                <span flex items-center justify-center><img
                  :src="See"
                  class="w-16px mr-4px"
                >{{ item.views }}</span>
                <span
                  :class="[item.isLike ? 'c-#05D4FD' : '']"
                  sm:cursor-pointer flex items-center justify-center @click.stop="async () => {
                    if (!item.isLike){
                      await productsMemberLike({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 0,
                      })
                      item.isLike = true
                    }
                    else {
                      await productsMemberLike({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 1,
                      })
                      item.isLike = false
                    }
                  }"
                ><img
                  :src="Like"
                  class="w-14px mr-4px ml-8px"
                >{{ item.likes }}</span>
                <img
                  sm:cursor-pointer
                  :src="item.isFavorite ? Start : StartOff"
                  class="w-16px ml-8px"
                  @click.stop.prevent="async () => {
                    if (!item.isFavorite){
                      await productsMemberFavorite({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 0,
                      })
                      item.isFavorite = true
                    }
                    else {
                      await productsMemberFavorite({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 1,
                      })
                      item.isFavorite = false
                    }
                  }"
                >
              </div>
              <div class="ml-18px" flex items-center justify-start>
                <img
                  class="w-[32px] h-[32px] rounded-50%"
                  loading="lazy"
                  object-fill
                  :src="item.product_logo"
                >
                <span class="ml-11px">{{ item.product_name }}</span>
              </div>
              <div style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical" class="ml-18px mt-12px py-5px ">
                {{ item.product_short_desc }}
              </div>
            </div>
          </div>
          <div v-show="getPageList.length > 0" flex items-center justify-center flex-col cursor-pointer class="border-1 b-[#97979754] sm:w-[380px] w-full h-auto rounded-[10px] sm:mr-20px mr-0 sm:my-0 my-10px sm:mb-20px py-20px" @click=" submitPath">
            <img class="w-50px" :src="AddSub" alt="AddSub">
            <p class="text-14px c-#C9C9C9">
              Submit Your Project
            </p>
          </div>
        </div>
        <img v-show="historyShow" absolute class="right-0 top-0 bottom-0 w-28px" cursor-pointer :src="DeleteImg" alt="DeleteImg" @click.stop="deletFn">
        <div absolute class="left-50% top-50% " style=" transform: translate(-50%,-50%);">
          <div v-if="getPageList.length === 0 && historyShow" flex items-center justify-center flex-col>
            <img class="sm:w-110px w-40px" :src="NoHistory" alt="">
            <span class="sm:text-20px text-16px mt-16px" c-white>No History</span>
          </div>
          <div v-if="getPageList.length === 0 && favoriteShow" flex items-center justify-center flex-col>
            <img class="sm:w-110px w-40px" :src="NoFavorite" alt="">
            <span class="sm:text-20px text-16px mt-16px" c-white>No Favorite</span>
          </div>
        </div>
        <div v-if="historyOrFavorite" class="mt-24px card" flex items-start justify-start sm:flex-row flex-col sm:flex-wrap flex-nowrap>
          <div v-for="(item, index) in getPageList" :key="index" sm:cursor-pointer c-white class=" hover:bg-#131313 hover:b-[transparent] border-1 b-[#97979754] sm:w-[260px] xl-w[300px] 3xl:w-[380px] w-full h-auto rounded-[10px] sm:mr-20px mr-0 sm:my-0 my-10px sm:mb-20px" @mouseover="onmouseover(index)" @mouseout="onmouseout(index)" @click="goInto(item.id)">
            <div ref="itemRefs" class="hover:bg-#131313 border-1  rounded-[10px] b-[transparent] ">
              <div flex items-center justify-end class="mt-[12px] mr-[18px] text-sm">
                <span flex items-center justify-center><img
                  :src="See"
                  class="w-16px mr-4px"
                >{{ item.views }}</span>
                <span
                  :class="[item.isLike ? 'c-#05D4FD' : '']"
                  sm:cursor-pointer flex items-center justify-center @click.stop="async () => {
                    if (!item.isLike){
                      await productsMemberLike({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 0,
                      })
                      item.isLike = true
                    }
                    else {
                      await productsMemberLike({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 1,
                      })
                      item.isLike = false
                    }
                  }"
                ><img
                  :src="Like"
                  class="w-14px mr-4px ml-8px"
                >{{ item.likes }}</span>
                <img
                  sm:cursor-pointer
                  :src="item.isFavorite ? Start : StartOff"
                  class="w-16px ml-8px"
                  @click.stop.prevent="async () => {
                    if (!item.isFavorite){
                      await productsMemberFavorite({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 0,
                      })
                      item.isFavorite = true
                    }
                    else {
                      await productsMemberFavorite({
                        user_id: userStore.userInfo._id ?? '',
                        product_id: item.id,
                        type: 1,
                      })
                      getPageList.splice(index, 1)
                      item.isFavorite = false
                    }
                  }"
                >
              </div>
              <div class="ml-18px" flex items-center justify-start>
                <img
                  class="w-[32px]  h-[32px] rounded-50%"
                  loading="lazy"
                  object-fill
                  :src="item.product_logo"
                  alt="Quest"
                >
                <span class="ml-11px">{{ item.product_name }}</span>
              </div>
              <div style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical" class="ml-18px mt-12px py-5px ">
                {{ item.product_short_desc }}
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

::-webkit-scrollbar {
  display: none;
}
@media (min-width: 640px) {
  .card {
    display: grid;
    grid-template-columns: repeat(auto-fit, 260px);
    justify-content: center;
    grid-gap: 25px
  }
}
@media (min-width: 1280px) {
  .card {
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    justify-content: center;
    grid-gap: 20px
  }
}
@media (min-width: 1900px) {
  .card {
    display: grid;
    grid-template-columns: repeat(auto-fit, 380px);
    justify-content: center;
    grid-gap: 20px
  }
}
</style>
