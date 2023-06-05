<!-- 帖子列表页面 -->
<template>
    <div class="postlist-main-container">

        <!-- 顶部排序部分 -->
        <div class="postlist-sort-label-container">
            <PostSortLabel></PostSortLabel>
        </div>

        <!-- 帖子列表 -->
        <div class="postlist-container">
            <PostCard v-for="post in activePostList" :key="post.postId" :info="post" :from="'g'" :notShowFromGroup="true" />
        </div>

        <!-- 发帖上拉框 -->
        <div v-if="isLogin">
            <PostCreateBar></PostCreateBar>
        </div>

        <!-- 滚动至顶部 -->
        <ScrollToTopButton class="post-likefav-scrollbutton"></ScrollToTopButton>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostCard from '../../components/post/PostCard.vue'
import PostSortLabel from '../../components/post/PostSortLabel.vue'
import PostCreateBar from '../../components/post/PostCreateBar.vue';
import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue';

export default {
    props: ['postList'], //数据来源：组件GroupPost.vue
    components: {
        PostCard,
        PostSortLabel,
        PostCreateBar,
        ScrollToTopButton,
    },
    data() {
        return {
            activeLabel: 1,//1 热度排序 2 时间排序
        }
    },
    methods: {

    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),

        // 按照指定顺序筛选列表
        activePostList() {
            let list = this.postList.slice()
            //热度排序 点赞数大的在前面。特别地，置顶帖子优先
            if (this.activeLabel === 1) {
                list.sort((a, b) => {
                    if ((a.isTopped && b.isTopped) || (!a.isTopped && !b.isTopped)) {
                        return b.like - a.like
                    }
                    else {
                        return a.isTopped ? -1 : 1
                    }
                })
            }
            //时间排序 时间小的在前面。特别地，置顶帖子优先
            else if (this.activeLabel === 2) {
                list.sort((a, b) => {
                    if ((a.isTopped && b.isTopped) || (!a.isTopped && !b.isTopped)) {
                        return (a.date < b.date) ? -1 : 1
                    }
                    else {
                        return a.isTopped ? -1 : 1
                    }
                })
            }
            console.log(list)
            return list
        },
    },
    mounted() {
        // 监听PostSortLabel的改变排序方式事件，在事件回调中重新向服务器请求帖子列表，并重新加载postList
        this.$bus.$on('sortChanged', (index) => {
            this.activeLabel = index;
            console.log('排序方式已经改变：', index)
            console.log('2023-5-02 22:47' > '2023-5-19 23:11')
        })
        console.log('PostCardList已挂载事件sortChanged监听');
    },
    beforeDestroy() {
        //卸载监听
        this.$bus.$off('postCreated')
        this.$bus.$off('sortChanged')
    },
}
</script>

<style scoped>
/* 顶部选择按时间或者热度排序 */
.postlist-sort-label-container {
    position: sticky;
    top: 60px;
    /* top: 120px; */
    background-color: rgb(255, 255, 255);
    z-index: 10;

    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: flex-start;
    margin: 10px;
}

/* 滚动至顶部 */
.post-likefav-scrollbutton {
    position: fixed;
    bottom: 150px;
    right: 20px;
}
</style>