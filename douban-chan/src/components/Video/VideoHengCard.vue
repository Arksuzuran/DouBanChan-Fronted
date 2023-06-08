<template>
  <div class="videocard-heng" @click="toVideoDetail(item.m_id)">
    <div class="image">
        <img :src="item.m_profile_photo" style="height: 150px;">
    </div>
    <div class="content" v-if="item.m_type !== 3">
        <div class="name">{{ item.m_name }}</div>
        <div class="detail">
            {{ item.m_year }} | {{ item.m_region }} <br/>
            导演：{{ item.m_director }} | 主演：{{ item.m_actor }} <br/>
            {{ item.m_genre }} <br/>
            <br/>
            <el-rate
            v-model="value"
            disabled
            text-color="#ff9900"
            score-template="{value}"
            style="display:inline-block">
            </el-rate>
            <span class="rate">{{ item.m_rate }}</span>
        </div>
    </div>

    <div class="content" v-else>
        <div class="name">{{ item.m_name }}</div>
        <div class="detail">
            {{ item.m_year }} | {{ item.m_region }} <br/>
            作者：{{ item.m_author }} <br/>
            {{ item.m_genre }} <br/>
            出版社{{ item.m_publisher }}
            <br/>
            <el-rate
            v-model="value"
            disabled
            text-color="#ff9900"
            score-template="{value}"
            style="display:inline-block">
            </el-rate>
            <span class="rate">{{ item.m_rate }}</span>
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
            value: this.item.m_rate / 2.0
        }
    },
    methods:{
        toVideoDetail(videoId) {
            this.$router.push({ name: 'videoDetail', params: { id: videoId } })
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
    cursor: pointer;
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