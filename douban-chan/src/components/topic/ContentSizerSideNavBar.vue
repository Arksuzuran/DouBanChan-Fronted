<!-- 侧边导航栏 -->
<!-- 根据传入的数据 维护父组件内当前选中的标签 可以用来实现内容筛选 -->
<!-- params:
        @labelList: 供选择的标签列表,其中元素的形式举例{id:1, label:'文化'} -->
<template>
    <div>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item v-for="label in labelList" :index="'' + label.id" :key="label.id">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ label.label }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'ContentSizerSideNavBar',
    props: ['labelList'],
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>

<style></style>