<script setup>
import { onMounted, ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems, TransitionRoot } from '@headlessui/vue'
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
import Fork from './img/fork.png'
import GoogleLogin from './login/googleLogin.vue'
const leftHead = ref([
  {
    name: 'ChatGPT',
    url: '/chat',
  },
  {
    name: 'GAI MAP',
    url: 'javascript:void()',
  },
  {
    name: 'Pricing',
    url: 'javascript:void()',
  },
])
const googleloginRef = ref('')
const pathnameRef = ref('')
const walletStatus = ref(true)
const personalList = ref([
  {
    name: 'Change Avatar',
    img: Avatar,
    icon: IconBottom,
    type: 'b',
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
    name: '0xecbe…0923',
    img: Fork,
  },
  {
    name: 'BNB Smart Chain',
    img: Chain,
    icon: IconRight,
    type: 'r',
  },
])
const wallet = ref(false)
const getStart = () => {
  // wallet.value = !wallet.value
  googleloginRef.value.showLogin()
}
const connectWallet = () => {
  walletStatus.value = false
}
const disconnectWallet = () => {
  walletStatus.value = true
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
    name: 'GAI MAP',
    href: 'javascript:void()',
  },
  {
    name: 'Pricing',
    href: 'javascript:void()',
  },
])
const submitPath = () => {
  window.location.href = '/submit'
}

onMounted(() => {
  const pathname = window.location.pathname
  if (pathname)
    pathnameRef.value = pathname
})
const LoginDisplay = () => {
  googleloginRef.value.showLogin()
  console.log(googleloginRef.value)
}
</script>

<template>
  <div class="head" w-full flex="~" items-center sm:justify-center justify-start>
    <section sm:flex-1 class="sm:ml-[61px] ml-[20px]" flex items-center justify-start>
      <a href="/" block>
        <div relative>
          <img sm:cursor-pointer class="w-[101px]" :src="AiGPT" alt="logo">
          <span style="line-height: 10px;" absolute class="top-[-4px] right-[-46px] text-[10px] c-[#05D4FD] rounded-[8px] border-1 border-[#05D4FD] px-[6px] py-[3px]">BELA</span>
        </div>
      </a>
      <div class="ml-[67px]" sm:block hidden>
        <span v-for="(item, idx) in leftHead" :key="idx" cursor-pointer c-white class="mr-[28px] hover:c-[#05D4FD]">
          <a :href="item.url" :class=" pathnameRef === item.url ? 'c-[#05D4FD]' : ''"> {{ item.name }}</a>
        </span>
      </div>
    </section>
    <section relative sm:flex-1 sm:block hidden class="mr-[61px]" sm:flex sm:items-center sm:justify-end>
      <button :class="pathnameRef === '/submit' ? 'c-[#05D4FD]' : ''" flex items-center justify-center class="mr-[20px] hover:c-[#05D4FD]" @click="submitPath" @mouseover="UploadHoverf" @mouseout="UploadUnhoverf">
        <img ref="sub" class="w-[22px] mr-[10px]" :src="Upload" alt="language">
        Submit
      </button>
      <div class="p-[1px] box-border rounded-[6px] mr-[20px]" style="background: linear-gradient(135deg, rgba(71, 21, 254, 1), rgba(9, 190, 253, 1))">
        <button style="border: 1px solid transparent" class=" rounded-[6px] bg-black w-[109px] h-[32px] ">
          892 Credits
        </button>
      </div>
      <button class="mr-[20px] w-[109px] h-[32px] rounded-[6px]" style="background: linear-gradient(135deg, #5106FE 0%, #2A4DFF 100%);" @click="getStart">
        Get Started
      </button>
      <button flex items-center justify-center class="hover:c-[#05D4FD]" @mouseover="GlobalHoverf" @mouseout="GlobalUnhoverf">
        <img ref="eng" class="w-[20px] mr-[10px]" :src="Global" alt="language">
        English
      </button>
      <aside v-show="wallet" flex items-center justify-start flex-col absolute class="w-[290px] h-[auto] top-[49px] right-[89px] rounded-[10px] bg-[#202123] z-3 p-[20px]">
        <div flex items-center justify-start w-full>
          <img class="w-[32px] mr-[10px]" :src="Walletpng" alt="Walletpng">
          <span style="font-size: 14px;">lili2201@gmail.com</span>
        </div>
        <button v-if="walletStatus" style="width: 136px;height: 36px;background: linear-gradient(315deg, #1C82FE 0%, #5106FE 100%);border-radius: 8px;" class="mt-[10px] mb-[11px]" @click="connectWallet">
          Connect Wallet
        </button>
        <div v-if="!walletStatus">
          <div v-for="(item, index) in connectList" :key="index" cursor-pointer relative class="mt-[19px]" w-full flex items-center justify-start>
            <img class="w-[18px] mr-[7px]" :src="item.img" alt="">
            <span>{{ item.name }}</span>
            <i absolute right-0>
              <img :class="item.type === 'b' ? 'w-[12px]' : 'w-[7px]'" :src="item.icon" alt="">
            </i>
          </div>
        </div>

        <span v-if="walletStatus" style="font-size: 12px; color: #C1C1C1;">Connect wallet to ask ChatGPT,Earn $AiGPT</span>
        <div v-for="(item, index) in personalList" :key="index" cursor-pointer relative class="mt-[19px]" w-full flex items-center justify-start>
          <img class="w-[18px] mr-[7px]" :src="item.img" alt="">
          <span>{{ item.name }}</span>
          <i absolute right-0>
            <img :class="item.type === 'b' ? 'w-[12px]' : 'w-[7px]'" :src="item.icon" alt="">
          </i>
        </div>
        <button v-if="!walletStatus" flex items-center justify-center style="width: 136px;height: 36px;background: #3C3C3E;border-radius: 8px;margin-top: 29px;" @click="disconnectWallet">
          <img class="w-[14px] mr-[3px]" :src="Disconnect" alt="Disconnect">
          Disconnect
        </button>
        <button :class="!walletStatus ? 'mt-[14px]' : 'mt-[29px]'" flex items-center justify-center style="width: 136px;height: 36px;background: #3C3C3E;border-radius: 8px;">
          <img class="w-[14px] mr-[3px]" :src="SignOut" alt="SignOut">
          Sign Out
        </button>
        <p cursor-pointer flex items-center justify-center class="mt-[14px]">
          <img class="w-[19px] mr-[3px]" :src="Twitter" alt="Twitter">
          <span underline>AIGBT DAO</span>
        </p>
      </aside>
    </section>
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
    <GoogleLogin ref="googleloginRef" @login-display="LoginDisplay" />
  </div>
</template>

<style scoped>
.head {
  height: 64px;
  background-color: #131415;
  color:white
}
</style>
