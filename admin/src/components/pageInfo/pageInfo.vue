<script setup>
const emit = defineEmits(['pagequery'])
defineProps({
    count:Number
})
const pagenum = ref(10)//页码大小
const currentPage =ref(1)//当前页
// 页码大小改变
const handleSizeChange= (Size)=>{
   emit("pagequery",{Size,Current:currentPage.value})
}
// 当前页数改变
const handleCurrentChange = (Current)=>{
  emit("pagequery",{Size:pagenum.value,Current})
}
const clearPageInfo =()=>{
  pagenum.value=10
  currentPage.value=1
}
defineExpose({
  clearPageInfo
})
</script>
<template>
<div class="page">
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pagenum"
    :page-sizes="[10, 20, 30, 40]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="count"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  </div>
</template>

<style lang='scss' scoped>
.page{
 float: right;
 margin-top: 10px;
}
</style>