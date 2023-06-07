<template>
    <div class="message-card-msg-block" style="cursor: pointer;">
        <div class="message-image">
            <img :src="message.userImgUrl" class="coverImage">
        </div>
        <div class="message-top">
            <div class="message-name">{{ message.name }}</div>
            <div class="message-msg">申请成为小组管理员 </div>
            <div class="message-bottom-time">{{ ' ' + message.time }}</div>
        </div>
        <div class="message-msg-text">
            <span class="message-msg-true">{{ message.msg }}</span>
        </div>
        <div class="message-my-comment-block">
            <span class="button-agree" @click="handlePass">通过</span>
            <span class="button-refuse" @click="handleReject">拒绝</span>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default ({
    name: 'GroupAdminApplyBar',
    props: ['message'],
    methods: {
        deleteMessage() {
            this.$emit('delete', this.message.id);
        },
        //在此向后端发送请求
        // 通过申请
        pass() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    m_id: this.message.id
                }),
                url: "/group/grant_apply/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log('已通过申请', res)
                    this.$message.success('申请已通过!');
                })
                .catch((err) => {
                    this.$message.error("网络出错");
                });
        },
        reject() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    m_id: this.message.id
                }),
                url: "/group/cancel_admin/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log('已拒绝申请', res)
                    this.$message.error('申请已驳回!');
                })
                .catch((err) => {
                    this.$message.error("网络出错");
                });
        },

        handlePass() {
            this.$confirm('是否确定同意申请?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning',
            }).then(() => {
                this.pass()
                this.deleteMessage()

            }).catch(() => {
                this.$message.info('已取消操作');
            });
        },
        handleReject() {
            this.$confirm('是否确定驳回申请?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning',
            }).then(() => {
                this.reject()
                this.deleteMessage()
                
            }).catch(() => {
                this.$message.info('已取消操作');
            });
        },
    },

})
</script>

<style scoped>
.message-card-msg-block {
    margin: 0 auto;
    margin-top: 20px;
    width: 1050px;
    height: 120px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #fcf7f7;

    transition: 0.5s ease-in-out;
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
    font-size: 21px;
    font-weight: bold;
    max-width: 150px;
    /* background-color: black; */
}

.message-msg {
    font-size: 16px;
    margin-top: 3px;
    margin-left: 10px;
}

.message-name:hover {
    color: #375cff;
}

.message-msg-text {
    position: absolute;
    margin-top: 55px;
    margin-left: 100px;
    width: 600px;
    height: 60px;
}

.message-msg-true {
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
    margin-left: 15px;
    font-size: 13px;
    color: #757474;
}

.message-bottom-msg {
    margin-left: 36px;
    font-size: 14px;
    color: #929292;
}

.message-bottom-good {
    margin-left: 15px;
    font-size: 14px;
    color: #929292;
}

.message-bottom-msg:hover {
    color: #879dff;
}

.message-bottom-msg:hover .msg-icon {
    color: #879dff !important;
}

.message-bottom-good:hover {
    color: #879dff;
}

.message-bottom-good:hover .good-icon {
    color: #879dff !important;
}

.message-my-comment-block {
    width: 250px;
    height: 100px;
    /* background-color: black; */
    position: absolute;
    margin-top: 10px;
    margin-left: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-agree {
    margin: 20px 10px 0 10px;
    width: 40%;
    outline: none;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    transition: all .3s ease;
    background-color: rgba(236, 242, 244, 0.9);

    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 1px 2px 0px rgba(247, 61, 61, 0.2);

    cursor: pointer;
}

.button-agree:hover {
    background-color: rgb(114, 177, 229);
    color: #fff;
}

.button-refuse {
    margin: 20px 10px 0 10px;
    width: 40%;
    outline: none;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    transition: all .3s ease;
    background-color: rgba(251, 226, 226, 0.9);

    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 1px 2px 0px rgba(247, 61, 61, 0.2);

    cursor: pointer;
}

.button-refuse:hover {
    background-color: rgb(255, 79, 79);
    color: #fff;
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