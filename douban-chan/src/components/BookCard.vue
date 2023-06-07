<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" class="book-card">
            <div class="flag">
                <button class="favorite-button" @click="mark = !mark">
                    <span class="fa-layers fa-fw" style="background:transparent position: absolute; top: 0px; left: 0px;">
                        <i v-if="!mark" class="fas fa-bookmark" style="opacity: 0.3 font-size: 30px;"></i>
                        <i v-if="!mark" class="fa-duotone fa-plus fa-xs"
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-55%, -300%); color: #ffffff; font-size: 30px;"></i>
                        <i v-if="mark" class="fas fa-bookmark" style="opacity: 0.3 font-size: 30px; color: #ff8b32;"></i>
                        <i v-if="mark" class="fa-solid fa-check fa-xs"
                            style="position: absolute; top: 50%; left: 55%; transform: translate(-55%, -300%); color: #000000; font-size: 24px;"></i>
                    </span>
                </button>
            </div>
            <div class="image-container">
                <img :src="book.image" class="image">
            </div>
            <div class="content">
                <i class="fa-solid fa-star" style="color: #ffdd00;"></i>
                <span style="letter-spacing: -0.5px; vertical-align: middle;margin-left: 3px;color: #ffffff;">{{ book.rate
                }}</span>
                <button class="star-button" @click="showRate">
                    <i class="fa-solid fa-star star-button-color-1"></i>
                </button>
            </div>
            <div style="margin-top: -8px;text-align: left;margin-left: 10px;">
                <span class="card-name" style="display: inline-block;">{{ book.name }}</span>
            </div>
            <div style="float: left;width: 200px;margin-top: 5px;">
                <el-button type="info" plain
                    style="border: none;margin-left: 10px;margin-top: 5px;color:#003899; width: 110px;font-weight: bold;float: left;">
                    <i class="fa-solid fa-magnifying-glass" style="color: #003899;"></i> 查看详情
                </el-button>
                <el-button circle style="border: none;margin-top: 2px;background-color:#002333;" @click="showModal"><i
                        class="fa-solid fa-circle-info custom-icon"></i></el-button>
            </div>
        </el-card>

        <!-- 详情弹窗 -->
        <div v-if="isModalVisible" class="modal">
            <div class="modal-overlay" @click="closeModal"></div> <!-- 遮罩层 -->
            <div class="modal-content">
                <div>
                    <img :src="book.image" class="image-modal">
                </div>
                <button class="modal-name">{{ book.name }}</button>
                <button class="close-button" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-detail">
                    <div class="modal-info-1">
                        <span class="info-value-1"><i class="el-icon-date"></i> {{ book.year }} &nbsp<i
                                class="el-icon-document"> </i> {{ book.page }} &nbsp<i class="el-icon-location-outline">
                            </i>
                            {{ book.from }}</span>
                    </div>
                    <div class="modal-info-2">
                        <span class="info-value-2"><i class="fa-solid fa-book"> </i> {{ book.type }}</span>
                    </div>
                </div>
                <div class="modal-rate">
                    <i class="fa-solid fa-star" style="color: #ffdd00;"></i>
                    <span style="letter-spacing: -0.5px; vertical-align: middle;margin-left: 3px;">{{ book.rate }}</span>
                    <span
                        style="letter-spacing: -0.5px; vertical-align: middle;margin-left: 2px;color: rgba(0, 0, 0, 0.5);">/10</span>
                    <button class="modal-rating" @click="showRate"><i class="fa-solid fa-star" style="color: #dcdde0;"></i>
                        <span class="text-rating"> 打分</span></button>
                </div>
                <div class="modal-introduction">
                    <span class="modal-introduction-text">
                        {{ book.text }}
                    </span>
                </div>
                <div class="modal-people-d">
                    <span>
                        作者：<span class="modal-people-d-text">{{ book.dir }}</span>
                    </span>
                </div>
                <div class="modal-people-s">
                    <span>
                        主角：<span class="modal-people-s-text">{{ book.star }}</span>
                    </span>
                </div>
                <el-button type="info" plain
                    style="border: none;margin-top: 70%;float: left;color:#003899; width: 320px;font-weight: bold;">
                    <i class="fa-solid fa-plus" style="color: #003899;"></i>
                    &nbsp 我的订阅
                </el-button>
                <el-button type="info" plain
                    style="border: none;margin-top: 70%;float: right;color:#003899; width: 120px;font-weight: bold;">
                    <i class="fa-solid fa-pen-to-square"></i>
                    &nbsp 写书评
                </el-button>
            </div>
        </div>

        <!-- 评分弹窗 -->
        <div v-if="isRateVisible" class="rate">
            <div class="rate-overlay" @click="closeRate"></div> <!-- 遮罩层 -->
            <div class="rate-content">
                <div class="Transparent-plate"></div>
                <button class="close-button" @click="closeRate"><i class="fa-solid fa-xmark"></i></button>
                <div class="not-Transparent-plate">
                    <div class="rate-icon-container">
                        <i class="fa-solid fa-star fa-2xl rate-custom-icon"
                            :style="{ color: '#669eff', fontSize: starSize }"></i>
                        <span v-if="value" class="rate-count">{{ value }}</span>
                        <span v-if="!value" class="rate-count">?</span>
                    </div>
                    <div class="rate-block">
                        <span class="rate-this">RATE THIS</span>
                        <span class="rate-name">{{ book.name }}</span>
                        <!-- <span class="demonstration">区分颜色</span> -->
                        <el-rate class="book-rate-ten-star" style="margin-top: 3%;" v-model="value" :colors="colors"
                            :max="10">
                        </el-rate>
                        <button :class="['book-rate-button', { 'disabled': value === 0 }]"
                            :disabled="value === 0">打分</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['book'],
    data() {
        return {
            mark: false,
            isModalVisible: false, // 控制弹窗的显示与隐藏
            isRateVisible: false,
            value: 0,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        };
    },
    methods: {
        showModal() {
            this.isModalVisible = true; // 显示弹窗
            document.body.style.overflow = 'hidden'; // 隐藏滚动条
            document.addEventListener('scroll', this.disableScroll, { passive: false }); // 禁用滚动事件
        },
        closeModal() {
            this.isModalVisible = false;
            document.body.style.overflow = 'auto'; // 恢复滚动条
            document.removeEventListener('scroll', this.disableScroll); // 移除禁用滚动事件
        },
        disableScroll(event) {
            event.preventDefault();
            event.stopPropagation();
        },
        showRate() {
            this.isRateVisible = true;
            if (!this.isModalVisible)
                document.body.style.overflow = 'hidden'; // 隐藏滚动条
            document.addEventListener('scroll', this.disableScroll, { passive: false }); // 禁用滚动事件
        },
        closeRate() {
            this.value = 0;
            this.isRateVisible = false;
            if (!this.isModalVisible)
                document.body.style.overflow = 'auto'; // 恢复滚动条
            document.removeEventListener('scroll', this.disableScroll); // 移除禁用滚动事件
        },
    },
    computed: {
        starSize() {
            return this.value * 2 + 100 + 'px';
        }
    },
};
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

.book-card {
    width: 190px;
    height: 380px;
    display: flex;
    flex-direction: column;
    position: relative;
    border: black;
    background-color: #002333;
}

.card-name {
    font-family: "Montserrat", sans-serif;
    font-size: 25px;
    font-weight: bold;
    color: #f2f2f2;
}

.flag {
    position: absolute;
    top: 3px;
    left: 1px;
    height: 40px;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
}

.favorite-button {
    position: relative;
    top: 0px;
    margin-left: -1px;
    left: 0px;
    background-color: transparent;
    border: none;
    font-size: 45px;
    color: #333333;
    cursor: pointer;
    padding: 0px;
}

.image-container {
    position: relative;
    width: 100%;
    height: 230px;
    overflow: hidden;
    border: black;
    background-color: black;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

.content {
    text-align: left;
    padding: 5px;
    position: relative;
    padding-left: 12px;
    z-index: 1;
    margin-top: -5px;
    font-size: 16px;
    max-height: 70px;
}

.text {
    padding: 8px;
    padding-left: 12px;
    position: relative;
    z-index: 1;
    font-size: 18px;
    margin-top: -7px;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0px;
    float: right;
    border-radius: 20px;
}

.star-button {
    font-size: 13px;
    border: none;
    margin-left: 80px;
    background-color: transparent;
    padding: 9px 9px;
    border-radius: 30px;
    /* 调整按钮的宽度和高度 */
}

.star-button:hover {
    background-color: #159A9C;
    /* 设置悬停状态下的背景色 */
}

.star-button-color-1 {
    color: #dcdde0;
}

.star-button:hover .star-button-color-1 {
    color: #faa328;
}

.custom-icon {
    font-size: 20px;
    /* 设置图标的大小 */
}

.custom-icon-arrow {
    font-size: 27px;
    /* 调整图标大小 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    /* 添加文本阴影效果来增加饱满感 */
    color: rgb(0, 0, 0);
    /* 改变图标颜色 */
    position: absolute;
    top: 7%;
    left: 50%;
}

.rate {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.rate-content {
    width: 500px;
    height: 300px;
    position: relative;
    background-color: transparent;
    padding: 20px;
    border-radius: 5px;
    z-index: 8;
    /* 弹窗内容的样式，可以根据需要进行调整 */
}

.rate-icon-container {
    position: relative;
}

.rate-block {
    position: absolute;
    width: 100%;
    height: 80%;
    bottom: 0%;
    background-color: transparent;
}

.rate-count {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    font-family: "Helvetica", sans-serif;
    color: #f2f2f2;
    font-weight: bold;
    z-index: 10;
}


.Transparent-plate {
    position: absolute;
    width: 100%;
    height: 20%;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: transparent;
}

.not-Transparent-plate {
    position: absolute;
    width: 100%;
    height: 80%;
    align-items: center;
    justify-content: center;
    top: 20%;
    left: 0;
    background-color: #303030;
    border-radius: 5px;
}

.rate-this {
    margin-top: 5%;
    text-align: center;
    font-size: 15px;
    color: #fd9351;
    display: block;
}

.rate-name {
    text-align: center;
    color: #f2f2f2;
    display: block;
    margin-top: 2%;
    font-family: "Helvetica", sans-serif;
    font-size: 32px;
    font-weight: bold;
}

.book-rate-ten-star .el-rate__icon {
    font-size: 27px;
}

.book-rate-button {
    display: block;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    height: 40px;
    font-weight: bold;
    background-color: #fac234;
    color: #000000;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.book-rate-button.disabled {
    /* 按钮的禁用状态样式 */
    background-color: #ccc;
    color: #999;
    /* 其他样式设置 */
    display: block;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    height: 40px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    pointer-events: none;
}

.book-rate-button:hover {
    background-color: #faa328;
}

.rate-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    background-color: transparent;
}

.modal {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 98;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    background-color: transparent;
    /* 透明背景 */
}

.modal-content {
    width: 500px;
    height: 400px;
    position: relative;
    background-image: linear-gradient(to right, #f2f2f2 20%, #ddf0f6 60%);
    padding: 20px;
    border-radius: 5px;
    z-index: 5;
    /* 弹窗内容的样式，可以根据需要进行调整 */
}

.image-modal {
    width: 20%;
    height: 35%;
    object-fit: cover;
    position: absolute;
    top: 5%;
    left: 3%;
    /* 图片样式，可以根据需要进行调整 */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    color: #000000;
    font-size: 30px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 关闭按钮样式，可以根据需要进行调整 */
}

.modal-name {
    position: absolute;
    top: 4%;
    left: 25%;
    width: 40%;
    height: 7%;
    background-color: transparent;
    border: none;
    color: #000000;
    font-size: 30px;
    cursor: pointer;
    display: flex;
    text-align: left;
    /* 关闭按钮样式，可以根据需要进行调整 */
}

.el-icon-arrow-right {
    position: absolute;
    top: 25%;
    left: 75%;
    width: 40%;
    height: 10%;
    size: 35px;
}

.modal-info-1 {
    position: absolute;
    top: 15%;
    left: 25%;
    width: 55%;
    height: 15%;
    font-size: 16px;
    display: flex;
    align-items: left;
    text-align: left;
    padding-left: 1.5%;
    background-color: transparent;
    justify-content: flex-start;
}

.modal-info-2 {
    position: absolute;
    top: 20%;
    left: 25%;
    width: 55%;
    height: 15%;
    font-size: 16px;
    font-weight: bold;
    /* 设置字体加粗 */
    display: flex;
    align-items: left;
    text-align: left;
    padding-left: 1.5%;
    align-items: center;
    background-color: transparent;
    justify-content: flex-start;
}

.info-value-1 {
    background-color: transparent;
    color: #333;
}

.info-value-2 {
    background-color: transparent;
    color: #333;
}

.modal-rate {
    text-align: left;
    padding: 10px;
    position: absolute;
    z-index: 3;
    top: 32%;
    left: 25%;
    width: 55%;
    height: 5%;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    padding-left: 1.2%;
}

.modal-rating {
    border: none;
    background-color: transparent;
    position: absolute;
    z-index: 3;
    top: 2%;
    left: 35%;
    width: 35%;
    height: 100%;
    font-size: 16px;
    text-align: center;
    padding: 24px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-rating:hover {
    background-color: #a5a5a5;
    /* 设置悬停状态下的背景色 */
}

.text-rating {
    font-weight: bold;
    font-size: 16px;
    color: rgb(0, 3, 7);
}

.modal-rating:hover .text-rating {
    color: rgb(255, 255, 255);
}

.modal-introduction {
    position: absolute;
    top: 45%;
    left: 2%;
    width: 90%;
    max-height: 20%;
    text-align: left;
    padding-left: 1.5%;
    display: inline-block;
}

.modal-people-d {
    position: absolute;
    top: 65%;
    left: 2%;
    width: 90%;
    max-height: 15%;
    text-align: left;
    padding-left: 1.5%;
    display: inline-block;
}

.modal-people-d-text {
    font-weight: bold;
    font-size: 16px;
    color: rgb(0, 73, 168);
}

.modal-people-s {
    position: absolute;
    top: 75%;
    left: 2%;
    width: 90%;
    max-height: 15%;
    text-align: left;
    padding-left: 1.5%;
    display: inline-block;
}

.modal-people-s-text {
    font-weight: bold;
    font-size: 16px;
    color: rgb(0, 73, 168);
}
</style>
