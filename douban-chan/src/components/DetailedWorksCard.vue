//作品的详情card，用于收藏夹内的展示
<template>
    <div class="card">
        <img :src="info.imgSrc" alt="封面">
        <div class="card-info">
            <div class="card-title">{{ info.name }}</div>
            <div class="card-summary">{{ info.intro }}</div>
            <div class="card-details">
                <span class="card-type">{{ info.type }}</span>
                <span class="card-duration">{{ info.length }}</span>
                <span class="card-rating">{{ info.stars }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailedWorksCard',
    data() {
        return {
        }
    },
    props: ['info'],

}
</script>

<style scoped>
.card {
    width: 29%;
    background-color: #fdf5f5;
    box-shadow: 0px 0px 10px #888888;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
}

.card img {
    margin-left: 5px ;
    width: 35%;
    height: 90%;
    object-fit: cover;

}

.card-info {
    width: 58%;
    padding: 10px;
}

.card-title {
    font-family: "Helvetica Neue";
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
}

.card-summary {
    font-size: 16px;
    margin-bottom: 10px;
    text-align: left;
}

.card-details {
    margin-top: auto;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.card-type,
.card-duration {
    display: inline-block;
    margin-right: 10px;
}

.card-rating {
    display: inline-block;
    background-color: #ffc107;
    color: #333333;
    padding: 5px;
    border-radius: 5px;
    font-size: 14px;
}
</style>