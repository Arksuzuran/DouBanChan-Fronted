<template>
    <div>
        <div class="postcard-userinfo-container">
            <img :src="item.userImageUrl" class="lz-image" @click="jumpToUserHome" />
            <div class="lz-name" @click="jumpToUserHome">
                {{ item.userName }}
            </div>
        </div>
        <div class="comment-content">{{item.text}}</div>
        <div class="footer-container">
            <div class="comment-time">{{ item.date }}</div>
            <div>
                <LikeButtonGroup :info="likeInfo" :small="true"/>
                <!-- <i class="fa-solid fa-thumbs-up postcard-icon" ref="likeIcon"></i>{{ info.like }}
                <i class="fa-solid fa-thumbs-down postcard-icon" ref="dislikeIcon"></i>{{ info.dislike }} -->
            </div>
            <!-- <div class="reply-button" @click="changeReplying">
                回复
            </div> -->
        </div>
        <!-- <commentSecondLevel @reply="handleReply" v-for="(item,index) in commentSeconds" :key="index" :info="item"></commentSecondLevel> -->
        <!-- 回复区，如果点击回复则显示 -->
        <!-- <CommentReplyInputBox v-if="isReplying" :textId="item.id" :targetUserName="this.replyName">
        </CommentReplyInputBox> -->
        <!-- 分隔线 -->
        <div class="div-line"></div>
    </div>
</template>

<script>
import PostCardUserInfo from '@/components/post/PostCardUserInfo.vue'
import commentSecondLevel from '@/components/review/commentSecondLevel.vue'
import LikeButtonGroup from '../post/button/LikeButtonGroup.vue';
import CommentReplyInputBox from '../post/button/CommentReplyInputBox.vue';
export default {
    name: 'CommentSection',
    props: ['item'],
    components: {
        PostCardUserInfo, commentSecondLevel, LikeButtonGroup, CommentReplyInputBox
    },
    data(){
        return {
        }
    },
    computed:{
        likeInfo(){
            return {
                like: this.item.like,
                dislike: this.item.dislike,
                textId: this.item.textId,
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
        changeReplying() {
            if (this.sonIsReplyId === -1)
            {
                this.isReplying = !this.isReplying
                this.replyName = this.item.name
            }
            else{
                this.isReplying = true
                this.sonIsReplyId = -1
                this.replyName = this.item.name
            }
        },
        handleReply(name, sonId){
            if (this.sonIsReplyId !== sonId){   //说明是另外的子评论
                this.sonIsReplyId = sonId
                this.replyName = name
                this.isReplying = true
            }
            else {  //说明是同一个子评论
                this.isReplying = !this.isReplying
            }
        }
    }
}
</script>

<style scoped>
.comment-content{
    font-size: 16px;
    padding: 0px 55px;
}
.div-line{
    width: 100%;
    height: 1px;
    background-color: #E8E8E8;
    margin: 5px 0px;
}
.postcard-userinfo-container {
display: flex;
align-items: center;
justify-content: flex-start;
}

.lz-image {
    width: 40px;
    height: 40px;
    border-radius: 18px;
    margin: 8px;
    /* 边框 */
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    z-index: 6;

    cursor: pointer;
}
.footer-container {
    padding: 0px 55px;
    font-size: 16px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
}
.lz-name {
    margin: 10px 10px 10px 0;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
}
.comment-time {
    margin-top: 5px;
    font-size: 16px;
    font-weight: 400;
    color: #9499A0;
    text-align: center;
}
.response{
    margin-left: 15px;
    font-size: 16px;
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