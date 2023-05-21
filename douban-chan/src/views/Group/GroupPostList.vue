<!-- 帖子列表页面 -->
<template>
    <div class="postlist-main-container">

        <!-- 顶部排序部分 -->
        <div class="postlist-sort-label-container">
            <PostSortLabel></PostSortLabel>
        </div>

        <!-- 帖子列表 -->
        <div class="postlist-container">
            <PostCard v-for="(post, index) in postList" :key="index" :info="post" :from="'g'"/>
        </div>

        <!-- 发帖上拉框 -->
        <div v-if="isLogin">
            <PostCreateBar></PostCreateBar>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostCard from '../../components/post/PostCard.vue'
import PostSortLabel from '../../components/post/PostSortLabel.vue'
import PostCreateBar from '../../components/post/PostCreateBar.vue';
export default {
    components: {
        PostCard,
        PostSortLabel,
        PostCreateBar,
    },
    data() {
        return {
            activeLabel: 1,
            // 帖子列表信息
            postList: [
                {
                    postId: 'p001',
                    lzId: '004',
                    lzName: "JDG-knight",
                    lzImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19',
                    title: "我发游戏，你来打分",
                    text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
                    postImageUrlList: [require('../../assets/group-img-3.png'),
                    require('../../assets/group-img-4.png'),
                    require('../../assets/group-img-5.jpg')],
                    topic: '游戏',
                    visits: 946126,
                    fav: 15612,
                    comments: 1692,
                    like: 12366,
                    dislike: 456,
                    isTopped: true,
                    isQualityPost: false,
                },
                {
                    postId: 'p002',
                    lzId: '001',
                    lzName: "羽毛笔",
                    lzImageUrl: require('../../assets/user-image-1.jpg'),
                    date: '2023-5-19  23:11',
                    title: "S13 MSI胜者组决赛 JDG 3:2 T1（其余打分贴删）",
                    text: "让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!让我们恭喜京东!",
                    postImageUrlList: [require('../../assets/group-img-6.jpg')],
                    topic: '2023 MSI',
                    visits: 5959261,
                    fav: 20200,
                    comments: 65692,
                    like: 214512,
                    dislike: 59,
                    isTopped: false,
                    isQualityPost: true,
                },
            ]
        }
    },
    methods: {

    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    mounted() {
        // 监听PostCreateBar的创建帖子事件，在事件回调中将新帖子添加到列表
        this.$bus.$on('postCreated', (newPost) => {
            this.postList.push(newPost);
            console.log('用户发帖成功：', newPost)
        });
        console.log('PostCardList已挂载事件postCreated监听');

        // 监听PostSortLabel的改变排序方式事件，在事件回调中重新向服务器请求帖子列表，并重新加载postList
        this.$bus.$on('sortChanged', (index) => {
            this.activeLabel = index;
            console.log('排序方式已经改变：', index)
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
    top: 0;
    background-color: rgb(255, 255, 255);
    z-index: 10;

    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: flex-start;
    margin: 10px;
}
</style>