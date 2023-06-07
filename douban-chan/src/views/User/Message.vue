<template>
    <div class="message-list-block">
        <div style="margin-top: 5px;"></div>
        <div class="message-list">
            <span class="message-list-text"><i class="fa-solid fa-paper-plane" style="color: #000000;"></i> 我的消息</span>
            <div class="message-top-text">{{ messageHeaderText }}</div>
            <div class="message-left-switch">
                <div style="height: 10px;"></div>
                <div class="container">
                    <form>
                        <label>
                            <input type="radio" name="radio" checked="" @change="toShow = 1">
                            <span>回复我的</span>
                        </label>
                        <label>
                            <input type="radio" name="radio" @change="toShow = 2">
                            <span>
                                收到的赞
                            </span>
                        </label>
                        <label>
                            <input type="radio" name="radio" @change="toShow = 3">
                            <span>系统通知</span>
                        </label>
                        <label>
                            <input type="radio" name="radio" @change="toShow = 4">
                            <span>管理信息</span>
                        </label>
                    </form>
                </div>
            </div>
            <div v-if="toShow == 1" class="message-reply-block">
                <MessageCardReply v-for="message in messages" :key="message.id" :message="message"
                    @delete="deleteMessage(message.id)">
                </MessageCardReply>
                <div class="message-no-reply" v-if="isMessageEmpty">
                    <div class="message-no-reply-img"></div>
                </div>
            </div>
            <div v-if="toShow == 2" class="message-reply-block">
                <MessageGood v-for="good in goods" :key="good.id" :good="good" @delete="deleteGood(good.id)">
                </MessageGood>
                <div class="message-no-reply" v-if="isGoodEmpty">
                    <div class="message-no-reply-img"></div>
                </div>
            </div>
            <div v-if="toShow == 3" class="message-reply-block">
                <SystemInfoVue v-for="info in infos" :key="info.id" :info="info" @delete="deleteInfo(info.id)">
                </SystemInfoVue>
                <div class="message-no-reply" v-if="isInfoEmpty">
                    <div class="message-no-reply-img"></div>
                </div>
            </div>
            <div v-if="toShow == 4" class="message-reply-block">
                <ManageInfo v-for="manage in manages" :key="manage.id" :manage="manage" @delete="deleteManage(manage.id)">
                </ManageInfo>
                <div class="message-no-reply" v-if="isManageEmpty">
                    <div class="message-no-reply-img"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageCardReply from '../MessageCardReply.vue';
import MessageGood from '../MessageGood.vue';
import SystemInfoVue from '../SystemInfo.vue';
import ManageInfo from '../../components/ManageInfo.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    components: {
        MessageCardReply,
        MessageGood,
        SystemInfoVue,
        ManageInfo,
    },
    data() {
        return {
            toShow: 1,
            messages: [
            ],
            goods: [

            ],
            infos: [
            ],
            manages: [
            ],
            isManageEmpty: true,
            isMessageEmpty: true,
            isGoodEmpty: true,
            isInfoEmpty: true,
        }
    },
    mounted() {
        this.messages = this.userMessages;
        this.goods = this.userGoods;
        this.infos = this.userInfos;
        this.manages = this.userManages;
    },
    created() {
        this.ClearUserReplyNum();
        this.ClearUserMessageNum();
        this.ClearUserGoodNum();
        this.checkMessageEmpty();
        this.checkGoodEmpty();
        this.checkInfoEmpty();
        this.checkManageEmpty();
    },
    computed: {
        messageHeaderText() {
            if (this.toShow === 1) {
                return '回复我的';
            } else if (this.toShow === 2) {
                return '收到的赞';
            } else if (this.toShow === 3) {
                return '系统通知';
            } else if (this.toShow === 3) {
                return '管理信息';
            }
            // 默认情况
            return '回复我的';
        },
        ...mapState('userAbout', ['userMessages', 'userGoods', 'userInfos', 'userManages']),
    },
    methods: {
        ...mapMutations('userAbout', ['ClearUserReplyNum', 'ClearUserMessageNum', 'ClearUserGoodNum']),
        checkMessageEmpty() {
            this.isMessageEmpty = this.userMessages.length === 0;
        },
        checkManageEmpty() {
            this.isManageEmpty = this.userManages.length === 0;
        },
        checkGoodEmpty() {
            this.isGoodEmpty = this.userGoods.length === 0;
        },
        checkInfoEmpty() {
            this.isInfoEmpty = this.userInfos.length === 0;
        },
        deleteMessage(id) {
            const index = this.messages.findIndex(message => message.id === id);
            if (index !== -1) {
                this.messages.splice(index, 1);
            }
            this.checkMessageEmpty(); // 在删除消息后再次检查数组是否为空
        },
        deleteGood(id) {
            const index = this.goods.findIndex(good => good.id === id);
            if (index !== -1) {
                this.goods.splice(index, 1);
            }
            this.checkGoodEmpty(); // 在删除消息后再次检查数组是否为空
        },
        deleteInfo(id) {
            const index = this.infos.findIndex(info => info.id === id);
            if (index !== -1) {
                this.infos.splice(index, 1);
            }
            this.checkInfoEmpty(); // 在删除消息后再次检查数组是否为空
        },
        deleteManage(id) {
            const index = this.manages.findIndex(manage => manage.id === id);
            if (index !== -1) {
                this.manages.splice(index, 1);
            }
            this.checkManageEmpty(); // 在删除消息后再次检查数组是否为空
        },
    },

}
</script>

<style scoped>
.container form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.container label {
    display: flex;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.375em;
}

.container label input {
    position: absolute;
    left: -9999px;
}

.container label input:checked+span {
    background-color: #414181;
    color: white;
}

.container label input:checked+span:before {
    box-shadow: inset 0 0 0 0.4375em #00005c;
}

.container label span {
    display: flex;
    align-items: center;
    padding: 0.375em 0.75em 0.375em 0.375em;
    border-radius: 99em;
    transition: 0.25s ease;
    color: #414181;
}

.container label span:hover {
    background-color: #d6d6e5;
}

.container label span:before {
    display: flex;
    flex-shrink: 0;
    content: "";
    background-color: #fff;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    margin-right: 0.375em;
    transition: 0.25s ease;
    box-shadow: inset 0 0 0 0.125em #00005c;
}

.message-list-block {
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
    background-color: #f3f8fe;
    display: flex;
    flex-direction: column;
}

.message-list-block>div {
    margin-top: 10px;
    margin-bottom: 10px;
}

.message-list {
    width: 95%;
    margin-left: 1.9%;
    background-color: #f3f8fe;
    display: flex;
    align-items: left;
    flex-direction: column;
}

.message-list-text {
    text-align: left;
    width: 15%;
    font-size: 24px;
    font-weight: bold;
}

.message-top-text {
    position: absolute;
    width: 70%;
    margin-left: 10%;
    height: 36px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
    text-align: left;
    /* 靠右对齐 */
    display: flex;
    align-items: center;
    /* 设置容器的高度，以便上下居中 */
    color: #7b7b7b;
    /* 较浅的颜色 */
    font-family: "Helvetica Neue", Arial, sans-serif;
    /* 漂亮的字体 */
    text-indent: 20px;
    /* 文本左移10像素 */
}

.message-left-switch {
    width: 10%;
    background-color: transparent;
    margin-top: 15px;
    /* 居中对齐 */
}


.message-reply-block {
    position: relative;
    width: 87.5%;
    min-height: 200px;
    margin-top: -150px;
    margin-left: 12.5%;
    /* height: 600px; */
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.message-reply-block>*:not(:last-child) {
    margin-bottom: 15px;
    /* 设置组件之间的垂直间距 */
}

.message-no-reply {
    width: 1050px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.message-no-reply-img {
    width: 300px;
    height: 300px;
    background-image: url('../../assets/conroy_img/nothing.jpg');
    /* 替换为你的背景图片的URL */
    background-size: cover;
    background-position: center;
}
</style>