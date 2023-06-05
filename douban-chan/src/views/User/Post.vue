<template>
    <div class="post-list-block">
        <div style="margin-top: 5px;"></div>
        <div class="post-list">
            <span class="post-list-text">我的贴子</span>
            <div class="post-list-for-switch">
                <PostCard v-for="post in postList" :key="post.postId" :info="post" :from="'g'" :notShowTopped="true"
                    :notShowIcongroup="true" />
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from '../../components/post/PostCard.vue';
export default {
    components: {
        PostCard,
    },
    data() {
        return {
            postList: [],
        }
    },
    methods: {
        getPostListOnline() {
            return [
                {
                    postId: 'p001',
                    lzId: '004',
                    lzName: "bochi",
                    lzImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:57',
                    title: "我发游戏，你来打分",
                    text: "0狗都不玩 1乏善可陈 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
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
                    isGoodPost: false,
                    group: 'Game' //来自的小组
                },
                {
                    postId: 'p002',
                    lzId: '001',
                    lzName: "羽毛笔",
                    lzImageUrl: require('../../assets/user-image-1.jpg'),
                    date: '2023-5-19 23:11',
                    title: "理性讨论 软件工程基础和OS哪一个更精品",
                    text: "压到真题了，主人奴隶问题：三个主人十个奴隶，在交易市场，主人可以通过窗口写入购买协议，奴隶可以查阅，请完成该问题的同步与互斥问题（基于异性主人奴隶问题的简化，无需性别互斥）",
                    postImageUrlList: [require('../../assets/user-bg-3.jpg'), require('../../assets/group-img-2.jpg'),],
                    topic: 'BUAA',
                    visits: 5959261,
                    fav: 20200,
                    comments: 692,
                    like: 59412,
                    dislike: 59,
                    isTopped: false,
                    isGoodPost: true,
                    group: '北京航空航天大学' //来自的小组
                },
                {
                    lzId: '002',
                    lzName: "Chino",
                    lzImageUrl: require('../../assets/user-image-8.jpg'),
                    date: '2023-5-02 22:47',
                    title: "黑坤巴精神",
                    text: "回来吧科比黑曼巴，我最骄傲的信仰，历历在目的球场，眼泪莫名在流淌，🤙依稀记得24🤙，🧟还有给力的八号🧟，把对手全都给打退，🚁就算坠机也不死🚁",
                    postImageUrlList: [require('../../assets/group-img-6.jpg'), require('../../assets/group-img-7.jpg')],
                    topic: '科比',
                    visits: 59515,
                    fav: 642,
                    comments: 41,
                    like: 595,
                    dislike: 0,
                    isTopped: false,
                    isGoodPost: false,
                    group: '牢大'       //来自的小组
                },
            ]
        },
    },
    mounted() {
        this.postList = this.getPostListOnline();
    },
}
</script>

<style scoped>
.post-list-block {
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.post-list-block>div {
    margin-top: 10px;
    margin-bottom: 10px;
}

.post-list {
    width: 95%;
    margin-left: 1.9%;
    background-color: transparent;
    display: flex;
    align-items: left;
    flex-direction: column;
}

.post-list-text {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
}


.post-list-for-switch {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    /* 在一行中放置两列 */
    gap: 15px;
}
</style>