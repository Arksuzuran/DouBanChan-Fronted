<template>
  <div>
    <home-module></home-module>
    <film-module></film-module>
    <book-module></book-module>
    <topic-group-module></topic-group-module>
    <!-- <div class="test1">
      <self-information></self-information>
    </div>
    <div class="test2">
      <upload-image></upload-image>
    </div> -->
    <br>
    <br>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeModule from './HomeModule.vue';
import FilmModule from './FilmModule.vue';
import BookModule from './BookModule.vue';
import TopicGroupModule from './TopicGroupModule.vue';
import SelfInformation from './SelfInformation.vue';
import UploadImage from '../components/UploadImage.vue'
export default {
  name: 'HomeView',
  components: {
    HomeModule,
    FilmModule,
    BookModule,
    TopicGroupModule,
    SelfInformation,
    UploadImage
  },
  data() {
    return {
      messages: [
        {
          id: 1,
          imagePath: require('../assets/conroy_img/qq.jpg'),
          name: '秋子夜',
          time: '2023年6月4日 17:51',
          comment: '江南第一深情吴一凡邀请你共进晚餐,希望你不要不识抬举.',
        },
      ],
    }
  }
}
</script>
<style>
body {
  background: #ffffff;
  /* background: linear-gradient(25deg, rgba(158, 145, 76, 1) 13%, rgba(156, 107, 57, 1) 28%, rgba(135, 105, 33, 1) 42%, rgba(136, 100, 12, 1) 58%, rgba(120, 43, 43, 1) 72%, rgba(112, 59, 59, 1) 85%); */
  background-repeat: repeat-y;
  background-size: 100% auto;
}

.test1 {
  margin-top: 100px;
  /* margin-left: 100px; */
}

.test2 {
  margin-top: 200px;
  margin-left: 100px;
}
</style>