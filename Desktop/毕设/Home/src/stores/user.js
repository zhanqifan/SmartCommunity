import { defineStore } from 'pinia'

export const useUser = defineStore('User', () => {
  const UserInfo = ref()
  
  const changeUserInfo = (value) => {
    UserInfo.value = {
      ...UserInfo.value,
      ...value
    }
    console.log('aa')
  }
  const clearUserInfo = () => {
    UserInfo.value = {}
  }
  return {
    UserInfo,
    changeUserInfo,
    clearUserInfo
  }
},{
  persist:true,
})
