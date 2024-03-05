import Center from "@/views/center/Center.vue"
import Home from "@/views/home/Home.vue"
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsEdit from '@/views/news-manage/component/NewsEdit.vue'
import AddCost from '@/views/product-manage/AddCost.vue'
import HydroPower from '@/views/product-manage/hydropower.vue'
import SocialCost from '@/views/product-manage/socialcost.vue'
import AddDamage from '@/views/repair-manage/AddDamage.vue'
import DamageList from '@/views/repair-manage/DamageList.vue'
import Success from '@/views/product-manage/success.vue'
import Feedbackadd from '@/views/product-manage/Feedbackadd.vue'
import Feedbacklist from '@/views/product-manage/Feedbacklist.vue'
import PublicAdd from '@/views/search-message/PublicAdd.vue'
import UserSearch from '@/views/search-message/UserSearch.vue'
import PublicSearch from '@/views/search-message/PublicSearch.vue'
import NotFound from '@/views/NotFound.vue'
const routes = [
    {
        path: '/index',
        name:'首页',
        component: Home
    },
    {
        path: '/center',
        name:'个人中心',
        component: Center
    },
    {
        path: '/user-manage/adduser',
        name:"添加用户",
        component: UserAdd,
        requireAdmin:true
    },
    {
        path: '/user-manage/userlist',
        name:'权限管理',
        component: UserList,
        requireAdmin:true
    },
    {
        path: '/news-manage/addnews',
        name:'公告发布',
        requireAdmin:true,
        component: NewsAdd,
    },
     {
        path: '/news-manage/addnews/:id',
        name:'公告编辑',
        requireAdmin:true,
        component: NewsEdit,
    },
    {
        path: '/news-manage/newslist',
        name:'公告列表',
        component: NewsList
    },
    {
        path: '/product-manage/addcost',
        name:'添加账单',
        requireAdmin:true,
        component: AddCost
    },
    {
        path: '/product-manage/hydropower',
        name:'水电缴费',
        component: HydroPower
    },
    {
        path: '/product-manage/socialcost',
        name:'物业缴费',
        component: SocialCost
    },
    {
        path: '/product-manage/paybill',
        name: '支付页面',
        component: Success
      },
      {
        path:'/product-manage/addfeedback',
        name:'反馈添加',
        component:Feedbackadd
      }, 
      {
        path:'/product-manage/feedbacklist',
        name:'反馈列表',
        component:Feedbacklist
      },
    {
        path: '/repair-manage/repair',
        name:'报修提交',
        component: AddDamage
    },
    {
        path: '/repair-manage/repaitstate',
        name:'报修列表',
        component: DamageList
    },
    {
        path:'/search-message/publicadd',
        name:'公共添加',
        component:PublicAdd
    },
    {
        path: '/search-message/usersearch',
        name:'用户查询',
        component: UserSearch
    },
    {
        path: '/search-message/publicsearch',
        name:'公共信息查询',
        component: PublicSearch
    },
    {  
        //重定向页面
        path: '/',
        redirect: "/index"
    },
    {
        path:"/:pathMatch(.*)*",//捕获所有未被其他路由规则匹配的路径
        name:"not found",
        component:NotFound,
    }
]

export default routes