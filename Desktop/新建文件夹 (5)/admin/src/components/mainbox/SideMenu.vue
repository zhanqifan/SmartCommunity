<script setup>
import { useUserStore } from "@/stores";
import {
  HomeFilled,
  Avatar,
  UserFilled,
  OfficeBuilding,
  TakeawayBox,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const useUser= useUserStore()
const route = useRoute()

</script>
<template>
  <el-aside :width="useUser.isCollapsed?'64px':'200px'">
    <el-menu
    :collapse="useUser.isCollapsed"
      :default-active="route.fullPath"
      class="el-menu-vertical-demo"
      :router="true"
     
    >
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><OfficeBuilding /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><TakeawayBox /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist"
          >产品列表</el-menu-item
        >
      </el-sub-menu>
      
    </el-menu>
  </el-aside>
</template>

<style lang='scss' scoped>
.el-aside {
  height: 100vh;
  width: auto;
}
.el-menu-item,.el-sub-menu {
  letter-spacing: 7px;
  span{
    padding-right: 30px;
  }
}
</style>