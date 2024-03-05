<script setup>
import FooterlinkVue from "@/components/Footerlink.vue";
import headermenu from "@/components/HeaderMenu.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header > <headermenu /></el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer><FooterlinkVue/></el-footer>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>

.el-header{
  padding: 0;
  position:sticky;
  top: 0; // 粘性定位的起始位置
  z-index: 1000; // 确保菜单栏在页面上其他元素之上
  background-color: white; // 防止滚动时内容透过菜单栏显示
}
.el-main{
  display: flex;
  height: 100%;
  min-height: 701px;
  justify-content: center;
  background-color: #F5F5F5;
}
.el-footer{
  padding: 0;
 bottom: 0;
}
</style>