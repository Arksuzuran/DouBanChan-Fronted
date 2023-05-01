//用户主页, 订阅页面
<template>
    <div>
        <el-container>
            <el-header>
                <h2>我的订阅</h2>
            </el-header>
            <el-main>
                <div class="favlist-container">
            <DetailedWorksCard v-for="(works, index) in worksList" :key="index" :info="works" />
        </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script>
import DetailedWorksCard from "../../components/DetailedWorksCard.vue";
export default {
    data() {
        return {
            worksList: [
                {
                    id: "001",
                    imgSrc: require("../../assets/favlist-1.jpg"),
                    name: "干物妹小埋",
                    intro: "低能废宅妹妹小埋的日常",
                    type: "番剧/日常",
                    length: "24话",
                    stars: "8.5",
                },
                {
                    id: "002",
                    imgSrc: require("../../assets/favlist-2.jpg"),
                    name: "Pink Lable",
                    intro: "这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介。",
                    type: "插画集/软色情",
                    length: "108P",
                    stars: "8.5",
                },
                {
                    id: "003",
                    imgSrc: require("../../assets/favlist-3.png"),
                    name: "少女与战车",
                    intro: "这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介。",
                    type: "番剧/爱情",
                    length: "48话",
                    stars: "8.0",
                },
                {
                    id: "004",
                    imgSrc: require("../../assets/favlist-4.webp"),
                    name: "学园孤岛",
                    intro: "巡之丘学园生活社成员的丈枪由纪，将与顾问老师佐仓惠、社长若狭悠里及随身带著圆锹的恵飞须泽胡桃...",
                    type: "番剧/恐怖",
                    length: "12话",
                    stars: "9.6",
                },
                {
                    id: "005",
                    imgSrc: require("../../assets/favlist-5.webp"),
                    name: "LoveLive!爱与演唱会",
                    intro: "这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介。",
                    type: "电影/爱情",
                    length: "120分钟",
                    stars: "3.5",
                },
                {
                    id: "006",
                    imgSrc: require("../../assets/favlist-5.webp"),
                    name: "作品",
                    intro: "这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介，这是作品的简介。",
                    type: "电影/爱情",
                    length: "120分钟",
                    stars: "8.5",
                },
            ]
        }
    },
    components: {
        DetailedWorksCard,
    },

}
</script>
  
<style>
h2 {
    margin: 20px;
    text-align:left;
    color: #333333;
}
.el-container {
  margin-top: 10px;
}
.favlist-container {
    width: 94%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>