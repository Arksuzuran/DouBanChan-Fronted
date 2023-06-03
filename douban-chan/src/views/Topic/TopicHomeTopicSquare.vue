<!-- 话题版块主页 “话题广场”的二级路由页面 -->
<template>
  <div class="topiclist-main-container">

    <!-- 顶部排序部分 -->
    <div class="topiclist-sort-label-container">
      <div class="topiclist-title">
        推荐参与的话题
      </div>
      <PostSortLabel></PostSortLabel>
    </div>
    <!-- <TopicCard v-for="(topic, index) in topicList" :key="topic.topicId" :topic="topic" :hotNo="index + 1"></TopicCard> -->
    <!-- 话题列表 -->
    <!-- <div>
      <TopicCard v-for="topic in activetopicList" :key="topic.topicId" :topic="topic"></TopicCard>
    </div> -->
    <TopicNormalList :topicList="activetopicList"></TopicNormalList>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostSortLabel from '@/components/post/PostSortLabel.vue'
import TopicNormalList from '@/components/topic/TopicNormalList.vue'

export default {
  name: 'TopicHomeTopicSquare',
  props: ['topicList', 'title'],
  components: {
    PostSortLabel,
    TopicNormalList,
  },
  data() {
    return {
      activeLabel: 1,//1 热度排序 2 时间排序
    }
  },
  methods: {

  },
  computed: {
    //头像路径与用户名
    //引入vuex的userAbout模块里的 state变量
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    componentTitle() {
      return this.title ? this.title : '讨论精选'
    },
    // 按照指定顺序筛选列表
    activetopicList() {
      let list = this.topicList.slice()
      //热度排序 浏览数大的在前面。
      if (this.activeLabel === 1) {
        list.sort((a, b) => {
          return b.visit - a.visit
        })
      }
      //时间排序 时间小的在前面。特别地，置顶帖子优先
      else if (this.activeLabel === 2) {
        list.sort((a, b) => {
          return (a.date < b.date) ? -1 : 1
        })
      }
      console.log(list)
      return list
    },
  },
  mounted() {
    // 监听TopicSortLabel的改变排序方式事件，在事件回调中重新向服务器请求帖子列表，并重新加载topicList
    this.$bus.$on('sortChanged', (index) => {
      this.activeLabel = index;
      console.log('排序方式已经改变：', index)
    })
  },
  beforeDestroy() {
    //卸载监听
    this.$bus.$off('sortChanged')
  },
}
</script>

<style scoped>
.topiclist-main-container {
  max-width: 850px;
}

.topiclist-title {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-items: center;

  margin: 12px;
  font-size: 24px;
  font-weight: 600;
  color: rgb(251, 138, 138);
}

/* 顶部选择按时间或者热度排序 */
.topiclist-sort-label-container {
  position: sticky;
  top: 154px;
  /* top: 120px; */
  background-color: rgb(255, 254, 254);
  z-index: 10;

  display: flex;
  flex-flow: row wrap;
  align-content: center;
  justify-items: flex-start;
  /* margin-bottom: 10px; */
}
</style>