<template>
  <div class="container">
    <div>
      <div style="text-align: left; margin: 15px 0px">
        <div class="video-name">
          {{ item.m_name }}
        </div>
      </div>
    </div>

    <el-row>
      <el-col :span="18">
        <div>
          <el-col :span="6">
            <div>
              <img :src="item.m_profile_photo" style="float: left; width: 200px;height: 100%;border-radius: 5px">
            </div>
          </el-col>
          <el-col :span="18">
            <div style="height:300px;">
              <el-col :span="16">
                <div>
                  <ItemInfo :item="item"></ItemInfo>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="rate-board">
                  <div class="little-button">豆瓣酱评分</div>
                  <Rate :score="item.m_rate"></Rate>
                  <div class="little-button">我的评分</div>
                  <div style="margin-top: 10px;">
                    <i class="fa-solid fa-star" style="color: #70d4f5; font-size: 30px"></i>
                    <span>{{ myRate}}</span>
                  </div>
                  <!-- 收藏按钮 -->
                  <div>
                    <button v-bind:class="{ active: isActive }" v-on:click="handleCollect">
                      {{buttonText}}
                    </button>
                  </div>

                </div>
              </el-col>
            </div>
          </el-col>

          <div>
            <div class="section-title">
              -- 简介 --
            </div>
            <div class="brief-content">
              {{ item.m_description }}
            </div>
          </div>

          <el-divider v-if="item.m_type !== 3"></el-divider>
          
          <div class="section-title" v-if="item.m_type !== 3">
            -- 剧照 --
          </div>

          <VueSlickCarousel v-bind="settings" v-if="photos.length > 0 && item.m_type !== 3">
            <div v-for="(imageUrl, index) in photos" :key="index"><img :src="imageUrl" :style="{ 'width': '90%' }"></div>
          </VueSlickCarousel>

          <br />

          <el-divider></el-divider>

          <!-- 影评区 -->
          <div>
            <div class="section-title" v-if="item.m_type !== 3">
              -- 影评 --
            </div>
            <div class="section-title" v-else>
              -- 书评 -- 
            </div>

            <div class="section-row">
              <div class="choose">
                <div class="tab" :class="{ activeTab: activeTab === 'hottest' }" @click="setActiveTab('hottest')">最热</div>
                |
                <div class="tab" :class="{ activeTab: activeTab === 'latest' }" @click="setActiveTab('latest')">最新</div>
                
              </div>
              <button class="button-35" role="button" @click="toWriteReviewPage" v-if="item.m_type !== 3"><i class="el-icon-plus"></i>
                我要写影评</button>
              
              <button class="button-35" role="button" @click="toWriteReviewPage" v-else><i class="el-icon-plus"></i>
                我要写书评</button>
            </div>

            <div v-for="(reviewItem, index) in reviewItems" :key="index">
              <ReviewSmall :item="reviewItem.text"></ReviewSmall>
            </div>

          </div>




        </div>
      </el-col>
      <el-col :span="6" class="right-side">
        <div>
          <div class="">
            <div class="right-section-title">
              相关的小组
            </div>
            <div class="group-card-container" v-if="recommendTopics !== null">
              <GroupCard v-for="(groupItem, index) in this.recommendGroups" :key="index" :groupItem="groupItem">
              </GroupCard>
            </div>
            <div v-else>
              暂时还没有没有相关的小组哦~
            </div>
            <div class="right-section-title topic">
              相关的话题
            </div>
            <div class="topic-card-container" v-if="recommendTopics !== null">
              <TopicCard :topicItems="recommendTopics"></TopicCard>
            </div>
            <div v-else>
              暂时还没有没有相关的话题哦~
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs"
import ReviewSection from '@/components/Video/ReviewSection.vue'
import ItemInfo from '@/components/Video/ItemInfo.vue'
import Rate from '@/components/Video/Rate.vue'
import GroupCard from '@/components/Video/GroupCard.vue'
import TopicCard from '@/components/Video/TopicCard.vue'
import VideoEditor from '@/components/Editor/VideoEditor.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import ReviewSmall from '@/components/Video/ReviewSmall.vue'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    ReviewSection, ItemInfo, Rate, GroupCard, TopicCard, VideoEditor, VueSlickCarousel, ReviewSmall
  },
  name: 'VideoDetail',
  data() {
    return {
      settings: {
        "dots": true,
        "focusOnSelect": true,
        "infinite": true,
        "speed": 1000,
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "touchThreshold": 5
      },
      item: '',
      reviewItems: [],
      reviewsOrderedByTime: [],
      reviewsOrderedByLike: [],

      recommendTopics: [],
      recommendGroups: [],

      activeTab: 'hottest',
      photos: [
      ],  //剧照

      myRate: 0,

      isActive: false,
      buttonText: '收藏',
      
      isCollected: false, //是否收藏
      myRate: 0,  //我对这个影视的评分
      isRated: false, //是否评分
    }
  },
  methods: {
    //选择最热和最新
    setActiveTab(tab) {
      if (this.activeTab != tab) {
        this.activeTab = tab;
        if (tab === 'latest') {
          console.log('最新');
          this.reviewItems = this.reviewsOrderedByTime
        }
        else if (tab === 'hottest') {
          console.log('最热');
          this.reviewItems = this.reviewsOrderedByLike
        }
      }
    },
    // 跳转到写影评页面
    toWriteReviewPage() {
      this.$router.push({
        name: 'writeReview',
        params: {
          id: this.$route.params.id
        }
      })
    },
    //得到电影对象
    getVideo(id) {
      this.$axios({
        method: "post",
        data: qs.stringify({
          u_id: 1,
          m_id: id
        }),
        url: "/media/query_single/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          this.item = res.data.media
          this.photos = res.data.m_preview
          this.reviewsOrderedByLike = res.data.text_by_like
          this.reviewsOrderedByTime = res.data.text_by_time
          this.reviewItems = this.reviewsOrderedByLike
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ")
        });
    },
    //得到相关话题
    getTopics() {
      this.recommendTopics = [
        {
          topicContent: "cr锐评北航软工",
          topicId: 1,
          topicDiscussNumbers: 123456
        },
        {
          topicContent: "czx锐评北航软工",
          topicId: 2,
          topicDiscussNumbers: 123456
        },
        {
          topicContent: "adk锐评北航软工",
          topicId: 3,
          topicDiscussNumbers: 123456
        },
        {
          topicContent: "czx锐评北航软工",
          topicId: 4,
          topicDiscussNumbers: 123456
        },
        {
          topicContent: "adk锐评北航软工",
          topicId: 5,
          topicDiscussNumbers: 123456
        }
      ]
    },
    //得到相关小组
    getGroups() {
      this.recommendGroups = [
        {
          groupName: "豆瓣电影小组",
          groupPersonNumbers: 123456,
          groupDiscussNumbers: 123456,
          groupImage: require('../../assets/movie/avatar.webp'),
          groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
        },
        {
          groupName: "豆瓣动漫小组",
          groupPersonNumbers: 123456,
          groupDiscussNumbers: 123456,
          groupImage: require('../../assets/movie/1.jpg'),
          groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
        },
        {
          groupName: "豆瓣动漫小组",
          groupPersonNumbers: 123456,
          groupDiscussNumbers: 123456,
          groupImage: require('../../assets/movie/2.jpg'),
          groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
        },
        {
          groupName: "豆瓣动漫小组",
          groupPersonNumbers: 123456,
          groupDiscussNumbers: 123456,
          groupImage: require('../../assets/movie/3.jpg'),
          groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
        }
      ]
    },
    // 处理收藏，op为1表示收藏，op为0表示取消收藏
    handleCollect(){
      var op = (this.isActive === false ? 1 : 0)
      console.log(op)
      this.$axios({
        method: "post",
        data: qs.stringify({
          u_id: 2,
          m_id: this.$route.params.id,
          op: op
        }),
        url: "/media/set_favourite/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          console.log(res.data.msg)
          this.isActive = !this.isActive
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ")
        });
    },
    //一开始调用这个函数，判断是否已经收藏和已经评分, 改变isActive
    getMediaStatus()
    {
      this.$axios({
        method: "post",
        data: qs.stringify({
          u_id: 2,
          m_id: this.$route.params.id
        }),
        url: "/media/get_media_status/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          console.log(res.data.rate)
          if (res.data.rate === 0)
            this.isRated = false
          else
            this.myRate = res.data.rate
          if (res.data.is_in_collection === 0)
            this.isCollected = false
          else {
            this.isActive = true
          }
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ")
        });
    }
  },
  mounted() {
    this.getVideo(this.$route.params.id);
    this.getGroups();
    this.getTopics();
    this.getMediaStatus();
  }
}
</script>

<style scoped>
.brief {
  text-align: left;
}

.group-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.topic-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.el-row {
  margin-bottom: 20px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.container {
  margin: 0 auto;
  width: 75%;
  background-color: white;
  padding: 10px;
}

.video-name {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
}

.video-time {
  color: grey;
  font-size: 15px;
  font-weight: bold;
}

.clearfix::after {
  content: "";
  clear: both;
  display: block;
}

.rate {
  font-size: 24px;
  font-weight: bold;
}

.left-content {
  text-align: left;
}

.section-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

.right-section-title {
  font-size: 25px;
  font-weight: bold;
}

.brief-content {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: justify
}

ul li {
  font-size: 18px;
  margin-bottom: 10px;
}

ul li span {
  font-weight: bold;
}

.rate-board {
  border-left: 1px solid lightgrey;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
}

.topic {
  margin-top: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.photo-container {
  display: flex;
  flex-wrap: wrap;
}

.photo-item {
  flex: 1;
  object-fit: cover;
  object-position: center;
  width: 100px;
  height: 150px;
  margin: 5px;
}

.little-button {
  background-color: lightpink;
  width: 100px;
  margin: 0 auto;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 10px;
}

/* 下面是reviewsection的样式 */
.section-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
}

.section-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

.review {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding: 10px;
}

.tab {
  display: inline-block;
  cursor: pointer;
}

.tab.active {
  font-weight: bold;
  /* 选中状态下的文本加粗 */
}


/* CSS */
.button-35 {
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: transparent 0 0 0 3px, rgba(18, 18, 18, .1) 0 6px 20px;
  box-sizing: border-box;
  color: #121212;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1;
  margin: 0;
  outline: none;
  padding: 1rem 1.2rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s, -webkit-box-shadow .2s;
  white-space: nowrap;
  border: 0;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-35:hover {
  box-shadow: #121212 0 0 0 3px, transparent 0 0 0 0;
}

.active {
  background-color: green;
  color: white;
}
.activeTab {
  font-weight: bold;
}
</style>