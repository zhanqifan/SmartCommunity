import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routesConfig from './config'
import { useUserStore } from '@/stores/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    },
 
    // mainbox的嵌套路由,后面根据权限动态添加
  ]
})



// addRoute 方法用于动态地向路由配置中添加新的路由
// router.addRoute 被用来向名为 "mainbox" 的路由下动态添加一个嵌套路由。
// 这意味着 Home 组件将作为 /index 的路径处理 可一起加载mainbox的子路由
// 这里分离到了config文件夹 写成了数组进行管理
const ConfigRouter = (userStore) => {
  // 重新生成一个路由
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }
  routesConfig.forEach(item => {
    //   这里判断是否为管理员然后再添加相应的路由         父路由  子路由
    checkPermission(item, userStore) && router.addRoute("mainbox", item)
  })
  // 让路由不在去判断fullpath
  userStore.changeGetterRouter(true)
}
const checkPermission = (item, userStore) => {
  if (item.requireAdmin) {
    return userStore.UserInfo.role === 0 //判断是否为管理员 返回true或false
  }
  return true
}

// 路由拦截权限 每次路由跳转之前
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name === "login") {
    next()
  } else {
    // 如果授权(已经登录过了)next()
    // 未授权,重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {
      // 第一次进来进行路由识别生成
      if (!userStore.isGetterRouter) {
        router.removeRoute("mainbox")//先清空路由 防止页面未刷新缓存
        ConfigRouter(userStore)//由于路由刚刚生成 路由还不知道 需要让next重新导航到目标路由
        
        // 由于支付宝跳转过来会重定向这个页面导致参数丢失所以让路由守卫保留
        if (to.path === '/product-manage/paybill') {
          next({ path: to.path, query: to.query, meta: { queryParams: to.query } });
        }
        else{
        next({
          path: to.fullPath//表示完整的目标 URL 路径，包括查询参数和哈希。
          // 通过使用 next({ path: to.fullPath })，您实际上是在告诉 Vue Router：
          // “现在我已经添加了新的路由，所以请重新尝试导航到我最初请求的完整路径。”
        })
      }
      }
      else {
        next()
      }
    }
  }
})



export default router
