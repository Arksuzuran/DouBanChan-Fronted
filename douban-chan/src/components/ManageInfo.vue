<template>
    <div class="manage-info-block">
        <div class="manage-info-top">
            <div class="manage-info-name"><i class="fa-brands fa-discord"
                    :style="{ color: statusColor, fontWeight: 'bold' }"> 举报({{
                        status }})
                </i> {{ manage.title }}
            </div>
            <div class="manage-info-time">2023年6月4日 17:51</div>
            <div class="manage-info-delete" style="cursor: pointer;" @click="deleteManage()"><i
                    class="fa-regular fa-trash-can delete-icon" style="color: #929292;"></i>
                删除该通知
            </div>
        </div>
        <div class="manage-info-text">
            {{ manage.text }}
        </div>
        <div style="height: 15px;"></div>
        <div v-if="!isHandle" class="manage-info-button">
            <div class="manage-info-agree" @click="showSuccess()"><i class="fa-regular fa-circle-check"></i> 接受举报</div>
            <div class="manage-info-refuse" @click="showFail()"><i class="fa-regular fa-circle-xmark"></i> 驳回举报</div>
        </div>
        <div v-if="isHandle" style="height: 24px;"></div>
        <div class="manage-info-outcome-success" :style="{ opacity: success ? 1 : 0 }">举报成功</div>
        <div class="manage-info-outcome-fail" :style="{ opacity: fail ? 1 : 0 }">举报失败</div>
        <div style="height: 20px;"></div>
    </div>
</template>

<script>
export default ({
    props: ['manage'],
    data() {
        return {
            isHandle: false,
            success: false,
            fail: false,
        }
    },
    methods: {
        showSuccess() {
            this.isHandle = true;
            this.success = true;
        },
        showFail() {
            this.isHandle = true;
            this.fail = true;
        },
        deleteManage() {
            this.$emit('delete', this.manage.id);
        },
    },
    computed: {
        status() {
            if (this.isHandle == true) {
                return '已处理';
            }
            else return '待处理';
        },
        statusColor() {
            if (this.isHandle == true) {
                return '#00ff00';
            }
            else return '#ff0000';
        },
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap');

.manage-info-block {
    width: 1050px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
}

.manage-info-top {
    margin-top: 10px;
    margin-left: 20px;
    text-align: left;
    display: flex;
    align-items: center;
    /* background-color: black; */
}

.manage-info-name {
    font-size: 16px;
    font-weight: bold;
    max-width: 750px;
}

.manage-info-time {
    margin-left: 15px;
    font-size: 13px;
    margin-top: 2px;
    color: #909090;
}

.manage-info-text {
    margin-top: 5px;
    margin-left: 24px;
    width: 1000px;
    word-wrap: break-word;
    font-size: 13px;
    text-align: left;
    line-height: 1.8;
    /* 调整行间距，可根据需要进行调整 */
    font-family: "Helvetica", Arial, sans-serif;
    /* 选择一个圆润的字体，如 Helvetica */
}

.manage-info-delete {
    position: absolute;
    font-size: 14px;
    margin-left: 920px;
}

.manage-info-delete:hover {
    color: #879dff;
}

.manage-info-delete:hover .delete-icon {
    color: #879dff !important;
}

.manage-info-button {
    display: flex;
    justify-content: center;
}

.manage-info-agree {
    cursor: pointer;
    font-size: 16px;
    margin-right: 150px;
}

.manage-info-agree:hover {
    color: #ff6200;
}

.manage-info-refuse {
    cursor: pointer;
    font-size: 16px;
}

.manage-info-refuse:hover {
    color: #ff6200;
}

.manage-info-outcome-success {
    font-size: 32px;
    color: #15ff00;
    font-family: 'ZCOOL KuaiLe', sans-serif;
    margin-left: 800px;
    margin-top: -40px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s;
}

.manage-info-outcome-fail {
    font-size: 32px;
    color: #ff0000;
    font-family: 'ZCOOL KuaiLe', sans-serif;
    margin-left: 800px;
    margin-top: -47px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s;
}
</style>