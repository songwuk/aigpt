<script setup lang='ts'>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as htmlToImage from 'html-to-image'
import { getPageOfChat, loadChatGroup, openaiComletions, pushShare } from '../url'
import { setcursoranimation } from '../animate'
import SaveConversation from './img/SaveConversation.png'
import StopGenerating from './img/StopGenerating.png'
import ShareConversation from './img/ShareConversation.png'
import NewChat from './img/newchat.png'
import Upgrade from './img/upgrade.png'
import Discord from './img/discord_3.png'
const cursorPoniter = ref('_')
const cursor = ref<HTMLElement | null>(null)
const refPng = ref<HTMLElement | null>(null)
const list = ref([])
const historyData = ref([])
const showAnswer = ref(true)
const showList = ref([
  {
    name: 'Save Conversation',
    key: 0,
  }, {
    name: 'Stop generating',
    key: 1,
  }, {
    name: 'Share Conversation',
    key: 2,
  },
])

const leftShow = ref(false)
const clickshow = () => {
  leftShow.value = !leftShow.value
}
const isMounted = ref<boolean>(false)
const themes = ref<Array<string>>(['light', 'dark'])
const theme = ref<string | null | undefined>(null)
const setTheme = async (themeStatus?: string) => {
  const themsStatus = async () => {
    if (import.meta.env.SSR)
      return undefined

    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme'))
      return localStorage.getItem('theme')

    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      return 'dark'

    return 'light'
  }
  theme.value = themeStatus || await themsStatus()
}
const chatValue = ref('')
const stopClick = ref(false)
const errorValue = ref(false)

const scrollToMe = ref<HTMLElement | null>(null)
const scrollToBottom = () => {
  const bottomElement = scrollToMe.value.scrollHeight - scrollToMe.value.clientHeight
  // // 将页面滑动到底部
  scrollToMe.value.scrollTo({
    top: bottomElement,
    behavior: 'smooth', // 可选项，平滑滚动
  })
}

const loadingGroup = async () => {
  const { data } = await loadChatGroup()
  const chatDataSource = data.value as any
  if (chatDataSource && chatDataSource.code === 0)
    historyData.value = chatDataSource.data.map(item => item.chatGroup)
}
onMounted(async () => {
  await setTheme()
  isMounted.value = true
  await nextTick()
  scrollToBottom()
  loadingGroup()
})
const updateCount = ref(0)
const maxUpdateCount = ref(1)
const chatGroup = ref('') // 每次会话唯一
watch(chatValue, (newValue) => {
  if (updateCount.value >= maxUpdateCount.value) {
    // nextTick(() => {
    //   chatGroup.value = newValue
    // })
  }
  else {
    updateCount.value++
    chatGroup.value = newValue
  }
})
const openaiChat = async () => {
  if (stopClick.value)
    return false
  const chatObj = {
    chatGroup: chatGroup.value,
    prompt: chatValue.value,
  }
  stopClick.value = true
  showAnswer.value = false
  list.value.push({
    prompt: chatValue.value,
    answer: cursorPoniter.value,
  })
  chatValue.value = ''
  await nextTick()
  scrollToBottom()
  setcursoranimation(cursor.value[0])
  const lastNum = list.value[list.value.length - 1]
  const { data } = await openaiComletions(chatObj)
  const dataSource = data.value as any
  if (dataSource && dataSource.code === 0) {
    const obj_chat_group = lastNum
    list.value[list.value.length - 1] = {
      prompt: obj_chat_group.prompt,
      answer: dataSource.data.answer.replace(/^\n\n/i, ''),
    }
    await nextTick()
    scrollToBottom()
    stopClick.value = false
  }
  else {
    errorValue.value = true
  }
}
const leftButton = ref([
  'Clear conversations',
  'Upgrade plan',
  'Light mode',
  'AIGPT Discord',
  'Updates & FAQ',
  'Log out',
])
const submitChat = async (event) => {
  if (event.keyCode === 13 && !event.ctrlKey) {
    event.preventDefault()
    await openaiChat()
  }
}

watch(theme, (themeNew) => {
  const root = document && document.documentElement
  if (themeNew === 'light')
    root.classList.remove('dark')

  else
    root.classList.add('dark')
})

const Examples = ref([
  '"Explain quantum computing in simple terms" →',
  '"Got any creative ideas for a 10 year old’s birthday?" →',
  '"How do I make an HTTP request in Javascript?" →',
])
const toggleTheme = () => {
  const t = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', t)
  setTheme(t)
}

async function createImage(dataUrl: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.crossOrigin = 'anonymous'
    img.decoding = 'sync'
    img.src = dataUrl
  }) as Promise<Record<string, any>>
}
const toPng = async () => {
  const dataUrl = await htmlToImage.toPng(refPng.value!)
  const mathRandom = Math.random().toString(36)
  const alink = document.createElement('a')
  const { src } = await createImage(dataUrl) as HTMLImageElement
  alink.href = src
  alink.download = `${mathRandom}.png`
  alink.click()
}
const copyLink = (link) => {
  const isSafari = navigator.userAgent.match(/iPad|iPhone|iPod|Macintosh/i)
  if (navigator.clipboard && isSafari) {
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
}
/**
 * 请求停止的按钮
 */
const stopGenerating = async () => {
  console.log('stopGenerating')
}
const clickMethods = async (id) => {
  if (list.value.length === 0 || stopClick.value)
    return false

  if (id === 0) { await toPng() }
  else if (id === 1) { await stopGenerating() }
  else if (id === 2) {
    const { data } = await pushShare(list.value)
    const dataSource = data.value as any
    if (dataSource && dataSource.code === 0) {
      const link = `${import.meta.env.PUBLIC_WEB}/sharechat?id=${dataSource.data}`
      await copyLink(link)
    }
  }
}
const pageChat = async (chatGroup) => {
  const params = {
    condition: chatGroup,
  }
  const { data } = await getPageOfChat(params)
  const dataSource = data.value as any
  if (dataSource && dataSource.code === 0) {
    list.value = dataSource.data.openaiList ?? []
    await nextTick()
    scrollToBottom()
  }
}
const newchat = () => {
  list.value = []
  showAnswer.value = true
  updateCount.value = 0
  scrollToBottom()
}
</script>

<template>
  <div class="overflow-hidden w-full relative h-[calc(100%-64px)]">
    <div class="flex  h-full flex-1 flex-col md:pl-[260px]">
      <div class="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button type="button" class="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white" @click="clickshow">
          <span class="sr-only">Open sidebar</span>
          <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 class="flex-1 text-center text-base font-normal">
          New chat
        </h1>
        <button type="button" class="px-3" @click="newchat">
          <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      <main class="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div class="flex-1 overflow-hidden bg-white">
          <div class="vue-scroll-to-bottom--css h-full dark:bg-gray-800 bg-">
            <div ref="scrollToMe" class="vue-scroll-to-bottom--css">
              <div v-if="showAnswer" class="flex flex-col items-center text-sm dark:bg-gray-800">
                <div class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
                  <h1 class="text-4xl font-semibold text-center mt-8 sm:mt-[9vh] ml-auto mr-auto mb-10 sm:mb-14 flex gap-2 items-center justify-center">
                    ChatGPT
                  </h1>
                  <div class="md:flex items-start text-center gap-3.5">
                    <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                      <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="5" />
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>Examples
                      </h2>
                      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                        <button v-for="(item, index) in Examples" :key="index" class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900" @click.stop="chatValue = item">
                          {{ item }}
                        </button>
                      </ul>
                    </div>
                    <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                      <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>Capabilities
                      </h2>
                      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                          Remembers what user said earlier in the conversation
                        </li>
                        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                          Allows user to provide follow-up corrections
                        </li>
                        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                          Trained to decline inappropriate requests
                        </li>
                      </ul>
                    </div>
                    <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                      <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>Limitations
                      </h2>
                      <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                          May occasionally generate incorrect information
                        </li>
                        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                          May occasionally produce harmful instructions or biased content
                        </li>
                        <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                          Limited knowledge of world and events after 2021
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="w-full h-48 md:h-52 flex-shrink-0" />
              </div>
              <div v-else ref="refPng" class="flex flex-col items-center text-sm dark:bg-gray-800">
                <template v-for="(item, index) in list" :key="index">
                  <div class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800">
                    <div class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                      <div class="w-[30px] flex flex-col relative items-end">
                        <div class="bg-[#5436DA] rounded-sm text-white flex justify-center items-center relative tracking-widest h-8 w-8 text-xs">
                          <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                      </div>
                      <div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                        <div class="flex flex-grow flex-col gap-3">
                          <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap" v-html="item.prompt" />
                        </div>
                        <div class="flex justify-between" />
                      </div>
                    </div>
                  </div>
                  <div class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]">
                    <!-- error -->
                    <div v-if="errorValue" class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                      <div class="w-[30px] flex flex-col relative items-end">
                        <div class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center" style="background-color: rgb(16, 163, 127);">
                          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="h-6 w-6"><path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor" /></svg><span class="absolute w-4 h-4 rounded-full text-[10px] flex justify-center items-center right-0 top-[20px] -mr-2 border border-white bg-red-500 text-white">!</span>
                        </div>
                      </div>
                      <div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                        <div class="flex flex-grow flex-col gap-3">
                          <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap flex flex-row gap-2 text-red-500">
                            <div class="py-2 px-3 border text-gray-600 rounded-md text-sm dark:text-gray-100 border-red-500 bg-red-500/10">
                              An error occurred. Either the engine you requested does not exist or there was another issue processing your request. If this issue persists please contact us through our help center at help.openai.com.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- code === 200 -->
                    <div v-else class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                      <div class="w-[30px] flex flex-col relative items-end">
                        <div class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center" style="background-color: rgb(16, 163, 127);">
                          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="h-6 w-6"><path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor" /></svg>
                        </div>
                      </div>
                      <div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                        <div class="flex flex-grow flex-col gap-3">
                          <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                            <span v-if="item.answer === cursorPoniter" ref="cursor" class="font-700 text-24px">{{ item.answer }}</span>
                            <div v-else class="markdown prose w-full break-words dark:prose-invert dark" v-html="item.answer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="w-full h-52 md:h-68 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
          <div flex="~ gap8" justify-center items-center sm:flex-row sm:max-w-full class="sm:p-[0] p-[20px] dark:c-white c-black">
            <div v-for="(item, index) in showList" :key="index" flex="~" justify-center items-center class="showListCss  sm:text-[16px] text-[14px] py-8px px-14px" @click="clickMethods(item.key)">
              <img style="width:17px;" :src="index === 0 ? SaveConversation : index === 1 ? StopGenerating : ShareConversation " alt="">
              {{ item.name }}
            </div>
          </div>
          <form class="stretch mx-2 flex flex-row gap-3 pt-1 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-3">
            <div class="relative flex h-full flex-1 md:flex-col">
              <div class="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center" />
              <div class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea v-model="chatValue" style="max-height: 200px; height: 24px; overflow-y: hidden;" class="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0" @keydown="submitChat" />
                <button class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent" @click.stop.prevent="openaiChat">
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <div class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
            <a mb-2 block href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes" target="_blank" rel="noreferrer" class="underline">
              AIGPT.me
            </a>
            <span block>Powered by GPT-3 of OpenAI </span>
          </div>
        </div>
      </main>
    </div>
    <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col mt-64px">
      <div class="flex h-full min-h-0 flex-col ">
        <div class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav class="flex h-full flex-1 flex-col space-y-1 p-2">
            <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20" @click.stop="newchat">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>New chat
            </a>
            <div class="flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2">
              <div class="flex flex-col gap-2 text-gray-100 text-sm">
                <a v-for="(item, index) in historyData" :key="index" class="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group" @click="pageChat(item)">
                  <img class="w-17px" :src="NewChat" alt="NewChat">
                  <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                    {{ item }}
                    <div class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]" />
                  </div>
                </a>
              </div>
            </div>
            <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>Clear conversations</a>
            <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <img class="w-18px" :src="Upgrade" alt="Upgrade">
              Upgrade plan</a>
            <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm" @click="toggleTheme">
              <div v-if="theme === 'light'" flex class=" w-16px" i-carbon-sun />
              <div v-else-if="theme === 'dark'" flex class=" w-16px" i-carbon-moon />
              Light mode</a>
            <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <img class="w-18px" :src="Discord" alt="Discord">
              AIGPT Discord</a>
            <a href="https://help.openai.com/en/collections/3742473-chatgpt" target="_blank" class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>Updates &amp; FAQ</a>
            <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>Log out</a>
          </nav>
        </div>
      </div>
    </div>
    <div v-show="leftShow" id="headlessui-portal-root">
      <div data-headlessui-portal="">
        <button type="button" aria-hidden="true" style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;" /><div>
          <div id="headlessui-dialog-:rn:" class="relative z-40 md:hidden" role="dialog" aria-modal="true" data-headlessui-state="open">
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75 opacity-100 top-64px" />
            <div class="fixed left-0 right-0 bottom-0 z-40 flex top-64px">
              <div id="headlessui-dialog-panel-:ro:" class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 translate-x-0" data-headlessui-state="open">
                <div class="absolute top-0 right-0 -mr-12 pt-2 opacity-100">
                  <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" tabindex="0" @click="clickshow">
                    <span class="sr-only">Close sidebar</span><svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div><div class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
                  <nav class="flex h-full flex-1 flex-col space-y-1 p-2">
                    <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>New chat</a>
                    <div class="flex-col flex-1 overflow-y-auto border-b border-white/20">
                      <div class="flex flex-col gap-2 text-gray-100 text-sm">
                        <a v-for="(item, index) in historyData" :key="index" class="flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-black-800 hover:bg-gray-800 group" @click="pageChat(item)">
                          <img class="w-17px" :src="NewChat" alt="NewChat">
                          <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">{{ item }}</div>
                        </a>
                      </div>
                    </div>
                    <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                      <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>Clear conversations</a>
                    <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                      <img class="w-18px" :src="Upgrade" alt="Upgrade">
                      Upgrade plan</a>
                    <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm" @click="toggleTheme">
                      <div v-if="theme === 'light'" flex class=" w-16px" i-carbon-sun />
                      <div v-else-if="theme === 'dark'" flex class=" w-16px" i-carbon-moon />
                      Light mode</a>
                    <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                      <img class="w-18px" :src="Discord" alt="Discord">
                      AIGPT Discord</a>
                    <a href="https://help.openai.com/en/collections/3742473-chatgpt" target="_blank" class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                      <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>Updates &amp; FAQ</a>
                    <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                      <svg stroke="currentColor" fill="none" stroke-width="2" viewbox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>Log out</a>
                  </nav>
                </div>
              </div><div class="w-14 flex-shrink-0" />
            </div>
          </div>
        </div><button type="button" aria-hidden="true" style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;" />
      </div>
    </div>
  </div>
</template>

<style src="./NewChat.css"></style>

<style scoped>
.vue-scroll-to-bottom--css {
    height: 100%;
    overflow-y: auto;
    width: 100%;
}
.showListCss {
  border-radius: 8px;
  border: 1px solid #979797;text-align:center;cursor: pointer;
}
.showListCss img {
  margin-right: 6px;
}
</style>
