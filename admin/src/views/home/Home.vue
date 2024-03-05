<script setup >
import pageHeaderVue from "../../components/mainbox/pageHeader.vue";
import { computed } from "vue";
import { useUserStore } from "@/stores";
import { getNewsList } from "@/api/news-manage";
const useUser = useUserStore();
const avatarUrl = computed(() => {
  return useUser.UserInfo.avatar
    ? useUser.UserInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
// 轮播图
const urls = ref([]);
const allnews = ref([]);
const getNews = async () => {
  const res = await getNewsList();
  console.log(res.data.data)
  allnews.value = res.data.data.filter((item) => item.isPublish === 1);
  urls.value = allnews.value
  urls.value.sort((a,b)=>a.editTime-b.editTime)
  console.log(urls.value)
};
onMounted(() => {
  getNews();
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
          <h3 style="line-height: 100px">
            欢迎回来{{ useUser.UserInfo.username }} 回来,喝杯咖啡提提升
          </h3>
        </el-col>
      </el-row>
    </el-card>

    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in urls.slice(0,3)" :key="item">
         <el-image
            style="height: 320px; width: 865px"
            :src="item.cover"
            fit="fill"
          />
           <div class="carousel-overlay">
        {{ item.title }}
      </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.box-card {
  margin-bottom: 50px;
}
  .carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  color: #fff;
  font-size: 18px;
  padding:0 0px 60px 20px;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.3); /* 轻微的暗色背景提高文字可读性 */
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