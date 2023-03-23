<script setup>
import { ref } from 'vue'
// import { ElPagination } from 'element-plus'
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

const listRegisters = ref([{
  id: 1,
  email: 'yeet@gmail.com',
  address: '0x58A9130D18Ec2c41D535d56B7E2a616BBeC6f359',
  date: '02/03/2023',
  credits: '5,000',
  upgradeplan: '',
  creditgifts: '',
}, {
  id: 2,
  email: 'yeet@gmail.com',
  address: '0x58A9130D18Ec2c41D535d56B7E2a616BBeC6f359',
  date: '02/03/2023',
  credits: '5,000',
  upgradeplan: '',
  creditgifts: '',
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
    <div v-if="isProducts" relative overflow-x-hidden overflow-y-scroll class="w-[calc(100%-265px)] h-[calc(100vh-114px)] pt-40px pl-51px pr-118px bg-#26262C ">
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
          <div v-for="(item, index) in listProducts" :key="index" :class="[index % 2 !== 0 ? 'bg-#333944' : '']">
            <span text-center inline-block class="lineText w-145px h-80px leading-80px border-transparent ">{{ item.id }}</span>
            <span text-center inline-block class="lineText w-140px h-80px leading-80px  border-transparent">{{ item.name }}</span>
            <span text-center inline-block class="lineText w-144px h-80px leading-80px border-transparent">{{ item.email }}</span>
            <span text-center inline-block class="lineText w-150px h-80px leading-80px border-transparent">{{ item.website }}</span>
            <span text-center inline-block class="lineText w-146px h-80px leading-80px border-transparent">{{ item.date }}</span>
            <span text-center inline-block class="lineText w-140px h-80px leading-80px border-transparent ">{{ item.views }}</span>
            <span text-center inline-block class="lineText w-145px h-80px leading-80px border-transparent">{{ item.likes }}</span>
            <span text-center inline-block class="lineText w-150px h-80px leading-80px  border-transparent c-#F7B500">{{ item.status }}</span>
            <span text-center inline-block class="lineText w-155px  h-80px leading-80px border-transparent">
              <span inline-block relative class="w-93px h-31px  border rounded-8px border-transparent pt-10px" cursor-pointer @click="item.trending = !item.trending">
                <i absolute z-1 inline-block class="w-50px h-31px leading-31px border rounded-8px border-transparent -left-5px " :class="[item.trending ? 'bg-#004699 z-2' : 'bg-#B5BFCB']">On</i>
                <i absolute z-1 inline-block class=" -ml10px w-50px h-31px leading-31px border rounded-8px border-transparent" :class="[!item.trending ? 'bg-#004699  z-2' : 'bg-#B5BFCB']">Off</i>
              </span>
            </span>
            <span text-center inline-block class=" w-145px">
              <span cursor-pointer inline-block class="w-93px h-40px leading-40px bg-#004699 border rounded-8px border-transparent">Review</span>
            </span>
          </div>
        </div>
      </aside>
      <div class="page b-#26262C absolute right-0 pr-118px mt-20px">
        <el-pagination background layout="prev, pager, next" :page-size="10" :total="100" />
      </div>
    </div>
    <div v-else relative overflow-x-hidden overflow-y-scroll class="w-[calc(100%-265px)] h-[calc(100vh-114px)] pt-40px pl-51px pr-118px bg-#26262C ">
      <h3 class="text-30px">
        Registers <span ml-30px> 32,673</span>
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
            <span text-center inline-block class="lineText w-148px h-80px  leading-80px ">{{ item.id }}</span>
            <span text-center inline-block class="lineText w-155px h-80px leading-80px ">{{ item.email }}</span>
            <span text-center inline-block class="lineText w-290px h-80px leading-80px">{{ item.address }}</span>
            <span text-center inline-block class="lineText w-150px h-80px leading-80px">{{ item.date }}</span>
            <span text-center inline-block class="lineText w-150px h-80px leading-80px">{{ item.credits }}</span>
            <span text-center inline-block class="lineText w-290px h-80px leading-80px">{{ item.upgradeplan }}</span>
            <span text-center inline-block class=" w-290px h-80px leading-80px border-transparent">{{ item.creditgifts }}</span>
          </div>
        </div>
      </aside>
      <div class="page b-#26262C absolute right-0 pr-118px mt-20px">
        <el-pagination background layout="prev, pager, next" :page-size="10" :total="32673" />
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
}
.lineText::after{
  position: absolute;
  right:0;
  top: -5px;
  bottom:0;
  display: inline-block;
  content: '';
  width: 2px;
  height: 85px;
  background-color: #A0A0A0;

}
</style>
