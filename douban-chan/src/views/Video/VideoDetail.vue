<template>
    <div class="container">
        <div style="background-color: grey; height: 100px">
          导航类空白
        </div>
        <div>
          <div style="text-align: left; margin-bottom: 15px">
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
            <ReviewSection title="影评" v-on:reply="popWriteReview"></ReviewSection>

            

          </div></el-col>
          <el-col :span="6" class="right-side"><div>
            <div class="">
              <div class="right-section-title">
                相关的小组
              </div>
              <div class="group-card-container">
                <GroupCard v-for="(groupItem, index) in this.recommendGroups" :key="index" :groupItem="groupItem"></GroupCard>
              </div>
              <div class="right-section-title topic">
                相关的话题
              </div>
              <div class="topic-card-container">
                <TopicCard :topicItems="recommendTopics"></TopicCard>
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

        <el-dialog :visible.sync="showEditorDialog" title="" width="75%" :close-on-click-modal="false" :lockScroll="false">
           <VideoEditor :videoItem="this.item"></VideoEditor>
        </el-dialog>


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
export default {
    components: {
      ReviewSection, ItemInfo, Rate, GroupCard, TopicCard, VideoEditor
    },
    name: 'VideoDetail',
    data(){
        return {
            showEditorDialog: false,
            //上传图片相关
            imageUrl: '',
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            uploadFiles: [],
            item:{
                id: 0,
                name: '肖申克的救赎',
                onDate: '2008-08-08',
                rating: 8.8,
                lastTime: '2h14m',
                imageSrc: "http://127.0.0.1:8000/images/avatar.webp",
                images: [require('../../assets/movie/roll-banner1.jpg'),require('../../assets/movie/roll-banner1.jpg'),
                require('../../assets/movie/roll-banner1.jpg'),require('../../assets/movie/roll-banner1.jpg')],
                category: ['剧情','犯罪'],
                brief: "战斗中负伤而下身瘫痪的前海军战士杰克·萨利（萨姆·沃辛顿 Sam Worthington 饰）决定替死去的同胞哥哥来到潘多拉星操纵格蕾丝博士（西格妮·韦弗 Sigourney Weaver 饰）用人类基因与当地纳美部族基因结合创造出的 “阿凡达” 混血生物。杰克的目的是打入纳美部落，外交说服他们自愿离开世代居住的家园，从而SecFor公司可砍伐殆尽该地区的原始森林，开采地下昂贵的“不可得”矿。在探索潘多拉星的过程中，杰克遇到了纳美部落的公主娜蒂瑞（佐伊·索尔达娜 Zoe Saldana 饰），向她学习了纳美人的生存技能与对待自然的态度。与此同时，SecFor公司的经理和军方代表上校迈尔斯（史蒂芬·朗 Stephen Lang 饰）逐渐丧失耐心，决定诉诸武力驱赶纳美人……\n本片采用3D技术拍摄，共耗资5亿美元制作发行，是电影史上最为昂贵的作品。本片荣获第82届奥斯卡最佳摄影、最佳视觉效果、最佳艺术指导等3项大奖。",
                director: "窝使莎比",
                writer: "軟功狗市",
                actor: ["阿里大健康","啊都说了副科级", "阿斯顿发"],
                country: "中国",
                language: "汉语",
            },
            recommendTopics:[
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
            ],
            recommendGroups:[
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
        }
    },
    methods: {
      popWriteReview(){
            this.showEditorDialog = true;
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
    },
    mounted(){
      this.login();
      // this.sendData();
    }
}
</script>

<style scoped>
.right-side{
  left: 1000px;
  top: 100px;
  position: fixed;
}
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
</style>