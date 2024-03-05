<script setup>
import {useRoute, useRouter} from 'vue-router'
const router =  useRouter()
const route = useRoute()
const goBack = () =>{
    router.push('/index')
}
const goPage = () =>{
    router.push()
}
</script>
<template>
  <el-page-header icon="" @back="goBack" title="首页">
    <template #content>
      <span class="text-large font-600 mr-3" @click="goPage"> {{route.name}} </span>
    </template>
  </el-page-header>
</template>

<style lang='scss'>
</style>