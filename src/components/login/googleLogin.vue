<!-- eslint-disable no-console -->
<script setup>
import { onMounted, ref } from 'vue'
import { decodeCredential } from 'vue3-google-login'
const emit = defineEmits(['loginDisplay'])
const loginDisplay = ref(false)
const isLogin = ref(true)
onMounted(() => {
  if (localStorage.getItem('username'))
    isLogin.value = false
})
const callback = (response) => {
  if (response.credential) {
    const userData = decodeCredential(response.credential)
    localStorage.setItem('username', JSON.stringify({
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
    }))
  }
  else {
    console.log('Call the endpoint which validates authorization code')
  }
}
/**
 * login
 */
const showLogin = () => {
  loginDisplay.value = true
  document.body.style.overflow = 'hidden'
}
/**
 * close
 */
const hideLogin = () => {
  loginDisplay.value = false
  // $emit('loginDisplay', { login: true })
  document.body.style.overflow = 'auto'
}
const signIn = () => {
  console.log('login')
}
const signOut = () => {
  console.log('signOut')
}
defineExpose({
  showLogin,
})
</script>

<template>
  <div v-show="loginDisplay">
    <div class="fixed inset-0 bg-zinc-900 bg-opacity-40 z-40 " style="pointer-events: auto;" data-aria-hidden="true" aria-hidden="true" />
    <div id="radix-:r0:" role="dialog" aria-describedby="radix-:r2:" aria-labelledby="radix-:r1:" data-state="open" class="bg-zinc-800 items-center fixed shadow-xl rounded-2xl z-50 px-8 py-8 text-sm drop-shadow-lg border border-zinc-700 fadeInAndScale" tabindex="-1" style="top: 50%; transform: translate(-50%, -50%); left: 50%; max-width: 330px; width: 100%; max-height: 85vh; pointer-events: auto;">
      <button type="button" class="hover:bg-zinc-700 p-1 rounded absolute right-3 top-3" @click="hideLogin">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <line class="c-white" x1="18" y1="6" x2="6" y2="18" />
          <line class="c-white" x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div class="flex flex-col text-zinc-200 text-center items-center">
        <img class="h-6 mb-8" src="../img/AiGPT_1.png">
        <div>
          <GoogleLogin :callback="callback" :prompt="isLogin" :auto-login="isLogin">
            <button class="bg-zinc-700 px-4 py-2 rounded-lg  w-64 shadow flex items-center justify-center space-x-2 border border-zinc-500 border-opacity-50 hover:brightness-110">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" /><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" /><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" /><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" /></g></svg>
              <p class="flex items-center justify-center">
                Continue with Google
              </p>
            </button>
          </GoogleLogin>
          <div class="flex-1 w-64 flex-shrink-0 opacity-50 my-8 ">
            Or continue with email
          </div>
        </div>
        <form>
          <input autocomplete="email" placeholder="Email address" class="w-64 px-3 py-2 bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg border border-zinc-600 hover:brightness-110" type="email" value="">
          <button type="submit" class="hover:brightness-110 bg-gradient-to-t from-indigo-800 via-indigo-800 to-indigo-700 border border-indigo-800 px-4 py-1.5 rounded-lg shadow h-9 w-64 drop-shadow flex items-center justify-center mt-3" @click="signIn">
            Continue
          </button>
        </form>
      </div>
    </div>
    <div />
  </div>
</template>
