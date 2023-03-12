import type { App } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'
export default (app: App) => {
  app.use(vue3GoogleLogin, {
    clientId: '982800757040-brbfkric972d87u7uvku4st4iu37i1ni.apps.googleusercontent.com',
  })
}
