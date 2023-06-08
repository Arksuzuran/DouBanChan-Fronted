<template>
    <div class="card">
        <span>{{ userNick }}</span>
        <p class="info">{{ userSignature }}</p>
        <div class="mini-message">
            <el-badge :value="userReplyNum" :max="9" class="left-content message-hover">
                <i class="fa-solid fa-comment fa-2xl" style="color: #34a1d8;" @click="gotoReply"></i>
            </el-badge>
            <el-badge :value="userMessageNum" :max="9" class="center-content message-hover">
                <i class="fa-solid fa-envelope reply fa-2xl" style="color: #080808;" @click="gotoMessage"></i>
            </el-badge>
            <el-badge :value="userGoodNum" :max="9" class="right-content message-hover">
                <i class="fa-solid fa-thumbs-up fa-2xl" style="color: #ff0000;" @click="gotoGood"></i>
            </el-badge>
        </div>
        <br>
        <button class="learn-more">
            <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
            </span>
            <span class="button-text" @click="gotoMyHome">个人中心</span>
        </button>
        <button class="learn-more">
            <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
            </span>
            <span class="button-text" @click="gotoMyFav">我的收藏</span>
        </button>
        <button class="quit" @click="quit">退出登录</button>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
export default ({
    data() {
        return {
            messages: [
            ],
            goods: [

            ],
            infos: [
            ],
            manages: [
            ],
        }
    },
    methods: {
        ...mapMutations('userAbout', ['LOGIN', 'LOGOUT', 'ClearUserReplyNum', 'ClearUserMessageNum', 'ClearUserGoodNum', 'requestManageInfo', 'requestSystemInfo', 'requestUserMessage']),
        quit() {
            this.LOGOUT();
            this.$router.push('/');//退出登录回到主页
            window.location.reload();
        },
        gotoMyHome() {
            this.$router.push('/userHome/home');//去到个人主页
        },
        gotoMyFav() {
            this.$router.push('/userHome/favlist');//去到我的收藏
        },
        gotoReply() {
            this.$router.push('/userHome/message');//去到回复
        },
        gotoMessage() {
            this.$router.push('/userHome/message');//去到系统信息
        },
        gotoGood() {
            this.$router.push('/userHome/message');//去到收到的赞
        },
        requestManage() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                }),
                url: "/report/query_report/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    this.manages = res.data.report_list;
                    this.requestManageInfo(this.manages);
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
        requestInfo() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                }),
                url: "/report/query_system_message/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    this.infos = res.data.system_message_list;
                    this.requestSystemInfo(this.infos);
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
        requestMessage() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                }),
                url: "/report/query_comment_message/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    this.messages = res.data.comment_message_list;
                    this.requestUserMessage(this.messages);
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
    },
    computed: {
        ...mapState('userAbout', ['userNick', 'isLogin', 'userId', 'userSignature', 'userReplyNum', 'userMessageNum', 'userGoodNum']),
    },
    mounted() {
        // this.requestManage();
        // this.requestInfo();
        // this.requestMessage();
        this.ClearUserReplyNum();
        this.ClearUserMessageNum();
        this.ClearUserGoodNum();
    }

})
</script>
<style scoped>
.mini-message {
    width: 70%;
    max-height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: black; */
}

.center-content {
    display: flex;
    width: 30px;
    align-items: center;
    height: 21px;
    margin-top: 10px;
}

.left-content {
    display: flex;
    width: 30px;
    align-items: center;
    height: 21px;
    margin-top: 12px;
}

.right-content {
    display: flex;
    height: 21px;
    width: 30px;
    align-items: center;
    margin-top: 7px;
}

.message-hover {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.message-hover:hover {
    transform: scale(1.1);
}

.card {
    width: 17em;
    height: 22.5em;
    background: #f2feff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    transition: 1s ease-in-out;
    clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 水平居中 */
    justify-content: space-between;
    /* 上下间距 */
    padding: 10px;
    /* 间距大小，根据需要调整 */
}

.card span {
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-align: center;
    display: block;
    font-size: 1em;
    margin-top: 25px;
}

.card .info {
    font-weight: 400;
    color: rgb(0, 0, 0);
    display: block;
    text-align: center;
    font-size: 0.72em;
    margin: 1em;
}

.card .share {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    gap: 1em;
}

.card a {
    color: white;
    transition: .4s ease-in-out;
}

.card a:hover {
    color: red;
}

.quit {
    padding: 0.8em 1.7em;
    display: block;
    margin-top: 5px;
    border-radius: 25px;
    border: none;
    font-weight: bold;
    background: #ffffff;
    color: rgb(0, 0, 0);
    transition: .4s ease-in-out;
}

.quit:hover {
    background: red;
    color: white;
    cursor: pointer;
}

button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
}

button.learn-more {
    width: 12rem;
    height: auto;
    padding-top: 4px;
}

button.learn-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #282936;
    border-radius: 1.625rem;
}

button.learn-more .circle .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
}

button.learn-more .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
}

button.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
}

button.learn-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: #282936;
    font-weight: 600;
    line-height: 1.6;
    text-transform: uppercase;
}

button:hover .circle {
    width: 100%;
}

button:hover .circle .icon.arrow {
    background: #fff;
    transform: translate(1rem, 0);
}

button:hover .button-text {
    color: #fff;
}
</style>