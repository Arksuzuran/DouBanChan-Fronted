<template>
    <div class="item-container">
        <div class="item">
            <a @click="ToVideoDetail(myObject.id)">
                <img :src="myObject.imageSrc" alt="">
            </a>
            <div>
                <span class="item-title">{{ myObject.title }}</span>
                <Rate :score="myObject.score"></Rate>
            </div>
        </div>
    </div>
</template>

<script>
import Rate from './Rate.vue'
  export default {
    props:['myObject'],
    components: {
        Rate,
    },
    methods:{
        ToVideoDetail(id){
            this.$router.push({path: '/videoDetail'})
        }
    }
}
</script>
<style scoped>
    .item{
        width: 150px;
        height: 250px;
    }
    .item img{
        width: 100%;
        height: 100%;
        border-radius: 15px;
    }
    .item-title{
        font-size: 16px;
        font-weight:bold;
    }
</style>