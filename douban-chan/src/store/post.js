//帖子信息管理
import qs from "qs";
import axios from "axios";
export default {
    namespaced: true,
    actions: {
        //
        //请求数据
        //
        //搜索框接口 根据指定输入内容返回帖子列表
        getPostListSearchOnline(context, info) {
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
                console.log("依据指定tag获取帖子列表，指定搜索内容：", info.input);
            } else {
                console.log("随机获取帖子列表");
            }
            context.commit("SET_POSTLIST", context.state.postList);
        },

        //获得帖子列表 如果传入tag则以tag为标准筛选
        getPostListOnline(context, info) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        // u_id: 1,
                        u_id: info.userId,
                        c_tag: info.tag,
                    }),
                    url: "/group/query_posts_by_tag/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log('根据tag获得帖子列表成功',res);
                        context.commit("SET_POSTLIST", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            if (info.tag) {
                console.log("依据指定tag获取帖子列表，指定tag：", info.tag);
            } else {
                console.log("随机获取帖子列表");
            }
            context.commit("SET_POSTLIST", context.state.postList);
        },
        //获得帖子列表 如果传入tag则以tag为标准筛选12
        getPostListMineOnline(context, info) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: info.userId,
                    }),
                    url: '666',
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log('获得我的小组所属的帖子列表',res);
                        let postList = res.data;
                        context.commit("SET_POSTLIST", postList);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        //获得话题热榜相关的帖子列表 如果传入tag则以tag为标准筛选
        getPostListByHotOnline(context, info) {
            let url = info.tag
                ? "/group/query_group_by_tag/"
                : "/group/query_group_by_tag/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             // u_id: 1,
            //             u_id: info.userId,
            //             tag: info.tag,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             let postList = res.data;
            //             context.commit("SET_POSTLIST", postList);
            //             resolve(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            if (info.tag) {
                console.log("依据指定tag获取热榜帖子列表，指定tag：", info.tag);
            } else {
                console.log("获取热榜帖子列表");
            }
            context.commit("SET_POSTLIST", context.state.postList);
        },
        //根据小组id获取帖子列表12
        getPostListByGroupIdOnline(context, info) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: info.userId,
                        g_id: info.groupId,
                    }),
                    url: 'post/query_group_posts/',
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log('获取小组内的帖子列表成功', res);
                        context.commit("SET_POSTLIST", res.data.postList);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            console.log("依据小组id获取帖子列表，小组id：", info.g_id);
            context.commit("SET_POSTLIST", context.state.postList);
        },
        //根据话题id获取帖子列表
        getPostListByTopicIdOnline(context, info) {
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify({
                        u_id: info.userId,
                        c_id: info.topicId,
                    }),
                    url: 'post/query_topic_posts/',
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log('获取话题内的帖子列表成功', res);
                        context.commit("SET_POSTLIST", res.data.postList);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            console.log("依据话题id获取帖子列表，话题id：", info.c_id);
            context.commit("SET_POSTLIST", context.state.postList);
        },

        //根据帖子id获取帖子的全部信息（含楼层列表）
        getPostOnline(context, info) {
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             // u_id: 1,
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url: '111',
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             let post = res.data;
            //             context.commit("SET_POSTINFO", postInfo);
            //             resolve(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            console.log("依据帖子id获取帖子，id：", info.p_id);
            context.commit("SET_POSTINFO", context.state.postInfo);
        },

        //
        //上传数据
        //
        //在小组内创建帖子12
        createPostOnline(context, newPost) {
            console.log("用户发帖请求", newPost);
            return new Promise((resolve, reject) => {
                axios({
                    method: "post",
                    data: qs.stringify(
                        {
                            u_id: newPost.userId,
                            g_id: newPost.groupId,
                            topicId: newPost.topicId,
                            title: newPost.title,
                            text: newPost.text,
                            picture_list: newPost.postImageUrlList,
                        },
                        { arrayFormat: 'comma' }
                        // { arrayFormat: "repeat" }
                    ),
                    url: "post/add_post/",
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then((res) => {
                        console.log(res);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
            console.log("小组创建帖子", newPost);
        },
        //回复帖子1
        replyPostOnline(context, newReply) {
            console.log("回复帖子", newReply);
            // let url = "/text/reply/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             t_description,
            //             t_father_text_id,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
        },
        //点赞帖子1
        likePostOnline(context, info) {
            console.log("点赞帖子", info.postId, info.userId, info.is);
            // let url = info.is ? "/post/reply/" : "/post/reply/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
        },
        //点踩帖子1
        dislikePostOnline(context, info) {
            console.log("点踩帖子", info.postId, info.userId, info.is);
            // let url = info.is ? "/post/reply/" : "/post/reply/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
        },
        //收藏帖子1
        favPostOnline(context, info) {
            console.log("收藏帖子", info.postId, info.userId, info.is);
            // let url = info.is ? "/post/reply/" : "/post/reply/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            console.log("收藏帖子", info.postId, info.userId, info.is);
        },
        //置顶帖子1
        topPostOnline(context, info) {
            console.log("点赞帖子", info.postId, info.userId, info.is);
            // let url = info.is ? "/post/reply/" : "/post/reply/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            if (info.top) {
                console.log("置顶帖子", info.postId);
            } else {
                console.log("取消置顶帖子", info.postId);
            }
        },
        //设置为精华1
        goodPostOnline(context, info) {
            // let url = info.good ? "/post/reply/" : "/post/reply/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            if (info.good) {
                console.log("精华帖子", info.postId);
            } else {
                console.log("取消精华帖子", info.postId);
            }
        },

        //回复文本1
        replyTextOnline(context, info) {
            // let url = info.good ? "/post/reply/" : "/post/reply/";
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url,
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            console.log("回复text", info.textId, info.newReply);
        },
        //点赞文本 is:为真则点赞 为假则取消点赞
        likeTextOnline(context, info) {
            console.log("点赞text", info.textId, info.userId, info.is);
        },
        //点踩文本
        dislikeTextOnline(context, info) {
            console.log("点踩text", info.textId, info.userId, info.is);
        },
        //举报文本1
        reportTextOnline(context, info) {
            // return new Promise((resolve, reject) => {
            //     axios({
            //         method: "post",
            //         data: qs.stringify({
            //             u_id: info.userId,
            //             p_id: info.postId,
            //         }),
            //         url: '1111',
            //         headers: { "content-type": "application/x-www-form-urlencoded" },
            //     })
            //         .then((res) => {
            //             console.log(res);
            //             resolve(res);
            //             console.log(res);
            //         })
            //         .catch((err) => {
            //             reject(err);
            //         });
            // });
            console.log("举报text", info.textId, info.report, info.userId);
        },
        //删除文本1
        deleteTextOnline(context, textId) {
            console.log("删除text", textId);
        },
    },
    mutations: {
        SET_POSTLIST(state, value) {
            state.postList = value;
        },
        SET_POSTINFO(state, value) {
            state.postInfo = value;
        },
    },
    state: {
        // 假数据
        postList: [
            {
                postId: "p001",
                lzId: "004", //发帖人id
                lzName: "bochi", //发帖人昵称
                lzImageUrl: require("../assets/user-image-7.jpg"), //发帖人头像路径
                date: "2023-5-19 23:57", //发帖时间
                title: "我发游戏，你来打分", //帖子标题
                text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神", //帖子1楼内容
                postImageUrlList: [
                    require("../assets/group-img-3.png"), //帖子1楼图片
                    require("../assets/group-img-4.png"),
                    require("../assets/group-img-5.jpg"),
                ],
                topic: "游戏", //帖子所属的话题
                topicId: "t001", //帖子所属的话题的id
                visits: 946126, //帖子的浏览量
                fav: 15612, //帖子的收藏数
                comments: 1692, //帖子的评论数
                like: 214512, //帖子的点赞数
                dislike: 456, //帖子的点踩数
                isTopped: true, //帖子在当前小组内是否置顶
                isGoodPost: false, //帖子在当前小组内是否是精华帖
                userIsAdmin: true, //当前用户是否是帖子所属小组的管理员
                userIsLz: true, //当前用户是否是发帖人
                userLike: false,
                userDislike: false,
                userFav: false,
                //如果该小组不来自于一个小组 那么下面的字段均填 ''
                groupName: "Game", //来自的小组的名称
                groupId: "g001", //来自的小组的id
            },
            {
                postId: "p002",
                lzId: "001",
                lzName: "羽毛笔",
                lzImageUrl: require("../assets/user-image-1.jpg"),
                date: "2023-5-19 23:11",
                title: "理性讨论 软件工程基础和OS哪一个更精品",
                text: "压到真题了，主人奴隶问题：三个主人十个奴隶，在交易市场，主人可以通过窗口写入购买协议，奴隶可以查阅，请完成该问题的同步与互斥问题（基于异性主人奴隶问题的简化，无需性别互斥）",
                postImageUrlList: [
                    require("../assets/user-bg-3.jpg"),
                    require("../assets/group-img-2.jpg"),
                ],
                topic: "BUAA",
                topicId: "t002", //帖子所属的话题的id
                visits: 5959261,
                fav: 20200,
                comments: 692,
                like: 59412,
                dislike: 59,
                isTopped: false,
                isGoodPost: true,
                userIsAdmin: false,
                userIsLz: true,
                userLike: false,
                userDislike: false,
                userFav: false,
                //如果该小组不来自于一个小组 那么下面的字段均填 ''
                groupName: "BUAA", //来自的小组的名称
                groupId: "g002", //来自的小组的id
            },
            {
                postId: "p003",
                lzId: "002",
                lzName: "Chino",
                lzImageUrl: require("../assets/user-image-8.jpg"),
                date: "2023-5-02 22:47",
                title: "黑坤巴精神",
                text: "回来吧科比黑曼巴，我最骄傲的信仰，历历在目的球场，眼泪莫名在流淌，🤙依稀记得24🤙，🧟还有给力的八号🧟，把对手全都给打退，🚁就算坠机也不死🚁",
                postImageUrlList: [
                    require("../assets/group-img-6.jpg"),
                    require("../assets/group-img-7.jpg"),
                ],
                topic: "科比",
                topicId: "t003", //帖子所属的话题的id
                visits: 59515,
                fav: 642,
                comments: 41,
                like: 595,
                dislike: 0,
                isTopped: false,
                isGoodPost: false,
                userIsAdmin: true,
                userIsLz: false,
                userLike: false,
                userDislike: false,
                userFav: false,
                //如果该小组不来自于一个小组 那么下面的字段均填 ''
                groupName: "黑坤巴", //来自的小组的名称
                groupId: "g003", //来自的小组的id
            },
            {
                postId: "p004",
                lzId: "002",
                lzName: "Chino",
                lzImageUrl: require("../assets/user-image-8.jpg"),
                date: "2023-5-02 22:47",
                title: "原神！",
                text: "回来吧科比黑曼巴，我最骄傲的信仰，历历在目的球场，眼泪莫名在流淌，🤙依稀记得24🤙，🧟还有给力的八号🧟，把对手全都给打退，🚁就算坠机也不死🚁",
                postImageUrlList: [
                    require("../assets/group-img-6.jpg"),
                    require("../assets/group-img-7.jpg"),
                ],
                topic: "游戏",
                topicId: "t001", //帖子所属的话题的id
                visits: 59515,
                fav: 642,
                comments: 41,
                like: 595,
                dislike: 0,
                isTopped: false,
                isGoodPost: false,
                userIsAdmin: false,
                userIsLz: false,
                userLike: false,
                userDislike: false,
                userFav: false,
                //如果该小组不来自于一个小组 那么下面的字段均填 ''
                groupName: "", //来自的小组的名称
                groupId: "", //来自的小组的id
            },
        ],
        postInfo: {
            postId: "p001",
            lzId: "004", //发帖人id
            lzName: "bochi", //发帖人昵称
            lzImageUrl: require("../assets/user-image-7.jpg"), //发帖人头像路径
            date: "2023-5-19 23:57", //发帖时间
            title: "我发游戏，你来打分", //帖子标题
            text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神", //帖子1楼内容
            postImageUrlList: [
                require("../assets/group-img-3.png"), //帖子1楼图片
                require("../assets/group-img-4.png"),
                require("../assets/group-img-5.jpg"),
            ],
            topic: "游戏", //帖子所属的话题
            topicId: "t001", //帖子所属的话题的id
            visits: 946126, //帖子的浏览量
            fav: 15612, //帖子的收藏数
            comments: 1692, //帖子的评论数
            like: 214512, //帖子的点赞数
            dislike: 456, //帖子的点踩数
            isTopped: true, //帖子在当前小组内是否置顶
            isGoodPost: false, //帖子在当前小组内是否是精华帖
            userIsAdmin: true, //当前用户是否是帖子所属小组的管理员
            userIsLz: false, //当前用户是否是发帖人
            userLike: false,
            userDislike: false,
            userFav: false,
            //如果该小组不来自于一个小组 那么下面的字段均填 ''
            groupName: "Game", //来自的小组的名称
            groupId: "g001", //来自的小组的id
            // 楼层列表
            floorList: [
                {
                    textId: "f001",
                    floor: 1,
                    u_id: "004",
                    userName: "bochi",
                    userImageUrl: require("../assets/user-image-7.jpg"),
                    date: "2023-5-19 23:06",
                    text: "0狗都不玩 1勉强能玩 2中规中矩 3值得一试 4不可多得的佳作 5神中神",
                    imageUrlList: [
                        require("../assets/group-img-3.png"),
                        require("../assets/group-img-4.png"),
                        require("../assets/group-img-5.jpg"),
                    ],
                    comments: 3,
                    like: 1452,
                    dislike: 45,
                    userLike: false,
                    userDislike: false,
                    childFloorList: [
                        {
                            textId: "fr003",
                            u_id: "003",
                            userName: "_Karasu_",
                            userImageUrl: require("../assets/user-image-6.jpg"),
                            date: "2023-5-22 12:08",
                            text: "“你是哪个省的?”男孩沉思他当然知道省的意义。但思绪在飞速演算，省作为人类文明的单位又存在了多久呢?从罗马帝国的行省到今日的联邦和省市划分，站在人类历史望去，省的存在只是短暂的一瞬，当万年后的人类建立银河帝国时，省还会存在吗?从卡米特星云到室女座超星系团，当人类文明沿着群星，逐步建立了庞大的人类帝国时，追寻起源已经没有什么意义，只有作为生物的繁衍纽带－母子关系还能够证明银河公民的身份吧。“妈妈生的。”",
                            like: 1595,
                            dislike: 0,
                            userLike: false,
                            userDislike: false,
                        },
                        {
                            textId: "fr001",
                            u_id: "001",
                            userName: "羽毛笔",
                            userImageUrl: require("../assets/user-image-1.jpg"),
                            date: "2023-5-19 23:07",
                            text: "“太好啦！太好啦！”听妈妈说，我家的电脑可以上网了。我情不自禁地欢呼起来。电脑网络这个新鲜玩意儿，到底是怎样的呢？爸爸告诉我，电脑网络如同一个遍布全球的蜘蛛网，把每个国家、每座城市甚至每个家庭都连在了一起。进入网络，就好像跨上了信息高速路。可以迅速找到所需要的各种信息，可以用电子信箱和全世界的小朋友建立联系，还可以进行网上购物。有了网络，五湖四海的人随时可以交流，咱们的地球就变成了一个小村庄。网络真的这么神奇？我带着好奇心，迫不及待地叫妈妈打开电脑，进入一个卡通网站，不一会儿，孙悟空出现在电脑屏幕上。我目不转睛地盯着屏幕，米老鼠、唐老鸭、花木兰、黑猫警长，都笑眯眯地看着我，还伴着音乐做着各种有趣的动作。“真神了！”我不由得赞叹起来。妈妈还带我访问了其他一些网站，里面的内容太丰富了：有体育新闻，有动物天地，有科技博览，还有音乐欣赏……真是应有尽有。我感到地球一下子变小了，知识的大门向我敞开了。妈妈还教我发电子邮件。我试着给远在国外的表姐发了一个贺卡。站在一旁的爸爸对我说：“过去寄一封信，对方要好几天才能收到，多慢啊！现在发一个电子邮件，对方几秒钟就能收到，真快啊！”妈妈说：“是呀，发电子邮件还能节约纸张、保护环境呢！”我恋恋不舍地下了网，心思还在那新奇的网络世界里！爸爸说：“今天用到的，只是网络功能的一点点，网络还有很多很多用处呢！”我听了更加喜欢这个新朋友了。",
                            like: 56,
                            dislike: 1,
                            userLike: false,
                            userDislike: false,
                        },
                        {
                            textId: "fr002",
                            u_id: "002",
                            userName: "Chino",
                            userImageUrl: require("../assets/user-image-8.jpg"),
                            date: "2023-5-19 23:08",
                            text: "打个郊县",
                            like: 6,
                            dislike: 1,
                            userLike: false,
                            userDislike: false,
                        },
                    ],
                },
                {
                    textId: "f000",
                    floor: 2,
                    u_id: "003",
                    userName: "_Karasu_",
                    userImageUrl: require("../assets/user-image-6.jpg"),
                    date: "2023-5-19 23:07",
                    text: "长官，我们把二楼拿下来了",
                    imageUrlList: [
                        require("../assets/post-img-8.jpg"),
                        require("../assets/post-img-9.jpg"),
                    ],
                    comments: 2,
                    like: 142,
                    dislike: 0,
                    userLike: false,
                    userDislike: false,
                    childFloorList: [
                        {
                            textId: "fr004",
                            u_id: "001",
                            userName: "羽毛笔",
                            userImageUrl: require("../assets/user-image-1.jpg"),
                            date: "2023-5-19 23:08",
                            text: "好，奖励艾草",
                            like: 51,
                            dislike: 0,
                            userLike: false,
                            userDislike: false,
                        },
                    ],
                },
                {
                    textId: "f002",
                    floor: 3,
                    u_id: "004",
                    userName: "bochi",
                    userImageUrl: require("../assets/user-image-7.jpg"),
                    date: "2023-5-19 23:10",
                    text: "1.明日方舟",
                    imageUrlList: [
                        require("../assets/post-img-3.jpg"),
                        require("../assets/post-img-4.jpg"),
                        require("../assets/post-img-5.jpg"),
                    ],
                    comments: 2,
                    like: 4201,
                    dislike: 461,
                    userLike: false,
                    userDislike: false,
                    childFloorList: [
                        {
                            textId: "fr004",
                            u_id: "001",
                            userName: "羽毛笔",
                            userImageUrl: require("../assets/user-image-1.jpg"),
                            date: "2023-5-19 23:07",
                            text: "5，这个真的是我跌",
                            like: 975,
                            dislike: 15,
                            userLike: false,
                            userDislike: false,
                        },
                        {
                            textId: "fr005",
                            u_id: "002",
                            userName: "Chino",
                            userImageUrl: require("../assets/user-image-8.jpg"),
                            date: "2023-5-19 23:08",
                            text: "1，感觉不如原神",
                            like: 529,
                            dislike: 47,
                            userLike: false,
                            userDislike: false,
                        },
                    ],
                },
                {
                    textId: "f003",
                    floor: 4,
                    u_id: "004",
                    userName: "bochi",
                    userImageUrl: require("../assets/user-image-7.jpg"),
                    date: "2023-5-19 23:30",
                    text: "2.原神。呦西 鉴于你在上网赞扬原神，经本院初步审理，你的行为爱国。米哈游第一警视厅颁发奖金500万円拒领取赏款就处以圣遗物全融刑，发放政治权利终身并且你的手机通讯录联系人都会受到5-10w不等的爱国奖金。请你收到本短信本短信后务必尽快领取奖金。不然本院将于明日中午，安排自卫队对你住所进行装修。",
                    imageUrlList: [
                        require("../assets/post-img-6.jpg"),
                        require("../assets/post-img-7.jpg"),
                    ],
                    comments: 2,
                    like: 6431,
                    dislike: 457,
                    userLike: false,
                    userDislike: false,
                    childFloorList: [
                        {
                            textId: "fr006",
                            u_id: "001",
                            userName: "羽毛笔",
                            userImageUrl: require("../assets/user-image-1.jpg"),
                            date: "2023-5-19 23:07",
                            text: "5，最喜欢的游戏",
                            like: 123,
                            dislike: 0,
                            userLike: false,
                            userDislike: false,
                        },
                        {
                            textId: "fr007",
                            u_id: "002",
                            userName: "Chino",
                            userImageUrl: require("../assets/user-image-8.jpg"),
                            date: "2023-5-19 23:08",
                            text: "5，曾经有教育家做了一个实验，让中国孩子和日本孩子探索有瘴气的山洞。日本小孩从小玩《塞尔达传说:王国之泪》，一进洞就点燃火把，结果爆炸至死。而聪明的中国孩子因为玩过《原神》，立马就从背包里掏出发光的流明石来照明，最终顺利通关。",
                            like: 695,
                            dislike: 9,
                            userLike: false,
                            userDislike: false,
                        },
                        {
                            textId: "fr008",
                            u_id: "003",
                            userName: "待兼诗歌剧",
                            userImageUrl: require("../assets/user-image-9.jpg"),
                            date: "2023-5-22 3:38",
                            text: "客观来讲3.5吧，能玩。最新通知:五一劳动节期间，要求所有人将电脑上的Steam、Origin、 Epic等游戏平台卸载，所有的PS、Xbox、Switch 全部就地销毁，并于五一假期前 下载并安装米哈游自主研发的全新开放世界冒险游戏《原神》，已下载的全部更新到最新版本。要求:1.充值大月卡，自愿充值，应冲尽冲:2.等级升到60级，自愿升级，应升尽升;3.假期期间至少180抽，自愿抽卡，应抽尽抽。收到请回复。",
                            like: 361,
                            dislike: 1,
                            userLike: false,
                            userDislike: false,
                        },
                    ],
                },
                {
                    textId: "f004",
                    floor: 5,
                    u_id: "002",
                    userName: "Chino",
                    userImageUrl: require("../assets/user-image-8.jpg"),
                    date: "2023-5-19 23:19",
                    text: "第一章《天生废材的我误入了超级大国》第二章《好客的大学》第三章《三美女陪同倒贴测》第四章《高额奖学金随便送》第五章《生好多孩子送不完》第六章《黑龙也是龙》番外《该滚的是你们吧》",
                    imageUrlList: [
                        require("../assets/favlist-2.jpg"),
                        require("../assets/favlist-3.png"),
                        require("../assets/user-image-3.jpg"),
                    ],
                    comments: 2,
                    like: 4231,
                    dislike: 54,
                    userLike: false,
                    userDislike: false,
                    childFloorList: [
                        {
                            textId: "fr003",
                            u_id: "003",
                            userName: "_Karasu_",
                            userImageUrl: require("../assets/user-image-6.jpg"),
                            date: "2023-5-22 12:08",
                            text: "终章《发生交火，我无法呼吸？！》",
                            like: 11255,
                            dislike: 4,
                            userLike: false,
                            userDislike: false,
                        },
                        {
                            textId: "fr008",
                            u_id: "003",
                            userName: "待兼诗歌剧",
                            userImageUrl: require("../assets/user-image-9.jpg"),
                            date: "2023-5-22 3:38",
                            text: "谴责肖万→理解肖万→同情肖万→敬佩肖万→感激肖万→肖万，黑膝铠甲，合体。",
                            like: 745,
                            dislike: 41,
                            userLike: false,
                            userDislike: false,
                        },
                    ],
                },
            ],
        },
    },
    getters: {
        postList(state) {
            return state.postList;
        },
        postInfo(state) {
            return state.postInfo;
        },
    },
};
