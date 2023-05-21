<!-- 带图片的文本模板组件 -->
<template>
    <div class="postcard-text-container" :class="{ 'flex-layout': imglistLengthEqual1() }">
        <div :class="{ 'div-wrapper': imglistLengthEqual1() }">
            <!-- 标题 无标题时则不显示 -->
            <div class="postcard-text-title" @click="jumpToPostPage" v-if="info.title">{{ info.title }}</div>
            <!-- 正文 -->
            <div class="postcard-text-text" @click="jumpToPostPage">{{ info.text }}</div>
        </div>
        <!-- 图片墙 -->
        <div class="postcard-text-imgbox" :class="{ 'flex-box': imglistLengthEqual1() }">
            <img v-for="(src, index) in info.postImageUrlList" :key="index" :src="src" :class="imgClass()" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['info', 'from'],
    methods: {
        imglistLengthEqual1() {
            return this.info.postImageUrlList && this.info.postImageUrlList.length === 1
        },
        textClass() {
            return this.imglistLengthEqual1() ? 'div-wrapper-1' : 'div-wrapper-2'
        },
        boxClass() {
            return this.imglistLengthEqual1() ? 'postcard-text-imgbox-1' : 'postcard-text-imgbox-2'
        },
        imgClass() {
            if(!this.info.postImageUrlList){
                return 'postcard-text-img-1'
            }
            else if(this.info.postImageUrlList.length >= 3){
                return 'postcard-text-img-3'
            }
            else{
                return 'postcard-text-img-' + this.info.postImageUrlList.length
            }
        },
        // 跳转到帖子详情页
        jumpToPostPage() {
            console.log('被点击')
            //从小组而来
            if (this.from == 'g') {
                console.log('从帖子列表跳转到帖子详情页')
                this.$router.push({
                    name: 'groupPost',
                })
            }
            //from非空 仍然跳转
            else if(this.from){
                //从话题或其他页面而来
                console.log('从其他地方跳转到帖子详情页')
            }
        },
    },
}
</script>

<style scoped>
.flex-layout {
    flex-direction: row;
}

.postcard-text-container {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
}

.div-wrapper {
    display: flex;
    flex-direction: column;
    flex-basis: 65%;
}

/* 标题 */
.postcard-text-title {
    text-align: start;
    font-size: 26px;
    font-weight: 800;
    color: black;
    margin: 10px;
}

/* 正文 */
.postcard-text-text {
    text-align: start;
    font-size: 18px;
    font-weight: 400;
    color: rgb(50, 50, 50);
    line-height: 30px;
    margin: 10px;
}
.postcard-text-title:hover,
.postcard-text-text:hover{
    cursor: pointer;
}
/* 图片box的位置 */
.postcard-text-imgbox {
    margin: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
}

.flex-box {
    flex-basis: 33%;
}

.postcard-text-img-1 {
    max-width: 300px;
    max-height: 300px;
    object-fit: cover;
}

.postcard-text-img-2 {
    margin: 4%;
    max-width: 40%;
    /* max-height: 100%; */
    object-fit: cover;
}

.postcard-text-img-3 {
    margin: 1%;
    max-width: 31%;
    max-height: 300px;
    object-fit: cover;
}
</style>