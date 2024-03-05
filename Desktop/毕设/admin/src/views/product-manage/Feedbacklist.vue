<script setup>
import { ComplainList,delMessage } from "@/api/product-manage";
import { useUserStore } from "@/stores";
import { formatTime } from "../../../utils/FormatTime";
import MessageList from './component/MessageList.vue'
import PageInfo from '@/components/pageInfo/pageInfo.vue'
const tableData = ref([]);
const MsgRef =ref()
const useUser= useUserStore()
const count = ref()
// 查看回复
const handleEdit = (row) => {
   MsgRef.value.open(row.comments,row._id)
};
// 删除
const handleDelete = async(index, row) => {
  await delMessage(row._id)
  tableData.value.splice(index,1)
  ElMessage({
    type:'success',
    message:'删除成功'
  })
  GetList()
};
// 获取列表
const GetList = async () => {
  const data = useUser.UserInfo.role==1?{userId:useUser.UserInfo._id}:{}
  const res = await ComplainList(data);
  tableData.value = res.data.data;
  count.value = res.data.total
  console.log(res.data)
};
const type = {
  1: "意见建议",
  2: "服务评价",
  3: "其他反馈",
};
const handlepage =async(page) =>{
   const data = useUser.UserInfo.role==1?{userId:useUser.UserInfo._id,...page}:page
     const res =await ComplainList(data)
     console.log(res.data.data)
     tableData.value = res.data.data
     count.value = res.data.total

}
const handleMsg = () =>{
    GetList()//更新页面信息
}
onMounted(() => {
  GetList();
});
</script>
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="住户名" prop="userId.username" />
      <el-table-column label="意见类型">
        <template #default="scope">
          {{ type[scope.row.radio] }}
        </template>
      </el-table-column>
      <el-table-column label="反馈内容">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="日期">
        <template #default="scope">
          {{ formatTime(scope.data) }}
        </template>
      </el-table-column>
      <el-table-column label="反馈图片">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image
            :preview-src-list="scope.row.url"
            :preview-teleported="true"
            :src="
              scope.row.url[0] ||
              'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
            "
            style="width: 50px; height: 50px"
          />
        </div>
      </template>
    </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >查看</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <PageInfo @pagequery="handlepage" :count="count"/>
    <MessageList @PropMsg="handleMsg" ref="MsgRef"/>
  </div>
</template>

