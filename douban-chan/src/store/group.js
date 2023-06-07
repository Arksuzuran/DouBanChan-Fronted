//帖子信息管理
import qs from "qs";
import axios from "axios";
export default {
    namespaced: true,
    actions: {
        //
        //请求数据
        //
        //搜索框接口 根据指定输入内容返回小组列表
        getGroupListSearchOnline(context, info) {
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             input: info.input,
            //         }),
            //         url: "/group/create/",
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            if (info.input) {
                console.log("依据指定tag获取小组列表，指定搜索内容：", info.input);
            } else {
                console.log("随机获取小组列表");
            }
            context.commit("SET_GROUPLIST", context.state.groupList);
        },
        //根据info.tag 获取小组列表12
        getGroupListOnline(context, info) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        // u_id: 1,
                        u_id: info.userId,
                        g_tag: info.tag,
                    }),
                    url: "group/query_group_by_tag/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log(res);
                        let groupList = res.data.groupList;
                        context.commit("SET_GROUPLIST", groupList);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            context.commit("SET_GROUPLIST", context.state.groupList);
        },
        //获取我的小组
        getGroupListMineOnline(context, info) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: info.userId,
                    }),
                    url: "group/query_group_by_tag/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log(res);
                        let groupList = res.data.groupList;
                        context.commit("SET_GROUPLIST", groupList);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            context.commit("SET_GROUPLIST", context.state.groupList);
        },
        //获取热榜小组列表
        getGroupListByHotOnline(context, info) {
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             // u_id: 1,
            //             u_id: info.userId,
            //             g_tag: info.tag,
            //         }),
            //         url: "group/query_group_by_tag/",
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             let groupList = res.data.groupList;
            //             context.commit("SET_GROUPLIST", groupList);
            //             resolve(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            if (info.tag) {
                console.log("依据指定tag获取热榜小组列表，指定tag：", info.tag);
            } else {
                console.log("获取热榜小组列表");
            }
            context.commit("SET_GROUPLIST", context.state.groupList);
        },

        //获取指定id的小组信息12
        getGroupInfoOnline(context, info) {
            console.log("依据指定id获取小组信息", info);
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: info.userId,
                        g_id: info.groupId,
                        // u_id: 1,
                        // g_id: 3,
                    }),
                    url: "/group/group_brief/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        let groupInfo = res.data;
                        context.commit("SET_GROUPINFO", groupInfo);
                        resolve(res);
                        console.log(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            context.commit("SET_GROUPINFO", context.state.groupInfo);
        },

        //
        //上传数据
        //

        //创建小组12
        createGroupOnline(context, newGroup) {
            console.log("尝试创建小组", newGroup);
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: newGroup.userId,
                        g_name: newGroup.groupName,
                        g_description: newGroup.groupIntro,
                        g_tag: newGroup.tag,
                        avatar: newGroup.avatar, //头像
                        head: newGroup.head, //头图
                    }),
                    url: "/group/create/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        resolve(res);
                        console.log(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        //加入小组1
        joinGroupOnline(context, info) {
            let url = info.is ? "group/join_group/" : "/group/quit_group/";
            console.log("加入小组", info.groupId, info.userId, info.is);
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: info.userId,
                        g_id: info.groupId,
                    }),
                    url,
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log(info.is ? "加入小组成功" : "退出小组成功",res);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        //申请管理员1
        applyAdminOnline(context, info) {
            let url = info.is ? "/group/apply_admin/" : "group/cancel_admin/";
            console.log("开始处理申请或卸任管理员", info.groupId, info.userId, info.is);
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: info.userId,
                        g_id: info.groupId,
                        text: info.text,
                    }),
                    url,
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log(info.is ? "申请管理员成功" : "卸任管理员成功", res);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
    mutations: {
        SET_GROUPLIST(state, value) {
            state.groupList = value;
        },
        SET_GROUPINFO(state, value) {
            state.groupInfo = value;
        },
    },
    state: {
        groupList: [
            //一个大括号是一个对象，对应一个小组
            {
                groupId: 1,
                groupHeadBgUrl: require("../assets/user-image-7.jpg"), //小组头图路径
                groupAvatarImgUrl: require("../assets/group-avatar-1.jpg"), //小组头像路径
                groupName: "集美小组集美小组集美小组", //小组名称
                //小组简介
                groupIntro:
                    "家人们谁懂啊，咱就是说一整个无语住了，一把子大动作给到了，今天又是在逃公主的一天，九敏九敏真的太好哭了吧，下头男",
                //小组标签
                tag: "生活",
                //小组帖子数量
                groupPostNumber: 321,
                //小组关注者数量
                groupFollowNumber: 594,
                //小组是因为这个小组才被推荐上来的
                //如果前端在请求小组主页的推荐小组列表 那么该字段需要填写
                aboutTopic: {
                    topicId: "t001",
                    topicName: "游戏",
                    topicAvatarUrl: require("../assets/topic-avatar-1.jpg"),
                },
                //当前用户是否是管理员
                userIsAdmin: true,
                //当前用户是否是组员
                userInGroup: true,
            },
            {
                groupId: 2,
                groupHeadBgUrl: require("../assets/user-bg-4.jpg"),
                groupAvatarImgUrl: require("../assets/group-avatar-2.jpg"),
                groupName: "coding小组",
                groupIntro: "编程爱好者聚集地. Hell, word!",
                tag: "文化",
                groupPostNumber: 597,
                groupFollowNumber: 792,
                aboutTopic: {
                    topicId: "t001",
                    topicName: "游戏",
                    topicAvatarUrl: require("../assets/topic-avatar-1.jpg"),
                },
                //当前用户是否是管理员
                userIsAdmin: false,
                //当前用户是否是组员
                userInGroup: true,
            },
            {
                groupId: 3,
                groupHeadBgUrl: require("../assets/group-img-8.jpg"),
                groupAvatarImgUrl: require("../assets/group-avatar-3.jpg"),
                groupName: "蔚蓝档案小组",
                groupIntro: "在阿拜多斯，你可以不活，但不能没有活",
                tag: "游戏",
                groupPostNumber: 1367,
                groupFollowNumber: 59521,
                aboutTopic: {
                    topicId: "t002",
                    topicName: "BUAA",
                    topicAvatarUrl: require("../assets/topic-avatar-2.jpg"),
                },
                //当前用户是否是管理员
                userIsAdmin: false,
                //当前用户是否是组员
                userInGroup: false,
            },
        ],
        groupInfo: {
            groupId: 4,
            groupHeadBgUrl: require("../assets/user-bg-2.jpg"),
            groupAvatarImgUrl: require("../assets/group-avatar-1.jpg"),
            groupName: "集美小组",
            groupIntro:
                "家人们谁懂啊",
            groupFollowNumber: 165949,
            groupPostNumber: 49526148,
            userInGroup: true,
            userIsAdmin: true,
            //小组标签
            tag: "生活",
            //小组成员列表
            memberList: [
                {
                    userId: "001",
                    userName: "羽毛笔",
                    userImageUrl: require("../assets/user-image-1.jpg"),
                    isAdmin: true,
                },
                {
                    userId: "004",
                    userName: "bochi",
                    userImageUrl: require("../assets/user-image-7.jpg"),
                    isAdmin: false,
                },
            ],
        },
    },
    getters: {
        groupList(state) {
            return state.groupList;
        },
        groupInfo(state) {
            return state.groupInfo;
        },
    },
};
