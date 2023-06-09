<template>
    <div class="group-backgroud-container">
        <div class="group-main-container">

            <!-- 小组简介头栏 -->
            <div class="group-header-container">
                <!-- 背景头图 -->
                <img :src="groupInfo.groupHeadBgUrl" class="header-background-image" />

                <!-- 小组头像 -->
                <img :src="groupInfo.groupAvatarImgUrl" class="group-header-avatar" />

                <!-- 小组名称 -->
                <div class="group-header-name header-blur-container">
                    {{ groupInfo.groupName }}
                </div>

                <!-- 小组下部信息 -->
                <div class="group-header-intro-container header-blur-container"></div>
                <!-- 小组简介 -->
                <div class="group-header-intro header-blur-container">
                    <div class="group-header-introbox">{{ groupInfo.groupIntro }}</div>
                </div>

                <!-- 小组帖子数 -->
                <div class="group-header-postn header-blur-container">
                    {{ '帖子 | ' + groupInfo.groupPostNumber }}
                </div>
                <!-- 小组关注数 -->
                <div class="group-header-follown header-blur-container">
                    {{ '关注 | ' + groupInfo.groupFollowNumber }}
                </div>

                <!-- 小组右侧关注按钮和申请管理员按钮 -->
                <div class="group-header-button-group">
                    <button :class="joinButtonClass" @click="joinGroup" v-if="isLogin">{{ groupInfo.userInGroup ? '退出小组' : '加入小组'
                    }}</button>
                    <button :class="applyButtonClass" @click="applyForAdmin" v-if="isLogin && groupInfo.userInGroup"><i class="fa-solid fa-user-group"
                            v-if="groupInfo.userIsAdmin"></i>{{ groupInfo.userIsAdmin ? '管理员' : '申请管理员'
                            }}</button>
                </div>
            </div>

            <!-- 二级导航菜单 -->
            <el-menu :default-active="activeIndex" class="sec-nav" mode="horizontal" @select="handleSelect"
                active-text-color="#FC5B81">
                <el-menu-item index="groupPostList">看帖</el-menu-item>
                <el-menu-item index="groupGoodPostList">精华</el-menu-item>
                <el-menu-item index="groupTopicList">小组话题</el-menu-item>
                <el-menu-item index="groupAdminMatterList" v-if="groupInfo.userIsAdmin">管理员事务</el-menu-item>
                <!-- <el-menu-item index="groupMemberList">小组成员</el-menu-item> -->
            </el-menu>

            <!-- 当前页面展示内容 -->
            <!-- 对于默认路由 应该直接传递进postList作为参数 -->
            <div class="group-content-container">
                <router-view :postList="inPostList" :topicList="topicList" title1="小组参与的话题" top="64" :groupInfo="groupInfo"
                    :msgList="msgList"></router-view>
            </div>
        </div>
        <!-- 发帖上拉框 -->
        <div v-if="isLogin && showPostCreateBar">
            <PostCreateBar :groupInfo="groupInfo" v-if="isLogin && groupInfo.userInGroup"></PostCreateBar>
        </div>

        <!-- 滚动至顶部 -->
        <ScrollToTopButton class="scrollbutton" v-if="showPostCreateBar"></ScrollToTopButton>
    </div>
</template>

<script>
import qs from 'qs'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostCreateBar from '@/components/post/PostCreateBar.vue';
import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue';

export default {
    name: 'GroupPage',
    components: {
        PostCreateBar,
        ScrollToTopButton,
    },
    data() {
        return {
            activeIndex: 'groupPostList',
            msgList: [],
            id: '',
        }
    },
    methods: {
        ...mapActions('groupAbout', ['createGroupOnline', 'joinGroupOnline', 'applyAdminOnline']),
        joinGroup() {
            if (!this.groupInfo.userInGroup) {
                this.$confirm('是否确定加入小组?加入小组后即可在小组内发表帖子。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                }).then(() => {
                    this.joinGroupOnline({
                        groupId: this.groupInfo.groupId,
                        userId: this.userId,
                        is: true,
                    })
                    this.getData(this.id)
                    this.$message.success('您已成功加入小组!');
                    this.groupInfo.userInGroup = !this.groupInfo.userInGroup
                }).catch(() => {
                    this.$message.error('已取消操作');
                });
            }
            else {
                this.$confirm('是否确定退出小组？您仍然可以再次加入该小组', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                }).then(() => {
                    this.joinGroupOnline({
                        groupId: this.groupInfo.groupId,
                        userId: this.userId,
                        is: false,
                    })
                    this.getData(this.id)
                    this.$message.success('您已退出小组');
                    this.groupInfo.userInGroup = !this.groupInfo.userInGroup
                }).catch(() => {
                    this.$message.error('已取消操作');
                });
            }

        },
        applyForAdmin() {
            if (!this.groupInfo.userIsAdmin) {
                this.$prompt('申请理由', '申请成为管理员', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    console.log(value)
                    this.applyAdminOnline({
                        groupId: this.groupInfo.groupId,
                        userId: this.userId,
                        text: value,
                        is: true,
                    })
                    this.$message.success('请求已提交!请等待管理员审核');
                }).catch(() => {
                    this.$message.info('已取消操作');
                });
                // this.$confirm('是否确定申请小组管理员?您的申请需要等待小组管理员同意。', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     // type: 'warning',
                // }).then(() => {
                //     this.applyAdminOnline({
                //         groupId: this.groupInfo.groupId,
                //         userId: this.userId,
                //         is: true,
                //     })

                //     this.$message.success('请求已提交!');
                //     this.groupInfo.userIsAdmin = !this.groupInfo.userIsAdmin
                // }).catch(() => {
                //     this.$message.error('已取消操作');
                // });
            }
            else {
                this.$confirm('是否确定卸任小组管理员?该操作无法撤回。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                }).then(() => {
                    this.applyAdminOnline({
                        groupId: this.groupInfo.groupId,
                        userId: this.userId,
                        is: false,
                    })
                    this.$message.success('操作成功');
                    this.groupInfo.userIsAdmin = !this.groupInfo.userIsAdmin
                }).catch(() => {
                    this.$message.info('已取消操作');
                });
            }

        },
        //选中二级导航栏
        handleSelect(index) {
            this.activeIndex = index
            // 看帖
            if (this.activeIndex == 'groupPostList') {
                this.$router.push({
                    name: 'group',
                    query: {
                        groupId: this.groupInfo.groupId
                    },
                })
            }
            // 精华帖
            else if (this.activeIndex == 'groupGoodPostList') {
                console.log('试图访问精华帖，当前精华帖列表：', this.getGoodPostList())
                this.$router.push({
                    name: 'group',
                    query: {
                        groupId: this.groupInfo.groupId
                    },
                })
            }
            else {
                this.$router.push({
                    name: index,
                    query: {
                        groupId: this.groupInfo.groupId
                    },
                })
            }
        },
        // 根据路径决定导航栏的显示
        updateLabelByRoute() {
            if (this.$route.path == '/group') {
                this.activeIndex = "groupPostList";
            }
            else if (this.$route.path == '/group' && this.$route.query) {
                this.activeIndex = "groupGoodPostList";
            }
            else if (this.$route.path == '/group/postList') {
                this.activeIndex = "groupTopicList";
            }
            else if (this.$route.path == '/group/admin') {
                this.activeIndex = "groupAdminMatterList";
            }
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
        async getData(id) {
            // 从后端获取数据
            try {
                // 小组信息
                await this.getGroupInfoOnline({
                    userId: this.userId,
                    groupId: id,
                });
                // 展示的帖子列表
                await this.getPostListByGroupIdOnline({
                    userId: this.userId,
                    groupId: id,
                });
                // 小组参与的话题列表
                await this.getTopicListByGroupIdOnline({
                    groupId: id,
                });
                // 加载当前小组的管理员事务
                await this.$axios({
                    method: "post",
                    data: qs.stringify({
                        g_id: id,
                    }),
                    url: "group/query_apply/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log('加载当前小组的管理员事务成功', res)
                        this.msgList = res.data.li
                    })
                    .catch((err) => {
                        this.$message.error("网络出错");
                    });
            } catch (err) {
                this.$message.error('网络错误')
            }
        },
        //获取话题列表
        ...mapActions('topicAbout', ['getTopicListSearchOnline', 'getTopicListOnline', 'getTopicListByHotOnline', 'getTopicListMineOnline', 'getTopicInfoOnline', 'getTopicListByGroupIdOnline', 'getTopicListSearchOnline']),
        //获取帖子列表 或者一个完整的帖子
        ...mapActions('postAbout', ['getPostListSearchOnline', 'getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline', 'getPostListMineOnline', 'getPostOnline', 'getPostListSearchOnline']),
        //获取小组列表    
        ...mapActions('groupAbout', ['getGroupListSearchOnline', 'getGroupListOnline', 'getGroupListByHotOnline', 'getGroupListMineOnline', 'getGroupInfoOnline', 'getGroupListSearchOnline', 'getAdminMatterOnline']),
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),

        ...mapGetters('postAbout', ['postList']),
        ...mapGetters('topicAbout', ['topicList']),
        ...mapGetters('groupAbout', ['groupInfo']),
        showPostCreateBar() {
            return this.$route.name == 'group' || this.$route.name == 'groupTopicList'
        },
        joinButtonClass() {
            return this.groupInfo.userJoined ? 'group-header-button-selected' : 'group-header-button-unselected';
        },
        applyButtonClass() {
            return this.groupInfo.userIsAdmin ? 'group-header-button-selected' : 'group-header-button-unselected';
        },
        //要传递的帖子列表
        inPostList() {
            if (!this.postList) {
                return []
            }
            if (this.activeIndex == 'groupPostList') {
                return this.postList.slice()
            }
            else if (this.activeIndex == 'groupGoodPostList') {
                return this.getGoodPostList()
            }
            else {
                return []
            }
        },
    },

    mounted() {
        // 监听PostCreateBar的创建帖子事件，在事件回调中将新帖子添加到列表
        this.$bus.$on('postCreated', (newPost) => {
            this.postList.push(newPost);
            console.log('用户发帖成功：', newPost)
        });
        this.id = this.$route.query.groupId ? this.$route.query.groupId : this.$route.params.groupId

        this.getData(this.id)
        console.log('已收到路由传递的小组id', this.id)

        this.updateLabelByRoute()

        if(this.$route.params.join){
            this.joinGroup()
        }
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
    width: 75%;
}

.group-header-container {
    position: relative;
    border-radius: 5px;
    width: 100%;
    height: 350px;
}

/* 小组头图 */
.header-background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    background-color: rgba(252, 248, 248, 0.6);
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
    height: 60px;
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

    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 600px;
    max-height: 63px;
}

/* 小组关注数 */
.group-header-follown {
    /* 位置 */
    position: absolute;
    right: 40px;
    bottom: 20px;
    border-radius: 5px;
    /* 高度 */
    height: 42px;
    min-width: 80px;
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
    right: 150px;
    bottom: 20px;
    border-radius: 5px;
    height: 42px;
    min-width: 80px;
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
    right: 26px;
    bottom: 100px;
    border-radius: 5px;
    height: 34px;
}


.group-header-button-selected {
    width: 120px;
    /* 背景 边界 阴影 */
    background-color: rgb(254, 224, 224, 0.8);
    border: 2px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 7px;
    margin: 10px;
    /* 字体 */
    font-size: 17px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
    transition: .5s ease;
}

.group-header-button-unselected {
    width: 120px;
    /* 背景 边界 阴影 */
    background-color: rgba(252, 236, 236, 0.6);
    border: 2px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 7px;
    margin: 10px;
    /* 字体 */
    font-size: 17px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
    transition: .5s ease;
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

/* 滚动至顶部 */
.scrollbutton {
    position: fixed;
    bottom: 150px;
    right: 20px;
}
</style>