<script setup>
import { Money } from "@element-plus/icons-vue";
import { findbill } from "@/api/product-manage";
import { formatTime } from "../../../utils/FormatTime";
import { paybill, filterbill } from "@/api/product-manage";
import { useUserStore } from "@/stores";
import pageInfo from "@/components/pageInfo/pageInfo.vue";
const DataValue = ref();
const tableData = ref([]);
const Addressfilter = ref([]);
const useUser = useUserStore();
const count = ref(); //总数
const search = ref(); //搜索信息
const Pagefun = ref(); //绑定分页组件
const SumFree = (row) => {
  return row.publiclift * 0.5 + row.publicwater * 2.9;
};

// 筛选缴纳状态
const filterTag = (value, row) => {
  return row.state === value;
};

// 去缴费
const pay = (row) => {
  ElMessageBox.confirm("确定缴纳水电?", "提醒", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const cost = SumFree(row);
      const res = await paybill({ _id: row._id, cost, name: "福州市水电局" });
      window.location = res.data.result;
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
};
// 查询账单列表
const getBill = async () => {
  const res = await findbill({ ...useUser.UserInfo, radio: 1 });
  tableData.value = res.data.data;
  count.value = res.data.total;
  formatterTableDate();
};
// 矫正格式
const formatterTableDate = () => {
  tableData.value.forEach(
    (item) =>
      (item.address = `${item.address[0]}号${item.address[1]}单元${item.address[2]}室`)
  );
  tableData.value.map((item) => {
    Addressfilter.value.push({
      text: item.address,
      value: item.address,
    });
  });
};
// 筛选日期
const handlechange = async (val) => {
  //搜索时候页码归默认
  Pagefun.value.clearPageInfo();
  const res = await filterbill({ billdata: val, radio: 1,...useUser.UserInfo });
  search.value = val; //搜索信息保留 给分页
  tableData.value = res.data.data;
  count.value = res.data.total;
  formatterTableDate();
};
// 矫正日期
const getTime = (time) => {
  return formatTime(time);
};
// 住户矫正
const getaddress = (address) => {
  return (address = `${address[0]}号${address[1]}单元${address[2]}室`);
};
// 搜索分页
const handlepage = async (data) => {
  const res = await findbill({
    ...useUser.UserInfo,
    ...data,
    radio: 1,
    billdata: search.value,
  });
  tableData.value = res.data.data;
  count.value = res.data.total;
  formatterTableDate();
};

onMounted(() => {
  getBill();
});
</script>
<template>
 <h1 v-if="useUser.UserInfo.role === 1">住户号:{{getaddress(useUser.UserInfo.address)}}</h1>
  <br />
  <div class="datemonth">
    <el-date-picker
      v-model="DataValue"
      @change="handlechange"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      placeholder="请输入你要查询的日期"
      format="YYYY-MM"
      value-format="YYYY-MM"
    />
  </div>
  <el-table :data="tableData" style="width: 100% height= '600'">
    <el-table-column fixed prop="date" label="账单月份">
      <template #default="scope">
        {{ getTime(scope.row.billdata) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      v-if="useUser.UserInfo.role === 0"
      label="住户号"
    >
    </el-table-column>
    <el-table-column prop="publiclift" label="电表(0.5元/度)">
      <template #default="scope">
        {{ scope.row.publiclift.toFixed(2) }}度
      </template>
    </el-table-column>

    <el-table-column prop="publicwater" label="水表(2.8元/吨)">
      <template #default="scope">
        {{ scope.row.publicwater.toFixed(2) }}吨
      </template>
    </el-table-column>
    <el-table-column
      prop="state"
      label="是否已缴纳"
      :filters="[
        { text: '已缴纳', value: '1' },
        { text: '未缴纳', value: '0' },
      ]"
      :filter-method="filterTag"
    >
      <template #default="scope">
        <el-tag :type="scope.row.state === '1' ? '' : 'success'">{{
          scope.row.state === "1" ? "已缴纳" : "未缴纳"
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="合计费用">
      <template #default="scope">
        {{ SumFree(scope.row).toFixed(2) }}元
      </template>
    </el-table-column>

    <el-table-column prop="address" label="操作">
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Money"
          @click="pay(scope.row)"
          circle
        />
      </template>
    </el-table-column>
  </el-table>
  <pageInfo @pagequery="handlepage" ref="Pagefun" :count="count" />
</template>

<style lang='scss'>
.datemonth {
  float: right;
}
</style>