<template>
    <div style="width: 530px;">
        <div class="header">
            
        </div>

        <div class="body">
            <div>
                <div class="review-row">
                <img
                    style="width: 26px; height: 26px; display: inline-block"
                    :src="reviewerImageUrl">
                    <div class="reviewer">
                        <span>{{ reviewerName }}</span>
                        <span style="margin: 0 10px;">评论了</span>
                        <span @click="toVideoDetail(videoId)" class="video-name">{{ videoName }}</span>
                    </div>
                    &nbsp;
                    <RateWithNumber :score="rate" style="float:left"></RateWithNumber>
                    <div class="time">
                        {{ time }}
                    </div>
                </div>
            </div>
            
            <div style="display: flex">
                <div class="video-image" @click="toVideoDetail(videoId)">
                    <img :src="videoImageUrl" style="height: 150px; cursor: pointer" @click="toVideoDetail(videoId)">
                </div>
                <div>
                    <div class="hover-style">
                        <div class="title" @click="toReviewPage(reviewId)">{{ topic }}</div>
                        <div class="comment-body">
                            <div class="wrapper" @click="toReviewPage(reviewId)">
                                <div class="text">
                                    {{ content }}
                                </div>
                                <div class="add">(查看全文)</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="postcard-dataicon-group">
                        <div class="postcard-dataicon-wrapper" @click="handleLike">
                            <i class="fa-solid fa-thumbs-up postcard-icon" ref="likeIcon"></i>
                            <span class="postcard-data-font">{{ like }}</span>
                        </div>
                        <div class="postcard-dataicon-wrapper" @click="handleDislike">
                            <i class="fa-solid fa-thumbs-down postcard-icon" ref="dislikeIcon"></i>
                            <span class="postcard-data-font">{{ dislike }}</span>
                        </div>
                        <div class="postcard-dataicon-wrapper" @click="handleComment">
                            <i class="fa-solid fa-comment postcard-icon" ref="commentIcon"></i>
                            <span class="postcard-data-font">{{ commentNum }}</span>
                        </div>
                        <div class="postcard-dataicon-wrapper" @click="handleFav">
                            <i class="fa-solid fa-bookmark postcard-icon" ref="favIcon"></i>
                            <span class="postcard-data-font">{{ favNum }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import RateWithNumber from '../Video/RateWithNumber.vue'
import qs from "qs"
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'ReviewSmall',
    components: {
        RateWithNumber,
    },
    props: ['item'],
    computed: {
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    data() {
        return {
            userLike: false,
            userDislike: false,
            userFav: false,
            userComment: false,
            //下面是评论的相关信息
            reviewerName: this.item.userName,
            reviewerImageUrl: this.item.userImageUrl,
            reviewerId: this.item.userId,
            videoId: '',
            videoName: '', //根据videoId获取
            videoImageUrl: '',  //根据videoId获取得到
            time: this.item.date,
            content: this.item.text,
            like: this.item.like,
            dislike: this.item.dislike,
            topic: this.item.t_topic,
            rate: this.item.t_rate,
            reviewId: this.item.textId,
            commentNum: this.item.comments,
            favNum: this.item.t_favorite,
            type: '',
        }
    },
    methods: {
        toBookReviewPage(id){
            this.$router.push({
                name: 'bookReview',
                params: {
                    t_id: this.item.textId,
                    m_id: id
                }
            })
        },
        toVideoReviewPage(id){
            this.$router.push({
                name: 'videoReview',
                params: {
                    t_id: this.item.textId,
                    m_id: id
                }
            })
        },
        clickLike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.item.textId,
            }),
            url: "/text/like/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },
        clickCancelLike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.item.textId,
            }),
            url: "/text/cancel_like/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },
        clickDislike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.item.textId,
            }),
            url: "/text/dislike/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },
        clickCancelDislike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.item.textId,
            }),
            url: "/text/cancel_dislike/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },
        clickFavorite(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.item.textId,
            }),
            url: "/text/text_set_favorite/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },
        clickCancelFavorite(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.item.textId,
            }),
            url: "/text/text_cancel_favorite/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },

        toReviewPage(id){
            if (this.type === '1')
                this.$router.push({
                    name: 'videoReview',
                    params: {
                        m_id: id,
                        t_id: this.item.textId
                    }
                })
            else{
                this.$router.push({
                    name: 'bookReview',
                    params: {
                        m_id: id,
                        t_id: this.item.textId
                    }
                })
            }
        },
        handleFav() {
            this.userFav = !this.userFav
            this.updateFav()
            if (this.userFav) {
                this.item.t_favorite++;
                this.clickFavorite()
            }
            else {
                this.item.t_favorite--
                this.clickCancelFavorite()
            }
        },
        updateFav() {
            if (this.userFav) {
                this.$refs.favIcon.classList.add('postcard-icon-fav')
            }
            else {
                this.$refs.favIcon.classList.remove('postcard-icon-fav')
            }
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
        //根据id得到对应的影视
        getVideo(id) {
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                m_id: id
            }),
            url: "/media/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.videoName = res.data.media.m_name
                this.videoImageUrl = res.data.media.m_profile_photo
                this.type = res.data.media.m_type
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },
        
        getStatus(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.item.textId
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
                this.updateFav()
            })
            // .catch((err) => {
            //     this.$message.error("网络出错QAQ")
            // });
        },
        handleComment(){
            if (this.type !== '1')
                this.toReviewPage(this.videoId)
            else
                this.toReviewPage(this.videoId)
        },
        //跳转到影视详情
        toVideoDetail(videoId) {
            this.$router.push({ name: 'videoDetail', params: { id: videoId } })
        },
        //跳转到图书详情
        toBookDetail(bookId){
            this.$router.push({ name: 'bookDetail', params: { id: bookId } })
        }
    },
    mounted(){
        this.getStatus()
        this.videoId = this.item.textId
        this.getVideo(this.videoId)
        // 假设htmlContent包含HTML代码
        var htmlContent = this.item.t_description;
        // 定义一个正则表达式
        var regExp = /<[^>]+>/g;
        // 去除HTML标签，提取文本内容
        var textContent = htmlContent.replace(regExp, "");
        this.content = textContent;
        // 输出："这是一段HTML代码这是另一段HTML代码"
    }
}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';
    .reviewer{
        margin-left: 10px;
        font-size: 14px;
    }
    .time{
        color: gray;
        margin-left: 10px;
    }
    .review-row {
        line-height: 30px; /* 将行高设置为元素的高度，实现元素垂直居中 */
        height: 30px;
        text-align: center; /* 将文本水平居中对齐 */
        display: flex
    }
    .body{
        margin: 10px 0px;
        border-radius: 8px;
        background-color: white;
        padding: 10px;
        height: 230px;
        text-align: left;
        box-shadow: 10px 10px 30px #bebebe;
    }
    .title{
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
    }

    .content {
    overflow : hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    position: relative;
    text-overflow: "";
    }
    .postcard-icon {
    font-size: 22px;
    color: rgb(97, 97, 97);
    margin: 5px 15px;
    cursor: pointer;
}
.postcard-dataicon-group {
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
}
    .postcard-icon-like {
        color: rgb(252, 53, 53);
    }

    .postcard-icon-dislike {
        color: rgb(0, 0, 0);
    }
    .postcard-data-font {
    margin-bottom: 3px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(35, 35, 35);
}

.comment-body{
    display:flex;
}
.video-image{
    margin-right: 10px;
    margin-top: 10px;
}
.wrapper {
  display: block;
  overflow: hidden;
  margin-top: 10px;
  height: 100px;
  width: 350px;
    background-color: white;
}
/* .hover-style:hover .title,
.hover-style:hover .wrapper{
    color:gray;
} */
.wrapper:hover .text,
.wrapper:hover .add {
  color: gray;
}
.text {
  font-size: 16px;
  overflow: hidden;
  /* display: flex; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
  cursor: pointer;
}
.add{
    cursor: pointer;
}
.text::before {
  content: '';
  height: calc(100% - 18px);
  float: right;
}
/* .exp:checked+.text{
  -webkit-line-clamp: 999;
}
.exp:checked+.text::after{
  visibility: hidden;
}
.exp:checked+.text .btn::before{
  content:'收起'
} */
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

.video-name{
    cursor: pointer;
}
.video-name:hover{
    color: gray;
}
</style>