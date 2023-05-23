<template>
    <div class="scrolling-screen-card-block">
        <div class="scrolling-screen-card-image-container">
            <img :src="require(`../assets/conroy_img/${image}`)" class="scrolling-screen-card-image">
        </div>
        <div class="scrolling-screen-mini-block">
            <MiniCard></MiniCard>
        </div>
    </div>
</template>

<script>
import MiniCard from '../components/MiniCard.vue';
export default {
    data() {
        return {
            image: 'snake.jpg'
        }
    },
    components: {
        MiniCard,
    },
}
</script>

<style>
.scrolling-screen-card-block {
    width: 960px;
    height: 540px;
}

.scrolling-screen-card-image-container {
    width: 960px;
    height: 540px;
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