<template>
  <div class="search-wrapper">
    <!-- Logo -->
    <div class="logo-wrapper">
      <img src="../assets/conroy_img/logo.png" class="logo-img">
    </div>
    <!-- 菜单 -->
    <div class="menu-wrapper">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        text-color="#545c64" active-text-color="#ffd04b">
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="videoHome">影视</el-menu-item>
        <el-menu-item index="bookHome">图书</el-menu-item>
        <el-menu-item index="topicHome">话题</el-menu-item>
        <el-menu-item index="groupHome">小组</el-menu-item>
      </el-menu>
    </div>
    <!-- 搜索输入框 -->
    <div class="search-input-wrapper">
      <el-select v-model="selectedOption" placeholder="全部" @change="handleSelectChange" :style="{ width: '100px' }">
        <el-option label="全部" value="all"></el-option>
        <el-option label="影视" value="video"></el-option>
        <el-option label="图书" value="book"></el-option>
        <el-option label="话题" value="topic"></el-option>
        <el-option label="小组" value="group"></el-option>
      </el-select>
      <el-input v-model="state" placeholder="请输入内容" @keyup.enter="search" suffix-icon="el-icon-search"
        :style="{ width: '400px', marginRight: '20px' }"></el-input>
    </div>
    <!-- 登录/登出 -->
    <div class="avatar-wrapper" @click="login">
      <!-- 已登录则显示头像 -->
      <el-avatar :size="40" @error="errorHandler" v-if="isLogin" :src="userImgUrl"></el-avatar>
      <!-- 未登录则显示“未登录” -->
      <el-avatar :size="40" @error="errorHandler" v-if="!isLogin">未登录</el-avatar>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const src = require('../assets/conroy_img/logo.png')
export default {
  data() {
    return {
      activeIndex: "home",
      state: '',//搜索用的key，传给后端
      selectedOption: '全部',
    };
  },
  computed: {
    //头像路径与用户名
    //引入vuex的userAbout模块里的 state变量
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin']),
  },
  methods: {
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
    search() {
      console.log('Perform search with keyword:', this.state, 'in category:', this.selectedOption);
    },
    errorHandler() {
      return true
    },
    handleSelectChange(value, option) {
      this.selectedOption = option.label;
    },
    login() {
      if (this.isLogin) {
        this.$router.push('/userHome')
      }
      else {
        this.$router.push('/login')
      }

    }
  },
}
</script>
<style scoped>
.search-wrapper {
  display: flex;
  align-items: center;
  padding: 0px 0px;
  background-image: url('@/assets/conroy_img/bar.jpg');
  background-repeat: repeat-x;
  background-size: 100% auto;
}

.logo-wrapper {
  width: 200px;
  height: 120px;
  flex: 1;
}

.logo-img {
  height: 120px;
  width: 200px;
}

.menu-wrapper {
  border: none;
  flex: 2;
}

.search-input-wrapper {
  flex: 3;
}

.avatar-wrapper {
  margin-left: auto;
}

.el-menu-demo {
  justify-content: center;
  display: flex;
  background-color: transparent;
  border-bottom: 0px solid transparent;
  box-shadow: 0 0px 0 #F7CB83;
}

.el-menu-demo .el-menu-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  border-radius: 20px;
}

.el-menu-demo .el-menu-item.is-active,
.el-menu-demo .el-menu-item:hover {
  background-color: #f7cb83;
}


.centered-menu-item {
  text-align: right;
}

.el-menu-demo .el-menu-item::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background-color: #f7cb83;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.el-menu-demo .el-menu-item.is-active::before,
.el-menu-demo .el-menu-item:hover::before {
  opacity: 1;
}
</style>
