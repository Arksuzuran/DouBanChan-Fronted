<template>
    <div class="group-backgroud-container">
        <navigation-bar></navigation-bar>
        <div class="group-main-container">

            <!-- 小组简介头栏 -->
            <div class="group-header-container">
                <!-- 背景头图 -->
                <img :src="groupHeadBgUrl" class="header-background-image" />

                <!-- 小组头像 -->
                <img :src="groupAvatarImgUrl" class="group-header-avatar" />

                <!-- 小组名称 -->
                <div class="group-header-name header-blur-container">
                    {{ groupName }}
                </div>

                <!-- 小组下部信息 -->
                <div class="group-header-intro-container header-blur-container"></div>
                <!-- 小组简介 -->
                <div class="group-header-intro header-blur-container">
                    <div class="group-header-introbox">{{ groupIntro }}</div>
                </div>

                <!-- 小组帖子数 -->
                <div class="group-header-postn header-blur-container">
                    {{ '帖子 | ' + groupPostNumber }}
                </div>
                <!-- 小组关注数 -->
                <div class="group-header-follown header-blur-container">
                    {{ '关注 | ' + groupFollowNumber }}
                </div>

                <!-- 小组右侧关注按钮和申请管理员按钮 -->
                <div class="group-header-button-group">
                    <button :class="joinButtonClass" @click="joinGroup">{{ userJoined ? '退出' : '关注' }}</button>
                    <button :class="applyButtonClass" @click="applyForAdmin">{{ userIsAdmin ? '解除管理员' : '申请管理员' }}</button>
                </div>
            </div>

            <!-- 二级导航菜单 -->
            <el-menu :default-active="activeIndex" class="sec-nav" mode="horizontal" @select="handleSelect"
                active-text-color="#FC5B81">
                <el-menu-item index="groupPostList">看帖</el-menu-item>
                <el-menu-item index="groupGoodPostList">精华</el-menu-item>
                <el-menu-item index="groupTopicList">小组话题</el-menu-item>
                <el-menu-item index="groupIntro">小组简介</el-menu-item>
            </el-menu>

            <!-- 当前页面展示内容 -->
            <div class="group-content-container">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import NavigationBar from '../../components/NavigationBar.vue'

export default {
    name: 'GroupPage',
    components: {
        NavigationBar,
    },
    data() {
        return {
            groupHeadBgUrl: require("../../assets/user-bg-2.jpg"),
            groupAvatarImgUrl: require("../../assets/group-avatar-1.jpg"),
            groupName: '我是小组名称',
            groupIntro: '我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介。',
            groupFollowNumber: 165949,
            groupPostNumber: 49526148,
            userJoined: false,
            userIsAdmin: false,
            activeIndex: 'groupPostList',
        }
    },
    methods: {
        joinGroup() {
            this.userJoined = !this.userJoined
        },
        applyForAdmin() {
            this.userIsAdmin = !this.userIsAdmin
        },
        //选中二级导航栏
        handleSelect(index) {
            //选中不同的菜单项时才更新
            if (this.activeIndex == 'groupPostList') {
                this.$router.push({
                    name: 'group',
                })
            }
            else if (this.activeIndex == 'groupGoodPostList') {
                this.$router.push({
                    name: 'group',
                })
            }
            else{
                this.$router.push({
                    name: index,
                })
            }
            //更新当前菜单项
            this.activeIndex = index
        },
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin']),
        joinButtonClass() {
            return this.userJoined ? 'group-header-button-selected' : 'group-header-button-unselected';
        },
        applyButtonClass() {
            return this.userIsAdmin ? 'group-header-button-selected' : 'group-header-button-unselected';
        },
    },
    mounted(){
        // this.$router.push({
        //     name: 'groupPostList',
        // })
    },
}
</script>

<style scoped>
.sec-nav {
    font-size: 18px;
    font-weight: 700;
}

.group-backgroud-container {
    background-color: #FCF7F9;
}

.group-main-container {
    background-color: #FCF7F9;
    margin: 0 auto;
    width: 80%;
}

.group-header-container {
    position: relative;
    border-radius: 5px;
    width: 100%;
    height: 350px;
}

/* 小组头像 */
.group-header-avatar {
    position: absolute;
    left: 15px;
    bottom: 15px;
    width: 150px;
    height: 150px;
    border-radius: 2px;
    margin-right: 10px;
    /* 边框 */
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    z-index: 5;
}

/* 模糊背景 */
.header-blur-container {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    background-color: rgba(250, 250, 250, 0.6);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
}

/* 小组名称 */
.group-header-name {
    position: absolute;
    left: 190px;
    bottom: 85px;
    border-radius: 5px;
    padding: 3px 20px 3px 20px;
    /* 字体 */
    font-size: 28px;
    font-weight: bold;
    color: rgba(5, 5, 5, 0.9);
}

/* 小组简介的外容器 */
.group-header-intro-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40%;
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: 0;
}

/* 小组简介 */
.group-header-intro {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    width: 85%;
    left: 190px;
    bottom: 12px;
    border-radius: 5px;
    height: 55px;
    background-color: rgba(240, 240, 240, 0.5);
}
.group-header-introbox {
    margin-left: 2%;
    margin-right: 300px;
    text-align: left;
    /* width: 75%; */
    /* 字体 */
    font-size: 14px;
    color: rgba(5, 5, 5, 0.9);
}

/* 小组关注数 */
.group-header-follown {
    /* 位置 */
    position: absolute;
    right: 20px;
    bottom: 21px;
    border-radius: 5px;
    /* 高度 */
    height: 24px;
    /* 背景 边界 阴影 */
    background-color: rgba(255, 249, 249, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    padding: 5px;
    /* 字体 */
    font-size: 14px;
    color: rgba(49, 49, 49, 0.9);
}

/* 小组帖子数 */
.group-header-postn {
    position: absolute;
    right: 140px;
    bottom: 21px;
    border-radius: 5px;
    height: 24px;
    /* 背景 边界 阴影 */
    background-color: rgba(255, 249, 249, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    padding: 5px;
    /* 字体 */
    font-size: 14px;
    color: rgba(49, 49, 49, 0.9);
}

.group-header-button-group {
    /* 弹性布局 设置子按钮的位置 */
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;

    /* 在父元素的位置 */
    position: absolute;
    right: 15px;
    bottom: 100px;
    border-radius: 5px;
    height: 24px;
}


.group-header-button-selected {
    /* 背景 边界 阴影 */
    background-color: rgb(254, 224, 224, 0.8);
    border: 2px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 7px;
    margin: 10px;
    /* 字体 */
    font-size: 14px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.group-header-button-unselected {
    /* 背景 边界 阴影 */
    background-color: rgba(252, 236, 236, 0.6);
    border: 2px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 7px;
    margin: 10px;
    /* 字体 */
    font-size: 14px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.group-header-button-unselected:hover,
.group-header-button-selected:hover {
    background-color: rgba(255, 158, 158, 0.8);
    border: 2px solid rgba(253, 160, 160, 0.8);
}

.group-content-container {
    background-color: rgb(255, 255, 255);
    margin: 0 auto;
    margin-top: 20px;
}
</style>