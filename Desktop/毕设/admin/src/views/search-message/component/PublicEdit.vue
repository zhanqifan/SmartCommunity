<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { PublicList } from "@/api/search-manage";
import {PublicEdit} from '@/api/search-manage.js'
const ruleFormRef = ref();
const ruleForm = ref({});
const drawer = ref(false);
const emit = defineEmits(["success"]); //通知父组件更新
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const files = ref([]);
// 校验规则
const rules = reactive({
  Public: [{ required: true, message: "请输入名称", trigger: "blur" }],
  Address: [{ required: true, message: "请输入位置", trigger: "blur" }],
  OpenDate: [{ required: true, message: "请选择时间", trigger: "blur" }],
});
const fileList = ref([]);
// 预览图片
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
  console.log(uploadFile);
};
// 删除逻辑 避免了后端处理srcList异常
const handleremove = (uploadFile, uploadFiles) => {
  // console.log(uploadFile,uploadFiles);
  ruleForm.value.srcList = uploadFiles
    .filter((item) => {
      if (item.url.startsWith("blob") != true) {
        return item;
      }
    })
    .map((item) => item.url);
  // console.log("删完后", ruleForm.value);
};
// 添加照片
const handlechange = (file) => {
  files.value.push({ file: file.raw });
  ruleForm.value.files = files.value;
};
const open = (row) => {
  drawer.value = true;
  ruleForm.value = JSON.parse(JSON.stringify(row));
  fileList.value = ruleForm.value.srcList.map((item) => {
    return { url: item };
  });
};
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const params = new FormData();
      for (let i in ruleForm.value) {
        if (i === "files") {
          ruleForm.value.files.forEach((item, index) => {
            params.append(i, item.file);
          });
        } else {
          params.append(i, ruleForm.value[i]);
        }
      }
      const res = await PublicEdit(params)
      emit('success')//通知父组件更列表
      console.log(res.data)
      files.value=[]
      drawer.value = false;
      console.log(ruleForm.value);
      ElMessage({
        message: "修改成功",
        type: "success",
      });
    } else {
      console.log("不为空");
    }
  });
};

defineExpose({
  open,
});
</script>

<template>
  <el-drawer v-model="drawer" title="编辑用户">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-position="left"
      class="demo-ruleForm"
      label-width="80px"
      style="max-width: 400px"
    >
      <el-form-item label="设施名称" prop="Public">
        <el-input v-model="ruleForm.Public" />
      </el-form-item>
      <el-form-item label="位置" prop="Address">
        <el-input v-model="ruleForm.Address" />
      </el-form-item>

      <el-form-item label="开放时间" prop="OpenDate">
        <el-time-picker
          v-model="ruleForm.OpenDate"
          is-range
          range-separator="To"
          start-placeholder="Start time"
          end-placeholder="End time"
          value-format="HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleremove"
          :auto-upload="false"
          :on-change="handlechange"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改</el-button>
        <el-button @click="drawer = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
</style>