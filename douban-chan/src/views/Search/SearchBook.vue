<template>
    <div>
      <GroupList :groupList="list" title="搜索结果" :top="205" col="2"></GroupList>
    </div>
  </template>
  
  <script>

  export default {
    name: 'SearchTopic',
    components: {
      
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