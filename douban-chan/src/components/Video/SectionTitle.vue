<template>
    <div class="section-title">
        <span>{{ title }}</span>
        <span class="more">更多</span>
    </div>
</template>

<script>
export default {
    name: 'SectionTitle',
    props:['title']
}
</script>

<style scoped>
    .section-title{
        height: 100px;
        background-color: black;
        color: white;
        font-size: 50px;
        font-weight: bold;
        line-height: 100px;
        margin-top: 20px;
    }
    .section-title .more{
        float: right;
        font-size: 14px;
        color: #999;
    }
</style>