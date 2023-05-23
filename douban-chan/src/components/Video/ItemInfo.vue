<template>
  <div class="info">
    <div>
        <ul>
            <li><span>导演</span><span>{{ item.director }}</span></li>
            <li><span>编剧</span><span>{{ item.writer }}</span></li>
            <li><span>主演</span><span v-for="(i,index) in item.actor" :key="index">{{ i }} </span></li>
            <li><span>类型</span><span v-for="(i,index) in item.category" :key="index">{{ i }} </span></li>
            <li><span>语言</span><span>{{ item.language }}</span></li>
            <li><span>国家</span><span>{{ item.country }}</span></li>
            <li><span>片长</span><span>{{ item.lastTime }}</span></li>
            <li><span>上映日期</span><span>{{ item.onDate }}</span></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ItemInfo',
    props: ['item']
}
</script>

<style>
    .info{
        text-align: left;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li{
        margin-top: 10px;
    }
    li span:first-child{
        display: inline-block;
        width: 80px;
        text-align: left;
        color: #999;
    }
    li span:nth-child(>0){
        margin-left: 10px;
    }
</style>