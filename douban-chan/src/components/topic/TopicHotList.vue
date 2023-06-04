<!-- 热榜 -->
<template>
  <div class="topiclist-container">
    <div class="postlist-title" :style="distanceToTop" @click="jumpToHotList">
      热门话题排行榜
    </div>
    <!-- 根据传入参数来确定使用何种组件 -->
    <component v-for="(topic, index) in topicList" :key="topic.topicId" :topic="topic" :hotNo="index + 1" :is="getComponentType()"></component>
  </div>
</template>

<script>
import TopicCard from './TopicCard.vue';
import TopicCardMini from './TopicCardMini.vue';
export default {
  name: 'TopicHotList',
  props: ['topicList', 'top', 'mini'],
  components: {
    TopicCard,
    TopicCardMini,
  },
  computed: {
    // 动态设置到顶部的距离
    // 动态设置到顶部的距离
    distanceToTop() {
      if (this.top) {
        return {
          top: this.top + 'px',
        }
      }
      return {}
    }
  },
  methods:{
    // 选择需要调用的组件
    getComponentType() {
      if (this.mini) {
        return 'TopicCardMini'
      }
      // 默认情况
      else {
        return 'TopicCard'
      }
    },
    jumpToHotList(){
      this.$router.push({
        name: 'todaysHot'
      })
    },
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

  cursor: pointer;
}
</style>