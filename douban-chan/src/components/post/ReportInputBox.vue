<!-- 举报上拉栏 -->
<!-- 该组件需要依存于一个用来触发的按钮 透过传入的值来决定是否显示 -->
<template>
    <div>
        <!-- 从下向上的发帖栏 -->
        <el-drawer :before-close="handleClose" :visible.sync="visable" direction="btt" custom-class="demo-drawer" size="75%"
            ref="drawer" :append-to-body="true" :modal-append-to-body="false">
            <!-- 发帖栏容器 -->
            <div class="form-container">
                <div class="form-title">发起举报</div>

                <div class="form-main">
                    <!-- 表单区 -->
                    <!-- 正文输入框 -->
                    <el-form :model="form">
                        <!-- 标题输入框 -->
                        <el-form-item label="举报标题" :label-width="formLabelWidth">
                            <el-input type="text" maxlength="50" show-word-limit v-model="form.title" autocomplete="off"
                                placeholder="请输入标题">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="举报内容" :label-width="formLabelWidth">
                            <textarea type="textarea" v-model="form.text" rows="10" placeholder="请告诉我们发生了什么"></textarea>
                        </el-form-item>
                    </el-form>


                    <!-- 缩略图 上传图片 -->
                    <!-- action 是要上传的地址 -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- <div class="img-chooser-box">
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
                    </div> -->
                    <!-- <PictureChooser :imgIdList="form.imgIdList" :fileList="fileList"></PictureChooser> -->

                    <!-- <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog> -->

                    <!-- 结束区 -->
                    <div class="form-footer">
                        <el-button class="footer-button" type="info" plain @click="cancelForm">取 消</el-button>
                        <el-button class="footer-button" type="danger" @click="$refs.drawer.closeDrawer()"
                            :loading="loading">
                            {{ loading ? '提交中...' : '提 交' }}
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
export default {
    name: 'ReportInputBox',
    props: ['signal', 'textId', 'fromPost'],
    components: {
        PictureChooser,
    },
    data() {
        return {
            // 前一次传入的信号 控制是否打开发帖表单
            osignal: false,

            // 向后端传入图片的url
            backendImgUrl: "#",
            //文件的list
            fileList: [],
            // 查看文件缩略图的弹窗
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,

            formLabelWidth: '80px',
            // 控制是否正在提交数据
            loading: false,
            // 表单收集的数据
            form: {
                imgIdList: [],
                title: '',
                text: '',
            },
            timer: null,
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),

        visable: {
            get() {
                return this.osignal != this.signal
            },
            set(value) {
                this.osignal = !this.osignal
            }
        }

    },
    methods: {
        //帖子 文本相关
        ...mapActions('postAbout', ['createPostOnline', 'createPostOnline', 'replyPostOnline', 'likePostOnline', 'dislikePostOnline', 'favPostOnline', 'topPostOnline', 'goodPostOnline', 'replyTextOnline', 'likeTextOnline', 'dislikeTextOnline', 'reportTextOnline', 'reportPostOnline', 'deleteTextOnline']),
        // 关闭上拉栏
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要进行举报吗？')
                .then(_ => {
                    if (!this.form.title) {
                        this.$message.error("举报标题不能为空。")
                        return;
                    }
                    if (!this.form.text || this.form.text.length < 15) {
                        this.$message.error("举报内容不能少于15个字。")
                        return;
                    }

                    //发送请求
                    this.createReport();

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

            // 设置二者一致 即关闭
            this.osignal = this.signal
            clearTimeout(this.timer);
        },
        // 创建举报
        async createReport() {
            // 在此发送请求
            let report = {
                textId: this.textId,
                userId: this.userId,
                title: this.form.title,
                text: this.form.text,
            }
            try {
                if(this.fromPost){
                    await this.reportPostOnline(report)
                }
                else{
                    await this.reportTextOnline(report)
                }
            } catch (err) {
                this.$message.error('网络错误，举报提交失败。')
            }
            // this.$message.success("举报提交成功，您的管理员将会收到举报信息。")
            // console.log('用户发送举报请求', report)

            // 清空内容
            this.fileList = []
            this.form.imgIdList = []
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
            this.form.imgIdList.push(imageUrl);
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
.el-upload-list__item-thumbnail {
    object-fit: cover;
}

.postbar-container {
    width: 130px;
    border-radius: 5px;
    background-color: rgb(255, 217, 217);
    border: 3px solid rgba(254, 232, 232, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

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
    color: rgb(255, 55, 55);
    background-color: rgb(255, 207, 207);

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
}

.form-footer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-button {
    margin: 40px;
}

.form-main {
    margin: 0 auto;
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap; */
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

/* .img-chooser-box{
    display: flex; 
    justify-content: center; 
    align-items: center;
} */

textarea {
    padding: 15px;
    width: 85%;
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