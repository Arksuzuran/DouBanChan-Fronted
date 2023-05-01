//小组的详情card
<template>
    <div class="card">
        <img :src="info.imgSrc" alt="封面">
        <div class="card-info">
            <div class="card-title">{{ cutStrByLength(info.name, 8) }}</div>
            <div class="card-summary">{{ cutStrByLength(info.intro, 30) }}</div>
            <div class="card-type">{{ info.type }}</div>
            <div class="card-details">
                <span class="card-duration">关注数：{{ info.persons }} | 帖子数：</span>
                <span class="card-rating">{{ info.posts }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailedGroupCard',
    data() {
        return {
        }
    },
    props: ['info'],
    methods: {
        cutStrByLength(str, length) {
            if (str.length > length) {
                return str.slice(0, length - 3) + "...";
            } else {
                return str;
            }
        },
    },

}
</script>

<style scoped>
.card {
    width: 29%;
    background-color: #fffcee;
    box-shadow: 0px 0px 10px #888888;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
}

.card img {
    margin-left: 5px;
    width: 35%;
    height: 90%;
    object-fit: cover;
}

.card-info {
    position: relative;
    width: 58%;
    height: 95%;
    padding: 10px;
}

.card-title {
    height: 20%;
    font-family: "Helvetica Neue";
    font-size: 20px;
    font-weight: bold;
    margin: 5px;
    text-align: left;
}

.card-summary {
    height: 60%;
    font-size: 13px;
    font-family: "微软雅黑", sans-serif;
    margin: 5px;
    text-align: left;
}

.card-details {
    position: absolute;
    left: 4%;
    bottom: 2%;
    height: 20%;
    margin-top: auto;
    text-align: left;
    font-size: 12px;
    font-family: "微软雅黑", sans-serif;
}

.card-type {
    position: absolute;
    left: 4%;
    bottom: 28%;
    margin-right: 20px;
    font-size: 14px;
    font-family: "微软雅黑", sans-serif;
}


.card-rating {
    background-color: #ffc107;
    color: #333333;
    padding: 5px;
    border-radius: 5px;
}
</style>