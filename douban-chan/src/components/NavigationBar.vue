<template>
      <div class="search-wrapper">
         <!-- Logo -->
        <div class="logo-wrapper">
          <img src="../img/logo.png" class="logo-img">
        </div>
        <!-- 菜单 -->
        <div class="menu-wrapper">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="#545c64"
            active-text-color="#ffd04b">
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="filmHome">电影</el-menu-item>
            <el-menu-item index="bookHome">图书</el-menu-item>
            <el-menu-item index="topicHome">话题</el-menu-item>
            <el-menu-item index="groupHome">小组</el-menu-item>
          </el-menu>
        </div>
        <!-- 搜索输入框 -->
        <div class="search-input-wrapper">
            <el-select v-model="selectedOption" placeholder="全部" @change="handleSelectChange" :style="{ width: '100px' }">
                <el-option label="全部" value="all"></el-option>
                <el-option label="电影" value="movie"></el-option>
                <el-option label="图书" value="book"></el-option>
                <el-option label="话题" value="topic"></el-option>
                <el-option label="小组" value="group"></el-option>
            </el-select>
            <el-input
                v-model="state"
                placeholder="请输入内容"
                @keyup.enter="search"
                suffix-icon="el-icon-search"
                :style="{ width: '500px', marginRight: '20px' }"
            ></el-input>
        </div>
        <!-- 登录/登出 -->
        <div class="avatar-wrapper" @click="login">
          <el-avatar :size="40"  @error="errorHandler">
            <img src="../img/qq.jpg"/>
          </el-avatar>
        </div>
      </div>
</template>

<script>
const src = require('../img/logo.png')
export default {
    data() {
        return {
            activeIndex: "home",
            state: '',//搜索用的key，传给后端
            selectedOption: '全部',
        };
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
            this.$router.push('/login')
        }
    },
}
</script>
<style scoped>
.search-wrapper {
    display: flex;
    align-items: center;
    padding: 20px 40px;
    background-color: #f5f5f5;
}

.logo-wrapper {
    margin-right: 30px;
}

.logo-img {
    height: 30px;
}

.menu-wrapper {
    display: flex;
    justify-content: space-between;
    flex: 1;
}

.search-input-wrapper {
    flex: 2;
}

.avatar-wrapper {
    margin-left: auto;
}
.el-menu-demo {
  display: flex;
  width: 600px;
}
.el-menu-demo .el-menu-item {
  flex: 1;
  text-align: center;
}
</style>