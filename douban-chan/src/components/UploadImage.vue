<template>
    <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleChange">
        <img v-if="imageUrl" :src="imageUrl" class="avatar-upload">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: ''
        };
    },
    methods: {
        handleChange(file) {
            const reader = new FileReader();
            reader.onload = e => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file.raw);
        }
    }
}
</script>

<style scoped>
.avatar-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 120px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar-upload {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
