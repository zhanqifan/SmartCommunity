
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import PageHeader from '@/components/PageHeader.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.mount('#app')
