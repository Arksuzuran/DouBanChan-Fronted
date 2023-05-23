<!-- 返回顶部的按钮 -->
<!-- 注意 该组件没有设置fixed 需要在父组件里手动设置 -->
<template>
    <button class="scroll-to-top-button" @click="scrollToTop">
        <i class="el-icon-arrow-up"></i>
    </button>
</template>
  
<script>
export default {
    name: 'ScrollToTopButton',
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // 平滑滚动
            });
        }
    }
}
</script>
  
<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';
.scroll-to-top-button {
    padding: 10px;
    border-radius: 5px;
    background-color: rgb(255, 217, 217);
    border: 3px solid rgba(254, 232, 232, 0.8);
    outline: none;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
.scroll-to-top-button:hover{
    background-color: rgb(255, 182, 182);
    border: 3px solid rgba(255, 138, 138, 0.8);
}
</style>
  