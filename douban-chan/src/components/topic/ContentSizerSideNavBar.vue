<!-- 侧边导航栏 -->
<!-- 根据传入的数据 维护父组件内当前选中的标签 可以用来实现内容筛选 -->
<!-- params:
        @labelList: 供选择的标签列表,其中元素的形式举例{id:1, label:'文化'} -->
<template>
    <div class="leftnav-container">
        <div class="grouplist-header-container">
            <!-- <div class="color-block"></div> -->
            <span class="grouplist-header-title">内容分类</span>
        </div>
        <div class="item-container">
            <div v-for="label in labelList" :index="'' + label.id" :key="label.id" class="leftnav-item"
                :class="getItemClass(label.id)" @click="handleSelect(label.id)">
                <i class="el-icon-menu leftnav-label" :class="getLabelClass(label.id)"></i>
                <span class="leftnav-label" :class="getLabelClass(label.id)">{{ label.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentSizerSideNavBar',
    props: ['labelList'],
    data() {
        return {
            activeLeftLabel: 0
        }
    },
    methods: {
        // 处理二级导航选择事件 当前选中的是哪个标签
        handleSelect(index) {
            this.activeLeftLabel = index
            this.$bus.$emit('leftNavChanged', index);
        },
        getItemClass(index) {
            return index == this.activeLeftLabel ? 'leftnav-item-active' : ''
        },
        getLabelClass(index) {
            return index == this.activeLeftLabel ? 'leftnav-label-active' : ''
        },
    },
    computed: {

    },
}
</script>

<style scoped>
.item-container {
    border: 1px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(188, 126, 126, 0.2);
    border-radius: 8px;
}

/* 顶部标题 */
.grouplist-header-container {

    /* top: 120px; */
    background-color: rgb(255, 254, 254);
    z-index: 10;
    min-height: 60px;
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: flex-start;
    margin-bottom: 10px;
}

.grouplist-header-title {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: center;

    margin: 12px;
    font-size: 24px;
    font-weight: 600;
    color: rgb(251, 138, 138);
}

/* 色块 */
.color-block {
    background-color: rgb(251, 138, 138);
    width: 15px;
    height: 20px;
    margin: 18px 12px 12px 12px;
}
/* .item-container{

} */
.leftnav-item {
    height: 50px;
    padding: 0 5%;
    cursor: pointer;
    background-color: rgb(255, 245, 245);
    border: 1px 1px 0 1px solid rgba(255, 255, 255);
    /* box-shadow: 0px 2px 4px 0px rgba(247, 61, 61, 0.2); */

    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    border-radius: 4px;
}
.leftnav-item:hover {
    transition: .5s ease;
    background-color: rgb(251, 150, 150);
}
.leftnav-item-active {
    /* transition: .5s ease; */
    background-color: rgb(251, 80, 80);
}
.leftnav-item-active:hover {
    /* transition: .5s ease; */
    background-color: rgb(251, 40, 40);
}
.leftnav-label {
    margin: 10px;
    font-size: 16px;
}

.leftnav-label-active {
    color: white;
}</style>