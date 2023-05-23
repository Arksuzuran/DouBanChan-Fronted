<template>
    <div>
        <div class="section-title">
            - {{ title }}
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; 
        <button class="button-35" role="button"><i class="el-icon-plus"></i> 我要写{{ title }}</button>

        <br></br>
        <div class="tab" :class="{ active: activeTab === 'latest' }" @click="setActiveTab('latest')">最新</div>
        |
        <div class="tab" :class="{ active: activeTab === 'hottest' }" @click="setActiveTab('hottest')">最热</div>

        <div v-for="i in 4" :key="i" style="height: 120px; background-color: gray; margin-top: 10px;" @click="toReview(i)">
            这是影评{{ i }}
        </div>
    </div>    
</template>

<script>
export default {
    name: "ReviewSection",
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            activeTab: 'latest'
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
        toReview(id){   //记得还有书籍或电影的id
                console.log(id)
                this.$router.push({path: '/review', query: {id: id}})
            }
    }
}
</script>

<style scoped>
.section-title{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    display: inline-block;
}
.review{
    border: 1px solid #ebebeb;
    border-radius: 5px;
    padding: 10px;
}
.tab {
  display: inline-block;
  padding: 8px 16px;
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
  display: inline-flex;
  flex: 1 1 auto;
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