<script setup>
import { useUserStore } from "@/stores";
import { PostMessage } from "@/api/product-manage";
const dialogVisible = ref(false);
const emit = defineEmits(["PropMsg"]);
const handleClose = (done) => {
  ElMessageBox.confirm("确定关闭对话框吗?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const scrollbarRef = ref(); // 滚动条实例
const innerRef = ref(); // 计数器内部实例
const messages = ref([]);
const useUser = useUserStore();
const isCurrentUser = (userId) => {
  return userId === useUser.UserInfo._id;
};
const SendMessage = reactive({
  textarea: "", //发送信息文本
  userId: "", //反馈集合关联的用户 用于查找是哪一天反馈信息
  commentId: useUser.UserInfo._id, //发送评论的用户id
});
// 控制滚动条滚动到容器的底部 方便查看最新消息
async function setScrollToBottom() {
  // 注意：需要通过 nextTick 以等待 DOM 更新完成
  await nextTick();
  const max = innerRef.value.clientHeight; //计算容器列表高度
  scrollbarRef.value.setScrollTop(max);
}

const open = (comment, id) => {
  console.log(id);
  dialogVisible.value = true;
  // console.log(comment,'11');
  messages.value = comment;
  console.log(messages.value[0].userId.username)
  SendMessage.userId = id;
  setScrollToBottom();
};
// 发送消息
const PostMsgList = async () => {
  const res = await PostMessage(SendMessage);
  messages.value = res.data.data.filter(
    (item) => item._id == SendMessage.userId
  )[0].comments;
  SendMessage.textarea = "";
  setScrollToBottom();
  emit("PropMsg"); //发送消息通知父组件更新消息列表
};
  // messages[0].userId.username
defineExpose({
  open,
});
</script>
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="messages[0]?.userId.username"
      width="800"
      :before-close="handleClose"
    >
      <div class="chat-container">
        <el-scrollbar ref="scrollbarRef" max-height="400px">
          <div ref="innerRef" style="min-height: 150px">
            <div
              v-for="item in messages"
              :key="item._id"
              class="message-row"
              :class="{ right: isCurrentUser(item.userId._id) }"
            >
              <!-- 头像占位 -->
              <el-avatar
                :size="50"
                :src="
                  item.userId.avatar ??
                  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              />

              <!-- 消息文本 -->
              <span class="message">{{ item.textarea }}</span>
            </div>
          </div>
        </el-scrollbar>
        <div class="reply">
          <el-input
            v-model="SendMessage.textarea"
            :rows="2"
            type="textarea"
            placeholder="请输入"
            :show-word-limit="true"
            maxlength="100"
            @keydown.enter="PostMsgList"
          />

          <el-button type="primary" @click="PostMsgList" size="small"
            >发送</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang='scss' scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding-top: 10px;
  .message-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    &.right {
      flex-direction: row-reverse;
      padding-right: 20px;
    }
    .avatar-placeholder {
      border-radius: 50%;
      //   background-color: #ccc; /* 灰色占位符，替换为头像 */
      margin: 0 10px;
    }
    .message {
      display: inline-block;
      padding: 10px;

      //   background-color: lightgray;
      border-radius: 10px;
      max-width: 60%;
      word-break: break-all;
      white-space: normal;
      background-color: #fff; /* 对方消息颜色 */
    }
  }
  .reply {
    display: flex;
    border-top: 1px solid #ddd;
    flex-direction: column;
    align-items: flex-end;
    height: 80px;
    justify-content: flex-end;
    :deep(.el-textarea__inner) {
      background-color: #eeeeee;
      padding: 0 0 0 10px;
      box-shadow: none;
    }
    :deep(.el-input__count) {
      background-color: #eeeeee;
    }
  }
  .right .message {
    background-color: skyblue; /* 默认为用户消息颜色 */
  }
}
</style>