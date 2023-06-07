<!-- 话题版块主页 -->
<template>
  <div>
    <!-- 背景色 -->
    <div class="topichome-background"></div>

    <!-- 顶部二级导航栏 -->
    <div class="topichome-header-container">
      <div class="topichome-header-title">豆瓣话题酱</div>
      <!-- 按钮组 -->
      <div v-for="label in topLabelList" :key="label.id" class="topichome-header-btn"
        :class="getActiveButtonClass(label.id)" @click="handleSelect1(label.id)">
        {{ label.label }}
      </div>
    </div>

    <!-- 下部内容区 -->
    <div class="topichome-main-container">
      <!-- 左部二级导航栏 -->
      <div class="topichome-left-container">
        <ContentSizerSideNavBar :labelList="leftLabelList"></ContentSizerSideNavBar>
      </div>
      <!-- 中部页面的主要内容 -->
      <div class="topichome-mid-container">
        <router-view :postList="postList" :topicList="topicList"></router-view>
      </div>
      <!-- 右部页面的主要内容 -->
      <div class="topichome-right-container">
        <GroupList :groupList="groupList" title="正在热议的小组" DIYCardComponentName="GroupCardWithTopic"></GroupList>
      </div>
    </div>

    <!-- 右下角 悬浮框 -->
    <!-- 创建小组 -->
    <TopicCreateBar v-if="isLogin"></TopicCreateBar>
    <!-- 滚动至顶部 -->
    <ScrollToTopButton class="group-likefav-scrollbutton"></ScrollToTopButton>
  </div>
</template>
  
<script>

import NavBarBackGround from '@/components/NavBarBackGround.vue'

import ContentSizerSideNavBar from '@/components/topic/ContentSizerSideNavBar.vue'
import GroupList from '@/components/group/GroupList.vue'

import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue'
import TopicCreateBar from '@/components/topic/TopicCreateBar.vue'



// 在需要使用vuex的场合下引入vuex
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'GroupHomeView',
  components: {
    NavBarBackGround,
    //左侧导航栏
    ContentSizerSideNavBar,
    GroupList,

    //底部
    ScrollToTopButton,
    TopicCreateBar,
  },
  data() {
    return {
      // 顶部筛选标签
      activeTopLabel: 0,
      // 按钮展示信息
      topLabelList: [
        { id: 0, label: '浏览发现', name: 'topicHome' },
        { id: 1, label: '今日热榜', name: 'todaysHot' },
        { id: 2, label: '话题广场', name: 'topicSquare' },
      ],

      // 对应当前二级路由页面的筛选标签
      activeLeftLabel: 0,
      tag: '',
      // 侧边三级导航栏 筛选信息
      leftLabelList: [
        { id: 0, label: '精选', tag: '' },
        { id: 1, label: '生活', tag: '生活' },
        { id: 2, label: '文化', tag: '文化' },
        { id: 3, label: '影视', tag: '影视' },
        { id: 4, label: '图书', tag: '图书' },
        { id: 5, label: '学习', tag: '学习' },
        { id: 6, label: '美食', tag: '美食' },
        { id: 7, label: '摄影', tag: '摄影' },
        { id: 8, label: '时尚', tag: '时尚' },
        { id: 9, label: '游戏', tag: '游戏' },
        { id: 10, label: '二刺螈', tag: '二刺螈' },
        { id: 11, label: '我的话题', tag: '我的话题' },
      ],
    }
  },
  methods: {
    // 处理顶部标签选择事件 当前选中的是哪个标签
    handleSelect1(index) {
      console.log('用户点击顶部导航栏标签', this.topLabelList[index].label)
      // 如果重复选择某个标签 那么视为取消选中 则默认退回到“精选”标签下
      if (this.activeTopLabel == index) {
        this.activeTopLabel = 0
      }
      // 选择不重复的标签
      else {
        this.activeTopLabel = index
      }
      this.updateData()
      this.$router.push({
        name: this.topLabelList[index].name
      })
    },
    // 处理二级导航选择事件 当前选中的是哪个标签
    handleSelect2(index) {
      console.log('用户点击左侧导航栏标签', this.leftLabelList[index].label)
      this.activeLeftLabel = index
      this.tag = this.leftLabelList[index].tag
      this.updateData()
    },
    // 根据路径决定导航栏的显示
    updateLabelByRoute() {
      if (this.$route.path == '/topicHome') {
        this.activeTopLabel = 0;
      }
      else if (this.$route.path == '/topicHome/todaysHot') {
        this.activeTopLabel = 1;
      }
      else {
        this.activeTopLabel = 2;
      }
    },

    //重要！
    // 根据当前导航栏选择状态来更新数据
    async updateData() {
      let index = this.activeTopLabel
      try {
        // 选择浏览发现 则随机推荐
        if (index == 0) {
          console.log(this.tag)
          await this.getPostListOnline({
            tag: this.tag,
            userId:  this.userId,
          })
          await this.getTopicListOnline({
            tag: this.tag,
            userId:  this.userId,
          })
          await this.getGroupListOnline({
            tag: this.tag,
            userId:  this.userId,
          })
        }
        // 选择今日热榜 则推荐热榜相关
        else if (index == 1) {
          await this.getPostListByHotOnline({
            tag: this.tag,
            userId:  this.userId,
          })
          await this.getTopicListByHotOnline({
            tag: this.tag,
            userId:  this.userId,
          })
          await this.getGroupListByHotOnline({
            tag: this.tag,
            userId:  this.userId,
          })
        }
        else {
          this.getPostListOnline({
            tag: this.tag,
            userId:  this.userId,
          })
          this.getGroupListOnline({
            tag: this.tag,
            userId:  this.userId,
          })
          this.getGroupListOnline({
            tag: this.tag,
            userId:  this.userId,
          })
        }
      } catch (err) {
        this.$message.error('网络错误')
      }

    },

    // 更新被选中标签的属性
    getActiveButtonClass(index) {
      if (this.activeTopLabel === index) {
        return 'topichome-header-btn-active'
      }
      return ''
    },

    //获取话题列表    
    ...mapActions('topicAbout', ['getTopicListOnline', 'getTopicListByHotOnline']),
    //获取帖子列表
    ...mapActions('postAbout', ['getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline']),
    //获取小组列表    
    ...mapActions('groupAbout', ['getGroupListOnline', 'getGroupListByHotOnline']),
  },

  computed: {
    // 用户是否选中了'我的小组'
    // 用户是否选择‘我的小组’标签
    // 这里姑且以字符串来比较 因为后面大概率改id顺序
    usersGrouplabelChoosen() {
      return this.topLabelList[this.activeTopLabel].label == '我的小组'
    },

    //头像路径与用户名
    //引入vuex的userAbout模块里的 state变量
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    ...mapGetters('postAbout', ['postList']),
    ...mapGetters('topicAbout', ['topicList']),
    ...mapGetters('groupAbout', ['groupList']),
  },

  mounted() {
    this.updateData()
    // 监听GroupCreateBar的创建小组事件，在事件回调中将新小组添加到列表
    // this.$bus.$on('groupCreated', (newGroup) => {
    //   this.groupList.push(newGroup);
    //   console.log('用户创建小组成功：', newGroup)
    // });
    // 二级导航栏选中
    this.$bus.$on('leftNavChanged', (index) => {
      this.handleSelect2(index)
    });
    this.updateLabelByRoute()
  },

}
</script>
  
<style scoped>
/* 内容区容器 */
/* 主容器 */
.topichome-main-container {
  width: 80%;
  margin: 0 auto;
  background-color: rgb(255, 251, 251);

  /* display: grid;
  grid-template-columns: 2fr 10fr 4fr;
  grid-gap: 15px; */
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
}

/* 左侧导航栏 */
.topichome-left-container {
  position: sticky;
  top: 148px;
  /* margin-top: 5px; */
  padding: 0 3%;
  /* width: 12%; */
  flex: 2;
}

/* 中部内容区 */
.topichome-mid-container {
  flex: 10;
}

/* 右侧随机推荐区 */
.topichome-right-container {
  flex: 4;
}

/* 滚动至顶部 */
.group-likefav-scrollbutton {
  position: fixed;
  bottom: 150px;
  right: 20px;
}

/* 页面背景色 */
.topichome-background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 248, 248);
  z-index: -2;
}

/* 顶部二级导航栏容器 */
.topichome-header-container {
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

/* 页面顶栏处标题 */
.topichome-header-title {
  margin: 0 40px;
  font-size: 36px;
  font-weight: 700;
  color: rgba(255, 133, 133, 0.9);
}

/* 顶栏 筛选器 组件 */
/* === removing default button style ===*/
/* === removing default button style ===*/
/* 按钮基本样式 */
.topichome-header-btn {
  margin: 0 15px;

  font-size: 18px;
  background: transparent;
  border: none;
  padding: 12px 18px;
  color: rgba(255, 133, 133, 0.9);
  text-transform: uppercase;
  position: relative;
  transition: .5s ease;

  cursor: pointer;
}

.topichome-header-btn::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: rgba(255, 66, 66, 0.9);
  transition: .5s ease;
}

.topichome-header-btn:hover,
.topichome-header-btn.topichome-header-btn-active {
  color: #ffffff;
  transition-delay: .5s;
}

.topichome-header-btn-active {
  border-radius: 10px;
  transition: .5s ease;
  background-color: rgb(255, 97, 97);
}

.topichome-header-btn:hover::before,
.topichome-header-btn.topichome-header-btn-active::before {
  width: 100%;
}

.topichome-header-btn::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  border-radius: 10px;
  background-color: rgba(255, 154, 154, 0.8);
  transition: .4s ease;
  z-index: -1;
}

.topichome-header-btn:hover::after,
.topichome-header-btn.topichome-header-btn-active::after {
  height: 100%;
  transition-delay: 0.4s;
  color: aliceblue;
}
</style>