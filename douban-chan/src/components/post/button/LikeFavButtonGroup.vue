<!-- 页面右下角 点赞点踩收藏框 -->
<!-- 注意：组件本身没有使用fixed 需要在父组件里指定 -->
<!-- 在Post.vue里被调用 -->
<template>
    <div class="likefav-container">
        <!-- <div class="likefav-dataicon-wrapper" @click="handleLike">
            <i class="fa-solid fa-thumbs-up likefav-icon" ref="likeIcon"></i>
            <span class="likefav-data-font">{{ getLikeNumber }}</span>
        </div>
        <div class="likefav-dataicon-wrapper" @click="handleDislike">
            <i class="fa-solid fa-thumbs-down likefav-icon" ref="dislikeIcon"></i>
            <span class="likefav-data-font">{{ getDislikeNumber }}</span>
        </div> -->
        <div class="likefav-button" @mouseenter="mouseenterButton(1)" @mouseleave="mouseleaveButton(1)"
            @click="handleFav" :class="getFavButtonClass" ref="favButton">
            <i class="fa-solid fa-bookmark likefav-icon" ref="favIcon"></i>
            <span class="likefav-data-font" ref="favText">{{ getFavNumber }}</span>
        </div>

        <div class="likefav-button" @mouseenter="mouseenterButton(2)" @mouseleave="mouseleaveButton(2)"
            @click="handleLike" :class="getLikeButtonClass" ref="likeButton">
            <i class="fa-solid fa-thumbs-up likefav-icon"  ref="likeIcon"></i>
            <span class="likefav-data-font" ref="likeText">{{ getLikeNumber }}</span>
        </div>

        <div class="likefav-button" @mouseenter="mouseenterButton(3)" @mouseleave="mouseleaveButton(3)"
            @click="handleDislike" :class="getDislikeButtonClass" ref="dislikeButton">
            <i class="fa-solid fa-thumbs-down likefav-icon" ref="dislikeIcon"></i>
            <span class="likefav-data-font" ref="dislikeText">{{ getDislikeNumber }}</span>
        </div>

    </div>
</template>

<script>
export default {
    name: 'LikeFavButtonGroup',
    props: ['info'],
    data() {
        return {
            userFav: false,
            userLike: false,
            userDislike: false,
            basicFavNumber: this.info.fav,
            basicLikeNumber: this.info.like,
            basicDislikeNumber: this.info.dislike,
            enterLike: false,
            enterDislike: false,
            enterFav: false,
        }
    },
    computed:{
        // 点赞数 点踩数 收藏数
        getLikeNumber(){
            return this.enterLike ? (this.userLike ? '取消点赞' : '点赞') : (this.userLike ? this.basicLikeNumber + 1 : this.basicLikeNumber);
        },
        getDislikeNumber(){
            return this.enterDislike ? (this.userDislike ? '取消点踩' : '点踩') : (this.userDislike ? this.basicDislikeNumber + 1 : this.basicDislikeNumber);
        },
        getFavNumber(){
            return this.enterFav ? (this.userFav ? '取消收藏' : '收藏') : (this.userFav ? this.basicFavNumber + 1 : this.basicFavNumber);
        },
        // 根据当前点赞 点踩 收藏情况改变按钮颜色
        getLikeButtonClass(){
            return this.userLike ? "likefav-button-like" : '';
        },
        getDislikeButtonClass(){
            return this.userDislike ? "likefav-button-dislike" : '';
        },
        getFavButtonClass(){
            return this.userFav ? "likefav-button-fav" : '';
        },
    },
    methods:{
        // 处理点赞
        handleLike() {
            // 更新点赞
            this.userLike = !this.userLike
            this.prepareUploadLike()
            // 点赞与点踩只能有一个
            if (this.userLike && this.userDislike) {
                this.userDislike = false
                this.prepareUploadDislike()
            }
            // 更新css类
            // this.updateDislikeClass()
            // this.updateLikeClass()
        },
        // 处理点踩
        handleDislike() {
            // 更新点踩
            this.userDislike = !this.userDislike
            this.prepareUploadDislike()
            // 点赞与点踩只能有一个
            if (this.userLike && this.userDislike) {
                this.userLike = false
                this.prepareUploadLike()
            }
            // 更新css类
            // this.updateDislikeClass()
            // this.updateLikeClass()
        },
        // 处理收藏
        handleFav() {
            // 更新收藏
            this.userFav = !this.userFav
            this.prepareUploadFav()
            // this.updateFavClass()
        },
        // 改变点赞数
        uploadLike(num){
            //在此向后端发送请求
            // console.log('向后端发送请求：点赞数',num)
        },
        //改变点踩数
        uploadDislike(num){
            //在此向后端发送请求
            // console.log('向后端发送请求：点踩数',num)
        },
        //改变收藏数
        uploadFav(num){
            //在此向后端发送请求
            // console.log('向后端发送请求：收藏数',num)
        },
        // 准备向后端发送点赞信息
        prepareUploadLike(){
            this.userLike ? this.uploadLike(1) : this.uploadLike(-1)
        },
        // 准备向后端发送点踩信息
        prepareUploadDislike(){
            this.userDislike ? this.uploadDislike(1) : this.uploadDislike(-1)
        },
        //准备向后端发送收藏信息
        prepareUploadFav(){
            this.userFav ? this.uploadFav(1) : this.uploadFav(-1)
        },
        // // 根据点赞来修改css类
        // updateLikeClass() {
        //     if (this.userLike) {
        //         this.$refs.likeIcon.classList.add('likefav-icon-like')
        //     }
        //     else {
        //         this.$refs.likeIcon.classList.remove('likefav-icon-like')
        //     }
        // },
        // // 根据点踩来修改css类
        // updateDislikeClass() {
        //     if (this.userDislike) {
        //         this.$refs.dislikeIcon.classList.add('likefav-icon-dislike')
        //     }
        //     else {
        //         this.$refs.dislikeIcon.classList.remove('likefav-icon-dislike')
        //     }
        // },
        // 按钮动效
        mouseenterButton(index) {
            if(index === 1){
                this.enterFav = true
                this.$refs.favButton.classList.add('likefav-slide-in')
            }
            else if(index === 2){
                this.enterLike = true
                this.$refs.likeButton.classList.add('likefav-slide-in')
            }
            else if(index === 3){
                this.enterDislike = true
                this.$refs.dislikeButton.classList.add('likefav-slide-in')
            }
        },
        // 需要注意的是，此处替换了文本内容 也就失去了vue的自动更新，因此我们必须手动更新like和dislike这一对互相影响的对象
        mouseleaveButton(index) {
            if(index === 1){
                this.enterFav = false
                this.$refs.favButton.classList.remove('likefav-slide-in')
            }
            else if(index === 2){
                this.enterLike = false
                this.$refs.likeButton.classList.remove('likefav-slide-in')
            }
            else if(index === 3){
                this.enterDislike = false
                this.$refs.dislikeButton.classList.remove('likefav-slide-in')
            }
        },
    },
    mounted() {

    },
}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

/* 按钮样式 */
.likefav-button {
    /* 尺寸 */
    width: 110px;
    height: 36px;
    margin: 10px 0;
    /* 背景 边界 阴影 */
    background-color: rgba(255, 242, 242, 0.8);
    border: 2px solid rgba(253, 187, 187, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    /* 字体 */
    font-size: 16px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-around;
}
.likefav-button:hover {
    background-color: rgba(255, 126, 126, 1);
}
.likefav-button-like{
    background-color: rgb(255, 53, 53);
    color: white;
}
.likefav-button-dislike{
    background-color: rgb(90, 90, 90);
    color: white;
}
.likefav-button-fav{
    background-color: rgb(255, 107, 77);
    color: white;
}
/* 鼠标移入的动画效果 */
.likefav-slide-in {
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


/* 图标的颜色 */
.likefav-icon {
    font-size: 20px;
    /* color: rgb(97, 97, 97); */
    margin: 5px;
    cursor: pointer;
}
.likefav-icon-like {
    color: rgb(252, 53, 53);
}
.likefav-icon-dislike {
    color: rgb(0, 0, 0);
}
.likefav-dataicon-wrapper {
    margin-bottom: -1px;
}
.likefav-data-font {
    margin-right: 8px;
    font-size: 16px;
    font-weight: 500;
}

.likefav-container {
    width: 130px;
    
    border-radius: 5px;
    background-color: rgb(255, 217, 217);
    border: 3px solid rgba(254, 232, 232, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
}
</style>