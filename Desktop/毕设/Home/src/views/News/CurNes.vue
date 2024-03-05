<script setup>
import News from "@/views/News/component/News.vue";
import { useRoute } from "vue-router";
import { getNewsList } from "@/api/news.js";
import { onMounted } from "vue";
import PageiNation from '@/components/PageiNation.vue'
import Search from "@/components/Search.vue";
const route = useRoute();
const newslist = ref();
const count = ref()
const page =ref()
const title = ref()
const getNews = async (data) => {
  console.log(data)
  const res = await getNewsList({category:1,...data});
  console.log(res);
  newslist.value = res.data.filter(
    (item) => item.isPublish === 1 && item.category === 1
  );
  count.value = res.total
};
const handlepage = async(data) =>{
    getNews({...data,title:title.value})
}
const handleinput = async(value) =>{
  page.value.clearPageInfo()
   title.value=value
    getNews({title:title.value})
}
onMounted(() => {
  getNews();
});
</script>
<template>
  <div class="main">
    <div class="title" >
    <h3 style="padding-left:20px">{{ route.name }}</h3>
     <Search @input="handleinput" msg="请输入你要查询的标题" />
     </div>
    <News :newslist="newslist" />
     <PageiNation ref="page" @pagequery="handlepage" :count="count"/>
  </div>
</template>

<style lang='scss' scoped>
.main {
    background-color: #FFFFFF;
    width: 1100px;
    .title{
      display: flex;
      justify-content: space-between;
      :deep(.search-input){
            display: flex;
        align-items: center;
      }
      :deep(.el-input__wrapper){
        height: 30px;
      }
    }
}
</style>