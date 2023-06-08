<template>
    <div>
        <GroupHomePostListVue :postList="list" :notShowSelectButton="true" :top="205" title="搜索结果"></GroupHomePostListVue>
    </div>
</template>
  
<script>
import GroupHomePostListVue from '../Group/GroupHomePostList.vue';
export default {
    name: 'SearchPost',
    props:['list'],
    components: {
        GroupHomePostListVue,
    },
    data() {
        return {
            // list: [],
        }
    },
    mounted() {
        // this.list = this.$route.params.list ? this.$route.params.list : []
    },
}
</script>
  
<style scoped></style>