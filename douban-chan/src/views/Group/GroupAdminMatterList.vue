<template>
    <div class="admin-container" v-if="groupInfo.userIsAdmin">
        <div class="grouplist-header-container">
            <div class="color-block"></div>
            <span class="grouplist-header-title">申请消息</span>
        </div>
        <GroupAdminApplyBar v-for="message in msgList" :key="message.id" :message="message" @delete="deleteMessage(message.id)"></GroupAdminApplyBar>
    </div>
</template>

<script>
import qs from 'qs'
import GroupAdminApplyBar from '@/components/group/GroupAdminApplyBar.vue';
export default {
    name: 'GroupAdminMatterList',
    props:['msgList', 'groupInfo'],
    components: {
        GroupAdminApplyBar,
    },
    data() {
        return {
            
        }
    },
    methods:{
        deleteMessage(id) {
            const index = this.msgList.findIndex(message => message.id === id);
            if (index !== -1) {
                this.msgList.splice(index, 1);
            }
        },
    },
}
</script>

<style scoped>
.admin-container {
    margin: 20px 0 0 0;
    padding: 20px;
}

/* 顶部标题 */
.grouplist-header-container {
    position: sticky;
    top: 68px;
    /* top: 120px; */
    background-color: rgb(255, 254, 254);
    z-index: 10;

    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: flex-start;
    margin-bottom: 10px;
}

.grouplist-header-title {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: center;

    margin: 12px;
    font-size: 24px;
    font-weight: 600;
    color: rgb(251, 138, 138);
}

/* 色块 */
.color-block {
    background-color: rgb(251, 138, 138);
    width: 15px;
    height: 20px;
    margin: 18px 12px 12px 12px;
}
</style>