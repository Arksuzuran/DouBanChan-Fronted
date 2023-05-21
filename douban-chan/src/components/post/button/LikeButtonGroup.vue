<template>
    <!-- 收藏 评论 点赞 点踩 -->
    <div class="postcard-dataicon-group">
        <div class="postcard-dataicon-wrapper" @click="handleLike">
            <i class="fa-solid fa-thumbs-up" :class="iconClass" ref="likeIcon"></i>
            <span :class="fontClass">{{ likeNumber }}</span>
        </div>
        <div class="postcard-dataicon-wrapper" @click="handleDislike">
            <i class="fa-solid fa-thumbs-down" :class="iconClass" ref="dislikeIcon"></i>
            <span :class="fontClass">{{ dislikeNumber }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'LikeButtonGroup',
    props: ['like', 'dislike', 'textId', 'small'],
    data() {
        return {
            userLike: false,
            userDislike: false,
            likeNumber: this.like,
            dislikeNumber: this.dislike,
        }
    },
    computed:{
        fontClass(){
            return this.small ? 'postcard-data-font-small' : 'postcard-data-font'
        },
        iconClass(){
            return this.small ? 'postcard-icon-small' : 'postcard-icon'
        },
    },
    methods:{
        // 改变点赞数
        addLike(num){
            this.likeNumber += num
            //在此向后端发送请求
        },
        //改变点踩数
        addDislike(num){
            this.dislikeNumber += num
            //在此向后端发送请求
        },
        // 处理点赞
        handleLike() {
            this.userLike = !this.userLike
            //点赞与点踩只能有一个
            if (this.userDislike) {
                this.userDislike = false
                this.addDislike(-1)
            }
            this.updateDislike()
            this.updateLike()
            if (this.userLike) {
                this.addLike(1)
            }
            else {
                this.addLike(-1)
            }
        },
        updateLike() {
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
                this.addLike(-1)
            }
            this.updateDislike()
            this.updateLike()
            if (this.userDislike) {
                this.addDislike(1)
            }
            else {
                this.addDislike(-1)
            }
        },
        updateDislike() {
            if (this.userDislike) {
                this.$refs.dislikeIcon.classList.add('postcard-icon-dislike')
            }
            else {
                this.$refs.dislikeIcon.classList.remove('postcard-icon-dislike')
            }
        },
    },
    mounted() {
        this.likeNumber = this.like
        this.dislikeNumber = this.dislike
        this.updateLike()
        this.updateDislike()
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
.postcard-icon-small{
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