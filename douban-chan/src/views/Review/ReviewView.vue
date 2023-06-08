<template>
    <div class="container">
        <el-row>
            <el-col :span="18"><div class="review-content clearfix">
                <div class="title">
                    {{ reviewItem.t_topic }}
                </div>
                <div class="review-row">
                    <el-image
                        style="width: 50px; height: 50px;"
                        :src="reviewerItem.u_profile_photo"></el-image>
                        <div class="reviewer">
                            {{ reviewerItem.u_name }} 
                        </div>
                        <div class="comment-left-row">评价</div>
                        <div class="movie-name-left-row">
                            {{ movieItem.m_name }}
                        </div>
                        <RateWithNumber_M :score="reviewItem.t_rate"></RateWithNumber_M>
                        <div class="time">{{ reviewItem.date }}</div>
                </div>

                <div class="content" v-html="reviewItem.text">
                </div>

                <div style="margin-top: 30px;">
                    <div class="postcard-dataicon-group" style="margin:0 auto">
                        <div class="postcard-dataicon-wrapper" @click="handleLike">
                            <el-button type="success" :plain="!userLike">赞同 <span>{{ like }}</span></el-button>
                        </div>
                        <div class="postcard-dataicon-wrapper" @click="handleDislike">
                            <el-button type="info" :plain="!userDislike">反对 <span>{{ dislike }}</span></el-button>
                        </div>
                    </div>
                </div>
                <!-- 赞同和反对按钮 -->
                


                <br>
                <el-divider></el-divider>

                <!-- 二级评论 -->
                <div>
                    <div>
                        <div style="display: inline-block;">
                            <i class="el-icon-chat-dot-round" style="font-size: 30px; margin-right: 10px;"></i><div class="sectionTitle">评论区</div>
                            <div class="commentNum">{{ reviewItem.comments }}条</div>
                        </div>
                        <div class="section-row">
                            <div class="choose">
                                
                                <div class="tab" :class="{ active: activeTab === 'hottest' }" @click="setActiveTab('hottest')">最热</div>
                                |
                                <div class="tab" :class="{ active: activeTab === 'latest' }" @click="setActiveTab('latest')">最新</div>
                            </div>
                        </div>
                        
                        <div class="write-comment"><el-button type="primary" icon="el-icon-edit" @click="changeReplying">写评论</el-button></div>
                        
                    </div>
                    
                    <CommentReply v-if="isReplying" :textId="reviewItem.textId" :targetUserName="reviewerItem.u_name" v-on:comment-success="handleCommentSuccess">
                    </CommentReply>

                    <commentFirstLevel v-for="(commentInfo,index) in commentItems" :key=index :item="commentInfo"></commentFirstLevel>
                </div>


            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
                <div class="movie-card">
                    <div class="movie-name">{{ movieItem.m_name }}</div>
                    <el-image
                        style="width: 170px; height: 250px; border-radius: 10px; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);"
                        :src="movieItem.m_profile_photo">
                    </el-image>
                    
                    <div v-if="movieItem.m_type !== 3" style="width: 200px">
                        <ul>
                            <li><span>导演：</span>{{ movieItem.m_director }}</li>
                            <li><span>编剧：</span>{{ movieItem.m_writer }}</li>
                            <li><span>主演：</span>{{ movieItem.m_actor }}</li>
                            <li><span>类型：</span>{{ movieItem.m_genre }}</li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul>
                            <li><span>作者：</span>{{ movieItem.m_author }}</li>
                            <li><span>类型：</span>{{ movieItem.m_genre }}</li>
                            <li><span>出版社：</span>{{ movieItem.m_publisher }}</li>
                            <li><span>出版时间：</span>{{ movieItem.m_year }}</li>
                        </ul>
                    </div>
                </div>
                
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
import Rate from '@/components/Video/Rate.vue'
import CommentSection from '@/components/review/commentSection.vue'
import qs from "qs"
import commentFirstLevel from '@/components/review/commentFirstLevel.vue'
import CommentReply from '@/components/review/commentReply.vue'
import RateWithNumber_M from '@/components/Video/RateWithNumber_M.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    components: {
        Rate, CommentSection,commentFirstLevel,CommentReply, RateWithNumber_M
    },
    name: 'ReviewView',
    computed: {
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    data () {
        return {
            userLike: false,
            userDislike: false,
            like: 0,
            dislike: 0,
            
            reviewItem: {},
            reviewerItem: {},
            movieItem : {},
            commentItems: [],
            commentItemsOrderedByTime:[],
            commentItemsOrderedByLike:[],
            value: 8,
            activeTab: 'hottest',
            isReplying: false,
            textId: 0,
        }
    },
    methods:{
        handleCommentSuccess(){
            console.log(1)
            this.isReplying = false
            this.getReviewItem()
        },
        collect(id){
            this.userCollect = !this.userCollect
            this.updateCollectIcon()
        },
        async getReviewItem() {
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.textId
            }),
            url: "/text/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.reviewItem = res.data.text
                this.t_topic = this.reviewItem.t_topic
                this.getReviewerItem(this.reviewItem.userId)
                this.getVideoItem(this.$route.params.m_id)
                this.commentItems = res.data.replies_sorted_by_like
                this.commentItemsOrderedByLike = res.data.replies_sorted_by_like
                this.commentItemsOrderedByTime = res.data.replies_sorted_by_time
                this.like = this.reviewItem.like
                this.dislike = this.reviewItem.dislike
                this.favNum = this.reviewItem.t_favorite
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
            },
            //获取影评者的对象
        async getReviewerItem(id) {
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: id
            }),
            url: "/user/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.reviewerItem = res.data.user
                console.log(this.reviewerItem)
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
            },
            //获取电影的对象
        async getVideoItem(id) {
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
                this.movieItem = res.data.media
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
            },
        async setActiveTab(tab) {
            if (this.activeTab != tab) {
                this.activeTab = tab;
                if (tab === 'latest') {
                console.log('最新');
                this.commentItems = this.commentItemsOrderedByTime
                }
                else if (tab === 'hottest') {
                console.log('最热');
                this.commentItems = this.commentItemsOrderedByLike
                }
            }
        },
        changeReplying() {
            this.isReplying = !this.isReplying;
        },
        clickLike(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.textId,
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
                t_id: this.textId,
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
                t_id: this.textId,
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
                t_id: this.textId,
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
            if (this.userLike) {
                this.like++;
                this.clickLike()
            }
            else {
                this.like--
                this.clickCancelLike()
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
            if (this.userDislike) {
                this.dislike++;
                this.clickDislike()
            }
            else {
                this.dislike--
                this.clickCancelDislike()
            }
        },
        getStatus(){
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: this.userId,
                t_id: this.textId
            }),
            url: "/media/get_status/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.userLike = res.data.is_liked
                this.userDislike = res.data.is_disliked
                this.userFav = res.data.is_favorite
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
        }
    },
    mounted(){
        this.textId = this.$route.params.t_id
        // console.log(this.textId)
        console.log(this.$route.params.t_id)
        this.getReviewItem();
        this.getStatus();
    }
}
</script>

<style scoped>
.rateNum{
    font-weight: bold;
    margin-left: 5px;
}
.container{
    margin: 0 auto;
    width: 75%;
    background-color: white;
    padding: 20px;
  }  
.is-collected{
    color: red;
}
.rate{
    float: left;
}
.movie-name{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}
.title{
    font-size: 26px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
}
.movie-card{
    top: 150px;
    right: 250px;
    position:fixed;
    text-align: left;
}
.review-content :not(button) {
    text-align: left;
}
.reviewer{
    margin: 0px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #4A4A44;
}
.movie-name-left-row{
    margin: 0px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #4A4A44;
}
.time{
    margin: 0px 10px;
    color: #8590A6
}
.movieName{
    float: left;
}
.pinglunle{
    float: left;
    margin: 0px 5px;
}
.review-row {
    line-height: 50px; /* 将行高设置为元素的高度，实现元素垂直居中 */
    height: 50px;
    text-align: center; /* 将文本水平居中对齐 */
    display: flex;
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

.buttons-holder{
    display: flex;
    justify-content: flex-end;
}
.buttons-under-review{
    display: inline-block;
    margin: 0px 10px;
}
.buttons-under-review i{
    font-size: 20px;
    margin-right: 5px;
}

.clearFix::after {
    content: "";
    display: block;
    clear: both;
}

ul{
    text-align: left;
    list-style: none;
    padding: 0;
}
ul li {
    margin: 5px 0;
}
ul li span{
    color: grey;
}
.comment-left-row{
    font-size: 16px;
    color: gray;
}

.content{
    margin-top: 10px;
}


.sectionTitle {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    display: inline-block
}
.commentNum {
    font-size: 15px;
    color: #8590A6;
    display: inline-block;
    margin-left: 5px;
}
.reply-button {
    margin: 0 0 3px 20px;
    height: 25px;
    width: 50px;
    background-color: rgb(255, 235, 235);
    border-radius: 3px;
    border: 1px solid rgba(255, 252, 252, 0.8);
    display: inline-block;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.write-comment{
    display: inline-block;
    font-size: 16px;
    margin-left: 20px;
}
.section-row{
    display: inline-block;
    margin-left: 10px;
}
.tab {
  display: inline-block;
  cursor: pointer;
}

.tab.active {
  font-weight: bold; /* 选中状态下的文本加粗 */
}

.postcard-dataicon-group {
    /* height: 20px; */
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
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
    color: red
}
.postcard-icon-dislike {
    color: rgb(0, 0, 0);
}
.postcard-dataicon-wrapper {
    margin: 0 30px;
    font-size: 20px;
}
.postcard-data-font {
    margin-right: 8px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(35, 35, 35);
}
</style>