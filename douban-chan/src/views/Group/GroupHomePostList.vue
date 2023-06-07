<!-- 通用帖子列表 -->
<!-- params:
        @postList: 帖子基本信息对象的列表
        @title: 希望在上栏中展示的标题
        @notShowSelectButton: 不显示"只看精品"
-->
<template>
    <div class="postlist-main-container">

        <!-- 顶部排序部分 -->
        <div class="postlist-sort-label-container" :style="distanceToTop">
            <div class="postlist-title">
                {{ componentTitle }}
            </div>
            <PostSortLabel></PostSortLabel>
            <!-- 只看精品帖子 -->
            <OnlySelectButton class="post-OnlyGoodpost-button" labelName="精华" eventName="setOnlyGoodpost" :backToTop="true"
                v-if="!notShowSelectButton">
            </OnlySelectButton>
        </div>

        <!-- 帖子列表 -->
        <div class="postlist-container">
            <PostCard v-for="post in activePostList" :key="post.postId" :info="post" :notShowTopped="true"
                :notShowIcongroup="true && !showIcongroup" />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostCard from '../../components/post/PostCard.vue'
import PostSortLabel from '../../components/post/PostSortLabel.vue'
import PostCreateBar from '../../components/post/PostCreateBar.vue';
import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue';
import OnlySelectButton from '@/components/post/button/OnlySelectButton.vue';

import GroupCard from '@/components/group/GroupCard.vue';

export default {
    name: 'GroupHomePostList',
    props: ['postList', 'title', 'notShowSelectButton', 'showIcongroup', 'top'], //数据来源：组件GroupHomeView.vue
    components: {
        PostCard,
        PostSortLabel,
        PostCreateBar,
        ScrollToTopButton,
        OnlySelectButton,
        GroupCard,
    },
    data() {
        return {
            activeLabel: 1,//1 热度排序 2 时间排序
            onlyGoodpost: false,   //是否只看精品帖子
        }
    },
    methods: {
        
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        componentTitle() {
            return this.title ? this.title : '讨论精选'
        },
        // 按照指定顺序筛选列表
        activePostList() {
            if(!this.postList){
                return []
            }
            let list = this.postList.slice()
            //只看精品帖子
            if (this.onlyGoodpost) {
                list = this.postList.filter(item => {
                    return item.isGoodPost === true
                })
            }
            //热度排序 点赞数大的在前面。特别地，置顶帖子优先
            if (this.activeLabel === 1) {
                list.sort((a, b) => {
                    if ((a.isTopped && b.isTopped) || (!a.isTopped && !b.isTopped)) {
                        return b.like - a.like
                    }
                    else {
                        return a.isTopped ? -1 : 1
                    }
                })
            }
            //时间排序 时间小的在前面。特别地，置顶帖子优先
            else if (this.activeLabel === 2) {
                list.sort((a, b) => {
                    if ((a.isTopped && b.isTopped) || (!a.isTopped && !b.isTopped)) {
                        return (a.date < b.date) ? -1 : 1
                    }
                    else {
                        return a.isTopped ? -1 : 1
                    }
                })
            }
            return list
        },
        // 动态设置到顶部的距离
        distanceToTop(){
            if(this.top){
                return{
                    top: this.top + 'px',
                }
            }
            return {}
        }
    },
    mounted() {
        // 监听PostSortLabel的改变排序方式事件，在事件回调中重新向服务器请求帖子列表，并重新加载postList
        this.$bus.$on('sortChanged', (index) => {
            this.activeLabel = index;
            console.log('排序方式已经改变：', index)
        })
        console.log('PostCardList已挂载事件sortChanged监听');

        //监听“只看精品贴”改变的事件
        this.$bus.$on('setOnlyGoodpost', (onlyGoodpost) => {
            this.onlyGoodpost = onlyGoodpost
            console.log('是否筛选精品贴已修改', onlyGoodpost)
        })
        console.log('已经挂载setOnlyGoodpost事件的监听')
    },
    beforeDestroy() {
        //卸载监听
        this.$bus.$off('setOnlyGoodpost')
        this.$bus.$off('sortChanged')
    },
}
</script>

<style scoped>
.postlist-main-container{
    max-width: 850px;
}
.postlist-title {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: center;

    margin: 12px 12px 12px 36px;
    font-size: 24px;
    font-weight: 600;
    color: rgb(251, 138, 138);
}

/* 顶部选择按时间或者热度排序 */
.postlist-sort-label-container {
    position: sticky;
    top: 148px;
    /* top: 120px; */
    background-color: rgb(255, 254, 254);
    z-index: 10;

    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: flex-start;
    margin-bottom: 10px;
}

/* 只看精华帖 */
.post-OnlyGoodpost-button {
    margin: 2px 7px 2px 7px;
}

/* 滚动至顶部 */
.post-likefav-scrollbutton {
    position: fixed;
    bottom: 150px;
    right: 20px;
}</style>