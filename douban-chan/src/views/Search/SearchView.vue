<template>
  <div class="search-container">
    <!-- 顶部搜索框 -->
    <div class="search-input-container">
      <div class="search-input-title">豆瓣搜索酱</div>
      <!-- <el-input placeholder="请输入内容" v-model="input" class="search-inputbox">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input> -->
      <input class="input-area" type="search" v-model="input" placeholder="输入关键字进行全站检索" @keyup.enter="handleSearch" />
      <button class="search-input-button" type="button" @click="handleSearch">
        搜索
      </button>
    </div>
    <!-- 中部分类栏 -->
    <div class="search-select-container" v-if="this.searched">
      <!-- 二级导航菜单 -->
      <el-menu :default-active="activeIndex" class="sec-nav" mode="horizontal" @select="handleSelect"
        active-text-color="#FC5B81">
        <el-menu-item index="searchVideo" class="nav-item">影视<span class="item-num">{{ }}</span></el-menu-item>
        <el-menu-item index="searchBook" class="nav-item">图书</el-menu-item>
        <el-menu-item index="searchPost" class="nav-item">帖子</el-menu-item>
        <el-menu-item index="searchGroup" class="nav-item">小组</el-menu-item>
        <el-menu-item index="searchTopic" class="nav-item">话题</el-menu-item>
        <!-- <el-menu-item index="groupMemberList">小组成员</el-menu-item> -->
      </el-menu>
    </div>
    <div class="search-result-container" v-if="this.searched">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SearchView',
  data() {
    return {
      input: '',
      activeIndex: 'searchVideo',
      searched: false,
      allResult: {
        searchVideo: [],
        searchBook: [],
        searchPost: [],
        searchGroup: [],
        searchTopic: [],
      },
    }
  },
  methods: {
    handleJump() {
      console.log(this.activeIndex)
      console.log('即将跳转到结果页面',this.allResult[this.activeIndex])
      this.$router.push({
        name: this.activeIndex,
        params: {
          list: this.allResult[this.activeIndex],
        }
      })
    },
    async handleSearch() {
      if (!this.input) {
        this.$message.error('请输入搜索内容')
        return
      }
      this.searched = true
      // 在此请求数据
      try {
        await this.getPostListSearchOnline({
          input: this.input,
          userId: this.userId,
        })
        await this.getGroupListSearchOnline({
          input: this.input,
          userId: this.userId,
        })
        await this.getTopicListSearchOnline({
          input: this.input,
          userId: this.userId,
        })
      } catch (err) {
        this.$message.error('网络错误')
      }

      this.allResult.searchTopic = this.topicList.slice()
      this.allResult.searchGroup = this.groupList.slice()
      this.allResult.searchPost = this.postList.slice()
      this.allResult.searchVideo = []
      this.allResult.searchBook = []

      this.handleJump()
    },
    handleSelect(index) {
      this.activeIndex = index
      this.handleJump()
    },
    //获取话题列表
    ...mapActions('topicAbout', ['getTopicListSearchOnline', 'getTopicListOnline', 'getTopicListByHotOnline', 'getTopicInfoOnline', 'getTopicListByGroupIdOnline', 'getTopicListSearchOnline']),
    //获取帖子列表 或者一个完整的帖子
    ...mapActions('postAbout', ['getPostListSearchOnline', 'getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline', 'getPostOnline', 'getPostListSearchOnline']),
    //获取小组列表    
    ...mapActions('groupAbout', ['getGroupListSearchOnline', 'getGroupListOnline', 'getGroupListByHotOnline', 'getGroupInfoOnline', 'getGroupListSearchOnline']),
  },
  computed: {
    ...mapGetters('postAbout', ['postList']),
    ...mapGetters('topicAbout', ['topicList']),
    ...mapGetters('groupAbout', ['groupList']),
  },
  // 从其他页面的搜索框跳转而来，那么进入搜索页面以给定的参数直接搜索
  mounted(){
    let preParams = this.$route.params
    if(preParams.input){
      this.input = preParams.input
      this.activeIndex = preParams.index
      this.handleSearch()
    }
  },
}
</script>

<style scoped>
/* .search-container {
  background-color: white;
} */

.search-input-container {
  padding: 0 11%;
  position: sticky;
  top: 65px;
  z-index: 11;

  height: 90px;

  background-color: rgb(255, 237, 237);
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
}

.search-input-title {
  margin: 0 40px;
  font-size: 36px;
  font-weight: 700;
  color: rgba(255, 133, 133, 0.9);
}

.search-inputbox {
  width: 50%
}

.search-result-container {
  margin: 1% 10% 0 10%
}

.search-input-button {
  margin: 0 20px;
  width: 10%;
  outline: none;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  transition: all .3s ease;
  background-color: rgba(249, 192, 192, 0.4);

  border: 2px solid rgba(248, 237, 237, 0.8);
  box-shadow: 0px 1px 2px 0px rgba(247, 61, 61, 0.2);

  cursor: pointer;
}

.search-input-button:hover {
  background-color: rgb(255, 79, 79);
  color: #fff;
}

.input-area {
  padding: 15px;
  width: 50%;
  border: 2px solid #ffeaea;
  resize: vertical;
  background-color: rgba(255, 252, 252, 0.7);
  border-radius: 5px;
  margin: 20px;
  /* 字体 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #2c3e50;
}

.input-area:focus {
  border-color: pink;
  outline: rgb(255, 131, 152);
  z-index: 100;
}

.search-select-container {
  padding: 0 16%;
  position: sticky;
  top: 152px;
  z-index: 11;

  height: 60px;

  background-color: rgb(255, 252, 252);
}

/* .sec-nav {
  font-size: 100px;
  font-weight: 700;
} */
.nav-item {
  padding: 0 30px;
  /* display: flex;
  justify-content: center; */
  /* align-items: flex-end; */
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 2px
}
</style>