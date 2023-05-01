<template>
  <div class="guess">
    <h2>猜你喜欢</h2>
    <div class="grid-container">
      <VideoBookItem v-for="(item, index) in items" :key="index" :myObject="item"></VideoBookItem>
    </div>
  </div>
</template>

<script>
import VideoBookItem from '@/components/VideoBookItem.vue'
export default {
    name: 'Recommend',
    components: { VideoBookItem },
    props:['items']
}
</script>

<style>
.guess{
    width: 100%;
    height: 200px;
    margin-top: 30px;
  }
</style>