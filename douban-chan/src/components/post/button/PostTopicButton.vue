<!-- 跳转到相应话题的按钮 -->
<template>
    <div class="button-container">
        <button class="postcard-button-topic" @mouseenter="mouseenterTopicButton" @mouseleave="mouseleaveTopicButton"
            @click="jumpToTopic">
            <span ref="topicButtonText">{{ cutStrByLength('#' + info.topic, 9) }}</span>
        </button>
    </div>
</template>

<script>
export default {
    props: ['info'],
    name: 'PostReportButton',
    methods: {
        // 跳转至相应话题
        jumpToTopic() {
            this.$router.push({
                name: 'topic',
                query: {
                    topicId: this.info.topicId,
                },
            })
        },
        // 鼠标进入和离开按钮的动画
        mouseenterTopicButton() {
            this.$refs.topicButtonText.textContent = "进入话题 >>"
            this.$refs.topicButtonText.classList.add('slide-in')
        },
        mouseleaveTopicButton() {
            this.$refs.topicButtonText.textContent = this.cutStrByLength('#' + this.info.topic, 9)
            this.$refs.topicButtonText.classList.remove('slide-in')
        },
        // 限制字符串长度为length
        cutStrByLength(str, length) {
            if (str.length > length) {
                return str.slice(0, length - 2) + "..";
            } else {
                return str;
            }
        },
    }
}
</script>

<style scoped>
/* 话题按钮 */
.postcard-button-topic {
    /* 尺寸 */
    width: 130px;
    height: 36px;
    margin: 10px;
    /* 背景 边界 阴影 */
    background-color: rgba(207, 224, 253, 0.6);
    border: 2px solid rgba(226, 250, 255, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    /* 字体 */
    font-size: 16px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.postcard-button-topic:hover {
    background-color: rgba(155, 190, 252, 1);
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