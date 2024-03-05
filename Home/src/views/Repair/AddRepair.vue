<script setup>
import { Plus, Iphone } from "@element-plus/icons-vue";
import { RepairAdd } from "@/api/repair-manage.js";
import { useUser } from "@/stores/user.js";
import { formatTimeMM } from "@/utils/FormatTime";
import { useRouter } from "vue-router";
const dialogImageUrl = ref(); //预览图片地址
const dialogVisible = ref(false); //预览弹窗
const ruleFormRef = ref();
const User = useUser();
const Router = useRouter()
const ruleForm = ref({
  radio1: "",
  textarea: "",
  godata: "",
  mobile: "",
  files: [],
  createtime:new Date(),
  username: User.UserInfo.username,
  address: User.UserInfo.address,
  usernameId:User.UserInfo._id
});
// const files = ref([]);
const rules = ref({
  radio1: [{ required: true, message: "请选择维修类型", trigger: "change" }],
  textarea: [{ required: true, message: "请输入具体描述", trigger: "blur" }],
  mobile: [
    { required: true, message: "请输入电话号码", trigger: ["blur","change"]},
    {
      pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
      message: "请输入合法手机号/电话号",
      trigger: ["blur","change"],
    },
  ],
  godata: [{ required: true, message: "请输入日期", trigger: "blur" }],
});

// 处理多图片上传
const handlechange = (file) => {
  ruleForm.value.files.push({
    file: file.raw,
  });
  console.log(ruleForm.value);
};
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const params = new FormData();
      for (let i in ruleForm.value) {
        if (i === "files") {
          ruleForm.value.files.forEach((item, index) => {
            console.log(item.file);            
            params.append(i, item.file);
          });
        } else {
          params.append(i, ruleForm.value[i]);
        }
      }
     await RepairAdd(params);
     Router.push('/repairlist')
  
    } else {
      console.log("不为空");
    }

    // console.log(res.data);
  });
};
// 删除回调
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
// 预览回调
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url; //赋予图片地址
  dialogVisible.value = true; //打开弹窗
};
</script>
<template>
  <div class="main">
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
            <el-form-item label="维修类型" prop="radio1">
              <el-radio-group v-model="ruleForm.radio1" size="large">
                <el-radio-button label="1">物业简修</el-radio-button>
                <el-radio-button label="2">上门安装</el-radio-button>
                <el-radio-button label="3">入户维修</el-radio-button>
                <el-radio-button label="4">管道疏通</el-radio-button>
                <el-radio-button label="5">其他问题</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="具体描述" prop="textarea">
              <el-input
                style="width: 500px"
                v-model="ruleForm.textarea"
                maxlength="500"
                placeholder="请输入问题详情,以便我们更好地处理"
                show-word-limit
                type="textarea"
              />
            </el-form-item>
            <el-form-item label="添加照片">
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
            </el-form-item>
            <el-form-item label="联系方式" prop="mobile">
              <el-input
                style="width: 220px"
                v-model="ruleForm.mobile"
                maxlength="500"
                placeholder="请输入你的联系方式"
                :prefix-icon="Iphone"
              />
            </el-form-item>
            <el-form-item label="期望上门时间" prop="godata">
              <el-date-picker
                v-model="ruleForm.godata"
                type="datetime"
                placeholder="请选择你期望的时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang='scss' scoped>
.main{
     min-width:1300px;
}
.el-form-item {
  margin-bottom: 30px;
}
</style>