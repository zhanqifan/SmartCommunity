import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
