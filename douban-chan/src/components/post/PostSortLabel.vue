<template>
    <!-- 排序部分 -->
    <div class="sort-label-container">
        <div class="color-block"></div>
        <div :class="getLabelClass(1)" @click="handleSortLabelChange(1)">按热度</div>
        <div :class="getLabelClass(0)">{{ ' | ' }}</div>
        <div :class="getLabelClass(2)" @click="handleSortLabelChange(2)">{{ timeLabel }}</div>
    </div>
</template>

<script>
export default {
    name: 'PostSortLabel',
    data() {
        return {
            activeLabel: 1,
            timeLate: true,
        }
    },
    methods: {
        // 处理排序标签变化的事件
        handleSortLabelChange(index) {
            if(index > 1 && this.activeLabel > 1){
                this.timeLate = !this.timeLate
            }
            this.activeLabel = index
            //透过全局事件总线向父组件传递排序方式改变的事件
            this.$bus.$emit('sortChanged', this.timeLate && this.activeLabel > 1 ? 3 : this.activeLabel)
        },
        getLabelClass(index) {
            return index == this.activeLabel ? 'active-sort-label' : 'sort-label'
        },
    },
    computed:{
        timeLabel(){
            return this.timeLate ? '按时间倒序' : '按时间顺序' 
        }
    }
}
</script>

<style scoped>

.sort-label-container {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: flex-start;
    margin: 10px;
}
.color-block {
    background-color: #fe7998;
    width: 15px;
    height: 20px;
    margin: 10px 10px 5px 5px;
}

.sort-label {
    color: #000;
    font-size: 14px;
    margin: 10px 5px;
    /* 手型 */
    cursor: pointer;
}

.active-sort-label {
    color: #F73462;
    font-size: 14px;
    margin: 10px 5px;
    text-align: center;
    /* 手型 */
    cursor: pointer;
}

.sort-label:hover,
.active-sort-label:hover {
    color: #fca2b7;
}
</style>