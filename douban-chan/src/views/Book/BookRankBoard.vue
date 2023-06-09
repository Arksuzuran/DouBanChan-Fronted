<template>
  <div>
    <RankBoardSingle title="最高评分图书"></RankBoardSingle>
    <RankBoardSingle title="2020年后最高评分图书"></RankBoardSingle>
    <RankBoardSingle title="最高评分流行书"></RankBoardSingle>
    <RankBoardSingle title="最高评分文学书"></RankBoardSingle>
  </div>
</template>

<script>
import RankBoardSingle from '@/components/Book/RankBoardSingle.vue'
export default {
  name: "BookRankBoard",
  components: {RankBoardSingle}
}
</script>

<style scoped>

</style>