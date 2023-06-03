<!-- 普通话题 -->
<template>
    <div class="topiclist-container">
        <TopicCard v-for="topic in topicList" :key="topic.key" :topic="topic"></TopicCard>
    </div>
</template>
  
<script>
import TopicCard from './TopicCard.vue';

export default {
    name: 'TopicNormalList',
    props: ['topicList'],
    components: {
        TopicCard,
    },
}
</script>
  
<style scoped>
</style>