<template>
    <div>
      <VideoList :items="list" title="搜索结果" :top="205" col=""></VideoList>
    </div>
  </template>
  
  <script>
  import VideoList from '@/views/Video/VideoList.vue'
  export default {
    name: 'SearchTopic',
    components: {
      VideoList
    },
    data() {
      return {
        list: [],
      }
    },
    mounted() {
      this.list = this.$route.params.list ? this.$route.params.list : []
    },
  }
  </script>
  
  <style scoped></style>