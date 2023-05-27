<!-- 楼中楼组件 -->
<template>
    <div class="comment-container">
        <div class="main-container">
            <div class="userinfo-container" @click="jumpToUserHome">
                <img :src="info.commenterImageUrl" class="user-img">
                <div>
                    <div class="username">{{ info.commenterName }}</div>
                    回复了
                    <div class="username">@ {{ info.commenteeName }}</div>
                </div>
            </div>
            <div class="text-container">
                <div class="height-taker"></div>
                <div class="text">
                    {{ info.content }}
                </div>
            </div>

            <div class="footer-container">
                <div class="comment-time">{{ info.date }}</div>
                <div>
                    <LikeButtonGroup :info="likeInfo" :small="true"/>
                    <!-- <i class="fa-solid fa-thumbs-up postcard-icon" ref="likeIcon"></i>{{ info.like }}
                    <i class="fa-solid fa-thumbs-down postcard-icon" ref="dislikeIcon"></i>{{ info.dislike }} -->
                </div>
                <div @click="handleClick" class="reply-button">
                    回复
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LikeButtonGroup from '../post/button/LikeButtonGroup.vue';
export default {
    name: 'commentSecondLevel',
    components:{
        LikeButtonGroup,
    },
    props: ['info'],
    data() {
        return {
            isReplying: false,
        }
    },
    computed:{
        likeInfo(){
            return {
                like: this.info.like,
                dislike: this.info.dislike,
                textId: this.info.textId,
            }
        },
    },
    methods: {
        // 点击用户昵称或者头像即可跳转到其主页
        jumpToUserHome() {
            this.$router.push({
                name: 'userHome',
            })
        },
        handleClick() {
            this.isReplying = !this.isReplying;  // 修改 isReplying 的值
            this.$emit('reply', this.info.commenterName, this.info.id);  // 向父组件传递信息
        }
    },
}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';
.comment-container{
    padding: 0 30px;
}
.main-container {
    max-width: 1000px;
    margin: 10px 20px 0 20px;
    min-height: 60px
}

.userinfo-container {
    float: left;
    margin-right: 5px;
    max-height: 20px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
}


.height-taker{
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
    margin: 5px 5px;
    font-size: 17px;
    font-weight: 700;
    display: inline-block;
}

.text-container {
    min-height: 50px;
}

.text {
    text-align: left;
    line-height: 24px;
    font-size: 14px;
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
    padding: 0px 35px;
    font-size: 16px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
}
.comment-time {
    font-weight: 400;
    color: #9499A0;
    text-align: center;
}

.reply-button {
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
</style>