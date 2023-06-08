<template>
    <div class="score-container">
      <el-row>
        <el-col :span="5"><div class="left-section">
          <div class="score-num">{{ item.m_rate }}</div>
        </div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">
          <el-rate
            v-model="scoreInFive"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>

          <span class="number-rate">{{item.m_rate_num}}人参与评分</span>
        </div></el-col>
      </el-row>
    </div>
</template>

<script>
export default {  
  name: 'Rate',
    props:['item'],
    computed: {
        scoreInFive:{
          get(){
              return this.item.m_rate * 1.0/2
          },
          set(val){}
        }
    }
}
</script>

<style scoped>
.score-container {
  margin: 10px 20px;
}

.score-num {
  font-size: 30px;
  color: black;
}
.left-section{
  display: flex;
  align-items: center;
}

.number-rate{
  color: gray;
}
</style>