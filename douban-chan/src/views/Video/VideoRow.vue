<template>
  <div class="column">
    <div class="column-title">
      <span>{{ title }}</span>
      <i class="el-icon-refresh-left" v-if="title==='猜你喜欢'"></i>
    </div>
    <div>
      <div class="grid-container">
        <VideoBookItem v-for="(item, index) in items" :key="index" :myObject="item"></VideoBookItem>
      </div>
    </div>
  </div>
</template>

<script>
import VideoBookItem from '@/components/VideoBookItem.vue'
export default {
    name: 'Recommend',
    components: { VideoBookItem },
    props:['items', 'title']
}
</script>

<style scoped>
.column {
  margin-top: 50px;
}
.column-title{
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
}
</style>