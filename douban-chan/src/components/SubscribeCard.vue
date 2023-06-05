<template>
    <div class="sub-card-block">
        <div class="sub-card-image-block">
            <img :src="require('../assets/conroy_img/snake.jpg')" class="sub-card-image">
        </div>
        <label class="sub-card-container">
            <input type="checkbox" id="star" v-model="isMark" @click="isMark = !isMark">
            <label for="star">
                <svg viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                    </path>
                </svg>
            </label>
        </label>
        <div class="sub-card-name">斗破苍穹</div>
        <div class="sub-card-text">三十年河东三十年河西，莫欺少年穷！</div>
    </div>
</template>

<script>
export default ({
    data() {
        return {
            isMark: true,
        }
    }
})
</script>

<style scoped>
.sub-card-block {
    width: 320px;
    height: 265px;
    border-radius: 40px;
    background-color: rgb(198, 198, 198);
}

.sub-card-image-block {
    width: 100%;
    height: 60%;
    border-radius: 40px 40px 0px 0px;
    background-color: rgb(112, 112, 112);

}

.sub-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40px 40px 0px 0px;
}

.sub-card-name {
    margin-top: 10px;
    text-align: left;
    font-size: 27px;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 1.2;
    padding-left: 18px;
}

.sub-card-text {
    margin-top: 15px;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 1.2;
    padding-left: 18px;
}

.sub-card-container {
    cursor: pointer;
    position: absolute;
    margin-left: -150px;
    margin-top: -150px;
}

.sub-card-container input[type="checkbox"] {
    display: none;
}

.sub-card-container label svg {
    width: 44px;
    height: 44px;
    fill: none;
    stroke: #000;
    stroke-width: 2px;
}

.sub-card-container input[type="checkbox"]:checked+label svg {
    fill: #FFC107;
    animation: pop_42 0.5s ease-out;
}

@keyframes pop_42 {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1);
    }
}
</style>