<!-- 小组卡片列表 -->
<!-- 使用位置：GroupHomeView.vue 
              TopicHomeView.vue -->
<!-- params:
        @groupList: 小组信息对象的列表
        @title: 该列表顶部显示的标题
        @DIYCardComponentName: list内所使用的card组件的名称 记得在该组件内引入这个自定义组件。如果不传该参数 则默认是GroupCard
-->
<template>
  <div class="grouplist-container">
    <div class="grouplist-header-container" :style="distanceToTop">
      <div class="color-block"></div>
      <span class="grouplist-header-title">{{ title }}</span>
    </div>
    <!-- 根据传入参数来确定使用何种组件 -->
    <div :class="colClass">
      <component v-for="group in groupList" :key="group.groupId" :group="group" :is="getComponentType()"></component>
    </div>

  </div>
</template>

<script>
import GroupCard from '@/components/group/GroupCard.vue'
import GroupCardWithTopic from './GroupCardWithTopic.vue';

export default {
  props: ['groupList', 'title', 'DIYCardComponentName', 'col', 'top'],
  name: 'GroupList',
  components: {
    GroupCard,
    GroupCardWithTopic,
  },
  computed: {
    colClass() {
      return this.col ? 'col-' + this.col : ''
    },
    // 动态设置到顶部的距离
    distanceToTop() {
      if (this.top) {
        return {
          top: this.top + 'px',
        }
      }
      return {}
    }
  },
  methods: {
    // 选择需要调用的组件
    getComponentType() {
      if (this.DIYCardComponentName) {
        return this.DIYCardComponentName
      }
      // 默认情况
      else {
        return 'GroupCard'
      }
    }
  },
}
</script>

<style scoped>
.grouplist-container {
  margin: 0 20px;
}

.col-2 {
  display: grid;
  gap: 40px;
  /* 可根据需要调整间距 */
  grid-template-columns: repeat(2, minmax(400px, 1fr));
  /* 根据需要调整列宽度 */
}

.col-3 {
  display: grid;
  gap: 30px;
  /* 可根据需要调整间距 */
  grid-template-columns: repeat(3, minmax(400px, 1fr));
  /* 根据需要调整列宽度 */
}

.col-4 {
  display: grid;
  gap: 20px;
  /* 可根据需要调整间距 */
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  /* 根据需要调整列宽度 */
}

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