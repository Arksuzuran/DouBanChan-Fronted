<template>
    <!-- 收藏 评论 点赞 点踩 -->
    <div class="postcard-dataicon-group">
        <div class="postcard-dataicon-wrapper" @click="handleLike">
            <i class="fa-solid fa-thumbs-up" :class="iconClass" ref="likeIcon"></i>
            <span :class="fontClass">{{ like }}</span>
        </div>
        <div class="postcard-dataicon-wrapper" @click="handleDislike">
            <i class="fa-solid fa-thumbs-down" :class="iconClass" ref="dislikeIcon"></i>
            <span :class="fontClass">{{ dislike }}</span>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'LikeButtonGroup',
    props: ['info', 'small'],
    data() {
        return {
            userLike: false,
            userDislike: false,
            like: this.info.like,
            dislike: this.info.dislike
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
    },
    methods:{
        clickLike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.info.textId,
            }),
            url: "/text/like/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        },
        clickCancelLike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.info.textId,
            }),
            url: "/text/cancel_like/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        },
        clickDislike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.info.textId,
            }),
            url: "/text/dislike/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        },
        clickCancelDislike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.info.textId,
            }),
            url: "/text/cancel_dislike/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        },
        handleLike() {
            this.userLike = !this.userLike
            //点赞与点踩只能有一个
            if (this.userDislike) {
                this.userDislike = false
                this.dislike -- 
                // this.clickCancelDislike()
            }
            this.updateDislike()
            this.updateLike()
            if (this.userLike) {
                this.like++;
                this.clickLike()
            }
            else {
                this.like--
                this.clickCancelLike()
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
                this.like--;
                // this.clickCancelLike()
            }
            this.updateDislike()
            this.updateLike()
            if (this.userDislike) {
                this.dislike++;
                this.clickDislike()
            }
            else {
                this.dislike--
                this.clickCancelDislike()
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
        getStatus(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.info.textId
            }),
            url: "/media/get_status/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.userLike = res.data.is_liked
                this.userDislike = res.data.is_disliked
                this.userFav = res.data.is_favorite
                this.updateLike()
                this.updateDislike()
                // this.updateFav()
                console.log(this.userLike)
                console.log(this.userDislike)
                console.log(this.userFav)
            })
            .catch((err) => {
                // this.$message.error("网络出错QAQ")
            });
        }
    },
    mounted() {
        this.getStatus()
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