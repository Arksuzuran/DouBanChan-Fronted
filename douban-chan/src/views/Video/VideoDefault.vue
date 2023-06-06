<template>
  <div>
    <VideoRow :items="hotMovies" title="热门电影"></VideoRow>
    <VideoRow :items="hotTVs" title="热门电视剧"></VideoRow>
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
      hotComments:[],
      hotMovies:[],
      hotTVs:[],
    }
  },
  methods: {
    getHotComments() {
      this.$axios({
      method: "post",
      data: qs.stringify({
      }),
      url: "/media/get_heat_comment/",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
          this.hotComments = res.data.heat_comment
          // console.log(res.data.heat_comment)
      })
      .catch((err) => {
          this.$message.error("网络出错QAQ")
      });
    },
    getHotMovies(){
        this.$axios({
        method: "post",
        data: qs.stringify({
        }),
        url: "/media/get_heat_movie/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
            this.hotMovies = res.data.heat_movie
            // console.log(res.data.heat_comment)
        })
        .catch((err) => {
            this.$message.error("网络出错QAQ")
        });
    },
    getHotTVs(){
      this.$axios({
        method: "post",
        data: qs.stringify({
        }),
        url: "/media/get_heat_series/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
            this.hotTVs = res.data.heat_series
            // console.log(res.data.heat_comment)
        })
        .catch((err) => {
            this.$message.error("网络出错QAQ")
        });
    }
  },
  mounted(){
    this.getHotMovies();
    this.getHotTVs();
    this.getHotComments();
  },  
}
</script>

<style scoped>

</style>