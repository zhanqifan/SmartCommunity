import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import Home from '../views/Home/home.vue'
import Current from '@/views/News/CurNes.vue'
import Typical from '@/views/News/Typical.vue'
import Public from '@/views/News/Public.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: index,
      children: [
        {
          path: '/index',
          name:'index',
          component: Home
        },
        {
          path: '/current',
          name:'最新动态',
          component:Current
        },  
        {
          path: '/typical',
          name:'生活百科',
          component:Typical
        },
        {
          path: '/public',
          name:'通知公共',
          component:Public
        },
        {
          path:'/newsdetail/:_id?/:category?',
          component:()=>import('@/views/News/component/NewsDetail.vue')
        },
        {
           path:'/usersearch',
           component:()=>import('@/views/Public/PeoSearch.vue')
        },
        {
          path:'/publicfac',
          component:()=>import('@/views/Public/PublicFacilities.vue')
        },
        {
          path:'/hydropower',
          component:()=>import('@/views/GoPay/hydropower.vue')
        },
        {
          path:'/property',
          component:()=>import('@/views/GoPay/property.vue')
        },
        {
           path:'/paysuccess',
           component:()=>import('@/views/GoPay/component/success.vue')
        },
        {
          path:'/AddAdvice',
          component:()=>import('@/views/advice/AddAdvice.vue')
        },
        {
          path:'/AdviceList',
          component:()=>import('@/views/advice/AdviceList.vue')
        },
        {
          path:'/addrepair',
          component:()=>import('@/views/Repair/AddRepair.vue')
        },
        {
          path:'/repairlist',
          component:()=>import('@/views/Repair/RepairList.vue')
        } 
      ]
    },
    {
      path: '/login',
      name:'login',
      component: ()=>import('../views/login.vue'),
    }

  ]
})


router.beforeEach((to, from, next) => {
  if (to.name === "login"||to.name === "index") {
    next()
  }
  else if (!localStorage.getItem("token")) {
    next({
      path: "/login"
    })
  }else{
    next()
  }
})
export default router
