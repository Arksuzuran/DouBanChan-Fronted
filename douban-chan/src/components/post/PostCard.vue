<template>
    <div class="postcard-container">
        <!-- 置顶标记 -->
        <div class="postcard-topped-label" v-if="info.isTopped && !notShowTopped">
            <i class="fa-sharp fa-solid fa-thumbtack" style="font-size: 18px;"></i>
            <span class="postcard-label">置顶</span>
        </div>
        <!-- 加精标记 -->
        <div class="postcard-quality-label" v-if="info.isGoodPost && !notShowGood">
            <i class="el-icon-medal" style="font-size: 20px;"></i>
            <span class="postcard-label">精华</span>
        </div>
        <!-- card主体 -->
        <div class="postcard-main-container">

            <!-- 发帖人头像 昵称 时间 -->
            <PostCardUserInfo class="postcard-userinfo-container" :info="lzInfo" />

            <!-- 来自小组 和 举报按钮 -->
            <div class="postcard-buttongroup">
                <PostTopicButton :info="info"></PostTopicButton>
                <PostReportButton></PostReportButton>
            </div>

            <!-- 点赞数 与 帖子正文 -->
            <div class="postcard-text-container">
                <!-- 点赞数 -->
                <div class="postcard-likeNumberBox">
                    <div class="postcard-likeNumberBox-like">赞同</div>
                    <div class="postcard-likeNumberBox-likenumber">{{ likeNumber }}</div>
                </div>
                <!-- 来自某某小组 -->
                <div class="postcard-groupFromBox" v-if="showGroupFromBox">
                    <div class="postcard-likeNumberBox-like">来自</div>
                    <div class="postcard-likeNumberBox-likenumber">{{ info.groupName + '小组' }}</div>
                </div>
                <!-- 帖子正文 -->
                <PostCardText class="postcard-maintext" :info="info" />
            </div>

            <!-- 收藏 评论 点赞 点踩 -->
            <div class="postcard-dataicon-group" v-if="!notShowIcongroup">
                <!-- <div class="postcard-dataicon-wrapper">
                    <i class="fa-sharp fa-solid fa-eye postcard-icon"></i>
                    <span class="postcard-data-font">{{ info.visits }}</span>
                </div> -->
                <div class="postcard-dataicon-wrapper" @click="handleFav">
                    <i class="fa-solid fa-bookmark postcard-icon" ref="favIcon"></i>
                    <span class="postcard-data-font">{{ favNumber }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleComment">
                    <i class="fa-solid fa-comment postcard-icon" ref="commentIcon"></i>
                    <span class="postcard-data-font">{{ commentNumber }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleDislike">
                    <i class="fa-solid fa-thumbs-down postcard-icon" ref="dislikeIcon"></i>
                    <span class="postcard-data-font">{{ dislikeNumber }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleLike">
                    <i class="fa-solid fa-thumbs-up postcard-icon" ref="likeIcon"></i>
                    <span class="postcard-data-font">{{ likeNumber }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostCardText from './PostCardText.vue';
import PostCardUserInfo from './PostCardUserInfo.vue';
import PostReportButton from './button/PostReportButton.vue';
import PostTopicButton from './button/PostTopicButton.vue';

export default {
    props: ['info', 'notShowTopped', 'notShowGood', 'notShowIcongroup', 'notShowFromGroup'],
    data() {
        return {
            // 要传递给PostCardUserInfo组件的信息
            lzInfo: {
                id: this.info.lzId,
                name: this.info.lzName,
                date: this.info.date,
                imageUrl: this.info.lzImageUrl,
            },
            userLike: false,
            userDislike: false,
            userFav: false,
            userComment: false,
            favNumber: this.info.fav,
            commentNumber: this.info.comments,
            likeNumber: this.info.like,
            dislikeNumber: this.info.dislike,
        }
    },
    components: {
        PostCardText,
        PostCardUserInfo,
        PostTopicButton,
        PostReportButton,
    },
    computed:{
        showGroupFromBox(){
            return !this.notShowFromGroup && this.info.groupName
        },
    },
    methods: {
        // 限制字符串长度为length
        cutStrByLength(str, length) {
            if (str.length > length) {
                return str.slice(0, length - 2) + "..";
            } else {
                return str;
            }
        },

        // 处理 点赞 评论 收藏 点踩
        // 处理收藏
        handleFav() {
            this.userFav = !this.userFav
            this.updateFav()
            if (this.userFav) {
                this.favNumber++;
            }
            else {
                this.favNumber--
            }
        },
        updateFav() {
            if(!this.$refs.favIcon){
                return
            }
            if (this.userFav) {
                this.$refs.favIcon.classList.add('postcard-icon-fav')
            }
            else {
                this.$refs.favIcon.classList.remove('postcard-icon-fav')
            }
        },
        // 处理评论
        handleComment() {
            this.userComment = !this.userComment
            this.updateComment()
            if (this.userComment) {
                this.commentNumber++;
            }
            else {
                this.commentNumber--
            }
        },
        updateComment() {
            if(!this.$refs.commentIcon){
                return
            }
            if (this.userComment) {
                this.$refs.commentIcon.classList.add('postcard-icon-comment')
            }
            else {
                this.$refs.commentIcon.classList.remove('postcard-icon-comment')
            }
        },
        // 处理点赞
        handleLike() {
            this.userLike = !this.userLike
            //点赞与点踩只能有一个
            if (this.userDislike) {
                this.userDislike = false
                this.dislikeNumber--
            }
            this.updateDislike()
            this.updateLike()
            if (this.userLike) {
                this.likeNumber++;
            }
            else {
                this.likeNumber--
            }
        },
        updateLike() {
            if(!this.$refs.likeIcon){
                return
            }
            if (this.userLike) {
                this.$refs.likeIcon.classList.add('postcard-icon-like')
            }
            else {
                this.$refs.likeIcon.classList.remove('postcard-icon-like')
            }
        },
        // 处理点踩
        handleDislike() {
            this.userDislike = !this.userDislike
            //点赞与点踩只能有一个
            if (this.userLike) {
                this.userLike = false
                this.likeNumber--;
            }
            this.updateDislike()
            this.updateLike()
            if (this.userDislike) {
                this.dislikeNumber++;
            }
            else {
                this.dislikeNumber--
            }
        },
        updateDislike() {
            if(!this.$refs.dislikeIcon){
                return
            }
            if (this.userDislike) {
                this.$refs.dislikeIcon.classList.add('postcard-icon-dislike')
            }
            else {
                this.$refs.dislikeIcon.classList.remove('postcard-icon-dislike')
            }
        },
    },
    mounted() {
        // this.favNumber = this.info.fav
        // this.commentNumber = this.info.comments
        // this.likeNumber = this.info.like
        // this.dislikeNumber = this.info.dislike
        this.updateFav();
        this.updateComment();
        this.updateLike();
        this.updateDislike();
    },

}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

.postcard-container {
    margin: 20px 40px;
}

.postcard-main-container {
    position: relative;
    background-color: rgb(255, 247, 247);
    box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2);
}

.postcard-userinfo-container {
    /* background-color: rgb(253, 213, 213); */
    background-color: rgb(253, 233, 233);
}

.postcard-text-container {

    position: relative;
    min-height: 160px;
}

/* 赞同数的醒目box */
.postcard-likeNumberBox {
    /* 位置 */
    position: absolute;
    left: 12px;
    top: 18px;
    /* 大小 */
    width: 110px;
    height: 60px;
    /* 背景 边界 阴影 */
    background-color: rgba(254, 249, 249, 0.6);
    border: 4px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}
/* 所来自小组的醒目box */
.postcard-groupFromBox {
    /* 位置 */
    position: absolute;
    left: 12px;
    top: 95px;
    /* 大小 */
    width: 110px;
    max-height: 160px;
    /* 背景 边界 阴影 */
    background-color: rgba(254, 249, 249, 0.6);
    border: 4px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

}

.postcard-likeNumberBox-like {
    /* 字体 */
    font-size: 16px;
    margin: 4px 0 0 0;
}

.postcard-likeNumberBox-likenumber {
    /* 字体 */
    font-size: 16px;
    font-weight: 600;
    margin: 0 6px 6px 6px;
}

.postcard-maintext {
    margin: 10px 10px 0 150px;
}

/* 置顶 */
.postcard-topped-label {
    background-color: #fec3c3;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5px;
}

/* 加精 */
.postcard-quality-label {
    background-color: #feedc8;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5px;
}

.postcard-label {
    font-size: 13px;
    font-weight: 600;
    margin: 2px 8px;
}

/* 底部点赞收藏等信息 */
.postcard-dataicon-group {
    margin: 0 auto;
    width: 85%;
    height: 40px;
    padding-bottom: 10px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
}

/* 图标的颜色 */
.postcard-icon {
    font-size: 22px;
    color: rgb(97, 97, 97);
    margin: 15px;
    cursor: pointer;
}

.postcard-icon-like {
    color: rgb(252, 53, 53);
}

.postcard-icon-dislike {
    color: rgb(0, 0, 0);
}

.postcard-icon-fav {
    color: rgb(255, 184, 53);
}

.postcard-icon-comment {
    color: rgb(255, 128, 128);
}

.postcard-dataicon-wrapper {
    margin-bottom: 10px;
}

.postcard-data-font {
    margin-bottom: 3px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(35, 35, 35);
}

/* 按钮组 */
.postcard-buttongroup {
    position: absolute;
    top: 1px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

/* 举报按钮 */
.postcard-button-report {
    /* 尺寸 */
    width: 100px;
    height: 36px;
    margin: 10px;
    /* 背景 边界 阴影 */
    background-color: rgba(246, 152, 152, 0.6);
    border: 2px solid rgba(253, 187, 187, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    /* 字体 */
    font-size: 16px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

/* 话题按钮 */
.postcard-button-topic {
    /* 尺寸 */
    width: 120px;
    height: 36px;
    margin: 10px;
    /* 背景 边界 阴影 */
    background-color: rgba(207, 224, 253, 0.6);
    border: 2px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    /* 字体 */
    font-size: 16px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.postcard-button-topic:hover {
    background-color: rgba(155, 190, 252, 1);
}

.postcard-button-report:hover {
    background-color: rgba(255, 126, 126, 1);
}

/* 鼠标移入的动画效果 */
.slide-in {
    animation: slideInAnimation 0.5s forwards;
}

@keyframes slideInAnimation {
    from {
        transform: translateX(-100%);
        opacity: 0.5;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>