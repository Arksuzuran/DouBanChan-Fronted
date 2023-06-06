<template>
  <div>
    <RankBoardSingle title="最高评分电影"></RankBoardSingle>
    <RankBoardSingle title="最高华语评分电影"></RankBoardSingle>
  </div>
</template>

<script>
import RankBoardSingle from '@/components/Video/RankBoardSingle.vue'
export default {
  name: "VideoRankBoard",
  components: {RankBoardSingle}
}
</script>

<style scoped>

</style>