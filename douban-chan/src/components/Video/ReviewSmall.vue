<template>
    <div style="margin: 25px 0px">
        <div class="header">
        </div>

        <div class="body">
            <div class="review-row">
                <el-image
                    style="width: 30px; height: 30px;"
                    :src="item.userImageUrl"></el-image>
                    <div class="reviewer">
                        {{ item.userName }}
                    </div>
                    &nbsp;
                    <RateWithNumber_M :score="item.t_rate" style="float:left"></RateWithNumber_M>
                    <div class="time">
                        {{ item.date }}
                    </div>
            </div>
            <div style="text-align: left;">
                <div class="title" @click="toReviewPage(item.textId)">{{ item.t_topic }}</div>
                <div class="wrapper">
                    <input id="exp1" class="exp"  type="checkbox">
                    <div class="text" @click="toReviewPage(item.textId)">
                        {{ textContent }}
                    </div>
                </div>
            </div>
            
            <div class="postcard-dataicon-group">
                <div class="postcard-dataicon-wrapper" @click="handleLike">
                    <i class="fa-solid fa-thumbs-up postcard-icon" ref="likeIcon"></i>
                    <span class="postcard-data-font">{{ item.like }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleDislike">
                    <i class="fa-solid fa-thumbs-down postcard-icon" ref="dislikeIcon"></i>
                    <span class="postcard-data-font">{{ item.dislike }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="toReviewPage(item.textId)">
                    <i class="fa-solid fa-comment postcard-icon" ref="commentIcon"></i>
                    <span class="postcard-data-font">{{ item.comments }}</span>
                </div>
                <div class="postcard-dataicon-wrapper" @click="handleFav">
                    <i class="fa-solid fa-bookmark postcard-icon" ref="favIcon"></i>
                    <span class="postcard-data-font">{{ item.t_favorite }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import RateWithNumber_M from '../Video/RateWithNumber_M.vue'
import qs from "qs"
export default {
    name: 'ReviewSmall',
    components: {
        RateWithNumber_M,
    },
    props: ['item'],
    data() {
        return {
            userLike: false,
            userDislike: false,
            userFav: false,
            reviewer: null,
            textContent: ''
        }
    },
    methods: {
        clickLike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: 2,
                t_id: this.item.textId,
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
                u_id: 2,
                t_id: this.item.textId,
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
                u_id: 2,
                t_id: this.item.textId,
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
                u_id: 2,
                t_id: this.item.textId,
            }),
            url: "/text/cancel_dislike/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        },
        clickFavorite(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: 2,
                t_id: this.item.textId,
            }),
            url: "/text/text_set_favorite/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        },
        clickCancelFavorite(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: 2,
                t_id: this.item.textId,
            }),
            url: "/text/text_cancel_favorite/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        },

        toReviewPage(id){
            this.$router.push({
                name: 'review',
                params: {
                    m_id: this.$route.params.id,
                    t_id: id
                }
            })
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
                this.item.dislike -- 
                // this.clickCancelDislike()
            }
            this.updateDislike()
            this.updateLike()
            if (this.userLike) {
                this.item.like++;
                this.clickLike()
            }
            else {
                this.item.like--
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
                this.item.like--;
                // this.clickCancelLike()
            }
            this.updateDislike()
            this.updateLike()
            if (this.userDislike) {
                this.item.dislike++;
                this.clickDislike()
            }
            else {
                this.item.dislike--
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
        //根据id得到对应的评论者对象
        getReviewer(id){
            
        },
        getStatus(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: 2,
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
        }
    },
    mounted(){
        this.getStatus();
        var htmlContent = this.item.text;
        var regExp = /<[^>]+>/g;
        this.textContent = htmlContent.replace(regExp, "");
    }

}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';
    .reviewer{
        margin: 0px 10px;
    }
    .time{
        color: gray;
        float: left;
        margin-left: 10px;
    }
    .review-row {
        display: flex;
        font-size: 16px;
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
    }
    .title{
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
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
text-align: left;
}
.text {
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  /* display: flex; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
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