import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', () => {
  const isGetterRouter = ref(false)//路由初始化控制
  const isCollapsed = ref(true)//侧边栏展开
  const UserInfo = ref({})//登录信息

  // 路由控制
  const changeGetterRouter = (value) => {
    isGetterRouter.value = value
  }

  // 侧边栏控制
  const handleisCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
  }
  // 用户信息更新
  const changeUserInfo = (value) => {
    UserInfo.value = {
      ...UserInfo.value,
      ...value
    }
  }
  const clearUserInfo = () => {
    UserInfo.value = {}
  }
  return {
    isGetterRouter,
    isCollapsed,
    UserInfo,
    changeGetterRouter,
    handleisCollapsed,
    changeUserInfo,
    clearUserInfo,
  }
}, {
  persist: { paths: ['isCollapsed', 'UserInfo'] },
})
