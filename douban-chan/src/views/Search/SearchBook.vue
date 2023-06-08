<template>
    <div>
      <BookList :groupList="list" title="搜索结果" :top="205" col="2"></BookList>
    </div>
  </template>
  
  <script>
  import BookList from '../Book/BookList.vue';
  export default {
    name: 'SearchTopic',
    components: {
        BookList
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