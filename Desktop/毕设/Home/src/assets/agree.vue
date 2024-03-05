<script setup>

const agrees= ref(false)
const handleagrees = () =>{
  agrees.value=!agrees.value
}
defineExpose({
  handleagrees
})
</script>
<template>
 <svg
 v-if="agrees"
      t="1708007491102"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4236"
      width="16"
      height="16"
    >
      <path
        d="M512.009505 25.054894l158.199417 320.580987 353.791078 51.421464L767.995248 646.579761l60.432101 352.365345-316.417844-166.354615-316.436854 166.354615 60.432101-352.365345L0 397.057345l353.791078-51.421464z"
        fill="#EFCE4A"
        p-id="4237"
      ></path>
    </svg>
    <svg
     v-else

      t="1708007491102"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4236"
      width="16"
      height="16"
    >
      <path
        d="M512.009505 25.054894l158.199417 320.580987 353.791078 51.421464L767.995248 646.579761l60.432101 352.365345-316.417844-166.354615-316.436854 166.354615 60.432101-352.365345L0 397.057345l353.791078-51.421464z"
        fill="#bfbfbf"
        p-id="4237"
      ></path>
    </svg>
   
</template>

<style lang='scss'>
svg:hover{
  cursor: pointer;
}
</style>