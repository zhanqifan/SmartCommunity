<script setup>
import { MoreFilled, Select, Picture } from "@element-plus/icons-vue";
import { RepaitList, upstep, getPageInfo } from "@/api/repair-manage.js";
import { formatTimeMM } from "@/utils/FormatTime";
import { useUser} from "@/stores/user.js";
import Search from "@/components/Search.vue";
import pageInfo from "@/components/PageiNation.vue";
const User = useUser();
const url = ref(""); //缩略图封面
const srcList = ref([]); //图片栏
const repairList = ref([]);
const count = ref(); //总数
const DataValue = ref();
const page = ref();
// 完成工单
const pushstep = (id, state) => {
  ElMessageBox.confirm("是否更新该工单进度?", "提醒", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      state = state + 1;
      await upstep({ id, state });
      getrepairList();
      ElMessage({
        type: "success",
        message: "更新成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });

  console.log(res.data);
};
const typelist = {
  1: "物业简修",
  2: "上门安装",
  3: "入户维修",
  4: "管道疏通",
  5: "其他问题",
};
const btncolor = {
  1: "primary",
  2: "success",
  3: "info",
  4: "warning",
  5: "danger",
};
const btnstep = {
  0: "确认工单",
  1: "提交工单",
  2: "已完成工单",
};
// 住户号矫正
const getaddress = () => {
  repairList.value.forEach(
    (item) =>
      (item.address = `${item.address[0]}号${item.address[1]}单元${item.address[2]}室`)
  );
};
// 获取列表
const getrepairList = async () => {
  const res = await RepaitList(User.UserInfo);
  repairList.value = res.datas;
  count.value = res.total;
  getaddress();
};
onMounted(() => {
  getrepairList();
});
// 分页
const handlepage = async (data) => {
  const res = await getPageInfo({
    ...data,
    ...useUser.UserInfo,
    createtime: DataValue.value,
  });
  repairList.value = res.datas;
  getaddress();
};
// 日期筛选
const handlechange = async () => {
  page.value&&page.value.clearPageInfo(); //回到第一页
  const res = await getPageInfo({ createtime: DataValue.value,...User.UserInfo });
  console.log(res);
  repairList.value = res.datas;
  count.value = res.total;
  getaddress();
};
const getTime = (time) => {
  return formatTimeMM(time);
};
</script>
<template>
  <div class="Container">
    <el-date-picker
      v-model="DataValue"
      @change="handlechange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      placeholder="请输入你要查询的日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    <el-scrollbar v-if="repairList.length > 0" style="height: 700px">
      <div style="display: flex" v-for="item in repairList" :key="item">
        <el-descriptions
          direction="vertical"
          :column="4"
          border
          style="width: 1200px; margin-bottom: 35px"
        >
          <el-descriptions-item label="用户名">{{
            item.username
          }}</el-descriptions-item>
          <el-descriptions-item label="电话号码">{{
            item.mobile
          }}</el-descriptions-item>
          <el-descriptions-item label="住宅号" :span="2">{{
            item.address
          }}</el-descriptions-item>
          <el-descriptions-item label="类型">
            <el-tag size="large" :type="btncolor[item.radio1]">{{
              typelist[item.radio1]
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="问题描述" width="300px">
            {{ item.textarea }}
          </el-descriptions-item>
          <el-descriptions-item label="图片">
            <el-image
              style="width: 100px; height: 100px"
              :src="
                item.url[0] ||
                'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
              "
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="item.url"
              :initial-index="1"
              fit="cover"
            />
          </el-descriptions-item>
        </el-descriptions>
        <el-button
          v-if="User.UserInfo.role === 0"
          :type="btncolor[item.state]"
          :disabled="item.state === 2"
          @click="pushstep(item._id, item.state)"
        >
          {{ btnstep[item.state] }}
        </el-button>
        <el-timeline style="width: 300px">
          <el-timeline-item
            type="primary"
            size="large"
            :hollow="true"
            :timestamp="getTime(item.createtime)"
            placement="top"
          >
            <el-card>
              <h4>报修已提交</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            v-if="item.state === 1 || item.state === 2"
            size="large"
            type="primary"
            :icon="MoreFilled"
            :timestamp="getTime(item.godata)"
            placement="top"
          >
            <el-card>
              <h4>人员处理中</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            v-if="item.state === 2"
            color="#0bbd87"
            size="large"
            :icon="Select"
            :timestamp="getTime(updatetime)"
            placement="top"
          >
            <el-card>
              <h4>处理完成</h4>
              <p>如有问题可与物业联系</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-scrollbar>
    <pageInfo
      v-if="repairList.length > 0"
      ref="page"
      @pagequery="handlepage"
      :count="count"
    />
    <el-empty :image-size="400" v-else />
  </div>
</template>

<style lang='scss' scoped>
.Container {
  height: 100%;
  :deep(.el-descriptions__body) {
    .el-descriptions__table.is-bordered .el-descriptions__cell {
      word-break: break-all; // 让内容超出列宽时自动换行显示
      word-wrap: break-word;
    }
  }
}
</style>