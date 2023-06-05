<template>
  <div>
    <RankBoardSingle title="最高评分电影" :items="items" :firstComment="firstComment" :detailImageUrl="detailImageUrl"></RankBoardSingle>
    <RankBoardSingle title="最高华语评分电影" :items="items" :firstComment="firstComment" :detailImageUrl="detailImageUrl"></RankBoardSingle>
  </div>
</template>

<script>
import RankBoardSingle from '@/components/Video/RankBoardSingle.vue'
export default {
  name: "VideoRankBoard",
  components: {RankBoardSingle},
  data(){
    return {
      items: [
      {
                    id: 1,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    category: '惊悚',
                    country: '英国',
                    imageUrl: require('../../assets/movie/avatar.webp'),
                    rateNum: 114514
                },
                {
                    id: 2,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 3,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 4,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 5,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    category: '惊悚',
                    country: '英国',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 6,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 7,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 8,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 9,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    category: '惊悚',
                    country: '英国',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
                {
                    id: 10,
                    name: '软工的救赎',
                    rate: 9,
                    director: 'anndddkkk',
                    actor: 'adkadkadk',
                    onDate: '2023-6-4',
                    country: '英国',
                    category: '惊悚',
                    imageUrl: require('../../assets/movie/avatar.webp')
                },
      ],
      firstComment: "非常好电影，非常好电影，非常好电影，非常好电影，非常好电影，非常好电影，非常好电影，非常好电影，非常好电影",
      detailImageUrl: require('../../assets/movie/detailImage-1.jpg')
    }
  },
}
</script>

<style scoped>

</style>