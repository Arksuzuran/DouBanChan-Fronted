<template>
    <div class="topic-group-module-block">
        <div class="topic-module">
            <el-container>
                <el-header style="margin-top: 20px;">
                    <div style="margin-left: 1%;">
                        <i class="fa-solid fa-comment topic-logo" style="color: #004ac2;"></i>
                        <div style="float: left; display: inline-block; margin-left: 5px;width:90%;">
                            <span
                                style="float: left;margin-left: 5px;font-size: 40px; font-weight: bold;color: #000000;">话题栏目</span>
                            <div class="topic-button-for-more">
                                <ButtonForMore></ButtonForMore>
                            </div>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <div class="topic-module-card-container">
                        <topic-card v-for="topic in topics" :key="topic.id" :topic="topic"
                            style="margin-bottom: 20px;"></topic-card>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="group-module">
            <el-container>
                <el-header style="margin-top: 20px;">
                    <div style="margin-left: 1%;">
                        <i class="fa-solid fa-user-group group-logo" style="color: #004ac2;"></i>
                        <div style="float: left; display: inline-block; margin-left: 5px;width:400px;">
                            <span
                                style="float: left;margin-left: 5px;font-size: 40px; font-weight: bold;color: #000000;">热门小组</span>
                            <div class="group-button-for-more">
                                <ButtonForMore></ButtonForMore>
                            </div>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <div class="group-module-up">
                        <div class="group-module-up-1">
                            <GroupShowCard :group="groups[0]"></GroupShowCard>
                            <GroupShowCard :group="groups[1]"></GroupShowCard>
                            <GroupShowCard :group="groups[2]"></GroupShowCard>
                        </div>
                        <div class="group-module-up-2">
                            <GroupShowCard :group="groups[3]"></GroupShowCard>
                            <GroupShowCard :group="groups[4]"></GroupShowCard>
                            <GroupShowCard :group="groups[5]"></GroupShowCard>
                        </div>
                    </div>
                    <!-- <div class="group-module-cartoon">
                        <GroupCartoon></GroupCartoon>
                    </div> -->
                    <div class="group-module-new-cartoon">
                        <GroupNewCartoon></GroupNewCartoon>
                    </div>

                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
import TopicCard from '../components/TopicCard';
import ButtonForMore from './ButtonForMore.vue';
import GroupShowCard from './GroupShowCard.vue';
import GroupMiniCard from './GroupMiniCard.vue';
import GroupCartoon from './GroupCartoon.vue';
import GroupNewCartoon from './GroupNewCartoon.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
export default ({
    components: {
        TopicCard,
        ButtonForMore,
        GroupShowCard,
        GroupCartoon,
        GroupNewCartoon,
        GroupMiniCard,
    },
    data() {
        return {
            topics: [
                {
                    id: 1,
                    image: require(`../assets/conroy_img/doupo.png`),
                    title: '#为什么到现在你都没有谈恋爱#',
                    text: '可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？',
                    read: '140万',
                    discuss: '498',
                },
                {
                    id: 2,
                    image: require(`../assets/conroy_img/qq.jpg`),
                    title: '#高铁站台为什么不能打伞#',
                    text: '高铁站台为什么不能打伞🌂',
                    read: '140万',
                    discuss: '498',
                },
                {
                    id: 3,
                    image: require(`../assets/conroy_img/1.jpg`),
                    title: '#为什么广东人这么爱吃却普遍都瘦#',
                    text: '#为什么广东人这么爱吃却普遍都瘦##广东人每一顿饭不能离开什么#广东人一直以“会吃”而闻名。可是，向来“会吃”的广东人，都吃“达标”了吗？',
                    read: '140万',
                    discuss: '498',
                },
                {
                    id: 4,
                    image: require(`../assets/conroy_img/doupo.png`),
                    title: '#为什么到现在你都没有谈恋爱#',
                    text: '可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？',
                    read: '140万',
                    discuss: '498',
                },
                {
                    id: 5,
                    image: require(`../assets/conroy_img/doupo.png`),
                    title: '#为什么到现在你都没有谈恋爱#',
                    text: '可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？',
                    read: '140万',
                    discuss: '498',
                },
            ],
            groups: [
                {
                    id: 1,
                    name: '刘慈溪',
                    image: require('../assets/conroy_img/qq.jpg'),
                    number: '12323',
                    text: '该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
                },
                {
                    id: 2,
                    name: 'CZX',
                    image: require('../assets/conroy_img/czx.jpg'),
                    number: '12323',
                    text: '开打开打',
                },
                {
                    id: 3,
                    name: 'ADK',
                    image: require('../assets/conroy_img/adk.jpg'),
                    number: '22323',
                    text: 'AAAAA神,GodA,你懂A的含金量吗,臣服于A吧',
                },
                {
                    id: 4,
                    name: '美女联盟',
                    image: require('../assets/conroy_img/xw.jpg'),
                    number: '38323',
                    text: '老色批进来吧',
                },
                {
                    id: 5,
                    name: '秋子夜',
                    image: require('../assets/conroy_img/image.jpg'),
                    number: '28323',
                    text: '混子选手罢了',
                },
                {
                    id: 6,
                    name: '刘慈溪',
                    image: require('../assets/conroy_img/snake.jpg'),
                    number: '28323',
                    text: '该小组都是刘慈欣的铁杆粉丝,三体世界脑残粉嘿嘿嘿嘿',
                },
            ]
        }
    },
    computed: {
        ...mapState('userAbout', ['userId']),
    },
    methods: {
        //请求话题栏目数据
        requestTopicList() {
            this.$axios({
                method: "post",
                url: "/base/col_chat/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    this.topics = res.data.chats;
                })
                .catch((err) => {
                    this.error();
                    this.$message.error("网络出错QAQ");
                });
        },
        //请求小组栏目数据
        requestGroupList() {
            this.$axios({
                method: "post",
                url: "/base/col_group/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    this.groups = res.data.groups;
                })
                .catch((err) => {
                    this.error();
                    this.$message.error("网络出错QAQ");
                });
        },
    },
    created() {
        this.requestTopicList();
        this.requestGroupList()
    },

})
</script>
<style scoped>
.group-module-cartoon {
    width: 112px;
    height: 112px;
    background-color: transparent;
    z-index: 10;
    position: absolute;
    margin-top: -400px;
    margin-left: 184px;
    /* 计算得到，千万别改 */
}

.group-module-new-cartoon {
    background-color: transparent;
    width: 160px;
    height: 185px;
    z-index: 40;
    z-index: 10;
    position: absolute;
    margin-top: -160px;
    margin-left: 160px;
}

.topic-button-for-more {
    margin-top: 5px;
    float: right;
    margin-left: 20px;
}

.group-button-for-more {
    margin-top: 5px;
    float: right;
    margin-left: 20px;
}

.topic-logo {
    float: left;
    font-size: 50px;
    margin-top: 5px;
}

.topic-group-module-block {
    margin-right: 1%;
    width: 85%;
    height: 750px;
    margin-top: 50px;
    margin-left: 7.5%;
    border-radius: 10px;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
    background-color: transparent;
}

.topic-module {
    width: 48%;
    height: 750px;
    background-color: #f9f9f9;
    border-radius: 10px;
    position: absolute;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.topic-module-card-container {
    margin-top: -15px;
    display: flex;
    flex-direction: column;
    /* 设置为竖直排列 */
    justify-content: space-between;
    background-color: transparent;
    margin-left: 1%;
    padding: 10px;
}


.group-module {
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36%;
    height: 750px;
    margin-left: 49%;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.group-logo {
    float: left;
    font-size: 45px;
    margin-top: 5px;
}

.group-module-up {
    z-index: 11;
    width: 480px;
    height: 600px;
    background-color: transparent;
}


.group-module-down {
    z-index: 11;
    margin-top: 40px;
    width: 480px;
    height: 300px;
    background-color: transparent;
}

.group-module-up-1 {
    z-index: 11;
    position: absolute;
    margin-left: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}

.group-module-up-1>*:not(:last-child) {
    margin-bottom: 40px;
    /* 调整这个数值来控制垂直间距的大小 */
}

.group-module-up-2 {
    z-index: 11;
    position: absolute;
    margin-left: 250px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}

.group-module-up-2>*:not(:last-child) {
    margin-bottom: 40px;
    /* 调整这个数值来控制垂直间距的大小 */
}
</style>