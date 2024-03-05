<script setup>
import agree from "@/assets/agree.vue";
import good from "@/assets/good.vue";
import News from "../News/component/News.vue";
import { onMounted, reactive } from "vue";
import { getHotNews, getNewsList} from "@/api/news.js";
import { View } from "@element-plus/icons-vue";
import { formatTime } from "@/utils/FormatTime";
import HomeDialog from '@/views/Home/component/HomeDialog.vue'
import { useRouter } from "vue-router";
const activeName = ref(1);
const newslist = ref([]); //新闻列表
const allnews = ref([]);
const agreeRefs = ref([]); //收藏
const goodRefs = ref([]); //点赞
const hotNews = ref([])
// 轮播图
const urls = ref([
]);
const router =  useRouter()
const getNews = async () => {
  const res = await getNewsList({category:1});
  allnews.value = res.data.filter((item) => item.isPublish === 1);
  urls.value = allnews.value
  urls.value.sort((a,b)=>a.editTime-b.editTime)
  console.log(urls.value)
};
const tabs = [
  {
    value: 1,
    label: "最新动态",
  },
  {
    value: 2,
    label: "生活百科",
  },
  {
    value: 3,
    label: "通知公共",
  },
];
const handleClick = async(tab) => {
  const res = await getNewsList({category:tab});
  allnews.value=  res.data.filter((item) => item.isPublish === 1);
};
const HotNews = async() =>{
  const res =await getHotNews()
   hotNews.value = res.data
}
const ToDetail = async(id) =>{
    router.push(`/newsdetail/${id}`) 
}
onMounted(() => {
  getNews();
  HotNews()
});
</script>
<template>
  <div class="container">
    <div class="left-container">
      <!-- 轮播图 -->
      <el-carousel
        indicator-position="none"
        style="height: 320px; width: 865px"
      >
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
      <div class="Channel-list">
        <!-- tab栏 -->
        <el-tabs
          style="padding-left: 20px"
          v-model="activeName"
          class="demo-tabs"
          @tab-change="handleClick"
        >
          <el-tab-pane
            v-for="item in tabs"
            :key="item"
            :label="item.label"
            :name="item.value"
          >
            <!-- 卡片内容 -->
            <!-- <el-row style="display: flex; flex-direction: column">
              <el-col v-for="(item, index) in newslist" :key="item">
                <el-card shadow="hover">
                  <div class="card-body">
                    <div class="card-box">
                      <img class="card-img" :src="item.cover" alt="" />
                    </div>
                    <div class="card-text">
                      <p class="p1" style="margin: 0; font-size: 20px;">
                        {{ item.title }}
                      </p>
                      <p
                        class="content"
                        style="margin: 0"
                        v-html="item.content"
                      ></p>
                      <div class="card-text-bottom">
                        <div style="display: flex; align-items: center">
                          <el-avatar :size="23" :src="item.avatar" />{{
                            item.username
                          }}
                          &nbsp {{ formatTime(item.editTime) }}
                        </div>
                        <div class="bottom-icon">
                          <span
                            ><el-icon size="16"><View /></el-icon
                            >{{ item.views }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>

              <el-col style="display: flex; justify-content: center">
                <el-button>点击加载更多</el-button>
              </el-col>
            </el-row> -->
            <News :newslist="allnews" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="right-container">
      <img
        width="350px"
        height="200px"
        style="border-radius: 5px"
        src="@/assets/u=3972849374,3250110595&fm=253&fmt=auto&app=138&f=JPEG.webp"
        alt=""
      />
      <ul class="list">
        <li>热门阅读</li>
        <li class="HotNews" @click="ToDetail(item._id)" v-for="item in hotNews" :key="item">
         {{item.title}} - {{item.views}} 浏览量
        </li>
      </ul>
      <!-- <div class="comment">
        <p class="first_comment">最新评论</p>
        <el-card shadow="hover" v-for="item in 9" :key="item">
          <div class="user">
            <span
              ><el-avatar
                :size="20"
                :src="circleUrl"
                style="margin-right: 2px"
              />shineshi </span
            ><span>2024-01-28</span>
          </div>
          <div class="title">
            <p>竞争激烈,都想抢占社区团购市场</p>
          </div>
          <p class="comment_to">
            评论于<span>&nbsp入局社区团购:百果园的"豪赌"</span>
          </p>
        </el-card>
      </div> -->
    </div>
    <!-- <HomeDialog/> -->
  </div>
</template>

<style lang='scss' scoped>
.container {
  display: flex;
  justify-content: space-around;
  
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
  .Channel-list {
    background-color: white;
    padding: 5px 10px 0 10px;
    width: 845px;
  }

  :deep(.el-image__inner) {
    border-radius: 10px;
  }
  .right-container {
    margin-left: 20px;
    position: relative;
    .list {
      width: 310px;
      padding-right: 5px;
      border-radius: 5px;
      padding-bottom: 10px;
      background-color: white;
      li:nth-child(1) {
        font-size: 20px;
        color: #525252;
        font-weight: 900;
        list-style-image: url("@/assets/新闻 (1).png");
        background: none;
      }
      li {
        white-space: normal;
        padding-right: 5px;
        position: relative;
        margin-bottom: 20px;
        font-size: 14px;
        color: #262626;
        list-style: none; // 移除默认的列表样式
        padding: 0 20px 0 20px; // 根据需要调整，为背景图像留出空间
        background-image: url("@/assets/caret-right.png");
        background-repeat: no-repeat;
        background-position: 0 center; // 调整这里来改变图标的位置
        background-size: 14px 14px; // 可以调整图标的大小
      }
      li:hover{
        cursor: pointer;
        color: #206be7;
      }
    }
    .comment {
      background-color: #ffffff;
      .first_comment {
        padding: 10px 10px 0 15px;
        position: relative;
      }
      .first_comment::before {
        position: absolute;
        left: 10px;
        top: 13px;
        width: 3px;
        height: 60%;
        content: "";
        background-color: #206be7;
        background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.15),
          transparent
        );
      }
      .el-card {
        border: none;
        border-bottom: 1px solid var(--el-card-border-color);
        .user {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            display: flex;
            font-size: 14px;
          }
        }
        .title {
          background-color: #f7f7f7;
          line-height: 42px;
          font-size: 14px;
          color: #262626cc;
          position: relative;
          ::before {
            position: absolute;
            left: 5px;
            top: -10px;
            content: "";
            width: 0;
            height: 0;
            line-height: 0;
            border: 5px solid transparent;
            border-bottom: 5px solid #f7f7f7;
          }
          p {
            padding-left: 10px;
          }
        }
        .comment_to {
          font-size: 14px;
          color: #868585;
          span {
            color: #262626;
          }
        }
      }
    }
  }
}
</style>