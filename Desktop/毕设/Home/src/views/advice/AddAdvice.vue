<script setup>
import { useUser } from "@/stores/user.js";
import { Plus, Iphone } from "@element-plus/icons-vue";
import { AddComplain } from "@/api/bill-manage";
import { useRouter } from "vue-router";
const dialogImageUrl = ref(""); //预览图片地址
const dialogVisible = ref(false); //预览弹窗
const ruleFormRef = ref();
const comment = ref();
const User = useUser();
const router = useRouter();
const ruleForm = ref({
  radio: 1,
  title: "",
  files: [], //文件上传
  userId: User.UserInfo._id,
  comments: [
    {
      userId: User.UserInfo._id,
      avatar: User.UserInfo.avatar,
      textarea: "",
    },
  ],
  userId: User.UserInfo._id,
});

const rules = reactive({
  radio: [{ required: true, message: "请选择", trigger: "change" }],
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  "comments[0].textarea": [
    { required: true, message: "请输入详情", trigger: "blur" },
  ],
});
// 处理多图片上传
const handlechange = (file) => {
  ruleForm.value.files.push({
    file: file.raw,
  });
  console.log(ruleForm.value);
};
// 删除回调
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
// 预览回调
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const commit = async (ruleFormRef) => {
  ruleFormRef.validate(async (valid) => {
    ruleForm.value.comments.forEach((item, index) => {
      console.log(item);
    });
    if (valid) {
      const params = new FormData();
      for (let i in ruleForm.value) {
        if (i === "files") {
          ruleForm.value.files.forEach((item, index) => {
            console.log(item.file);
            params.append(i, item.file);
          });
        } else if (i === "comments") {
          ruleForm.value.comments.forEach((comment, index) => {
            Object.keys(comment).forEach((key) => {
              params.append(`comments[${index}][${key}]`, comment[key]);
            });
          });
        } else {
          params.append(i, ruleForm.value[i]);
        }
      }
      const res = await AddComplain(params);
      console.log(res);
      router.push("/AdviceList");
    } else {
        console.log('提交失败')
    }
  });
};
</script>
<template>
  <div style="width: 70%">
    <el-row justify="center">
      <el-col :span="20" style="margin-left: 30px">
        <el-card class="box-card">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="反馈类型" prop="radio1">
              <el-radio-group v-model="ruleForm.radio" size="large">
                <el-radio-button label="1">意见建议</el-radio-button>
                <el-radio-button label="2">服务评价</el-radio-button>
                <el-radio-button label="3">其他反馈</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入标题"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="反馈详情" prop="comments[0].textarea">
              <el-input
                style="width: 500px"
                v-model="ruleForm.comments[0].textarea"
                maxlength="500"
                placeholder="请输入您的反馈详情，以便我们更好地处理"
                show-word-limit
                type="textarea"
              />
            </el-form-item>

            <el-form-item label="上传图片">
              <el-upload
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-change="handlechange"
                :on-remove="handleRemove"
                :auto-upload="false"
                :multiple="true"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="commit(ruleFormRef)"
                >提交反馈</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang='scss' scoped>
.el-form-item {
  margin-bottom: 30px;
}
</style>