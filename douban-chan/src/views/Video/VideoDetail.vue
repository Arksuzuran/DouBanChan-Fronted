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
                <div style="width: 240px">
                  <div v-if="!Skeleton" class="skeleton"></div>
                  <ItemInfo v-if="Skeleton" :item="item"></ItemInfo>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="rate-board">
                  <div class="little-button">豆瓣酱评分</div>
                  <Rate :score="item.m_rate"></Rate>

                  <!-- 图表 -->
                  <!-- <div>
                    <div ref="chart" style="width: 600px; height: 400px;"></div>
                  </div> -->

                  <div class="little-button">我的评分</div>
                  <!-- 收藏按钮 -->
                  <!-- <div>
                    <button v-bind:class="{ active: isActive }" v-on:click="handleCollect">
                      {{buttonText}}
                    </button>
                  </div> -->

                  <div style="display: flex">
                    <button class="Btn" @click="showRate">打分
                      <svg class="svg" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
                        </path>
                      </svg>
                    </button>
                    <div
                      style="position:absolute; margin-left: 110px;margin-top: 19px; font-size: 30px; font-weight: bold;
                                background-color: rgba(234, 109, 25, 0.5); width: 40px; color: white; border-radius: 10px;">
                      {{ value }}
                    </div>
                    <el-button v-bind:class="{ active: isActive }" v-on:click="handleCollect" type="warning"
                      icon="el-icon-star-off" circle
                      style="position: absolute; margin-top: 22px; margin-left: 170px;"></el-button>
                  </div>



                </div>
              </el-col>
            </div>
          </el-col>




          <!-- 评分弹窗 -->
          <div v-if="isRateVisible" class="rate">
            <div class="rate-overlay" @click="closeRate"></div> <!-- 遮罩层 -->
            <div class="rate-content">
              <div class="Transparent-plate"></div>
              <button class="close-button" @click="closeRate"><i class="fa-solid fa-xmark"></i></button>
              <div class="not-Transparent-plate">
                <div class="rate-icon-container">
                  <i class="fa-solid fa-star fa-2xl rate-custom-icon"
                    :style="{ color: '#669eff', fontSize: starSize }"></i>
                  <span v-if="value" class="rate-count">{{ value }}</span>
                  <span v-if="!value" class="rate-count">?</span>
                </div>
                <div class="rate-block">
                  <span class="rate-this">RATE THIS</span>
                  <span class="rate-name">{{ item.m_name }}</span>
                  <!-- <span class="demonstration">区分颜色</span> -->
                  <el-rate style="margin-top: 3%;" v-model="value" :colors="colors" :max="10">
                  </el-rate>
                  <button class="universal-rate-button" :disabled="value === 0" :class="{ 'disabled': value === 0 }"
                    @click="rate">打分</button>
                </div>
              </div>
            </div>
          </div>

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
              <button class="button-35" role="button" @click="toWriteReviewPage" v-if="item.m_type !== 3"><i
                  class="el-icon-plus"></i>
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
          <div class="right-block">
            <div style="height: 40px;"></div>
            <div class="right-section-title">
              相关的小组
            </div>
            <div class="group-card-container" v-if="recommendGroups.length !== 0">
              <GroupCard v-for="(groupItem, index) in recommendGroups" :key="index" :groupItem="groupItem">
              </GroupCard>
            </div>
            <div v-else>
              暂时还没有没有相关的小组哦~
            </div>
            <div style="height: 40px;"></div>
            <div class="right-section-title topic">
              相关的话题
            </div>
            <div class="topic-card-container" v-if="recommendChats.length !== 0">
              <TopicCard :topicItems="recommendChats"></TopicCard>
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
import echarts from 'echarts'
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    ReviewSection, ItemInfo, Rate, GroupCard, TopicCard, VideoEditor, VueSlickCarousel, ReviewSmall
  },
  name: 'VideoDetail',
  data() {
    return {
      Skeleton: false,
      isRateVisible: false,
      value: 0,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
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

      recommendChats: [],
      recommendGroups: [],

      ratios: [],

      activeTab: 'hottest',
      photos: [
      ],  //剧照

      myRate: 0,

      isActive: false,
      buttonText: '收藏',

      isCollected: false, //是否收藏
      myRate: 0,  //我对这个影视的评分
      isRated: false, //是否评分

      chart: null, // 存储 ECharts 实例的变量
      chartData: { // 图表数据
        xAxis: ['9~10星', '7~8星', '5~6星', '3~4星', '1~2星'],
        series: [15, 25, 30, 20, 10]
      }
    }
  },
  created() {
    // 创建 ECharts 实例
    this.chart = echarts.init(this.$refs.chart)
    // 设置图表选项
    this.chart.setOption({
      xAxis: {
        type: 'category',
        data: this.chartData.xAxis
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.chartData.series,
        type: 'bar'
      }]
    })
  },
  methods: {
    changeSkeleton() {
      setTimeout(() => {
        this.Skeleton = true;
      }, 500);
    },
    getRatio() {
      this.$axios({
        method: "post",
        data: qs.stringify({
          m_id: this.$route.params.id,
        }),
        url: "/media/get_ratio/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          console.log(res.data)
          this.ratios.push(res.data['12'])
          this.ratios.push(res.data['34'])
          this.ratios.push(res.data['56'])
          this.ratios.push(res.data['78'])
          this.ratios.push(res.data['90'])
          console.log(this.ratios)
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ")
        });
    },
    showRate() {
      this.isRateVisible = true;
      if (!this.isModalVisible)
        document.body.style.overflow = 'hidden'; // 隐藏滚动条
      document.addEventListener('scroll', this.disableScroll, { passive: false }); // 禁用滚动事件
    },
    closeRate() {

      this.isRateVisible = false;
      if (!this.isModalVisible)
        document.body.style.overflow = 'auto'; // 恢复滚动条
      document.removeEventListener('scroll', this.disableScroll); // 移除禁用滚动事件
    },
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
    // 处理收藏，op为1表示收藏，op为0表示取消收藏
    handleCollect() {
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
    getMediaStatus() {
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
    },
    rate() {
      this.$axios({
        method: "post",
        data: qs.stringify({
          u_id: this.userId,
          m_id: this.$route.params.id,
          rate: this.value
        }),
        url: "/media/rate_media/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          console.log(res.data.msg)
          if (res.data.msg === 0) {
            this.closeRate()
            console.log(this.value)
            this.$message.success("评分成功！")
          }
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ")
        });
    },
    getRecommendGroups() {
      this.$axios({
        method: "post",
        data: qs.stringify({
          m_id: this.$route.params.id,
        }),
        url: "/media/related_group/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          console.log(res.data)
          this.recommendGroups = res.data.groups
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ")
        });
    },
    getRecommendChats() {
      this.$axios({
        method: "post",
        data: qs.stringify({
          m_id: this.$route.params.id,
        }),
        url: "/media/related_chat/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          console.log(res.data)
          this.recommendChats = res.data.chats
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ")
        });
    }
  },
  mounted() {
    this.getVideo(this.$route.params.id);
    this.getRecommendGroups();
    this.getRecommendChats();
    this.getRatio();
    this.changeSkeleton();
  },
  computed: {
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    starSize() {
      return this.value * 2 + 100 + 'px';
      this.getMediaStatus();
    },

  },
}
</script>

<style scoped>
.skeleton {
  position: absolute;
  width: 200px;
  height: 300px;
  /* margin-top: -10px; */
  margin-left: -210px;
  /* 调整骨架屏的高度 */
  background-color: #f0f0f0;
}


.right-block {
  height: 600px;
  margin-top: -50px;
  border-radius: 10px;
  margin-left: 5%;
  width: 95%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

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

/* 弹窗样式 */
.rate {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.rate-content {
  width: 500px;
  height: 300px;
  position: relative;
  background-color: transparent;
  padding: 20px;
  border-radius: 5px;
  z-index: 8;
  /* 弹窗内容的样式，可以根据需要进行调整 */
}

.rate-icon-container {
  position: relative;
}

.rate-block {
  position: absolute;
  width: 100%;
  height: 80%;
  bottom: 0%;
  background-color: transparent;
}

.rate-count {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-family: "Helvetica", sans-serif;
  color: #f2f2f2;
  font-weight: bold;
  z-index: 10;
}


.Transparent-plate {
  position: absolute;
  width: 100%;
  height: 20%;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: transparent;
}

.not-Transparent-plate {
  position: absolute;
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: center;
  top: 20%;
  left: 0;
  background-color: #303030;
  border-radius: 5px;
}

.rate-this {
  margin-top: 5%;
  text-align: center;
  font-size: 15px;
  color: #fd9351;
  display: block;
}

.rate-name {
  text-align: center;
  color: #f2f2f2;
  display: block;
  margin-top: 2%;
  font-family: "Helvetica", sans-serif;
  font-size: 32px;
  font-weight: bold;
}

.el-rate .el-rate__icon {
  font-size: 27px;
  /* 设置星星的大小为 27px */
}

.universal-rate-button {
  display: block;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  height: 40px;
  font-weight: bold;
  background-color: #fac234;
  color: #000000;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.universal-rate-button.disabled {
  /* 按钮的禁用状态样式 */
  background-color: #ccc;
  color: #999;
  /* 其他样式设置 */
  display: block;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  height: 40px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  pointer-events: none;
}

.universal-rate-button:hover {
  background-color: #faa328;
}

.rate-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  background-color: transparent;
}

.Btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  height: 40px;
  border: none;
  padding: 0px 20px;
  background-color: rgb(255, 186, 184);
  color: rgb(0, 0, 0);
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 5px 5px 0px rgb(177, 94, 91);
  transition-duration: .3s;
  margin-top: 20px;
  margin-left: 0px;
}

.svg {
  width: 15px;
  position: absolute;
  right: 0;
  margin-right: 20px;
  margin-top: -2px;
  fill: rgb(0, 0, 0);
  transition-duration: .3s;
}

.Btn:hover {
  color: transparent;
}

.Btn:hover svg {
  right: 43%;
  margin: 0;
  padding: 0;
  border: none;
  transition-duration: .3s;
}

.Btn:active {
  transform: translate(3px, 3px);
  transition-duration: .3s;
  box-shadow: 2px 2px 0px rgb(255, 149, 57);
}

.active {
  background-color: green;
  color: white;
}

.activeTab {
  font-weight: bold;
}
</style>