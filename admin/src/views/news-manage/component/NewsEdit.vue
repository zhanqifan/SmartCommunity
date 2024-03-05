<script setup>
import pageHeader from "@/components/mainbox/pageHeader.vue";
import editor from "@/components/editor/Editor.vue";
import { Plus } from "@element-plus/icons-vue";
import { controlPublish, getNewsList } from "@/api/news-manage";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/index";
const useUser = useUserStore();
const newsFormRef = ref();
const Route = useRoute();
const Router = useRouter();
const showEditor = ref(false);
let newsForm = reactive({
  // title: "",
  // content: "",
  // category: null, //1最新动态 2典型案例 3通知公共
  // cover: "",
  // file: null,
  // isPublish: 0, //0未发布 1已发布
  // avatar:useUser.UserInfo.avatar,
  // username:useUser.UserInfo.username
});
// 校验规则
const rules = reactive({
  title: [
    {
      required: true,
      message: "请输入标题",
      trigger: "blur",
    },
  ],
  content: [{ required: true, message: "请输入内容", trigger: "change" }],
  category: [{ required: true, message: "请选择分类", trigger: "change" }],
  cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
});
const options = [
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
// 处理富文本
const handleContent = (value) => {
  newsForm.content = value;
  // 手动触发校验
  newsFormRef.value.validateField("content");
};
// 处理文件格式
const handleuploadchange = (file) => {
  //  利用原生的URL创建文件回显
  newsForm.cover = URL.createObjectURL(file.raw);
  newsForm.file = file.raw; //把文件保存起来提交给后端用的
};
// 处理表单校验
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
        console.log(newsForm)
      const params = new FormData();
      for (let i in newsForm) {
        params.append(i, newsForm[i]);
      }
      const res = await controlPublish(params);
      ElMessage({
        type: "success",
        message: "修改成功",
      });
      Router.push("/news-manage/newslist");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const getNews = async () => {
  const res = await getNewsList(Route.params.id);
  Object.assign(newsForm, res.data.data[0]);
  console.log(newsForm)
  showEditor.value = true;
};

onMounted(() => {
  getNews();
});
</script>
<template>
  <div>
    <pageHeader />
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="标题:" prop="title">
        <el-input v-model="newsForm.title" style="width: 1015px" />
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <editor
          v-model="newsForm.content"
          @content="handleContent"
          v-if="showEditor"
          :text="newsForm.content"
        ></editor>
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select
          v-model="newsForm.category"
          clearable
          placeholder="请选择类别"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="cover" label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleuploadchange"
        >
          <img v-if="newsForm.cover" :src="newsForm.cover" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang='scss' scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
:deep(.avatar-uploader .avatar) {
  width: 200px;
  height: 200px;
  display: block;
}
</style>