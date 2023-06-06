<template>
    <div class="content-container">
        <GroupHomePostList :postList="inPostList" :showIcongroup="true" class="topic-left-container" top="68">
        </GroupHomePostList>
        <TopicHotList :topicList="inTopicList" top="68" :mini="true" class="topic-right-container"></TopicHotList>
    </div>
</template>

<script>
import GroupHomePostList from '../Group/GroupHomePostList.vue'
import TopicHotList from '@/components/topic/TopicHotList.vue'
export default {
    props: ['inPostList', 'inTopicList'],
    name: 'topicPage',
    components: {
        GroupHomePostList,
        TopicHotList,
    },
}
</script>

<style scoped>
.content-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-flow: row;
}

.topic-left-container {
    flex: 5;
}

.topic-right-container {
    flex: 2;
}
</style>