<template>
  <div class="info">
    <div v-if="item.m_type !== 3">
        <ul>
            <li><span class="item-properties">导演</span><span>{{ item.m_director }}</span></li>
            <li><span class="item-properties">编剧</span><span>{{ item.m_writer }}</span></li>
            <li><span class="item-properties">主演</span><span>{{ item.m_actor }}</span></li>
            <li><span class="item-properties">类型</span><span>{{ item.m_genre }} </span></li>
            <li><span class="item-properties">语言</span><span>{{ item.m_language }}</span></li>
            <li><span class="item-properties">国家</span><span>{{ item.m_region }}</span></li>
            <li><span class="item-properties">片长</span><span>{{ item.m_duration }}</span></li>
            <li><span class="item-properties">年份</span><span>{{ item.m_year }}</span></li>
        </ul>
    </div>

    <div v-else>
        <ul>
            <li><span class="item-properties">作者</span><span>{{ item.m_author }}</span></li>
            <li><span class="item-properties">类型</span><span>{{ item.m_genre }}</span></li>
            <li><span class="item-properties">页数</span><span>{{ item.m_page }}</span></li>
            <li><span class="item-properties">国家</span><span>{{ item.m_region }} </span></li>
            <li><span class="item-properties">语言</span><span>{{ item.m_language }}</span></li>
            <li><span class="item-properties">出版年</span><span>{{ item.m_year }}</span></li>
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

<style scoped>
    .info{
        text-align: left;
        font-size: 16px;
        margin-left: 30px;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li:nth-child(n){
        margin-top: 10px;
    }
    li span:first-child{
        display: inline-block;
        /* width: 80px; */
        text-align: left;
        color: #999;
    }
    li span:nth-child(n){
        font-weight: bold;
    }
    .item-properties{
        display: inline-block;
        width: 50px;
        text-align: left;
        color: #999;
    }
</style>