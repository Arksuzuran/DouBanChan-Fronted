<template>
    <div class="scrolling-screen-card-block">
        <div class="scrolling-screen-card-image-container">
            <img :src="scrollCard.cardImage" class="scrolling-screen-card-image" @click="toVideoDetail(scrollCard.id)">
        </div>
        <div class="scrolling-screen-mini-block">
            <MiniCard :miniCard="scrollCard"></MiniCard>
        </div>
    </div>
</template>

<script>
import MiniCard from '../components/MiniCard.vue';
export default {
    props: ['scrollCard'],
    data() {
        return {
        }
    },
    components: {
        MiniCard,
    },
    methods:{
        toVideoDetail(videoId) {
            this.$router.push({ name: 'videoDetail', params: { id: videoId } })
        },
    },
}
</script>

<style>
.scrolling-screen-card-block {
    width: 850px;
    height: 480px;
}

.scrolling-screen-card-image-container {
    width: 850px;
    height: 480px;
}

.scrolling-screen-card-image {
    width: 100%;
    height: 100%;
}

.scrolling-screen-mini-block {
    position: absolute;
    width: 400px;
    height: 180px;
    margin-top: -200px;
    margin-left: 20px;
    background-color: transparent;
}
</style>