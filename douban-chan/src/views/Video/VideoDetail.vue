<template>
    <div class="container">
        <div>
          <div style="text-align: left; margin: 15px 0px">
              <div class="video-name">
                  {{ item.name }}
              </div>
          </div>
        </div> 
        
        <el-row>
          <el-col :span="18"><div>
            <el-col :span="6"><div>
              <img :src="item.imageSrc" style="float: left; width: 200px;height: 100%;border-radius: 5px">
            </div></el-col>
            <el-col :span="18"><div style="height:300px;">
              <el-col :span="16"><div>
                <ItemInfo :item="item"></ItemInfo>
              </div></el-col>
              
              <el-col :span="8"><div class="rate-board">
                <div>豆瓣酱评分</div>
                <Rate :score="item.rating"></Rate>
                <div>我的评分</div>
              </div>
              </el-col>
            </div></el-col>
            
            <div>
              <div class="section-title">
                -- 简介 --
              </div>
              <div class="brief-content">
                {{ item.brief }}
              </div>
            </div>
            
            <el-divider></el-divider>

            <div class="section-title">
                -- 剧照 --
            </div>
            
            <div class="photo-container">
              <img v-for="(photoItem, index) in photos" :key="index" :src="photoItem" class="photo-item">
            </div>
            

            <el-divider></el-divider>

            <ReviewSection title="影评" v-on:reply="toWriteReviewPage" :reviewItems="reviews"></ReviewSection>

            

          </div></el-col>
          <el-col :span="6" class="right-side"><div>
            <div class="">
              <div class="right-section-title">
                相关的小组
              </div>
              <div class="group-card-container" v-if="recommendTopics!==null">
                <GroupCard v-for="(groupItem, index) in this.recommendGroups" :key="index" :groupItem="groupItem"></GroupCard>
              </div>
              <div v-else>
                暂时还没有没有相关的小组哦~
              </div>
              <div class="right-section-title topic">
                相关的话题
              </div>
              <div class="topic-card-container" v-if="recommendTopics!==null">
                <TopicCard :topicItems="recommendTopics"></TopicCard>
              </div>
              <div v-else>
                暂时还没有没有相关的话题哦~
              </div>
            </div>
          </div></el-col>
        </el-row>

        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8000/user/upload_profile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :http-request="uploadFile"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import qs from "qs"
import ReviewSection from '@/components/Video/ReviewSection.vue'
import ItemInfo from '@/components/Video/ItemInfo.vue'
import Rate from '@/components/Video/Rate.vue'
import GroupCard from '@/components/Video/GroupCard.vue'
import TopicCard from '@/components/Video/TopicCard.vue'
import VideoEditor from '@/components/Editor/VideoEditor.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    components: {
      ReviewSection, ItemInfo, Rate, GroupCard, TopicCard, VideoEditor,VueSlickCarousel
    },
    name: 'VideoDetail',
    data(){
        return {
            //上传图片相关
            imageUrl: '',
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            uploadFiles: [],
            
            item:'',
            reviews: [],
            recommendTopics:[],
            recommendGroups:[],

            photos:[
              require("../../assets/group-img-1.jpg"),
              require("../../assets/group-img-2.jpg"),
              require("../../assets/group-img-1.jpg"),
              require("../../assets/group-img-2.jpg"),
              require("../../assets/group-img-1.jpg"),
            ],  //剧照
        }
    },
    methods: {
      // 跳转到写影评页面
      toWriteReviewPage(){
        this.$router.push({
          name: 'writeReview',
          params: {
            id: this.$route.params.id
          }
        })
      },
      login(){
        const formData = new FormData();
        formData.append('username', '1');
        formData.append('password', '1');
        this.$axios({
          method: "post",
          data: formData,
          
          url: "/user/login/",
          headers: { "content-type": " multipart/form-data" },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "网络出错QAQ",
            });
          });
      },
      sendData(){
        const formData = new FormData();
        // formData.append("p_content", require('@/assets/user-image-1.jpg'));
        // this.$axios({
        //   method: "post",
        //   data: formData,
          
        //   url: "/user/upload_profile/",
        //   headers: { "content-type": " multipart/form-data" },
        // })
        //   .then((res) => {
        //     console.log(res);
        //     this.item = res.data;
        //   })
        //   .catch((err) => {  
        //     this.$message({
        //       type: "error",
        //       message: "网络出错QAQ",
        //     });
        //   });
      },
      uploadFile(val){
        const formData = new FormData();
        formData.append("p_content", val.file);
        formData.append("user_id", 6)
        this.$axios({
          method: "post",
          data: formData,
          
          url: "/user/upload_profile/",
          headers: { "content-type": " multipart/form-data" },
        })
          .catch((err) => {  
            this.$message({
              type: "error",
              message: "网络出错QAQ",
            });
          });
      },
      
      //下面是关于头像上传的
      handleAvatarSuccess(res, file) {
        console.log(1)
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl)
        // const formData = new FormData();
        // formData.append("p_content", file[0])
        // this.$axios({
        //   method: "post",
        //   data: formData,
          
        //   url: "/user/upload_profile/",
        //   headers: { "content-type": " multipart/form-data" },
        // })
        //   .then((res) => {
        //     console.log(res);
        //     this.item = res.data;
        //   })
        //   .catch((err) => {  
        //     this.$message({
        //       type: "error",
        //       message: "网络出错QAQ",
        //     });
        //   });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleRemove(file) {
        // this.$refs.upload.clearFiles();
        let fileList = this.$refs.uploadImg.uploadFiles;

        let index = fileList.findIndex((fileItem) => {
          return fileItem.uid === file.uid;
        });
        fileList.splice(index, 1);
        //console.log('filelist_2'+filelist)
        console.log(file);
      },
      updateVideo(){
        this.item = {
                id: 0,  //电影的id
                name: '肖申克的救赎',   //电影名字
                onDate: '2008-08-08',   //上映日期
                rating: 8.8,  //评分
                lastTime: '2h14m',  //电影时长
                imageSrc: "http://127.0.0.1:8000/images/avatar.webp",   //电影封面图片
                images: [require('../../assets/movie/roll-banner1.jpg'),require('../../assets/movie/roll-banner1.jpg'),   //电影的剧照
                require('../../assets/movie/roll-banner1.jpg'),require('../../assets/movie/roll-banner1.jpg')],
                category: ['剧情','犯罪'],    //电影分类
                brief: "　　一场谋杀案使银行家安迪（蒂姆•罗宾斯 Tim Robbins 饰）蒙冤入狱，谋杀妻子及其情人的指控将囚禁他终生。在肖申克监狱的首次现身就让监狱“大哥”瑞德（摩根•弗里曼 Morgan Freeman 饰）对他另眼相看。瑞德帮助他搞到一把石锤和一幅女明星海报，两人渐成患难 之交。很快，安迪在监狱里大显其才，担当监狱图书管理员，并利用自己的金融知识帮助监狱官避税，引起了典狱长的注意，被招致麾下帮助典狱长洗黑钱。偶然一次，他得知一名新入狱的小偷能够作证帮他洗脱谋杀罪。燃起一丝希望的安迪找到了典狱长，希望他能帮自己翻案。阴险伪善的狱长假装答应安迪，背后却派人杀死小偷，让他唯一能合法出狱的希望泯灭。沮丧的安迪并没有绝望，在一个电闪雷鸣的风雨夜，一场暗藏几十年的越狱计划让他自我救赎，重获自由！老朋友瑞德在他的鼓舞和帮助下，也勇敢地奔向自由。",  //电影简介
                director: "窝使莎比",   //电影导演
                writer: "軟功狗市",   //电影编剧
                actor: ["阿里大健康","啊都说了副科级", "阿斯顿发"],   //电影演员
                country: "中国",    //国家
                language: "汉语",   //语言
            }
      },
      updateTopics(){
        this.recommendTopics = [
              {
                topicContent: "cr锐评北航软工",
                topicId: 1,
                topicDiscussNumbers: 123456
              },
              {
                topicContent: "czx锐评北航软工",
                topicId: 2,
                topicDiscussNumbers: 123456
              },
              {
                topicContent: "adk锐评北航软工",
                topicId: 3,
                topicDiscussNumbers: 123456
              },
              {
                topicContent: "czx锐评北航软工",
                topicId: 4,
                topicDiscussNumbers: 123456
              },
              {
                topicContent: "adk锐评北航软工",
                topicId: 5,
                topicDiscussNumbers: 123456
              }
            ]
      },
      updateGroups(){
        this.recommendGroups = [
              {
                groupName: "豆瓣电影小组",
                groupPersonNumbers: 123456,
                groupDiscussNumbers: 123456,
                groupImage: require('../../assets/movie/avatar.webp'),
                groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
              },      
              {
                groupName: "豆瓣动漫小组",
                groupPersonNumbers: 123456,
                groupDiscussNumbers: 123456,
                groupImage: require('../../assets/movie/1.jpg'),
                groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
              },
              {
                groupName: "豆瓣动漫小组",
                groupPersonNumbers: 123456,
                groupDiscussNumbers: 123456,
                groupImage: require('../../assets/movie/2.jpg'),
                groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
              },
              {
                groupName: "豆瓣动漫小组",
                groupPersonNumbers: 123456,
                groupDiscussNumbers: 123456,
                groupImage: require('../../assets/movie/3.jpg'),
                groupIntro: "这是关于电影的小组，欢迎大家加入讨论",
              }
            ]
      },
      updateReviews(){
        this.reviews = [
                
                {
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
                },
                {
                id: 2,
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
                },
                {
                id: 3,
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
                },

            ]
      }
    },
    mounted(){
      this.updateVideo();
      this.updateReviews();
      this.updateGroups();
      this.updateTopics();
      // this.login();
      // this.sendData();
    }
}
</script>

<style scoped>
.brief{
  text-align: left;
}
.group-card-container{
  display: flex; 
  flex-wrap: wrap;
  justify-content: center;
}
.topic-card-container{
  display: flex; 
  flex-wrap: wrap;
  justify-content: center;
}
 .el-row {
    margin-bottom: 20px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .container{
    margin: 0 auto;
    width: 75%;
    background-color: white;
    padding: 10px;
  }  
  .video-name{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .video-time{
    color: grey;
    font-size: 15px;
    font-weight: bold;
  }
  .clearfix::after {
            content: "";
            clear: both;
            display: block;
        }
  .rate{
    font-size: 24px;
    font-weight: bold;
  }
  .left-content{
    text-align: left;
  }
  .section-title{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .right-section-title{
    font-size: 25px;
    font-weight: bold;
  }
  .brief-content{
    font-size: 18px;
    margin-bottom: 10px;
    text-align: justify
  }
  ul li{
    font-size: 18px;
    margin-bottom: 10px;
  }
  ul li span{
    font-weight: bold;
  }
  .rate-board{
    border-left: 1px solid lightgrey; 
    border-top: 0; 
    border-right: 0; 
    border-bottom: 0;
  }
  .topic{
    margin-top: 10px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .photo-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .photo-item {
    flex: 1;
    object-fit: cover;
    object-position: center;
    width: 100px;
    height: 150px;
    margin: 5px;
  }
</style>