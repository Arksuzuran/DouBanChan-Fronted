<!-- 话题版块主页 “浏览发现”的二级路由页面 -->
<template>
    <GroupHomePostList :postList="postList" title="话题动态"></GroupHomePostList>
</template>

<script>
import GroupHomePostList from '../Group/GroupHomePostList.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'TopicHomePostGroupList',
    props: ['postList'],
    components: {
        GroupHomePostList,
    },
    methods: {
        //获取帖子列表
        // ...mapActions('postAbout', ['getPostListByRandomOnline', 'getPostListByTagOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline']),
    },
    computed: {
        // ...mapGetters('postAbout', ['postList']),
    },
    mounted() {
        // console.log(this.postList)
    }

}
</script>

<style scoped></style>