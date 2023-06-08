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
import qs from "qs"
export default {
    name: "VideoCategory",
    components: {VideoHengCard},
    data(){
        return {
            labels:[
                {
                    name: "类型",
                    details: ["全部", "文学", "流行", "文化", "生活",  "科技"]
                },
                {
                    name: "地区",
                    details: ["全部","欧美", "韩国", "日本", "中国大陆", "美国", "中国香港", "中国台湾", "英国", "法国", "德国", "意大利", "西班牙", "印度", "泰国", "俄罗斯", "加拿大", "澳大利亚", "爱尔兰", "瑞典", "巴西", "丹麦"]
                },
                {
                    name: "年份",
                    details: ["全部", "2020年代", "2010年代", "2000年代", "1990年代", "1980年代"]
                },
            ],
            selected: {
                 '图书': '图书',
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
        updatePage() {
            this.$axios({
            method: "post",
            data: qs.stringify({
                m_type: this.selected['图书'], 
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
                console.log(this.items)
            })
            // .catch((err) => {
            //     this.$message.error("网络出错了QAQ")
            // });
            },
        selectCategory(categoryName, detail){
            if (this.selected[categoryName] !== detail) //如果点击的和现在的不一样才更改
            {
                this.selected[categoryName] = detail
                this.updatePage() //更新页面数据
            } 
        },
        changeOrder(detail){
            this.selected['extraDetail'] = detail;
            this.updatePage()
        },
        
    },
    mounted(){
        this.updatePage();
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
    justify-content: left;
    align-items: left;
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

