<template>
<div class="container clearfix">
  <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content bg-purple"></div>
    <Lunbo></Lunbo>
    </el-col>

    <el-col :span="8"><div class="grid-content bg-purple">
      <HotVideo title="热门电影" :movies="monthlyMovies"></HotVideo>
    </div></el-col>
  </el-row>
  
  <!-- 推荐 -->
  <Recommend :items="items"></Recommend>



</div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import Lunbo from '@/components/Lunbo.vue';
import HotVideo from '@/views/Video/HotVideo.vue';
import Recommend from '@/views/Video/Recommend.vue';
export default {
  components: { NavigationBar, Lunbo, 
                HotVideo, Recommend},
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
      items: [
        { title: 'John', imageSrc: require('../../assets/movie/2.jpg'), score: 10 },
        { title: 'John', imageSrc: require('../../assets/movie/2.jpg'), score: 3.4 },
        { title: 'John', imageSrc: require('../../assets/movie/2.jpg'),score: 3 },
        { title: 'John', imageSrc: require('../../assets/movie/2.jpg'),score: 3 },
        { title: 'John', imageSrc: require('../../assets/movie/2.jpg'),score: 3 },
        { title: 'John', imageSrc: require('../../assets/movie/2.jpg'),score: 3 },
      ]
    }
  }
}
</script>

<style>
  .top {
    width: 100%;
    height: 500px;
  }
  .grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}
</style>