<template>
    <div class="container">
        <el-row>
            <el-col :span="18"><div class="review-content clearfix">
                <div class="title">
                    {{ reviewItem.t_topic }}
                </div>
                <div class="review-row">
                    <el-image
                        style="width: 50px; height: 50px;float: left"
                        :src="reviewerItem.img"></el-image>
                        <div class="reviewer">
                            {{ reviewerItem.name }} 
                        </div>
                        <div class="comment-left-row">评价</div>
                        <div class="movie-name-left-row">
                            {{ movieItem.name }}
                        </div>
                        <i data-v-2927430a="" class="fa-solid fa-star" style="color: rgb(255, 221, 0); font-size: 20px"></i> 
                        <span class="rateNum">{{ reviewerItem.rate }}</span>



                </div>
                <div class="content">
                    {{ reviewItem.text }}
                </div>
                
                <div class="time">{{ reviewItem.date }}</div>
                <el-button type="success" plain style="margin: 0px 20px" ref="likeIcon">赞 同</el-button>
                <el-button type="info" plain ref="disLikeIcon">反 对</el-button>
                <br>
                <div class="buttons-holder">
                    <div class="buttons-under-review">
                        <el-button plain><i class="el-icon-star-off" style="font-size: 10px"></i>收 藏</el-button>
                    </div>
                    <div class="buttons-under-review">
                        <el-button plain><i class="fa-regular fa-share-from-square" style="color: #0fa8f5;font-size: 10px;"></i>转发</el-button>
                    </div>
                    <div class="buttons-under-review">
                        <el-button plain><i class="fa-solid fa-triangle-exclamation" style="color: #ebee11; font-size: 10px"></i>举报</el-button>
                    </div>
                </div>
                <el-divider></el-divider>

                <commentSection :reviewerName="reviewerItem.name"></commentSection>

            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
                <div class="movie-card">
                    <div class="movie-name">{{ movieItem.name }}</div>
                    <el-image
                        style="width: 170px; height: 250px; border-radius: 10px; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);"
                        :src="movieItem.img">
                    </el-image>
                                            
                    <ul>
                        <li><span>导演：</span>{{ movieItem.director }}</li>
                        <li><span>编剧：</span>{{ movieItem.writer }}</li>
                        <li><span>主演：</span>{{ movieItem.actor }}</li>
                        <li><span>类型：</span>{{ movieItem.category }}</li>
                    </ul>
                </div>
                
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
import Rate from '@/components/Video/Rate.vue'
import CommentSection from '@/components/review/commentSection.vue'
import qs from "qs"
export default {
    components: {
        Rate, CommentSection,
    },
    name: 'ReviewView',
    data () {
        return {
            userCollect:false,
            userAgree:false,
            userDisagree:false,
            reviewItem: null,
            reviewerItem: null,
            movieItem: null,
            value: 8
        }
    },
    methods:{
        updateCollectIcon(){
            if (this.userCollect) {
                this.$refs.collectIcon.classList.add('is-collected')
            }
            else {
                this.$refs.collectIcon.classList.remove('is-collected')
            }
        },
        collect(id){
            this.userCollect = !this.userCollect
            this.updateCollectIcon()
        },
        getReviewItem() {
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: 2,
                t_id: this.$route.params.id
            }),
            url: "/text/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.reviewItem = res.data.text
            })
            .catch((err) => {
                this.$message.error("网络出错QAQ")
            });
            },
        getUser(id){
            this.reviewerItem = {
                name: '我我我我我',
                ID: '1',
                img: require('../../assets/user-image-1.jpg'),
                rate: 8.5
            }
        },
        getVideoItem(id){
            this.movieItem = {
                ID:'1',
                name: '阿凡达',
                director: 'adk',
                writer: 'adk',
                actor: 'adk',
                img: require('../../assets/movie/avatar.webp'),
                category: '剧情/科幻/动作',
            }
        }
    },
    mounted(){
        this.getReviewItem(this.$route.params.id);
        this.getUser(this.reviewItem.t_user_id);
        this.getVideoItem(this.reviewItem.t_media_id);
        
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
    font-size: 30px;
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
    font-size: 20px;
    font-weight: bold;
    color: #4A4A44;
    float: left;
}
.movie-name-left-row{
    margin: 0px 10px;
    font-size: 20px;
    font-weight: bold;
    color: #4A4A44;
    float: left;
}
.time{
    margin: 10px 0px;
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
    float: left;
    color: gray;
}

.content{
    margin-top: 10px;
}
</style>