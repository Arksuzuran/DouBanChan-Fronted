<!-- 小组主页 -->
<template>
  <div>
    <!-- 背景色 -->
    <div class="grouphome-background"></div>

    <!-- 顶部二级导航栏 -->
    <div class="grouphome-header-container">
      <div class="grouphome-header-title">豆瓣小组酱</div>
      <!-- 按钮组 -->
      <div v-for="button in buttons" :key="button.id" class="grouphome-header-btn"
        :class="getActiveButtonClass(button.id)" @click="handleSelect(button.id)">
        {{ button.label }}
      </div>
    </div>

    <!-- 下部内容区 -->
    <div class="grouphome-main-container">
      <!-- 左部推荐的帖子 -->
      <div class="grouphome-left-container">
        <GroupHomePostList :postList="postList"></GroupHomePostList>
      </div>
      <!-- 右部值得加入的小组 -->
      <div class="grouphome-right-container">
        <GroupList :groupList="groupList" :title="groupListComponentsTitle"></GroupList>
      </div>
    </div>

    <!-- 右下角 悬浮框 -->
    <!-- 创建小组 -->
    <GroupCreateBar v-if="isLogin"></GroupCreateBar>
    <!-- 滚动至顶部 -->
    <ScrollToTopButton class="group-likefav-scrollbutton"></ScrollToTopButton>
  </div>
</template>

<script>

import GroupHomePostList from './GroupHomePostList.vue'
import NavBarBackGround from '@/components/NavBarBackGround.vue'
import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue'

import GroupList from '@/components/group/GroupList.vue'
import GroupCreateBar from '@/components/group/GroupCreateBar.vue'

// 在需要使用vuex的场合下引入vuex
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'GroupHomeView',
  components: {
    NavBarBackGround,
    ScrollToTopButton,

    GroupHomePostList,
    GroupList,
    GroupCreateBar,
  },
  data() {
    return {
      // 顶部筛选标签
      activeHeaderLabel: 0,
      tag: '',
      // 按钮展示信息
      buttons: [
        { id: 0, label: '精选', tag: '' },
        { id: 1, label: '生活', tag: '生活' },
        { id: 2, label: '文化', tag: '文化' },
        { id: 3, label: '影视', tag: '影视' },
        { id: 4, label: '图书', tag: '图书' },
        { id: 5, label: '学习', tag: '学习' },
        { id: 6, label: '我的小组', tag: '我的'},
      ],
    }
  },
  methods: {
    // 处理顶部标签选择事件 当前选中的是哪个标签
    handleSelect(index) {
      console.log(index)
      console.log('用户点击标签', this.buttons[index].label)
      // 如果重复选择某个标签 那么视为取消选中 则默认退回到“精选”标签下
      if (this.activeHeaderLabel == index) {
        this.activeHeaderLabel = 0
      }
      // 选择不重复的标签
      else {
        this.activeHeaderLabel = index
      }
      this.tag = this.buttons[index].tag
      this.updateData()
    },

    //重要！
    // 根据当前导航栏选择状态来更新数据
    updateData() {
      this.getPostListOnline(this.tag)
      this.getGroupListOnline(this.tag)
    },

    // 更新被选中标签的属性
    getActiveButtonClass(index) {
      if (this.activeHeaderLabel === index) {
        return 'grouphome-header-btn-active'
      }
      return ''
    },
    //获取帖子列表
    ...mapActions('postAbout', ['getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline']),
    //获取小组列表    
    ...mapActions('groupAbout', ['getGroupListOnline', 'getGroupListByHotOnline']),
  },
  computed: {
    // 根据用户是否选中了'我的小组' 来决定groupList组件的标题
    // 这里姑且以字符串来比较 因为后面大概率改id顺序
    groupListComponentsTitle() {
      return this.buttons[this.activeHeaderLabel].label == '我的小组' ? '我加入的小组' : '值得浏览的小组'
    },

    //头像路径与用户名
    //引入vuex的userAbout模块里的 state变量
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    ...mapGetters('postAbout', ['postList']),
    ...mapGetters('groupAbout', ['groupList']),
  },

  mounted() {
    // 获取数据
    this.updateData()

    // 监听GroupCreateBar的创建小组事件，在事件回调中将新小组添加到列表
    this.$bus.$on('groupCreated', (newGroup) => {
      // this.groupList.push(newGroup);
      console.log('用户创建小组成功：', newGroup)
    });
    console.log(this.groupList)
  },

}
</script>
  
<style scoped>
/* 内容区容器 */
/* 主容器 */
.grouphome-main-container {
  width: 80%;
  margin: 0 auto;
  background-color: rgb(255, 251, 251);

  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-flow: row wrap;
}

/* 内容区左侧容器 */
.grouphome-left-container {
  flex: 2;

}

.grouphome-right-container {
  flex: 1;
  margin: 0 35px;
}


/* 滚动至顶部 */
.group-likefav-scrollbutton {
  position: fixed;
  bottom: 150px;
  right: 20px;
}

/* 页面背景色 */
.grouphome-background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 248, 248);
  z-index: -1;
}

/* 顶部二级导航栏容器 */
.grouphome-header-container {
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
.grouphome-header-title {
  margin: 0 40px;
  font-size: 36px;
  font-weight: 700;
  color: rgba(255, 133, 133, 0.9);
}

/* 顶栏 筛选器 组件 */
/* === removing default button style ===*/
/* === removing default button style ===*/
/* 按钮基本样式 */
.grouphome-header-btn {
  margin: 0 10px;

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

.grouphome-header-btn::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: rgba(255, 66, 66, 0.9);
  transition: .5s ease;
}

.grouphome-header-btn:hover,
.grouphome-header-btn.grouphome-header-btn-active {
  color: #ffffff;
  transition-delay: .5s;
}

.grouphome-header-btn-active {
  border-radius: 10px;
  transition: .5s ease;
  background-color: rgb(255, 97, 97);
}

.grouphome-header-btn:hover::before,
.grouphome-header-btn.grouphome-header-btn-active::before {
  width: 100%;
}

.grouphome-header-btn::after {
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

.grouphome-header-btn:hover::after,
.grouphome-header-btn.grouphome-header-btn-active::after {
  height: 100%;
  transition-delay: 0.4s;
  color: aliceblue;
}
</style>