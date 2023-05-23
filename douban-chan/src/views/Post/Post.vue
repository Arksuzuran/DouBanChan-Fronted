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
                <OnlyLzButton class="post-OnlyLz-button" @click="handleOnlyLz"></OnlyLzButton>
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
            <PostFloor v-for="floor in activeFloorList" :key="floor.textId" :info="floor" :lz="floor.userId == postInfo.lzId" :post="postInfo"></PostFloor>
        </div>

        <!-- 右下角悬浮框 -->
        <!-- 回帖悬浮框 -->
        <PostReplyBar :postInfo="postInfo"></PostReplyBar>
        <!-- 点赞点踩收藏悬浮框 -->
        <LikeFavButtonGroup :info="postInfo"></LikeFavButtonGroup>

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
import PostReplyBar from '@/components/post/PostReplyBar.vue';
import LikeFavButtonGroup from '@/components/post/button/LikeFavButtonGroup.vue';

export default {
    name: 'Post',
    components: {
        PostSortLabel,
        OnlyLzButton,
        PostTopicButton,
        PostReportButton,
        PostFloor,
        PostReplyBar,
        LikeFavButtonGroup,
    },
    methods: {
        handleOnlyLz() {
            this.onlyLz = !this.onlyLz
        },
        // 向楼层列表里加入楼中楼回复
        insertCommentIntoFloor(newReply, textId){
            for(let floor of this.floorList){
                if(floor.textId === textId){
                    floor.childFloorList.push(newReply)
                    console.log('楼层被回复：', textId)
                    break;
                }
            }
        },
        // 向楼层列表里加入回复
        insertFloorIntoFloor(newReply){
            newReply.floor = this.floorList.length
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
                isQualityPost: false,
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
                    comments: 2,
                    like: 1452,
                    dislike: 45,
                    childFloorList: [
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
                        {
                            textId: 'fr003',
                            userId: '003',
                            userName: "_Karasu_",
                            userImageUrl: require('../../assets/user-image-6.jpg'),
                            date: '2023-5-22 12:08',
                            text: "第一章《天生废材的我误入了超级大国》第二章《好客的大学》第三章《三美女陪同倒贴测》第四章《高额奖学金随便送》第五章《生好多孩子送不完》番外《黑龙也是龙》终章《发生交火，我无法呼吸？！》",
                            like: 1595,
                            dislike: 0,
                        }
                    ],
                },
                {
                    textId: 'f002',
                    floor: 2,
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
                            text: "社区魔怔程度仅次于原神，1",
                            like: 59,
                            dislike: 47,
                        },
                    ],
                },
                {
                    textId: 'f003',
                    floor: 3,
                    userId: '004',
                    userName: "bochi",
                    userImageUrl: require('../../assets/user-image-7.jpg'),
                    date: '2023-5-19 23:30',
                    text: "2.原神。妈的，忍不了，一秒把原神打开！他钟离的雷神的温迪的纳西妲的刻晴的凝光的行秋的重云的香菱的胡桃的甘雨的可莉的万叶的凌华的凌人的早柚的优菈的迪卢克的阿贝多的班尼特的宵宫的莫娜的申鹤的璃月的蒙德的稻妻的须弥的至冬的原神的都是我的嗯啊，原原原！！好好玩原原原原原原蹦蹦炸弹！拒收病婿！天理尝蛆！靖妖傩舞！烧冻鸡翅！斩尽牛杂！这是斩灭海参的力量，这是大幻梦森罗万象狂气断罪眼！这是通通火化，这是忘放孜然！神里流霜灭！别想投胎哦！裁雨留虹！无想的一刀！大原特原！大原特原！大原特原！大原特原！大原特原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！原！",
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
                            text: "100，最新通知:五一劳动节期间，要求所有人将电脑上的Steam、Origin、 Epic等游戏平台卸载，所有的PS、Xbox、Switch 全部就地销毁，并于五一假期前 下载并安装米哈游自主研发的全新开放世界冒险游戏《原神》，已下载的全部更新到最新版本。要求:1.充值大月卡，自愿充值，应冲尽冲:2.等级升到60级，自愿升级，应升尽升;3.假期期间至少180抽，自愿抽卡，应抽尽抽。收到请回复。",
                            like: 361,
                            dislike: 1,
                        },
                    ],
                },
                {
                    textId: 'f004',
                    floor: 4,
                    userId: '002',
                    userName: "Chino",
                    userImageUrl: require('../../assets/user-image-8.jpg'),
                    date: '2023-5-19 23:19',
                    text: "面对这个问题，我们需要拿出新水平、达到新境界，通过新举措、新发展，形成新突破，为此，我们必须重视新方法、看清新形式、理准新要求，只有这样，我们才能在新期待、新关系中，用好新本领、展现新风貌、走出新高度，新知识造就新事物、新实践获得新成果。一定要认识到其中的重要性，明了紧迫性、坚持自觉性、拿出主动性，以全局性、前瞻性的眼光把握时代性、坚持实践性，特别要有针对性，面对战略性、长期性的任务，我们需要考虑到其复杂性与艰巨性，调动积极性与创造性，有计划性、敏锐性的干好事情。同时，不能遗忘规范化、程序化与制度化的重要程度，只有在有序化、科学化、知识化、专业化的条件下，我们才能让年轻化变得正常化。主动热心、坚强耐心，拿出诚心与决心，用我们的红心坚持铁心与公心，明确辨析大局意识、忧患意识、责任意识，注重学习意识与上进意识，最终育养出管理意识。找准出发点、切入点、落脚点，注意着眼点、结合点、关键点、重视着重点、着力点、关键点，这些是做事情的支撑点。重要性、紧迫性、自觉性、主动性、坚定性、民族性、时代性、实践性、针对性、全局性、前瞻性、战略性、积极性、创造性、长期性、复杂性、艰巨性、可讲性、鼓动性、计划性、敏锐性、有效性；责任感、紧迫感、危机感、认同感、荣誉感、成就感；多层次、多方面、多途径、多渠道、多措施、多力量、多元素。出发点、切入点、突破点、落脚点、着眼点、结合点、关键点、着重点、着力点、根本点、支撑点；不松劲、不懈怠、不退缩、不畏难、不罢手、不动摇、不放弃、不改变、不妥协；法制化、规范化、制度化、程序化、集约化、正常化、有序化、智能化、优质化、常态化、科学化、年轻化、知识化、专业化；新水平、新境界、新举措、新发展、新突破、新成绩、新成效、新方法、新成果、新形势、新要求、新期待、新关系、新体制、新机制、新知识、新本领、新进展、新实践、新风貌、新事物、新高度；活动力、控制力、影响力、创造力、凝聚力、战斗力、感染力、亲活力；热心、耐心、诚心、决心、核心、内心、外心、中心、甘心、攻心，进取心、责任心、上进心、公仆心；政治意识、组织意识、大局意识、忧患意识、责任意识、法律意识、廉洁意识、学习意识、上进意识、管理意识；找准出发点、把握切入点、明确落脚点、找准落脚点、抓住切入点、把握着重点、找准切入点、把握着力点、抓好落脚点；激发巨大热情，凝聚无穷力量，催生丰硕成果，展现全新魅力。当前工作要有新水平、队伍建设要有新面貌、廉政建设要有新举措、自身建设要有新发展、内部管理要有新突破。政治认同、理论认同、感情认同；历史的必然、现实的选择、未来的方向。立足当前，着眼长远，自觉按规律办事抓住机遇，应对挑战，勇敢顺潮流而为突出重点，分步实施，找准切入点实施全面推进，统筹兼顾，综合治理，融入其中，贯穿始终，切实抓好，扎实推进，加快发展，持续增收，积极稳妥，狠抓落实，从严控制， 严格执行，坚决制止，明确职责，高举旗帜，坚定不移，牢牢把握，积极争取，深入开展，注重强化，规范程序，改进作风，积极发展，努力建设，依法实行，良性 互动，优势互补，率先发展，互惠互利，做深、做细、做实、全面分析，全面贯彻，持续推进，全面落实、全面实施，逐步扭转，基本形成，普遍增加，基本建立， 更加完备，逐步完善，明显提高，逐渐好转，逐步形成，不断加强，持续增效，巩固深化，大幅提高，显著改善，不断增强，日趋完善，比较圆满。",
                    imageUrlList: [require('../../assets/favlist-2.jpg'),
                        require('../../assets/favlist-1.jpg'),
                        require('../../assets/favlist-3.png'),],
                    comments: 0,
                    like: 431,
                    dislike: 457,
                    childFloorList: [],
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
</style>