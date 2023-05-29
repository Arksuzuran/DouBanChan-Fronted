<!-- 话题版块主页 “浏览发现”的二级路由页面 -->
<template>
    <div class="topichome-main-container">
        <!-- 左部页面的主要内容 -->
        <div class="topichome-mid-container">
            <GroupHomePostList :postList="inPostList"></GroupHomePostList>
        </div>
        <!-- 右部页面的主要内容 -->
        <div class="topichome-right-container">
            <GroupList :groupList="inGroupList" title="正在热议的小组"></GroupList>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.topichome-main-container {
    width: 80%;
    margin: 0 auto;
    background-color: rgb(255, 251, 251);

    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-flow: row wrap;
}

/* 中部内容区 */
.topichome-mid-container {
    flex: 10;
}

/* 右侧随机推荐区 */
.topichome-right-container {
    flex: 4;
}
</style>