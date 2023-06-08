<template>
    <!-- <div>
        <div class="card-wrapper">
            <VideoHengCard v-for="(item, index) in items" :key="index" 
            :item="item"></VideoHengCard>
        </div>
    </div> -->
    <div class="grouplist-container">
        <div class="grouplist-header-container" :style="distanceToTop">
        <div class="color-block"></div>
        <span class="grouplist-header-title">搜索结果</span>
        </div>
        <!-- 根据传入参数来确定使用何种组件 -->
        <div :class="colClass">
        <!-- <component v-for="group in groupList" :key="group.groupId" :group="group" :is="getComponentType()"></component> -->
        <VideoHengCard v-for="(item, index) in items" :key="index" 
            :item="item"></VideoHengCard>
        </div>

    </div>
</template>

<script>
import VideoHengCard from "@/components/Video/VideoHengCard.vue"
export default {
    name: "VideoCategory",
    components: {VideoHengCard},
    props: ['items', 'title', 'DIYCardComponentName', 'col', 'top'],
    mounted(){
        console.log(this.items)
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
    }
}
</script>

<style scoped>
.card-wrapper{
    display: flex;
    justify-content: left;
    align-items: left;
    flex-wrap: wrap;
}

.grouplist-container {
  margin: 0 auto;
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