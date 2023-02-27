<script setup>
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue'
import Upload from '../img/upload_img.png'
import Del from '../img/del.png'
import { productsSave } from '../../url'
import Discord_2 from '../img/discord_2.png'
import Facebook_2 from '../img/facebook_2.png'
import Instagram_2 from '../img/instagram_2.png'
import Twitter_2 from '../img/twitter_2.png'
const isOwner = ref(true)
const email = ref('songwen8519761@126.com')
const given_name = ref('John')
const family_name = ref('Doe')
const product_name = ref('product Name')
const product_url = ref('https://songwuk.cc')
const product_categry = ref('Select one of our categories that best fit your product')
const product_model = ref('AI')
const product_applications = ref('')
const product_generative_ai = ref('')
const product_short_desc = ref('')
const product_detail = ref('')
const product_review_url = ref('')
const facebook = ref('https://songwuk.cc')
const twitter = ref('https://songwuk.cc')
const discord = ref('https://songwuk.cc')
const instagram = ref('https://songwuk.cc')

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
const submitProject = async () => {
  if (!Policies.value || !Privacy.value) {
    alert('must agree')
    return false
  }

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
  if (JSON.parse(data.value) && JSON.parse(data.value).code === 0)
    window.location.href = '/'
}

const deleteFn1 = () => {
  file2.value = ''
  upload_2.value = ''
}
const deleteFn2 = () => {
  file3.value = ''
  upload_3.value = ''
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
    <span class="text-16px font400 text-left">AIGPT.me is the largest generative All use cases category navigation platform. Submit your products today and get more exposure</span>
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
          <RadioGroupOption v-slot="{ checked }" cursor-pointer :value="true" flex sm:items-center items-start justify-start sm:flex-row flex-col class="sm:mr-100px">
            <span :class="checked ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" />
            <span>Yes I'm the admin/owner.</span>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" cursor-pointer :value="false" flex sm:items-center items-start justify-start sm:flex-row flex-col>
            <span :class="checked ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" />
            <span>No. I'm just a supporter.</span>
          </RadioGroupOption>
        </RadioGroup>
      </div>
      <h4 class="mb-18px">
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
      <h4 class="text-18px mb-24px">
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
          <h4 class="mb-18px">
            * Product Name
          </h4>
          <div mb-30px>
            <input
              v-model="product_name"
              class="w-full h-34px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" type="text"
              placeholder="product Name"
            >
          </div>
          <h4 class="mb-18px">
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
          flex items-center justify-center flex-col cursor-pointer
          shrink-1
          relative
          @click.stop.prevent="uploadImg_2"
        >
          <img v-if="upload_2" w-full object-fill :src="upload_2" alt="upload_2">
          <img v-if="!upload_2" :src="Upload" alt="Upload" class="w-160px mb-20px">
          <img absolute class="w-24px right-[20px] top-[20px] z-10" :src="Del" alt="Del" @click.stop="deleteFn1">
          <div v-if="!upload_2" class="text-[16px] " flex items-center justify-center flex-col>
            <span class="c-#6A6A6E">Ideal dimensions 750*450 px.</span>
          </div>
        </div>
        <div
          class="w-435px h-258px border border-dashed border-[#979797] rounded-6px"
          flex items-center justify-center flex-col cursor-pointer
          shrink-1
          relative
          @click.stop.prevent="uploadImg_3"
        >
          <img v-if="upload_3" w-full object-fill :src="upload_3" alt="upload_3">
          <img v-if="!upload_3" :src="Upload" alt="Upload" class="w-160px mb-20px">
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
          <div mb-34px>
            <select
              v-model="product_categry" class="w-501px h-34px rounded-6px indent-16px bg-[#2A2A33] c-#979797" style="border: 1px solid #979797;"
              placeholder="Select one of our categories that best fit your product"
            >
              <option value="" disabled selected hidden>
                Select one of our categories that best fit your product
              </option>
              <option value="1">
                1
              </option>
              <option value="2">
                2
              </option>
            </select>
          </div>
        </div>
        <div>
          <h4 class="mb-18px">
            Model
          </h4>
          <div mb-34px>
            <select
              v-model="product_model" class="w-501px h-34px rounded-6px indent-16px bg-[#2A2A33] c-#979797" style="border: 1px solid #979797;"
              placeholder="Select one of models that best fit your product"
            >
              <option value="" disabled selected hidden>
                Select one of models that best fit your product
              </option>
              <option value="1">
                1
              </option>
              <option value="2">
                2
              </option>
            </select>
          </div>
        </div>
        <div>
          <h4 class="mb-18px">
            * Applications
          </h4>
          <div mb-34px>
            <select
              v-model="product_applications" class="w-501px h-34px rounded-6px indent-16px bg-[#2A2A33] c-#979797" style="border: 1px solid #979797;"
              placeholder="Select one of application that best fit your product"
            >
              <option value="" disabled selected hidden>
                Select one of application that best fit your product
              </option>
              <option value="1">
                1
              </option>
              <option value="2">
                2
              </option>
            </select>
          </div>
        </div>
        <div>
          <h4 class="mb-18px">
            Generative AI
          </h4>
          <div mb-34px>
            <select
              v-model="product_generative_ai" class="w-501px h-34px rounded-6px indent-16px bg-[#2A2A33] c-#979797" style="border: 1px solid #979797;"
              placeholder="Select one of generative AI that best fit your product"
            >
              <option value="" disabled selected hidden>
                Select one of generative AI that best fit your product
              </option>
              <option value="1">
                1
              </option>
              <option value="2">
                2
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="pr-45px">
        <div>
          <h4 class="mb-18px flex items-center justify-between">
            <span> * Short Description</span>
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
            <span>* Detail Description</span>
            <span class="text-16px c-#80809F font-400">Max of 2500 Characters</span>
          </h4>
          <div w-full relative>
            <textarea v-model="product_detail" class="max-h-115px resize-none w-full h-115px rounded-6px indent-16px bg-[#2A2A33] placeholder-#979797 c-#979797 " style="border: 1px solid #979797;" placeholder="A detailed summary will better explain your products to the audi ences.Our users will see this in your dedicated product page." />
            <span absolute class=" right-12px bottom-12px c-[#979797] text-16px">0/70</span>
          </div>
        </div>
        <div mt-28px>
          <h4 class="mb-18px flex items-center justify-between">
            <span>* Product Review Article</span>
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
        <RadioGroup v-model="Policies" w-full flex items-start justify-start flex-col>
          <RadioGroupOption v-slot="{ checked }" cursor-pointer value="Policies" flex sm:items-center items-start justify-start sm:flex-row flex-col class="sm:mr-100px mb-22px">
            <span :class="checked ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" />
            <span>I agree with the Terms & Conditions</span>
          </RadioGroupOption>
        </RadioGroup>
        <RadioGroup v-model="Privacy" w-full flex items-start justify-start flex-col>
          <RadioGroupOption v-slot="{ checked }" cursor-pointer value="Privacy" flex sm:items-center items-start justify-start sm:flex-row flex-col>
            <span :class="checked ? 'bg-#05D4FD' : ''" inline-block class="w-17px h-17px border border-[#979797] rounded-50% mr-10px" />
            <span>I agree with the Privacy Policy</span>
          </RadioGroupOption>
        </RadioGroup>
      </div>
    </aside>
    <button
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
</template>
