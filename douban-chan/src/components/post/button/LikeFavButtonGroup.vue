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
        <div class="likefav-button" @mouseenter="mouseenterButton(1)" @mouseleave="mouseleaveButton(1)" @click="handleFav"
            :class="getFavButtonClass" ref="favButton">
            <i class="fa-solid fa-bookmark likefav-icon" ref="favIcon"></i>
            <span class="likefav-data-font" ref="favText">{{ getFavNumber }}</span>
        </div>

        <div class="likefav-button" @mouseenter="mouseenterButton(2)" @mouseleave="mouseleaveButton(2)" @click="handleLike"
            :class="getLikeButtonClass" ref="likeButton">
            <i class="fa-solid fa-thumbs-up likefav-icon" ref="likeIcon"></i>
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
import qs from 'qs'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'LikeFavButtonGroup',
    props: ['info'],
    data() {
        return {
            enterLike: false,
            enterDislike: false,
            enterFav: false,
        }
    },
    computed: {
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        ...mapGetters('postAbout',['postList', 'postInfo']),
        // 点赞数 点踩数 收藏数
        getLikeNumber() {
            return this.enterLike ? (this.postInfo.userLike ? '取消点赞' : '点赞') : (this.postInfo.like);
        },
        getDislikeNumber() {
            return this.enterDislike ? (this.postInfo.userDislike ? '取消点踩' : '点踩') : (this.postInfo.dislike);
        },
        getFavNumber() {
            return this.enterFav ? (this.postInfo.userFav ? '取消收藏' : '收藏') : (this.postInfo.fav);
        },
        // 根据当前点赞 点踩 收藏情况改变按钮颜色
        getLikeButtonClass() {
            return this.postInfo.userLike ? "likefav-button-like" : '';
        },
        getDislikeButtonClass() {
            return this.postInfo.userDislike ? "likefav-button-dislike" : '';
        },
        getFavButtonClass() {
            return this.postInfo.userFav ? "likefav-button-fav" : '';
        },
    },
    methods: {
        //帖子 文本相关
        //获取话题列表
        ...mapActions('topicAbout', ['getTopicListSearchOnline', 'getTopicListOnline', 'getTopicListByHotOnline', 'getTopicListMineOnline', 'getTopicInfoOnline', 'getTopicListByGroupIdOnline', 'getTopicListSearchOnline']),
        //获取帖子列表 或者一个完整的帖子
        ...mapActions('postAbout', ['getPostListSearchOnline', 'getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline', 'getPostListMineOnline', 'getPostOnline', 'getPostListSearchOnline']),
        ...mapActions('postAbout', ['createPostOnline', 'createPostOnline', 'replyPostOnline', 'likePostOnline', 'dislikePostOnline', 'favPostOnline', 'topPostOnline', 'goodPostOnline', 'replyTextOnline', 'likeTextOnline', 'dislikeTextOnline', 'reportTextOnline', 'deleteTextOnline']),
        //获取小组列表    
        ...mapActions('groupAbout', ['getGroupListSearchOnline', 'getGroupListOnline', 'getGroupListByHotOnline', 'getGroupListMineOnline', 'getGroupInfoOnline', 'getGroupListSearchOnline']),
        // getNum() {
        //     this.$axios({
        //         method: "post",
        //         data: qs.stringify({
        //             p_id: this.info.postId,
        //             u_id: this.userId,
        //         }),
        //         url: "/post/get_post_status1/",
        //         headers: { "content-type": "application/x-www-form-urlencoded" },
        //     }).then((res) => {
        //         this.userLike = res.data.post_is_like
        //         this.userDislike = res.data.post_is_dislike
        //         this.userFav = res.data.post_is_favorite
        //         this.favNumber = res.data.post_favorite_num
        //         this.likeNumber = res.data.post_like_num
        //         this.dislikeNumber = res.data.post_dislike_num
        //     })
        //         .catch((err) => {
        //             this.$message.error("网络出错QAQ")
        //         });
        // },
        async getData(id) {
            console.log('尝试向后端发送数据', id)
            // 从后端获取数据
            try {
                await this.getPostOnline({
                    userId: this.userId,
                    postId: id,
                })
            } catch (err) {
                this.$message.error('网络错误, 无法加载帖子信息')
            }
        },
        async update() {
            console.log(this.userId)
            try {
                await this.getPostOnline({
                    userId: this.userId,
                    postId: this.info.postId,
                })
            } catch (err) {
                this.$message.error('网络错误, 无法加载帖子信息')
            }
        },
        // 处理点赞
        handleLike() {
            // 点赞与点踩只能有一个
            if (!this.postInfo.userLike && this.postInfo.userDislike) {
                this.postInfo.userDislike = false
                // this.uploadDislike(false)
            }
            // 更新点赞
            this.postInfo.userLike = !this.postInfo.userLike
            this.uploadLike(this.postInfo.userLike)
            console.log(this.postInfo)
            // this.update()
            // 更新css类
            // this.updateDislikeClass()
            // this.updateLikeClass()
        },
        // 处理点踩
        handleDislike() {
            // 点赞与点踩只能有一个
            if (this.postInfo.userLike && !this.postInfo.userDislike) {
                this.postInfo.userLike = false
                // this.uploadLike(false)
            }
            // 更新点踩
            this.postInfo.userDislike = !this.postInfo.userDislike
            this.uploadDislike(this.postInfo.userDislike)
            console.log('点踩')
            console.log(this.postInfo)
            // this.update()
        },
        // 处理收藏
        handleFav() {
            // 更新收藏
            this.postInfo.userFav = !this.postInfo.userFav
            this.uploadFav(this.postInfo.userFav)
            console.log('收藏',this.postInfo.userFav)
            // this.updateFavClass()
            // this.update()
        },
        // 改变点赞数
        async uploadLike(is) {
            // if (is) {
            //     this.postInfo.like++;
            // }
            // else {
            //     this.postInfo.like--;
            // }
            //在此向后端发送请求
            // console.log('向后端发送请求：点赞数',num)
            try {
                await this.likePostOnline({
                    postId: this.info.postId,
                    userId: this.userId,
                    is,
                })
                await this.update()
            } catch (err) {
                this.$message.error('网络错误，点赞失败')
            }
            console.log('点赞动作结束', this.postInfo)
        },
        //改变点踩数
        async uploadDislike(is) {
            // if (is) {
            //     this.postInfo.dislike++;
            // }
            // else {
            //     this.postInfo.dislike--;
            // }
            //在此向后端发送请求
            // console.log('向后端发送请求：点踩数',num)
            try {
                await this.dislikePostOnline({
                    postId: this.info.postId,
                    userId: this.userId,
                    is,
                })
                await this.update()
            } catch (err) {
                this.$message.error('网络错误，点踩失败')
            }

            console.log('点踩动作结束', this.postInfo)
        },
        //改变收藏数
        async uploadFav(is) {
            // if (is) {
            //     this.postInfo.fav++;
            // }
            // else {
            //     this.postInfo.fav--;
            // }
            //在此向后端发送请求
            // console.log('向后端发送请求：收藏数',num)
            try {
                await this.favPostOnline({
                    postId: this.info.postId,
                    userId: this.userId,
                    is,
                })
                await this.update()
            } catch (err) {
                this.$message.error('网络错误，收藏失败')
            }
            
            console.log('收藏动作结束', this.postInfo)
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
            if (index === 1) {
                this.enterFav = true
                this.$refs.favButton.classList.add('likefav-slide-in')
            }
            else if (index === 2) {
                this.enterLike = true
                this.$refs.likeButton.classList.add('likefav-slide-in')
            }
            else if (index === 3) {
                this.enterDislike = true
                this.$refs.dislikeButton.classList.add('likefav-slide-in')
            }
        },
        // 需要注意的是，此处替换了文本内容 也就失去了vue的自动更新，因此我们必须手动更新like和dislike这一对互相影响的对象
        mouseleaveButton(index) {
            if (index === 1) {
                this.enterFav = false
                this.$refs.favButton.classList.remove('likefav-slide-in')
            }
            else if (index === 2) {
                this.enterLike = false
                this.$refs.likeButton.classList.remove('likefav-slide-in')
            }
            else if (index === 3) {
                this.enterDislike = false
                this.$refs.dislikeButton.classList.remove('likefav-slide-in')
            }
        },
    },
    mounted() {
        this.update()
        console.log('点赞模块初始化',this.postInfo)
        // console.log('初始布尔值', this.userFav, this.userLike, this.userDislike)
        // console.log('初始收藏赞踩', this.favNumber, this.likeNumber, this.dislikeNumber)
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

.likefav-button-like {
    background-color: rgb(255, 53, 53);
    color: white;
}

.likefav-button-dislike {
    background-color: rgb(90, 90, 90);
    color: white;
}

.likefav-button-fav {
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