<template>
    <div class="container">
        <div style="height: 100px;"></div>
        <el-row>
            <el-col :span="18"><div class="review-content clearfix">
                <div class="title">
                    {{ reviewItem.title }}
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
                    {{ reviewItem.content }}
                </div>
                
                <div class="time">{{ reviewItem.time }}</div>
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

                <commentSection></commentSection>
            
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
export default {
    components: {
        Rate, CommentSection
    },
    name: 'ReviewView',
    data () {
        return {
            userCollect:false,
            userAgree:false,
            userDisagree:false,
            reviewItem: {
                title: '软工的救赎',
                ID: 1,
                time: '2020-12-31 12:00:00',
                content: 'rgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmsl。         夜深如海，我静静的躺在床上看着泰坦尼克号，不知道是第几次看了，似乎这已经变成了一个习惯，在我需要流泪的时候。         这一次，我被一个叫卡尔的小人感动了。一直似乎都将聚光灯打在主角的身上，杰克和罗丝的爱情毫无疑问的荡气回肠，每一次都恨卡尔捣乱自私，将一次次逃生的机会都浪费在了嫉妒和阴谋上，然而这一次从他的视角，我觉得我又看到了一些新的东西，写出来与大家分享。         第一次是在影片刚开始的时候，他走进罗丝的房间看到她收集的那些画。毫无疑问，他不懂也不在乎艺术，他是一个彻彻底底的商人，即使在影片的最后一刻他依然是一个商人。我看着他笑着说，罗丝就喜欢这些画，什么毕加索之类的。仿佛是充满了不屑的和嘲弄的，而在那嘲弄中却夹杂着一丝苦涩，他融不进她的世界，他理解不了她，也理解不了艺术。他接着说，她每次出门都要带这些画。我第一次觉得也许他对罗丝不仅仅是因为他需要一个美艳而年轻的妻子，而是有爱的，尽管这爱也充满了浓浓的商人气息，这是他无力改变也没有意识到的。如果他仅仅是要她做他身边的花瓶，那么他不会关心她的喜好，不会费力在每次出游都带着她的画，不会如此的了解她的习惯，因为他在乎她。'
            },
            reviewerItem: {
                name: '我我我我我',
                ID: '1',
                img: require('../../assets/user-image-1.jpg'),
                rate: 8.5
            },
            movieItem: {
                ID:'1',
                name: '阿凡达',
                director: 'adk',
                writer: 'adk',
                actor: 'adk',
                img: require('../../assets/movie/avatar.webp'),
                category: '剧情/科幻/动作',
            },
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
        }
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