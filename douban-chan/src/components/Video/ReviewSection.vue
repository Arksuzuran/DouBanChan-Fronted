<template>
    <div>
        <div class="section-title">
            -- {{ title }} --
        </div>
        <div class="section-row">
            <div class="choose">
                <div class="tab" :class="{ active: activeTab === 'hottest' }" @click="setActiveTab('hottest')">最热</div>
                |
                <div class="tab" :class="{ active: activeTab === 'latest' }" @click="setActiveTab('latest')">最新</div>
            </div>
            <button class="button-35" role="button" @click="$emit('reply')"><i class="el-icon-plus"></i> 我要写{{ title }}</button>
        </div>

        <div v-for="reviewItem in reviewItems" :key="reviewItem.textId">
            <ReviewSmall :item="reviewItem" :key="reviewItem.textID"></ReviewSmall>
        </div>

    </div>    
</template>

<script>
import ReviewSmall from '@/components/Video/ReviewSmall.vue'
import Editor from '@/components/Editor/Editor.vue' 
export default {
    name: "ReviewSection",
    components: {
        ReviewSmall, Editor
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        reviewItems: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            activeTab: 'latest',
        }
    },
    methods: {
        setActiveTab(tab){
            this.activeTab = tab;
            if (tab === 'latest')
                console.log('最新');
            else if (tab === 'hottest')
                console.log('最热');
        },
    }
}
</script>

<style scoped>
.section-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.section-title{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
}
.review{
    border: 1px solid #ebebeb;
    border-radius: 5px;
    padding: 10px;
}
.tab {
  display: inline-block;
  cursor: pointer;
}
.tab.active {
  font-weight: bold; /* 选中状态下的文本加粗 */
}


/* CSS */
.button-35 {
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: transparent 0 0 0 3px,rgba(18, 18, 18, .1) 0 6px 20px;
  box-sizing: border-box;
  color: #121212;
  cursor: pointer;
  font-family: Inter,sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1;
  margin: 0;
  outline: none;
  padding: 1rem 1.2rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s,-webkit-box-shadow .2s;
  white-space: nowrap;
  border: 0;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-35:hover {
  box-shadow: #121212 0 0 0 3px, transparent 0 0 0 0;
}

</style>