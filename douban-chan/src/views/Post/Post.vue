<!-- 帖子页面 -->
<template>
    <div class="post-main-container">
        <!-- 顶栏 -->
        <div class="post-top-container">
            <!-- 功能部分 -->
            <div class="post-top-option-container">
                <!-- 左侧 -->
                <!-- 排序部分 -->
                <PostSortLabel></PostSortLabel>
                <!-- 只看楼主 -->
                <OnlySelectButton class="post-OnlyLz-button" labelName="楼主" eventName="setOnlyLz"></OnlySelectButton>
                <!-- 右侧 -->
                <!-- 来自小组 和 举报按钮 -->
                <div class="postcard-buttongroup">
                    <PostTopicButton :info="{ topic: postInfo.topic }"></PostTopicButton>
                    <PostReportButton></PostReportButton>
                </div>
            </div>
            <!-- 标题部分 -->
            <div class="post-top-title-container">
                <div class="post-top-title">
                    {{ postInfo.title }}
                </div>
            </div>
        </div>

        <!-- 楼层列表 -->
        <div class="postlist-container">
            <PostFloor v-for="floor in activeFloorList" :key="floor.textId" :info="floor"
                :lz="floor.userId == postInfo.lzId" :post="postInfo"></PostFloor>
        </div>

        <!-- 右下角悬浮框 -->
        <!-- 回帖悬浮框 -->
        <PostReplyBar :postInfo="postInfo" class="post-replybar"></PostReplyBar>
        <!-- 点赞点踩收藏悬浮框 -->
        <LikeFavButtonGroup :info="postInfo" class="post-likefav-buttongroup"></LikeFavButtonGroup>
        <!-- 滚动至顶部 -->
        <ScrollToTopButton class="post-likefav-scrollbutton"></ScrollToTopButton>

        <!-- 内容填充 -->
        <!-- <div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>

            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
        </div> -->
    </div>
</template>

<script>
import PostSortLabel from '@/components/post/PostSortLabel.vue'
import OnlySelectButton from '@/components/post/button/OnlySelectButton.vue'
import PostReportButton from '@/components/post/button/PostReportButton.vue';
import PostTopicButton from '@/components/post/button/PostTopicButton.vue';
import PostFloor from '@/components/post/PostFloor.vue';
import PostReplyBar from '@/components/post/PostReplyBar.vue';
import LikeFavButtonGroup from '@/components/post/button/LikeFavButtonGroup.vue';
import ScrollToTopButton from '@/components/post/button/ScrollToTopButton.vue';

export default {
    name: 'Post',
    components: {
        PostSortLabel,
        OnlySelectButton,
        PostTopicButton,
        PostReportButton,
        PostFloor,
        PostReplyBar,
        LikeFavButtonGroup,
        ScrollToTopButton,
    },
    methods: {
        // 向楼层列表里加入楼中楼回复
        insertCommentIntoFloor(newReply, textId) {
            for (let floor of this.floorList) {
                if (floor.textId === textId) {
                    floor.childFloorList.push(newReply)
                    console.log('楼层被回复：', textId)
                    break;
                }
            }
        },
        // 向楼层列表里加入回复
        insertFloorIntoFloor(newReply) {
            // 注意：在此加入楼层信息
            newReply.floor = this.floorList.length + 1
            this.floorList.push(newReply)
        },
    },
    computed: {

        //筛选出当前的列表内容和顺序
        activeFloorList() {
            let list = this.floorList

            //只看楼主
            if (this.onlyLz) {
                list = this.floorList.filter(item => {
                    return item.userId == this.postInfo.lzId
                })
            }
            //热度排序 除1楼外，点赞数大的在前面
            if (this.activeLabel === 1) {
                list = list.slice(1)
                list.sort((a, b) => {
                    return b.like - a.like
                }).unshift(this.floorList[0])
            }
            //时间排序 时间小的在前面
            else if (this.activeLabel === 2) {
                list.sort((a, b) => {
                    return a.date - b.date
                })
            }
            console.log(list)
            return list
        },
    },
    data() {
        return {
            // 是否只看楼主
            onlyLz: false,
            // 当前排序方式 1热度 2时间
            activeLabel: 1,

            postInfo: {
                postId: 'p001',
                lzId: '004',
                lzName: "bochi",
                lzImageUrl: require('../../assets/user-image-7.jpg'),
                date: '2023-5-19 23:06',
                title: "我发游戏，你来打分",
                text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
                postImageUrlList: [require('../../assets/group-img-3.png'),
                require('../../assets/group-img-4.png'),
                require('../../assets/group-img-5.jpg')],
                topic: '游戏',
                visits: 946126,
                fav: 15612,
                comments: 1692,
                like: 12366,
                dislike: 456,
                isTopped: true,
                isGoodPost: false,
            },
            floorList: [
                {
                    textId: 'f001',
                    floor: 1,
                    userId: '004',
                    userName: "bochi",
                    userImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:06',
                    text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
                    imageUrlList: [require('../../assets/group-img-3.png'),
                    require('../../assets/group-img-4.png'),
                    require('../../assets/group-img-5.jpg')],
                    comments: 3,
                    like: 1452,
                    dislike: 45,
                    childFloorList: [
                        {
                            textId: 'fr003',
                            userId: '003',
                            userName: "_Karasu_",
                            userImageUrl: require('../../assets/user-image-6.jpg'),
                            date: '2023-5-22 12:08',
                            text: "“你是哪个省的?”男孩沉思他当然知道省的意义。但思绪在飞速演算，省作为人类文明的单位又存在了多久呢?从罗马帝国的行省到今日的联邦和省市划分，站在人类历史望去，省的存在只是短暂的一瞬，当万年后的人类建立银河帝国时，省还会存在吗?从卡米特星云到室女座超星系团，当人类文明沿着群星，逐步建立了庞大的人类帝国时，追寻起源已经没有什么意义，只有作为生物的繁衍纽带－母子关系还能够证明银河公民的身份吧。“妈妈生的。”",
                            like: 1595,
                            dislike: 0,
                        },
                        {
                            textId: 'fr001',
                            userId: '001',
                            userName: "羽毛笔",
                            userImageUrl: require('../../assets/user-image-1.jpg'),
                            date: '2023-5-19 23:07',
                            text: "“太好啦！太好啦！”听妈妈说，我家的电脑可以上网了。我情不自禁地欢呼起来。电脑网络这个新鲜玩意儿，到底是怎样的呢？爸爸告诉我，电脑网络如同一个遍布全球的蜘蛛网，把每个国家、每座城市甚至每个家庭都连在了一起。进入网络，就好像跨上了信息高速路。可以迅速找到所需要的各种信息，可以用电子信箱和全世界的小朋友建立联系，还可以进行网上购物。有了网络，五湖四海的人随时可以交流，咱们的地球就变成了一个小村庄。网络真的这么神奇？我带着好奇心，迫不及待地叫妈妈打开电脑，进入一个卡通网站，不一会儿，孙悟空出现在电脑屏幕上。我目不转睛地盯着屏幕，米老鼠、唐老鸭、花木兰、黑猫警长，都笑眯眯地看着我，还伴着音乐做着各种有趣的动作。“真神了！”我不由得赞叹起来。妈妈还带我访问了其他一些网站，里面的内容太丰富了：有体育新闻，有动物天地，有科技博览，还有音乐欣赏……真是应有尽有。我感到地球一下子变小了，知识的大门向我敞开了。妈妈还教我发电子邮件。我试着给远在国外的表姐发了一个贺卡。站在一旁的爸爸对我说：“过去寄一封信，对方要好几天才能收到，多慢啊！现在发一个电子邮件，对方几秒钟就能收到，真快啊！”妈妈说：“是呀，发电子邮件还能节约纸张、保护环境呢！”我恋恋不舍地下了网，心思还在那新奇的网络世界里！爸爸说：“今天用到的，只是网络功能的一点点，网络还有很多很多用处呢！”我听了更加喜欢这个新朋友了。",
                            like: 56,
                            dislike: 1,
                        },
                        {
                            textId: 'fr002',
                            userId: '002',
                            userName: "Chino",
                            userImageUrl: require('../../assets/user-image-8.jpg'),
                            date: '2023-5-19 23:08',
                            text: "打个郊县",
                            like: 6,
                            dislike: 1,
                        },
                    ],
                },
                {
                    textId: 'f000',
                    floor: 2,
                    userId: '003',
                    userName: "_Karasu_",
                    userImageUrl: require('../../assets/user-image-6.jpg'),
                    date: '2023-5-19 23:07',
                    text: "长官，我们把二楼拿下来了",
                    imageUrlList: [require('../../assets/post-img-8.jpg'),
                    require('../../assets/post-img-9.jpg')],
                    comments: 2,
                    like: 142,
                    dislike: 0,
                    childFloorList: [
                        {
                            textId: 'fr004',
                            userId: '001',
                            userName: "羽毛笔",
                            userImageUrl: require('../../assets/user-image-1.jpg'),
                            date: '2023-5-19 23:08',
                            text: "好，奖励艾草",
                            like: 51,
                            dislike: 0,
                        },
                    ],
                },
                {
                    textId: 'f002',
                    floor: 3,
                    userId: '004',
                    userName: "bochi",
                    userImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:10',
                    text: "1.明日方舟",
                    imageUrlList: [require('../../assets/post-img-3.jpg'),
                    require('../../assets/post-img-4.jpg'),
                    require('../../assets/post-img-5.jpg')],
                    comments: 2,
                    like: 4201,
                    dislike: 461,
                    childFloorList: [
                        {
                            textId: 'fr004',
                            userId: '001',
                            userName: "羽毛笔",
                            userImageUrl: require('../../assets/user-image-1.jpg'),
                            date: '2023-5-19 23:07',
                            text: "5，这个真的是我跌",
                            like: 975,
                            dislike: 15,
                        },
                        {
                            textId: 'fr005',
                            userId: '002',
                            userName: "Chino",
                            userImageUrl: require('../../assets/user-image-8.jpg'),
                            date: '2023-5-19 23:08',
                            text: "1，感觉不如原神",
                            like: 529,
                            dislike: 47,
                        },
                    ],
                },
                {
                    textId: 'f003',
                    floor: 4,
                    userId: '004',
                    userName: "bochi",
                    userImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:30',
                    text: "2.原神。呦西 鉴于你在上网赞扬原神，经本院初步审理，你的行为爱国。米哈游第一警视厅颁发奖金500万円拒领取赏款就处以圣遗物全融刑，发放政治权利终身并且你的手机通讯录联系人都会受到5-10w不等的爱国奖金。请你收到本短信本短信后务必尽快领取奖金。不然本院将于明日中午，安排自卫队对你住所进行装修。",
                    imageUrlList: [require('../../assets/post-img-6.jpg'),
                    require('../../assets/post-img-7.jpg')],
                    comments: 2,
                    like: 6431,
                    dislike: 457,
                    childFloorList: [
                        {
                            textId: 'fr006',
                            userId: '001',
                            userName: "羽毛笔",
                            userImageUrl: require('../../assets/user-image-1.jpg'),
                            date: '2023-5-19 23:07',
                            text: "5，最喜欢的游戏",
                            like: 123,
                            dislike: 0,
                        },
                        {
                            textId: 'fr007',
                            userId: '002',
                            userName: "Chino",
                            userImageUrl: require('../../assets/user-image-8.jpg'),
                            date: '2023-5-19 23:08',
                            text: "5，曾经有教育家做了一个实验，让中国孩子和日本孩子探索有瘴气的山洞。日本小孩从小玩《塞尔达传说:王国之泪》，一进洞就点燃火把，结果爆炸至死。而聪明的中国孩子因为玩过《原神》，立马就从背包里掏出发光的流明石来照明，最终顺利通关。",
                            like: 695,
                            dislike: 9,
                        },
                        {
                            textId: 'fr008',
                            userId: '003',
                            userName: "待兼诗歌剧",
                            userImageUrl: require('../../assets/user-image-9.jpg'),
                            date: '2023-5-22 3:38',
                            text: "客观来讲3.5吧，能玩。最新通知:五一劳动节期间，要求所有人将电脑上的Steam、Origin、 Epic等游戏平台卸载，所有的PS、Xbox、Switch 全部就地销毁，并于五一假期前 下载并安装米哈游自主研发的全新开放世界冒险游戏《原神》，已下载的全部更新到最新版本。要求:1.充值大月卡，自愿充值，应冲尽冲:2.等级升到60级，自愿升级，应升尽升;3.假期期间至少180抽，自愿抽卡，应抽尽抽。收到请回复。",
                            like: 361,
                            dislike: 1,
                        },
                    ],
                },
                {
                    textId: 'f004',
                    floor: 5,
                    userId: '002',
                    userName: "Chino",
                    userImageUrl: require('../../assets/user-image-8.jpg'),
                    date: '2023-5-19 23:19',
                    text: "第一章《天生废材的我误入了超级大国》第二章《好客的大学》第三章《三美女陪同倒贴测》第四章《高额奖学金随便送》第五章《生好多孩子送不完》第六章《黑龙也是龙》番外《该滚的是你们吧》",
                    imageUrlList: [require('../../assets/favlist-2.jpg'),
                    require('../../assets/favlist-3.png'),
                    require('../../assets/user-image-3.jpg')],
                    comments: 2,
                    like: 4231,
                    dislike: 54,
                    childFloorList: [
                        {
                            textId: 'fr003',
                            userId: '003',
                            userName: "_Karasu_",
                            userImageUrl: require('../../assets/user-image-6.jpg'),
                            date: '2023-5-22 12:08',
                            text: "终章《发生交火，我无法呼吸？！》",
                            like: 11255,
                            dislike: 4,
                        },
                        {
                            textId: 'fr008',
                            userId: '003',
                            userName: "待兼诗歌剧",
                            userImageUrl: require('../../assets/user-image-9.jpg'),
                            date: '2023-5-22 3:38',
                            text: "谴责肖万→理解肖万→同情肖万→敬佩肖万→感激肖万→肖万，黑膝铠甲，合体。",
                            like: 745,
                            dislike: 41,
                        },
                    ],
                },
            ]
        }
    },
    mounted() {
        //监听“只看楼主”改变的事件
        this.$bus.$on('setOnlyLz', (onlyLz) => {
            this.onlyLz = onlyLz
            console.log('是否筛选楼主发言已修改', onlyLz)
        })
        console.log('已经挂载setOnlyLz事件的监听')

        // 监听PostSortLabel的改变排序方式事件，重新加载postList
        this.$bus.$on('sortChanged', (index) => {
            this.activeLabel = index;
            console.log('排序方式已经改变：', index)
        })
        console.log('PostCardList已挂载事件sortChanged监听');

        // 监听CommentReplyInputBox的创建回复事件，在事件回调中向服务器发送请求
        this.$bus.$on('commentReplyCreated', (newReply, textId) => {
            this.insertCommentIntoFloor(newReply, textId)
        })

        // 监听PostReplyInputBox的创建回复事件，在事件回调中向服务器发送请求
        this.$bus.$on('postReplyCreated', (newReply) => {
            this.insertFloorIntoFloor(newReply)
        })
    },
    beforeDestroy() {
        //卸载监听
        this.$bus.$off('setOnlyLz')
        this.$bus.$off('sortChanged')
    },
}
</script>

<style scoped>
/* 顶栏sticky部分容器 */
.post-top-container {
    position: sticky;
    top: 60px;
    background-color: rgb(255, 255, 255);
    z-index: 10;
}

/* 选项横条容器 */
.post-top-option-container {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: center;
    margin: 10px;
}

/* 标题横条容器 */
.post-top-title-container {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-items: center;
    margin: 0 40px 0 40px;
    background-color: rgb(254, 223, 223);
    height: 40px;
}

/* 帖子标题 */
.post-top-title {
    font-size: 20px;
    font-weight: 600;
    color: rgb(63, 63, 63);
    margin-left: 17px;
}

/* 只看楼主 */
.post-OnlyLz-button {
    margin: 2px 7px 0 7px;
}

/* 顶栏按钮组 */
.postcard-buttongroup {
    position: absolute;
    top: 1px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

/* 帖子列表的容器 */
.postlist-container {
    margin: 0 40px;
    background-color: rgb(255, 249, 249);
}

/* 右下角回帖按钮 */
.post-replybar {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

/* 右下角悬浮按钮组 */
.post-likefav-buttongroup {
    position: fixed;
    bottom: 150px;
    right: 20px;
}

.post-likefav-scrollbutton {
    position: fixed;
    bottom: 350px;
    right: 20px;
}
</style>