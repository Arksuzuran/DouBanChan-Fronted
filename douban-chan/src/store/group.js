//帖子信息管理
export default {
    namespaced: true,
    actions: {
        //
        //请求数据
        //
        //搜索框接口 根据指定输入内容返回小组列表
        getGroupListSearchOnline(context, input){
            if (input) {
                console.log("依据指定tag获取小组列表，指定搜索内容：", input);
            } else {
                console.log("随机获取小组列表");
            }
            context.commit('SET_GROUPLIST',context.state.groupList)
        },
        //随机获取列表
        getGroupListOnline(context, tag) {
            if(tag){
                console.log("依据指定tag获取小组列表，指定tag：", tag);
            }
            else{
                console.log("获取小组列表");
            }
            context.commit('SET_GROUPLIST',context.state.groupList)
        },
        //获取热榜小组列表
        getGroupListByHotOnline(context, tag) {
            if(tag){
                console.log("依据指定tag获取热榜小组列表，指定tag：", tag);
            }
            else{
                console.log("获取热榜小组列表");
            }
            context.commit('SET_GROUPLIST',context.state.groupList)
        },

        //获取指定id的小组信息
        getGroupInfoOnline(context, id) {
            console.log("依据指定id获取小组信息，指定id：", id);
            context.commit('SET_GROUPINFO', context.state.groupInfo)
        },

        //
        //上传数据
        //
        //创建小组1
        createGroupOnline(context, newGroup){
            console.log("创建小组", newGroup);
        },
        //加入小组1
        joinGroupOnline(context, info){
            if(info.is){
                console.log("加入小组", info.groupId, info.userId, info.is);
            }
            else{
                console.log("退出小组", info.groupId, info.userId, info.is);
            }
        },
        //申请管理员1
        applyAdminOnline(context, info){
            if(info.is){
                console.log("申请成为管理员", info.groupId, info.userId, info.is);
            }
            else{
                console.log("卸任管理员", info.groupId, info.userId, info.is);
            }
        },
        
    },
    mutations: {
        SET_GROUPLIST(state,value){
            state.groupList = value
        },
        SET_GROUPINFO(state, value) {
            state.groupInfo = value
        },
    },
    state: {
        groupList: [
            //一个大括号是一个对象，对应一个小组
            {
                groupId: 'g001',
                groupHeadBgUrl: require('../assets/user-image-7.jpg'),//小组头图路径
                groupAvatarImgUrl: require('../assets/group-avatar-1.jpg'),//小组头像路径
                groupName: "集美小组集美小组集美小组",//小组名称
                //小组简介
                groupIntro: "家人们谁懂啊，咱就是说一整个无语住了，一把子大动作给到了，今天又是在逃公主的一天，九敏九敏真的太好哭了吧，下头男",
                //小组标签
                tag: '生活',
                //小组帖子数量
                groupPostNumber: 321,
                //小组关注者数量
                groupFollowNumber: 594,
                //小组是因为这个小组才被推荐上来的
                //如果前端在请求小组主页的推荐小组列表 那么该字段需要填写
                aboutTopic: { topicId: 't001', topicName: '游戏', topicAvatarUrl: require('../assets/topic-avatar-1.jpg') },
                //当前用户是否是管理员
                userIsAdmin: true,
                //当前用户是否是组员
                userInGroup: true,
            },
            {
                groupId: 'g002',
                groupHeadBgUrl: require('../assets/user-bg-4.jpg'),
                groupAvatarImgUrl: require('../assets/group-avatar-2.jpg'),
                groupName: "coding小组",
                groupIntro: "编程爱好者聚集地. Hell, word!",
                tag: '文化',
                groupPostNumber: 597,
                groupFollowNumber: 792,
                aboutTopic: { topicId: 't001', topicName: '游戏', topicAvatarUrl: require('../assets/topic-avatar-1.jpg') },
                //当前用户是否是管理员
                userIsAdmin: false,
                //当前用户是否是组员
                userInGroup: true,
            },
            {
                groupId: 'g003',
                groupHeadBgUrl: require('../assets/group-img-8.jpg'),
                groupAvatarImgUrl: require('../assets/group-avatar-3.jpg'),
                groupName: "蔚蓝档案小组",
                groupIntro: "在阿拜多斯，你可以不活，但不能没有活",
                tag: '游戏',
                groupPostNumber: 1367,
                groupFollowNumber: 59521,
                aboutTopic: { topicId: 't002', topicName: 'BUAA', topicAvatarUrl: require('../assets/topic-avatar-2.jpg') },
                //当前用户是否是管理员
                userIsAdmin: false,
                //当前用户是否是组员
                userInGroup: false,

            },
        ],
        groupInfo: {
            groupId: 'g001',
            groupHeadBgUrl: require("../assets/user-bg-2.jpg"),
            groupAvatarImgUrl: require("../assets/group-avatar-1.jpg"),
            groupName: '我是小组名称',
            groupIntro: '我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介，我是小组简介。',
            groupFollowNumber: 165949,
            groupPostNumber: 49526148,
            userInGroup: true,
            userIsAdmin: false,
            //小组标签
            tag: '生活',
            //小组成员列表
            memberList: [
                {
                    userId: '001',
                    userName: "羽毛笔",
                    userImageUrl: require('../assets/user-image-1.jpg'),
                    isAdmin: true,
                },
                {
                    userId: '004',
                    userName: "bochi",
                    userImageUrl: require('../assets/user-image-7.jpg'),
                    isAdmin: false,
                },
            ],
        },
    },
    getters: {
        groupList(state){
            return state.groupList
        },
        groupInfo(state){
            return state.groupInfo
        }
    },
}