<script setup>
import { useUserStore } from "@/stores";
import { Menu, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const useUser = useUserStore();
const Router = useRouter()
// 控制侧边栏隐藏和展开
const handleCollapsed = () => {
  useUser.handleisCollapsed();
};
// 控制个人中心
const handleCenter =(val)=>{
  Router.push('/center')
}
// 控制退出登录
const ExitLogin = ()=>{
  // 清除token
  localStorage.removeItem('token')
  useUser.clearUserInfo()
  Router.push('/login')
}

</script>
<template>
  <div>
    <el-header>
      <div class="left">
        <el-icon @click="handleCollapsed" class="point" ><Menu /></el-icon>
        <span style="margin-left: 15px">智慧社区管理系统</span>
      </div>
      <div class="right">
        <span>欢迎{{useUser.UserInfo.username}}用户</span>
        <el-dropdown>
          <el-icon :size="30" class="point" color="white"><User /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click="ExitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<style lang='scss' scoped>
:deep(.el-header) {
  width: 100%;
  height: 60px;
  color: white;
  background-color:#304156;
  display: flex;
  justify-content: space-between;
  .el-icon {
    // 移除鼠标悬停时的边框
    // border: none;
    outline: none;
    &.point:hover{
      cursor: pointer;
      scale: (1.5);
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>