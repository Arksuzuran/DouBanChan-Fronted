<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-menu-item index="1">处理中心</el-menu-item>
</el-menu>
</template>

<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

</style>