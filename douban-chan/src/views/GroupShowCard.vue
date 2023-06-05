<template>
    <div class="card">
        <div class="align">
            <span class="red"></span>
            <span class="yellow"></span>
            <span class="green"></span>
        </div>
        <div class="img">
            <img :src="group.image" class="image">
        </div>
        <h1>{{ group.name }}</h1>
        <div>
            <span style="color: black;">小组成员: {{ group.number }} 人</span><br>
            <span class="group-text">{{ group.text }}</span>
        </div>
    </div>
</template>

<script>
export default ({
    props: ['group'],
})
</script>
<style scoped>
.card {
    width: 190px;
    height: 120px;
    padding: 0.5rem;
    background: rgba(204, 204, 204, 0.34);
    border-radius: 8px;
    backdrop-filter: blur(5px);
    border-bottom: 3px solid rgba(255, 255, 255, 0.440);
    border-left: 2px rgba(255, 255, 255, 0.545) outset;
    box-shadow: -40px 50px 30px rgba(0, 0, 0, 0.280);
    transform: skewX(10deg);
    transition: .4s;
    overflow: hidden;
    color: white;
}

.card:hover {
    height: 254px;
    transform: skew(0deg);
}

.align {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-self: flex-start;
}

.red {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ff605c;
    box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.yellow {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffbd44;
    box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.green {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #00ca4e;
    box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.card h1 {
    text-align: center;
    margin: 0rem;
    color: rgb(0, 0, 0);
    text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
}

.img {
    width: 3.0em;
    height: 3.0em;
    background-size: cover;
    border-radius: 7px;
    margin: auto;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}

.group-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-top: 5px;
    color: rgb(29, 29, 29);
    font-size: 12px;
}
</style>