<template>
<div>
    <div>
        <div style="display: inline-block;">
            <i class="el-icon-chat-dot-round" style="font-size: 30px; margin-right: 10px;"></i><div class="sectionTitle">评论区</div>
            <div class="commentNum">{{ commentNum }}条</div>
        </div>
        <div class="write-comment"><el-button type="primary" icon="el-icon-edit" @click="changeReplying">写评论</el-button></div>
    </div>
    
    <CommentReplyInputBox v-if="isReplying" :textId="textId" :targetUserName="reviewerName">
    </CommentReplyInputBox>

    <commentFirstLevel v-for="(commentInfo,index) in commentInfos" :key=index :item="commentInfo"></commentFirstLevel>
</div>
</template>

<script>
import commentFirstLevel from '@/components/review/commentFirstLevel.vue'
import CommentReplyInputBox from '@/components/post/button/CommentReplyInputBox.vue';
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
            commentNum: 1000,
            commentInfos: [
                {
                    id: 1,
                    imageUrl: require('../../assets/user-image-1.jpg'),
                    name: '阿迪斯发斯蒂芬',
                    date: '2020-12-31 12:00:00',
                    content: "楼主本人的影评写的不错，不过后面附的观影团其他人的影评，这部分我个人阅后认为有的人的影评过于高高在上了。通俗来说就是可能成长顺遂没有吃过苦，对影片中的一些言不由衷的苦难，难以启齿的经历，没法好好共情，导致写出的影评有一股上帝视角的审视，及道德制高点的各种上帝全知全能预设式的批判，我表示达咩。",
                    like: 10,
                    dislike: 100,
                },
                {
                    id: 2,
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    name: 'www',
                    date: '2020-12-31 12:00:00',
                    content: "楼主本人的影评写的不错，不过后面附的观影团其他人的影评，这部分我个人阅后认为有的人的影评过于高高在上了。通俗来说就是可能成长顺遂没有吃过苦，对影片中的一些言不由衷的苦难，难以启齿的经历，没法好好共情，导致写出的影评有一股上帝视角的审视，及道德制高点的各种上帝全知全能预设式的批判，我表示达咩。",
                    like: 10,
                    dislike: 100,
                },
                {
                    id: 3,
                    imageUrl: require('../../assets/user-image-3.jpg'),
                    name: 'www',
                    date: '2020-12-31 12:00:00',
                    content: "楼主本人的影评写的不错，不过后面附的观影团其他人的影评，这部分我个人阅后认为有的人的影评过于高高在上了。通俗来说就是可能成长顺遂没有吃过苦，对影片中的一些言不由衷的苦难，难以启齿的经历，没法好好共情，导致写出的影评有一股上帝视角的审视，及道德制高点的各种上帝全知全能预设式的批判，我表示达咩。",
                    like: 10,
                    dislike: 100,
                },
            ]
        }
    },
    methods:{
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
</style>