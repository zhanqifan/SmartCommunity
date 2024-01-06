<script setup >
import pageHeader from "../../components/mainbox/pageHeader.vue";
import {ref} from 'vue'
import { getUser } from "@/api/user-manage";
import UserEdit from "./component/UserEdit.vue";
import {delUser} from '@/api/user-manage.js'
const tableData = ref([]); // 表格数据
const drawer = ref(true);
// 默认头像
const circleUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const handleUserEdit = ref()//绑定子组件

const handleEdit = (row) => {
     handleUserEdit.value.open(row)//控制抽屉弹出
};
const handleDelete = async (index,row) =>{
  const res = await delUser(row._id)
     tableData.value.splice(index,1)
     console.log(res.data)
}

onMounted(async () => {
  const res = await getUser();
  tableData.value = res.data.data;
  console.log(tableData.value);
});
</script>
<template>
  <div>
    <pageHeader />
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
          <el-tag v-if="scope.row.role === 1">管理员</el-tag>
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
    <UserEdit ref="handleUserEdit"></UserEdit>
  </div>
</template>

<style scoped>
</style>