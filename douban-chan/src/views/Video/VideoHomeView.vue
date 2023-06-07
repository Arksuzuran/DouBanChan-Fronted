<template>
  <div>
    <div class="grouphome-header-container">
      <div class="grouphome-header-title" @click="toVideoDefault">豆瓣影视酱</div>
      <!-- 按钮组 -->
      <div v-for="button in buttons" :key="button.id" class="grouphome-header-btn"
        :class="getActiveButtonClass(button.id)" @click="handleSelect(button.id)">
        {{ button.label }}
      </div>
    </div>

    <div class="container">
      <!-- <VideoRow :items="recommendItems"></VideoRow> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Lunbo from '@/components/Video/Lunbo.vue';
import HotVideo from '@/components/Video/HotVideo.vue';
import VideoRow from '@/components/Video/VideoRow.vue';
export default {
  components: {
    Lunbo,
    HotVideo, VideoRow
  },
  data() {
    return {
      buttons: [
        { id: 0, label: '排行榜' },
        { id: 1, label: '分类索引' },
      ],
      hotMovies: [],
    }
  },
  methods: {
    // 更新被选中标签的属性
    getActiveButtonClass(index) {
      if (this.activeHeaderLabel === index) {
        return 'grouphome-header-btn-active'
      }
      return ''
    },
    handleSelect(index) {
      if (index === 0) {
        this.$router.push({
          name: "videoRankBoard"
        });
      } else if (index === 1) {
        this.$router.push({
          name: "videoCategory"
        });
      }
    },
    toVideoDefault(){
      this.$router.push({
        name:"videoDefault"
      })
    },
    
  },
  mounted(){
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 75%;
  background-color: white;
}

.grouphome-header-container {
  padding: 0 11%;
  position: sticky;
  top: 65px;
  z-index: 11;

  height: 90px;

  background-color: rgb(255, 237, 237);
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
}

/* 页面顶栏处标题 */
.grouphome-header-title {
  margin: 0 40px;
  font-size: 36px;
  font-weight: 700;
  color: rgba(255, 133, 133, 0.9);
  cursor: pointer;
}

/* 顶栏 筛选器 组件 */
/* === removing default button style ===*/
/* === removing default button style ===*/
/* 按钮基本样式 */
.grouphome-header-btn {
  margin: 0 10px;

  font-size: 18px;
  background: transparent;
  border: none;
  padding: 12px 18px;
  color: rgba(255, 133, 133, 0.9);
  text-transform: uppercase;
  position: relative;
  transition: .5s ease;

  cursor: pointer;
}

.grouphome-header-btn::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: rgba(255, 66, 66, 0.9);
  transition: .5s ease;
}

.grouphome-header-btn:hover,
.grouphome-header-btn.grouphome-header-btn-active {
  color: #ffffff;
  transition-delay: .5s;
}

.grouphome-header-btn-active {
  border-radius: 10px;
  transition: .5s ease;
  background-color: rgb(255, 97, 97);
}

.grouphome-header-btn:hover::before,
.grouphome-header-btn.grouphome-header-btn-active::before {
  width: 100%;
}

.grouphome-header-btn::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  border-radius: 10px;
  background-color: rgba(255, 154, 154, 0.8);
  transition: .4s ease;
  z-index: -1;
}

.grouphome-header-btn:hover::after,
.grouphome-header-btn.grouphome-header-btn-active::after {
  height: 100%;
  transition-delay: 0.4s;
  color: aliceblue;
}

/* 小标题 */
.section-title{
  font-size: 30px;
  text-align: left;
  font-weight: bold;
  color: black;
}
</style>