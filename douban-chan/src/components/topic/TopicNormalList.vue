<!-- 普通话题 -->
<template>
    <div class="topiclist-container">
        <TopicCard v-for="topic in topicList" :key="topic.topicId" :topic="topic"></TopicCard>
        <div class="none-placeholder" v-if="showNonePlaceHolder">这里暂时还没有话题哦</div>
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
    computed:{
        showNonePlaceHolder(){
            return !this.topicList || this.topicList.length == 0
        },
    },  
}
</script>
<style scoped>
.none-placeholder {
    margin: 300px 200px;
    font-size: 36px;
    font-weight: 700;
    color: rgba(255, 133, 133, 0.9);
}
</style>