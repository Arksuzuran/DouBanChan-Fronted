<template>
<div>
    <div>
        <div style="display: inline-block;">
            <i class="el-icon-chat-dot-round" style="font-size: 30px; margin-right: 10px;"></i><div class="sectionTitle">评论区</div>
            <div class="commentNum">{{ commentNum }}条</div>
        </div>
        <div class="section-row">
            <div class="choose">
                <div class="tab" :class="{ active: activeTab === 'latest' }" @click="setActiveTab('latest')">最新</div>
                |
                <div class="tab" :class="{ active: activeTab === 'hottest' }" @click="setActiveTab('hottest')">最热</div>
            </div>
        </div>
        
        <div class="write-comment"><el-button type="primary" icon="el-icon-edit" @click="changeReplying">写评论</el-button></div>
        
    </div>
    
    <CommentReplyInputBox v-if="isReplying" :textId="textId" :targetUserName="reviewerName">
    </CommentReplyInputBox>

    <commentFirstLevel v-for="(commentInfo,index) in reviewItems" :key=index :item="commentInfo"></commentFirstLevel>
</div>
</template>

<script>
import commentFirstLevel from '@/components/review/commentFirstLevel.vue'
import CommentReplyInputBox from '@/components/post/button/CommentReplyInputBox.vue';
import qs from 'qs'
export default {
    name: 'CommentSection',
    components: {
        commentFirstLevel,CommentReplyInputBox
    },
    props: ['reviewerName'],
    data(){
        return {
            textId: this.$route.params.id,
            isReplying: false,
            reviewItems: [],
        }
    },
    methods:{
        setActiveTab(tab) {
            if (this.activeTab != tab) {
                this.activeTab = tab;
                if (tab === 'latest') {
                console.log('最新');
                console.log(this.reviewItems)
                this.reviewItems = this.reviewsOrderedByTime
                console.log(this.reviewItems)
                }
                else if (tab === 'hottest') {
                console.log('最热');
                this.reviewItems = this.reviewsOrderedByLike
                }
            }
        },
        changeReplying() {
            this.isReplying = !this.isReplying;
        },
    },
    mounted(){
        this.updateComments();
        this.updateCommentNum();
    }
}
</script>

<style scoped>
.sectionTitle {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    display: inline-block
}
.commentNum {
    font-size: 15px;
    color: #8590A6;
    display: inline-block;
    margin-left: 5px;
}
.reply-button {
    margin: 0 0 3px 20px;
    height: 25px;
    width: 50px;
    background-color: rgb(255, 235, 235);
    border-radius: 3px;
    border: 1px solid rgba(255, 252, 252, 0.8);
    display: inline-block;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.write-comment{
    display: inline-block;
    font-size: 16px;
    margin-left: 20px;
}
.section-row{
    display: inline-block;
    margin-left: 10px;
}
.tab {
  display: inline-block;
  cursor: pointer;
}
</style>