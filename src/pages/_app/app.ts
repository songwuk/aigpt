import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vue3GoogleLogin from 'vue3-google-login'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setupStore } from '@/store'
export default (app: App) => {
  app.use(vue3GoogleLogin, {
    clientId: '982800757040-brbfkric972d87u7uvku4st4iu37i1ni.apps.googleusercontent.com',
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component)

  setupStore(app)
  app.use(ElementPlus)
}
