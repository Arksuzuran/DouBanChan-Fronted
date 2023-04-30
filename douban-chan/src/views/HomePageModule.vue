<template>
    <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item, index) in images" :key="index">
            <img :src="require(`@/img/${item}`)" alt="" style="object-fit: cover; width: 100%; height: 100%;">
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    data() {
        return {
            images: [
                "1.jpg",
                "2.jpg",
                "3.jpg",
                "4.jpg",
                "5.jpg",
                "6.jpg",
            ],
        };
    },
}
</script>
  
<style>
.el-carousel__item h3 {
    color: #506075;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
  
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
  
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>

