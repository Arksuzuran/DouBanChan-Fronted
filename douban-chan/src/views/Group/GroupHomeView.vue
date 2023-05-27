<!-- 小组主页 -->
<template>
  <div>
    <nav-bar-back-ground></nav-bar-back-ground>
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
        <GroupHomePostList :postList="inPostList"></GroupHomePostList>
      </div>
      <!-- 右部值得加入的小组 -->
      <div class="grouphome-right-container">
        <GroupList :groupList="groupList" :usersOwnGroup="usersGrouplabelChoosen"></GroupList>
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
      // 按钮展示信息
      buttons: [
        { id: 0, label: '精选' },
        { id: 1, label: '生活' },
        { id: 2, label: '文化', },
        { id: 3, label: '影视' },
        { id: 4, label: '图书' },
        { id: 5, label: '游戏' },
        { id: 6, label: '我的小组' },
      ],

      // 帖子列表
      postList: [],
      // 小组列表
      groupList: [],
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
    },
    // 更新被选中标签的属性
    getActiveButtonClass(index) {
      if (this.activeHeaderLabel === index) {
        return 'grouphome-header-btn-active'
      }
      return ''
    },
    // 返回精华帖列表
    getGoodPostList() {
      let goodPostList = []
      for (let post of this.postList) {
        if (post.isGoodPost) {
          goodPostList.push(post)
        }
      }
      return goodPostList
    },

    // 在此与后端交互
    // 在此与后端交互
    // 在此与后端交互

    // 命名规则：与后端交互相关的函数都带有Online
    // 获得帖子列表postLIst
    getPostListOnline() {
      return [
        {
          postId: 'p001',
          lzId: '004',
          lzName: "bochi",
          lzImageUrl: require('../../assets/user-image-7.jpg'),
          date: '2023-5-19 23:57',
          title: "我发游戏，你来打分",
          text: "0狗都不玩 1乏善可陈 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
          postImageUrlList: [require('../../assets/group-img-3.png'),
          require('../../assets/group-img-4.png'),
          require('../../assets/group-img-5.jpg')],
          topic: '游戏',
          visits: 946126,
          fav: 15612,
          comments: 1692,
          like: 214512,
          dislike: 456,
          isTopped: true,
          isGoodPost: false,
          group: 'Game' //来自的小组
        },
        {
          postId: 'p002',
          lzId: '001',
          lzName: "羽毛笔",
          lzImageUrl: require('../../assets/user-image-1.jpg'),
          date: '2023-5-19 23:11',
          title: "理性讨论 软件工程基础和OS哪一个更精品",
          text: "压到真题了，主人奴隶问题：三个主人十个奴隶，在交易市场，主人可以通过窗口写入购买协议，奴隶可以查阅，请完成该问题的同步与互斥问题（基于异性主人奴隶问题的简化，无需性别互斥）",
          postImageUrlList: [require('../../assets/user-bg-3.jpg'), require('../../assets/group-img-2.jpg'),],
          topic: 'BUAA',
          visits: 5959261,
          fav: 20200,
          comments: 692,
          like: 59412,
          dislike: 59,
          isTopped: false,
          isGoodPost: true,
          group: '北京航空航天大学' //来自的小组
        },
        {
          lzId: '002',
          lzName: "Chino",
          lzImageUrl: require('../../assets/user-image-8.jpg'),
          date: '2023-5-02 22:47',
          title: "黑坤巴精神",
          text: "回来吧科比黑曼巴，我最骄傲的信仰，历历在目的球场，眼泪莫名在流淌，🤙依稀记得24🤙，🧟还有给力的八号🧟，把对手全都给打退，🚁就算坠机也不死🚁",
          postImageUrlList: [require('../../assets/group-img-6.jpg'), require('../../assets/group-img-7.jpg')],
          topic: '科比',
          visits: 59515,
          fav: 642,
          comments: 41,
          like: 595,
          dislike: 0,
          isTopped: false,
          isGoodPost: false,
          group: '牢大'       //来自的小组
        },
      ]
    },

    // 命名规则：与后端交互相关的函数都带有Online
    // 获得小组列表groupLIst
    getGroupListOnline() {
      return [
        {
          groupId: 'g001',
          groupHeadBgUrl: require('../../assets/user-image-7.jpg'),
          groupAvatarImgUrl: require('../../assets/group-avatar-1.jpg'),
          groupName: "集美小组集美小组集美小组",
          groupIntro: "家人们谁懂啊，咱就是说一整个无语住了，一把子大动作给到了，今天又是在逃公主的一天，九敏九敏真的太好哭了吧，下头男",
          tagList: ['生活', '文化'],
          groupPostNumber: 321,
          groupFollowNumber: 594,
          memberList: [
            {
              userId: '001',
              userName: "羽毛笔",
              userImageUrl: require('../../assets/user-image-1.jpg'),
              isAdmin: false,
            },
            {
              userId: '004',
              userName: "bochi",
              userImageUrl: require('../../assets/user-image-7.jpg'),
              isAdmin: true,
            },
          ],
        },
        {
          groupId: 'g002',
          groupHeadBgUrl: require('../../assets/user-bg-4.jpg'),
          groupAvatarImgUrl: require('../../assets/group-avatar-2.jpg'),
          groupName: "coding小组",
          groupIntro: "编程爱好者聚集地",
          tagList: ['生活', '游戏', '文化'],
          groupPostNumber: 597,
          groupFollowNumber: 792,
          memberList: [
            {
              userId: '001',
              userName: "羽毛笔",
              userImageUrl: require('../../assets/user-image-1.jpg'),
              isAdmin: true,
            },
            {
              userId: '002',
              userName: "Chino",
              userImageUrl: require('../../assets/user-image-8.jpg'),
              isAdmin: true,
            },
            {
              userId: '003',
              userName: "_Karasu_",
              userImageUrl: require('../../assets/user-image-6.jpg'),
              isAdmin: false,
            },
            {
              userId: '004',
              userName: "bochi",
              userImageUrl: require('../../assets/user-image-7.jpg'),
              isAdmin: false,
            },
          ],
        },
      ]
    },
  },
  computed: {
    //要传递的帖子列表
    inPostList() {
      if (this.activeHeaderLabel == 0) {
        return this.postList.slice()
      }
      else if (this.activeHeaderLabel == 1) {
        return this.getGoodPostList()
      }
      else {
        return []
      }
    },
    // 用户是否选中了'我的小组'
    // 用户是否选择‘我的小组’标签
    // 这里姑且以字符串来比较 因为后面大概率改id顺序
    usersGrouplabelChoosen() {
      return this.buttons[this.activeHeaderLabel].label == '我的小组'
    },

    //头像路径与用户名
    //引入vuex的userAbout模块里的 state变量
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
  },

  mounted() {
    // 获取数据
    this.postList = this.getPostListOnline()
    this.groupList = this.getGroupListOnline()

    // 监听GroupCreateBar的创建小组事件，在事件回调中将新小组添加到列表
    this.$bus.$on('groupCreated', (newGroup) => {
      this.groupList.push(newGroup);
      console.log('用户创建小组成功：', newGroup)
    });
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