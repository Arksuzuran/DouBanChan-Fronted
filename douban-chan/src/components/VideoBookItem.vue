<template>
    <div class="item">
        <img :src="myObject.imageSrc" alt="">
        
        <div class="item-title">{{ myObject.title }}</div>
        
        <div class="score-container">
            <el-rate
            v-model="scoreInFive"
            disabled
            text-color="#ff9900"
            score-template="{value}">
            </el-rate>
            <span class="score-num">{{ myObject.score }}</span>
        </div>
    </div>
</template>

<script>
  export default {
    props:['myObject'],
    computed: {
        scoreInFive(){
            return this.myObject.score * 1.0 / 2
        }
    }
}
</script>
<style scoped>
    .item{
        width: 150px;
        background-color: grey;    
    }
    .item img{
        width: 100%;
    }
    .item-title{
        font-size: 16px;
    }
    .score-container{
        display: flex;
        align-items: center;
    }
    .score-num {
        font-size: 13px; /* 修改字体大小 */
        color: orange; /* 修改字体颜色 */
        margin-left: 10px; /* 添加一些左边距 */
    }
    
</style>