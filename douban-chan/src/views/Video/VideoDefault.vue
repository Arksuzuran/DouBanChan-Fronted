<template>
  <div>
    <VideoRow :items="hotMovies" title="热门电影"></VideoRow>
    <VideoRow :items="hotMovies" title="热门电视剧"></VideoRow>
    <HotComments :items="hotComments"></HotComments>
  </div>
</template>

<script>
import qs from "qs"
import VideoRow from '@/components/Video/VideoRow.vue';
import HotComments from '@/components/Video/HotComments.vue'
export default {
  components:{
    VideoRow, HotComments
  },
  data() {
    return { 
      hotComments:[
        {
          t_id: 1,
          t_type: 1,
          t_rate: 9,
          t_like: 100,
          t_dislike: 100,
          t_description: "<p><strong>hello world</strong></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>dfgsfgsdfgsdfg</strong></span></p><p><br></p>",
          t_topic: "软工做不完了",
          t_media_id: 1,
          t_user_id: 1,
          t_create_time: '2020-05-20 12:00:00',
        },
        {
          t_id: 1,
          t_type: 1,
          t_rate: 9,
          t_like: 100,
          t_dislike: 100,
          t_description: "<h1 style=\"text-align: left;\"><span style=\"font-size: 14px;\"><strong>阿打发斯蒂芬</strong></span></h1><p><span style=\"color: rgb(17, 17, 17); background-color: rgb(255, 255, 255); font-size: 14px;\">早在电影正片开始之前，在那首钢琴曲伴随着字幕卡轻快地敲响之时，《处女心经》（2000）就已开始颠覆我们对洪常秀此前作品的印象；在首作《猪堕井的那天》（1996）中，占据同一位置的是一首诡谲失谐的弦乐[1]。在这里，改变的是音乐的情绪基调，更是电影的风格音符，而这首钢琴曲作为一连串音符中的第一个 [2]，先行宣明了整首乐曲的创作策略的转向。等到电影的第一颗镜头出现，我们进一步确认了这一转向的切实：《处女心经》褪去了前两作中鲜艳得有些诡异的胶片色彩，代之以色调宛如影片中的冬日晴天的黑白摄影，泛着清澈的灰度而又不乏凌厉的线条，仿佛是洪常秀下定决心要一扫前两作的阴郁沉重之感。</span></p><p><br></p>",
          t_topic: "软工做不完了",
          t_media_id: 1,
          t_user_id: 1,
          
        }
      ],
      hotMovies: [
          {
              id: 1,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.1,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 2,
              name: '斗破苍穹',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '52013页',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 3,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 4,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 5,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 6,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.1,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 7,
              name: '斗破苍穹',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '52013页',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 8,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 9,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
          {
              id: 10,
              name: '伦菲尔德',
              imageUrl: require('../../assets/movie/1.jpg'),
              rate: 9.4,
              year: 2020,
              time: '2h13min',
              from: '漂亮国',
              type: '动作 / 冒险 / 科幻',
              dir: '诺兰',
              star: '吴亦凡 李易峰 郑爽',
              text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
          },
      ],
    }
  },
  methods: {
    getHotComments() {
        this.$axios({
          method: "post",
          data: qs.stringify({
            t_id: 1
          }),
          url: "/text/query_single/",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
          .then((res) => {
            this.hotComments = res.data;
            console.log(this.items)
          })
          .catch((err) => {
            this.$message.error("网络出错了QAQ")
          });
      	},
    getHotVideos() {
        this.$axios({
          method: "post",
          data: qs.stringify({
            t_id: 1
          }),
          url: "/text/query_single/",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
          .then((res) => {
            this.hotComments = res.data;
            console.log(this.items)
          })
          .catch((err) => {
            this.$message.error("网络出错了QAQ")
          });
      	},

  },
  mounted(){
    // this.getHotMovies();
    // this.getHotTVs();
    // this.updateHotComments();
  },  
}
</script>

<style scoped>

</style>