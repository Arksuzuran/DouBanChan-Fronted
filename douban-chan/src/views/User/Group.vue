//用户主页, 参与的小组页面
<template>
  <el-container>
    <el-header class="header-container">
      <h2>我的小组</h2>
    </el-header>
    <el-main>
      <div class="favlist-container">
        <DetailedGroupCard v-for="(works, index) in groupList" :key="index" :info="works" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import DetailedGroupCard from "../../components/DetailedGroupCard.vue";
export default {
  data() {
    return {
      groupList: [
        {
          id: "001",
          imgSrc: require("../../assets/group-img-1.jpg"),
          name: "北航精品课讨论组",
          intro: "本小组交流北航各种精品课程的学习经验，包括且不限于走进软件、软件工程基础、博雅课程等课程。",
          type: "学习/大学",
          persons: "25921",
          posts: "1245",
        },
        {
          id: "002",
          imgSrc: require("../../assets/group-img-2.jpg"),
          name: "蔚蓝档案交流小组",
          intro: "长官，爱丽丝把二楼拿下来了",
          type: "二游/蔚蓝档案",
          persons: "105479",
          posts: "597",
        },
        {
          id: "003",
          imgSrc: require("../../assets/group-img-3.png"),
          name: "冰川镜华同好会",
          intro: "\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//",
          type: "二游/公主连结",
          persons: "5858",
          posts: "1649",
        },
        {
          id: "004",
          imgSrc: require("../../assets/group-img-1.jpg"),
          name: "北航精品课讨论组",
          intro: "本小组交流北航各种精品课程的学习经验，包括且不限于走进软件、软件工程基础、博雅课程等课程。",
          type: "学习/大学",
          persons: "25921",
          posts: "1245",
        },
        {
          id: "005",
          imgSrc: require("../../assets/group-img-2.jpg"),
          name: "蔚蓝档案交流小组",
          intro: "长官，爱丽丝把二楼拿下来了",
          type: "二游/蔚蓝档案",
          persons: "105479",
          posts: "597",
        },
        {
          id: "006",
          imgSrc: require("../../assets/group-img-3.png"),
          name: "冰川镜华同好会",
          intro: "\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//\\\\小仓唯xcw//",
          type: "二游/公主连结",
          persons: "5858",
          posts: "1649",
        },
      ]
    }
  },
  components: {
    DetailedGroupCard,
  },

}
</script>
  
<style scoped>

.el-container {
  margin-top: 10px;
}

.favlist-container {
  width: 94%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>