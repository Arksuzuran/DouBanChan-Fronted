<template>
    <div class="clearfix">
        <div class="section-title">
            <span>{{ title }}</span>
        </div>
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
        font-size: 30px;
        float: left;
    }
    .clearfix::after {
        display: block;
        height: 0;
        content: "";
        clear: both;
        visibility: hidden;
    }
</style>