<script setup>
import pageHeader from "@/components/mainbox/pageHeader.vue";
import { Plus, User, Lock } from "@element-plus/icons-vue";
import { addUser } from "@/api/user-manage";
import cascader from "@/components/cascader/cascader.vue";
import { addbill } from "@/api/product-manage";
import { useRouter } from "vue-router";
const router = useRouter()
// 表单
const ruleForm = ref({
  address: "", //住宅号
  publiclift: "", //电费 公共电梯费
  publicwater: "", //水费 公共水费
  publicelectric: "", //公共电费
  radio: 1, //类型 1水电费 2物业费
  propertyfees: "", //物业费
  billdata: "", //生成日期
});
const ruleFormRef = ref();

const rules = reactive({
  address: [{ required: true, message: "请输入你的住宅号", trigger: "change" }],
  publiclift: [
    { required: true, message: "输入不为空", trigger: "blur" },
    { type: "number", message: "输入必须为纯数字" },
  ],
  publicwater: [
    { required: true, message: "输入不为空", trigger: "blur" },
    { type: "number", message: "输入必须为纯数字" },
  ],
  publicelectric: [
    { required: true, message: "输入不为空", trigger: "blur" },
    { type: "number", message: "输入必须为纯数字" },
  ],
  radio: [{ required: true, message: "请输入缴费项目", trigger: "blur" }],
  propertyfees: [
    { required: true, message: "输入不为空", trigger: "blur" },
    { type: "number", message: "输入必须为纯数字" },
  ],
  billdata: [{ required: true, message: "请输入日期", trigger: "change" }],
});

// 子组件住宅号传过来
const handleaddress = (value) => {
  ruleForm.value.address = value;
};
// 更新提交
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await addbill(ruleForm.value);
      console.log(res.data);
       ElMessage({
        message: '添加账单成功',
        type: "success",
      });
      ruleForm.value.radio===1?router.push('/product-manage/hydropower'):router.push('/product-manage/socialcost')
    } else {
      console.log(valid)
      ElMessage({
        message: "更新失败",
        type: "error",
      });
    }
  });
};
</script>
<template>
  <div>
    <el-row justify="center">
      <el-col :span="20" style="margin-left: 30px">
        <el-card class="box-card">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="住宅号" prop="address">
              <cascader @address="handleaddress"></cascader>
            </el-form-item>
            <el-form-item
              :label="ruleForm.radio === 1 ? '住户水表' : '公共电梯电表'"
              prop="publiclift"
              style="width: 333px"
            >
              <el-input
                v-model.number="ruleForm.publiclift"
                placeholder="请输入用量"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="ruleForm.radio === 1 ? '住户电费表' : '公共水表'"
              prop="publicwater"
              style="width: 333px"
            >
              <el-input
                v-model.number="ruleForm.publicwater"
                placeholder="请输入用量"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="ruleForm.radio === 2"
              label="公共电表"
              prop="publicelectric"
              style="width: 333px"
            >
              <el-input
                v-model.number="ruleForm.publicelectric"
                placeholder="请输入用量"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="物业费"
              v-if="ruleForm.radio === 2"
              prop="propertyfees"
              style="width: 333px"
            >
              <el-input
                v-model.number="ruleForm.propertyfees"
                placeholder="请输入费用"
              ></el-input>
            </el-form-item>
            <el-form-item label="缴费项目" prop="radio">
              <el-radio-group v-model="ruleForm.radio">
                <el-radio :label="1">水电缴费</el-radio>
                <el-radio :label="2">物业费</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生成日期" prop="billdata">
              <el-date-picker
                v-model="ruleForm.billdata"
                type="month"
                placeholder="请输入的日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">添加账单</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
:deep(.avatar-uploader .avatar) {
  width: 200px;
  height: 200px;
  display: block;
}
</style>