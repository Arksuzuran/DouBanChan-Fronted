<template>
    <div class="user-home-block">
        <div class="user-home-left-block">
            <div style="margin-top: 5px;"></div>
            <div class="user-home-like">
                <span class="user-home-text">我的订阅</span>
                <div class="user-home-like-list">
                    <SubscribeCard v-for="subscribe in subscribes" :key="subscribe.m_id" :subscribe="subscribe">
                    </SubscribeCard>
                </div>
                <el-divider></el-divider>
            </div>
            <div class="user-home-group">
                <span class="user-home-text">我的小组</span>
                <div class="user-home-group-list">
                    <GroupCard v-for="group in groupList" :key="group.groupId" :group="group">
                    </GroupCard>
                </div>
                <el-divider></el-divider>
            </div>
            <div class="user-home-like">
                <span class="user-home-text">我的帖子</span>
                <div class="user-home-collect-list">
                    <PostCard v-for="post in postList" :key="post.postId" :info="post" :from="'g'" :notShowTopped="true"
                        :notShowIcongroup="true" />
                </div>
                <el-divider></el-divider>
            </div>

        </div>
        <div class="user-home-right-block">
            <div class="user-home-info" @click="skipSetting">
                <div class="card" style="--rating:90">
                    <div class="icon"><i class="fa-solid fa-user" style="color: #ff7e29;"></i></div>
                    <div class="title">Did <span style="color: #4f7eff;">{{ userId }}</span></div>
                    <p class="sex">性别 <span style="color: #4f7eff;">{{ userSex }}</span> &nbsp&nbsp&nbsp&nbsp 生日 <span
                            style="color: #4f7eff;">{{ userBirthday }}</span></p>
                    <a class="link">修改资料</a>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CollectionCard from '../../components/CollectionCard.vue';
import PostCard from '../../components/post/PostCard.vue';
import GroupCard from '@/components/group/GroupCard.vue';
import SubscribeCard from '../../components/SubscribeCard.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
export default {
    components: {
        CollectionCard,
        PostCard,
        GroupCard,
        SubscribeCard,
    },
    data() {
        return {
            postList: [],
            groupList: [],
            subscribes: [
                {
                    id: 1,
                    name: '斗破苍穹',
                    class: 'book',
                    image: require('../../assets/conroy_img/snake.jpg'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
                {
                    id: 2,
                    name: '斗破苍穹迦南学院',
                    class: 'film',
                    image: require('../../assets/conroy_img/doupo.png'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
                {
                    id: 3,
                    name: '偶像梦想祭',
                    class: 'book',
                    image: require('../../assets/conroy_img/OM.jpg'),
                    text: '为什么ta会出现在这儿，只有你知道',
                    star: '朔间零 北斗',
                },
                {
                    id: 4,
                    name: '只狼 影逝二度',
                    class: 'book',
                    image: require('../../assets/conroy_img/shadowdie.jpg'),
                    text: '不死斩,斩灭不死,为了大日本帝国而战！',
                    star: '狼 弦一郎 苇名一心',
                },
                {
                    id: 5,
                    name: '斗破苍穹',
                    class: 'film',
                    image: require('../../assets/conroy_img/snake.jpg'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
            ]
        }
    },
    methods: {
        ...mapActions('groupAbout', ['getGroupListSearchOnline', 'getGroupListOnline', 'getGroupListByHotOnline', 'getGroupListMineOnline', 'getGroupInfoOnline', 'getGroupListSearchOnline']),
        getGroupListOnline() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                }),
                url: "/user/get_self_group/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log('成功获取我的小组', res.data)
                    //给groupList赋值
                    this.groupList = res.data.groups
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
        getSubscribesOnline() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                }),
                url: "/user/user_collection_media/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data)
                    this.subscribes = res.data;
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
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
                    console.log('成功获取我的帖子', res.data)
                    //给postList赋值
                    this.postList = res.data.posts
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
        skipSetting() {
            this.$router.push({
                path: '/' + 'userHome/setting',
            });
        }
    },
    mounted() {
        this.getSubscribesOnline();
        this.getGroupListOnline();
        this.getPostListOnline();
        // this.groupList = this.getGroupListOnline();
    },
    computed: {
        ...mapState('userAbout', ['userId', 'userBirthday', 'userSex']),
    },
};
</script>
  
<style scoped>
.user-home-block {
    width: 100%;
    /* height: 800px; */
    margin-top: 10px;
    border-radius: 5px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
}

.user-home-left-block {
    width: 77%;
    /* height: 800px; */
    margin-top: 10px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-home-right-block {
    cursor: pointer;
    position: absolute;
    margin-left: 66%;
    width: 18%;
    margin-top: 10px;
    border-radius: 5px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-home-left-block>div {
    margin-top: 10px;
    margin-bottom: 10px;
}

.user-home-like {
    width: 95%;
    /* background-color: black; */
    display: flex;
    align-items: left;
    flex-direction: column;
}

.user-home-text {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
}

.user-home-like-list {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 在一行中放置两列 */
    gap: 30px;
}

.user-home-collect {
    width: 95%;
    /* background-color: black; */
    display: flex;
    align-items: left;
    flex-direction: column;
}

.user-home-collect-list {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    /* 在一行中放置两列 */
    gap: 15px;
}

.user-home-group {
    width: 95%;
    /* background-color: black; */
    display: flex;
    align-items: left;
    flex-direction: column;
}

.user-home-group-list {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 在一行中放置两列 */
    gap: 15px;
}

.card {
    --background: #fff;
    --cardShadow: rgba(32, 33, 37, .1);
    --cardShadowHover: rgba(32, 33, 37, .06);
    --cardShadowActive: rgba(32, 33, 37, .55);
    --cardBorder: #dbdce0;
    --cardBorderActive: #1a73e8;
    --textColor: #202125;
    --linkColor: #1967d2;
    --ratingColor: #faab00;
}

@media (prefers-color-scheme: dark) {
    .card {
        --background: #3c4043;
        --cardShadow: rgba(0, 0, 0, .28);
        --cardShadowHover: rgba(0, 0, 0, .16);
        --cardShadowActive: rgba(0, 0, 0, .55);
        --cardBorder: #202125;
        --cardBorderActive: #8ab4f8;
        --textColor: #e9eaee;
        --linkColor: #8ab4f8;
    }
}

.card {
    width: 260px;
    background: var(--background);
    color: var(--textColor);
    border: 1px solid var(--cardBorder);
    padding: 25px;
    box-shadow: 8px 8px 0 var(--cardShadow);
    transition: box-shadow .5s, transform .5s;
    border-radius: 8px;
    display: inline-block;
}

.card:hover {
    transform: translate(-2px, -4px);
    box-shadow: 16px 16px 0 var(--cardShadowHover);
}

.card:active {
    transform: translate(-2px, -4px);
    border: 2px solid var(--cardBorderActive);
    box-shadow: 4px 4px 0 var(--cardShadowActive);
}

.card>.icon,
.card>.title,
.card>.sex {
    margin-bottom: 0.7em;
    cursor: default;
    user-select: none;
}

.card>.title {
    margin-top: 1.5em;
    font-weight: bold;
}

.card>.sex {
    line-height: 1.5em;
    min-height: 2em;
}

.card>.icon {
    font-size: 3em;
    margin-bottom: .2em;
}


.card>.link {
    margin-bottom: 1rem;
    color: var(--linkColor);
    font-size: .8em;
    font-weight: 600;
}

/* Optional ~ Link the whole card */
.card>.link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.card>.link:after {
    content: "↗";
    display: inline-block;
    margin-left: .3em;
    transition: transform .3s ease-in-out;
}

.card:hover>.link:after {
    transform: translate(.2em, -.2em);
}
</style>