<!-- 举报按钮及举报单弹窗 -->
<template>
    <div class="report-button-container">
        <button class="postcard-button-report" @mouseenter="mouseenterReportButton" @mouseleave="mouseleaveReportButton"
            @click="report">
            <span ref="reportButtonText">举报</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'PostReportButton',
    methods: {
        // 打开举报单弹窗
        report() {

        },
        mouseenterReportButton() {
            this.$refs.reportButtonText.textContent = "填写举报单"
            this.$refs.reportButtonText.classList.add('slide-in')
        },
        mouseleaveReportButton() {
            this.$refs.reportButtonText.textContent = "举报"
            this.$refs.reportButtonText.classList.remove('slide-in')
        },
    }
}
</script>

<style scoped>
/* 举报按钮 */
.postcard-button-report {
    /* 尺寸 */
    width: 100px;
    height: 36px;
    margin: 10px;
    /* 背景 边界 阴影 */
    background-color: rgba(246, 152, 152, 0.6);
    border: 2px solid rgba(253, 187, 187, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    /* 字体 */
    font-size: 16px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.postcard-button-report:hover {
    background-color: rgba(255, 126, 126, 1);
}

/* 鼠标移入的动画效果 */
.slide-in {
    animation: slideInAnimation 0.5s forwards;
}

@keyframes slideInAnimation {
    from {
        transform: translateX(-100%);
        opacity: 0.5;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>