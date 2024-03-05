<script setup>
import { resultbill } from "@/api/bill-manage";
import { useRoute } from "vue-router";
const route = useRoute();

onMounted(async () => {
  let data = {
    out_trade_no: route.query.out_trade_no,
    trade_no: route.query.trade_no,
  };
  // console.log(route.fullPath);
  const res = await resultbill(data);
  // console.log(data);
  // console.log(res);
});
</script>
<template>
  <div>
    <el-result
      v-if="true"
      icon="success"
      title="支付成功"
      sub-title="物业祝你: 身体健康 天天开心"
    >
      <template #extra>
        <el-button
          type="primary"
          @click="$router.push('/hydropower')"
          >去查看水电缴费</el-button
        >
        <el-button
          type="primary"
          @click="$router.push('/property')"
          >去查看物业缴费</el-button
        >
      </template>
    </el-result>
    <el-result
      v-else
      icon="失败"
      title="错误提示"
      sub-title="Please follow the instructions"
    >
      <template #extra>
        <el-button type="primary">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang='scss'>
</style>