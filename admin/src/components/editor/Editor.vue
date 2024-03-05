<script setup>
import E from 'wangeditor'
const emit =  defineEmits(['content'])
const prop = defineProps({
  text:String
})
onMounted(()=>{
const editor = new E('#myeditor')
// 配置触发 onchange 的时间频率，默认为 200ms

editor.create()
// 设置初始值
prop.text && editor.txt.html(prop.text)
editor.config.onchangeTimeout = 500; // 修改为 500ms

// 或者 const editor = new E( document.getElementById('div1') )
editor.config.onchange = function (newHtml) {
  // console.log("change 之后最新的 html", newHtml);
   emit('content',newHtml)
};

})

</script>
<template>
  <div id="myeditor"></div>
</template>

<style lang='scss'>
</style>