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
                <OnlyLzButton class="post-OnlyLz-button"></OnlyLzButton>
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
            <PostFloor v-for="(floor, index) in floorList" :key="index" :info="floor" :floorNum="index + 1"></PostFloor>
        </div>

        <!-- 内容填充 -->
        <div>
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
        </div>


    </div>
</template>

<script>
import PostSortLabel from '@/components/post/PostSortLabel.vue'
import OnlyLzButton from '@/components/post/button/OnlyLzButton.vue'
import PostReportButton from '@/components/post/button/PostReportButton.vue';
import PostTopicButton from '@/components/post/button/PostTopicButton.vue';
import PostFloor from '@/components/post/PostFloor.vue';

export default {
    name: 'Post',
    components: {
        PostSortLabel,
        OnlyLzButton,
        PostTopicButton,
        PostReportButton,
        PostFloor,
    },
    data() {
        return {
            onlyLz: false,

            postInfo: {
                postId: 'p001',
                lzId: '004',
                lzName: "JDG-knight",
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
                isQualityPost: false,
            },
            floorList: [
                {
                    textId: 1,
                    userId: '004',
                    userName: "JDG-knight",
                    userImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:06',
                    text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
                    imageUrlList: [require('../../assets/group-img-3.png'),
                    require('../../assets/group-img-4.png'),
                    require('../../assets/group-img-5.jpg')],
                    comments: 2,
                    like: 1452,
                    dislike: 45,
                    childFloorList: [
                        {
                            textId: 1001,
                            userId: '001',
                            userName: "羽毛笔",
                            userImageUrl: require('../../assets/user-image-1.jpg'),
                            date: '2023-5-19 23:07',
                            text: "“太好啦！太好啦！”听妈妈说，我家的电脑可以上网了。我情不自禁地欢呼起来。电脑网络这个新鲜玩意儿，到底是怎样的呢？爸爸告诉我，电脑网络如同一个遍布全球的蜘蛛网，把每个国家、每座城市甚至每个家庭都连在了一起。进入网络，就好像跨上了信息高速路。可以迅速找到所需要的各种信息，可以用电子信箱和全世界的小朋友建立联系，还可以进行网上购物。有了网络，五湖四海的人随时可以交流，咱们的地球就变成了一个小村庄。网络真的这么神奇？我带着好奇心，迫不及待地叫妈妈打开电脑，进入一个卡通网站，不一会儿，孙悟空出现在电脑屏幕上。我目不转睛地盯着屏幕，米老鼠、唐老鸭、花木兰、黑猫警长，都笑眯眯地看着我，还伴着音乐做着各种有趣的动作。“真神了！”我不由得赞叹起来。妈妈还带我访问了其他一些网站，里面的内容太丰富了：有体育新闻，有动物天地，有科技博览，还有音乐欣赏……真是应有尽有。我感到地球一下子变小了，知识的大门向我敞开了。妈妈还教我发电子邮件。我试着给远在国外的表姐发了一个贺卡。站在一旁的爸爸对我说：“过去寄一封信，对方要好几天才能收到，多慢啊！现在发一个电子邮件，对方几秒钟就能收到，真快啊！”妈妈说：“是呀，发电子邮件还能节约纸张、保护环境呢！”我恋恋不舍地下了网，心思还在那新奇的网络世界里！爸爸说：“今天用到的，只是网络功能的一点点，网络还有很多很多用处呢！”我听了更加喜欢这个新朋友了。",
                            like: 56,
                            dislike: 1,
                        },
                        {
                            textId: 1002,
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
                    textId: 2,
                    userId: '004',
                    userName: "JDG-knight",
                    userImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:20',
                    text: "1.明日方舟",
                    imageUrlList: [require('../../assets/post-img-3.jpg'),
                    require('../../assets/post-img-4.jpg'),
                    require('../../assets/post-img-5.jpg')],
                    comments: 2,
                    like: 6431,
                    dislike: 457,
                    childFloorList: [
                        {
                            textId: 1004,
                            userId: '001',
                            userName: "羽毛笔",
                            userImageUrl: require('../../assets/user-image-1.jpg'),
                            date: '2023-5-19 23:07',
                            text: "5，这个真的是我跌",
                            like: 975,
                            dislike: 15,
                        },
                        {
                            textId: 1005,
                            userId: '002',
                            userName: "Chino",
                            userImageUrl: require('../../assets/user-image-8.jpg'),
                            date: '2023-5-19 23:08',
                            text: "社区魔怔程度仅次于原神，1",
                            like: 59,
                            dislike: 47,
                        },
                    ],
                },
                {
                    textId: 3,
                    userId: '004',
                    userName: "JDG-knight",
                    userImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:20',
                    text: "2.原神。妈的，忍不了，一秒把原神打开！他钟离的雷神的温迪的纳西妲的刻晴的凝光的行秋的重云的香菱的胡桃的甘雨的可莉的万叶的凌华的凌人的早柚的优菈的迪卢克的阿贝多的班尼特的宵宫的莫娜的申鹤的璃月的蒙德的稻妻的须弥的至冬的原神的都是我的嗯啊，原原原！！好好玩原原原原原原蹦蹦炸弹！拒收病婿！天理尝蛆！靖妖傩舞！烧冻鸡翅！斩尽牛杂！这是斩灭海参的力量，这是大幻梦森罗万象狂气断罪眼！这是通通火化，这是忘放孜然！神里流霜灭！别想投胎哦！裁雨留虹！无想的一刀！大原特原！大原特原！大原特原！大原特原！大原特原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！",
                    imageUrlList: [require('../../assets/post-img-6.jpg'),
                    require('../../assets/post-img-7.jpg')],
                    comments: 2,
                    like: 6431,
                    dislike: 457,
                    childFloorList: [
                        {
                            textId: 1006,
                            userId: '001',
                            userName: "羽毛笔",
                            userImageUrl: require('../../assets/user-image-1.jpg'),
                            date: '2023-5-19 23:07',
                            text: "5，最喜欢的游戏",
                            like: 123,
                            dislike: 0,
                        },
                        {
                            textId: 1007,
                            userId: '002',
                            userName: "Chino",
                            userImageUrl: require('../../assets/user-image-8.jpg'),
                            date: '2023-5-19 23:08',
                            text: "5，曾经有教育家做了一个实验，让中国孩子和日本孩子探索有瘴气的山洞。日本小孩从小玩《塞尔达传说:王国之泪》，一进洞就点燃火把，结果爆炸至死。而聪明的中国孩子因为玩过《原神》，立马就从背包里掏出发光的流明石来照明，最终顺利通关。",
                            like: 695,
                            dislike: 9,
                        },
                        {
                            textId: 1008,
                            userId: '003',
                            userName: "待兼诗歌剧",
                            userImageUrl: require('../../assets/user-image-9.jpg'),
                            date: '2023-5-22 3:38',
                            text: "100，最新通知:五一劳动节期间，要求所有人将电脑上的Steam、Origin、 Epic等游戏平台卸载，所有的PS、Xbox、Switch 全部就地销毁，并于五一假期前 下载并安装米哈游自主研发的全新开放世界冒险游戏《原神》，已下载的全部更新到最新版本。要求:1.充值大月卡，自愿充值，应冲尽冲:2.等级升到60级，自愿升级，应升尽升;3.假期期间至少180抽，自愿抽卡，应抽尽抽。收到请回复。",
                            like: 361,
                            dislike: 1,
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
    },
    beforeDestroy() {
        //卸载监听
        this.$bus.$off('setOnlyLz')
    },
}
</script>

<style scoped>
/* 顶栏sticky部分容器 */
.post-top-container {
    position: sticky;
    top: 1px;
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
</style>