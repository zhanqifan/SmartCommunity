<script setup >
import pageHeader from "../../components/mainbox/pageHeader.vue";
import { ref } from "vue";
import { getUser, getPageInfo } from "@/api/user-manage";
import UserEdit from "./component/UserEdit.vue";
import { delUser } from "@/api/user-manage.js";
import { ElMessage } from "element-plus";
import pageInfo from "@/components/pageInfo/pageInfo.vue";
import Search from "@/components/search/search.vue";
const tableData = ref([]); // 表格数据
const drawer = ref(true);
const count = ref();
const search = ref(); //搜索信息
const page = ref();
// 默认头像
const circleUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const handleUserEdit = ref(); //绑定子组件

const handleEdit = (row) => {
  handleUserEdit.value.open(row); //控制抽屉弹出
};
const handleDelete = async (index, row) => {
  const res = await delUser(row._id);
  tableData.value.splice(index, 1);
  console.log(res.data);
  ElMessage({
    type: "success",
    message: "删除成功",
  });
};
// 用户列表
const getList = async () => {
  const res = await getUser();
  console.log(res.data);
  tableData.value = res.data.data;
  count.value = res.data.total;
};
// 分页请求
const handlepage = async (data) => {
  const res = await getPageInfo({ ...data, username: search.value });
  console.log(res.data.data);
  tableData.value = res.data.data;
  count.value = res.data.total;
};
// 处理输入框
const handleinput = async (value) => {
  search.value = value;
  page.value.clearPageInfo()
  const res = await getUser(value);
  if (res.data.data == []) {
    ElMessage({
      type: "error",
      message: "查无此人",
    });
  } else {
    tableData.value = res.data.data;
    count.value = res.data.total;
  }
};
onMounted(() => {
  getList();
});
</script>
<template>
  <div>
    <pageHeader />
    <Search @input="handleinput" msg="请输入你要查询的用户名" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column label="头像">
        <template #default="scope">
          <el-avatar
            :size="50"
            :src="scope.row.avatar ? scope.row.avatar : circleUrl"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="角色">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 0">管理员</el-tag>
          <el-tag v-else type="success">编辑</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <UserEdit ref="handleUserEdit" @success="getList"></UserEdit>
    <pageInfo ref="page" @pagequery="handlepage" :count="count" />
  </div>
</template>

<style scoped>
</style>