<script setup>
import { useUser } from "@/stores/user.js";
import { UserFilled } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import HomeDialog from '@/views/Home/component/HomeDialog.vue'
const User = useUser();
const HomeRef = ref()
const router = useRouter();
const route = useRoute();
const gologin = () => {
  router.push("/login");
};
// 控制个人中心
const handleCenter = () => {
     HomeRef.value.open()
};
// 退出登录
const ExitLogin = () => {
  localStorage.removeItem("token");
  User.clearUserInfo();
  router.push("/login");
};
const Toadmin = () => {
  window.open("http://127.0.0.1:5174/center");
};
</script>
<template>
  <div>
    <el-menu
      :default-active="route.path"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      :ellipsis="false"
    >
      <img
        style="width: 60px; padding-right: 10px"
        src="@/assets/logo-footer.png"
        alt="Element logo"
      />
      <div class="flex-grow" />
      <el-menu-item index="/index"> 首页 </el-menu-item>
        <el-sub-menu index="/news">
        <template #title>社区公告</template>
     <el-menu-item index="/current">最新动态</el-menu-item>
      <el-menu-item index="/typical">生活百科</el-menu-item>
      <el-menu-item index="/public">通知公共</el-menu-item>
      </el-sub-menu>
    
      <el-sub-menu index="1">
        <template #title>公共信息</template>
        <el-menu-item index="/usersearch">用户查询</el-menu-item>
        <el-menu-item index="/publicfac">公共设施查询</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>缴纳费用</template>
        <el-menu-item index="/property">水电缴纳</el-menu-item>
        <el-menu-item index="/hydropower">物业费缴纳</el-menu-item>
      </el-sub-menu>
        <el-sub-menu index="3">
        <template #title>居民意见反馈</template>
        <el-menu-item index="/AddAdvice">添加反馈</el-menu-item>
        <el-menu-item index="/AdviceList">反馈列表</el-menu-item>
      </el-sub-menu>
        <el-sub-menu index="4">
        <template #title>报修管理</template>
        <el-menu-item index="/addrepair">我要报修</el-menu-item>
        <el-menu-item index="/repairlist">报修状态</el-menu-item>
      </el-sub-menu>
      <el-menu-item style="margin-left: 300px">
        <div v-if="User.UserInfo">
          <el-dropdown trigger="hover">
            <el-avatar
              :size="50"
              :src="User.UserInfo.avatar"
              style="margin-right: 2px"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleCenter"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item @click="ExitLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span style="font-size: 18px">{{ User.UserInfo.username }}</span>
        </div>
        <div v-else @click="gologin">
          <el-icon><UserFilled /></el-icon>
          <span> 登录|注册</span>
        </div>
      </el-menu-item>
    </el-menu>
    <HomeDialog ref="HomeRef"/>
  </div>
</template>

<style lang='scss' scoped>
.el-menu {
  display: flex;
  justify-content: center;
}
.el-avatar {
  outline: none;
}
</style>