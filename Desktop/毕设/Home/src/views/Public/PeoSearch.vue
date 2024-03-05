<script setup>
import { userlist } from "@/api/search-manage";
import { useUser } from "@/stores/user.js";
const User = useUser();
const count = ref();
const page = ref();
const search = ref();
const SearchAddress = ref([]);
let tableData = ref([]);
const address = User.UserInfo.address;
const role = User.UserInfo.role;
const getUserList = async () => {
  let data=role===1?{address}:{}
  const res = await userlist(data);
  tableData.value = res.data
  count.value=res.total
};

// 分页查询
const handlepage = async (data) => {
  const res = await userlist({ ...data, username: search.value,address:SearchAddress.value });
  tableData.value = res.data
  count.value = res.total;
};
// 性别
const sex = {
  0: "保密",
  1: "男",
  2: "女",

};

// 住户号矫正
const getaddress = computed(() => (address) => {
  return (address = `${address[0]}号${address[1]}单元${address[2]}室`);
});
onMounted(() => {
  getUserList();
});
</script>
<template>

  <el-table :data="tableData" style="width: 60%">
    <el-table-column prop="username" label="同住宅用户" />
    <el-table-column label="住宅号">
      <template #default="scope">
        {{ getaddress(scope.row.address) }}
      </template>
    </el-table-column>
    <el-table-column label="性别">
      <template #default="scope">
        {{ sex[scope.row.gender]  }}
      </template>
    </el-table-column>
   
  </el-table>
  <!-- <pageInfo ref="page" @pagequery="handlepage" :count="count" /> -->
</template>

<style lang='scss' scoped>

</style>