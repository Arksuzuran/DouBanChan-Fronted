<template>
  <div class="container">
  <div id="v-carousel">
    <div class="card-carousel-wrapper">
      <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
      <div class="card-carousel">
        <div class="card-carousel--overflow-container">
          <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
            <div class="card-carousel--card" v-for="(item, index) in items" :key="index">
              <div class="card-carousel--card--footer">
                <VideoBookItem  :myObject="item"></VideoBookItem>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
  </div>
</div>
</template>

<script>
import VideoBookItem from '@/components/Video/VideoBookItem.vue'
export default {
  name: 'ShowARow',
  components: { VideoBookItem },
  props:['items'],
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 170,
    }
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor * 7;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor * 7;
      }
    },
  }
}
</script>

<style scoped>
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: #666a73;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 1050px;
}
.card-carousel--overflow-container {
  overflow: hidden;
}
.card-carousel--nav__left, .card-carousel--nav__right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 2px solid #42b883;
  border-right: 2px solid #42b883;
  cursor: pointer;
  margin: 0 10px;
  transition: transform 150ms linear;
}
.card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}
.card-carousel--nav__left {
  transform: rotate(-135deg);
}
.card-carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.9);
}
.card-carousel--nav__right {
  transform: rotate(45deg);
}
.card-carousel--nav__right:active {
  transform: rotate(45deg) scale(0.9);
}

.card-carousel-cards {
  display: flex;
  transition: transform 500ms ease-out;
  transform: translatex(0px);
}
.card-carousel-cards .card-carousel--card {
  margin: 0 10px;
  z-index: 3;
  margin-bottom: 2px;
  height: 300px;  
}
.card-carousel-cards .card-carousel--card:first-child {
  margin-left: 0;
}
.card-carousel-cards .card-carousel--card:last-child {
  margin-right: 0;
}
</style>