import Center from "@/views/center/Center.vue"
import Home from "@/views/home/Home.vue"
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
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
        component: UserAdd
    },
    {
        path: '/user-manage/userlist',
        name:'用户列表',
        component: UserList
    },
    {
        path: '/news-manage/addnews',
        name:'添加新闻',
        component: NewsAdd
    },
    {
        path: '/news-manage/newslist',
        name:'新闻列表',
        component: NewsList
    },
    {
        path: '/product-manage/productlist',
        component: ProductList
    }, {
        path: '/product-manage/productadd',
        component: ProductAdd
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