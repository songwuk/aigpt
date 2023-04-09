<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems, TransitionRoot } from '@headlessui/vue'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash-es'
import AiGPT from './img/AiGPT.png'
import Global from './img/global.png'
import GlobalHover from './img/global_1.png'
import Upload from './img/upload.png'
import UploadHover from './img/upload_1.png'
import Walletpng from './img/walletpng.png'
import Avatar from './img/avatar.png'
import Plan from './img/plan.png'
import Wallet from './img/wallet.png'
import IconBottom from './img/bottom.png'
import IconRight from './img/right.png'
import SignOut from './img/signout.png'
import Disconnect from './img/disconnect.png'
import Twitter from './img/twitter.png'
import Chain from './img/chain.png'
import MetaMask from './img/fork.png'
import UploadImg from './img/up_img.png'
import GoogleLogin from './login/googleLogin.vue'
import { accountEditProfile, productsImage } from '@/url'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const isLogin = ref(false)
const userInfo = reactive({
  credits: 0,
})
function checkUserInfo(user) {
  if (typeof user === 'object' && '_id' in user && user._id) {
    for (const key in user)
      userInfo[key] = user[key]
    return isLogin.value = true
  }
  isLogin.value = false
}
checkUserInfo(userStore.getuserstate)
const signout = () => {
  userStore.signOut()
  window.location.href = '/'
}
const pathnameRef = ref('')
const walletStatus = ref(true)
const isWaiting = ref(true)
const isconnect = ref(false)
const personalList = ref([
  {
    name: 'Change Avatar',
    img: Avatar,
    icon: IconBottom,
    type: 'b',
  },
  {
    name: 'uploadImg',
  },
  {
    name: 'Airdrop Plan',
    img: Plan,
    icon: IconRight,
    type: 'r',
  },
  {
    name: 'Create a Wallet',
    img: Wallet,
    icon: IconRight,
    type: 'r',
  },
])

const connectList = ref([
  {
    name: 'MetaMask',
    img: MetaMask,
  },
  {
    name: 'BNB Smart Chain',
    img: Chain,
    icon: IconRight,
    type: 'r',
  },
])
const loginVisible = ref(false)
const wallet = ref(false)
const getStart = () => {
  loginVisible.value = true
}
const connectWallet = () => {
  // isconnect.value = true
  isLogin.value && Init()
}
const disconnectWallet = () => {
  walletStatus.value = true
  if (typeof window.ethereum !== 'undefined') {
    ethereum.on('disconnect', () => {

    })
  }
}
const eng = ref('')
const GlobalHoverf = () => {
  eng.value.setAttribute('src', GlobalHover)
}
const GlobalUnhoverf = () => {
  eng.value.setAttribute('src', Global)
}
const sub = ref('')
const UploadHoverf = () => {
  sub.value.setAttribute('src', UploadHover)
}
const UploadUnhoverf = () => {
  sub.value.setAttribute('src', Upload)
}
const tags = ref([
  {
    name: 'ChatGPT',
    href: '/chat',
  },
  {
    name: 'Pricing',
    href: 'javascript:void()',
  },
])
const submitPath = () => {
  window.location.href = '/submit'
}
function updateUserInfoMa(options) {
  userStore.updateUserInfo(options)
}
const imgFile = ref('')
const uploadAccountProfile = async (address = '') => {
  const { data } = await accountEditProfile({
    user_id: userStore.getuserstate._id,
    nickName: userStore.getuserstate.nick_name,
    address,
  }, {
    avatar: imgFile.value,
  })
  const dataSource = data.value
  if (dataSource && dataSource.code === 0) {
    const dataInfo = {
      avatar: productsImage(dataSource.data.avatar),
      email: dataSource.data.email,
      family_name: dataSource.data.family_name,
      given_name: dataSource.data.given_name,
      credits: dataSource.data.credits,
      nick_name: dataSource.data.nick_name,
      wallet_address: dataSource.data.wallet_address,
      _id: dataSource.data.id,
    }
    updateUserInfoMa(dataInfo)
    window.location.reload()
  }
  if (dataSource && dataSource.code === -1) {
    ElMessage({
      showClose: true,
      message: dataSource.msg,
      type: 'error',
    })
  }
}
onMounted(() => {
  const pathname = window.location.pathname
  if (pathname)
    pathnameRef.value = pathname
  gptCheckLogin(pathname)
  // isLogin.value && Init()
})
const jumpBack = ref('')
function gptCheckLogin(item) {
  const pathname = window.location.pathname
  if (item.includes('/chat') && isLogin.value && !pathname.includes('/chat'))
    return window.location.href = '/chat'
  if (item.includes('/chat') && !isLogin.value) {
    jumpBack.value = '/chat' // 调回/chat
    return loginVisible.value = true
  }
}
const updateUserInfo = (userinfo) => {
  checkUserInfo(userinfo)
}
function Init() {
  if (!isLogin.value)
    return
  // 判断用户是否安装MetaMask钱包插件
  if (typeof window.ethereum !== 'undefined') {
    // 如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
    ethereum.request({ method: 'eth_requestAccounts' })
      .catch((reason) => {
        // 如果用户拒绝了登录请求
        if (reason === 'User rejected provider access') {
        // 用户拒绝登录后执行语句；
        }
        else {
        // 本不该执行到这里，但是真到这里了，说明发生了意外
          ElMessage({
            showClose: true,
            message: 'There was a problem signing you in',
            type: 'error',
          })
        }
      }).then((accounts) => {
        if (accounts) {
          walletStatus.value = false
          connectList.value[0].name = accounts[0]
          // uploadAccountProfile(connectList.value[0].name)
        }
      })
  }
}
const sendMessage = () => {
  isWaiting.value = false
}
const isOnWallet = ref(false)
const mouseOut = debounce(() => {
  if (wallet.value && isOnWallet.value)
    wallet.value = true
  else
    wallet.value = false
}, 200)
const uploadFile = ref(null)
const uploadClick = () => {
  if (uploadFile.value)
    uploadFile.value.click()
}
async function handleFileUpload() {
  const fileEle = uploadFile.value.files
  for (let i = 0; i < fileEle.length; i++) {
    imgFile.value = fileEle[i]
    uploadAccountProfile(connectList.value[0].name === 'MetaMask' ? '' : connectList.value[0].name)
  }
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
const isShowImg = ref(true)
const changeType = (name, idx) => {
  if (name === 'Change Avatar') {
    isShowImg.value = !isShowImg.value
    if (isShowImg.value) {
      personalList.value[idx].icon = IconBottom
      personalList.value[idx].type = 'b'
    }
    else {
      personalList.value[idx].icon = IconRight
      personalList.value[idx].type = 'r'
    }
  }
}
</script>

<template>
  <input ref="uploadFile" type="file" hidden @change="handleFileUpload">
  <div class="head" w-full flex="~" items-center sm:justify-center justify-start>
    <section sm:flex-1 class="sm:ml-[61px] ml-[20px]" flex items-center justify-start>
      <a href="/" block>
        <div relative>
          <img sm:cursor-pointer class="w-[101px]" :src="AiGPT" alt="logo">
          <span style="line-height: 10px;" absolute class="top-[-4px] right-[-46px] text-[10px] c-[#05D4FD] rounded-[8px] border-1 border-[#05D4FD] px-[6px] py-[3px]">Beta</span>
        </div>
      </a>
      <div class="ml-[67px]" sm:block hidden>
        <span v-for="(item, idx) in tags" :key="idx" cursor-pointer c-white class="mr-[28px] hover:c-[#05D4FD]" @click="gptCheckLogin(item.href)">
          <a href="javascript:void(0)" :class=" pathnameRef.indexOf(item.href) !== -1 ? 'c-[#05D4FD]' : ''"> {{ item.name }}</a>
        </span>
      </div>
    </section>
    <section relative sm:flex-1 sm:block hidden class="mr-[61px]" sm:flex sm:items-center sm:justify-end>
      <button :class="pathnameRef.indexOf('/submit') !== -1 ? 'c-[#05D4FD]' : ''" flex items-center justify-center class="mr-[20px] hover:c-[#05D4FD]" @click="submitPath" @mouseover="UploadHoverf" @mouseout="UploadUnhoverf">
        <img ref="sub" class="w-[22px] mr-[10px]" :src="pathnameRef.indexOf('/submit') !== -1 ? UploadHover : Upload" alt="language">
        Submit
      </button>
      <div class="p-[1px] box-border rounded-[6px] mr-[20px]" style="background: linear-gradient(135deg, rgba(71, 21, 254, 1), rgba(9, 190, 253, 1))">
        <button style="border: 1px solid transparent" class=" rounded-[6px] bg-black px-10px h-[32px] hover:c-[#05D4FD]">
          {{ userInfo.credits < 0 ? 0 : userInfo.credits }} Credits
        </button>
      </div>
      <template v-if="isLogin">
        <img cursor-pointer class="w-[32px] h-[32px] mr-[10px] mr-[20px] border rounded-50% border-transparent hover:border-[#05D4FD]" :src="userInfo.avatar ? userInfo.avatar : Walletpng" alt="Walletpng" @mouseleave="mouseOut" @mouseenter.stop.prevent="wallet = true" @click=" wallet = !wallet">
      </template>
      <template v-else>
        <button class="mr-[20px] w-[109px] h-[32px] rounded-[6px]" style="background: linear-gradient(135deg, #5106FE 0%, #2A4DFF 100%);" @click="getStart">
          Get Started
        </button>
      </template>
      <button flex items-center justify-center class="hover:c-[#05D4FD]" @mouseover="GlobalHoverf" @mouseout="GlobalUnhoverf">
        <img ref="eng" class="w-[20px] mr-[10px]" :src="Global" alt="language">
        English
      </button>
      <aside v-show="wallet" flex items-center justify-start flex-col absolute class="w-[290px] h-[auto] top-[49px] right-[89px] rounded-[10px] bg-[#202123] z-3 p-[20px]" @mouseleave="wallet = false; isOnWallet = false" @mouseenter="wallet = true; isOnWallet = true">
        <div flex items-center justify-start w-full>
          <img class="w-[32px] h-[32px] mr-[10px]  rounded-50%" :src="userInfo.avatar ? userInfo.avatar : Walletpng" alt="Walletpng">
          <span style="font-size: 14px;">{{ userInfo.email }}</span>
        </div>
        <button v-if="walletStatus" style="width: 136px;height: 36px;background: linear-gradient(315deg, #1C82FE 0%, #5106FE 100%);border-radius: 8px;" class="mt-[10px] mb-[11px]" @click="connectWallet">
          Connect Wallet
        </button>
        <div v-if="!walletStatus" w-full>
          <div v-for="(item, index) in connectList" :key="index" cursor-pointer relative class="mt-[19px]" w-full flex items-center justify-start>
            <img class="w-[18px] mr-[7px]" :src="item.img" alt="">
            <span truncate>{{ item.name.toString().replace(/^(.{6})(?:\w+)(.{4})$/, '$1...$2') }}</span>
            <i absolute right-0>
              <img :class="item.type === 'b' ? 'w-[12px]' : 'w-[7px]'" :src="item.icon" alt="">
            </i>
          </div>
        </div>
        <div v-for="(item, index) in personalList" :key="index" cursor-pointer relative class="mt-[19px]" w-full flex items-center :class="[item.name !== 'uploadImg' ? 'justify-start hover:c-[#05D4FD]' : 'justify-center']">
          <template v-if="item.name === 'uploadImg'">
            <div v-if="isShowImg" class="w-87px h-87px border border-dashed rounded-6px border-#979797 flex items-center justify-center flex-col" @click="uploadClick">
              <img class="w-29px" :src="UploadImg" alt="UploadImg">
              <p class="font-400 c-#79797B text-10px text-center">
                Ideal dimensions 400 x 400 px
              </p>
            </div>
          </template>
          <template v-else>
            <img class="w-[18px] mr-[7px]" :src="item.img" alt="">
            <span @click="changeType(item.name, index)">{{ item.name }}</span>
            <i absolute right-0>
              <img :class="item.type === 'b' ? 'w-[12px]' : 'w-[7px]'" :src="item.icon" alt="">
            </i>
          </template>
        </div>
        <button v-if="!walletStatus" class="hover:!bg-gradient-to-r hover:from-#1C82FE hover:to-#5106FE" flex items-center justify-center style="width: 136px;height: 36px;background: #3C3C3E;border-radius: 8px;margin-top: 29px;" @click="disconnectWallet">
          <img class="w-[14px] mr-[3px]" :src="Disconnect" alt="Disconnect">
          Disconnect
        </button>
        <button class="hover:!bg-gradient-to-r hover:from-#1C82FE hover:to-#5106FE" :class="!walletStatus ? 'mt-[14px]' : 'mt-[29px]'" flex items-center justify-center style="width: 136px;height: 36px;background: #3C3C3E;border-radius: 8px;" @click="signout">
          <img class="w-[14px] mr-[3px]" :src="SignOut" alt="SignOut">
          Sign Out
        </button>
        <p v-if="walletStatus" cursor-pointer flex items-center justify-center class="mt-[14px]">
          <img class="w-[19px] mr-[3px]" :src="Twitter" alt="Twitter">
          <a href="https://t.me/aigptdao">
            <span underline>AIGBT DAO</span>
          </a>
        </p>
      </aside>
    </section>
    <template v-if="isconnect">
      <div class="bg-zinc-800 items-center fixed shadow-xl rounded-2xl z-50 px-8 py-8 text-sm drop-shadow-lg border border-zinc-700 fadeInAndScale" tabindex="-1" style="top: 50%; transform: translate(-50%, -50%); left: 50%; max-width: 330px; width: 100%; max-height: 85vh; pointer-events: auto;">
        <button type="button" class="hover:bg-zinc-700 p-1 rounded absolute right-3 top-3" @click="isconnect = !isconnect; isWaiting = true">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line class="c-white" x1="18" y1="6" x2="6" y2="18" />
            <line class="c-white" x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div>
          <div class="font-medium text-center flex flex-col items-center justify-center text-xl mt-5 my-4">
            Verify your account
            <div class="text-sm mt-2 font-base font-normal opacity-50">
              To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.
            </div>
            <button v-if="isWaiting" type="submit" class="mt40px bg-gradient-to-r from-#1C82FE to-#5106FE hover:brightness-110 bg-#3C3C3E! px-4 py-1.5 rounded-lg shadow h-9 w-full drop-shadow flex items-center justify-center mt-3 text-16px" @click.stop.prevent="sendMessage">
              Send Message
            </button>
            <button v-else type="submit" class="mt40px bg-#79797B hover:brightness-110 bg-#3C3C3E! px-4 py-1.5 rounded-lg shadow h-9 w-full drop-shadow flex items-center justify-center mt-3 text-16px" @click.stop.prevent="sendMessage">
              <el-icon class="is-loading mr-5px">
                <Loading />
              </el-icon>Waiting for signature…
            </button>
            <button type="submit" class="hover:brightness-110 bg-#3C3C3E! px-4 py-1.5 rounded-lg shadow h-9 w-full drop-shadow flex items-center justify-center mt-3 text-16px" @click.stop.prevent="isconnect = !isconnect; isWaiting = true">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </template>
    <div sm:hidden block absolute right-1 z-111>
      <Menu as="template">
        <div>
          <MenuButton
            class=" rounded-md border -ml-0.5 -mt-0.5 border-zinc-400 inline-flex h-8 w-8 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all"
          >
            <div i-carbon-menu aria-hidden="true" />
          </MenuButton>
        </div>

        <TransitionRoot
          enter="transition ease-out duration-100"
          enter-from="transition opacity-0 scale-95"
          enter-to="transition opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leave-from="transition opacity-100 scale-100"
          leave-to="transition opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md border
            c-white
        border-zinc-400 dark:border-zinc-700 bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700"
          >
            <div className="py-1">
              <div v-for="(item, index) in tags" :key="index">
                <MenuItem v-slot="{ active }">
                  <a
                    class="block px-4 py-2 text-sm" :class="[{ 'bg-orange-200 dark:bg-zinc-700': active }]" :href="item.href"
                  >
                    {{ item.name }}
                  </a>
                </MenuItem>
              </div>
            </div>
          </MenuItems>
        </TransitionRoot>
      </Menu>
    </div>
    <GoogleLogin v-model="loginVisible" :jump-back="jumpBack" @updateInfo="updateUserInfo" />
  </div>
</template>

<style scoped>
.head {
  height: 64px;
  background-color: #131415;
  color:white
}
</style>
