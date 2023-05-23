<template>
  <div>
    <!-- <navigation-bar></navigation-bar> -->
    <!-- <nav-bar></nav-bar> -->
    <div class="userhome-bg">
      <div class="userhome-container">

        <!-- 头图部分 -->
        <div class="header-container">
          <!-- 背景头图 -->
          <img :src="userHeadUrl" class="header-background-image" />
          <!-- 头像与签名 -->
          <div class="header-user-info">
            <img :src="userImgUrl" class="header-user-avatar" />
            <div class="header-user-details">
              <div class="header-user-nickname-wrapper">
                <p class="header-user-nickname">{{ userName }}</p>
              </div>
              <p class="header-user-signature">{{ userSignature }}</p>
            </div>
          </div>
        </div>

        <!-- 二级导航菜单 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="userpageHome">主页</el-menu-item>
          <el-menu-item index="userpageFavlist">收藏</el-menu-item>
          <el-menu-item index="userpageSubscribe">订阅</el-menu-item>
          <el-menu-item index="userpageGroup">小组</el-menu-item>
          <el-menu-item index="userpagePost">我的帖子</el-menu-item>
          <el-menu-item index="userpageMessage">消息</el-menu-item>
        </el-menu>

        <!-- 二级主页 -->
        <div class="body-container">
          <router-view></router-view>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import NavigationBar from '../components/NavigationBar.vue';
import NavBar from '../components/NavBar.vue'
export default {
  name: 'UserHomeView',
  data() {
    return {
      //Header
      //头图设置
      userHeadUrl: require("../assets/user-bg-2.jpg"),
      //用户签名
      userSignature: "你好，我是羽毛笔。",

      //二级导航栏当前选中的菜单项
      activeIndex: '',
    };
  },
  computed: {
    //头像路径与用户名
    ...mapState('userAbout', ['userName', 'userImgUrl']),
  },
  methods: {
    //选中二级导航栏
    handleSelect(index) {
      //选中不同的菜单项时才更新
      if (this.activeIndex != index) {
        this.$router.push({
          name: index,
        })
      }
      //更新当前菜单项
      this.activeIndex = index
    },
  },
  components: {
    NavigationBar,
    NavBar,
  }
};
</script>

<style>
.userhome-bg {
  background-color: #f3f8fe;
}

.userhome-container {
  margin: 0 8% 0 8%;
}

.body-container {
  background-color: #ffffff;
}

.el-menu-demo {
  font-size: 18px;
}

.header-container {
  position: relative;
  border-radius: 5px;
  width: 100%;
  height: 500px;
}

.header-background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-user-info {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 20px;
  box-sizing: border-box;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.header-user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.header-user-details {
  display: flex;
  align-items: center;
}

.header-user-nickname-wrapper {
  display: flex;
  align-items: center;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  /* 调整昵称背景色透明度 */
  border-radius: 5px;
  /* 添加圆角 */
  padding: 5px;
  /* 调整昵称背景色内边距 */
}

.header-user-nickname {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.header-user-signature {
  margin: 0 0 0 10px;
  font-size: 16px;
  color: #fff;
}
</style>
