<template>
  <div class="group-list-block">
    <div style="margin-top: 5px;"></div>
    <div class="group-list">
      <span class="group-list-text">我的小组</span>
      <div class="group-list-for-switch">
        <GroupCard v-for="group in groupList" :key="group.groupId" :group="group">
        </GroupCard>
      </div>

    </div>
  </div>
</template>

<script>
import GroupCard from '@/components/group/GroupCard.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
export default {
  components: {
    GroupCard,
  },
  data() {
    return {
      groupList: [],
    }
  },
  methods: {
    //获取话题列表
    ...mapActions('topicAbout', ['getTopicListSearchOnline', 'getTopicListOnline', 'getTopicListByHotOnline', 'getTopicListMineOnline', 'getTopicInfoOnline', 'getTopicListByGroupIdOnline', 'getTopicListSearchOnline']),
    //获取帖子列表 或者一个完整的帖子
    ...mapActions('postAbout', ['getPostListSearchOnline', 'getPostListOnline', 'getPostListByGroupIdOnline', 'getPostListByTopicIdOnline', 'getPostListByHotOnline', 'getPostListMineOnline', 'getPostOnline', 'getPostListSearchOnline']),
    //获取小组列表    
    ...mapActions('groupAbout', ['getGroupListSearchOnline', 'getGroupListOnline', 'getGroupListByHotOnline', 'getGroupListMineOnline', 'getGroupInfoOnline', 'getGroupListSearchOnline']),
    getGroupListOnline() {
      this.$axios({
        method: "post",
        data: qs.stringify({
          u_id: this.userId,
        }),
        url: "/user/get_self_group/",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          console.log('成功获取我的小组', res.data)
          //给groupList赋值
          this.groupList = res.data.groups
        })
        .catch((err) => {
          this.$message.error("网络出错QAQ");
        });
    },
  },
  computed: {
    ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
  },
  mounted() {
    this.getGroupListOnline()
  },
}
</script>

<style scoped>
.group-list-block {
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.group-list-block>div {
  margin-top: 10px;
  margin-bottom: 10px;
}

.group-list {
  width: 95%;
  margin-left: 1.9%;
  background-color: transparent;
  display: flex;
  align-items: left;
  flex-direction: column;
}

.group-list-text {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}


.group-list-for-switch {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 在一行中放置两列 */
  gap: 10px;
}
</style>