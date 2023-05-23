<!-- 图片选择器 用于上传图片 -->
<template>
    <el-upload :action="backendImgUrl" list-type="picture-card" :auto-upload="false" :on-change="handleUpload"
        :on-success="handleUpload" :file-list="fileList" :limit="9" :http-request="handleUploadOnline">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                    <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                </span>
            </span>
        </div>
    </el-upload>
</template>

<script>
export default {
    name:'PictureChooser',
    // 将数据传入imgUrlList
    props:['imgUrlList', 'fileList'],
    data() {
        return {
            // 向后端传入图片的url
            backendImgUrl: "#",
            // //文件的list
            // fileList: [],
            // 查看文件缩略图的弹窗
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    methods: {
        // 上传成功 这里需要修改
        // 实现假上传
        handleUpload(file) {
            // 从上传成功的响应中获取图片URL
            console.log('状态改变,file: ', file)
            console.log('状态改变,file.raw: ', file.raw)
            //假上传
            let imageUrl = file.url;
            // 将图片URL添加到列表中
            this.imgUrlList.push(imageUrl);
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
    },
}
</script>

<style scoped>
.el-upload-list__item-thumbnail {
    object-fit: cover;
}
</style>