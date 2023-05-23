<template>
  <div class="block">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in items" :key="item.id">
        <!-- <img :src="item.imageSrc" alt=""> -->
        <div class="image-with-text">
          <div class="info-container">
            <div class="info">
              《{{ item.title }}》
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data() {

  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.image-with-text {
  height: 100%;
  width: 100%;
  background-image: url('../assets/movie/roll-banner1.jpg');
  background-size: cover;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

img {
  width: 100%;
  height: 100%;
}

.info-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  background-color: rgba(0, 0, 0, 0.5);
}

.info {
  position: absolute;
  left: 0;
  color: white;
  font-size: 50px;
  font-weight: bold;
  padding: 10px;
}
</style>