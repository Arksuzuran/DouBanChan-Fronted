<template>
    <!-- 收藏 评论 点赞 点踩 -->
    <div class="postcard-dataicon-group">
        <div class="postcard-dataicon-wrapper" @click="handleLike">
            <i class="fa-solid fa-thumbs-up" :class="iconClass" ref="likeIcon"></i>
            <span :class="fontClass">{{ getLikeNumber }}</span>
        </div>
        <div class="postcard-dataicon-wrapper" @click="handleDislike">
            <i class="fa-solid fa-thumbs-down" :class="iconClass" ref="dislikeIcon"></i>
            <span :class="fontClass">{{ getDislikeNumber }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'LikeButtonGroup',
    props: ['info', 'small'],
    data() {
        return {
            userLike: false,
            userDislike: false,
            basicLikeNumber: this.info.like,
            basicDislikeNumber: this.info.dislike,
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        fontClass() {
            return this.small ? 'postcard-data-font-small' : 'postcard-data-font'
        },
        iconClass() {
            return this.small ? 'postcard-icon-small' : 'postcard-icon'
        },
        getLikeNumber() {
            if (this.userLike) {
                return this.basicLikeNumber + 1;
            }
            else {
                return this.basicLikeNumber;
            }
        },
        getDislikeNumber() {
            if (this.userDislike) {
                return this.basicDislikeNumber + 1;
            }
            else {
                return this.basicDislikeNumber;
            }
        },
    },
    methods: {
        //帖子 文本相关
        ...mapActions('postAbout', ['createGroupPostOnline', 'createTopicPostOnline', 'replyPostOnline', 'likePostOnline', 'dislikePostOnline', 'favPostOnline', 'topPostOnline', 'goodPostOnline', 'replyTextOnline', 'likeTextOnline', 'dislikeTextOnline', 'reportTextOnline', 'deleteTextOnline']),
        // 改变点赞数
        uploadLike(num) {
            //在此向后端发送请求
            this.likeTextOnline({
                textId: this.info.textId,
                userId: this.userId,
                is: num>0
            })
        },
        //改变点踩数
        uploadDislike(num) {
            //在此向后端发送请求
            this.dislikeTextOnline({
                textId: this.info.textId,
                userId: this.userId,
                is: num>0
            })
        },
        // 准备向后端发送点赞信息
        prepareUploadLike() {
            if (this.userLike) {
                this.uploadLike(1)
            }
            else {
                this.uploadLike(-1)
            }
        },
        // 准备向后端发送点踩信息
        prepareUploadDislike() {
            if (this.userDislike) {
                this.uploadDislike(1)
            }
            else {
                this.uploadDislike(-1)
            }
        },
        // 处理点赞
        handleLike() {
            // 更新点赞
            this.userLike = !this.userLike
            this.prepareUploadLike()
            // 点赞与点踩只能有一个
            if (this.userDislike) {
                this.userDislike = false
                this.prepareUploadDislike()
            }
            // 更新css类
            this.updateDislikeClass()
            this.updateLikeClass()
        },
        // 处理点踩
        handleDislike() {
            // 更新点踩
            this.userDislike = !this.userDislike
            this.prepareUploadDislike()
            // 点赞与点踩只能有一个
            if (this.userLike) {
                this.userLike = false
                this.prepareUploadLike()
            }
            // 更新css类
            this.updateDislikeClass()
            this.updateLikeClass()
        },
        // 根据点赞来修改css类
        updateLikeClass() {
            if (this.userLike) {
                this.$refs.likeIcon.classList.add('postcard-icon-like')
            }
            else {
                this.$refs.likeIcon.classList.remove('postcard-icon-like')
            }
        },
        // 根据点踩来修改css类
        updateDislikeClass() {
            if (this.userDislike) {
                this.$refs.dislikeIcon.classList.add('postcard-icon-dislike')
            }
            else {
                this.$refs.dislikeIcon.classList.remove('postcard-icon-dislike')
            }
        },
    },
    mounted() {
        this.updateLikeClass()
        this.updateDislikeClass()
    },
}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

/* 底部点赞收藏等信息 */
.postcard-dataicon-group {
    /* height: 20px; */
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
}

/* 图标的颜色 */
.postcard-icon {
    font-size: 20px;
    color: rgb(97, 97, 97);
    margin: 0 5px 3px 20px;
    cursor: pointer;
}

.postcard-icon-small {
    font-size: 18px;
    color: rgb(97, 97, 97);
    margin: 15px 5px 15px 20px;
    cursor: pointer;
}

.postcard-icon-like {
    color: rgb(252, 53, 53);
}

.postcard-icon-dislike {
    color: rgb(0, 0, 0);
}

.postcard-dataicon-wrapper {
    margin-bottom: -1px;
}

.postcard-data-font {
    margin-right: 8px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(35, 35, 35);
}
</style>