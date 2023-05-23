<!-- 回复栏 -->
<template>
    <!-- 只有登录了才能显示该组件 -->
    <!-- 底部的回复框 -->
    <div class="reply-input-container" v-if="isLogin">
        <img :src="userImgUrl" class="reply-user-img">
        <textarea v-model="text" :placeholder="inputPlaceholder" rows="6"></textarea>
        <div class="reply-button" @click="submit">
            发表
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: ['textId', 'targetUserName'],
    name: 'CommentReplyButton',
    data() {
        return {
            text: '',
            isFocused: false,
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        inputPlaceholder() {
            return '回复@' + this.targetUserName + '： '
        }
    },
    methods: {
        handleFocus() {
            this.isFocused = true;
        },
        handleBlur() {
            this.isFocused = false;
        },
        // 提交
        submit() {
            let newReply = {
                textId: 1001,
                userId: this.userId,
                userName: this.userName,
                userImageUrl: this.userImgUrl,
                date: this.getTimeNow(),
                text: this.text,
                like: 0,
                dislike: 0,
            }

            // 通过事件总线触发自定义事件，并传递被回复的帖子id 以及 新楼中楼作为参数
            this.$bus.$emit('commentReplyCreated', newReply, this.textId);

            console.log('用户回复楼层，文本：', this.text);
            this.text = ''
        },
        // 获取当前时间
        getTimeNow() {
            var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
        },
    },
}
</script>

<style scoped>
.reply-input-container {
    border-radius: 5px;
    background-color: rgb(255, 243, 243, 0.7);

    display: flex;
    align-items: center;
    justify-content: flex-start
        /* z-index: 10; */
}

.reply-user-img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 10px;
    /* 边框 */
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    object-fit: cover;
}

textarea {
    padding: 15px;
    width: 75%;
    border: 2px solid #ffeaea;
    resize: vertical;
    background-color: rgba(255, 252, 252, 0.7);
    border-radius: 5px;
    margin: 20px;
    /* 字体 */
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 15px;
    color: #2c3e50;
}

textarea:focus {
    border-color: pink;
    outline: rgb(255, 131, 152);
    z-index: 100;
}

.reply-button {
    height: 80px;
    width: 70px;
    /* 边框 */
    border: 1px solid rgba(255, 202, 202, 0.8);
    border-radius: 8px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 233, 233, 0.7);
    color: #2c3e50;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>