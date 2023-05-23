<template>
    <div class="container">
        <div>
          <div style="text-align: left">
              <div class="video-name">
                  {{ item.name }}
              </div>
          </div>
        </div> 
        
        <el-row>
          <el-col :span="6"><div>
            <img :src="item.imageSrc" style="float: left; width: 250px;height: 100%;border-radius: 5px">
            <button v-for="category in item.category" :key="category" class="button-81" role="button">{{ category }}</button>
          </div></el-col>
          <el-col :span="12"><div>
            <ItemInfo :item="item"></ItemInfo>
          </div></el-col>
          
          <el-col :span="6"><div class="grid-content" style="margin-top: 100px">

          </div></el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row :gutter="24">
          <el-col :span="18"><div class="left-content">
            <div class="section-title">
              - 简介
            </div>
            <div class="brief">
              {{ item.brief }}
            </div>

            <el-divider></el-divider>
            <div class="section-title">
              - 制作信息
            </div>
            <ul>
              <li><span>导演：</span>{{ item.director }}</li>
              <li><span>编剧：</span>{{ item.writer }}</li>
              <li><span>主演：</span>{{ item.actor }}</li>
              <li><span>制片国家/地区：</span>{{ item.country }}</li>
              <li><span>语言：</span>{{ item.language }}</li>
            </ul>
            
            <el-divider></el-divider>

            <ReviewSection title="影评"></ReviewSection>
          </div></el-col>
          <el-col :span="6"><div class="right-content">
            <div class="right-section-title">
              相关的小组
            </div>
            <div class="right-section-title">
              相关的话题
            </div>
          </div></el-col>
        </el-row>
    </div>
</template>

<script>
import qs from "qs"
import ReviewSection from '@/components/Video/ReviewSection.vue'
import ItemInfo from '@/components/Video/ItemInfo.vue'
export default {
    components: {
      ReviewSection, ItemInfo
    },
    name: 'VideoDetail',
    data(){
        return {
            item:{
                id: 0,
                name: '肖申克的救赎',
                onDate: '2008-08-08',
                lastTime: '2h14m',
                imageSrc: require('../../assets/movie/avatar.webp'),
                images: [require('../../assets/movie/roll-banner1.jpg'),require('../../assets/movie/roll-banner1.jpg'),
                require('../../assets/movie/roll-banner1.jpg'),require('../../assets/movie/roll-banner1.jpg')],
                category: ['剧情','犯罪'],
                brief: "本片根据斯蒂芬·金的同名小说改编。故事发生在1946年，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。然而在这里，他却结识了狱霸瑞德（摩根·弗里曼 Morgan Freeman 饰），从他那里，安迪逐渐了解了这座监狱，也让瑞德相信，希望依然存在。安迪的身上发生了意想不到的变化，他利用自己的专业知识帮助监狱官方洗黑钱，赚了不少钱，同时为监狱里的所有人谋取福利。瑞德不久便成了安迪最好的朋友和生意伙伴。然而，安迪却始终没有忘记，自己只是个被冤枉的囚犯，他一直在寻找着能够证明自己清白的机会……",
                director: "窝使莎比",
                writer: "軟功狗市",
                actor: ["阿里大健康","啊都说了副科级", "阿斯顿发"],
                country: "中国",
                language: "汉语"
            },
        }
    },
}
</script>

<style scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
    .container{
        margin: 0 8% 0 8%
    }  
  .video-name{
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .video-time{
    color: grey;
    font-size: 15px;
    font-weight: bold;
  }
  .clearfix::after {
            content: "";
            clear: both;
            display: block;
        }
  .rate{
    font-size: 24px;
    font-weight: bold;
  }
  .left-content{
    text-align: left;
  }
  .section-title{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .right-section-title{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .brief{
    font-size: 18px;
    margin-bottom: 10px;
  }
  ul li{
    font-size: 18px;
    margin-bottom: 10px;
  }
  ul li span{
    font-weight: bold;
  }


/* CSS */
.button-81 {
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: 1 #0d172a solid;
  text-decoration-thickness: auto;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 3px 5px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-81:hover {
  background-color: #1e293b;
  color: #fff;
}

@media (min-width: 768px) {
  .button-81 {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
}
</style>