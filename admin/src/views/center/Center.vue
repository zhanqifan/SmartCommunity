<script setup >
import pageHeader from "../../components/mainbox/pageHeader.vue";
import { computed } from "vue";
import { useUserStore } from "@/stores";
import { Plus, User } from "@element-plus/icons-vue";
import { postUserForm } from "@/api/center";
import { ElMessage } from "element-plus";
import cascader from "@/components/cascader/cascader.vue";
const useUser = useUserStore();
const ruleFormRef = ref();

// 计算是否上传头像
const avatarUrl = computed(() => {
  return useUser.UserInfo.avatar
    ? useUser.UserInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
// 表单
const ruleForm = ref({
  username: "",
  gender: "1",
  introduction: "",
  avatar: "",
  file: null,
  address: "",
});
// 性别
const options = [
  {
    value: "0",
    label: "保密",
  },
  {
    value: "1",
    label: "男",
  },
  {
    value: "2",
    label: "女",
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
  gender: [
    {
      required: true,
      message: "请输入性别",
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
// 处理上传回调
const handlechange = (file) => {
  //  利用原生的URL创建文件回显
  ruleForm.value.avatar = URL.createObjectURL(file.raw);
  ruleForm.value.file = file.raw; //把文件保存起来提交给后端用的
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
      const res = await postUserForm(params);
      console.log(res.data);
      ElMessage({
        message: res.data.msg,
        type: "success",
      });
      useUser.changeUserInfo(res.data.data);
    } else {
      ElMessage({
        message: "更新失败",
        type: "error",
      });
    }
  });
};
const handleaddress = (value) => {
  ruleForm.value.address = value;
  console.log(ruleForm.value);
};
onMounted(() => {
  ruleForm.value = JSON.parse(JSON.stringify(useUser.UserInfo)); //利用深拷贝 为了不影响pinia里数据
  console.log(ruleForm.value)
});
</script>
<template>
  <div>
    <pageHeader />
    <el-row>
      <el-col :span="4">
        <el-card class="box-card1" shadow="always">
          <el-avatar :size="100" :src="avatarUrl" />
          <p>{{ useUser.UserInfo.username }}</p>
          <h3>{{ useUser.UserInfo.role===0 ? "管理员" : "用户" }}</h3>
        </el-card>
      </el-col>

      <el-col :span="19" style="margin-left: 30px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
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
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="ruleForm.gender"
                clearable
                placeholder="请选择性别"
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
              <el-button type="primary" @click="submitForm()">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.box-card1 {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  p,
  h3 {
    display: flex;
    justify-content: center;
  }
}
.disabledImg {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
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