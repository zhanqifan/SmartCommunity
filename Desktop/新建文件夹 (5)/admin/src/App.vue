<script setup>

</script>

<template>
   <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar{
  widows: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb{
  background: #1890ff;
}
::-webkit-scrollbar-track{
  background: #ddd;
}
</style>
