<template>
    <div class="container">
        <el-row>
            <el-col :span="18"><div class="review-content">
                <div class="title">
                    {{ reviewItem.title }}
                </div>
                <div class="review-row clearfix">
                    <el-image
                        style="width: 50px; height: 50px;float: left"
                        :src="reviewerItem.img"></el-image>
                        <div class="reviewer">
                            {{ reviewerItem.name }}
                        </div>
                        &nbsp;
                        <div class="pinglunle"> 评论了 </div>
                        &nbsp;
                        <div class="movieName">
                            {{ movieItem.name }}
                        </div>
                </div>
                <div class="content">
                    {{ reviewItem.content }}
                </div>
                
                <br></br>
                <el-button type="success" plain style="margin: 0px 20px">赞 同</el-button>
                <el-button type="info" plain>反 对</el-button>
                <br></br>
                <div style="float: right">
                <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                </div>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
                <div class="movie-card">
                    <div class="movie-name">{{ movieItem.name }}</div>
                    <el-image
                            style="width: 230px; height: 350px;"
                            :src="movieItem.img"></el-image>
                    
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
export default {
    components: {
        Rate
    },
    name: 'ReviewView',
    data () {
        return {
            reviewItem: {
                title: '软工的救赎',
                ID: '1',
                time: '2020-12-31 12:00:00',
                content: 'rgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmslrgnmsl。         夜深如海，我静静的躺在床上看着泰坦尼克号，不知道是第几次看了，似乎这已经变成了一个习惯，在我需要流泪的时候。         这一次，我被一个叫卡尔的小人感动了。一直似乎都将聚光灯打在主角的身上，杰克和罗丝的爱情毫无疑问的荡气回肠，每一次都恨卡尔捣乱自私，将一次次逃生的机会都浪费在了嫉妒和阴谋上，然而这一次从他的视角，我觉得我又看到了一些新的东西，写出来与大家分享。         第一次是在影片刚开始的时候，他走进罗丝的房间看到她收集的那些画。毫无疑问，他不懂也不在乎艺术，他是一个彻彻底底的商人，即使在影片的最后一刻他依然是一个商人。我看着他笑着说，罗丝就喜欢这些画，什么毕加索之类的。仿佛是充满了不屑的和嘲弄的，而在那嘲弄中却夹杂着一丝苦涩，他融不进她的世界，他理解不了她，也理解不了艺术。他接着说，她每次出门都要带这些画。我第一次觉得也许他对罗丝不仅仅是因为他需要一个美艳而年轻的妻子，而是有爱的，尽管这爱也充满了浓浓的商人气息，这是他无力改变也没有意识到的。如果他仅仅是要她做他身边的花瓶，那么他不会关心她的喜好，不会费力在每次出游都带着她的画，不会如此的了解她的习惯，因为他在乎她。'
            },
            reviewerItem: {
                name: 'www',
                ID: '1',
                img: require('../../assets/user-image-1.jpg')
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
}
</script>

<style scoped>
    .rate{
        float: left;
    }
    .movie-name{
        font-size: 20px;
        font-weight: bold;
    }
    .title{
        font-size: 30px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .movie-card{
        top: 100px;
        right: 120px;
        position:fixed;
    }
    .review-content :not(button) {
        text-align: left;
    }
    .reviewer{
        float: left;
    }
    .time{
        float: left;
        margin-left: 5px;
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
    ul li{
        font-size: 16px;
        margin-bottom: 3px;
    }
    ul li span{
        font-weight: bold;
    }
</style>