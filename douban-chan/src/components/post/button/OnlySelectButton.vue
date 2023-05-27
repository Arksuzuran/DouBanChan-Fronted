<!-- 只筛选某部分内容的自定义按钮 -->
<!-- param:  
    @labelName 要在按钮内显示的筛选文本
    @eventName 在点击按钮后要触发的事件 以此来更新父组件内的变量
    @backToTop  筛选后要不要回到顶部 
-->
<template>
    <div class="only-button-container">
        <div class="postcard-button" :class="getButtonClass()" @mouseenter="mouseenterButton" @mouseleave="mouseleaveButton"
            @click="setonly" ref="onlyButton">
            <span ref="onlyButtonText">只看{{ labelName }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OnlySelectButton',
    props: ['labelName', 'eventName', 'backToTop'],
    data() {
        return {
            only: false,
        }
    },
    methods: {
        getButtonClass() {
            return this.only ? 'postcard-button-only' : 'postcard-button-all'
        },
        setonly() {
            this.only = !this.only
            this.$bus.$emit(this.eventName, this.only)
            if (this.backToTop) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 平滑滚动
                });
            }
        },
        mouseenterButton() {
            if (!this.only) {
                this.$refs.onlyButtonText.textContent = "筛选" + this.labelName
            }
            else {
                this.$refs.onlyButtonText.textContent = "解除筛选"
            }
            this.$refs.onlyButtonText.classList.add('slide-in')
            this.$refs.onlyButton.classList.add('slide-in')
        },
        mouseleaveButton() {
            this.$refs.onlyButtonText.textContent = "只看" + this.labelName
            this.$refs.onlyButtonText.classList.remove('slide-in')
            this.$refs.onlyButton.classList.remove('slide-in')
        },
    },
}
</script>

<style scoped>
/* 只看按钮 */
.postcard-button {
    /* 尺寸 */
    width: 80px;
    height: 30px;
    margin: 10px;
    /* 背景 边界 阴影 */
    border: 2px solid rgba(255, 230, 230, 0.7);
    /* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1); */
    border-radius: 5px;
    /* 字体 */
    font-size: 14px;
    font-weight: 400;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
}

.postcard-button-only {
    background-color: rgba(255, 0, 0, 0.8);
    color: rgba(255, 255, 255, 0.9);
    /* border: 2px solid rgba(255, 193, 193, 0.7); */
}

.postcard-button-all {
    background-color: rgba(255, 203, 203, 0.6);
    /* border: 2px solid rgba(255, 240, 240, 0.7); */
}

.postcard-button-all:hover {
    background-color: rgba(255, 122, 122, 0.6);
}

.postcard-button-only:hover {
    background-color: rgb(255, 2, 2);
}

/* 鼠标移入的动画效果 */
.slide-in {
    animation: slideInAnimation 0.5s forwards;
}

@keyframes slideInAnimation {
    from {
        opacity: 0.5;
    }

    to {
        opacity: 1;
    }
}
</style>