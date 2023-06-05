<!-- 楼中楼组件 -->
<template>
    <div>
        <!-- 分隔线 -->
        <div class="div-line"></div>
        <div class="main-container">
            <div class="userinfo-container" @click="jumpToUserHome">
                <img :src="info.userImageUrl" class="user-img">
                <div class="username">{{ info.userName }}</div>
            </div>
            <div class="text-container">
                <div class="height-taker"></div>
                <div class="text">
                    {{ info.text }}
                </div>
            </div>

            <div class="footer-container">
                <div>{{ info.date }}</div>
                <LikeButtonGroup :info="info" :small="true" />
                <!-- <i class="fa-solid fa-thumbs-up postcard-icon" ref="likeIcon"></i>{{ info.like }}
                    <i class="fa-solid fa-thumbs-down postcard-icon" ref="dislikeIcon"></i>{{ info.dislike }} -->

                <div class="postfloor-reply-button" @click="changeReplying">
                    回复
                </div>
            </div>
            <div class="postfloor-comment-container">
                <!-- 撰写评论的区域 -->
                <CommentReplyInputBox v-if="isReplying" :textId="info.textId" :targetUserName="info.userName" :floor2="true">
                </CommentReplyInputBox>
            </div>
        </div>
    </div>
</template>

<script>
import LikeButtonGroup from './button/LikeButtonGroup.vue';
import CommentReplyInputBox from './button/CommentReplyInputBox.vue';

export default {
    name: 'CommentUnderFloor',
    components: {
        LikeButtonGroup,
        CommentReplyInputBox,
    },
    props: ['info'],
    data() {
        return {
            // 用户是否正在回复评论
            isReplying: false,
        }
    },
    computed: {

    },
    methods: {
        // 点击用户昵称或者头像即可跳转到其主页
        jumpToUserHome() {
            this.$router.push({
                name: 'userHome',
            })
        },
        // 改变用户对当层楼的回复状态
        changeReplying() {
            this.isReplying = !this.isReplying
        },
    },
    mounted() {
        this.$bus.$on('commentReplyCreated', (textId) => {
            if(textId == this.info.textId){
                this.isReplying = !this.isReplying
            }
        })
    },
}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

.main-container {
    max-width: 1000px;
    margin: 10px 20px 0 20px;
    min-height: 60px
}

.userinfo-container {
    float: left;
    margin-right: 5px;

    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
}

.div-line {
    max-width: 1000px;
    margin: 3px;
    height: 1px;
    background-color: rgb(255, 232, 232);
}

.height-taker {
    height: 5px;
    /* background-color: rgb(255, 60, 60); */
}

.user-img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    /* 边框 */
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    z-index: 6;

    cursor: pointer;
}

.username {
    margin: 5px 20px 5px 10px;
    font-size: 17px;
    font-weight: 700;
}

.text-container {
    min-height: 50px;
}

.text {
    text-align: left;
    line-height: 24px;
    font-size: 16px;
    margin-left: 36px;
}

/* 赞和踩的图标 */
.postcard-icon {
    font-size: 18px;
    color: rgb(97, 97, 97);
    margin: 15px 5px 15px 20px;
    cursor: pointer;
}

.footer-container {
    margin: 5px;
    font-size: 16px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
}

/* 回复按钮 */
.postfloor-reply-button {
    margin: 0 0 3px 20px;
    height: 25px;
    width: 50px;
    background-color: rgb(255, 235, 235);
    border-radius: 3px;
    border: 1px solid rgba(255, 252, 252, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

/* 未折叠的评论的容器 */
.postfloor-comment-container {
    margin: 10px 0 10px 10px;
}
</style>