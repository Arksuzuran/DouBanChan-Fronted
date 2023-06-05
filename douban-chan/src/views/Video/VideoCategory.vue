<template>
  <div>
    <el-container>
        <el-aside width="300px" style="margin-top: 10px;">
            <div class="one-category" v-for="(label,index) in labels" :key="index">
                <div class="name">{{ label.name }}</div>
                <div class="details">
                    <ul>
                        <li v-for="(detail, index) in label.details" :class="{ active: (selected[label.name]===detail) }" :key="index" @click="selectCategory(label.name, detail)">
                            {{ detail }}
                        </li>
                    </ul>
                </div>
        </div></el-aside>
        <el-main>
            <div class="buttons">
                <div :class="{active2: (selected['extraDetail'] === 'ratedown')}" @click="changeOrder('ratedown')">
                    <span>评分降序</span>
                </div>
                <div :class="{active2: (selected['extraDetail'] === 'rateup')}" @click="changeOrder('rateup')">
                    <span>评分升序</span>
                </div>
                <div :class="{active2: (selected['extraDetail'] === 'timedown')}" @click="changeOrder('timedown')">
                    <span>时间降序</span>
                </div>
                <div :class="{active2: (selected['extraDetail'] === 'timeup')}" @click="changeOrder('timeup')">
                    <span>时间升序</span>
                </div>
            </div>
            <div class="card-wrapper">
                <VideoHengCard v-for="(item, index) in items" :key="index" 
                :item="item"></VideoHengCard>
            </div>
            
        </el-main>
    </el-container>

  </div>
</template>

<script>
import VideoHengCard from "@/components/Video/VideoHengCard.vue"
export default {
    name: "VideoCategory",
    components: {VideoHengCard},
    data(){
        return {
            labels:[
                {
                    name:"影or视",
                    details: ['电影', '电视剧']
                },
                {
                    name: "类型",
                    details: ["全部","喜剧", "爱情", "动作", "科幻", "动画", "悬疑", "犯罪", "惊悚", "冒险", "音乐", "历史", "奇幻", "恐怖", "战争", "传记", "歌舞", "武侠", "情色", "灾难", "西部", "纪录片", "短片"]
                },
                {
                    name: "地区",
                    details: ["全部","欧美", "韩国", "日本", "中国大陆", "美国", "中国香港", "中国台湾", "英国", "法国", "德国", "意大利", "西班牙", "印度", "泰国", "俄罗斯", "加拿大", "澳大利亚", "爱尔兰", "瑞典", "巴西", "丹麦"]
                },
                {
                    name: "年份",
                    details: ["全部", "2020年代", "2023", "2022", "2021", "2020", "2019", "2010年代", "2000年代", "90年代", "80年代", "70年代", "60年代", "更早"]
                },
            ],
            selected: {
                '影or视': '电影',
                '类型': '全部',
                '地区': '全部',
                '年份': '全部',
                'extraDetail': 'ratedown'
            },
            items: [
            ]
        }
    },
    methods:{
        selectCategory(categoryName, detail){
            if (this.selected[categoryName] !== detail) //如果点击的和现在的不一样才更改
            {
                this.selected[categoryName] = detail
                updatePage() //更新页面数据
            } 
        },
        updatePage(selected){
            //根据selected的信息发送给后端，更新接收数据，更新items
            this.items = [
                {
                    id: 1,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    category: '惊悚',
                    country: '英国',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 2,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 3,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 4,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
            ]
        },
        changeOrder(detail){
            this.selected['extraDetail'] = detail;
            console.log(detail)
        },
        // updatePage() {
        //     this.$axios({
        //     method: "post",
        //     data: qs.stringify({
        //         m_type: this.selected['影or视'], 
        //         m_genre: this.selected['类型'],
        //         m_region: this.selected['地区'],
        //         m_year: this.selected['年份'],
        //         m_order: this.selected['extraDetail']
        //     }),
        //     url: "/media/filter/",
        //     headers: { "content-type": "application/x-www-form-urlencoded" },
        //     })
        //     .then((res) => {
        //         this.items = res.data;
        //         console.log(this.items)
        //     })
        //     .catch((err) => {
        //         this.$message.error("网络出错了QAQ")
        //     });
        //     },
    },
    mounted(){
        this.updatePage(this.selected);
        this.updateVideos();
    }
}
</script>

<style scoped>
.one-category {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.name {
  flex: 0.5;
  font-size: 15px;
  color: gray;
}

.details {
  flex: 2;
  text-align: left;
}

.details ul{
    list-style: none;
}
.details li {
  display: inline-block;
  margin-bottom: 5px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 15px;
}
.active{
    color: red;
    font-weight: bold;
}
.card-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.buttons{
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
    margin-left: 25px;
    cursor: pointer;
}
.active2{
    font-weight: bold;
}
</style>

