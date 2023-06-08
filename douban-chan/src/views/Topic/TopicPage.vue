<!-- 话题版块详情页 -->
<template>
    <div class="topic-backgroud-container">
        <div class="topic-main-container">

            <!-- 话题简介头栏 -->
            <div class="topic-header-container">
                <!-- 背景头图 -->
                <img :src="topicInfo.topicHeadBgUrl" class="header-background-image" />

                <!-- 话题头像 -->
                <img :src="topicInfo.topicAvatarUrl" class="topic-header-avatar" />

                <!-- 话题名称 -->
                <div class="topic-header-name header-blur-container">
                    #{{ topicInfo.topicName }}#
                </div>

                <!-- 话题下部信息 -->
                <div class="topic-header-intro-container header-blur-container"></div>
                <!-- 话题简介 -->
                <div class="topic-header-intro header-blur-container">
                    <div class="topic-header-introbox">{{ topicInfo.topicIntro }}</div>
                </div>

                <!-- 话题帖子数 -->
                <div class="topic-header-postn header-blur-container">
                    {{ '帖子 | ' + topicInfo.post }}
                </div>
                <!-- 话题关注数 -->
                <div class="topic-header-follown header-blur-container">
                    {{ '关注 | ' + topicInfo.follow }}
                </div>

                <!-- 话题右侧关注按钮 -->
                <div class="topic-header-button-topic">
                    <button :class="joinButtonClass" @click="jointopic">{{ topicInfo.userInTopic ? '退出话题' : '加入话题'
                    }}</button>
                </div>
            </div>

            <!-- 当前页面展示内容 -->
            <!-- 对于默认路由 应该直接传递进postList作为参数 -->
            <div class="topic-content-container">
                <router-view :inPostList="postList" :inTopicList="topicList"></router-view>
            </div>
        </div>
        <!-- 发帖上拉框 -->
        <div v-if="isLogin && showPostCreateBar">
            <PostCreateBar :topicInfo="topicInfo"></PostCreateBar>
        </div>
        <!-- 滚动至顶部 -->
        <ScrollToTopButton v-if="showPostCreateBar" class="scrollbutton"></ScrollToTopButton>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import TopicPostList from './TopicPostList.vue'
import GroupHomePostList from '../Group/GroupHomePostList.vue'
import TopicHotList from '@/components/topic/TopicHotList.vue'
import PostCreateBar from '@/components/post/PostCreateBar.vue'
import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue'

export default {
    name: 'TopicPage',
    components: {
        TopicPostList,
        GroupHomePostList,
        TopicHotList,
        PostCreateBar,
        ScrollToTopButton,
    },
    data() {
        return {
            topicId: '',
        }
    },
    methods: {
        jointopic() {
            if (!this.topicInfo.userInTopic) {
                this.$confirm('是否确定加入话题?加入话题后即可在话题内发表帖子。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                }).then(() => {
                    this.joinTopicOnline({
                        topicId: this.topicInfo.topicId,
                        userId: this.userId,
                        is: true,
                    })
                    this.getData(this.topicId)
                    this.$message.success('您已成功加入话题!');
                    this.topicInfo.userInTopic = !this.topicInfo.userInTopic
                }).catch(() => {
                    this.$message.error('已取消操作');
                });
            }
            else {
                this.$confirm('是否确定退出话题？您仍然可以再次加入该话题。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning',
                }).then(() => {
                    this.joinTopicOnline({
                        topicId: this.topicInfo.topicId,
                        userId: this.userId,
                        is: false,
                    })
                    this.getData(this.topicId)
                    this.$message.success('您已退出话题');
                    this.topicInfo.userInTopic = !this.topicInfo.userInTopic
                }).catch(() => {
                    this.$message.error('已取消操作');
                });
            }
        },
        // 由此从后端请求数据
        async getData(id) {
            try {
                await this.getPostListByTopicIdOnline({
                    userId:  this.userId,
                    topicId: id,
                });
                await this.getTopicListByHotOnline({
                    userId:  this.userId,
                    tag: '',
                });
                await this.getTopicInfoOnline({
                    userId:  this.userId,
                    topicId: id,
                });
            } catch (err) {
                this.$message.error('网络错误')
            }
        },
        //获取话题列表    
        ...mapActions('topicAbout', ['getTopicListOnline', 'getTopicListByHotOnline']),
        //获取帖子列表
        ...mapActions('postAbout', ['getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline']),
        //获取小组列表    
        ...mapActions('groupAbout', ['getGroupListOnline', 'getGroupListByHotOnline']),
        ...mapActions('topicAbout', ['createTopicOnline', 'joinTopicOnline', 'getTopicInfoOnline']),
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        ...mapGetters('postAbout', ['postList']),
        ...mapGetters('topicAbout', ['topicList', 'topicInfo']),
        ...mapGetters('groupAbout', ['groupList']),
        showPostCreateBar() {
            return this.$route.name == 'topic'
        },
        joinButtonClass() {
            return this.topicInfo.userJoined ? 'topic-header-button-selected' : 'topic-header-button-unselected';
        },
        applyButtonClass() {
            return this.topicInfo.userIsAdmin ? 'topic-header-button-selected' : 'topic-header-button-unselected';
        },
    },
    mounted() {
        // 监听PostCreateBar的创建帖子事件，在事件回调中将新帖子添加到列表
        this.$bus.$on('postCreated', (newPost) => {
            // this.postList.push(newPost);
            console.log('用户发帖成功：', newPost)
        });

        this.topicId = this.$route.query.topicId ? this.$route.query.topicId : this.$route.params.topicId

        console.log('已收到路由传递的话题id', this.topicId)
        this.getData(this.topicId)
    },
}
</script>

<style scoped>
.sec-nav {
    font-size: 18px;
    font-weight: 700;
}

.topic-backgroud-container {
    background-color: #FCF7F9;
}

.topic-main-container {
    background-color: #FCF7F9;
    margin: 0 auto;
    width: 75%;
}

.topic-header-container {
    position: relative;
    border-radius: 5px;
    width: 100%;
    height: 350px;
}

/* 话题头图 */
.header-background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 话题头像 */
.topic-header-avatar {
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

/* 话题名称 */
.topic-header-name {
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

/* 话题简介的外容器 */
.topic-header-intro-container {
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

/* 话题简介 */
.topic-header-intro {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    width: 87%;
    left: 190px;
    bottom: 12px;
    border-radius: 5px;
    height: 55px;
    background-color: rgba(240, 240, 240, 0.5);
}

.topic-header-introbox {
    margin-left: 2%;
    margin-right: 300px;
    text-align: left;
    /* width: 75%; */
    /* 字体 */
    font-size: 14px;
    color: rgba(5, 5, 5, 0.9);
}

/* 话题关注数 */
.topic-header-follown {
    /* 位置 */
    position: absolute;
    right: 30px;
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

/* 话题帖子数 */
.topic-header-postn {
    position: absolute;
    right: 160px;
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

.topic-header-button-topic {
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


.topic-header-button-selected {
    width: 120px;
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

.topic-header-button-unselected {
    width: 120px;
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

.topic-header-button-unselected:hover,
.topic-header-button-selected:hover {
    background-color: rgba(255, 158, 158, 0.8);
    border: 2px solid rgba(253, 160, 160, 0.8);
}

.topic-content-container {
    background-color: rgb(255, 255, 255);
    margin: 20px 0 0 0;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-flow: row;
}

.topic-left-container {
    flex: 5;
}

.topic-right-container {
    flex: 2;
}

/* 滚动至顶部 */
.scrollbutton {
    position: fixed;
    bottom: 150px;
    right: 20px;
}
</style>
