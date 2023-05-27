<template>
    <div class="topic-group-module-block">
        <div class="topic-module">
            <el-container>
                <el-header style="margin-top: 20px;">
                    <div style="margin-left: 1%;">
                        <i class="fa-solid fa-comment topic-logo" style="color: #004ac2;"></i>
                        <div style="float: left; display: inline-block; margin-left: 5px;width:90%;">
                            <span
                                style="float: left;margin-left: 5px;font-size: 40px; font-weight: bold;color: #000000;">话题栏目</span>
                            <div class="topic-button-for-more">
                                <ButtonForMore></ButtonForMore>
                            </div>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <div class="topic-module-card-container">
                        <div v-for="card in 5" class="topic-module-card-list">
                            <topic-card></topic-card>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <div class="group-module">
            <el-container>
                <el-header style="margin-top: 20px;">
                    <div style="margin-left: 1%;">
                        <i class="fa-solid fa-user-group group-logo" style="color: #004ac2;"></i>
                        <div style="float: left; display: inline-block; margin-left: 5px;width:400px;">
                            <span
                                style="float: left;margin-left: 5px;font-size: 40px; font-weight: bold;color: #000000;">热门小组</span>
                            <div class="group-button-for-more">
                                <ButtonForMore></ButtonForMore>
                            </div>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <div class="group-module-up">
                        <div class="group-module-up-1">
                            <GroupShowCard></GroupShowCard>

                            <GroupShowCard></GroupShowCard>

                            <GroupShowCard></GroupShowCard>
                        </div>
                        <div class="group-module-up-2">
                            <GroupShowCard></GroupShowCard>

                            <GroupShowCard></GroupShowCard>

                            <GroupShowCard></GroupShowCard>
                        </div>
                    </div>
                    <!-- <div class="group-module-cartoon">
                        <GroupCartoon></GroupCartoon>
                    </div> -->
                    <div class="group-module-new-cartoon">
                        <GroupNewCartoon></GroupNewCartoon>
                    </div>

                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
import TopicCard from '../components/TopicCard';
import ButtonForMore from './ButtonForMore.vue';
import GroupShowCard from './GroupShowCard.vue';
import GroupMiniCard from './GroupMiniCard.vue';
import GroupCartoon from './GroupCartoon.vue';
import GroupNewCartoon from './GroupNewCartoon.vue';
export default ({
    components: {
        TopicCard,
        ButtonForMore,
        GroupShowCard,
        GroupCartoon,
        GroupNewCartoon,
        GroupMiniCard,
    },
})
</script>
<style scoped>
.group-module-cartoon {
    width: 112px;
    height: 112px;
    background-color: transparent;
    z-index: 10;
    position: absolute;
    margin-top: -400px;
    margin-left: 184px;
    /* 计算得到，千万别改 */
}

.group-module-new-cartoon {
    background-color: transparent;
    width: 160px;
    height: 185px;
    z-index: 40;
    z-index: 10;
    position: absolute;
    margin-top: -160px;
    margin-left: 160px;
}

.topic-button-for-more {
    margin-top: 5px;
    float: right;
    margin-left: 20px;
}

.group-button-for-more {
    margin-top: 5px;
    float: right;
    margin-left: 20px;
}

.topic-logo {
    float: left;
    font-size: 50px;
    margin-top: 5px;
}

.topic-group-module-block {
    margin-right: 1%;
    width: 85%;
    height: 750px;
    margin-top: 50px;
    margin-left: 7.5%;
    border-radius: 10px;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
    background-color: transparent;
}

.topic-module {
    width: 48%;
    height: 750px;
    background-color: #f9f9f9;
    border-radius: 10px;
    position: absolute;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.topic-module-card-container {
    margin-top: -15px;
    display: flex;
    flex-direction: column;
    /* 设置为竖直排列 */
    justify-content: space-between;
    background-color: transparent;
    margin-left: 1%;
    padding: 10px;
}

.topic-module-card-list {
    margin-bottom: 20px;
    /* 调整 card 之间的垂直间距 */
}

.group-module {
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36%;
    height: 750px;
    margin-left: 49%;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.group-logo {
    float: left;
    font-size: 45px;
    margin-top: 5px;
}

.group-module-up {
    z-index: 11;
    width: 480px;
    height: 600px;
    background-color: transparent;
}


.group-module-down {
    z-index: 11;
    margin-top: 40px;
    width: 480px;
    height: 300px;
    background-color: transparent;
}

.group-module-up-1 {
    z-index: 11;
    position: absolute;
    margin-left: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}

.group-module-up-1>*:not(:last-child) {
    margin-bottom: 40px;
    /* 调整这个数值来控制垂直间距的大小 */
}

.group-module-up-2 {
    z-index: 11;
    position: absolute;
    margin-left: 250px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}

.group-module-up-2>*:not(:last-child) {
    margin-bottom: 40px;
    /* 调整这个数值来控制垂直间距的大小 */
}
</style>