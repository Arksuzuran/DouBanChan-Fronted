<!-- 话题版块主页 “浏览发现”的二级路由页面 -->
<template>
    <GroupHomePostList :postList="postList" title="话题动态"></GroupHomePostList>
</template>

<script>
import GroupHomePostList from '../Group/GroupHomePostList.vue'

export default {
    name: 'TopicHomePostGroupList',
    props: ['postList'],
    components: {
        GroupHomePostList,
    },


}
</script>

<style scoped></style>