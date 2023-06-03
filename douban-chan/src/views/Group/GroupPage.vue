<template>
    <div class="group-backgroud-container">
        <div class="group-main-container">

            <!-- 小组简介头栏 -->
            <div class="group-header-container">
                <!-- 背景头图 -->
                <img :src="groupInfo.groupHeadBgUrl" class="header-background-image" />

                <!-- 小组头像 -->
                <img :src="groupInfo.groupAvatarImgUrl" class="group-header-avatar" />

                <!-- 小组名称 -->
                <div class="group-header-name header-blur-container">
                    {{ groupInfo.groupName }}
                </div>

                <!-- 小组下部信息 -->
                <div class="group-header-intro-container header-blur-container"></div>
                <!-- 小组简介 -->
                <div class="group-header-intro header-blur-container">
                    <div class="group-header-introbox">{{ groupInfo.groupIntro }}</div>
                </div>

                <!-- 小组帖子数 -->
                <div class="group-header-postn header-blur-container">
                    {{ '帖子 | ' + groupInfo.groupPostNumber }}
                </div>
                <!-- 小组关注数 -->
                <div class="group-header-follown header-blur-container">
                    {{ '关注 | ' + groupInfo.groupFollowNumber }}
                </div>

                <!-- 小组右侧关注按钮和申请管理员按钮 -->
                <div class="group-header-button-group">
                    <button :class="joinButtonClass" @click="joinGroup">{{ groupInfo.userInGroup ? '退出' : '关注' }}</button>
                    <button :class="applyButtonClass" @click="applyForAdmin">{{ groupInfo.userIsAdmin ? '解除管理员' : '申请管理员' }}</button>
                </div>
            </div>

            <!-- 二级导航菜单 -->
            <el-menu :default-active="activeIndex" class="sec-nav" mode="horizontal" @select="handleSelect"
                active-text-color="#FC5B81">
                <el-menu-item index="groupPostList">看帖</el-menu-item>
                <el-menu-item index="groupGoodPostList">精华</el-menu-item>
                <el-menu-item index="groupTopicList">小组话题</el-menu-item>
                <el-menu-item index="groupIntro">小组简介</el-menu-item>
            </el-menu>

            <!-- 当前页面展示内容 -->
            <!-- 对于默认路由 应该直接传递进postList作为参数 -->
            <div class="group-content-container">
                <router-view :postList="inPostList"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'GroupPage',
    components: {

    },
    data() {
        return {
            activeIndex: 'groupPostList',
            groupInfo: {
                groupHeadBgUrl: require("../../assets/user-bg-2.jpg"),
                groupAvatarImgUrl: require("../../assets/group-avatar-1.jpg"),
                groupName: '我是小组名称',
                groupIntro: '我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介。',
                groupFollowNumber: 165949,
                groupPostNumber: 49526148,
                userInGroup: true,
                userIsAdmin: false,
                //小组标签
                tagList: ['生活', '文化'],
                //小组成员列表
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


            // 帖子列表
            // 帖子列表信息
            postList: [
                {
                    postId: 'p001',
                    lzId: '004',    //发帖人id
                    lzName: "bochi",    //发帖人昵称
                    lzImageUrl: require('../../assets/user-image-7.jpg'),   //发帖人头像路径
                    date: '2023-5-19 23:57',    //发帖时间
                    title: "我发游戏，你来打分",    //帖子标题
                    text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",//帖子1楼内容
                    postImageUrlList: [require('../../assets/group-img-3.png'),//帖子1楼图片
                    require('../../assets/group-img-4.png'),
                    require('../../assets/group-img-5.jpg')],
                    topic: '游戏',//帖子所属的话题
                    topicId: 't001',//帖子所属的话题的id
                    visits: 946126,//帖子的浏览量
                    fav: 15612,//帖子的收藏数
                    comments: 1692,//帖子的评论数
                    like: 214512,//帖子的点赞数
                    dislike: 456,//帖子的点踩数
                    isTopped: true,//帖子在当前小组内是否置顶
                    isGoodPost: false,//帖子在当前小组内是否是精华帖
                    //如果该帖子不来自于一个小组 那么下面的字段均填 ''
                    groupName: 'Game', //来自的小组的名称
                    groupId: 'ofokowfjdowjdowj',//来自的小组的id
                },
                {
                    postId: 'p002',
                    lzId: '001',
                    lzName: "羽毛笔",
                    lzImageUrl: require('../../assets/user-image-1.jpg'),
                    date: '2023-5-19 23:11',
                    title: "理性讨论 软件工程基础和OS哪一个更精品",
                    text: "压到真题了，主人奴隶问题：三个主人十个奴隶，在交易市场，主人可以通过窗口写入购买协议，奴隶可以查阅，请完成该问题的同步与互斥问题（基于异性主人奴隶问题的简化，无需性别互斥）",
                    postImageUrlList: [require('../../assets/user-bg-3.jpg'), require('../../assets/group-img-2.jpg'),],
                    topic: 'BUAA',
                    topicId: 't002',//帖子所属的话题的id
                    visits: 5959261,
                    fav: 20200,
                    comments: 692,
                    like: 59412,
                    dislike: 59,
                    isTopped: false,
                    isGoodPost: true,
                    //如果该小组不来自于一个小组 那么下面的字段均填 ''
                    groupName: 'BUAA', //来自的小组的名称
                    groupId: '111111',//来自的小组的id
                },
                {
                    lzId: '002',
                    lzName: "Chino",
                    lzImageUrl: require('../../assets/user-image-8.jpg'),
                    date: '2023-5-02 22:47',
                    title: "黑坤巴精神",
                    text: "回来吧科比黑曼巴，我最骄傲的信仰，历历在目的球场，眼泪莫名在流淌，🤙依稀记得24🤙，🧟还有给力的八号🧟，把对手全都给打退，🚁就算坠机也不死🚁",
                    postImageUrlList: [require('../../assets/group-img-6.jpg'), require('../../assets/group-img-7.jpg')],
                    topic: '科比',
                    topicId: 't003',//帖子所属的话题的id
                    visits: 59515,
                    fav: 642,
                    comments: 41,
                    like: 595,
                    dislike: 0,
                    isTopped: false,
                    isGoodPost: false,
                    //如果该小组不来自于一个小组 那么下面的字段均填 ''
                    groupName: '黑坤巴', //来自的小组的名称
                    groupId: 'laodalaoda',//来自的小组的id
                },
            ],
        }
    },
    methods: {
        joinGroup() {
            this.groupInfo.userInGroup = !this.groupInfo.userInGroup
        },
        applyForAdmin() {
            this.groupInfo.userIsAdmin = !this.groupInfo.userIsAdmin
        },
        //选中二级导航栏
        handleSelect(index) {
            this.activeIndex = index
            // 看帖
            if (this.activeIndex == 'groupPostList') {
                this.$router.push({
                    name: 'group',
                })
            }
            // 精华帖
            else if (this.activeIndex == 'groupGoodPostList') {
                console.log('试图访问精华帖，当前精华帖列表：', this.getGoodPostList())
                this.$router.push({
                    name: 'group',
                })
            }
            else {
                this.$router.push({
                    name: index,
                })
            }
        },
        // 返回精华帖列表
        getGoodPostList() {
            let goodPostList = []
            for (let post of this.postList) {
                if (post.isGoodPost) {
                    goodPostList.push(post)
                }
            }
            return goodPostList
        }
    },
    computed: {
        //头像路径与用户名
        //引入vuex的userAbout模块里的 state变量
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),

        joinButtonClass() {
            return this.groupInfo.userJoined ? 'group-header-button-selected' : 'group-header-button-unselected';
        },
        applyButtonClass() {
            return this.groupInfo.userIsAdmin ? 'group-header-button-selected' : 'group-header-button-unselected';
        },
        //要传递的帖子列表
        inPostList() {
            if (this.activeIndex == 'groupPostList') {
                return this.postList.slice()
            }
            else if (this.activeIndex == 'groupGoodPostList') {
                return this.getGoodPostList()
            }
            else {
                return []
            }
        },
        //     'g_id': self.g_id,
        //     'g_name': self.g_name,
        //     'g_description': self.g_description,
        //     'g_create_time': self.g_create_time.__str__(),
        //     'g_last_modify_time': self.g_last_modify_time.__str__(),
        //     'g_users_num': self.g_users_num
        // }
        //     if self.g_profile_photo is not None:
        //     re['g_profile_photo'] = self.g_profile_photo.p_content.url
        // 从后端获取小组信息
        getGroupInfoOnline() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    g_id: 1
                }),
                url: "/media/query_single/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    this.item = res.data.media;
                    if (this.item.m_profile_photo !== "") {
                        this.item.m_profile_photo = this.$axios.defaults.baseURL + this.item.m_profile_photo;		//这里是对图片的url进行拼接，地址是ip地址+端口号+接收到的url，html中就可以直接使用该url
                        console.log(this.item.m_profile_photo)
                    }
                })
                .catch((err) => {
                    this.$message({
                        type: "error",
                        message: "网络出错QAQ",
                    });
                });
        },
        getPostListOnline() {

        },
        sendData() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    username: 'adk',
                    password1: "111",
                    password2: "111"
                }),
                url: "/user/register/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    this.item = res.data;
                })
                .catch((err) => {
                    this.$message({
                        type: "error",
                        message: "网络出错QAQ",
                    });
                });
        }
    },
    mounted() {
        // 监听PostCreateBar的创建帖子事件，在事件回调中将新帖子添加到列表
        this.$bus.$on('postCreated', (newPost) => {
            this.postList.push(newPost);
            console.log('用户发帖成功：', newPost)
        });
        console.log('GroupPage已挂载事件postCreated监听');

        // 从后端获取数据
        this.getGroupInfoOnline()

    },
}
</script>

<style scoped>
.sec-nav {
    font-size: 18px;
    font-weight: 700;
}

.group-backgroud-container {
    background-color: #FCF7F9;
}

.group-main-container {
    background-color: #FCF7F9;
    margin: 0 auto;
    width: 75%;
}

.group-header-container {
    position: relative;
    border-radius: 5px;
    width: 100%;
    height: 350px;
}

/* 小组头图 */
.header-background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 小组头像 */
.group-header-avatar {
    position: absolute;
    left: 15px;
    bottom: 15px;
    width: 150px;
    height: 150px;
    border-radius: 2px;
    margin-right: 10px;
    /* 边框 */
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    z-index: 5;
}

/* 模糊背景 */
.header-blur-container {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    background-color: rgba(250, 250, 250, 0.6);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
}

/* 小组名称 */
.group-header-name {
    position: absolute;
    left: 190px;
    bottom: 85px;
    border-radius: 5px;
    padding: 3px 20px 3px 20px;
    /* 字体 */
    font-size: 28px;
    font-weight: bold;
    color: rgba(5, 5, 5, 0.9);
}

/* 小组简介的外容器 */
.group-header-intro-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40%;
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: 0;
}

/* 小组简介 */
.group-header-intro {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    width: 85%;
    left: 190px;
    bottom: 12px;
    border-radius: 5px;
    height: 55px;
    background-color: rgba(240, 240, 240, 0.5);
}

.group-header-introbox {
    margin-left: 2%;
    margin-right: 300px;
    text-align: left;
    /* width: 75%; */
    /* 字体 */
    font-size: 14px;
    color: rgba(5, 5, 5, 0.9);
}

/* 小组关注数 */
.group-header-follown {
    /* 位置 */
    position: absolute;
    right: 20px;
    bottom: 21px;
    border-radius: 5px;
    /* 高度 */
    height: 34px;
    /* 背景 边界 阴影 */
    background-color: rgba(255, 249, 249, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    padding: 5px;
    /* 字体 */
    font-size: 14px;
    color: rgba(49, 49, 49, 0.9);
}

/* 小组帖子数 */
.group-header-postn {
    position: absolute;
    right: 140px;
    bottom: 21px;
    border-radius: 5px;
    height: 34px;
    /* 背景 边界 阴影 */
    background-color: rgba(255, 249, 249, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    padding: 5px;
    /* 字体 */
    font-size: 14px;
    color: rgba(49, 49, 49, 0.9);
}

.group-header-button-group {
    /* 弹性布局 设置子按钮的位置 */
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;

    /* 在父元素的位置 */
    position: absolute;
    right: 15px;
    bottom: 100px;
    border-radius: 5px;
    height: 24px;
}


.group-header-button-selected {
    /* 背景 边界 阴影 */
    background-color: rgb(254, 224, 224, 0.8);
    border: 2px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 7px;
    margin: 10px;
    /* 字体 */
    font-size: 14px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.group-header-button-unselected {
    /* 背景 边界 阴影 */
    background-color: rgba(252, 236, 236, 0.6);
    border: 2px solid rgba(252, 231, 231, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 7px;
    margin: 10px;
    /* 字体 */
    font-size: 14px;
    font-weight: 700;
    color: rgba(49, 49, 49, 0.9);
    /* 手型 */
    cursor: pointer;
}

.group-header-button-unselected:hover,
.group-header-button-selected:hover {
    background-color: rgba(255, 158, 158, 0.8);
    border: 2px solid rgba(253, 160, 160, 0.8);
}

.group-content-container {
    background-color: rgb(255, 255, 255);
    margin: 0 auto;
    margin-top: 20px;
}
</style>