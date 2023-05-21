<template>
    <div class="onlyLz-button-container">
        <div class="postcard-button" :class="getButtonClass()" @mouseenter="mouseenterButton" @mouseleave="mouseleaveButton"
            @click="setOnlyLz" ref="onlyLzButton">
            <span ref="onlyLzButtonText">只看楼主</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'OnlyLzButton',
    data(){
        return{
            onlyLz: false,
        }
    },  
    methods:{
        getButtonClass(){
            return this.onlyLz ? 'postcard-button-onlyLz' : 'postcard-button-all'
        },
        setOnlyLz() {
            this.onlyLz = !this.onlyLz,
            this.$bus.$emit('setOnlyLz', this.onlyLz)
        },
        mouseenterButton() {
            if(!this.onlyLz){
                this.$refs.onlyLzButtonText.textContent = "筛选楼主"
            }
            else{
                this.$refs.onlyLzButtonText.textContent = "解除筛选"
            }
            this.$refs.onlyLzButtonText.classList.add('slide-in')
            this.$refs.onlyLzButton.classList.add('slide-in')
        },
        mouseleaveButton() {
            this.$refs.onlyLzButtonText.textContent = "只看楼主"
            this.$refs.onlyLzButtonText.classList.remove('slide-in')
            this.$refs.onlyLzButton.classList.remove('slide-in')
        },
    },
}
</script>

<style scoped>
/* 只看楼主按钮 */
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
.postcard-button-onlyLz {
    background-color: rgba(255, 0, 0, 0.8);
    color: rgba(255, 255, 255, 0.9);
    /* border: 2px solid rgba(255, 193, 193, 0.7); */
}
.postcard-button-all {
    background-color: rgba(255, 203, 203, 0.6);
    /* border: 2px solid rgba(255, 240, 240, 0.7); */
}
.postcard-button-all:hover{
    background-color: rgba(255, 122, 122, 0.6);
}
.postcard-button-onlyLz:hover {
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