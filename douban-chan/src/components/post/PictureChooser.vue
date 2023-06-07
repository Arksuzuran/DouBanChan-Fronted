<!-- 图片选择器 用于上传图片 -->
<template>
    <div>
        <el-upload :action="backendImgUrl" :headers="headers" :name="fieldName" list-type="picture-card" :auto-upload="true"
            :limit="maxImgNumber" :http-request="uploadFile" :file-list="fileList">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span> -->
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    name: 'PictureChooser',
    // 将数据传入imgIdList
    props: ['imgIdList', 'maxImgNumber', 'fileList'],
    data() {
        return {
            // 向后端传入图片的url
            backendImgUrl: this.$axios.defaults.baseURL + '/picture/upload/',
            headers: { "content-type": "application/x-www-form-urlencoded" },
            fieldName: 'p_content',
            // //文件的list
            // fileList: [],
            // 查看文件缩略图的弹窗
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
        }
    },
    methods: {
        // 移除已选的图片
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
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        uploadFile(val) {
            const formData = new FormData();
            formData.append("p_content", val.file);
            this.$axios({
                method: "post",
                data: formData,
                url: '/picture/upload/',
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    let picture_id = res.data.picture_id
                    console.log('用户成功上传图片：',picture_id)
                    this.imgIdList.push(picture_id)
                })
                .catch((err) => {
                    this.$message({
                        type: "error",
                        message: "网络出错QAQ",
                    });
                });
        },
    },
    mounted() {
        console.log(this.backendImgUrl)
    },
}
</script>

<style scoped>
.el-upload-list__item-thumbnail {
    object-fit: cover;
}
</style>