<script setup>
import { useUserStore } from "@/stores";
import {
  HomeFilled,
  Avatar,
  User,
  Edit,
  Memo,
  Phone,
  Money, 
  HelpFilled,
  UserFilled,
  OfficeBuilding,
  TakeawayBox,
ChatDotSquare
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const useUser = useUserStore();
const route = useRoute();
// 自定义指令
const vAdmin = {
  mounted(el) {
    console.log(el);
    if (useUser.UserInfo.role !== 0) {
      el.parentNode.removeChild(el);
    }
  },
};
</script>
<template>
  <el-aside style="background-color:#304156" :width="useUser.isCollapsed ? '64px' : '200px'">
    <el-menu
      :collapse="useUser.isCollapsed"
      :default-active="route.fullPath"
       text-color="rgb(191, 203, 217)"
      background-color="#304156"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <el-menu-item class="one" index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item class="one" index="/center">
        <el-icon><Edit /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">权限管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news-manage" v-admin>
        <template #title>
          <el-icon><OfficeBuilding /></el-icon>
          <span>公告管理</span>
        </template>
        <el-menu-item index="/news-manage/addnews">公告添加</el-menu-item>
        <el-menu-item index="/news-manage/newslist">公告列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><TakeawayBox /></el-icon>
          <span>物业管理</span>
        </template>
        <el-sub-menu index="/free-manage" >
          <template #title><el-icon><Money /></el-icon>费用管理</template>
          <el-menu-item  v-if="useUser.UserInfo.role===0" index="/product-manage/addcost">添加账单</el-menu-item>
          <el-menu-item index="/product-manage/hydropower">水电缴费</el-menu-item>
          <el-menu-item index="/product-manage/socialcost">物业缴费</el-menu-item>
          </el-sub-menu>
        <el-sub-menu index="/people-manage"> 
        <template #title><el-icon><Phone /></el-icon>居民反馈管理</template>
        <el-menu-item index="/product-manage/addfeedback">反馈添加</el-menu-item>
          <el-menu-item index="/product-manage/feedbacklist">反馈列表</el-menu-item>
        </el-sub-menu
        >
      </el-sub-menu>
           <el-sub-menu index="/repair-manage">
        <template #title>
          <el-icon><OfficeBuilding /></el-icon>
          <span>报修管理</span>
        </template>
        <el-menu-item index="/repair-manage/repair">报修提交</el-menu-item>
        <el-menu-item index="/repair-manage/repaitstate">报修状态</el-menu-item>
      </el-sub-menu>
          <el-sub-menu index="/search-message">
        <template #title>
          <el-icon><ChatDotSquare /></el-icon>
          <span>信息查询</span>
        </template>
        <el-menu-item index="/search-message/usersearch">用户查询</el-menu-item>
        <el-menu-item index="/search-message/publicadd" v-if="useUser.UserInfo.role===0">公共添加</el-menu-item>
        <el-menu-item index="/search-message/publicsearch">公共信息查询</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang='scss' scoped>
.el-aside {
  height: 100vh;
  width: auto;
}
.el-menu-item,
.el-sub-menu {
  span {
    padding-right: 60px;
  }
}
.one{
  background-color: #304156!important;
}
.el-menu-item{
  background-color: #1f2d3d;
}
</style>