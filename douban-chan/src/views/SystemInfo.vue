<template>
    <div class="system-info-block">
        <div class="system-info-top">
            <div class="system-info-name">{{ info.title }}</div>
            <div class="system-info-time">{{ info.time }}</div>
            <div class="system-info-delete" style="cursor: pointer;" @click="deleteInfo()"><i
                    class="fa-regular fa-trash-can delete-icon" style="color: #929292;"></i>
                删除该通知
            </div>
        </div>
        <div class="system-info-text">
            {{ info.text }}
        </div>
        <div style="height: 20px;"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
export default ({
    props: ['info'],
    methods: {
        deleteInfo() {
            this.$emit('delete', this.info.id);
        },
    }
})
</script>

<style scoped>
.system-info-block {
    width: 1050px;
    border-radius: 10px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
}

.system-info-top {
    margin-top: 10px;
    margin-left: 20px;
    text-align: left;
    display: flex;
    align-items: center;
    /* background-color: black; */
}

.system-info-name {
    font-size: 16px;
    font-weight: bold;
    max-width: 700px;
}

.system-info-time {
    margin-left: 15px;
    font-size: 13px;
    margin-top: 2px;
    color: #909090;
}

.system-info-text {
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

.system-info-delete {
    position: absolute;
    font-size: 14px;
    margin-left: 920px;
}

.system-info-delete:hover {
    color: #879dff;
}

.system-info-delete:hover .delete-icon {
    color: #879dff !important;
}
</style>