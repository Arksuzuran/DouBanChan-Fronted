<!-- 帖子页面内 回复帖子的框 以及上拉窗 -->
<template>
    <div class="replybox-container">
        <!-- 右下角固定的发帖窗 -->
        <div class="postbar-container">
            <img :src="userImgUrl" class="postbar-user-image" />
            <button class="postbar-button" @click="handleStartPost">我来说两句</button>
        </div>
        <!-- 从下向上的发帖栏 -->
        <el-drawer :before-close="handleClose" :visible.sync="dialog" direction="btt" custom-class="demo-drawer" size="75%"
            ref="drawer" :append-to-body="true">
            <!-- 发帖栏容器 -->
            <div class="form-container">
                <div class="form-title">发表回帖</div>
                <div class="form-main">
                    <!-- 表单区 -->
                    <!-- 正文输入框 -->
                    <textarea type="textarea" v-model="form.text" rows="10" :placeholder="inputPlaceHolderText"></textarea>

                    <!-- 缩略图 上传图片 -->
                    <!-- action 是要上传的地址 -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- 这里需要根据后端修改! -->
                    <PictureChooser :imgUrlList="form.imgUrlList" :fileList="fileList"></PictureChooser>
                    <!-- <template>
                        <el-upload :action="backendImgUrl" list-type="picture-card" :auto-upload="false"
                            :on-change="handleUpload" :on-success="handleUpload" :file-list="fileList" :limit="9"
                            :http-request="handleUploadOnline">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{ file }">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleDownload(file)">
                                        <i class="el-icon-download"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                    </template>

                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog> -->

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
// 在需要使用vuex的场合下引入vuex
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { nanoid } from 'nanoid'

import PictureChooser from './PictureChooser.vue'

export default {
    name: 'PostReplyBar',
    props: ['postInfo'],
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
                imgUrlList: [],
                text: '',
            },
            timer: null,

            fileList: [],
            // // 向后端传入图片的url
            // backendImgUrl: "#",
            // //文件的list
            // // 查看文件缩略图的弹窗
            // dialogImageUrl: '',
            // dialogVisible: false,
            // disabled: false
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),

        //回帖栏默认内容
        inputPlaceHolderText() {
            return '回复帖子：' + this.postInfo.title
        }
    },
    methods: {
        //帖子 文本相关
        ...mapActions('postAbout', ['createGroupPostOnline', 'createTopicPostOnline', 'replyPostOnline', 'likePostOnline', 'dislikePostOnline', 'favPostOnline', 'topPostOnline', 'goodPostOnline', 'replyTextOnline', 'likeTextOnline', 'dislikeTextOnline', 'reportTextOnline', 'deleteTextOnline']),
        // 点击我来说两句按钮
        handleStartPost() {
            this.dialog = true
        },
        // 关闭上拉栏
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要发表回帖吗？')
                .then(_ => {
                    if(!this.form.text){
                        this.$message.error("回帖内容不能为空")
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
        // 创建回帖
        createPost() {
            //构造对象
            let newReply = {
                textId: nanoid(),
                floor: this.postInfo.comments,
                userId: this.userId,
                userName: this.userName,
                userImageUrl: this.userImgUrl,
                date: this.getTimeNow(),
                text: this.form.text,
                imageUrlList: this.form.imgUrlList,
                comments: 0,
                like: 0,
                dislike: 0,
                userLike: false,
                userDislike: false,
                childFloorList: [],
            };
            this.replyPostOnline({
                postId: this.postInfo.postId,
                newReply,
            })
            this.$message.success("成功发表回帖")

            // 通过事件总线触发自定义事件，并传递新回复作为参数
            // this.$bus.$emit('postReplyCreated', newReply);
            
            // 清空内容
            this.fileList = []
            this.form.imgUrlList = []
            this.form.text = ''
        },
        // 获取当前时间
        getTimeNow() {
            var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
        },
        // 上传成功 这里需要修改
        // 实现假上传
        handleUpload(file) {
            // 从上传成功的响应中获取图片URL
            console.log('状态改变,file: ', file)
            console.log('状态改变,file.raw: ', file.raw)
            //假上传
            let imageUrl = file.url;
            // 将图片URL添加到列表中
            this.form.imgUrlList.push(imageUrl);
        },
        // 自定义上传 目前应该用不上了
        handleUploadOnline(file) {
            // 从上传成功的响应中获取图片URL
            console.log('自定义上传函数,file: ', file)
            console.log('自定义上传函数,file.file: ', file.file)
            console.log('自定义上传函数,fileList ', this.fileList)
            // // 手动更新fileList
            this.fileList.push({
                name: file.name,
                url: '',
                status: 'success',
                uid: file.uid
            });

            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file.file); // 将文件对象添加到FormData中，key可以根据后端接口的要求进行修改

                // 填入具体的url
                axios.post('/upload', formData, {
                    headers: {
                        //文件类型
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        // 根据上传接口返回的结果处理上传成功或失败的情况
                        const { data } = response;
                        if (data.success) {
                            resolve({ success: true, message: '上传成功', imageUrl: data.imageUrl });
                        } else {
                            reject({ success: false, message: '上传失败' });
                        }
                    })
                    .catch(error => {
                        reject({ success: false, message: '上传出错' });
                    });
            });
        },
        // 移除已选的图片
        handleRemove(file) {
            console.log(file);
            // fileList.remove(file)
            // const fileList = this.$refs.upload.uploadFiles; // 获取上传组件的文件列表
            // 找到对应的文件索引
            let index = this.fileList.findIndex(f => f.uid === file.uid);
            if (index !== -1) {
                this.fileList.splice(index, 1); // 从文件列表中移除该文件
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        }
    },
    mounted() {

    },
}
</script>

<style scoped>
.replybox-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-upload-list__item-thumbnail {
    object-fit: cover;
}

.postbar-container {
    width: 130px;
    border-radius: 5px;
    background-color: rgb(255, 217, 217);
    border: 3px solid rgba(254, 232, 232, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-around;
}

.form-container {
    margin: 0 auto;
    width: 65%;
    /* background-color: rgb(255, 212, 212); */
}

.form-title {
    margin: 40px;
    font-size: 28px;
    font-weight: 800;
    color: rgb(255, 111, 111);
    background-color: rgb(255, 250, 250);

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
}

.form-main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;
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
    width: 90px;
    height: 40px;
    border-radius: 10px;
    color: rgb(106, 106, 106);
    background-color: rgb(255, 179, 179);
    margin-bottom: 10px;
    /* 边框 */
    border: 2px solid rgba(255, 238, 238, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    font-size: 14px;
}

.postbar-button:hover {
    background-color: rgb(255, 56, 56);
    color: rgb(255, 255, 255);
    cursor: pointer;
}

textarea {
    padding: 15px;
    width: 75%;
    border: 2px solid #ffeaea;
    resize: vertical;
    background-color: rgba(255, 252, 252, 0.7);
    border-radius: 5px;
    margin: 20px;
    /* 字体 */
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 15px;
    color: #2c3e50;
}

textarea:focus {
    border-color: pink;
    outline: rgb(255, 131, 152);
    z-index: 100;
}
</style>