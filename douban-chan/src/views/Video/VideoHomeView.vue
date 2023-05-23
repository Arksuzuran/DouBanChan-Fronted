<template>
<div>
  <NavigationBar></NavigationBar>

  <div class="topbar">
    影视之家
  </div>
  <div class="container">
    <el-row :gutter="24">

      <el-col :span="6"><div class="grid-content bg-purple">
        <HotVideo title="热门电影" :movies="monthlyMovies"></HotVideo>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"></div>
      <Lunbo :items="rollItems"></Lunbo>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <HotVideo title="热门电视剧" :movies="monthlyMovies"></HotVideo>
      </div></el-col>
    </el-row>
    
    <SectionTitle title="近期热门"></SectionTitle>
    <VideoRow :items="recommendItems"></VideoRow>

    <VideoRow :items="recentItems"></VideoRow>

    <VideoRow :items="recentItems"></VideoRow>
  
    <VideoRow :items="recentItems"></VideoRow>

    <VideoRow :items="recentItems"></VideoRow>


  </div>
</div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import Lunbo from '@/components/Video/Lunbo.vue';
import HotVideo from '@/components/Video/HotVideo.vue';
import VideoRow from '@/components/Video/VideoRow.vue';
import SectionTitle from '@/components/Video/SectionTitle.vue';
export default {
  components: { NavigationBar, Lunbo, 
                HotVideo, VideoRow,
                SectionTitle},
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
        { id:1, title: 'Titanic', imageSrc: require('../../assets/movie/roll-banner1.jpg')},
        { id:2, title: '猩球崛起', imageSrc: require('../../assets/movie/roll-banner2.jpg')},
        { id:3, title: '哈利波特', imageSrc: require('../../assets/movie/roll-banner3.jpg')},
        { id:4, title: '绝望软工', imageSrc: require('../../assets/movie/roll-banner4.jpg')},
      ],
      recommendItems: [
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/1.jpg'), score: 10 },
        { id: 2, title: 'John', imageSrc: require('../../assets/movie/2.jpg'), score: 3.4 },
        { id: 3, title: 'John', imageSrc: require('../../assets/movie/3.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/4.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/1.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/2.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/1.jpg'),score: 3 },
      ],
      recentItems: [
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/1.jpg'), score: 10 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/2.jpg'), score: 3.4 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/3.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/4.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/1.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/2.jpg'),score: 3 },
        { id: 1, title: 'John', imageSrc: require('../../assets/movie/2.jpg'),score: 3 },
      ]
    }
  }
}
</script>

<style scoped>
.container{
  margin: 0 8% 0 8%
}

.topbar{
  height: 100px;
  width: 100%;
  background-color: black;
  color: white;
  line-height: 100px;
  font-size: 70px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>