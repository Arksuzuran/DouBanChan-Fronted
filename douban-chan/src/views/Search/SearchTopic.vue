<template>
    <div>
        <TopicHomeTopicSquare :topicList="list" title="搜索结果" top="205"></TopicHomeTopicSquare>
    </div>
</template>

<script>
import TopicHomeTopicSquare from '../Topic/TopicHomeTopicSquare.vue';
export default {
    name: 'SearchTopic',
    components: {
        TopicHomeTopicSquare,
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