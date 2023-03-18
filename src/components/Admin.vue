<script setup>
import { ref } from 'vue'
import AiGPT from './img/AiGPT_1.png'
const searchValue = ref('')
const isProducts = ref(true)
const bgColor = ref('bg-#004699')
const listProducts = ref([{
  id: 1,
  name: 'OpenAi',
  email: 'yeet@gmail.com',
  website: 'https://songwuk.cc',
  date: '02/03/2023',
  views: '15k',
  likes: 100,
  status: 'pending',
  action: 'button',
  trending: true,
}, {
  id: 2,
  name: 'OpenAi',
  email: 'yeet@gmail.com',
  website: 'https://songwuk.cc',
  date: '02/03/2023',
  views: '14k',
  likes: 100,
  status: 'pending',
  action: 'button',
  trending: false,
}])
const page = ref([

])
</script>

<template>
  <div class="py-28px px-60px" w-full flex="~" items-center sm:justify-between>
    <img sm:cursor-pointer class="w-[150px]" :src="AiGPT" alt="logo">
    <input v-model="searchValue" placeholder="Search for products or registers" class="indent-13px w-547px h-58px b-#26262C  border-solid border-#979797 border-1 rounded-8px" type="text">
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
    <div relative overflow-x-hidden overflow-y-scroll class="w-[calc(100%-265px)] h-[calc(100vh-114px)] pt-40px pl-51px pr-118px bg-#26262C ">
      <h3 class="text-30px">
        Products <span ml-30px>685</span>
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
          <div v-for="(item, index) in listProducts" :key="index" class="-mt-10px" :class="[index % 2 !== 0 ? 'bg-#333944' : '']">
            <span text-center inline-block class="w-145px h-80px  leading-80px border-transparent border-2 b-r-#A0A0A0">{{ item.id }}</span>
            <span text-center inline-block class="w-140px h-80px leading-80px  border-transparent border-2 b-r-#A0A0A0">{{ item.name }}</span>
            <span text-center inline-block class="w-144px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">{{ item.email }}</span>
            <span text-center inline-block class="w-150px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">{{ item.website }}</span>
            <span text-center inline-block class="w-146px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">{{ item.date }}</span>
            <span text-center inline-block class="w-140px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">{{ item.views }}</span>
            <span text-center inline-block class="w-145px h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">{{ item.likes }}</span>
            <span text-center inline-block class="w-150px h-80px leading-80px  border-transparent border-2 b-r-#A0A0A0 c-#F7B500">{{ item.status }}</span>
            <span text-center inline-block class="w-155px  h-80px leading-80px border-transparent border-2 b-r-#A0A0A0">
              <span inline-block relative class="w-93px h-31px  border rounded-8px border-transparent pt-10px" cursor-pointer @click="item.trending = !item.trending">
                <i absolute z-1 inline-block class="w-50px h-31px leading-31px border rounded-8px border-transparent -left-5px " :class="[item.trending ? 'bg-#004699 z-2' : 'bg-#B5BFCB']">On</i>
                <i absolute z-1 inline-block class=" -ml10px w-50px h-31px leading-31px border rounded-8px border-transparent" :class="[!item.trending ? 'bg-#004699  z-2' : 'bg-#B5BFCB']">Off</i>
              </span>
            </span>
            <span text-center inline-block class="w-145px border-transparent border-2">
              <span cursor-pointer inline-block class="w-93px h-40px leading-40px bg-#004699 border rounded-8px border-transparent">Review</span>
            </span>
          </div>
        </div>
      </aside>
      <div class="page b-#26262C absolute right-0 pr-118px mt-20px">
        <el-pagination background layout="prev, pager, next" :total="100" />
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
</style>
