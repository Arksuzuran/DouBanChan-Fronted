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
                {
                    id: 1,
                    imagePath: require('../../assets/conroy_img/qq.jpg'),
                    name: '秋子夜',
                    reply: '家人们无语啦无语啦,它居然是个男人,家人们,大无语事件呀,啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                    time: '2023年6月4日 17:51',
                    comment: '江南第一深情吴一凡邀请你共进晚餐,希望你不要不识抬举.',
                },
                {
                    id: 4,
                    imagePath: require('../../assets/conroy_img/xw.jpg'),
                    name: '溪午',
                    reply: '支持支持',
                    time: '2023年6月5日 14:51',
                    comment: '朔间零太帅啦.',
                },
                {
                    id: 3,
                    imagePath: require('../../assets/conroy_img/czx.jpg'),
                    name: 'Arksuzuran',
                    reply: '不是,不知道你在装什么捏',
                    time: '2023年6月3日 11:21',
                    comment: '我是最吊的,不服来干',
                },
                {
                    id: 2,
                    imagePath: require('../../assets/conroy_img/adk.jpg'),
                    name: 'ADK',
                    reply: '不想学os啦,不想搓软工啦!!!!!!!!',
                    time: '2023年6月4日 17:51',
                    comment: '大方承认吧,北航,您最爱的大专.',
                },
            ],
            goods: [
                {
                    id: 1,
                    imagePath: require('../../assets/conroy_img/qq.jpg'),
                    name: '秋子夜',
                    time: '2023年6月4日 17:51',
                    comment: '江南第一深情吴一凡邀请你共进晚餐,希望你不要不识抬举.',
                },
                {
                    id: 4,
                    imagePath: require('../../assets/conroy_img/xw.jpg'),
                    name: '溪午',
                    time: '2023年6月5日 14:51',
                    comment: '朔间零太帅啦.',
                },
                {
                    id: 3,
                    imagePath: require('../../assets/conroy_img/czx.jpg'),
                    name: 'Arksuzuran',
                    time: '2023年6月3日 11:21',
                    comment: '我是最吊的,不服来干',
                },
                {
                    id: 2,
                    imagePath: require('../../assets/conroy_img/adk.jpg'),
                    name: 'ADK',
                    time: '2023年6月4日 17:51',
                    comment: '大方承认吧,北航,您最爱的大专.',
                },
            ],
            infos: [
                {
                    id: 1,
                    name: '豆瓣酱隐私政策的修订通知',
                    time: '2023年6月4日 17:51',
                    text: '亲爱的用户，根据业务开展的实际情况，哔哩哔哩近期更新了《哔哩哔哩隐私政策》中的相关内容。你可以前往哔哩哔哩客户端【我的-设置-隐私政策-哔哩哔哩隐私政策全文】查看更新后的主要提示以及全部内容。',
                },
                {
                    id: 4,
                    name: '正在直播MSI总决赛：BLG vs JDG',
                    time: '2023年6月5日 14:51',
                    text: 'LPL队伍历史首次在国际赛事会师决赛，谁将为赛区捧起第五座MSI冠军奖杯？看直播参与天选抽奖，华为P50 Pocket、Matebook13、大会员权益等你来拿！上B站看MSI，让我们共同见证冠军诞生！',
                },
                {
                    id: 3,
                    name: '终于！你的B站专属年度报告来了！',
                    time: '2023年6月3日 11:21',
                    text: '2022你最关注的TA是？哪些视频让你N刷不断？又是什么被你刻入了DNA？戳链接，回顾你和B站的2022>>',
                },
                {
                    id: 2,
                    name: '您的评论违规，已被管理员删除',
                    time: '2023年6月4日 17:51',
                    text: '您的评论‘曹尼玛的北航真傻逼’涉嫌违规，已经被管理员删除，希望您理性评论！',
                },
            ],
            manages: [
                {
                    id: 1,
                    title: 'ADK太吊了,北航不允许这么牛逼的人存在',
                    text: '家人们,GodA你听过吗?不得了啊,不得了啊,他一个小时写完挑战性任务,软工前后端全栈,国奖什么的都是小意思,paper遍地走,nature得管他叫爹,院士得喊他哥,女人们都想做他的学术妲己,男人们都想做他的GGBoy!',
                },
                {
                    id: 2,
                    title: '涉黄信息、有害信息、网络暴力',
                    text: '我,李一博实名举报江南第一深情吴一凡聚众pc!',
                },
                {
                    id: 3,
                    title: '过度内卷,校园毒瘤',
                    text: '只能说这个人太过分了,怎么能这样卷软工捏,你让同行怎么活,必须严惩,学霸们自重吧 别把身边的学渣逼急了 因为学渣可能会用身高鄙视你 用身材藐视你 用滑板拍死你 用画笔戳死你 用乐器砸死你 用篮球扔死你 用歌喉亮死你 德玛西亚虐死你 我们喜欢会教题的学霸而不是秀优越的学霸.',
                },
                {
                    id: 4,
                    title: 'emo了家人们',
                    text: '越来越觉得似乎恋爱没那么重要了 把自己彻底交给一个人开始懂得权衡利弊了 打得一手好防御 每当这时候我就觉得我大概也不是那么需要爱情了 以前觉得安全感是秒回的信息 她的早安晚安每一个承诺 温暖好脾气的话语 而现在安全感唯有明媚阳光的好天气 繁华路口人行道的绿灯 出门时口袋里的钱包和钥匙 手机里显示的满格电 因为那点安全感寄托于她人身上 难免会令我疼到失望 我甚至开始讨厌一些人的出现打乱我的生活 但我又希望有人可以陪我 怎么会有我这么矛盾的人 想要爱却在爱来临时闪躲.',
                },
                {
                    id: 5,
                    title: 'ADK太吊了,北航不允许这么牛逼的人存在',
                    text: '家人们,GodA你听过吗?不得了啊,不得了啊,他一个小时写完挑战性任务,软工前后端全栈,国奖什么的都是小意思,paper遍地走,nature得管他叫爹,院士得喊他哥,女人们都想做他的学术妲己,男人们都想做他的GGBoy!',
                },
            ],
            isManageEmpty: true,
            isMessageEmpty: true,
            isGoodEmpty: true,
            isInfoEmpty: true,
        }
    },
    created() {
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
        }
    },
    methods: {
        checkMessageEmpty() {
            this.isMessageEmpty = this.messages.length === 0;
        },
        checkManageEmpty() {
            this.isManageEmpty = this.manages.length === 0;
        },
        checkGoodEmpty() {
            this.isGoodEmpty = this.goods.length === 0;
        },
        checkInfoEmpty() {
            this.isInfoEmpty = this.infos.length === 0;
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