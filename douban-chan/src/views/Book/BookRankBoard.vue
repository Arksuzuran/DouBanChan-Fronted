<template>
  <div>
    <RankBoardSingle title="最高评分图书"></RankBoardSingle>
    <RankBoardSingle title="最高评分小说"></RankBoardSingle>
    <RankBoardSingle title="最高评分散文"></RankBoardSingle>
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