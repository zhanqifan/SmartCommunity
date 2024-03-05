<script setup>
import { Plus, Location } from "@element-plus/icons-vue";
import { RepairAdd } from "@/api/repair-manage";
import { useUserStore } from "@/stores";
import { formatTimeMM } from "../../../utils/FormatTime";
import { useRouter } from "vue-router";
import { PublicAdd } from "@/api/search-manage";
const dialogImageUrl = ref(); //预览图片地址
const dialogVisible = ref(false); //预览弹窗
const ruleFormRef = ref();
const useUser = useUserStore();
const fileList= ref([])
const Router = useRouter();
const ruleForm = ref({
  Public: "",
  OpenDate: "",
  Address: "",
  files: [],
});
const rules = reactive({
  Public: [{ required: true, message: "请输入名称", trigger: "blur" }],
  Address: [{ required: true, message: "请输入位置", trigger: "blur" }],
  OpenDate: [{ required: true, message: "请选择时间", trigger: "blur" }],
});

// 处理多图片上传
const handlechange = (file) => {
  ruleForm.value.files.push({
    file: file.raw,
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
      await PublicAdd(params);
      ruleForm.value = { Public: "", OpenDate: "", Address: "", files: [] };//清空表单
      fileList.value=[]
      console.log(dialogImageUrl.value)
      ElMessage({
        message: "添加成功",
        type: "success",
      });
    } else {
      console.log("不为空");
    }
  });
};
// 预览回调
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url; //赋予图片地址
  dialogVisible.value = true; //打开弹窗
  console.log(dialogImageUrl.value)
};
</script>
<template>
  <div>
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
            <el-form-item label="设施名称" prop="Public">
              <el-input
                style="width: 220px"
                v-model="ruleForm.Public"
                maxlength="500"
                placeholder="请输入名称"
              />
            </el-form-item>
            <el-form-item label="位置" prop="Address">
              <el-input
                style="width: 220px"
                v-model="ruleForm.Address"
                maxlength="500"
                placeholder="请输入位置"
                :prefix-icon="Guide"
              />
            </el-form-item>
            <el-form-item label="开放时间" prop="OpenDate" style="width: 500px">
              <el-time-picker
                v-model="ruleForm.OpenDate"
                is-range
                range-separator="To"
                start-placeholder="Start time"
                end-placeholder="End time"
                value-format="HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="添加照片">
              <el-upload
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-change="handlechange"
                :on-remove="handleRemove"
                v-model:file-list="fileList"
                :auto-upload="false"
                :multiple="true"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
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
.el-form-item {
  margin-bottom: 30px;
}
:deep(.el-time-picker) {
  width: 300px;
}
</style>