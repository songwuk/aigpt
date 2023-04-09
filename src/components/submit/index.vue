<script setup>
import { onMounted, ref } from 'vue'
import {
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue'
import { getCateAll, panelProductsAudite, panelProductsQuery, panelProductsSave, productsImage, productsSave } from '../../url'
import Loading from '../loading/index.vue'
import Upload from '../img/upload_img.png'
import Del from '../img/del.png'
import Discord_2 from '../img/discord_2.png'
import Facebook_2 from '../img/facebook_2.png'
import Instagram_2 from '../img/instagram_2.png'
import Twitter_2 from '../img/twitter_2.png'
import { parseQuery } from '@/utils'
function urlToBlob(url, fileName) {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => new File([blob], fileName, { type: 'image/png' }))
}
const orderSearch = window.location.search
const submitId = ref('')
const isOwner = ref('true')
const email = ref('')
const given_name = ref('')
const family_name = ref('')
const product_name = ref('')
const product_url = ref('')
const product_categry = ref([])
const product_model = ref([])
const product_categry_options = ref([])
const product_model_options = ref([
  {
    value: 'ChatGPT',
    label: 'ChatGPT',
  },
  {
    value: 'GPT-2',
    label: 'GPT-2',
  },
  {
    value: 'GPT-3',
    label: 'GPT-3',
  },
  {
    value: 'GPT-4',
    label: 'GPT-4',
  },
  {
    value: 'Midjourney',
    label: 'Midjourney',
  },
  {
    value: 'OpenAI Codex',
    label: 'OpenAI Codex',
  },
  {
    value: 'Stable Diffusion',
    label: 'Stable Diffusion',
  },
  {
    value: 'DALL.E',
    label: 'DALL.E',
  },
  {
    value: 'DALL.E 2',
    label: 'DALL.E 2',
  },
  {
    value: 'Claude',
    label: 'Claude',
  },
  {
    value: 'OpenAi CLIP',
    label: 'OpenAi CLIP',
  },
  {
    value: 'GPT-J',
    label: 'GPT-J',
  },
  {
    value: 'WebGPT',
    label: 'WebGPT',
  },
])
const product_applications = ref('')
const product_generative_ai = ref('')
const product_short_desc = ref('')
const product_detail = ref('')
const product_review_url = ref('')
const facebook = ref('')
const twitter = ref('')
const discord = ref('')
const instagram = ref('')
const loading = ref(false)
const Policies = ref('')
const Privacy = ref('')

const clickUpload = ref('')
const fileElem = ref('')
const uploadImg = () => {
  clickUpload.value = 'upload_1'
  if (fileElem.value)
    fileElem.value.click()
}
const uploadImg_2 = () => {
  clickUpload.value = 'upload_2'
  if (fileElem.value)
    fileElem.value.click()
}
const uploadImg_3 = () => {
  clickUpload.value = 'upload_3'
  if (fileElem.value)
    fileElem.value.click()
}
const file1 = ref('')
const file2 = ref('')
const file3 = ref('')
const upload_1 = ref('')
const upload_2 = ref('')
const upload_3 = ref('')
const handleFiles = async () => {
  const img = new Image()
  img.file = fileElem.value.files[0]
  const reader = new FileReader()
  reader.onload = function (e) {
    if (clickUpload.value === 'upload_1') {
      file1.value = fileElem.value.files[0]
      upload_1.value = e.target.result
    }
    else if (clickUpload.value === 'upload_2') {
      file2.value = fileElem.value.files[0]
      upload_2.value = e.target.result
    }
    else if (clickUpload.value === 'upload_3') {
      file3.value = fileElem.value.files[0]
      upload_3.value = e.target.result
    }
  }
  reader.readAsDataURL(fileElem.value.files[0])
}

const emailError = ref(false)
const product_nameError = ref(false)
const upload_1Error = ref(false)
const product_urlError = ref(false)
const product_short_descError = ref(false)
const product_detailError = ref(false)
const product_review_urlError = ref(false)
const resetP = () => {
  emailError.value = false
  product_nameError.value = false
  upload_1Error.value = false
  product_urlError.value = false
  product_short_descError.value = false
  product_detailError.value = false
  product_review_urlError.value = false
}
const submitProject = async () => {
  resetP()
  if (!Policies.value || !Privacy.value) {
    alert('must agree')
    return false
  }
  if (!email.value) {
    emailError.value = true
    return false
  }
  if (!product_name.value) {
    product_nameError.value = true
    return false
  }
  if (!upload_1.value) {
    upload_1Error.value = true
    return false
  }
  if (!product_url.value)
    return product_urlError.value = true
  if (!product_short_desc.value)
    return product_short_descError.value = true
  if (!product_detail.value)
    return product_detailError.value = true
  if (!product_review_url.value)
    return product_review_urlError.value = true

  // loading.value = true
  const product_logo = file1.value
  const files = {
    product_logo,
    product_imgs1: file2.value,
    product_imgs2: file3.value,
  }
  const { data } = await productsSave({
    isOwner: isOwner.value,
    email: email.value,
    given_name: given_name.value,
    family_name: family_name.value,
    product_name: product_name.value,
    product_url: product_url.value,
    product_categry: product_categry.value,
    product_model: product_model.value,
    product_applications: product_applications.value,
    product_generative_ai: product_generative_ai.value,
    product_short_desc: product_short_desc.value,
    product_detail: product_detail.value,
    product_review_url: product_review_url.value,
    facebook: facebook.value,
    twitter: twitter.value,
    discord: discord.value,
    instagram: instagram.value,
  }, files)
  // loading.value = false
  if (data.value && data.value.code === 0)
    alert('Submitted successfully')
  else
    alert(data.value.msg)
}

const submitProductsSave = async () => {
  if (!Policies.value || !Privacy.value) {
    alert('must agree')
    return false
  }
  // loading.value = true
  const product_logo = file1.value
  const files = {
    product_logo,
    product_imgs1: file2.value,
    product_imgs2: file3.value,
  }
  const { data } = await panelProductsSave({
    id: submitId.value,
    isOwner: isOwner.value,
    email: email.value,
    given_name: given_name.value,
    family_name: family_name.value,
    product_name: product_name.value,
    product_url: product_url.value,
    product_categry: product_categry.value,
    product_model: product_model.value,
    product_applications: product_applications.value,
    product_generative_ai: product_generative_ai.value,
    product_short_desc: product_short_desc.value,
    product_detail: product_detail.value,
    product_review_url: product_review_url.value,
    facebook: facebook.value,
    twitter: twitter.value,
    discord: discord.value,
    instagram: instagram.value,
  }, files)
  if (data.value && data.value.code === 0)
    alert('Submitted successfully')
  else
    alert(data.value.msg)
  // window.reload()
  // loading.value = false
}
const passOrNO = async (status) => {
  const { data } = await panelProductsAudite({
    id: submitId.value,
    status,
  })
  if (data.value && data.value.code === 0) {
    if (status === 1)
      alert('examination passed')

    else
      alert('Audit Rejected')
  }
}
const deleteFn1 = () => {
  file2.value = ''
  upload_2.value = ''
}
const deleteFn2 = () => {
  file3.value = ''
  upload_3.value = ''
}
const product_applicationsArr = ref([
  'Website',
  'Apps',
  'Web3',
  'Chrome Extension',
])
const product_generative_aiArr = ref([
  'Text to Text',
  'Text to Code',
  'Text to Image',
  'Text to Video',
  'Text to Speech',
  'Text to Music',
  'Text to 3D',
])
onMounted(async () => {
  const { id } = parseQuery(orderSearch)
  submitId.value = id
  const { data: dataCate } = await getCateAll()
  const dataSources = dataCate.value
  if (dataSources && dataSources.code === 0) {
    product_categry_options.value = dataSources.data.map((item) => {
      return {
        value: item,
        label: item,
      }
    })
  }

  if (submitId.value) {
    Policies.value = 'Policies'
    Privacy.value = 'Privacy'
    const { data } = await panelProductsQuery(submitId.value)
    const dataSource = data.value
    if (dataSource && dataSource.code === 0) {
      isOwner.value = dataSource.data.isOwner
      email.value = dataSource.data.email
      given_name.value = dataSource.data.given_name
      family_name.value = dataSource.data.family_name
      product_name.value = dataSource.data.product_name
      product_url.value = dataSource.data.product_url
      product_categry.value = typeof dataSource.data.product_categry === 'string' ? dataSource.data.product_categry.split(',') : dataSource.data.product_categry
      product_model.value = typeof dataSource.data.product_model === 'string' ? dataSource.data.product_model.split(',') : dataSource.data.product_model
      product_applications.value = dataSource.data.product_applications
      product_generative_ai.value = dataSource.data.product_generative_ai
      product_short_desc.value = dataSource.data.product_short_desc
      product_detail.value = dataSource.data.product_detail
      product_review_url.value = dataSource.data.product_review_url
      facebook.value = dataSource.data.social_media?.facebook ?? ''
      twitter.value = dataSource.data.social_media?.twitter ?? ''
      discord.value = dataSource.data.social_media?.discord ?? ''
      instagram.value = dataSource.data.social_media?.instagram ?? ''
      upload_1.value = productsImage(dataSource.data.product_logo)
      file1.value = await urlToBlob(upload_1.value)
      const product_imgs = dataSource.data.product_imgs.map(it => productsImage(it))
      if (product_imgs.length === 1) {
        upload_2.value = product_imgs[0]
        file2.value = await urlToBlob(upload_2.value)
      }
      if (product_imgs.length === 2) {
        upload_2.value = product_imgs[0]
        file2.value = await urlToBlob(upload_2.value)
        upload_3.value = product_imgs[1]
        file3.value = await urlToBlob(upload_3.value)
      }
    }
  }
})
const PoliciesClick = () => {
  document.querySelector('#Policies').click()
}
const PrivacyClick = () => {
  document.querySelector('#Privacy').click()
}
</script>

<template>
  <div
    w-full
    flex
    items-center
    justify-center
    flex-col
    class="sm:h-241px sm:px-[18%] c-white font-900"
    style=" background: linear-gradient(269deg, #1C82FE 0%, #5106FE 100%);
      font-family: Charter-Black, Charter"
  >
    <input ref="fileElem" type="file" accept="image/*" style="display:none" @change="handleFiles">
    <h2
      sm:text-left
      w-full
      text-center
      class="text-45px mb-18px"
    >
      Submit Your AI Products
    </h2>
  </div>
  <section
    w-full
    flex
    items-start
    justify-center
    flex-col
    class="sm:px-[18%] mt-40px"
  >
    <h3 text-left class="text-20px font-700 mb-18px">
      Identification
    </h3>
    <p class="text-16px font-400 mb-22px">
      Using an official email address within your organization will allow us to verify your admin role of your product. A verified admin will be able to submit changes, receive weekly profile stats, reply comments of other users, and unlock more functions on AIGPT.me.
      .
    </p>
    <aside
      w-full
      style="background: #2A2A33;"
      class="pt-22px pb-29px pl-45px rounded-23px"
    >
      <h4 class="text-18px font-700 mb-21px">
        * Are You the Owner/Admin?
      </h4>
      <div flex items-center justify-center sm:flex-row flex-col class="mb-34px">
        <RadioGroup v-model="isOwner " w-full flex sm:items-center items-start justify-start sm:flex-row flex-col>
          <RadioGroupOption v-slot="{ checked }" cursor-pointer value="true" flex sm:items-center items-start justify-start sm:flex-row flex-col class="sm:mr-100px">
            <span :class="checked ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" />
            <span>Yes I'm the admin/owner.</span>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" cursor-pointer value="false" flex sm:items-center items-start justify-start sm:flex-row flex-col>
            <span :class="checked ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" />
            <span>No. I'm just a supporter.</span>
          </RadioGroupOption>
        </RadioGroup>
      </div>
      <h4 class="mb-18px" :class="[emailError ? 'c-red' : '']">
        * Your email Address
      </h4>
      <div mb-34px>
        <input
          v-model="email"
          class="w-336px h-34px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
          placeholder="mumulin1022@gmail.com"
        >
      </div>
      <h4 class="mb-18px">
        Frist name
      </h4>
      <div mb-34px>
        <input
          v-model="given_name"
          class="w-336px h-34px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
          placeholder="John"
        >
      </div>
      <h4 class="mb-18px">
        Last name
      </h4>
      <div mb-34px>
        <input
          v-model="family_name"
          class="w-336px h-34px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
          placeholder="Doe"
        >
      </div>
    </aside>
    <h3 text-left class="text-20px font-700 mb-28px mt-40px">
      Basic Information
    </h3>
    <aside
      w-full style=" background: #2A2A33;border-radius: 23px;"
      class="pt-22px pb-29px pl-45px"
    >
      <h4 class="text-18px mb-24px" :class="[upload_1Error ? 'c-red' : '']">
        * Product Logo
      </h4>
      <div w-full flex items-center justify-start class="mb-40px">
        <div
          class="w-179px h-179px border border-dashed border-[#979797] rounded-6px"
          flex items-center justify-center flex-col cursor-pointer
          shrink-1
          @click.stop.prevent="uploadImg"
        >
          <img v-if="upload_1" w-full object-fill :src="upload_1" alt="upload_1">
          <img v-if="!upload_1" :src="Upload" alt="Upload" class="w-75px mb-20px">
          <div v-if="!upload_1" class="text-[16px] " flex items-center justify-center flex-col>
            <span class="c-#6A6A6E">Ideal dimensions</span>
            <span class="c-#6A6A6E">400*400 px.</span>
          </div>
        </div>
        <div class="ml-44px w-[calc(100%-260px)]">
          <h4 class="mb-18px" :class="[product_nameError ? 'c-red' : '']">
            * Product Name
          </h4>
          <div mb-30px>
            <input
              v-model="product_name"
              class="w-full h-34px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
              placeholder="product Name"
            >
          </div>
          <h4 class="mb-18px" :class="[product_urlError ? 'c-red' : '']">
            * Website / Apps / Web3 / Chrome Extention
          </h4>
          <div>
            <input
              v-model="product_url"
              class="w-full h-34px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
              placeholder="A URL to visit your product"
            >
          </div>
        </div>
      </div>
      <h4 class="text-18px mb-24px flex items-start justify-start pr-40px mb24px">
        <span class="sm:mr-35px mr-2.29% w-180px" shrink-1 inline-block> Preview Image</span>
        <p flex class=" text-16px c-#80809F">
          High quality screenshot or preview image will attract more users and be featured by our editors. (2 Product Images Max)
        </p>
      </h4>
      <div w-full flex items-center justify-between class="pr-101px pl-56px mb-83px">
        <div
          class="w-435px h-258px border border-dashed border-[#979797] rounded-6px"
          overflow-hidden
          flex items-center justify-center flex-col cursor-pointer
          shrink-1
          relative
          @click.stop.prevent="uploadImg_2"
        >
          <img v-if="upload_2" class="w-435px" object-fill :src="upload_2" alt="upload_2">
          <img v-if="!upload_2" object-fill :src="Upload" alt="Upload" class="w-160px mb-20px">
          <img absolute class="w-24px right-[20px] top-[20px] z-10" :src="Del" alt="Del" @click.stop="deleteFn1">
          <div v-if="!upload_2" class="text-[16px] " flex items-center justify-center flex-col>
            <span class="c-#6A6A6E">Ideal dimensions 750*450 px.</span>
          </div>
        </div>
        <div
          class="w-435px h-258px border border-dashed border-[#979797] rounded-6px"
          flex items-center justify-center flex-col cursor-pointer
          overflow-hidden
          shrink-1
          relative
          @click.stop.prevent="uploadImg_3"
        >
          <img v-if="upload_3" class="w-435px" object-fill :src="upload_3" alt="upload_3">
          <img v-if="!upload_3" object-fill :src="Upload" alt="Upload" class="w-160px mb-20px">
          <img absolute class="w-24px right-[20px] top-[20px] z-10" :src="Del" alt="Del" @click.stop="deleteFn2">
          <div v-if="!upload_3" class="text-[16px] " flex items-center justify-center flex-col>
            <span class="c-#6A6A6E">Ideal dimensions 750*450 px.</span>
          </div>
        </div>
      </div>
      <div w-full flex items-center justify-between flex-wrap class="pr-45px">
        <div>
          <h4 class="mb-18px">
            * Category
          </h4>
          <div mb-34px class="select_bg">
            <el-select
              v-model="product_categry"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
              placeholder="Select one of models that best fit your product"
              style=" width:501px; height:34px; border: 1px solid #979797;width: 240px"
            >
              <el-option
                v-for="item in product_categry_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div>
          <h4 class="mb-18px">
            Model
          </h4>
          <div mb-34px class="select_bg">
            <el-select
              v-model="product_model"
              multiple
              placeholder="Select one of models that best fit your product"
              style=" width:501px; height:34px; border: 1px solid #979797;width: 240px"
            >
              <el-option
                v-for="item in product_model_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div>
          <h4 class="mb-18px">
            * Use Case
          </h4>
          <div mb-34px class="select_bg">
            <el-select
              v-model="product_applications"
              placeholder=" Select one of application that best fit your product"
              style=" width:501px; height:34px; border: 1px solid #979797;width: 240px"
            >
              <el-option
                v-for="item in product_applicationsArr"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
        <div>
          <h4 class="mb-18px ">
            Generative AI
          </h4>
          <div mb-34px class="select_bg">
            <el-select
              v-model="product_generative_ai"
              placeholder="Select one of generative AI that best fit your product"
              style=" width:501px; height:34px; border: 1px solid #979797;width: 240px"
            >
              <el-option
                v-for="item in product_generative_aiArr"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="pr-45px">
        <div>
          <h4 class="mb-18px flex items-center justify-between">
            <span :class="[product_short_descError ? 'c-red' : '']"> * Short Description</span>
            <span class="text-16px c-#80809F font-400">Max of 150 Characters</span>
          </h4>
          <div w-full relative>
            <input
              v-model="product_short_desc"
              class="w-full h-42px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
              placeholder="This is to provide an idea of what does your product do. A go Dod short summary will entice users to click and visit your page"
            >
            <span absolute class=" right-12px top-50% translate-y-[-50%] c-[#979797] text-16px">0/70</span>
          </div>
        </div>
        <div mt-28px>
          <h4 class="mb-18px flex items-center justify-between">
            <span :class="[product_detailError ? 'c-red' : '']">* Detail Description</span>
            <span class="text-16px c-#80809F font-400">Max of 2500 Characters</span>
          </h4>
          <div w-full relative>
            <textarea v-model="product_detail" class="pt-10px max-h-115px resize-none w-full h-115px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" placeholder="A detailed summary will better explain your products to the audi ences.Our users will see this in your dedicated product page." />
            <span absolute class=" right-12px bottom-12px c-[#979797] text-16px">0/70</span>
          </div>
        </div>
        <div mt-28px>
          <h4 class="mb-18px flex items-center justify-between">
            <span :class="[product_review_urlError ? 'c-red' : '']">* Product Review Article</span>
          </h4>
          <div w-full>
            <input
              v-model="product_review_url"
              class="w-full h-42px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
              placeholder="Aurl link to an article about your product that you want us to know."
            >
          </div>
        </div>
      </div>
      <h4 class="mb-18px mt-28px">
        Social Media
      </h4>
      <div w-full flex items-center justify-between flex-wrap class="pr-45px ">
        <div>
          <div mb-34px relative>
            <img absolute class="w-13px left-19px top-50%  translate-y-[-50%]" :src="Facebook_2" alt="Facebook">
            <input
              v-model="facebook" class="w-501px h-34px rounded-6px indent-50px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;"
              type="text"
              placeholder="Add your product's Facebook URL"
            >
          </div>
        </div>
        <div>
          <div mb-34px relative>
            <img absolute class="w-24px left-19px top-50%  translate-y-[-50%]" :src="Twitter_2" alt="Twitter">
            <input
              v-model="twitter" class="w-501px h-34px rounded-6px indent-50px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;"
              type="text"
              placeholder="Add your product's Twitter URL"
            >
          </div>
        </div>
        <div>
          <div mb-34px relative>
            <img absolute class="w-24px left-19px top-50%  translate-y-[-50%]" :src="Discord_2" alt="Discord">
            <input
              v-model="discord" class="w-501px h-34px rounded-6px indent-50px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;"
              type="text"
              placeholder="Add your product's Discord URL"
            >
          </div>
        </div>
        <div>
          <div mb-34px relative>
            <img absolute class="w-22px left-19px top-50%  translate-y-[-50%]" :src="Instagram_2" alt="Instagram">
            <input
              v-model="instagram" class="w-501px h-34px rounded-6px indent-50px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;"
              type="text"
              placeholder="Add your product's Instagram URL"
            >
          </div>
        </div>
      </div>
      <h4 class="mb-18px">
        * Policies
      </h4>
      <div class="mb-34px">
        <div w-full flex items-start justify-start flex-col>
          <div cursor-pointer class="mb10px">
            <span :class="Policies ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" @click="PoliciesClick" />
            <input id="Policies" v-model="Policies" type="checkbox" value="Policies" hidden>
            <label for="Policies" cursor-pointer>I agree with the Terms & Conditions</label>
          </div>
          <div cursor-pointer>
            <span :class="Privacy ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" @click="PrivacyClick" />
            <input id="Privacy" v-model="Privacy" type="checkbox" value="Privacy" hidden>
            <label for="Privacy" cursor-pointer>I agree with the Privacy Policy</label>
          </div>
        </div>
      </div>
    </aside>
    <div v-if="submitId">
      <button
        class="mt-27px" style="width: 125px; height: 48px;
background: #004699;
border-radius: 8px; margin-right: 30px"
        @click="passOrNO(1)"
      >
        Onborad
      </button>
      <button
        class="mt-27px"
        style="width: 125px;
height: 48px;
background: #3C3C3E;
border-radius: 8px;"
        @click="passOrNO(2)"
      >
        Ban
      </button>
    </div>
    <button
      v-if="submitId"
      class="mt-27px"
      style="width: 125px;
height: 48px;
background: #3C3C3E;
border-radius: 8px;"
      @click="submitProductsSave"
    >
      Save
    </button>
    <button
      v-if="!submitId"
      class="mt-27px"
      style="width: 200px;
height: 48px;
background: #3C3C3E;
border-radius: 8px;"
      @click="submitProject"
    >
      Submit Your Project
    </button>
  </section>
  <div v-show="loading" fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center>
    <Loading />
  </div>
</template>

<style scoped>
.select_bg :deep(.el-select) {
  width:501px !important;
  height:34px!important;
}
.select_bg :deep(.el-select .select-trigger .el-input__wrapper) {
  background: #2A2A33
}
</style>
