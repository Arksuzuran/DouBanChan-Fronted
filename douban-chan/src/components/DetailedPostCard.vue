<template>
    <el-container>
        <el-header class="header">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="lz-info">
                        <el-avatar :size="50" :src="info.lzImageUrl" class="lz-img"></el-avatar>
                        <div class="lz-name">{{ info.lzName }}</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="post-title">{{ info.title }}</div>
                </el-col>
                <el-col :span="6">
                    <div class="button-group">
                        <el-button type="primary" icon="el-icon-share"></el-button>
                        <el-button type="danger" icon="el-icon-delete"></el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div>
                        <img :src="info.postImageUrl" class="post-image" />
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="post-content">  {{ info.content }}</div>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="post-from">发表于{{ info.from }} | {{ info.date }}</div>
                </el-col>
                <el-col :span="12">
                    <div class="post-data">
                        <el-button type="primary" plain>同接 {{ info.visits }}</el-button>
                        <el-button type="success" plain>赞 {{ info.liked }}</el-button>
                        <el-button type="info" plain>踩 {{ info.unliked }}</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
export default {

    props: ['info'],
}
</script>

<style scoped>
.el-container {
    margin: 20px;
    box-shadow: 0px 0px 3px #888888;
}

.el-header,
.el-footer {
    background-color: #effaff;
    color: #333;
    text-align: center;
    line-height: 60px;
    max-height: 60px;
}

.el-footer {
    line-height: 40px;
    max-height: 40px;
}

.el-main {
    background-color: #fbfdff;
    color: #333;
    text-align: center;
    line-height: 30px;
    height: 200px;
}

.header {
    border-radius: 4px;
}

.lz-info {
    display: flex;
    justify-content: flex-start;
}

.lz-img {
    margin-top: 5px;
}

.lz-name {
    margin-left: 15px;
    font-size: 20px;
    font-weight: bold;
}

.button-group {
    margin: 4%;
    display: flex;
    justify-content: flex-end;
}

.post-title {
    font-size: 24px;
    font-weight: bold;
}

.post-image {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.post-content {
    font-size: 17px;
    text-align: left;
    font-family: "微软雅黑";
}

.post-from {
    font-size: 14px;
    text-align: left;
}

.post-data {
    display: flex;
    justify-content: flex-end;
}</style>