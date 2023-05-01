<template>
    <div class="score-container">
      <el-rate
        v-model="scoreInFive"
        disabled
        text-color="#ff9900"
        score-template="{value}"
      ></el-rate>
      <span class="score-num">{{ score }}</span>
      <div style="clear: both;"></div> <!-- 添加一个“清除浮动”的元素 -->
    </div>
  </template>

<script>
export default {
    name: 'Rate',
    props:['score'],
    computed: {
        scoreInFive(){
            return this.score * 1.0 / 2
        }
    }
}
</script>

<style>
.score-container {
  display: flex;
  align-items: center;
}

.score-num {
  font-size: 13px;
  color: orange;
  margin-left: 10px;
}
</style>