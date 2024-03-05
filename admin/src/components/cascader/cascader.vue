<script setup>
import { useUserStore } from "@/stores";
import { useRoute } from "vue-router";
const value = ref()
const emit = defineEmits('address')
const route = useRoute();
// const props = {
//   expandTrigger: 'hover' as const,
// }
const editorUser = (address)=>{
  value.value = address
  console.log(value.value)
}

const useUser =  useUserStore()
const handleChange = (value) => {
  console.log(value)
  emit('address',value)
}

const options = [
  {
    value: 1, // 1号楼
    label: '1号楼',
    children: [
      {
        value: 1, // 1号楼的1单元
        label: '1单元',
        children: [
          {
            value: 101, // 101室
            label: '101室',
          },
          {
            value: 102, // 102室
            label: '102室',
          },
          // 更多房间...
        ],
      },
      {
        value: 2, // 1号楼的2单元
        label: '2单元',
        children: [
          {
            value: 201, // 201室
            label: '201室',
          },
          {
            value: 202, // 202室
            label: '202室',
          },
          // 更多房间...
        ],
      },
      // 更多单元...
    ],
  },
  {
    value: 2, // 2号楼
    label: '2号楼',
    children: [
      {
        value: 1, // 2号楼的1单元
        label: '1单元',
        children: [
          {
            value: 101, // 101室
            label: '101室',
          },
          {
            value: 102, // 102室
            label: '102室',
          },
          // 更多房间...
        ],
      },
      {
        value: 2, // 2号楼的2单元
        label: '2单元',
        children: [
          {
            value: 201, // 201室
            label: '201室',
          },
          {
            value: 202, // 202室
            label: '202室',
          },
          // 更多房间...
        ],
      },
      // 更多单元...
    ],
  },
  // 更多楼栋...
];
onMounted(()=>{
    if(route.name==='个人中心'){
      value.value = useUser.UserInfo.address
    }
})

defineExpose({
  editorUser
})

</script>
<template>
   <div class="m-4">
  
    <el-cascader v-model="value" :options="options" placeholder="请选择你的住宅号" @change="handleChange" clearable />
  </div>
</template>

<style lang='scss'>
</style>