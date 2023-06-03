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
      <!-- 左部三级导航栏 -->
      <div class="topichome-left-container">
        <ContentSizerSideNavBar :labelList="leftLabelList"></ContentSizerSideNavBar>
      </div>
      <!-- 中部页面的主要内容 -->
      <div class="topichome-mid-container">
        <router-view :postList="inPostList" :topicList="hotTopicList"></router-view>
      </div>
      <!-- 右部页面的主要内容 -->
      <div class="topichome-right-container">
        <GroupList :groupList="inGroupList" title="正在热议的小组" DIYCardComponentName="GroupCardWithTopic"></GroupList>
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
        { id: 0, label: '浏览发现', name:'topicHome' },
        { id: 1, label: '今日热榜', name:'todaysHot' },
        { id: 2, label: '话题广场', name:'topicSquare' },
      ],

      // 对应当前二级路由页面的筛选标签
      activeLeftLabel: 0,
      // 侧边三级导航栏 筛选信息
      leftLabelList: [
        { id: 0, label: '精选' },
        { id: 1, label: '生活' },
        { id: 2, label: '文化', },
        { id: 3, label: '影视' },
        { id: 4, label: '图书' },
        { id: 5, label: '学习' },
        { id: 6, label: '美食' },
        { id: 7, label: '摄影' },
        { id: 8, label: '时尚' },
        { id: 9, label: '游戏' },
        { id: 10, label: '二刺螈' },
        { id: 11, label: '我的话题' },
      ],

      // 帖子列表
      postList: [],
      // 小组列表
      groupList: [],
      // 热榜话题列表
      hotTopicList: [],
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
      this.$router.push({
        name: this.topLabelList[index].name
      })
    },

    updateLabelByRoute(){
      if(this.$route.path == '/topicHome'){
        this.activeTopLabel = 0;
      }
      else if(this.$route.path == '/topicHome/todaysHot'){
        this.activeTopLabel = 1;
      }
      else{
        this.activeTopLabel = 2;
      }
    },
    // 处理二级导航选择事件 当前选中的是哪个标签
    handleSelect2(index) {
      console.log(index)
      console.log('用户点击左侧导航栏标签', this.leftLabelList[index].label)
      this.activeLeftLabel = index
    },

    // 更新被选中标签的属性
    getActiveButtonClass(index) {
      if (this.activeTopLabel === index) {
        return 'topichome-header-btn-active'
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
          lzId: '004',    //发帖人id
          lzName: "bochi",    //发帖人昵称
          lzImageUrl: require('../../assets/user-image-7.jpg'),   //发帖人头像路径
          date: '2023-5-19 23:57',    //发帖时间
          title: "我发游戏，你来打分",    //帖子标题
          text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",//帖子1楼内容
          postImageUrlList: [require('../../assets/group-img-3.png'),//帖子1楼图片
          require('../../assets/group-img-4.png'),
          require('../../assets/group-img-5.jpg')],
          topic: '游戏',//帖子所属的话题
          topicId: 't001',//帖子所属的话题的id
          visits: 946126,//帖子的浏览量
          fav: 15612,//帖子的收藏数
          comments: 1692,//帖子的评论数
          like: 214512,//帖子的点赞数
          dislike: 456,//帖子的点踩数
          isTopped: true,//帖子在当前小组内是否置顶
          isGoodPost: false,//帖子在当前小组内是否是精华帖
          //如果该小组不来自于一个小组 那么下面的字段均填 ''
          groupName: 'Game', //来自的小组的名称
          groupId: 'ofokowfjdowjdowj',//来自的小组的id
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
          topicId: 't002',//帖子所属的话题的id
          visits: 5959261,
          fav: 20200,
          comments: 692,
          like: 59412,
          dislike: 59,
          isTopped: false,
          isGoodPost: true,
          //如果该小组不来自于一个小组 那么下面的字段均填 ''
          groupName: 'BUAA', //来自的小组的名称
          groupId: '111111',//来自的小组的id
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
          topicId: 't003',//帖子所属的话题的id
          visits: 59515,
          fav: 642,
          comments: 41,
          like: 595,
          dislike: 0,
          isTopped: false,
          isGoodPost: false,
          //如果该小组不来自于一个小组 那么下面的字段均填 ''
          groupName: '黑坤巴', //来自的小组的名称
          groupId: 'laodalaoda',//来自的小组的id
        },
      ]
    },

    // 命名规则：与后端交互相关的函数都带有Online
    // 获得小组列表groupLIst
    // 此处的小组列表需要额外属性：aboutTopic:{topicId, topicName, topicAvatarUrl}
    // 即该小组是因为参与了这个话题 才被推送上来的
    getGroupListOnline() {
      //一个中括号是一个数组
      return [
        //一个大括号是一个对象，对应一个小组
        {
          groupId: 'g001',
          groupHeadBgUrl: require('../../assets/user-image-7.jpg'),//小组头图路径
          groupAvatarImgUrl: require('../../assets/group-avatar-1.jpg'),//小组头像路径
          groupName: "集美小组集美小组集美小组",//小组名称
          //小组简介
          groupIntro: "家人们谁懂啊，咱就是说一整个无语住了，一把子大动作给到了，今天又是在逃公主的一天，九敏九敏真的太好哭了吧，下头男",
          //小组标签
          tagList: ['生活', '文化'],
          //小组帖子数量
          groupPostNumber: 321,
          //小组关注者数量
          groupFollowNumber: 594,
          //小组是因为这个话题才被推荐上来的
          //如果前端在请求话题主页的推荐小组列表 那么该字段需要填写
          aboutTopic: { topicId: 't001', topicName: '游戏', topicAvatarUrl: require('../../assets/topic-avatar-1.jpg') },
          //当前用户是否是管理员
          userIsAdmin: true,
          //当前用户是否是组员
          userInGroup: true,
        },
        {
          groupId: 'g002',
          groupHeadBgUrl: require('../../assets/user-bg-4.jpg'),
          groupAvatarImgUrl: require('../../assets/group-avatar-2.jpg'),
          groupName: "coding小组",
          groupIntro: "编程爱好者聚集地. Hell, word!",
          tagList: ['生活', '游戏', '文化'],
          groupPostNumber: 597,
          groupFollowNumber: 792,
          aboutTopic: { topicId: 't001', topicName: '游戏', topicAvatarUrl: require('../../assets/topic-avatar-1.jpg') },
          //当前用户是否是管理员
          userIsAdmin: false,
          //当前用户是否是组员
          userInGroup: true,

        },
        {
          groupId: 'g003',
          groupHeadBgUrl: require('../../assets/group-img-8.jpg'),
          groupAvatarImgUrl: require('../../assets/group-avatar-3.jpg'),
          groupName: "蔚蓝档案小组",
          groupIntro: "在阿拜多斯，你可以不活，但不能没有活",
          tagList: ['游戏'],
          groupPostNumber: 1367,
          groupFollowNumber: 59521,
          aboutTopic: { topicId: 't002', topicName: 'BUAA', topicAvatarUrl: require('../../assets/topic-avatar-2.jpg') },
          //当前用户是否是管理员
          userIsAdmin: false,
          //当前用户是否是组员
          userInGroup: false,

        },
      ]
    },
    getHotTopicListOnline(){
      return [
        {
          topicId: 't001', 
          topicName: '游戏', 
          topicAvatarUrl: require('../../assets/topic-avatar-1.jpg'),
          topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
          visit: 159512,
          post: 9591,
          date: '2023-5-19 23:57',    //发帖时间
        },
        {
          topicId: 't002', 
          topicName: 'BUAA', 
          topicAvatarUrl: require('../../assets/group-img-1.jpg'),
          topicIntro: '北京航空航天大学（Beihang University）简称“北航”，位于首都北京市，是中华人民共和国工业和信息化部直属的全国重点大学，中央直管高校， [89] 位列国家“双一流”、“985工程”、“211工程”重点建设高校',
          visit: 9891,
          post: 217,
          date: '2023-6-01 23:57',    //发帖时间
        },
        {
          topicId: 't003', 
          topicName: '科比', 
          topicAvatarUrl: require('../../assets/user-image-3.jpg'),
          topicIntro: '牢大，我想你了',
          visit: 46218,
          post: 1678,
          date: '2023-5-29 45:57',    //发帖时间
        },
        {
          topicId: 't004', 
          topicName: '天使降临到我身边', 
          topicAvatarUrl: require('../../assets/user-image-6.jpg'),
          topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
          visit: 131312,
          post: 2122,
          date: '2023-6-04 05:54',    //发帖时间
        },
        {
          topicId: 't005', 
          topicName: '无封面测试', 
          topicAvatarUrl: '',
          topicIntro: '北京航空航天大学（Beihang University）简称“北航”，位于首都北京市，是中华人民共和国工业和信息化部直属的全国重点大学，中央直管高校， [89] 位列国家“双一流”、“985工程”、“211工程”重点建设高校',
          visit: 2191,
          post: 531,
          date: '2023-6-03 11:54',    //发帖时间
        },
        {
          topicId: 't006', 
          topicName: '人工智能给我滚出特雷森！', 
          topicAvatarUrl: require('../../assets/user-image-9.jpg'),
          topicIntro: '柳叶掌',
          visit: 59291,
          post: 4747,
          date: '2023-6-04 11:54',    //发帖时间
        },
        {
          topicId: 't007', 
          topicName: '六一八游戏本真全是答辩吧', 
          topicAvatarUrl: require('../../assets/topic-avatar-2.jpg'),
          topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
          visit: 94511,
          post: 211,
          date: '2023-6-04 17:54',    //发帖时间
        },
        {
          topicId: 't008', 
          topicName: '您必须立刻睡觉', 
          topicAvatarUrl: require('../../assets/group-img-4.png'),
          topicIntro: '北京航空航天大学（Beihang University）简称“北航”，位于首都北京市，是中华人民共和国工业和信息化部直属的全国重点大学，中央直管高校， [89] 位列国家“双一流”、“985工程”、“211工程”重点建设高校',
          visit: 2121,
          post: 341,
          date: '2023-6-04 03:54',    //发帖时间
        },
        {
          topicId: 't009', 
          topicName: '来点涩图兄弟们', 
          topicAvatarUrl: require('../../assets/user-image-2.jpg'),
          topicIntro: '我身体很好，全都可以发给我',
          visit: 46578,
          post: 2121,
          date: '2023-6-04 04:54',    //发帖时间
        },
        {
          topicId: 't010', 
          topicName: '你喜欢郊游吗', 
          topicAvatarUrl: require('../../assets/group-img-3.png'),
          topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
          visit: 14256,
          post: 8676,
          date: '2023-6-04 07:54',    //发帖时间
        },
      ]
    },
  },

  computed: {
    // 要传递的小组列表
    inGroupList() {
      // 筛选我的小组
      // 该功能应该由后端实现 此处只是假筛选
      if (this.activeTopLabel == 6) {
        let list = []
        for (let group of this.groupList) {
          for (let member of group.memberList) {
            if (member.userId === this.userId) {
              list.push(group)
              break
            }
          }
        }
        return list
      }
      else {
        return this.groupList
      }
    },


    //要传递的帖子列表
    inPostList() {
      // if (this.activeTopLabel == 0) {
      //   return this.postList.slice()
      // }
      // else if (this.activeTopLabel == 1) {
      //   return this.getGoodPostList()
      // }
      // return []
      return this.postList.slice()
    },
    // 用户是否选中了'我的小组'
    // 用户是否选择‘我的小组’标签
    // 这里姑且以字符串来比较 因为后面大概率改id顺序
    usersGrouplabelChoosen() {
      return this.topLabelList[this.activeTopLabel].label == '我的小组'
    },

    //头像路径与用户名
    //引入vuex的userAbout模块里的 state变量
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
  },

  mounted() {
    // 获取数据
    this.postList = this.getPostListOnline()
    this.groupList = this.getGroupListOnline()
    this.hotTopicList = this.getHotTopicListOnline()

    // 监听GroupCreateBar的创建小组事件，在事件回调中将新小组添加到列表
    this.$bus.$on('groupCreated', (newGroup) => {
      this.groupList.push(newGroup);
      console.log('用户创建小组成功：', newGroup)
    });
    // 二级导航栏选中
    this.$bus.$on('leftNavChanged', (index) => {
      this.activeLeftLabel = index
      console.log('用户改变二级导航：', index)
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