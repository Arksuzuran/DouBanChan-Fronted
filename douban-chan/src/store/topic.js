//话题信息管理
export default {
    namespaced: true,
    actions: {
        //获取热榜话题列表 如果传入tag则以tag为标准筛选
        getTopicListByHotOnline(context, tag) {
            if(tag){
                console.log("依据指定tag获取热榜话题列表，指定tag：", tag);
            }
            else{
                console.log("获取热榜话题列表");
            }
            context.commit('SET_TOPICLIST', context.state.topicList)
        },
        //随机获取话题列表 如果传入tag则以tag为标准筛选
        getTopicListOnline(context, tag) {
            if(tag){
                console.log("依据指定tag获取话题列表，指定tag：", tag);
            }
            else{
                console.log("随机获取话题列表");
            }
            context.commit('SET_TOPICLIST', context.state.topicList)
        },
        //获取指定小组的话题列表
        getTopicListByGroupIdOnline(context, id) {
            console.log("依据指定小组id获取热榜话题列表，指定id：", id);
            context.commit('SET_TOPICLIST', context.state.topicList)
        },
        //获取指定id的话题信息
        getTopicInfoOnline(context, id) {
            console.log("依据指定id获取话题信息，指定id：", id);
            context.commit('SET_TOPICINFO', context.state.topicInfo)
        },
    },
    mutations: {
        SET_TOPICLIST(state, value) {
            state.topicList = value
        },
        SET_TOPICINFO(state, value) {
            state.topicInfo = value
        },
    },
    state: {
        topicList: [
            {
                topicId: 't001',
                topicName: '游戏',
                topicAvatarUrl: require('../assets/topic-avatar-1.jpg'),
                topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
                visit: 159512,
                post: 9591,
                date: '2023-5-19 23:57',    //发帖时间
            },
            {
                topicId: 't002',
                topicName: 'BUAA',
                topicAvatarUrl: require('../assets/group-img-1.jpg'),
                topicIntro: '北京航空航天大学（Beihang University）简称“北航”，位于首都北京市，是中华人民共和国工业和信息化部直属的全国重点大学，中央直管高校， [89] 位列国家“双一流”、“985工程”、“211工程”重点建设高校',
                visit: 9891,
                post: 217,
                date: '2023-6-01 23:57',    //发帖时间
            },
            {
                topicId: 't003',
                topicName: '科比',
                topicAvatarUrl: require('../assets/user-image-3.jpg'),
                topicIntro: '牢大，我想你了',
                visit: 46218,
                post: 1678,
                date: '2023-5-29 45:57',    //发帖时间
            },
            {
                topicId: 't004',
                topicName: '天使降临到我身边',
                topicAvatarUrl: require('../assets/user-image-6.jpg'),
                topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
                visit: 131312,
                post: 2122,
                date: '2023-6-04 05:54',    //发帖时间
            },
            {
                topicId: 't005',
                topicName: '无封面测试',
                topicAvatarUrl: '',
                topicIntro: '北京航空航天大学（Beihang University）简称“北航”，位于首都北京市，是中华人民共和国工业和信息化部直属的全国重点大学，中央直管高校， [89] 位列国家“双一流”、“985工程”、“211工程”重点建设高校',
                visit: 2191,
                post: 531,
                date: '2023-6-03 11:54',    //发帖时间
            },
            {
                topicId: 't006',
                topicName: '人工智能给我滚出特雷森！',
                topicAvatarUrl: require('../assets/user-image-9.jpg'),
                topicIntro: '柳叶掌',
                visit: 59291,
                post: 4747,
                date: '2023-6-04 11:54',    //发帖时间
            },
            {
                topicId: 't007',
                topicName: '六一八游戏本真全是答辩吧',
                topicAvatarUrl: require('../assets/topic-avatar-2.jpg'),
                topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
                visit: 94511,
                post: 211,
                date: '2023-6-04 17:54',    //发帖时间
            },
            {
                topicId: 't008',
                topicName: '您必须立刻睡觉',
                topicAvatarUrl: require('../assets/group-img-4.png'),
                topicIntro: '北京航空航天大学（Beihang University）简称“北航”，位于首都北京市，是中华人民共和国工业和信息化部直属的全国重点大学，中央直管高校， [89] 位列国家“双一流”、“985工程”、“211工程”重点建设高校',
                visit: 2121,
                post: 341,
                date: '2023-6-04 03:54',    //发帖时间
            },
            {
                topicId: 't009',
                topicName: '来点涩图兄弟们',
                topicAvatarUrl: require('../assets/user-image-2.jpg'),
                topicIntro: '我身体很好，全都可以发给我',
                visit: 46578,
                post: 2121,
                date: '2023-6-04 04:54',    //发帖时间
            },
            {
                topicId: 't010',
                topicName: '你喜欢郊游吗',
                topicAvatarUrl: require('../assets/group-img-3.png'),
                topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式',
                visit: 14256,
                post: 8676,
                date: '2023-6-04 07:54',    //发帖时间
            },
        ],
        topicInfo: {
            topicId: 't001',
            topicHeadBgUrl: require("../assets/user-bg-2.jpg"),
            topicAvatarImgUrl: require("../assets/topic-avatar-1.jpg"),
            topicName: '游戏',
            topicIntro: '是所有哺乳类动物，特别是灵长类动物学习生存的第一步。它是一种基于物质需求满足之上的，在一些特定时间、空间范围内遵循某种特定规则的，追求精神世界需求满足的社会行为方式.',
            visit: 159512,
            follow: 75971,
            post: 9591,
            date: '2023-5-19 23:57',    //发帖时间
            userIntopic: true,
            //话题标签
            tagList: ['生活', '文化'],
        }
    },
    getters: {
        topicList(state) {
            return state.topicList
        },
        topicInfo(state) {
            return state.topicInfo
        }
    },
};
