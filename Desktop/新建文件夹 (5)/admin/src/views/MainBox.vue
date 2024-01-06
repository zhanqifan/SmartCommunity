<script setup>
import SideMenuVue from "@/components/mainbox/SideMenu.vue";
import TopHeaderVue from "@/components/mainbox/TopHeader.vue";
</script>


<template>
  <div class="common-layout">
    <el-container >
      <SideMenuVue />
      <el-container direction="vertical">
        <TopHeaderVue />
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss">
</style>
