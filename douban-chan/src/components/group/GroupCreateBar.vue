<!-- 创建小组的框 -->
<!-- 页面右下方 固定的小组创建入口 -->
<template>
    <div>
        <!-- 右下角固定的小组创建窗 -->
        <div class="postbar-container">
            <img :src="userImgUrl" class="postbar-user-image" />
            <button class="postbar-button" @click="handleStartPost">创建小组</button>
        </div>
        <!-- 从下向上的小组创建栏 -->
        <el-drawer :before-close="handleClose" :visible.sync="dialog" direction="btt" custom-class="demo-drawer" size="75%"
            ref="drawer">
            <!-- 容器 -->
            <div class="form-container">
                <div class="form-title">创建小组</div>
                <div class="form-main">
                    <!-- 表单区 -->
                    <el-form :model="form">
                        <!-- 名称输入框 -->
                        <el-form-item label="小组名称" :label-width="formLabelWidth">
                            <el-input type="text" maxlength="50" show-word-limit v-model="form.name" autocomplete="off"
                                placeholder="请输入小组名称">
                            </el-input>
                        </el-form-item>

                        <!-- 标签选择框 -->
                        <el-form-item label="选择标签" :label-width="formLabelWidth">
                            <el-select v-model="form.tag" placeholder="请选择标签" style="width: 100%;">
                                <el-option v-for="tag in tagList" :key="tag.value" :label="tag.value" :value="tag.value">
                                </el-option>
                            </el-select>
                            <!-- <el-autocomplete v-model="form.tag" :fetch-suggestions="querySearchAsync" placeholder="请选择标签"
                                @select="handleSelect" style="width: 100%;"></el-autocomplete> -->
                        </el-form-item>

                        <!-- 小组简介输入框 -->
                        <el-form-item label="小组简介" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="form.intro" :autosize="{ minRows: 8, maxRows: 8 }"
                                :rows="20" placeholder="请输入小组简介">
                            </el-input>
                        </el-form-item>

                        <!-- 缩略图 上传图片 -->
                        <!-- action 是要上传的地址 -->
                        <!-- 这里需要根据后端修改! -->
                        <!-- 这里需要根据后端修改! -->
                        <!-- 这里需要根据后端修改! -->
                        <!-- 上传图片 -->
                        <!-- 上传小组封面 -->
                        <el-form-item label="上传小组封面头像" :label-width="formLabelWidth">
                            <PictureChooser :imgIdList="form.avatarImgIdList" :maxImgNumber="1" :fileList="avatarFileList">
                            </PictureChooser>
                        </el-form-item>

                        <!-- 上传小组头图 -->
                        <el-form-item label="上传小组背景头图" :label-width="formLabelWidth">
                            <PictureChooser :imgIdList="form.headImgIdList" :maxImgNumber="1" :fileList="headFileList">
                            </PictureChooser>
                        </el-form-item>
                    </el-form>



                    <!-- 结束区 -->
                    <div class="form-footer">
                        <el-button class="footer-button" type="info" plain @click="cancelForm">取 消</el-button>
                        <el-button class="footer-button" type="danger" @click="$refs.drawer.closeDrawer()"
                            :loading="loading">
                            {{ loading ? '提交中...' : '创 建！' }}
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
import PictureChooser from '../post/PictureChooser.vue'
import qs from "qs";
export default {
    name: 'GroupCreateBar',
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
                name: '',
                tag: '',
                avatarImgIdList: [],
                headImgIdList: [],
                intro: '',
            },
            avatarFileList: [],
            headFileList: [],
            formLabelWidth: '140px',
            timer: null,

            // 话题选择框的数据
            tagList: [
                { value: "生活" },
                { value: "文化" },
                { value: "影视" },
                { value: "图书" },
                { value: "学习" },
                { value: "美食" },
                { value: "摄影" },
                { value: "时尚" },
                { value: "游戏" },
                { value: "二刺猿" },
                { value: "无" }
            ],
            timeout: null,
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    methods: {
        //小组相关  
        ...mapActions('groupAbout', ['createGroupOnline', 'joinGroupOnline', 'applyAdminOnline']),
        // 点击我要发帖按钮
        handleStartPost() {
            this.dialog = true
        },
        // 关闭上拉栏
        handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要创建小组吗？')
                .then(_ => {
                    if(!this.form.name){
                        this.$message.error("小组名称不能为空。")
                        return;
                    }
                    if(!this.form.tag){
                        this.$message.error("请选择小组所属的标签。如果您不想让小组参与标签分类，请选择“无”。")
                        return;
                    }
                    if(!this.form.avatarImgIdList[0]){
                        this.$message.error("请上传小组的封面头像。")
                        return;
                    }
                    if(!this.form.headImgIdList[0]){
                        this.$message.error("请上传小组的主页头图。")
                        return;
                    }

                    this.createGroup();
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
        async createGroup() {

            //构造对象
            let newGroup = {
                userId: this.userId,
                groupName: this.form.name,
                groupIntro: this.form.intro,
                tag: this.form.tag,
                avatar: this.form.avatarImgIdList[0],
                head: this.form.headImgIdList[0],
            };
            try {
                await this.createGroupOnline(newGroup)
                this.$message.success('成功创建小组: ' + this.form.name)
            } catch (err) {
                this.$message.error('网络错误')
            }

            // // 通过事件总线触发自定义事件，并传递新小组作为参数
            // this.$bus.$emit('groupCreated', newGroup);
            // 清空内容
            this.avatarFileList = []
            this.headFileList = []
            this.form.name = ''
            this.form.tag = ''
            this.form.avatarImgIdList = []
            this.form.headImgIdList = []
            this.form.intro = ''
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