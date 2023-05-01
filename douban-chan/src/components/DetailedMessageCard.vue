<template>
    <el-container>
        <el-header class="header">
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="lz-info">
                        <el-avatar :size="45" :src="info.imageUrl" class="lz-img"></el-avatar>
                        <span class="lz-name">{{ info.name }}</span>
                        <span class="time"> | 来自{{ info.from }} | {{ info.date }}</span>
                    </div>
                </el-col>
                <el-col :span="8">
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="post-title">
                        <span class="post-title-1">{{ msgTitle1() }} </span>
                        <span class="post-title-2">{{ msgTitle2() }} </span>
                    </div>
                    <div class="post-content"> {{ msgContent() }} </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <img :src="info.postImageUrl" class="post-image" />
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <!-- <el-footer>
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
        </el-footer> -->
    </el-container>
</template>

<script>
export default {
    props: ['info', 'type'],
    methods: {
        cutStrByLength(str, length) {
            if (str.length > length) {
                return str.slice(0, length - 3) + "...";
            } else {
                return str;
            }
        },
        msgTitle1() {
            if (this.type === 1) {
                return '点赞了我的' + this.info.type + ':'
            }
            else if (this.type === 2) {
                return '评论了我的' + this.info.type + ':'
            }
            else if (this.type === 3) {
                return '删除了我的' + this.info.type + ':'
            }
        },
        msgTitle2() {
            return this.cutStrByLength(this.info.title, 25)
        },
        msgContent() {
            let str = ''
            if (this.type === 2) {
                str = this.info.content
            }
            else if (this.type === 3) {
                str = this.info.content
            }
            return this.cutStrByLength(str, 60)
        }
    },
}
</script>

<style scoped>
.el-container {
    margin: 20px;
    box-shadow: 0px 0px 3px #888888;
    border-radius: 4px;
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
    height: 100px;
    padding: 10px 10px 5px 10px;
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

.time {
    margin-left: 10px;
    font-size: 14px;
}

.button-group {
    margin: 4%;
    display: flex;
    justify-content: flex-end;
}

.post-image {
    border-radius: 5px;
    width: 90%;
    height: 65px;
    object-fit: cover;
}
.post-content {
    font-family: "Microsoft YaHei", sans-serif;
    font-size: 15px;
    text-align: left;
    margin-left: 15px;
    color: #4f4f4f;
}

.post-title {
    margin: 4px 0 4px 4px;
    text-align: left;
}
.post-title-1 {
    font-family: "微软雅黑", sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin: 4px 0 4px 4px;
}
.post-title-2 {
    font-family: "微软雅黑", sans-serif;
    font-size: 16px;
    font-weight: bold;
    margin: 4px 0 4px 4px;
}

.post-from {
    font-size: 14px;
    text-align: left;
}

.post-data {
    display: flex;
    justify-content: flex-end;
}
</style>