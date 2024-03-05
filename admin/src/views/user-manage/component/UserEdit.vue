<script setup>
import { ref } from "vue";
import { upUser, delUser } from "@/api/user-manage";
import { useUserStore } from "@/stores";
import cascader from "@/components/cascader/cascader.vue";
const ruleFormRef = ref();
const useUser = useUserStore();
const ruleForm = ref({});
const drawer = ref(false);
const cascaderRef = ref()
const emit = defineEmits(["success"]); //通知父组件更新
const options = [
  {
    value: 0,
    label: "管理员",
  },
  {
    value: 1,
    label: "编辑",
  },
];
// 校验规则
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
   address:[
     { required: true, message: "请输入你的住宅号", trigger: "change" },
  ],
  role: [
    {
      required: true,
      message: "请选择角色",
      trigger: "change",
    },
  ],
  introduction: [
    { required: true, message: "请输入你的个人简介", trigger: "blur" },
  ],
});

const open = (row) => {
  drawer.value = true;
  ruleForm.value = JSON.parse(JSON.stringify(row));
   nextTick(() => {  // 在组件初始化完之后执行这个回调
    cascaderRef.value.editorUser(ruleForm.value.address); // 确保 cascader 组件已经更新
  });
};
const  handleaddress =(value)=>{
     ruleForm.value.address =value
}
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upUser(ruleForm.value);
      if (res.data.data._id == useUser.UserInfo._id) { //信息与登录账号是否一致 pinia信息直接更改
        useUser.changeUserInfo(res.data.data); //更新pinia
      }
      emit("success"); //通知父组件更新
      drawer.value = false;
      ElMessage({
        message: "修改成功",
        type: "success",
      });
    }
  });
};
defineExpose({
  open,
});
</script>

<template>
  <el-drawer v-model="drawer" title="编辑用户">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-position="left"
      class="demo-ruleForm"
      label-width="80px"
      style="max-width: 400px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="ruleForm.role" clearable placeholder="请选择身份">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    <el-form-item label="住宅号" prop="address"> 
              <cascader ref="cascaderRef"  @address="handleaddress"></cascader>
            </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input
          v-model="ruleForm.introduction"
          maxlength="30"
          placeholder="请输入个人简介"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">修改</el-button>
        <el-button @click="drawer = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
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