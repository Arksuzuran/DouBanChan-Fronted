<template>
  <div class="videocard-heng">
    <div class="image">
        <img :src="item.imageUrl" style="height: 150px">
    </div>
    <div class="content">
        <div class="name">{{ item.name }}</div>
        <div class="detail">
            {{ item.onDate }} | {{ item.country }} <br/>
            导演：{{ item.director }} | 主演：{{ item.actor }} <br/>
            {{ item.category }} <br/>
            <br/>
            <el-rate
            v-model="value"
            disabled
            text-color="#ff9900"
            score-template="{value}"
            style="display:inline-block">
            </el-rate>
            <span class="rate">{{ item.rate }}</span>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: "VideoHengCard",
    // props:['id', 'imageUrl', 'name', 'rate', 'director', 'actor', 'onDate', 'category']
    props: ['item'],
    data(){
        return {
            value: this.item.rate / 2.0
        }
    }
}
</script>

<style scoped>
.videocard-heng{
    width: 380px;
    background-color: white;
    display: flex;
    margin-bottom: 10px;
}
.image{
    flex: 0.5
}  
.content{
    flex: 2;
    text-align: left;
    margin-left: 5px;
}
.name{
    font-weight: bold;
    font-size: 18px;
}
.detail{
    margin-top: 10px;
}
.rate{
    color: orange;
    font-size: 18px;
}
</style>