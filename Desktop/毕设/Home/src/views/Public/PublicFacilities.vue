<script setup>
import { PublicList, PublicDel } from "@/api/search-manage";
import { Timer } from "@element-plus/icons-vue";
// import { useUser } from "@/stores/user.js";
import PageiNation from '@/components/PageiNation.vue'
import Search from "@/components/Search.vue";
const tableData = ref([]);
const page = ref();
const count = ref(11);
const puedit = ref();
const Public = ref();
// 删除操作
const handleDelete = async (index, row) => {
  tableData.value.splice(index, 1);
  await PublicDel(row._id);
  await Publiclist();
  ElMessage({
    message: "删除成功",
    type: "success",
  });
};

// 搜索框
const handleinput = async (val) => {
  Public.value = val;
  const res = await PublicList({ Public: val });
   tableData.value = res.data
  count.value = res.total;
  page.value.clearPageInfo();
};
const handlepage = async (data) => {
  const res = await PublicList({ ...data, Public: Public.value });
  console.log(res.data);
    tableData.value = res.data
  count.value = res.total;
};
const Publiclist = async () => {
  const res = await PublicList();
  tableData.value = res.data
  count.value = res.total;
};
onMounted(async () => {
  Publiclist();
});
const url =
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const srcList = [];
</script>
<template>
<div class="main">
  <Search @input="handleinput" msg="请输入你要查询的设施" />
  <el-table :data="tableData" style="width: 100%" table-layout="fixed">
    
    <el-table-column label="设施名称" prop="Public" />
    <el-table-column label="位置" prop="Address" />
    <el-table-column label="开放时间">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <p>{{ scope.row.OpenDate[0] }}-{{ scope.row.OpenDate[1] }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="设施图片">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image
            :preview-src-list="scope.row.srcList"
            :preview-teleported="true"
            :src="
              scope.row.srcList[0] ||
              'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
            "
            style="width: 50px; height: 50px"
          />
        </div>
      </template>
    </el-table-column>
  
  </el-table>
  <PageiNation class="Pgae" style="display:flex;justify-content:flex-end"  @pagequery="handlepage" :count="count"/>
  </div>
</template>
<style lang='scss' scoped>
.main{
    width: 70%;
    display: flex;
    flex-direction: column;
 
}
</style>