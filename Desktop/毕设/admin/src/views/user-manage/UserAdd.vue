<script setup >
import pageHeader from "@/components/mainbox/pageHeader.vue";
import { Plus, User, Lock } from "@element-plus/icons-vue";
import {addUser} from '@/api/user-manage'
import cascader from "@/components/cascader/cascader.vue";
// 表单
const ruleForm = ref({
  username: "",
  password: "",
  role: "",
  introduction: "",
  avatar: "",
  file: null,
  address:"",
});
const ruleFormRef = ref();
// 角色
const options = [
  {
    value: "0",
    label: "管理员",
  },
  {
    value: "1",
    label: "编辑",
  },
];
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
  role: [
    {
      required: true,
      message: "请选择角色",
      trigger: "change",
    },
  ],
   address:[
     { required: true, message: "请输入你的住宅号", trigger: "change" },
  ],
  introduction: [
    { required: true, message: "请输入你的个人简介", trigger: "blur" },
  ],
  avatar: [
    {
      required: false,
      message: "请输入上传你的照片",
      trigger: "change",
    },
  ],
});

const handlechange = (file) => {
  ruleForm.value.avatar = URL.createObjectURL(file.raw); //  利用原生的URL创建文件回显
  ruleForm.value.file = file.raw; //把文件保存起来提交给后端用的
  console.log(ruleForm.value)
};
const handleaddress = (value) => {
  ruleForm.value.address = value;
  console.log(ruleForm.value);
};
// 更新提交
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const params = new FormData();
      for (let i in ruleForm.value) {
        params.append(i, ruleForm.value[i]);
      }
      console.log(ruleForm.value)
      const res = await addUser(params)
      console.log(res.data)
      ElMessage({
        message: res.data.msg,
        type: "success",
      });
    } else {
        ElMessage({
        message: '更新失败',
        type: "error",
      });
    }
  });
};
</script>
<template>
  <div>
    <pageHeader />
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
            <el-form-item label="用户名" prop="username">
              <el-input
                :prefix-icon="User"
                v-model="ruleForm.username"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                :prefix-icon="Lock"
                show-password
                v-model="ruleForm.password"
                style="width: 240px"
              />
            </el-form-item>

            <el-form-item label="角色" prop="role">
              <el-select
                v-model="ruleForm.role"
                clearable
                placeholder="请选择身份"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
             <el-form-item label="住宅号" prop="address"> 
              <cascader @address="handleaddress"></cascader>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input
                v-model="ruleForm.introduction"
                maxlength="30"
                style="width:500px"
                placeholder="请输入个人简介"
                show-word-limit
                type="textarea"
              />
            </el-form-item>
            <el-form-item prop="avatar" label="用户头像">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handlechange"
              >
                <img
                  v-if="ruleForm.avatar"
                  :src="ruleForm.avatar"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">添加用户</el-button>
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