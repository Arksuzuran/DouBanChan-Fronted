<!-- 话题版块主页 “今日热榜”的二级路由页面 -->
<template>
  <div class="container">
    <TopicHotList :topicList="topicList"></TopicHotList>
    <GroupHomePostList :postList="postList" title="热榜话题动态"  :notShowSelectButton="true"></GroupHomePostList>
  </div>
</template>

<script>
import TopicHotList from '@/components/topic/TopicHotList.vue';
import GroupHomePostList from '../Group/GroupHomePostList.vue'

export default {
  name: 'TopicHomeTodaysHot',
  props: ['postList', 'topicList'],
  components: {
    TopicHotList,
    GroupHomePostList,
  },
  data(){
    return{
    }
  },
  computed:{
  
  },
}
</script>

<style scoped>
.container {
  max-width: 850px;
}
</style>