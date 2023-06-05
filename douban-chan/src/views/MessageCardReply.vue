<template>
    <div class="message-card-reply-block" style="cursor: pointer;">
        <div class="message-image">
            <img :src="message.imagePath" class="coverImage">
        </div>
        <div class="message-top">
            <div class="message-name">{{ message.name }}</div>
            <div class="message-reply">回复了我的评论</div>
        </div>
        <div class="message-reply-text">
            <span class="message-reply-true">{{ message.reply }}</span>
        </div>
        <div class="message-bottom">
            <div class="message-bottom-time">{{ message.time }}</div>
            <div class="message-bottom-reply"><i class="fa-regular fa-message reply-icon" style="color: #929292;"></i> 回复
            </div>
            <div class="message-bottom-good"><i class="fa-regular fa-thumbs-up good-icon" style="color: #929292;"></i> 点赞
            </div>
            <div class="message-bottom-delete" @click="deleteMessage()"><i class="fa-regular fa-trash-can delete-icon"
                    style="color: #929292;"></i>
                删除该通知
            </div>
        </div>
        <div class="message-my-comment-block">
            <span class="message-my-comment">{{ message.comment }}</span>
        </div>
    </div>
</template>

<script>
export default ({
    props: ['message'],
    methods: {
        deleteMessage() {
            this.$emit('delete', this.message.id);
        },
    }
})
</script>

<style scoped>
.message-card-reply-block {
    width: 1050px;
    height: 120px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
}

.message-image {
    width: 4.5em;
    height: 4.5em;
    background: white;
    border-radius: 4.5em;
    position: absolute;
    margin-left: 20px;
    margin-top: 10px;
}

.coverImage {
    position: relative;
    border-radius: 5em;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.message-top {
    position: absolute;
    margin-top: 10px;
    margin-left: 100px;
    text-align: left;
    display: flex;
    align-items: center;
    /* 可选：垂直居中对齐内部内容 */
    justify-content: flex-start;
}

.message-name {
    font-size: 24px;
    font-weight: bold;
    max-width: 150px;
    /* background-color: black; */
}

.message-reply {
    font-size: 14px;
    margin-top: 3px;
    margin-left: 10px;
}

.message-name:hover {
    color: #375cff;
}

.message-reply-text {
    position: absolute;
    margin-top: 45px;
    margin-left: 100px;
    width: 600px;
    height: 60px;
}

.message-reply-true {
    font-size: 18px;
    max-width: 100%;
    max-height: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}

.message-bottom {
    height: 30px;
    width: 500px;
    /* background-color: black; */
    position: absolute;
    margin-top: 80px;
    margin-left: 100px;
    text-align: left;
    display: flex;
    align-items: center;
    /* 可选：垂直居中对齐内部内容 */
    justify-content: flex-start;
}

.message-bottom-time {
    font-size: 12px;
    color: #909090;
}

.message-bottom-reply {
    margin-left: 36px;
    font-size: 14px;
    color: #929292;
}

.message-bottom-good {
    margin-left: 15px;
    font-size: 14px;
    color: #929292;
}

.message-bottom-reply:hover {
    color: #879dff;
}

.message-bottom-reply:hover .reply-icon {
    color: #879dff !important;
}

.message-bottom-good:hover {
    color: #879dff;
}

.message-bottom-good:hover .good-icon {
    color: #879dff !important;
}

.message-my-comment-block {
    width: 100px;
    height: 100px;
    /* background-color: black; */
    position: absolute;
    margin-top: 10px;
    margin-left: 940px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}

.message-my-comment {
    font-size: 16px;
    color: #909090;
}

.message-bottom-delete {
    margin-left: 15px;
    font-size: 14px;
    color: #929292;
}

.message-bottom-delete:hover {
    color: #879dff;
}

.message-bottom-delete:hover .delete-icon {
    color: #879dff !important;
}
</style>