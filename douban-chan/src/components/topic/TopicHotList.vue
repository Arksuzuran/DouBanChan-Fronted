<!-- 热榜 -->
<template>
  <div class="topiclist-container">
    <div class="postlist-title">
      热门话题排行榜
    </div>
    <TopicCard v-for="(topic, index) in topicList" :key="topic.topicId" :topic="topic" :hotNo="index + 1"></TopicCard>
  </div>
</template>

<script>
import TopicCard from './TopicCard.vue';

export default {
  name: 'TopicHotList',
  props: ['topicList'],
  components: {
    TopicCard,
  },
}
</script>

<style scoped>
.postlist-title {
  position: sticky;
  top: 154px;
  z-index: 1;
  background-color: rgb(255, 248, 248);

  /* display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-items: flex-start; */

  padding: 10px;
  margin: 0 auto;
  font-size: 24px;
  font-weight: 600;
  color: rgb(255, 42, 42);
}
</style>