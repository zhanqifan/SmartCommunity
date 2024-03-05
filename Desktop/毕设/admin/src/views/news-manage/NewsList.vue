<script setup>
import pageHeader from "@/components/mainbox/pageHeader.vue";
import { Edit, Delete, View } from "@element-plus/icons-vue";
import {
  getNewsList,
  controlPublish,
  DeltetNews,
  getPageInfo,
  getSearchList
} from "@/api/news-manage";
import { formatTime } from "../../../utils/FormatTime";
import { useRouter } from "vue-router";
import pageInfo from "@/components/pageInfo/pageInfo.vue";
import Search from "@/components/search/search.vue";
// 公共列表数据
const tableData = ref([]);
const count = ref(); //总条数
const NewsEditrRef = ref();
const Router = useRouter();
const page =ref()
const title = ref()
// 公共列表
const getList = async () => {
  const res = await getNewsList();
  console.log(res.data);
  tableData.value = res.data.data;
  count.value = res.data.total;
};
const tagList = (i) => {
  const list = {
    1: "最新动态",
    2: "生活百科",
    3: "通知公共",
  };
  return list[i];
};
// 时间校正
const getTime = (time) => {
  return formatTime(time);
};
// 控制是否发布
const handlieSwitch = async (row) => {
  // 新闻发布请求
  const res = await controlPublish(row);
  console.log(res.data);
};
// 修改公共
const EditNews = (row) => {
  Router.push(`/news-manage/addnews/${row._id}`);
};
const delNews = async (index, row) => {
  await DeltetNews(row._id);
  tableData.value.splice(index, 1);
  ElMessage({
    message: "删除成功",
    type: "success",
  });
};
// 分页处理
const handlepage = async (data) => {
  // 还剩一个问题 分页要默认传个值过来
  const res = await getPageInfo({...data,title:title.value});
  tableData.value = res.data.data;
  count.value = res.data.total;
};
const handleinput = async(value) =>{
  page.value.clearPageInfo()
    title.value=value
    const res =await getSearchList(value)
    tableData.value= res.data.data
    count.value=res.data.total
}
// 新闻列表
onMounted(() => {
  getList();
});
</script>
<template>
  <div>
    <pageHeader />
    <Search @input="handleinput" msg="请输入你要查询的标题" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180" align="center" />
      <el-table-column prop="category" label="分类" width="180" align="center">
        <template #default="scope">
          <el-tag
            :type="
              scope.row.category === 1
                ? 'success'
                : scope.row.category === 2
                ? ''
                : 'danger'
            "
            >{{ tagList(scope.row.category) }}</el-tag
          >
        </template>
      </el-table-column>
       <el-table-column prop="views" label="浏览量" align="center"/>
      <el-table-column prop="editTime" label="更新时间" align="center">
        <template #default="scope">
          {{ getTime(scope.row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否发布" align="center">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isPublish"
            inline-prompt
            @change="handlieSwitch(scope.row)"
            active-text="是"
            :active-value="1"
            :inactive-value="0"
            inactive-text="否"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            @click="EditNews(scope.row)"
            circle
          />
          <el-button
            type="danger"
            :icon="Delete"
            @click="delNews(scope.$index, scope.row)"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
    <pageInfo ref="page" @pagequery="handlepage" :count="count" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.cell:nth-child(1)){
            overflow: hidden;
            text-overflow: ellipsis;//超出为省略号显示
            -webkit-line-clamp:2;//限制文本显示为2行
            display: -webkit-box;//元素作为弹性盒子显示
            -webkit-box-orient: vertical;//弹性盒子排列方向为垂直

}
</style>