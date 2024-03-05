<script setup>
import News from "./News.vue";
import { getNewsList, getNewsDetail } from "@/api/news.js";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { formatTime } from "@/utils/FormatTime";
const newslist = ref([]);
const route = useRoute();
const TextContent = ref("");
const ArrPreIndex = ref();
const ArrNexIndex = ref();
const propList = ref();
const router = useRouter();
const getNews = async () => {
  const res = await getNewsList(route.params.category);
  // 筛选出已发布和当前所选分类
  newslist.value = res.data.filter(
    (item) => item.isPublish === 1 
  );
  // 筛选当前所选新闻的数组索引
  let ArrIndex = newslist.value.findIndex(
    (item) => item._id === route.params._id
  );
  // 上一篇索引
  ArrIndex == 0
    ? (ArrPreIndex.value = newslist.value.length - 1)
    : (ArrPreIndex.value = ArrIndex - 1);
  // 下一篇索引
  ArrIndex == newslist.value.length - 1
    ? (ArrNexIndex.value = 0)
    : (ArrNexIndex.value = ArrIndex + 1);
  propList.value = newslist.value.filter(
    (item) => item._id != route.params._id
  );
};
const getDetail = async (id,category) => {
  const res = await getNewsDetail(id ?? route.params._id);
  TextContent.value = res.data[0];
  console.log(TextContent.value);
};
// 页面内信息切换 监听
watch(
  () => route.params._id,
  (newValue) => {
    window.scrollTo({ top: 0 });
    getDetail(newValue);
    getNews();
  }
);

const Article = (id) => {
  router.push(`/newsdetail/${id}`);
};

onMounted(() => {
  Promise.all([getDetail(), getNews()]);
});
</script>
<template>
  <div class="Page">
    <div class="main">
      <h2>{{ TextContent.title }}</h2>
      <div class="container">
        <p class="title_tag">
          <span>{{ TextContent.username }}</span
          ><span>2023-01-04 21:06</span> <span>生活百科</span
          ><span>浏览量 {{ TextContent.views }}</span>
        </p>
        <!-- 主体内容部分 -->
        <p class="text" v-html="TextContent.content"></p>
       
      </div>
    </div>
    <!-- 上一篇下一篇 -->
    <div class="guide">
      <div
        @click="Article(newslist[ArrNexIndex]._id,newslist[ArrNexIndex].category)"
        class="card1"
        :style="{ backgroundImage: `url(${newslist[ArrNexIndex]?.cover})` }"
      >
        <p>{{ newslist[ArrPreIndex]?.title }}</p>
        <div class="bottom">
          <p>上一篇</p>
          <p>2024-01-24 11:38</p>
        </div>
      </div>
      <div
        @click="Article(newslist[ArrNexIndex]._id,newslist[ArrNexIndex]._category)"
        class="card2"
        :style="{ backgroundImage: `url(${newslist[ArrPreIndex]?.cover})` }"
      >
        <p>{{ newslist[ArrNexIndex]?.title }}</p>
        <div class="bottom">
          <p>下一篇</p>
          <p>2024-01-24 11:38</p>
        </div>
      </div>
    </div>
    <!-- 相关推荐 -->
    <div style="margin-top: 20px">
      <News :newslist="propList" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.Page {
  width: 1000px;
  .main {
    background-color: #ffff;
    padding: 20px 20px 0 20px;
    .container {
      .title_tag {
        span {
          margin-right: 10px;
          color: #26262699;
          font-size: 15px;
        }
      }
      .text {
        overflow: hidden;
        :deep(img) {
          max-width: 100%;
          object-fit: fill;
          height: auto;
        }
      }
    }
  }
  .guide {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .card1,
    .card2 {
      position: relative;
      border-radius: 10px;
      width: 45%;
      padding: 3px 10px 3px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        color: white;
        z-index: 1000;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
      }
    }
    .card1::before,
    .card2::before {
      position: absolute;
      border-radius: 10px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      content: "";
    }
    .card1:hover,
    .card2:hover {
      cursor: pointer;
      scale: (1.01);
      transition: all 0.5s;
    }
    //
  }
}
</style>