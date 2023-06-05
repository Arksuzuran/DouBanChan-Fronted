<template>
  <div>
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
          <el-menu-item index="userpageHome"><i class="fa-solid fa-house" style="color: #ffab66;"></i> 主页</el-menu-item>
          <el-menu-item index="userpageFavlist"><i class="fa-solid fa-heart" style="color: #ff3e29;"></i>
            收藏</el-menu-item>
          <el-menu-item index="userpageSubscribe"><i class="fa-solid fa-bookmark" style="color: #ff9e9e;"></i>
            订阅</el-menu-item>
          <el-menu-item index="userpageGroup"><i class="fa-solid fa-user-group" style="color: #8ac2ff;"></i>
            小组</el-menu-item>
          <el-menu-item index="userpagePost"><i class="fa-solid fa-comment" style="color: #70ff7a;"></i>
            我的帖子</el-menu-item>
          <el-menu-item index="userpageMessage"><i class="fa-solid fa-message" style="color: #e08aff;"></i>
            消息</el-menu-item>
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
export default {
  name: 'UserHomeView',
  data() {
    return {
      //Header
      //头图设置
      userHeadUrl: require("../assets/conroy_img/OM.jpg"),
      //用户签名
      userSignature: "你好，我是羽毛笔。",
    };
  },
  methods: {
    //选中二级导航栏
    handleSelect(index) {
      this.$router.push({
        name: index,
      })
    },
  },
  computed: {
    //头像路径与用户名
    ...mapState('userAbout', ['userName', 'userImgUrl']),
    activeIndex() {
      const currentRoute = this.$route.path;
      if (currentRoute === '/userHome/home') {
        return 'userpageHome';
      } else if (currentRoute === '/userHome/favlist') {
        return 'userpageFavlist';
      } else if (currentRoute === '/userHome/subscribe') {
        return 'userpageSubscribe';
      } else if (currentRoute === '/userHome/group') {
        return 'userpageGroup';
      } else if (currentRoute === '/userHome/post') {
        return 'userpagePost';
      } else if (currentRoute === '/userHome/message') {
        return 'userpageMessage';
      }
    }
  },
  components: {

  }
};
</script>

<style scoped>
.userhome-bg {
  background-color: #f3f8fe;
}

.userhome-container {
  margin: 0 8% 0 8%;
}

.body-container {
  background-color: transparent;
}

.el-menu-demo {
  font-size: 18px;
}

.header-container {
  position: relative;
  border-radius: 5px;
  width: 100%;
  height: 250px;
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
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 5px;
  box-sizing: border-box;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
}

.header-user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.header-user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50px;
}

.header-user-nickname-wrapper {
  display: flex;
  margin-right: 80px;
  background-color: rgba(255, 255, 255, 0.3);
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
  color: #000000;
}

.header-user-signature {
  font-size: 16px;
  color: #170f0f;
}
</style>
