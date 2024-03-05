<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { postLogin, RegisterApi } from "@/api/login";
import { useUserStore } from "../stores/index";
import cascader from "@/components/cascader/cascader.vue";
import { User, Lock } from "@element-plus/icons-vue";
const loginFormRef = ref();
//表单引用对象
const isRegister = ref(false);
const loginForm = ref({
  //表单绑定的响应式对象
  username: "",
  password: "",
  repassword: "",
  address:[]
});
const useUser = useUserStore();
const router = useRouter();
const rules = reactive({
  username: [
    //input内调用对象
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "用户名必须是5-10位字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15位的非空字符",
      trigger: "blur",
    },
  ],
  repassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15位的非空字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        // 判断value 和当前 form 中收集的password 是否一致
        if (value !== loginForm.value.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback(); //就算校验成功,也需要callback
        }
      },
      trigger: "blur",
    },
  ],
  address:[
     { required: true, message: "请输入住宅号", trigger: "change" },
  ]
});
// 切换的时候,重置表单内容
watch(isRegister, () => {
  loginForm.value = {
    username: "",
    password: "",
    repassword: "",
  };
});
// 提交登录表单
const submitForm = (loginFormRef) => {
  //   校验 表单
  if (!loginFormRef) return;
  loginFormRef.validate(async (valid) => {
    if (valid) {
      const res = await postLogin(loginForm.value);
      console.log(res.data.ActionType);
      if (res.data.code == "200") {
        console.log(res.data.data);
        ElMessage({
          type: "success",
          message: "登录成功",
        });
        useUser.changeUserInfo(res.data.data); // 存登录数据
        useUser.changeGetterRouter(false);
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
const register =  (loginFormRef) => {
  // 注册成功之前,先进行校验,校验成功-> 请求 , 校验失败 ->自动提示
  loginFormRef.validate(async(valid) => {
    if (valid) {
      const res =await RegisterApi(loginForm.value)
      console.log(res.data)
      ElMessage.success("注册成功");
      isRegister.value = false;
    }
    else{
      ElMessage.error('信息有误');
    }
  });

  // console.log('开始注册请求')
};
const handleaddress = (address) =>{
 loginForm.value.address=address
}
</script>

<template>
  <div class="login">
    <el-row class="login-page">
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="6" :offset="3" class="form">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
          size="large"
          autocomplete="off"
          v-if="isRegister"
        >
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              v-model="loginForm.repassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="address">
             <cascader @address="handleaddress"></cascader>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="register(loginFormRef)"
              class="button"
              type="primary"
              auto-insert-space
            >
              注册
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false">
              ← 返回
            </el-link>
          </el-form-item>
        </el-form>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          size="large"
          autocomplete="off"
          v-else
        >
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              @keydown.enter="submitForm(loginFormRef)"
            ></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              class="button"
              @click="submitForm(loginFormRef)"
              type="primary"
              auto-insert-space
              >登录</el-button
            >
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true">
              注册 →
            </el-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url("@/assets/image/login_cover.png") no-repeat 50% center /
        240px auto,
      url("@/assets/image/login_bg.jpg") no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
