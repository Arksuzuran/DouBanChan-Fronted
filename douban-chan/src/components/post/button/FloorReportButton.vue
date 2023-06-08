<!-- 举报按钮及举报单弹窗 -->
<template>
    <div class="report-button-container">
        <button class="postcard-button-report" @mouseenter="mouseenterReportButton" @mouseleave="mouseleaveReportButton"
            @click="report">
            <span ref="reportButtonText">举报</span>
        </button>
        <ReportInputBox :signal="inputBoxOpenSignal" :textId="textId"></ReportInputBox>
    </div>
</template>

<script>
import ReportInputBox from '../ReportInputBox.vue'
export default {
    name: 'FloorReportButton',
    // 举报信息
    // info:{ textId, userId, userName, userImageUrl, title, text, }
    props:['textId'],
    data(){
        return{
            inputBoxOpenSignal: false,  //当该值变化时即打开弹窗 由弹窗自己进行关闭
        }
    },
    components:{
        ReportInputBox,
    },
    methods: {
        // 打开举报单弹窗
        report() {
            this.inputBoxOpenSignal = !this.inputBoxOpenSignal
        },
        mouseenterReportButton() {
            this.$refs.reportButtonText.classList.add('slide-in')
        },
        mouseleaveReportButton() {
            this.$refs.reportButtonText.classList.remove('slide-in')
        },
    }
}
</script>

<style scoped>
/* 举报按钮 */
.postcard-button-report {
    /* 回复按钮 */ 
    margin: 0 0 3px 20px;
    height: 25px;
    width: 50px;
    background-color: rgb(255, 235, 235);
    border-radius: 3px;
    border: 1px solid rgba(255, 252, 252, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.postcard-button-report:hover {
    background-color: rgba(255, 126, 126, 1);
    color: white;
    transition: 0.5s ease-out;
}

/* 鼠标移入的动画效果 */
.slide-in {
    animation: slideInAnimation 0.5s forwards;
}

@keyframes slideInAnimation {
    from {
        /* transform: translateX(-100%); */
        opacity: 0.5;
    }

    to {
        /* transform: translateX(0); */
        opacity: 1;
    }
}
</style>