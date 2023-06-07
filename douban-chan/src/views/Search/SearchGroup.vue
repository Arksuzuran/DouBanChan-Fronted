<template>
  <div>
    <GroupList :groupList="list" title="搜索结果" :top="205" col="3"></GroupList>
  </div>
</template>

<script>
import GroupList from '@/components/group/GroupList.vue';
export default {
  name: 'SearchTopic',
  components: {
    GroupList,
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