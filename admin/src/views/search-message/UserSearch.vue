<script setup>
import { userlist } from "@/api/search-manage";
import { useUserStore } from "@/stores";
import pageInfo from "@/components/pageInfo/pageInfo.vue";
import Search from "@/components/search/search.vue";
const userUser = useUserStore();
const count = ref();
const page = ref();
const search = ref();
const SearchAddress = ref([]);
let tableData = ref([]);
const address = userUser.UserInfo.address;
const role = userUser.UserInfo.role;
const getUserList = async () => {
  let data=role===1?{address}:{}
  const res = await userlist(data);
  tableData.value = res.data.data;
  count.value=res.data.total
};
const options = [
  {
    value: 1, // 1号楼
    label: "1号楼",
    children: [
      {
        value: 1, // 1号楼的1单元
        label: "1单元",
        children: [
          {
            value: 101, // 101室
            label: "101室",
          },
          {
            value: 102, // 102室
            label: "102室",
          },
          // 更多房间...
        ],
      },
      {
        value: 2, // 1号楼的2单元
        label: "2单元",
        children: [
          {
            value: 201, // 201室
            label: "201室",
          },
          {
            value: 202, // 202室
            label: "202室",
          },
          // 更多房间...
        ],
      },
      // 更多单元...
    ],
  },
  {
    value: 2, // 2号楼
    label: "2号楼",
    children: [
      {
        value: 1, // 2号楼的1单元
        label: "1单元",
        children: [
          {
            value: 101, // 101室
            label: "101室",
          },
          {
            value: 102, // 102室
            label: "102室",
          },
          // 更多房间...
        ],
      },
      {
        value: 2, // 2号楼的2单元
        label: "2单元",
        children: [
          {
            value: 201, // 201室
            label: "201室",
          },
          {
            value: 202, // 202室
            label: "202室",
          },
          // 更多房间...
        ],
      },
      // 更多单元...
    ],
  },
  // 更多楼栋...
];
// 分页查询
const handlepage = async (data) => {
  const res = await userlist({ ...data, username: search.value,address:SearchAddress.value });
  console.log(res.data.data);
  tableData.value = res.data.data;
  count.value = res.data.total;
};
// 性别
const sex = {
  0: "保密",
  1: "男",
  2: "女",

};

// 搜索框
const handleinput = async (value) => {
  search.value = value;
  const address=SearchAddress.value
  page.value.clearPageInfo();
  const res = await userlist({ address, role,username:value,  });
  if (res.data.data == []) {
    ElMessage({
      type: "error",
      message: "还没有人入住哦",
    });
  } else {
    tableData.value = res.data.data;
    count.value = res.data.total;
  }
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
  <Search @input="handleinput" msg="请输入你要查询的用户名">
    <slot v-if="role===0">
      <el-cascader
        v-model="SearchAddress"
        :options="options"
        placeholder="请选择住宅号"
        clearable
      />
    </slot>
  </Search>

  <el-table :data="tableData" style="width: 100%">
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
    <el-table-column label="操作" v-if="userUser.UserInfo.role === 0">
      <template #default="scope">
        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pageInfo ref="page" @pagequery="handlepage" :count="count" />
</template>

<style lang='scss'>
</style>