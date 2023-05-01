<template>
    <div>
        <el-container>
            <el-header class="header-container">
                <h2>我的帖子</h2>
                <el-button size="small" round>影评</el-button>
                <el-button size="small" round>话题</el-button>
                <el-button size="small" round>帖子</el-button>
            </el-header>
            <el-main>
                <div class="post-container">
                    <DetailedPostCard v-for="(post, index) in postList" :key="index" :info="post" />
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script>
import DetailedPostCard from '../../components/DetailedPostCard.vue';
export default {
    data() {
        return {
            postList: [
                {
                    lzName: "suzuran",
                    lzImageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-29',
                    title: "家人们谁懂啊",
                    content: "  不爱喝茉莉蜜茶的人素质品味修养都很低，只能在阴暗的角落里度过相对失败的人生。9敏，9敏，集美们，大无语事件发生，咱就是说最近在发现，就是内个绝绝子之后，完了芭比Q了给我家人们，咱就是说真的笑死，又一把子大动作开始给到了，我真的会谢，给我一整个整的困惑了。咱就是说一整个给吓到了，我真的栓q了，一把子无语子属于是家人们。",
                    postImageUrl: require('../../assets/post-img-2.jpg'),
                    from: '集美小组',
                    visits: 25700,
                    liked: 4512,
                    unliked: 1230,
                },
                {
                    lzName: "suzuran",
                    lzImageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-28',
                    title: "这就是不玩原神的下场",
                    content: "  八嘎 鉴于你在上網辱骂原神，经本院初步审理，你的行为叛國。米哈遊第一警视厅执行罚款500万円拒繳罚款就处以死刑，剥夺政治权利终身并且你的手機通讯录联系人都会受到5-10w不等的叛國罚款。请你收到本短信本短信后务必尽快上缴罚款。不然本院将于明日中午，安排神風特工队对你住所进行爆破",
                    postImageUrl: require('../../assets/post-img-1.jpg'),
                    from: '原神小组',
                    visits: 595815,
                    liked: 21122,
                    unliked: 43302,
                },
                {
                    lzName: "suzuran",
                    lzImageUrl: require('../../assets/user-image-2.jpg'),
                    date: '2023-4-30',
                    title: "回来吧🚁牢大🚁",
                    content: "  回来吧科比黑曼巴.我最骄傲的信仰.历历在目的球场.眼泪莫名在流淌.🤙依稀记得24🤙.🧟还有给力的八号🧟.把对手全都给打退🚁就算坠机也不死🚁",
                    postImageUrl: require('../../assets/user-image-3.jpg'),
                    from: '黑坤巴精神小组',
                    visits: 269492,
                    liked: 65414,
                    unliked: 1,
                },
            ]
        }
    },
    components: {
        DetailedPostCard,
    },
}
</script>
  
<style scoped>
.el-container {
    margin-top: 10px;
}
.header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.el-button {
    margin-top: 20px;
}
.post-container {
    width: 90%;
    margin: 0 auto;
    display: block;
}
</style>