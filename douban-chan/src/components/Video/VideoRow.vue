<template>
  <div class="film-module-block2 clearfix">
        <el-container>
            <el-header>
                <div>
                    <i class="fa-brands fa-hotjar hot-logo" style="color: #e63737;"></i>
                    <div style="float: left; display: inline-block;">
                        <span
                            style="float: left;margin-top: 20px;margin-left: 5px;font-size: 30px; font-weight: bold;color: #000000;">{{ title }}</span>
                    </div>
                </div>
            </el-header> 
            <el-main>
                <div class="card-container" v-if="title !== '热门图书'">
                    <UniversalCard v-for="movie in items" :key="movie.id" :movie="movie">
                    </UniversalCard>
                </div>
                <div class="card-container" v-else>
                    <BookCard v-for="book in items" :key="book.id" :book="book"></BookCard>
                </div>
            </el-main>
        </el-container>
    </div>
    
</template>

<script>
import VideoBookItem from '@/components/Video/VideoBookItem.vue'
import UniversalCard from '../UniversalCard.vue';
import BookCard from '../BookCard.vue';
export default {
  name: 'ShowARow',
  components: { VideoBookItem, UniversalCard, BookCard},
  props:['items', 'title'],
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 170,
    }
  },
}
</script>

<style scoped>
.button-for-more {
    margin-top: 5px;
    float: right;
}

.film-module-block2 {
    width: 100%;
    margin: 0 auto;
    background-color: white;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: transparent;
    gap: 20px 10px
}


.hot-logo {
    float: left;
    font-size: 50px;
    margin-top: 15px;
}
.clearfix::after {
    display: block;
    height: 0;
    content: "";
    clear: both;
    visibility: hidden;
}
</style>