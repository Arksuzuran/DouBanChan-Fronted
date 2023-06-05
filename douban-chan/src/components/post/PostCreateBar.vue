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
                            <el-autocomplete v-model="form.topic" :fetch-suggestions="querySearchAsync"
                                :placeholder="topicPlaceHolder" @select="handleSelect" style="width: 100%;"
                                :disabled="topicLocked"></el-autocomplete>
                        </el-form-item>

                        <!-- 正文输入框 -->
                        <el-form-item label="帖子正文" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="form.text" :autosize="{ minRows: 10, maxRows: 10 }"
                                :rows="20">
                            </el-input>
                        </el-form-item>

                        <el-form-item label="上传帖子图片" :label-width="formLabelWidth + 80">
                            <PictureChooser :imgUrlList="form.imgUrlList" :fileList="fileList"></PictureChooser>
                        </el-form-item>
                    </el-form>

                    <!-- 缩略图 上传图片 -->
                    <!-- action 是要上传的地址 -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- 这里需要根据后端修改! -->
                    <!-- 上传图片 -->
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
                    </template> -->
                    <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                        :auto-upload="false">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog> -->

                    <!-- <el-dialog :visible.sync="dialogVisible">
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
import PictureChooser from './PictureChooser.vue'
// 在需要使用vuex的场合下引入vuex
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { nanoid } from 'nanoid'

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
                topic: '',
                topicId: '',
                imgUrlList: [],
                text: '',
            },
            formLabelWidth: '80px',
            timer: null,

            // 话题选择框的数据
            topicList: [],
            timeout: null,


            // 图片的list
            fileList: [],
            // // 图片发送相关
            // // 向后端传入图片的url
            // backendImgUrl: "#",
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
        ...mapActions('postAbout', ['createGroupPostOnline', 'createTopicPostOnline', 'replyPostOnline', 'likePostOnline', 'dislikePostOnline', 'favPostOnline', 'topPostOnline', 'goodPostOnline', 'replyTextOnline', 'likeTextOnline', 'dislikeTextOnline', 'reportTextOnline', 'deleteTextOnline']),
        // 点击我要发帖按钮
        handleStartPost() {
            this.dialog = true
        },
        // 关闭上拉栏
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要提交表单吗？')
                .then(_ => {
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
        createPost() {
            //构造对象
            let newPost = {
                postId: nanoid(),
                lzId: this.userId,
                lzName: this.userName,
                lzImageUrl: this.userImgUrl,
                date: this.getTimeNow(),
                title: this.form.title,
                text: this.form.text,
                postImageUrlList: this.form.imgUrlList,
                topic: this.form.topicName,
                topicId: this.form.topicId, //帖子所属的话题的id
                visits: 1,
                fav: 0,
                comments: 0,
                like: 0,
                dislike: 0,
                isTopped: false,
                isGoodPost: false,
                userIsAdmin: false, //当前用户是否是帖子所属小组的管理员
                userIsLz: true, //当前用户是否是发帖人
                userLike: false,
                userDislike: false,
                userFav: false,
                //如果该小组不来自于一个小组 那么下面的字段均填 ''
                groupName: this.groupName1, //来自的小组的名称
                groupId: this.groupId1,
                floorList: [
                    {
                        textId: 'f001',
                        floor: 1,
                        userId: this.userId,
                        userName: this.userName,
                        userImageUrl: this.userImgUrl,
                        date: this.getTimeNow(),
                        text: this.form.text,
                        imageUrlList: this.form.text,
                        comments: 0,
                        like: 0,
                        dislike: 0,
                        userLike: false,
                        userDislike: false,
                        childFloorList: [],
                    }
                ]
            };
            if (this.topicInfo) {
                this.createTopicPostOnline(newPost)
            }
            else {
                this.createTopicPostOnline(newPost)
            }
            console.log('用户发帖',newPost)
            // 通过事件总线触发自定义事件，并传递新帖子作为参数
            // this.$bus.$emit('postCreated', newPost);
            // 清空内容
            this.fileList = []
            this.form.title = ''
            this.form.topic = ''
            this.form.imgUrlList = []
            this.form.text = ''
        },

        //加载全部话题
        loadAll() {
            return [
                { "value": "三全鲜食（北新泾店）", "topicId": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "topicId": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "topicId": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "topicId": "天山西路438号" },
                { "value": "胖仙女纸杯蛋糕（上海凌空店）", "topicId": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                { "value": "贡茶", "topicId": "上海市长宁区金钟路633号" },
                { "value": "豪大大香鸡排超级奶爸", "topicId": "上海市嘉定区曹安公路曹安路1685号" },
                { "value": "茶芝兰（奶茶，手抓饼）", "topicId": "上海市普陀区同普路1435号" },
                { "value": "十二泷町", "topicId": "上海市北翟路1444弄81号B幢-107" },
            ];
        },
        //从服务器按照输入的queryString搜索话题
        querySearchAsync(queryString, cb) {
            var topicList = this.topicList;
            var results = queryString ? topicList.filter(this.createStateFilter(queryString)) : topicList;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 100 * Math.random());
        },
        // 搜索算法 目前是只匹配开头字符串
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        // 选中某话题时
        handleSelect(item) {
            this.form.topicName = item.value
            this.form.topicId = item.topicId
            console.log(item.topicId);
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
        // // 上传成功 这里需要修改
        // // 实现假上传
        // handleUpload(file) {
        //     // 从上传成功的响应中获取图片URL
        //     console.log('状态改变,file: ', file)
        //     console.log('状态改变,file.raw: ', file.raw)
        //     //假上传
        //     let imageUrl = file.url;
        //     // 将图片URL添加到列表中
        //     this.form.imgUrlList.push(imageUrl);
        // },
        // handleUploadOnline(file) {
        //     // 从上传成功的响应中获取图片URL
        //     console.log('自定义上传函数,file: ', file)
        //     console.log('自定义上传函数,file.file: ', file.file)
        //     console.log('自定义上传函数,fileList ', this.fileList)
        //     // // 手动更新fileList
        //     this.fileList.push({
        //         name: file.name,
        //         url: '',
        //         status: 'success',
        //         uid: file.uid
        //     });

        //     return new Promise((resolve, reject) => {
        //         const formData = new FormData();
        //         formData.append('file', file.file); // 将文件对象添加到FormData中，key可以根据后端接口的要求进行修改

        //         // 填入具体的url
        //         axios.post('/upload', formData, {
        //             headers: {
        //                 //文件类型
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         })
        //             .then(response => {
        //                 // 根据上传接口返回的结果处理上传成功或失败的情况
        //                 const { data } = response;
        //                 if (data.success) {
        //                     resolve({ success: true, message: '上传成功', imageUrl: data.imageUrl });
        //                 } else {
        //                     reject({ success: false, message: '上传失败' });
        //                 }
        //             })
        //             .catch(error => {
        //                 reject({ success: false, message: '上传出错' });
        //             });
        //     });
        // },
        // handleRemove(file) {
        //     console.log(file);
        //     // fileList.remove(file)
        //     // const fileList = this.$refs.upload.uploadFiles; // 获取上传组件的文件列表
        //     // 找到对应的文件索引
        //     let index = this.fileList.findIndex(f => f.uid === file.uid);
        //     if (index !== -1) {
        //         this.fileList.splice(index, 1); // 从文件列表中移除该文件
        //     }
        // },
        // handlePictureCardPreview(file) {
        //     this.dialogImageUrl = file.url;
        //     this.dialogVisible = true;
        // },
        // handleDownload(file) {
        //     console.log(file);
        // }
    },
    mounted() {
        console.log(this.topicInfo)
        this.topicList = this.loadAll();

        if (this.topicInfo) {
            this.form.topicName = this.topicInfo.value
            this.form.topicId = this.topicInfo.topicId
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