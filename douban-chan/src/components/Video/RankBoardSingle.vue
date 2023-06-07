<template>
    <div class="container">
    <div :style="{
            'background-image': 'url(' + backgroundImage + ')',
            'position': 'absolute',
            'background-size': 'cover',
            'width': '100%',
            'height': '600px',
            'opacity': '0.8',
            'z-index': '0'
        }">
    </div>
    <div class="round-mohu"></div>
    <div class="rank-board" >
        <div class="title">
            {{ title }}
        </div>
        <div class="rank-one-wrapper" @click="toVideoDetail(items[0].m_id)">
            <div class="videocard-heng">
                <div class="image">
                    <img :src="items[0].m_profile_photo" style="height: 100%;border-radius: 10px;">
                </div>
                <div class="content">
                    <div class="name">{{ items[0].m_name }}</div>
                    <div class="detail">
                        {{ items[0].m_year }} | {{ items[0].m_region }} <br/>
                        导演：{{ items[0].m_director }}<br/>
                        主演：{{ items[0].m_actor }} <br/>
                    </div>
                </div>
                <div class="rate">
                    <div class="rate-num">{{ items[0].m_rate }}</div> 
                    <el-rate
                        v-model="value2"
                        disabled
                        text-color="#ff9900"
                        score-template="{value}"
                        style="display:inline-block">
                        </el-rate>
                    <div class="rate-persons">{{ items[0].m_rate_num }}人参与评分</div>
                </div>
            </div>
            <div class="comment clearfix">
                <div class="yinhao"><i class="fa-solid fa-quote-left"></i>酱友点评</div>
                <div class="comment-content" @click="toReviewPage(videoFirstReviewId)">
                    {{ videoFirstReviewTitle }}
                </div>
            </div>
        </div>
        <div class="nineWrapper">
            <div class="videocard-heng2" v-for="(item, index) in filteredItems" :key="index" @click="toVideoDetail(item.m_id)">
                <div class="image">
                    <img :src="item.m_profile_photo" style="height: 100%; border-radius: 10px;">
                </div>
                <div class="content2">
                    <div class="name2">{{ item.m_name }} <span style="margin-left: 20px;color: orange">{{ item.m_rate }}</span></div>
                    <div class="detail2">
                        {{ item.m_year }} | {{ item.m_region }} <br/>
                        导演：{{ item.m_director }}<br/>
                        主演：{{ item.m_actor }} <br/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import VideoHengCard from '@/components/Video/VideoHengCard.vue'
import qs from "qs"
export default {
    name: "RankBoardSingle",
    props: ['title'],
    components:{VideoHengCard},
    data(){
        return {
            value: 0,
            backgroundImage: '',
            videoFirstReviewTitle: '',
            videoFirstReviewId: '',
            items: [],
            selected: {
                '影or视': '电影',
                '类型': '全部',
                '地区': '全部',
                '年份': '全部',
                'extraDetail': 'ratedown'
            }
        }
    },
    computed: {
        filteredItems() {
            return this.items.slice(1, 10);
        },
        value2(){
            return 1.0 * this.items[0].m_rate / 2
        }
    },
    methods:{
        getVideos(){
            //根据title向后端发送分类的请求。
            //if (this.title==='最高评分电影')
            this.$axios({
            method: "post",
            data: qs.stringify({
                m_type: this.selected['影or视'], 
                m_genre: this.selected['类型'],
                m_region: this.selected['地区'],
                m_year: this.selected['年份'],
                m_order: this.selected['extraDetail']
            }),
            url: "/media/filter/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.items = res.data.media
                this.backgroundImage = this.items[0].m_first_preview
                this.getVideoFirstReview()
            })
            .catch((err) => {
                this.$message.error("网络出错了QAQ")
            });
        },
        getVideoFirstReview(){
            //根据第一个item[0]的m_id找到最热门的评论的标题
            // console.log(item[0].m_id)
            this.$axios({
            method: "post",
            data: qs.stringify({
                u_id: 1,
                m_id: this.items[0].m_id
            }),
            url: "/media/query_single/",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then((res) => {
                this.videoFirstReviewTitle = res.data.text_by_like[0].text.t_topic
                this.videoFirstReviewId = res.data.text_by_like[0].text.textId
            })
            .catch((err) => {
                this.$message.error("网络出错了QAQ")
            });
        },
        getSelected(){
            if (this.title === '最高评分电影')
            {
                this.selected = this.selected
            }
        },
        toVideoDetail(videoId) {
            this.$router.push({ name: 'videoDetail', params: { id: videoId } })
        },
        toReviewPage(id){
            this.$router.push({
                name: 'review',
                params: {
                    m_id: this.items[0].m_id,
                    t_id: id
                }
            })
        },
    },
    mounted(){
        this.getSelected()
        this.getVideos()
    }
}
</script>

<style scoped>
.container{
    height: 600px;
    width: 100%;
    position: relative;
}
.rank-board{
    width: 80%;
    margin: 0 auto;
    position: relative;
    z-index: 5;
}
.title{
    font-size: 40px;
    font-weight: bold;
    color: white
}
.rank-one-wrapper{
    display: flex;
    cursor: pointer;
}

.videocard-heng{
    width: 400px;
    height: 150px;
    background-color: white;
    display: flex;
    margin-bottom: 10px;
    background-color: rgba(244, 126, 63, 0.5);
    border-radius: 10px;
    color: white;
}
.image{
    flex: 0.5
}  
.content{
    flex: 2;
    text-align: left;
    margin-left: 5px;
}
.name{
    font-weight: bold;
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 20px;
}
.detail{
    margin-top: 10px;
}
.rate{
    margin: auto;
}
.rate-num{
    color: orange;
    font-size: 18px;
}
.rate-persons{
    color: white;
    font-size: 14px;
}
.comment {
    margin: auto 0;
    text-align: left;
    margin-left: 20px;
    color: black
}
.yinhao {
    color: lightcoral;
    font-size: 18px;
}
.comment-content{
    background-color: rgba(255, 255, 255, 0.7);
    width: 400px;
    height: 50px;
    padding: 10px 10px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10px;
}
.clearfix::after {
    display: block;
    height: 0;
    content: "";
    clear: both;
    visibility: hidden;
}

/* 下面是排行榜下方九个的样式 */
.nineWrapper {
  display: flex;
  flex-wrap: wrap;
}

.videocard-heng2{
    width: 33.33%;
    height: 100px;
    display: flex;
    margin-bottom: 10px;
    cursor: pointer;
}
.content2{
    flex: 2;
    text-align: left;
    margin-left: 5px;
}
.name2{
    font-weight: bold;
    font-size: 16px;
    color: white;
}
.detail2{
    margin-top: 10px;
    color: #C5B99E;
}

/* 背景图片四周模糊效果 */
.round-mohu{
    position: absolute;
    width: 100%;
    height: 600px;
    background-color: rgba(0, 0, 0, 0.7); 
    /* backdrop-filter: blur(5px); */
}
</style>