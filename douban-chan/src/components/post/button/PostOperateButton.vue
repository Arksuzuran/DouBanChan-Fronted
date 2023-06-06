3<!-- 删除按钮及弹窗 -->
<template>
    <div class="report-button-container" ref="dropdown">
        <button class="postcard-button-report" @mouseenter="mouseenterReportButton" @mouseleave="mouseleaveReportButton"
            @click="handleClick">
            <span ref="reportButtonText">操作</span>
        </button>
        <div class="drop-menu" v-if="show">
            <div @click="handleDelete" class="drop-item">
                <i class="fa-sharp fa-solid fa-trash" style="font-size: 16px; margin-right:20px;"></i>
                删除
            </div>
            <div @click="handleTop" class="drop-item" v-if="info.userIsAdmin && !info.isTopped">
                <i class="fa-sharp fa-solid fa-thumbtack" style="font-size: 16px; margin-right:22px;"></i>
                置顶
            </div>
            <div @click="handleNotTop" class="drop-item" v-if="info.userIsAdmin && info.isTopped">
                <i class="fa-sharp fa-solid fa-thumbtack" style="font-size: 16px; margin-right:8px"></i>
                取消置顶
            </div>
            <div @click="handleGood" class="drop-item" v-if="info.userIsAdmin && !info.isGood">
                <i class="el-icon-medal" style="font-size: 16px; margin-right:20px;"></i>
                加精
            </div>
            <div @click="handleNotGood" class="drop-item" v-if="info.userIsAdmin && info.isGood">
                <i class="el-icon-medal" style="font-size: 16px; margin-right:2px;"></i>
                取消加精
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'PostOperateButton',
    // 举报信息
    // info:{ textId, userId, userName, userImageUrl, title, text, }
    props: ['info', 'admin', 'topped', 'good'],
    data() {
        return {
            show: false,
        }
    },
    components: {

    },
    methods: {
        //帖子 文本相关
...mapActions('postAbout', ['createGroupPostOnline', 'createTopicPostOnline','replyPostOnline', 'likePostOnline', 'dislikePostOnline', 'favPostOnline','topPostOnline', 'goodPostOnline', 'replyTextOnline', 'likeTextOnline', 'dislikeTextOnline','reportTextOnline', 'deleteTextOnline']),
        handleClick() {
            this.show = !this.show
        },
        closeDropdown(event) {
            if (this.show && !this.$refs.dropdown.contains(event.target)) {
                this.show = false;
            }
        },
        // 删除帖子
        handleDelete() {
            this.$confirm('删除后将无法恢复，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning',
            }).then(() => {
                this.deleteTextOnline(this.info.postId)

                this.$message.success('删除请求已提交!');
            }).catch(() => {
                this.$message.error('已取消操作');
            });
        },
        // 置顶
        handleTop(){
            this.$confirm('是否将该帖子在小组内置顶显示?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning',
            }).then(() => {
                this.topPostOnline({
                    postId: this.info.postId,
                    top: true
                })

                this.$message.success('置顶请求已提交!');
            }).catch(() => {
                this.$message.error('已取消操作');
            });
        },
        // 
        handleGood(){
            this.$confirm('是否将该帖子在小组内设置为精华?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning',
            }).then(() => {
                this.goodPostOnline({
                    postId: this.info.postId,
                    good: true
                })

                this.$message.success('设置精华请求已提交!');
            }).catch(() => {
                this.$message.error('已取消操作');
            });
        },
        // 
        handleNotTop(){
            this.$confirm('是否取消在小组内的置顶显示?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning',
            }).then(() => {
                this.topPostOnline({
                    postId: this.info.postId,
                    top: false
                })

                this.$message.success('取消置顶请求已提交!');
            }).catch(() => {
                this.$message.error('已取消操作');
            });
        },
        // 
        handleNotGood(){
            this.$confirm('是否取消精华帖?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning',
            }).then(() => {
                this.goodPostOnline({
                    postId: this.info.postId,
                    good: false
                })

                this.$message.success('取消精华帖请求已提交!');
            }).catch(() => {
                this.$message.error('已取消操作');
            });
        },
        mouseenterReportButton() {
            this.$refs.reportButtonText.textContent = "展开菜单"
            this.$refs.reportButtonText.classList.add('slide-in')
        },
        mouseleaveReportButton() {
            this.$refs.reportButtonText.textContent = "操作"
            this.$refs.reportButtonText.classList.remove('slide-in')
        },
    },
    mounted() {
        document.addEventListener('click', this.closeDropdown);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
    },
}
</script>

<style scoped>
.report-button-container {
    position: relative;
    display: inline-block;
}

.drop-menu {
    background-color: rgb(254, 233, 233);
    /* display: none; */
    position: absolute;
    bottom: -1;
    left: 10px;
    width: 100px;
    z-index: 1;

    animation: slide-down 0.5s ease;
    border-radius: 8px;
    border: 1px 1px 0 1px solid rgba(255, 255, 255);
}

.drop-item {
    margin: 2px;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    height: 36px;
    font-size: 16px;
    border: 1px 1px 0 1px solid rgb(255, 255, 255);
    background-color: rgb(255, 225, 225);

    text-align: start;
    transition: .5s ease;

    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.drop-item:hover {
    background-color: rgb(255, 46, 46);
    color: white;
}

/* 举报按钮 */
.postcard-button-report {
    /* 尺寸 */
    width: 100px;
    height: 36px;
    margin: 10px;
    /* 背景 边界 阴影 */
    background-color: rgba(246, 152, 152, 0.6);
    border: 2px solid rgba(253, 187, 187, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    /* 字体 */
    font-size: 16px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.postcard-button-report:hover {
    background-color: rgba(255, 126, 126, 1);
}

/* 鼠标移入的动画效果 */
.slide-in {
    animation: slideInAnimation 0.5s forwards;
}

@keyframes slideInAnimation {
    from {
        /* transform: translateX(-100%); */
        opacity: 0.5;
    }

    to {
        /* transform: translateX(0); */
        opacity: 1;
    }
}

@keyframes slide-down {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>