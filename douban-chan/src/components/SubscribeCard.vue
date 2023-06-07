<template>
    <div class="sub-card-block">
        <div class="sub-card-image-block">
            <img :src="temp1" class="sub-card-image">
        </div>

        <div class="sub-card-name">{{ subscribe.m_name }}</div>
        <button class="sub-card-skip">
            <span class="circle1"></span>
            <span class="circle2"></span>
            <span class="circle3"></span>
            <span class="circle4"></span>
            <span class="circle5"></span>
            <span class="text">查看详情</span>
        </button>
        <div class="sub-card-star">{{ temp2 }}</div>
        <div class="sub-card-text">{{ subscribe.m_description }}</div>
    </div>
</template>

<script>
export default ({
    props: ['subscribe'],
    data() {
        return {
            temp1: '',
            temp2: '',
        }
    },
    mounted() {
        if (this.subscribe.m_type == 3) {
            this.temp1 = this.subscribe.m_profile_photo;
            this.temp2 = this.subscribe.m_author;
        } else {
            this.temp1 = this.subscribe.m_first_preview;
            this.temp2 = this.subscribe.m_director;
        }
    },
})
</script>

<style scoped>
.sub-card-block {
    width: 280px;
    height: 265px;
    border-radius: 40px;
    background-color: rgb(244, 244, 244);
    cursor: pointer;
}

.sub-card-image-block {
    width: 100%;
    height: 60%;
    border-radius: 40px 40px 0px 0px;
    background-color: rgb(234, 234, 234);

}

.sub-card-block {
    transition: transform 0.3s ease;
}

.sub-card-block:hover {
    transform: scale(1.01);
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
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 1.2;
    padding-left: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* 控制最多显示的行数 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
}

.sub-card-star {
    margin-top: 7px;
    text-align: left;
    font-size: 13px;
    letter-spacing: 1px;
    line-height: 1.2;
    max-width: 250px;
    padding-left: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* 控制最多显示的行数 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sub-card-text {
    margin-top: 7px;
    text-align: left;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 1.1;
    padding-left: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* 控制最多显示的行数 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sub-card-container {
    cursor: pointer;
    position: absolute;
    margin-left: -130px;
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

.sub-card-skip {
    position: absolute;
    margin-top: -30px;
    margin-left: 35px;
}

.sub-card-skip {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: white;
    background-color: #171717;
    padding: 0.5em 1.2em;
    border: none;
    border-radius: .6rem;
    cursor: pointer;
    overflow: hidden;
}

.sub-card-skip span:not(:nth-child(6)) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 30px;
    width: 30px;
    background-color: #0c66ed;
    border-radius: 50%;
    transition: .6s ease;
}

.sub-card-skip span:nth-child(6) {
    position: relative;
}

.sub-card-skip span:nth-child(1) {
    transform: translate(-3.3em, -4em);
}

.sub-card-skip span:nth-child(2) {
    transform: translate(-6em, 1.3em);
}

.sub-card-skip span:nth-child(3) {
    transform: translate(-.2em, 1.8em);
}

.sub-card-skip span:nth-child(4) {
    transform: translate(3.5em, 1.4em);
}

.sub-card-skip span:nth-child(5) {
    transform: translate(3.5em, -3.8em);
}

.sub-card-skip:hover span:not(:nth-child(6)) {
    transform: translate(-50%, -50%) scale(4);
    transition: 1.5s ease;
}
</style>