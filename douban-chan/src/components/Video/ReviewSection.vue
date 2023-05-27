<template>
    <div>
        <div class="section-title">
            -- {{ title }} --
        </div>
        <div class="section-row">
            <div class="choose">
                <div class="tab" :class="{ active: activeTab === 'latest' }" @click="setActiveTab('latest')">最新</div>
                |
                <div class="tab" :class="{ active: activeTab === 'hottest' }" @click="setActiveTab('hottest')">最热</div>
            </div>
            <button class="button-35" role="button" @click="$emit('reply')"><i class="el-icon-plus"></i> 我要写{{ title }}</button>
        </div>

        <div>
            <ReviewSmall :item="reviewItem"></ReviewSmall>
        </div>
        <div>
            <ReviewSmall :item="reviewItem"></ReviewSmall>
        </div>
        <div>
            <ReviewSmall :item="reviewItem"></ReviewSmall>
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
        }
    },
    data(){
        return {
            
            activeTab: 'latest',
            reviewItem: {
                id: 1,
                reviewername: 'adk',
                reviewerImage: require('@/assets/user-image-1.jpg'),
                rate: 8,
                title: "一封迟到500年的道歉信，3D的",
                content: "“如果我们放弃这片土地，转让给你们，你们一定要记住：这片土地是神圣的。”1854年，一位印第安人酋长给“在华盛顿特区的大首领”写下这句话。他与他的族人已经拼尽了最后的一分力量，年轻的猎手们已牺牲殆尽，年老体弱者被疾病缠身……没有人听到他们的哀嚎与怒吼，没有人在乎这已在灭族边缘的古老部族。酋长已经看到了故事的结局：守不住了，再也守不住了……这土地，祖先的土地……那些白人殖民者端着他们的步枪，一波又一波地出现在地平线上……“他们会来的，就像永不停歇的雨。”——电影《阿凡达》。在2010年的最冷的一天里我盼来了期待已久的视觉盛宴，科技进步创造出的华丽纵然让人惊叹，但却并没能让我感动。《阿凡达》技术上的巅峰位置毋庸置疑，但从“电影本身”来讲，却乏善可陈——甚至可以说缺乏原创性。抛开整个创意与《风中奇缘》的相似，在众多场景中都能找到《天空之城》的影子；灵魂之树下的治疗仪式和《幽灵公主》中湖边的一幕如出一辙；人形机器战甲不能追溯回高达也至少可以说和沃卓斯基的《骇客帝国》有雷同，而哈里路亚山更是酷似徐克的新蜀山；更别提那个脸谱得不得了的大反派，他简直可以塞到所有反战电影里演个无人性长官而游刃有余，如此没有层次没有个性的人物加上影片视觉上的特点，让我恍惚生出“正在看动画片”的错觉。如果我们放弃这片土地，转让给你们，你们一定要记住：这片土地是神圣的。”1854年，一位印第安人酋长给“在华盛顿特区的大首领”写下这句话。他与他的族人已经拼尽了最后的一分力量，年轻的猎手们已牺牲殆尽，年老体弱者被疾病缠身……没有人听到他们的哀嚎与怒吼，没有人在乎这已在灭族边缘的古老部族。酋长已经看到了故事的结局：守不住了，再也守不住了……这土地，祖先的土地……那些白人殖民者端着他们的步枪，一波又一波地出现在地平线上……“他们会来的，就像永不停歇的雨。”——电影《阿凡达》。在2010年的最冷的一天里我盼来了期待已久的视觉盛宴，科技进步创造出的华丽纵然让人惊叹，但却并没能让我感动。《阿凡达》技术上的巅峰位置毋庸置疑，但从“电影本身”来讲，却乏善可陈——甚至可以说缺乏原创性。抛开整个创意与《风中奇缘》的相似，在众多场景中都能找到《天空之城》的影子；灵魂之树下的治疗仪式和《幽灵公主》中湖边的一幕如出一辙；人形机器战甲不能追溯回高达也至少可以说和沃卓斯基的《骇客帝国》有雷同，而哈里路亚山更是酷似徐克的新蜀山；更别提那个脸谱得不得了的大反派，他简直可以塞到所有反战电影里演个无人性长官而游刃有余，如此没有层次没有个性的人物加上影片视觉上的特点，让我恍惚生出“正在看动画片”的错觉。如果我们放弃这片土地，转让给你们，你们一定要记住：这片土地是神圣的。”1854年，一位印第安人酋长给“在华盛顿特区的大首领”写下这句话。他与他的族人已经拼尽了最后的一分力量，年轻的猎手们已牺牲殆尽，年老体弱者被疾病缠身……没有人听到他们的哀嚎与怒吼，没有人在乎这已在灭族边缘的古老部族。酋长已经看到了故事的结局：守不住了，再也守不住了……这土地，祖先的土地……那些白人殖民者端着他们的步枪，一波又一波地出现在地平线上……“他们会来的，就像永不停歇的雨。”——电影《阿凡达》。在2010年的最冷的一天里我盼来了期待已久的视觉盛宴，科技进步创造出的华丽纵然让人惊叹，但却并没能让我感动。《阿凡达》技术上的巅峰位置毋庸置疑，但从“电影本身”来讲，却乏善可陈——甚至可以说缺乏原创性。抛开整个创意与《风中奇缘》的相似，在众多场景中都能找到《天空之城》的影子；灵魂之树下的治疗仪式和《幽灵公主》中湖边的一幕如出一辙；人形机器战甲不能追溯回高达也至少可以说和沃卓斯基的《骇客帝国》有雷同，而哈里路亚山更是酷似徐克的新蜀山；更别提那个脸谱得不得了的大反派，他简直可以塞到所有反战电影里演个无人性长官而游刃有余，如此没有层次没有个性的人物加上影片视觉上的特点，让我恍惚生出“正在看动画片”的错觉。如果我们放弃这片土地，转让给你们，你们一定要记住：这片土地是神圣的。”1854年，一位印第安人酋长给“在华盛顿特区的大首领”写下这句话。他与他的族人已经拼尽了最后的一分力量，年轻的猎手们已牺牲殆尽，年老体弱者被疾病缠身……没有人听到他们的哀嚎与怒吼，没有人在乎这已在灭族边缘的古老部族。酋长已经看到了故事的结局：守不住了，再也守不住了……这土地，祖先的土地……那些白人殖民者端着他们的步枪，一波又一波地出现在地平线上……“他们会来的，就像永不停歇的雨。”——电影《阿凡达》。在2010年的最冷的一天里我盼来了期待已久的视觉盛宴，科技进步创造出的华丽纵然让人惊叹，但却并没能让我感动。《阿凡达》技术上的巅峰位置毋庸置疑，但从“电影本身”来讲，却乏善可陈——甚至可以说缺乏原创性。抛开整个创意与《风中奇缘》的相似，在众多场景中都能找到《天空之城》的影子；灵魂之树下的治疗仪式和《幽灵公主》中湖边的一幕如出一辙；人形机器战甲不能追溯回高达也至少可以说和沃卓斯基的《骇客帝国》有雷同，而哈里路亚山更是酷似徐克的新蜀山；更别提那个脸谱得不得了的大反派，他简直可以塞到所有反战电影里演个无人性长官而游刃有余，如此没有层次没有个性的人物加上影片视觉上的特点，让我恍惚生出“正在看动画片”的错觉。如果我们放弃这片土地，转让给你们，你们一定要记住：这片土地是神圣的。”1854年，一位印第安人酋长给“在华盛顿特区的大首领”写下这句话。他与他的族人已经拼尽了最后的一分力量，年轻的猎手们已牺牲殆尽，年老体弱者被疾病缠身……没有人听到他们的哀嚎与怒吼，没有人在乎这已在灭族边缘的古老部族。酋长已经看到了故事的结局：守不住了，再也守不住了……这土地，祖先的土地……那些白人殖民者端着他们的步枪，一波又一波地出现在地平线上……“他们会来的，就像永不停歇的雨。”——电影《阿凡达》。在2010年的最冷的一天里我盼来了期待已久的视觉盛宴，科技进步创造出的华丽纵然让人惊叹，但却并没能让我感动。《阿凡达》技术上的巅峰位置毋庸置疑，但从“电影本身”来讲，却乏善可陈——甚至可以说缺乏原创性。抛开整个创意与《风中奇缘》的相似，在众多场景中都能找到《天空之城》的影子；灵魂之树下的治疗仪式和《幽灵公主》中湖边的一幕如出一辙；人形机器战甲不能追溯回高达也至少可以说和沃卓斯基的《骇客帝国》有雷同，而哈里路亚山更是酷似徐克的新蜀山；更别提那个脸谱得不得了的大反派，他简直可以塞到所有反战电影里演个无人性长官而游刃有余，如此没有层次没有个性的人物加上影片视觉上的特点，让我恍惚生出“正在看动画片”的错觉。",
                time: "2022-2-28",
                agree: 200,
                disagree: 100,
                fav: 141,
                comment: 1000
            }
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