<template>
    <div style="margin: 25px 0px">
        <div class="header">
            <div class="review-row clearfix">
                <el-image
                    style="width: 50px; height: 50px;float: left"
                    :src="item.reviewerImage"></el-image>
                    <div class="reviewer">
                        {{ item.reviewername }}
                    </div>
                    &nbsp;
                    <RateWithNumber :score="item.rate" style="float:left"></RateWithNumber>
                    <div class="time">
                        {{ item.time }}
                    </div>
            </div>
        </div>

        <div class="body">
            <div class="title" @click="toReviewPage(item.id)">{{ item.title }}</div>
            <div class="wrapper">
                <input id="exp1" class="exp"  type="checkbox">
                <div class="text" @click="toReviewPage(item.id)">
                    <label class="btn" for="exp1"></label>
                    {{ item.content }}
                </div>
            </div>
            <div class="postcard-dataicon-group">
                <div class="postcard-dataicon-wrapper" @click="handleLike">
                    <i class="fa-solid fa-thumbs-up postcard-icon" ref="likeIcon"></i>
                    <span class="postcard-data-font">{{ item.agree }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleDislike">
                    <i class="fa-solid fa-thumbs-down postcard-icon" ref="dislikeIcon"></i>
                    <span class="postcard-data-font">{{ item.disagree }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleComment">
                    <i class="fa-solid fa-comment postcard-icon" ref="commentIcon"></i>
                    <span class="postcard-data-font">{{ item.comment }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleFav">
                    <i class="fa-solid fa-bookmark postcard-icon" ref="favIcon"></i>
                    <span class="postcard-data-font">{{ item.fav }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import RateWithNumber from '../Video/RateWithNumber.vue'
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
        }
    },
    methods: {
        toReviewPage(id){
            console.log(id)
            this.$router.push({
                path: '/review',
                query: {
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
                this.item.disagree -- 
            }
            this.updateDislike()
            this.updateLike()
            if (this.userLike) {
                this.item.agree++;
            }
            else {
                this.item.agree--
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
                this.item.agree--;
            }
            this.updateDislike()
            this.updateLike()
            if (this.userDislike) {
                this.item.disagree++;
            }
            else {
                this.item.disagree--
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
        box-shadow: 10px 10px 30px #bebebe;
        transition: all 0.3s ease-in-out; 
    }
    .body:hover {
        box-shadow: 10px 10px 30px #bebebe;
        transform: translate(0,-8px);
        transition-delay: 0s !important;
    }
    .title{
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }

    .content {
    overflow : hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
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
    width: 85%;
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
 
.wrapper {
  display: flex;
  overflow: hidden;
  margin-top: 10px;
background-color: white;
}
.text {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  /* display: flex; */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  position: relative;
  cursor: pointer;
}
.text::before {
  content: '';
  height: calc(100% - 18px);
  float: right;
}
.text::after {
  content: '';
  width: 999vw;
  height: 999vw;
  position: absolute;
  box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
    margin-left: -100px;
}
.btn{
  float: right;
  clear: both;
  margin-left: 10px;
  font-size: 12px;
  padding: 0 8px;
  background: white;
  line-height: 16px;
  border: 1px solid black;
  border-radius: 4px;
  color:  black;
  cursor: pointer;
  /* margin-top: -30px; */
}
.exp{
    display: none;
}
.btn::before{
  content:'>详细'
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