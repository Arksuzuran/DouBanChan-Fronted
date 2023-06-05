<template>
    <div style="width: 530px;">
        <div class="header">
            <div class="review-row clearfix">
                <el-image
                    style="width: 50px; height: 50px;float: left"
                    :src="item.reviewerImage"></el-image>
                    <div class="reviewer">
                        <span>{{ reviewerName }}</span>
                        <span style="margin: 0 10px;">评论了</span>
                        <span>{{ videoName }}</span>
                    </div>
                    &nbsp;
                    <RateWithNumber :score="rate" style="float:left"></RateWithNumber>
                    <div class="time">
                        {{ time }}
                    </div>
            </div>
        </div>

        <div class="body">
            <div class="video-image">
                <img :src="videoImageUrl" style="height: 200px;">
            </div>
            <div>
                <div class="title" @click="toReviewPage(reviewId)">{{ topic }}</div>
                <div class="comment-body">
                    <div class="wrapper" @click="toReviewPage(reviewId)">
                        <div class="text">
                            {{ content }}
                        </div>
                        <div class="add">(查看全文)</div>
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
</template>

<script>
import RateWithNumber from '../Video/RateWithNumber.vue'
import qs from "qs"
export default {
    name: 'ReviewSmall',
    components: {
        RateWithNumber,
    },
    props: ['item'],
    data() {
        return {
            userLike: false,
            userDislike: false,
            userFav: false,
            userComment: false,
            //下面是评论的相关信息
            reviewerName: '',
            reviewerImageUrl: '',
            reviewerId: this.item.t_user_id,
            videoId: this.item.t_media_id,
            videoName: '默认',
            videoImageUrl: require('../../assets/movie/1.jpg'),
            time: this.item.t_create_time,
            content: '',
            like: this.item.t_like,
            dislike: this.item.t_dislike,
            topic: this.item.t_topic,
            rate: this.item.t_rate,
            reviewId: this.item.t_id,
            commentNum: this.item.t_floor,
            favNum: 0
        }
    },
    methods: {
        toReviewPage(id){
            console.log(id)
            this.$router.push({
                name: 'review',
                params: {
                    id: id
                }
            })
        },
        handleFav() {
            this.userFav = !this.userFav
            this.updateFav()
            if (this.userFav) {
                this.item.fav++;
            }
            else {
                this.item.fav--
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
        // 处理评论
        handleComment() {
            this.userComment = !this.userComment
            this.updateComment()
            if (this.userComment) {
                this.item.comment++;
            }
            else {
                this.item.comment--
            }
        },
        updateComment() {
            if (this.userComment) {
                this.$refs.commentIcon.classList.add('postcard-icon-comment')
            }
            else {
                this.$refs.commentIcon.classList.remove('postcard-icon-comment')
            }
        },
        handleLike() {
            this.userLike = !this.userLike
            //点赞与点踩只能有一个
            if (this.userDislike) {
                this.userDislike = false
                this.dislike -- ;
            }
            this.updateDislike()
            this.updateLike()
            if (this.userLike) {
                this.like ++ ;
            }
            else {
                this.like -- ;
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
                this.like -- ;
            }
            this.updateDislike()
            this.updateLike()
            if (this.userDislike) {
                this.dislike ++ ;
            }
            else {
                this.dislike -- ;
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
        getReviewer() {
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.item.t_user_id
            }),
            url: "/user/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                console.log(res.data.user)
                this.reviewerName = res.data.user.u_name
                this.reviewerImageUrl = res.data.user.u_profile_photo    //后期要处理
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
            },
        getVideo() {
            this.$axios({
            method: "post",
            data: qs.stringify({
                m_id: this.item.t_media_id
            }),
            url: "/media/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                console.log(res.data.media)
                this.videoName = res.data.media.m_name
                this.videoImageUrl = res.data.media.m_profile_photo    //后期要处理
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
            },
    },
    mounted(){
        this.getReviewer();
        // this.getVideo();

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
        float: left;
        margin: 0px 10px;
    }
    .time{
        color: gray;
        float: left;
        margin-left: 10px;
    }
    .review-row {
        line-height: 50px; /* 将行高设置为元素的高度，实现元素垂直居中 */
        height: 50px;
        text-align: center; /* 将文本水平居中对齐 */
    }
    .review-row div{
        height: 50px;
        line-height: 50px;
    }
    .clearfix::after {
        content: "";
        display: block;
        clear: both;
    }
    .rate{
        float: left;
    }
    .body{
        margin-top: 10px;
        border-radius: 8px;
        background-color: white;
        padding: 10px;
        height: 230px;
        text-align: left;
        box-shadow: 10px 10px 30px #bebebe;
        display: flex;
    }
    .title{
        font-size: 20px;
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
}
.wrapper {
  display: block;
  overflow: hidden;
  margin-top: 10px;
  height: 130px;
  width: 350px;
    background-color: white;
}
.wrapper:hover .text,
.wrapper:hover .add {
  color: red;
}
.text {
  font-size: 18px;
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

</style>