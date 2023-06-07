<template>
  <div>
    <VideoRow :items="hotBooks" title="热门图书"></VideoRow>
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
      hotBooks:[]
    }
  },
  methods: {
    getHotComments() {
      this.$axios({
      method: "post",
      data: qs.stringify({
      }),
      url: "/media/get_heat_comment_for_book/",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
          this.hotComments = res.data.heat_comment
      })
      .catch((err) => {
          this.$message.error("网络出错QAQ")
      });
    },
    getHotBook(){
        this.$axios({
        method: "post",
        data: qs.stringify({
        }),
        url: "/media/get_heat_book/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
            this.hotBooks = res.data.heat_book
        })
        .catch((err) => {
            this.$message.error("网络出错QAQ")
        });
    }
  },
  mounted(){
    this.getHotBook();
    this.getHotComments();
  },  
}
</script>

<style scoped>

</style>