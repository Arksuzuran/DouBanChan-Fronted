<!-- 小号的小组卡片 不再显示关注数和帖子数 -->
<!-- 使用位置：GroupList.vue -->
<!-- params:
        @group: 小组信息对象
-->
<template>
    <div class="groupcard-container">
        <div class="groupcard-topic-container" @click="jumpToTopic">
            <i class="fa-sharp fa-solid fa-fire groupcard-topic-title"></i>
            <img class="groupcard-topic-img" :src="group.aboutTopic.topicAvatarUrl" />
            <div class="groupcard-topic-name">{{ '#' + group.aboutTopic.topicName }}</div>
        </div>
        <div class="groupcard-group-container">
            <div class="groupcard-infos">
                <!-- 对于管理员用户 显示特殊上标 -->
                <div class="groupcard-admin" v-if="group.userIsAdmin">管理</div>
                <!-- 对于已加入的非管理员用户 显示特殊上标 -->
                <div class="groupcard-joined" v-if="group.userInGroup && !group.userIsAdmin">我的小组</div>
                <img class="groupcard-img" :src="group.groupAvatarImgUrl" />
                <div class="groupcard-info">
                    <div class="groupcard-name">
                        {{ groupName }}
                    </div>
                    <div class="groupcard-intro">
                        {{ groupIntroduction }}
                    </div>
                </div>
            </div>
            <div>
                <!-- 对于未加入小组的用户 -->
                <button class="groupcard-request" type="button" @click="handleEnterGroupPage" v-if="!group.userInGroup">
                    进入主页
                </button>
                <button class="groupcard-request" type="button" @click="handleJoinGroup" v-if="!group.userInGroup">
                    申请加入
                </button>
                <!-- 对于已加入小组的用户 -->
                <button class="groupcard-request groupcard-request-full" type="button" @click="handleEnterGroupPage"
                    v-if="group.userInGroup">
                    进入主页
                </button>
            </div>

        </div>

    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'GroupCard',
    props: ['group'],
    data() {
        return {
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),

        groupIntroduction() {
            return this.cutStrByLength(this.group.groupIntro, 24)
        },
        groupName() {
            return this.cutStrByLength(this.group.groupName, 12)
        },
    },
    methods: {
        cutStrByLength(str, length) {
            if (str.length > length) {
                return str.slice(0, length - 3) + "...";
            } else {
                return str;
            }
        },
        handleEnterGroupPage() {
            this.$router.push({
                name: 'group',
                query:{
                    groupId: this.group.groupId
                },
            })
        },
        handleJoinGroup() {
            this.$router.push({
                name: 'group',
                query:{
                    groupId: this.group.groupId
                },
            })
        },
        jumpToTopic(){
            this.$router.push({
                name: 'topic',
                query:{
                    topicId: this.group.aboutTopic.topicId
                },
            })
        },
    },
}
</script>

<style scoped>
.groupcard-container{
    margin: 0 0 20px 0;
}
.groupcard-topic-container {
    /* max-width: 320px; */
    border-radius: 6px 6px 0 0;
    background-color: rgb(254, 231, 231);
    color: rgba(252, 88, 88, 0.9);
    padding: 4px;

    border: 1px 1px 0 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;

    position: relative;
    transition: .5s ease;
    /* background: transparent; */

    cursor: pointer;
}

.groupcard-topic-img {
    margin: 0 5px;
    height: 2rem;
    width: 2rem;
    border-radius: 0.5rem;
    background-color: rgb(255, 243, 243);
    border: 1px solid rgba(241, 232, 232, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2);
    background: linear-gradient(to bottom right, rgb(241, 197, 197), rgb(255, 248, 248));
}

.groupcard-topic-title {
    margin: 0 5px;
    font-size: 19px;
    /* line-height: 16px; */
    font-weight: 600;
    /* color: rgba(252, 88, 88, 0.9); */
    text-align: start;
}

.groupcard-topic-name {
    margin: 0 5px;
    font-size: 18px;
    /* line-height: 16px; */
    font-weight: 600;
    /* color: rgba(252, 88, 88, 0.9); */
    text-align: start;
}

/* card的背景和颜色 */
.groupcard-group-container {
    /* max-width: 320px; */
    border-radius: 0 0 1rem 1rem;
    background-color: rgb(255, 245, 245);
    padding: 12px;

    margin: 1px 0 20px 0;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2);
}

.groupcard-infos {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    grid-gap: 17px;
    gap: 17px;
    position: relative;
    /* margin: 10px; */
}

/* 管理员的特殊上标 */
.groupcard-admin {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.1rem;
    width: 2.1rem;
    border-radius: 0.5rem;
    /* background-color: rgb(250, 43, 43); */
    background-color: rgb(247, 96, 96);
    font-size: 12px;
    color: white;
}

/* 普通组员的上标 */
.groupcard-joined {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.1rem;
    width: 4.1rem;
    border-radius: 0.5rem;
    background-color: rgb(248, 130, 130);
    font-size: 12px;
    color: white;
}

.groupcard-img {
    height: 7rem;
    width: 7rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(241, 232, 232, 0.8);
    background-color: rgb(255, 243, 243);
    box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2);
    background: linear-gradient(to bottom right, rgb(255, 63, 63), rgb(255, 248, 248));
}


/* 图片和文本的容器 */
.groupcard-info {
    max-height: 180px;
    flex: 1;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: flex-start;
}

/* 小组名称 */
.groupcard-name {
    font-size: 20px;
    /* line-height: 16px; */
    font-weight: 600;
    color: rgb(19, 19, 19);
    text-align: start;
}

.groupcard-intro {
    margin-top: 8px;
    font-size: 14px;
    line-height: 16px;
    color: rgba(32, 31, 31, 0.9);
    text-align: start;
}

.groupcard-stats {
    width: 75%;
    border-radius: 8px;
    background-color: rgba(255, 228, 228, 0.9);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 15px;
    line-height: 25px;
    color: rgba(0, 0, 0, 1);
}

.groupcard-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 4px;
}

.groupcard-state-value {
    font-weight: 700;
    color: rgb(255, 123, 123);
}

.groupcard-request {
    margin: 12px 10px 0 6px;
    width: 40%;
    outline: none;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    transition: all .3s ease;
    background-color: rgba(244, 236, 236, 0.9);

    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 1px 2px 0px rgba(247, 61, 61, 0.2);

    cursor: pointer;
}

.groupcard-request-full {
    width: 80%;
}

.groupcard-request:hover {
    background-color: rgb(255, 79, 79);
    color: #fff;
}

/* topic按钮的动画效果 */
/* 容器变红 */
.groupcard-topic-container:hover{
    background-color: rgb(248, 65, 65);
    color: #ffffff;
    transition-delay: .5s;
}
/* 底部红条 */
.groupcard-topic-container::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 0;
    background-color: rgba(255, 66, 66, 0.9);
    transition: .6s ease;
}
/* 底部红条出现 */
.groupcard-topic-container:hover::before {
    width: 100%;
}
/* 右侧文字 */
.groupcard-topic-container::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 14%;
    border-radius: 10px;
    background-color: rgb(254, 231, 231);
    color: rgb(254, 231, 231);
    
    transition: .5s ease;
    /* transition-delay: 0.2s; */

    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    font-size: 10px;
}

.groupcard-topic-container:hover::after{
    content:'进入话题';
    font-size: 14px;
    font-weight: 600;

    width: 25%;
    background-color: rgb(248, 65, 65);
    color: aliceblue;
}</style>