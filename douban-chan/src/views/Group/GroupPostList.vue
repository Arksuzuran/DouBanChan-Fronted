<!-- 帖子列表页面 -->
<template>
    <div class="postlist-main-container">

        <!-- 顶部排序部分 -->
        <div class="postlist-sort-label-container">
            <PostSortLabel></PostSortLabel>
        </div>

        <!-- 帖子列表 -->
        <div class="postlist-container">
            <PostCard v-for="post in activePostList" :key="post.postId" :info="post" :from="'g'"/>
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
            activeLabel: 1,//1 热度排序 2 时间排序
            // 帖子列表信息
            postList: [
                {
                    postId: 'p001',
                    lzId: '004',
                    lzName: "bochi",
                    lzImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:57',
                    title: "我发游戏，你来打分",
                    text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
                    postImageUrlList: [require('../../assets/group-img-3.png'),
                    require('../../assets/group-img-4.png'),
                    require('../../assets/group-img-5.jpg')],
                    topic: '游戏',
                    visits: 946126,
                    fav: 15612,
                    comments: 1692,
                    like: 214512,
                    dislike: 456,
                    isTopped: true,
                    isQualityPost: false,
                },
                {
                    postId: 'p002',
                    lzId: '001',
                    lzName: "羽毛笔",
                    lzImageUrl: require('../../assets/user-image-1.jpg'),
                    date: '2023-5-19 23:11',
                    title: "理性讨论 软件工程基础和OS哪一个更精品",
                    text: "压到真题了，主人奴隶问题：三个主人十个奴隶，在交易市场，主人可以通过窗口写入购买协议，奴隶可以查阅，请完成该问题的同步与互斥问题（基于异性主人奴隶问题的简化，无需性别互斥）",
                    postImageUrlList: [require('../../assets/user-bg-3.jpg'),require('../../assets/group-img-2.jpg'),],
                    topic: 'BUAA',
                    visits: 5959261,
                    fav: 20200,
                    comments: 692,
                    like: 59412,
                    dislike: 59,
                    isTopped: false,
                    isQualityPost: true,
                },
                {
                    lzId: '002',
                    lzName: "Chino",
                    lzImageUrl: require('../../assets/user-image-8.jpg'),
                    date: '2023-5-02 22:47',
                    title: "黑坤巴精神",
                    text: "回来吧科比黑曼巴，我最骄傲的信仰，历历在目的球场，眼泪莫名在流淌，🤙依稀记得24🤙，🧟还有给力的八号🧟，把对手全都给打退，🚁就算坠机也不死🚁",
                    postImageUrlList: [require('../../assets/group-img-6.jpg'),require('../../assets/group-img-7.jpg')],
                    topic: '科比',
                    visits: 59515,
                    fav: 642,
                    comments: 41,
                    like: 595,
                    dislike: 0,
                    isTopped: false,
                    isQualityPost: false,
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

        // 筛选列表顺序
        activePostList() {
            let list = this.postList.slice()
            //热度排序 点赞数大的在前面。特别地，置顶帖子优先
            if (this.activeLabel === 1) {
                list.sort((a, b) => {
                    if((a.isTopped && b.isTopped) || (!a.isTopped && !b.isTopped)){
                        return b.like - a.like
                    }
                    else{
                        return a.isTopped ? -1 : 1
                    }
                })
            }
            //时间排序 时间小的在前面。特别地，置顶帖子优先
            else if (this.activeLabel === 2) {
                list.sort((a, b) => {
                    if((a.isTopped && b.isTopped) || (!a.isTopped && !b.isTopped)){
                        return (a.date < b.date) ? -1 : 1
                    }
                    else{
                        return a.isTopped ? -1 : 1
                    }
                })
            }
            console.log(list)
            return list
        },
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