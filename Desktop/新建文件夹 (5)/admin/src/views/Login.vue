<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { postLogin } from "@/api/login";
import {useUserStore} from '../stores/index'
const loginFormRef = ref(); //表单引用对象
const loginForm = reactive({
  //表单绑定的响应式对象
  username: "",
  password: "",
});
const useUser = useUserStore()
const router = useRouter();
const rules = reactive({
  username: [{ required: true, message: "不能为空", trigger: "blur" }],
  password: [{ required: true, message: "不能为空", trigger: "blur" }],
});

// 提交表单函数
const submitForm = (loginFormRef) => {
  //   校验 表单
  if (!loginFormRef) return;
  loginFormRef.validate(async (valid) => {
    if (valid) {
      const res = await postLogin(loginForm);
      console.log(res.data.ActionType);
      if (res.data.ActionType == 'OK') {
        console.log(res.data.data)
        ElMessage({
          type:'success',
          message:'登录成功'
        })
        useUser.changeUserInfo(res.data.data)
        router.push("/index");
      } else {
        ElMessage.error(res.data.error);
      }
    } else {
      console.log("校验失败");
      return false;
    }
  });
};
</script>

<template>
  <div class="login">
    <p>企业门户网站管理系统</p><br>
    <div class="formContainer">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
        
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 900px;
   p{
    margin-top: 100px;
   }
  .formContainer {
    width: 500px;
  }
}
</style>
