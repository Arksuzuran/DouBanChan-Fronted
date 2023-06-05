<!-- 帖子页面 -->
<template>
    <div class="post-main-container">
        <!-- 顶栏 -->
        <div class="post-top-container">
            <!-- 功能部分 -->
            <div class="post-top-option-container">
                <!-- 左侧 -->
                <!-- 排序部分 -->
                <PostSortLabel></PostSortLabel>
                <!-- 只看楼主 -->
                <OnlySelectButton class="post-OnlyLz-button" labelName="楼主" eventName="setOnlyLz"></OnlySelectButton>
                <!-- 右侧 -->
                <!-- 来自小组 和 举报按钮 -->
                <div class="postcard-buttongroup">
                    <PostTopicButton :info="postInfo"></PostTopicButton>
                    <PostOperateButton :info="postInfo"  v-if="postInfo.userIsAdmin || postInfo.userIsLz"></PostOperateButton>
                    <PostReportButton :info="postInfo"></PostReportButton>
                </div>
            </div>
            <!-- 标题部分 -->
            <div class="post-top-title-container">
                <div class="post-top-title">
                    {{ postInfo.title }}
                </div>
            </div>
        </div>

        <!-- 楼层列表 -->
        <div class="postlist-container">
            <PostFloor v-for="floor in activeFloorList" :key="floor.textId" :info="floor"
                :lz="floor.userId == postInfo.lzId" :post="postInfo"></PostFloor>
        </div>

        <!-- 右下角悬浮框 -->
        <!-- 回帖悬浮框 -->
        <PostReplyBar :postInfo="postInfo" class="post-replybar"></PostReplyBar>
        <!-- 点赞点踩收藏悬浮框 -->
        <LikeFavButtonGroup :info="postInfo" class="post-likefav-buttongroup"></LikeFavButtonGroup>
        <!-- 滚动至顶部 -->
        <ScrollToTopButton class="post-likefav-scrollbutton"></ScrollToTopButton>
    </div>
</template>

<script>
import PostSortLabel from '@/components/post/PostSortLabel.vue'
import OnlySelectButton from '@/components/post/button/OnlySelectButton.vue'
import PostReportButton from '@/components/post/button/PostReportButton.vue';
import PostTopicButton from '@/components/post/button/PostTopicButton.vue';
import PostFloor from '@/components/post/PostFloor.vue';
import PostReplyBar from '@/components/post/PostReplyBar.vue';
import LikeFavButtonGroup from '@/components/post/button/LikeFavButtonGroup.vue';
import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue';
import PostOperateButton from '@/components/post/button/PostOperateButton.vue';

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'Post',
    components: {
        PostSortLabel,
        OnlySelectButton,
        PostTopicButton,
        PostReportButton,
        PostFloor,
        PostReplyBar,
        LikeFavButtonGroup,
        ScrollToTopButton,
        PostOperateButton,
    },
    methods: {
        // 向楼层列表里加入楼中楼回复
        insertCommentIntoFloor(newReply, textId) {
            for (let floor of this.floorList) {
                if (floor.textId === textId) {
                    floor.childFloorList.push(newReply)
                    console.log('楼层被回复：', textId)
                    break;
                }
            }
        },
        // 向楼层列表里加入回复
        insertFloorIntoFloor(newReply) {
            // 注意：在此加入楼层信息
            newReply.floor = this.floorList.length + 1
            this.floorList.push(newReply)
        },
        //获取帖子列表 或者一个完整的帖子
        ...mapActions('postAbout', ['getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline', 'getPostOnline']),
    },
    computed: {
        ...mapGetters('postAbout', ['postInfo']),
        //筛选出当前的列表内容和顺序
        activeFloorList() {
            let list = this.postInfo.floorList

            //只看楼主
            if (this.onlyLz) {
                list = list.filter(item => {
                    return item.userId == this.postInfo.lzId
                })
            }
            //热度排序 除1楼外，点赞数大的在前面
            if (this.activeLabel === 1) {
                list = list.slice(1)
                list.sort((a, b) => {
                    return b.like - a.like
                }).unshift(this.postInfo.floorList[0])
            }
            //时间排序 时间小的在前面
            else if (this.activeLabel === 2) {
                list.sort((a, b) => {
                    return a.date - b.date
                })
            }
            console.log(list)
            return list
        },
    },
    data() {
        return {
            // 是否只看楼主
            onlyLz: false,
            // 当前排序方式 1热度 2时间
            activeLabel: 1,
        }
    },
    mounted() {
        let id = this.$route.query.postId ? this.$route.query.postId : this.$route.params.postId
        console.log('已收到路由传递的帖子id', id)
        // 从后端获取数据
        this.getPostOnline(id)

        //监听“只看楼主”改变的事件
        this.$bus.$on('setOnlyLz', (onlyLz) => {
            this.onlyLz = onlyLz
            console.log('是否筛选楼主发言已修改', onlyLz)
        })

        // 监听PostSortLabel的改变排序方式事件，重新加载postList
        this.$bus.$on('sortChanged', (index) => {
            this.activeLabel = index;
            console.log('排序方式已经改变：', index)
        })

        // 监听CommentReplyInputBox的创建回复事件，在事件回调中向服务器发送请求
        // this.$bus.$on('commentReplyCreated', (newReply, textId) => {
        //     this.insertCommentIntoFloor(newReply, textId)
        // })

        // 监听PostReplyInputBox的创建回复事件，在事件回调中向服务器发送请求
        // this.$bus.$on('postReplyCreated', (newReply) => {
        //     this.insertFloorIntoFloor(newReply)
        // })
    },
    beforeDestroy() {
        //卸载监听
        this.$bus.$off('setOnlyLz')
        this.$bus.$off('sortChanged')
        this.$bus.$off('commentReplyCreated')
        this.$bus.$off('postReplyCreated')
    },
}
</script>

<style scoped>
/* 顶栏sticky部分容器 */
.post-top-container {
    position: sticky;
    top: 68px;
    background-color: rgb(255, 255, 255);
    z-index: 10;
}

/* 选项横条容器 */
.post-top-option-container {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: center;
    margin: 10px;
}

/* 标题横条容器 */
.post-top-title-container {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: center;
    margin: 0 40px 0 40px;
    background-color: rgb(254, 223, 223);
    height: 40px;
}

/* 帖子标题 */
.post-top-title {
    font-size: 20px;
    font-weight: 600;
    color: rgb(63, 63, 63);
    margin-left: 17px;
}

/* 只看楼主 */
.post-OnlyLz-button {
    margin: 2px 7px 0 7px;
}

/* 顶栏按钮组 */
.postcard-buttongroup {
    position: absolute;
    top: 1px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

/* 帖子列表的容器 */
.postlist-container {
    margin: 0 40px;
    background-color: rgb(255, 249, 249);
}

/* 右下角回帖按钮 */
.post-replybar {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

/* 右下角悬浮按钮组 */
.post-likefav-buttongroup {
    position: fixed;
    bottom: 150px;
    right: 20px;
}

.post-likefav-scrollbutton {
    position: fixed;
    bottom: 350px;
    right: 20px;
}
</style>