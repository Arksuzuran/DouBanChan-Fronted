<template>
  <div class="group-list-block">
    <div style="margin-top: 5px;"></div>
    <div class="group-list">
      <span class="group-list-text">我的小组</span>
      <div class="group-list-for-switch">
        <GroupCard v-for="group in groupList" :key="group.groupId" :group="group">
        </GroupCard>
        <GroupCard v-for="group in groupList" :key="group.groupId" :group="group">
        </GroupCard>
      </div>

    </div>
  </div>
</template>

<script>
import GroupCard from '@/components/group/GroupCard.vue'
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
    getGroupListOnline() {
      return [
        {
          groupId: 'g001',
          groupHeadBgUrl: require('../../assets/user-image-7.jpg'),
          groupAvatarImgUrl: require('../../assets/group-avatar-1.jpg'),
          groupName: "集美小组集美小组集美小组",
          groupIntro: "家人们谁懂啊，咱就是说一整个无语住了，一把子大动作给到了，今天又是在逃公主的一天，九敏九敏真的太好哭了吧，下头男",
          tagList: ['生活', '文化'],
          groupPostNumber: 321,
          groupFollowNumber: 594,
          memberList: [
            {
              userId: '001',
              userName: "羽毛笔",
              userImageUrl: require('../../assets/user-image-1.jpg'),
              isAdmin: true,
            },
            {
              userId: '004',
              userName: "bochi",
              userImageUrl: require('../../assets/user-image-7.jpg'),
              isAdmin: false,
            },
          ],
        },
        {
          groupId: 'g002',
          groupHeadBgUrl: require('../../assets/user-bg-4.jpg'),
          groupAvatarImgUrl: require('../../assets/group-avatar-2.jpg'),
          groupName: "coding小组",
          groupIntro: "编程爱好者聚集地",
          tagList: ['生活', '游戏', '文化'],
          groupPostNumber: 597,
          groupFollowNumber: 792,
          memberList: [
            {
              userId: '001',
              userName: "羽毛笔",
              userImageUrl: require('../../assets/user-image-1.jpg'),
              isAdmin: false,
            },
            {
              userId: '002',
              userName: "Chino",
              userImageUrl: require('../../assets/user-image-8.jpg'),
              isAdmin: true,
            },
            {
              userId: '003',
              userName: "_Karasu_",
              userImageUrl: require('../../assets/user-image-6.jpg'),
              isAdmin: true,
            },
            {
              userId: '004',
              userName: "bochi",
              userImageUrl: require('../../assets/user-image-7.jpg'),
              isAdmin: false,
            },
          ],
        },
        {
          groupId: 'g003',
          groupHeadBgUrl: require('../../assets/group-img-8.jpg'),
          groupAvatarImgUrl: require('../../assets/group-avatar-3.jpg'),
          groupName: "蔚蓝档案小组",
          groupIntro: "联邦理事会宣布对此事件负责",
          tagList: ['游戏'],
          groupPostNumber: 1367,
          groupFollowNumber: 59521,
          memberList: [
            {
              userId: '002',
              userName: "Chino",
              userImageUrl: require('../../assets/user-image-8.jpg'),
              isAdmin: true,
            },
            {
              userId: '003',
              userName: "_Karasu_",
              userImageUrl: require('../../assets/user-image-6.jpg'),
              isAdmin: false,
            },
          ],
        },
      ]
    },
  },
  mounted() {
    this.groupList = this.getGroupListOnline();
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
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 在一行中放置两列 */
  gap: 15px;
}
</style>