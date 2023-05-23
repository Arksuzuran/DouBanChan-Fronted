<template>
  <div>
    <div class="container">
      <VideoNavBar></VideoNavBar>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
          <Lunbo :items="rollItems"></Lunbo>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple">
            <HotVideo title="热门电影" :movies="monthlyMovies"></HotVideo>
          </div>
        </el-col>
      </el-row>

      <!-- 推荐 -->
      <VideoRow :items="recommendItems" title="猜你喜欢"></VideoRow>

      <VideoRow :items="recentItems" title="最近电影"></VideoRow>

      <VideoRow :items="recentItems" title="最近电视剧"></VideoRow>

      <VideoRow :items="recentItems" title="热门电影"></VideoRow>

      <VideoRow :items="recentItems" title="热门电视剧"></VideoRow>


    </div>
  </div>
</template>

<script>
import Lunbo from '@/components/Lunbo.vue';
import HotVideo from '@/views/Video/HotVideo.vue';
import VideoRow from '@/views/Video/VideoRow.vue';
import VideoNavBar from '@/views/Video/VideoNavBar.vue';
export default {
  components: {
    Lunbo,
    HotVideo, VideoRow,
    VideoNavBar
  },
  data() {
    return {
      monthlyMovies: [
        { id: 1, title: '电影X', score: 8.8 },
        { id: 2, title: '电影Y', score: 8.6 },
        { id: 3, title: '电影Z', score: 8.4 },
        { id: 4, title: '电影W', score: 8.3 },
        { id: 5, title: '电影V', score: 8.1 },
        { id: 6, title: '电影X', score: 8.8 },
        { id: 7, title: '电影Y', score: 8.6 },
        { id: 8, title: '电影Z', score: 8.4 },
        { id: 9, title: '电影W', score: 8.3 },
        { id: 10, title: '电影V', score: 8.1 }
      ],
      rollItems: [
        { id: 1, title: 'Titanic', imageSrc: require('../assets/movie/roll-banner1.jpg') },
        { id: 2, title: 'Titanic', imageSrc: require('../assets/movie/roll-banner2.jpg') },
        { id: 3, title: 'Titanic', imageSrc: require('../assets/movie/roll-banner3.jpg') },
        { id: 4, title: 'Titanic', imageSrc: require('../assets/movie/roll-banner4.jpg') },
      ],
      recommendItems: [
        { id: 1, title: 'John', imageSrc: require('../assets/movie/1.jpg'), score: 10 },
        { id: 2, title: 'John', imageSrc: require('../assets/movie/2.jpg'), score: 3.4 },
        { id: 3, title: 'John', imageSrc: require('../assets/movie/3.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/4.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/1.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/2.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/1.jpg'), score: 3 },
      ],
      recentItems: [
        { id: 1, title: 'John', imageSrc: require('../assets/movie/1.jpg'), score: 10 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/2.jpg'), score: 3.4 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/3.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/4.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/1.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/2.jpg'), score: 3 },
        { id: 1, title: 'John', imageSrc: require('../assets/movie/2.jpg'), score: 3 },
      ]
    }
  }
}
</script>

<style>.container {
  margin: 0 8% 0 8%
}</style>