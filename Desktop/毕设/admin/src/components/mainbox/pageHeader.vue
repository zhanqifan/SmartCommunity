<script setup>
import {HomeFilled} from "@element-plus/icons-vue"
import { useRoute } from "vue-router"
const route= useRoute()//自动获取当前页面路由
</script>
<template>
   <div class="page-header">
    <el-page-header  icon="" @click="$router.push('/index')" 
    title="企业门户管理系统" :content="route.name">
   
    </el-page-header>
  </div>
</template>

<style lang='scss' scoped>
.page-header{
  width: 270px;
  margin-bottom: 30px;
}
</style>