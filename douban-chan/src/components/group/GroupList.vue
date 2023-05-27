<!-- 小组卡片列表 -->
<!-- 使用位置：GroupHomeView.vue -->
<!-- params:
        @groupList: 小组信息对象的列表
        @usersOwnGroup: 是否展示‘我的小组'
-->
<template>
  <div class="grouplist-container">
    <div class="grouplist-header-container">
      <div class="color-block"></div>
      <span class="grouplist-header-title">{{ headerTitle}}</span>
    </div>
    <GroupCard v-for="group in groupList" :key="group.groupId" :group="group"></GroupCard>
  </div>
</template>

<script>
import GroupCard from '@/components/group/GroupCard.vue'
export default {
    props:['groupList', 'usersOwnGroup'],
    name:'GroupList',
    components:{
        GroupCard,
    },
    computed:{
      headerTitle(){
        return this.usersOwnGroup ? '我加入的小组' : '值得加入的小组'
      }
    },
}
</script>

<style scoped>
/* 顶部标题 */
.grouplist-header-container {
    position: sticky;
    top: 148px;
    /* top: 120px; */
    background-color: rgb(255, 254, 254);
    z-index: 10;

    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: flex-start;
    margin-bottom: 10px;
}
.grouplist-header-title{
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