<script lang='ts' setup>
import { onMounted, reactive, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { debounce } from 'lodash-es'
import { panelProductsEditProductStat, panelProductsPage, panelUsersPage } from '../url'
import Write from './img/write.png'
import AiGPT from './img/AiGPT_1.png'
import type { ReturnPageData } from '@/types'
import { NumUtils } from '@/utils'
const searchValue = ref('')
const isProducts = ref(true)
const bgColor = ref('bg-#004699')
const bc1 = ref('c-#F7B500')
const bc2 = ref('c-#72C8FF')
const bc3 = ref('c-#E02020')
const listProducts = ref([])
const totalProducts = ref(0)
const pageInfo = reactive({
  page: 1,
  size: 10,
})
const inputViewsRef = ref([])
const inputLikesRef = ref([])
const pageInfoUser = reactive({
  page: 1,
  size: 10,
})
const listRegisters = ref([])
const userList = async () => {
  const { data } = await panelUsersPage<ReturnPageData>({
    ...pageInfoUser,
  })
  const dataSource = data.value
  if (dataSource && dataSource.code === 0) {
    totalProducts.value = dataSource.data.total
    listRegisters.value = dataSource.data.memberList.map((item, index) => {
      return {
        id: dataSource.data.memberList.length - index,
        ...item,
        modifyTime: dayjs(item.modifyTime).format('DD/MM/YYYY'),
      }
    })
  }
}

const productsPage = async () => {
  const { data } = await panelProductsPage<ReturnPageData>({
    ...pageInfo,
    condition: {
      keyword: searchValue.value,
    },
  })
  const dataSource = data.value
  if (dataSource && dataSource.code === 0) {
    listProducts.value = dataSource.data.productList.map((item, index) => {
      const strlikes = item.likes ? NumUtils.formatWithK(item.likes) : 0
      const strviews = item.views ? NumUtils.formatWithK(item.views) : 0
      return {
        ...item,
        _id: dataSource.data.productList.length - index,
        likes: strlikes,
        views: strviews,
        likesS: item.likes,
        viewsS: item.views,
        modifyTime: dayjs(item.modifyTime).format('DD/MM/YYYY'),
        isInputViews: false,
        isInputLikes: false,
      }
    })
    console.log(listProducts.value)
    totalProducts.value = dataSource.data.total
  }
}
onMounted(async () => {
  await productsPage()
})
const idRef = ref('')
const viewsModel = ref('')
const likesModel = ref('')
const isTrendingRef = ref(false)
const productsEditProductStat = async () => {
  await panelProductsEditProductStat({
    id: idRef.value,
    views: viewsModel.value,
    likes: likesModel.value,
    isTrending: isTrendingRef.value,
  })
}

const editPro = debounce(async (id, start, type) => {
  viewsModel.value = ''
  likesModel.value = ''
  idRef.value = ''
  if (type === 'views')
    viewsModel.value = start
  if (type === 'likes')
    likesModel.value = start
  idRef.value = id
  await productsEditProductStat()
}, 1000)

const inputModule = debounce(async () => {
  await productsPage()
}, 1000)
watch(() => pageInfo.page, async () => {
  await productsPage()
})
watch(() => pageInfoUser.page, async () => {
  await userList()
})
const handleCurrentChangeUser = (val: number) => {
  pageInfoUser.page = val
}
const handleCurrentChange = (val: number) => {
  pageInfo.page = val
}
const clickBtn = async (id) => {
  idRef.value = id
  await productsEditProductStat()
}
const reviewPRD = (id) => {
  localStorage.setItem('submit', id)
  window.location.href = `/submit?id=${id}`
}
const creditgifts = ref()
watch(() => isProducts.value, async (newVal) => {
  if (newVal)
    await productsPage()
  else
    await userList()
})
const clickViews = (index: number, views) => {
  listProducts.value[index].isInputViews = true
  inputViewsRef.value[index].focus()
  listProducts.value[index].views = views
}

const clickLikes = (index: number, likes) => {
  listProducts.value[index].isInputLikes = true
  inputLikesRef.value[index].focus()
  listProducts.value[index].likes = likes
}
</script>

<template>
  <div class="py-28px px-60px" w-full flex="~" items-center sm:justify-between>
    <img sm:cursor-pointer class="w-[150px]" :src="AiGPT" alt="logo">
    <input v-model="searchValue" placeholder="Search for products or registers" class="indent-13px w-547px h-58px b-#26262C  border-solid border-#979797 border-1 rounded-8px" type="text" @input="inputModule">
  </div>
  <section class="w-full" flex="~" items-start justify-start>
    <aside class="w-265px">
      <div :class="[isProducts ? bgColor : '']" class=" border-transparent px-14px" cursor-pointer @click="isProducts = !isProducts">
        <div class="px-61px py-35px  border-transparent border-1 b-b-white">
          Products
        </div>
      </div>
      <div :class="[!isProducts ? bgColor : '']" class="border-transparent  px-14px" cursor-pointer @click="isProducts = !isProducts">
        <div class="px-61px py-35px border-transparent border-1 b-b-white">
          Registers
        </div>
      </div>
    </aside>
    <div v-if="isProducts" relative overflow-x-hidden overflow-y-scroll class="w-[calc(100%-265px)] h-[calc(100vh-114px)] pt-40px pl-51px pr-118px bg-#26262C ">
      <h3 class="text-30px">
        Products <span ml-30px>{{ totalProducts }}</span>
      </h3>
      <aside
        class="mt-16px w-1481px h-auto border-4px border-solid border-#FFFFFF"
      >
        <div class="header text-20px" :class="[bgColor]">
          <span text-center inline-block class="w-145px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Number</span>
          <span text-center inline-block class="w-140px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Name</span>
          <span text-center inline-block class="w-144px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Email</span>
          <span text-center inline-block class="w-150px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Website</span>
          <span text-center inline-block class="w-146px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Date</span>
          <span text-center inline-block class="w-140px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Views</span>
          <span text-center inline-block class="w-145px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Likes</span>
          <span text-center inline-block class="w-150px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Status</span>
          <span text-center inline-block class="w-155px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Trending</span>
          <span text-center inline-block class="w-145px h-80px leading-80px border-transparent border-2">Action</span>
        </div>
        <div class="content">
          <div v-for="(item, index) in listProducts" :key="index" flex :class="[index % 2 !== 0 ? 'bg-#333944' : '']">
            <span flex items-center justify-center text-center class="lineText w-145px min-h-80px  ">{{ item._id }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-140px min-h-80px ">{{ item.product_name }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-144px min-h-80px  ">{{ item.email }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-150px min-h-80px  ">{{ item.product_url }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-146px min-h-80px ">{{ item.modifyTime }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-140px min-h-80px ">
              <input ref="inputViewsRef" v-model="item.views" text-right style="outline: none;background: transparent;" class="w-50%" type="text" @input="editPro(item.id, item.views, 'views')">
              <img
                cursor-pointer :src="Write" class="w-20px ml-13px" @click="clickViews(index, item.viewsS)"
              >
            </span>
            <span flex items-center justify-center text-center inline-block class="lineText w-145px min-h-80px  ">
              <input ref="inputLikesRef" v-model="item.likes" text-right style="outline: none;background: transparent;" class="w-50%" type="text" @input="editPro(item.id, item.likes, 'likes')">
              <img cursor-pointer :src="Write" class="w-20px ml-13px" @click="clickLikes(index, item.likesS)">
            </span>
            <span flex items-center justify-center text-center inline-block class="lineText w-150px min-h-80px " :class="[item.status === 0 ? bc1 : item.status === 1 ? bc2 : bc3]">{{
              item.status === 0 ? 'Pending' : item.status === 1 ? 'Onboarded' : 'Banned'
            }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-155px  min-h-80px ">
              <span
                inline-block relative class="w-93px h-31px  border rounded-8px border-transparent" cursor-pointer @click="() => {
                  item.isTrending = !item.isTrending
                  isTrendingRef = item.isTrending
                  clickBtn(item.id)
                }"
              >
                <i absolute z-1 inline-block class="w-50px h-31px leading-31px border rounded-8px border-transparent -left-5px " :class="[item.isTrending ? 'bg-#004699 z-2' : 'bg-#B5BFCB']">On</i>
                <i absolute z-1 inline-block class=" -ml10px w-50px h-31px leading-31px border rounded-8px border-transparent" :class="[!item.isTrending ? 'bg-#004699  z-2' : 'bg-#B5BFCB']">Off</i>
              </span>
            </span>
            <span flex items-center justify-center text-center inline-block class=" w-145px">
              <span cursor-pointer inline-block class="w-93px h-40px leading-40px bg-#004699 border rounded-8px border-transparent" @click="reviewPRD(item.id)">Review</span>
            </span>
          </div>
        </div>
      </aside>
      <div class="page b-#26262C absolute right-0 pr-75px mt-20px pb-5">
        <el-pagination background layout="prev, pager, next" :page-size="10" :total="totalProducts" @current-change="handleCurrentChange" />
      </div>
    </div>
    <div v-else relative overflow-x-hidden overflow-y-scroll class="w-[calc(100%-265px)] h-[calc(100vh-114px)] pt-40px pl-51px pr-118px bg-#26262C ">
      <h3 class="text-30px">
        Registers <span ml-30px> {{ totalProducts }}</span>
      </h3>
      <aside
        class="mt-16px w-1481px h-auto border-4px border-solid border-#FFFFFF"
      >
        <div class="header text-20px" :class="[bgColor]">
          <span text-center inline-block class="w-148px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Number</span>
          <span text-center inline-block class="w-155px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Email</span>
          <span text-center inline-block class="w-290px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Address</span>
          <span text-center inline-block class="w-150px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Date</span>
          <span text-center inline-block class="w-150px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Credits</span>
          <span text-center inline-block class="w-290px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">Upgrade Plan</span>
          <span text-center inline-block class="w-290px h-80px leading-80px border-transparent ">Credit Gifts</span>
        </div>
        <div class="content">
          <div v-for="(item, index) in listRegisters" :key="index" flex :class="[index % 2 !== 0 ? 'bg-#333944' : '']">
            <span flex items-center justify-center text-centerinline-block class="lineText w-148px min-h-80px">{{ item.id }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-155px min-h-80px ">{{ item.email }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-290px min-h-80px">{{ item.wallet_address }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-150px min-h-80px">{{
              item.modifyTime
            }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-150px min-h-80px">{{ item.credits }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-290px min-h-80px">{{ item.upgradeplan }}</span>
            <span flex items-center justify-center text-center inline-block class="lineText w-290px min-h-80px">
              <input v-model="creditgifts" text-right type="number" style="outline: none;background: transparent;" class="w-50%">
              <img cursor-pointer :src="Write" class="w-20px ml-13px">
            </span>
          </div>
        </div>
      </aside>
      <div class="page b-#26262C absolute right-0 pr-75px mt-20px  pb-5">
        <el-pagination background layout="prev, pager, next" :page-size="10" :total="totalProducts" @current-change="handleCurrentChangeUser" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page :deep(.el-pagination .el-pager li){
  background-color: #26262C !important;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
  color: white
}
.page :deep(.el-pagination .el-pager .is-active){
  background-color:#004699 !important;
}
.page :deep(.el-pagination .is-first), :deep(.el-pagination .is-last)  {
  background-color: #26262C !important;
  border: 1px solid #FFFFFF;
  color: white
}
.lineText {
  position: relative;
  white-space: normal;
  overflow-wrap: anywhere;
}
.lineText::after{
  position: absolute;
  right:0;
  top: -2px;
  bottom:0;
  display: inline-block;
  content: '';
  width: 2px;
  height: 100%;
  background-color: #A0A0A0;

}
</style>
