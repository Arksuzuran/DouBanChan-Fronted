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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
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
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                }),
                url: "/user/get_self_post/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data)
                    //给postList赋值
                    this.postList = res.data.posts
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    mounted() {
        this.getPostListOnline()
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