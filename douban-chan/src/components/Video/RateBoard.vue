<!-- 点击详情页或者星星可以评分 -->
<template>
    <div>
        <div class="content">
        <i class="fa-solid fa-star" style="color: #ffdd00;"></i>
        <span style="letter-spacing: -0.5px; vertical-align: middle;margin-left: 3px;color: #ffffff;">{{ movie.m_rate
        }}</span>
        <button class="star-button" @click="showRate">
            <i class="fa-solid fa-star star-button-color-1"></i>
        </button>
    </div>
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
                <span class="rate-name">{{ movie.m_name }}</span>
                <!-- <span class="demonstration">区分颜色</span> -->
                <el-rate style="margin-top: 3%;" v-model="value" :colors="colors" :max="10">
                </el-rate>
                <button class="universal-rate-button" :disabled="value === 0"
                    :class="{ 'disabled': value === 0 }">打分</button>
            </div>
        </div>
    </div>
</div>
    </div>
    
</template>

<script>
export default {
    methods:{
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
        content() {
            text-align: left;
            padding: 5px;
            position: relative;
            padding-left: 12px;
            z-index: 1;
            margin-top: -5px;
            font-size: 16px;
            max-height: 70px;
    }
    }   
}
</script>

<style scoped>
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

.universal-rate-button {
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

.rate-name {
    text-align: center;
    color: #f2f2f2;
    display: block;
    margin-top: 2%;
    font-family: "Helvetica", sans-serif;
    font-size: 32px;
    font-weight: bold;
}

.rate-block {
    position: absolute;
    width: 100%;
    height: 80%;
    bottom: 0%;
    background-color: transparent;
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
.rate-icon-container {
    position: relative;
}
.rate-this {
    margin-top: 5%;
    text-align: center;
    font-size: 15px;
    color: #fd9351;
    display: block;
}
</style>