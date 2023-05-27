<template>
    <div class="collection-card-big-block">
        <div class="collection-card-block">
            <div class="collection-card-image-container">
                <img :src="require(`../assets/conroy_img/${image}`)" class="collection-card-image">
            </div>
            <span class="collection-card-good">
                <span class="collection-card-rate">95%</span> 好评 <i class="fa-solid fa-thumbs-up"></i></span>
            <div class="collection-card-info">
                <span class="collection-card-name">斗破苍穹</span>
                <span class="collection-card-star">萧炎 美杜莎 萧薰儿</span>
                <span class="collection-card-word">三十年河东三十年河西，莫欺少年穷！</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            image: 'doupo.png'
        }
    }
}
</script>

<style scoped>
.collection-card-big-block {
    display: flex;
    justify-content: center;
    /* 水平居中对齐 */
    align-items: center;
    /* 垂直居中对齐 */
    width: 360px;
    height: 140px;
    background-color: #002333;
    border-radius: 5px;
    border: transparent;
    z-index: 10;
}

.collection-card-block {
    background-color: transparent;
    width: 320px;
    height: 120px;
    z-index: 11;
}

.collection-card-image-container {
    position: absolute;
    width: 80px;
    height: 120px;
    z-index: 12;
}

.collection-card-image {
    object-fit: cover;
    width: 80px;
    height: 120px;
}

.collection-card-good {
    margin-left: 220px;
    width: 250px;
    height: 30px;
    background-color: transparent;
    font-size: 12px;
    color: #ff8235;
}

.collection-card-info {
    display: flex;
    flex-direction: column;
    position: absolute;
    text-align: left;
    margin-left: 80px;
    margin-top: 10px;
    width: 250px;
    height: 90px;
    background-color: transparent;
    z-index: 12;
}

.collection-card-name {
    margin-left: 5px;
    font-size: 27px;
    color: #ffffff;
}

.collection-card-star {
    margin-top: 10px;
    margin-left: 7px;
    font-size: 12px;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.collection-card-word {
    margin-top: 10px;
    margin-left: 7px;
    font-size: 14px;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.collection-card-rate {
    font-size: 16px;
    /* 调整字体大小 */
    color: #ff7a3d;
    /* 设置字体颜色，这里使用红色作为示例 */
}
</style>