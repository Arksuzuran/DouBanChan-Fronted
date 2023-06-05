<template>
    <div class="container">
    <div :style="{
            'background-image': 'url(' + detailImageUrl + ')', 
            'background-size': 'contain', 
            'position': 'absolute',
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
        <div class="rank-one-wrapper">
            <div class="videocard-heng">
                <div class="image">
                    <img :src="items[0].imageUrl" style="height: 100%; border-radius: 10px;">
                </div>
                <div class="content">
                    <div class="name">{{ items[0].name }}</div>
                    <div class="detail">
                        {{ items[0].onDate }} | {{ items[0].country }} <br/>
                        导演：{{ items[0].director }}<br/>
                        主演：{{ items[0].actor }} <br/>
                    </div>
                </div>
                <div class="rate">
                    <div class="rate-num">{{ items[0].rate }}</div> 
                    <el-rate
                        v-model="value"
                        disabled
                        text-color="#ff9900"
                        score-template="{value}"
                        style="display:inline-block">
                        </el-rate>
                    <div class="rate-persons">{{ items[0].rateNum }}人参与评分</div>
                </div>
            </div>
            <div class="comment clearfix">
                <div class="yinhao"><i class="fa-solid fa-quote-left"></i>酱友点评</div>
                <div class="comment-content">
                    {{ firstComment }}
                </div>
            </div>
        </div>
        <div class="nineWrapper">
            <div class="videocard-heng2" v-for="(item, index) in filteredItems" :key="index">
                <div class="image">
                    <img :src="item.imageUrl" style="height: 100%; border-radius: 10px;">
                </div>
                <div class="content2">
                    <div class="name2">{{ item.name }} <span style="margin-left: 20px;color: orange">{{ item.rate }}</span></div>
                    <div class="detail2">
                        {{ item.onDate }} | {{ item.country }} <br/>
                        导演：{{ item.director }}<br/>
                        主演：{{ item.actor }} <br/>
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
export default {
    name: "RankBoardSingle",
    props: ['title', 'items', 'firstComment', 'detailImageUrl'],
    components:{VideoHengCard},
    data(){
        return {
            value: this.items[0].rate / 2.0
        }
    },
    computed: {
        filteredItems() {
            return this.items.slice(1, 10);
        },
    },
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
}

.videocard-heng{
    width: 500px;
    height: 150px;
    background-color: white;
    display: flex;
    margin-bottom: 10px;
    background-color: rgba(123,95,52,0.5);
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
    color: gray;
    font-size: 14px;
}
.comment {
    margin: auto 0;
    text-align: left;
    margin-left: 20px;
    color: #C5B99E
}
.yinhao {
    color: lightcoral;
    font-size: 18px;
}
.comment-content{
    width: 80%;
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
    /* background-color: rgba(255, 255, 255, 0.1);  */
    backdrop-filter: blur(5px);
}
</style>