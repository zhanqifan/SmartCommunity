<script setup >
import pageHeaderVue from "../../components/mainbox/pageHeader.vue";
import { computed } from "vue";
import { useUserStore } from "@/stores";
  const useUser = useUserStore()
const avatarUrl = computed(() => {
 return useUser.UserInfo.avatar?useUser.UserInfo.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
});


</script>
<template>
  <div>
    <pageHeaderVue />

    <el-card class="box-card" shadow="always">
      <el-row>
        <el-col :span="4" :offset="3">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="12">
          <h3 style="line-height:100px">欢迎回来{{useUser.UserInfo.username}} 回来,喝杯咖啡提提升</h3>
           </el-col>
      </el-row>
    </el-card>

     <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.box-card{
  margin-bottom:50px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>