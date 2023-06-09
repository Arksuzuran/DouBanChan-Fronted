<!-- 页面右下方 固定的发帖入口 -->
<template>
    <div>
        <!-- 右下角固定的发帖窗 -->
        <div class="postbar-container">
            <img :src="userImgUrl" class="postbar-user-image" />
            <button class="postbar-button" @click="handleStartPost">我要发帖</button>
        </div>
        <!-- 从下向上的发帖栏 -->
        <el-drawer :before-close="handleClose" :visible.sync="dialog" direction="btt" custom-class="demo-drawer" size="75%"
            ref="drawer">
            <!-- 发帖栏容器 -->
            <div class="form-container">
                <div class="form-title">发表帖子</div>
                <div class="form-main">
                    <!-- 表单区 -->
                    <el-form :model="form">
                        <!-- 标题输入框 -->
                        <el-form-item label="帖子标题" :label-width="formLabelWidth">
                            <el-input type="text" maxlength="50" show-word-limit v-model="form.title" autocomplete="off"
                                placeholder="请输入帖子标题">
                            </el-input>
                        </el-form-item>

                        <!-- 话题选择框 -->
                        <el-form-item label="选择话题" :label-width="formLabelWidth">
                            <el-select v-model="form.topicId" filterable :placeholder="topicPlaceHolder" style="width: 100%;"
                                :disabled="topicLocked">
                                <el-option v-for="item in topicList" :key="item.topicId" :label="item.topicName"
                                    :value="item.topicId">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <!-- <el-form-item label="选择话题" :label-width="formLabelWidth">
                            <el-autocomplete v-model="form.topic" :fetch-suggestions="querySearchAsync"
                                :placeholder="topicPlaceHolder" @select="handleSelect" style="width: 100%;"
                                :disabled="topicLocked"></el-autocomplete>
                        </el-form-item> -->

                        <!-- 正文输入框 -->
                        <el-form-item label="帖子正文" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="form.text" :autosize="{ minRows: 10, maxRows: 10 }"
                                :rows="20" placeholder="请输入不少于25字符的正文" show-word-limit>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="上传帖子图片" :label-width="formLabelWidth + 80">
                            <PictureChooser :imgIdList="form.imgIdList" :fileList="fileList"></PictureChooser>
                        </el-form-item>
                    </el-form>

                    <!-- 结束区 -->
                    <div class="form-footer">
                        <el-button class="footer-button" type="info" plain @click="cancelForm">取 消</el-button>
                        <el-button class="footer-button" type="danger" @click="$refs.drawer.closeDrawer()"
                            :loading="loading">
                            {{ loading ? '提交中...' : '发 表' }}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-drawer>

    </div>
</template>

<script>
import PictureChooser from './PictureChooser.vue'
// 在需要使用vuex的场合下引入vuex
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { nanoid } from 'nanoid'
import qs from 'qs'

export default {
    props: ['groupInfo', 'topicInfo'],
    name: 'PostCreateBar',
    components: {
        PictureChooser,
    },
    data() {
        return {

            // 控制是否打开发帖表单
            dialog: false,
            // 控制是否正在提交数据
            loading: false,
            // 表单收集的数据
            form: {
                title: '',
                topicId: '',
                imgIdList: [],
                text: '',
            },
            formLabelWidth: '80px',

            // 话题选择框的数据
            topicList: [],

            // 图片的list
            fileList: [],
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        topicLocked() {
            return this.topicInfo ? true : false
        },
        topicPlaceHolder() {
            return this.topicInfo ? this.topicInfo.topicName : '请选择话题'
        },
        groupId1() {
            return this.groupInfo ? this.groupInfo.groupId : ''
        },
        groupName1() {
            return this.groupInfo ? this.groupInfo.groupName : ''
        },
    },
    methods: {
        //帖子 文本相关
        ...mapActions('postAbout', ['createPostOnline', 'replyPostOnline', 'likePostOnline', 'dislikePostOnline', 'favPostOnline', 'topPostOnline', 'goodPostOnline', 'replyTextOnline', 'likeTextOnline', 'dislikeTextOnline', 'reportTextOnline', 'deleteTextOnline']),
        // 点击我要发帖按钮
        handleStartPost() {
            this.dialog = true
        },
        // 关闭上拉栏
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要创建帖子吗？')
                .then(_ => {
                    if (!this.form.title) {
                        this.$message.error("帖子标题不能为空。")
                        return;
                    }
                    if (!this.form.topicId) {
                        this.$message.error("请为帖子选择一个话题。")
                        return;
                    }
                    if (!this.form.text || this.form.text.length < 25) {
                        this.$message.error("帖子正文内容不能少于25个字符。")
                        return;
                    }

                    this.createPost();
                    this.loading = true;
                    this.timer = setTimeout(() => {
                        done();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                            this.loading = false;
                        }, 400);
                    }, 200);
                })
                .catch(_ => { });
        },
        //取消发送
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
        },
        // 创建帖子
        async createPost() {
            //构造对象
            let newPost = {
                userId: this.userId,
                topicId: this.form.topicId, //帖子所属的话题的id
                groupId: this.groupId1,
                title: this.form.title,
                text: this.form.text,
                postImageUrlList: this.form.imgIdList,
            };
            console.log(newPost)
            // 发表帖子
            try {
                await this.createPostOnline(newPost);
            } catch (err) {
                this.$message.error('网络错误, 发帖失败')
            }

            // 通过事件总线触发自定义事件，并传递新帖子作为参数
            // this.$bus.$emit('postCreated', newPost);
            // 清空内容
            this.fileList = []
            this.form.title = ''
            this.form.topicId = ''
            this.form.imgIdList = []
            this.form.text = ''
        },

        //加载全部话题
        async getData() {
            // 加载当前小组可以参与的话题
            this.$axios({
                method: "post",
                data: qs.stringify({
                    g_id: this.groupInfo.groupId
                }),
                url: "/chat/query_free_chat/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log('加载当前小组可参与的话题成功',res)
                    this.topicList = res.data.chatList
                })
                .catch((err) => {
                    this.$message.error("网络出错");
                });
            // this.topicList = list
        },
    },
    mounted() {
        console.log('发帖框已打开，传入话题相关信息：',this.topicInfo)
        if (this.topicInfo) {
            this.form.topicId = this.topicInfo.topicId
        }
        else if (this.groupInfo) {
            this.getData();
            console.log(this.topicList)
        }
    },
}
</script>

<style scoped>
.el-upload-list__item-thumbnail {
    object-fit: cover;
}

.postbar-container {
    width: 120px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 5px;
    background-color: rgb(255, 217, 217);
    border: 3px solid rgba(254, 232, 232, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-around;
}

.drawer-container {
    background-color: rgb(255, 212, 212);
}

.form-container {
    margin: 0 auto;
    width: 65%;
    /* background-color: rgb(255, 212, 212); */
}

.form-title {
    margin: 0 40px 40px 40px;
    font-size: 28px;
    font-weight: 800;
    color: rgb(255, 111, 111);
    background-color: rgb(255, 250, 250);
}

.form-footer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-button {
    margin: 40px;
}

.postbar-user-image {
    width: 40px;
    height: 40px;
    border-radius: 18px;
    margin: 10px;
    /* 边框 */
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    z-index: 6;
}

.postbar-button {
    width: 80px;
    height: 40px;
    border-radius: 10px;
    color: rgb(106, 106, 106);
    background-color: rgb(255, 179, 179);
    margin-bottom: 10px;
    /* 边框 */
    border: 2px solid rgba(255, 238, 238, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    font-size: 14px;

    transition: .5s ease;
}

.postbar-button:hover {
    background-color: rgb(255, 56, 56);
    color: rgb(255, 255, 255);
    cursor: pointer;
}
</style>