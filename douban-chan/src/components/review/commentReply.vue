<!-- 回复栏 -->
<template>
    <!-- 只有登录了才能显示该组件 -->
    <!-- 底部的回复框 -->
    <div class="reply-input-container" v-if="isLogin">
        <img :src="userImgUrl" class="reply-user-img">
        <textarea v-model="text" :placeholder="replyHeaderStr" rows="6"></textarea>
        <div class="reply-button" @click="submit">
            发表
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import qs from "qs"
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
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        replyHeaderStr() {
            return '回复 @' + this.targetUserName + '：  '
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
            this.$axios({
            method: "post",
            data: qs.stringify({
                t_description: this.text,
                t_father_text_id: this.textId,
                u_id: 2
            }),
            url: "/text/reply_text/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                if (res.data.msg === 0)
                {
                    this.$message.success("评论成功！")
                    this.$emit('comment-success');
                }
                else   
                    this.$message.error("评论失败！")
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
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
    justify-content: flex-start;
    /* z-index: 10; */
    animation: slide-down 0.5s ease;
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

@keyframes slide-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>