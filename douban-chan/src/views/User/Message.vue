<template>
    <div>
        <el-container>
            <el-header class="header-container">
                <h2>我的消息</h2>
                <!-- 已读后不显示上标 -->
                <el-badge v-if="!unreadLiked" class="item" type="success">
                    <el-button size="small" @click="readLiked">点赞</el-button>
                </el-badge>
                <el-badge v-if="unreadLiked" :value="unreadLiked" class="item" type="success">
                    <el-button size="small" @click="readLiked">点赞</el-button>
                </el-badge>

                <el-badge v-if="!unreadComment" class="item">
                    <el-button size="small" @click="readComment">评论</el-button>
                </el-badge>
                <el-badge v-if="unreadComment" :value="unreadComment" class="item">
                    <el-button size="small" @click="readComment">评论</el-button>
                </el-badge>

                <el-badge v-if="!unreadNotice" class="item">
                    <el-button size="small" @click="readNotice">通知</el-button>
                </el-badge>
                <el-badge v-if="unreadNotice" :value="unreadNotice" class="item">
                    <el-button size="small" @click="readNotice">通知</el-button>
                </el-badge>
            </el-header>
            <el-main>
                <div class="msg-container">
                    <DetailedMessageCard v-for="(msg, index) in selectedList" :key="index" :info="msg"
                        :type="selectedSection" />
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script>
import DetailedMessageCard from '../../components/DetailedMessageCard.vue';
export default {
    data() {
        return {
            //当前选中了点赞1还是评论2还是通知3
            selectedSection: 1,
            //未读数量
            unreadLiked: 10,
            unreadComment: 20,
            unreadNotice: 10,
            likedList: [
                {
                    name: "suzuran",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-29 15:34',
                    from: '集美小组',
                    type: '帖子',
                    title: "家人们谁懂啊",
                    content: "点赞",
                    postImageUrl: require('../../assets/post-img-2.jpg'),
                },
                {
                    name: "suzuran",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-29 15:34',
                    from: '集美小组',
                    type: '帖子',
                    title: "家人们谁懂啊",
                    content: "点赞",
                    postImageUrl: require('../../assets/post-img-2.jpg'),
                },
                {
                    name: "suzuran",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-29 15:34',
                    from: '集美小组',
                    type: '帖子',
                    title: "家人们谁懂啊",
                    content: "点赞",
                    postImageUrl: require('../../assets/post-img-2.jpg'),
                },
                {
                    name: "suzuran",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-29 15:34',
                    from: '集美小组',
                    type: '帖子',
                    title: "家人们谁懂啊",
                    content: "点赞",
                    postImageUrl: require('../../assets/post-img-2.jpg'),
                },
                {
                    name: "suzuran",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-29 15:34',
                    from: '集美小组',
                    type: '帖子',
                    title: "家人们谁懂啊",
                    content: "点赞",
                    postImageUrl: require('../../assets/post-img-2.jpg'),
                },
            ],
            commentList: [
                {
                    name: "suzuran",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-28 21:22',
                    title: "这就是不玩原神的下场",
                    from: '原神小组',
                    type: '帖子',
                    content: "我超, 原！我超, 原！我超, 原！我超, 原！我超, 原！我超, 原！我超, 原！我超, 原！我超, 原！我超, 原！我超, 原！",
                    postImageUrl: require('../../assets/post-img-1.jpg'),
                },
                {
                    name: "suzuran",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-30 17:10',
                    title: "回来吧🚁牢大🚁",
                    from: '黑坤巴精神小组',
                    type: '帖子',
                    content: "哼想逃？闪电旋风劈！",
                    postImageUrl: require('../../assets/user-image-3.jpg'),
                },
            ],
            noticeList: [
                {
                    name: "管理员",
                    imageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-5-1 08:05',
                    title: "回来吧🚁牢大🚁",
                    from: '黑坤巴精神小组',
                    type: '帖子',
                    content: "您的帖子已被管理员删除。",
                    postImageUrl: require('../../assets/user-image-3.jpg'),
                },
            ],
        }
    },
    computed: {
        selectedList() {
            if (this.selectedSection === 1) {
                return this.likedList
            }
            else if (this.selectedSection === 2) {
                return this.commentList
            }
            else {
                return this.noticeList
            }
        }
    },
    methods: {
        readLiked() {
            this.unreadLiked = 0
            this.selectedSection = 1
            console.log("readLiked被调用了")
        },
        readComment() {
            this.unreadComment = 0
            this.selectedSection = 2
            console.log("readComment被调用了")
        },
        readNotice() {
            this.unreadNotice = 0
            this.selectedSection = 3
            console.log("readNotice被调用了")
        },
    },
    components: {
        DetailedMessageCard,
    }
}
</script>
  
<style scoped>
.header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.el-badge {
    margin-top: 20px;
    margin-right: 15px;
}

.el-container {
    margin-top: 10px;
}

.msg-container {
    width: 90%;
    margin: 0 auto;
    display: block;
}
</style>