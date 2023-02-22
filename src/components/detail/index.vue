<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(localStorage.getItem('setDetail'))
})
</script>

<template>
  <div>详情</div>
</template>
