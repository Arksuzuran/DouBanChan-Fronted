<!-- 帖子中的每一层楼 -->
<template>
    <div class="postfloor-container">
        <!-- 发帖人头像 昵称 时间 -->
        <PostCardUserInfo :info="userInfo"></PostCardUserInfo>
        <!-- 赞 踩 和 举报按钮 -->
        <div class="postfloor-buttongroup">
            <PostReportButton :info="post"></PostReportButton>
        </div>
        <!-- 点赞数 与 帖子正文 -->
        <div class="postfloor-text-container">
            <!-- 楼层 -->
            <div class="postfloor-floorNumberBox">
                <div class="postfloor-floorNumberBox-floor">{{ info.floor + '楼' }}</div>
            </div>
            <!-- 是否楼主 -->
            <div class="postfloor-LZBox" v-if="lz">
                <div class="postfloor-LZBox-LZ">楼主</div>
            </div>
            <!-- 帖子正文 -->
            <PostCardText class="postfloor-maintext" :info="textInfo" :normal="true"/>

            <!-- 赞与踩 回复按钮-->
            <div class="postfloor-like-container">
                <LikeButtonGroup :info="info" />
                <!-- 回复按钮 -->
                <div class="postfloor-reply-button" @click="changeReplying">
                    回复
                </div>
            </div>
        </div>

        <div class="postfloor-comment-container">
            <!-- 撰写评论的区域 -->
            <CommentReplyInputBox v-if="isReplying" :textId="info.textId" :targetUserName="info.userName">
            </CommentReplyInputBox>
            <!-- 展示未被折叠的评论 -->
            <ComentUnderFloor v-for="info in showedchildFloorList" :key="info.textId" :info="info"></ComentUnderFloor>
        </div>

        <!-- 底部被折叠的评论 -->
        <el-collapse v-if="showFoldedComments">
            <el-collapse-item>
                <template slot="title">
                    <div class="folded-comments-title">
                        展开余下共 {{ restFoldedCommentsNum }} 条回复
                        <i class="fa-sharp fa-solid fa-comment" style="margin-left: 10px;"></i>
                    </div>
                </template>
                <!-- 在这里放置余下的评论 -->
                <!-- 被折叠的评论 -->
                <div class="postfloor-comment-container">
                    <ComentUnderFloor v-for="(info, index) in restchildFloorList" :key="index" :info="info">
                    </ComentUnderFloor>
                </div>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostCardUserInfo from './PostCardUserInfo.vue';
import PostCardText from './PostCardText.vue';
import PostReportButton from './button/PostReportButton.vue';
import ComentUnderFloor from './ComentUnderFloor.vue';
import LikeButtonGroup from './button/LikeButtonGroup.vue';
import CommentReplyInputBox from './button/CommentReplyInputBox.vue';

export default {
    props: ['post', 'info', 'lz'],
    components: {
        PostCardUserInfo,
        PostCardText,
        PostReportButton,
        ComentUnderFloor,
        LikeButtonGroup,
        CommentReplyInputBox,
    },
    data() {
        return {
            // 用户是否正在回复评论
            isReplying: false,
            // 允许直接展示的最多楼中楼层数
            maxCommentsNum: 2,
        }
    },
    computed: {
        // 要传递给PostCardUserInfo组件的信息
        userInfo() {
            return {
                id: this.info.userId,
                name: this.info.userName,
                date: this.info.date,
                imageUrl: this.info.userImageUrl,
            }
        },
        // 要传递给PostCardText组件的信息
        textInfo() {
            if (this.info.floor == 1) {
                return {
                    title: this.post.title,
                    text: this.info.text,
                    postImageUrlList: this.info.imageUrlList,
                }
            }
            return {
                text: this.info.text,
                postImageUrlList: this.info.imageUrlList,
            }
        },
        showFoldedComments() {
            return this.info.childFloorList && this.info.childFloorList.length > this.maxCommentsNum;
        },
        restFoldedCommentsNum() {
            return this.info.childFloorList ? this.info.childFloorList.length - this.maxCommentsNum : 0;
        },
        // 筛选评论
        showedchildFloorList() {
            console.log(this.info)
            // 获取前两条评论
            return this.info.childFloorList.slice(0, this.maxCommentsNum);
        },
        restchildFloorList() {
            // 获取除前两条评论外的其余评论
            return this.info.childFloorList.slice(this.maxCommentsNum);
        },
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    methods: {
        // 改变用户对当层楼的回复状态
        changeReplying() {
            this.isReplying = !this.isReplying
        },
        //处理点赞
        // updateLike(cnt) {
        //     console.log('用户点赞', cnt)
        // },
        // //处理点踩
        // updateDislike(cnt) {
        //     console.log('用户点踩', cnt)
        // },
    },
    mounted() {
        this.$bus.$on('commentReplyCreated', (textId) => {
            if(textId == this.info.textId){
                this.isReplying = !this.isReplying
            }
        })
    },
}
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

.postfloor-container {
    margin: 20px 10px 20px 10px;
    background-color: rgb(255, 255, 255);
    position: relative;
}

/* .postfloor-userinfo-container{
    background-color: rgb(255, 243, 243);
} */
/* 按钮组 */
.postfloor-buttongroup {
    position: absolute;
    top: 1px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

/* 未折叠的评论的容器 */
.postfloor-comment-container {
    margin: 10px 0 10px 110px;
}

.postfloor-text-container {
    position: relative;
    min-height: 130px;
}

/* 赞和踩的图标组容器 */
.postfloor-like-container {
    margin-left: 110px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

/* 回复按钮 */
.postfloor-reply-button {
    margin: 0 0 3px 20px;
    height: 25px;
    width: 50px;
    background-color: rgb(255, 235, 235);
    border-radius: 3px;
    border: 1px solid rgba(255, 252, 252, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.postcard-icon {
    font-size: 18px;
    color: rgb(97, 97, 97);
    margin: 0 5px 3px 20px;
    cursor: pointer;
}

/* 楼层数的醒目box */
.postfloor-floorNumberBox {
    /* 位置 */
    position: absolute;
    left: 15px;
    top: 10px;
    /* 大小 */
    width: 60px;
    height: 40px;
    /* 背景 边界 阴影 */
    background-color: rgba(254, 249, 249, 0.6);
    border: 3px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.postfloor-floorNumberBox-floor {
    /* 字体 */
    font-size: 16px;
    margin-top: 8px;
}

/* 楼主标签 */
.postfloor-LZBox {
    /* 位置 */
    position: absolute;
    left: 15px;
    top: 70px;
    /* 大小 */
    width: 60px;
    height: 40px;
    /* 背景 边界 阴影 */
    background-color: rgba(254, 249, 249, 0.6);
    border: 3px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.postfloor-LZBox-LZ {
    font-size: 16px;
    margin-top: 8px;
}

.postfloor-floorNumberBox-floornumber {
    /* 字体 */
    font-size: 16px;
}

.postfloor-maintext {
    margin: 10px 10px 10px 100px;
}

.folded-comments-title {
    margin-left: 20px;
}
</style>