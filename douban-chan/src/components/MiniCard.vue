<template>
    <div class="mini-card-block">
        <div class="mini-card-image-container">
            <img :src="miniCard.miniImage" class="mini-card-image">
        </div>
        <div class="mini-card-info">
            <span class="mini-card-name">{{ miniCard.name }}<i class="fa-regular fa-circle-play"></i></span>
            <span class="mini-card-word">{{ miniCard.text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['miniCard'],
    data() {
        return {
            image: 'doupo.png'
        }
    }
}
</script>

<style scoped>
.mini-card-block {
    background-color: transparent;
    width: 400px;
    height: 180px;
    z-index: 11;
}

.mini-card-image-container {
    position: absolute;
    width: 120px;
    height: 180px;
    z-index: 12;
}

.mini-card-image {
    object-fit: cover;
    width: 120px;
    height: 180px;
}

.mini-card-info {
    display: flex;
    flex-direction: column;
    position: absolute;
    text-align: left;
    margin-left: 120px;
    margin-top: 100px;
    width: 280px;
    height: 80px;
    background-color: transparent;
    z-index: 12;
}

.mini-card-name {
    margin-left: 5px;
    font-size: 32px;
    color: #ffffff;
}

.mini-card-word {
    margin-top: 5px;
    margin-left: 5px;
    font-size: 15px;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>