<script setup>
import { PublicList, PublicDel } from "@/api/search-manage";
import { Timer } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores";
import Search from "@/components/search/search.vue";
import PublicEdit from "./component/PublicEdit.vue";
import pageInfo from '@/components/pageInfo/pageInfo.vue'
const tableData = ref([]);
const page = ref();
const count = ref(11);
const puedit = ref();
const Public = ref();
const useUser = useUserStore();
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
// 打开子组件修改界面
const handleEdit = (index, row) => {
  puedit.value.open(row);
};
// 搜索框
const handleinput = async (val) => {
  Public.value = val;
  const res = await PublicList({ Public: val });
   tableData.value = res.data.data;
  count.value = res.data.total;
  page.value.clearPageInfo();
};
// 分页
const handlepage = async (data) => {
  const res = await PublicList({ ...data, Public: Public.value });
  console.log(res.data);
};
const Publiclist = async () => {
  const res = await PublicList();
  tableData.value = res.data.data;
  count.value = res.data.total;
};
onMounted(async () => {
  Publiclist();
});
const url =
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const srcList = [];
</script>
<template>
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
    <el-table-column label="操作" v-if="useUser.UserInfo.role === 0">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <pageInfo ref="page" @pagequery="handlepage" :count="count" />
  <PublicEdit ref="puedit" @success="Publiclist" />
</template>
