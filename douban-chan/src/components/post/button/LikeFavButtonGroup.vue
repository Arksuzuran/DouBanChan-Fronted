<!-- 页面右下角 点赞点踩收藏悬浮框 -->
<!-- 在Post.vue里被调用 -->
<template>
    <div class="likefav-button-group-container">
        <div class="likefav-button-group-dataicon-wrapper" @click="handleLike">
            <i class="fa-solid fa-thumbs-up likefav-button-group-icon" ref="likeIcon"></i>
            <span class="likefav-button-group-data-font">{{ getLikeNumber }}</span>
        </div>
        <div class="likefav-button-group-dataicon-wrapper" @click="handleDislike">
            <i class="fa-solid fa-thumbs-down likefav-button-group-icon" ref="dislikeIcon"></i>
            <span class="likefav-button-group-data-font">{{ getDislikeNumber }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LikeFavButtonGroup',
    props: ['info'],
    data() {
        return {
            userLike: false,
            userDislike: false,
            basicLikeNumber: this.info.like,
            basicDislikeNumber: this.info.dislike,
        }
    },
    computed:{
        getLikeNumber(){
            if(this.userLike){
                return this.basicLikeNumber + 1;
            }
            else{
                return this.basicLikeNumber;
            }
        },
        getDislikeNumber(){
            if(this.userDislike){
                return this.basicDislikeNumber + 1;
            }
            else{
                return this.basicDislikeNumber;
            }
        },
    },
    methods:{
        // 改变点赞数
        uploadLike(num){
            //在此向后端发送请求
        },
        //改变点踩数
        uploadDislike(num){
            //在此向后端发送请求
        },
        // 准备向后端发送点赞信息
        prepareUploadLike(){
            if (this.userLike) {
                this.uploadLike(1)
            }
            else {
                this.uploadLike(-1)
            }
        },
        // 准备向后端发送点踩信息
        prepareUploadDislike(){
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
                this.$refs.likeIcon.classList.add('likefav-button-group-icon-like')
            }
            else {
                this.$refs.likeIcon.classList.remove('likefav-button-group-icon-like')
            }
        },
        // 根据点踩来修改css类
        updateDislikeClass() {
            if (this.userDislike) {
                this.$refs.dislikeIcon.classList.add('likefav-button-group-icon-dislike')
            }
            else {
                this.$refs.dislikeIcon.classList.remove('likefav-button-group-icon-dislike')
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

/* 图标的颜色 */
.likefav-button-group-icon {
    font-size: 20px;
    color: rgb(97, 97, 97);
    margin: 5px;
    cursor: pointer;
}
.likefav-button-group-icon-like {
    color: rgb(252, 53, 53);
}
.likefav-button-group-icon-dislike {
    color: rgb(0, 0, 0);
}
.likefav-button-group-dataicon-wrapper {
    margin-bottom: -1px;
}
.likefav-button-group-data-font {
    margin-right: 8px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(35, 35, 35);
}

.likefav-button-group-container {
    width: 120px;
    position: fixed;
    bottom: 150px;
    right: 10px;
    border-radius: 5px;
    background-color: rgb(255, 217, 217);
    border: 3px solid rgba(254, 232, 232, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
}

.likefav-button-group-button-report {
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

.likefav-button-group-button-report:hover {
    background-color: rgba(255, 126, 126, 1);
}

/* 鼠标移入的动画效果 */
.likefav-button-group-slide-in {
    animation: slideInAnimation 0.5s forwards;
}

@keyframes slideInAnimation {
    from {
        /* transform: translateX(-100%); */
        opacity: 0.5;
    }

    to {
        /* transform: translateX(0); */
        opacity: 1;
    }
}
</style>