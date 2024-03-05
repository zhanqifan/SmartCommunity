<script setup>
import { useRoute, useRouter } from "vue-router";
import { View } from "@element-plus/icons-vue";
import { formatTime } from "@/utils/FormatTime";
const prop= defineProps({
  newslist:Array
})
const ToDetail = (item) =>{
 router.push(`/newsdetail/${item._id}/${item.category}`)
}
const route =  useRoute();
const router = useRouter();
</script>
<template> 
          <el-row style="display: flex; flex-direction: column">
              <el-col v-for="item in newslist" @click="ToDetail(item)" :key="item">
                <el-card shadow="hover">
                  <div class="card-body">
                    <div class="card-box">
                      <img class="card-img" :src="item.cover" alt="" />
                    </div>
                    <div class="card-text">
                      <p class="p1" style="margin: 0; font-size: 20px;font-weight:600 ">
                        {{ item.title }}
                      </p>
                      <p
                        class="content"
                        style="margin: 0;"
                        v-html="item.content"
                      ></p>
                      <div class="card-text-bottom">
                        <div style="display: flex; align-items: center;color:">
                          <el-avatar :size="20" :src="item.avatar" />{{
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
            </el-row>
</template>

<style lang='scss' scoped>

  .el-card {
    border: none;
    border-bottom: 1px solid var(--el-card-border-color);
    .card-body {
      display: flex;
      align-items: center;
      overflow: hidden;
      .card-box {
        width: 250px;
        height: 150px;
        .card-img {
          width: 250px;
          height: 150px;
        }
      }
      .card-text {
        margin-left: 10px;
        overflow: hidden;
        display: flex;
        height: 150px;
        flex-direction: column;
        justify-content: space-between;
        .p1:hover {
          color: #206be7;
        }
        .card-text-bottom {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #26262699;
          font-size: 12px;
          .bottom-icon {
            display: flex;
            align-items: center;
            span {
              user-select: none;
              display: flex;
              margin-left: 5px;
              align-items: center;
            }
          }
        }
        .content {
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis; //超出为省略号显示
          -webkit-line-clamp: 2; //限制文本显示为2行
          display: -webkit-box; //元素作为弹性盒子显示
          -webkit-box-orient: vertical; //弹性盒子排列方向为垂直
         :v-deep(p){
          margin: 0;
         }
        }
        span {
          color: #26262699;
          font-size: 12px;
        }
      }
    }
    .card-body:hover {
      cursor: pointer;
    }
  }

</style>