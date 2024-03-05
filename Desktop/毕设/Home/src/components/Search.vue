<script setup>
import { Search } from "@element-plus/icons-vue";
const Searchinput = ref(); //输入框的值
const emit = defineEmits(["input"]);
const prop = defineProps({
  msg: String,
});
// 搜索框触发传值给父组件
const handleInput = () => {
  emit("input", Searchinput.value);
};
const clear = ()=>{
  emit("input");
}
</script>
<template>
  <div class="search-input">
    <el-input
      v-model="Searchinput"
      style="width: 200px"
      :placeholder="msg"
      clearable
      @clear="clear"
      @keydown.enter="handleInput"
    />
    <slot></slot>
    <el-button type="primary" @click="handleInput"
      ><el-icon><Search /></el-icon
    ></el-button>
  </div>
</template>

<style lang='scss' scoped>
.search-input {
  display: flex;
  justify-content: flex-end;
}
</style>