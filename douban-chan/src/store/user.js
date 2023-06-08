// 在页面加载时从本地存储中读取状态
const savedState = localStorage.getItem('state');
const initialState = savedState ? JSON.parse(savedState) : {};
//用户信息管理
export default {
	namespaced: true,
	actions: {

	},
	mutations: {
		//转换为已登录
		LOGIN(state, value) {
			console.log('user mutations中的LOGIN被调用了')
			state.isLogin = true;
			state.userId = value.u_id;
			state.userName = value.u_name;
			state.userEmail = value.u_email;
			state.userNick = value.u_nickname;
			state.userBirthday = value.u_birthday;
			state.userDesc = value.u_desc;
			state.userSex = value.u_gender;
			state.userSignature = value.u_signature;
			state.userImgUrl = value.u_profile_photo;
		},
		//转换为登出
		LOGOUT(state, value) {
			console.log('user mutations中的LOGOUT被调用了')
			state.isLogin = false;
		},
		//清除新回复数量
		ClearUserReplyNum(state) {
			const num = state.userMessages.length;
			if (num == 0) state.userReplyNum = '';
			else state.userReplyNum = num;
		},
		//清除新系统消息数量+管理员消息数量
		ClearUserMessageNum(state) {
			const num = state.userInfos.length + state.userManages.length;
			if (num == 0) state.userMessageNum = '';
			else state.userMessageNum = num;
		},
		//清除新点赞数量
		ClearUserGoodNum(state) {
			const num = state.userGoods.length;
			if (num == 0) state.userGoodNum = '';
			else state.userGoodNum = num;
		},
		//修改用户信息
		ModifyInfo(state, form) {
			state.userNick = form.name;
			state.userSignature = form.saying;
			if (form.date == null) state.userBirthday = '保密';
			else state.userBirthday = form.date;
			state.userSex = form.sex;
			state.userDesc = form.desc;
		},
		//修改用户头像
		ModifyUserImgUrl(state, img) {
			state.userImgUrl = img;
		},
		//更新用户收到的管理信息
		requestManageInfo(state, value) {
			state.userManages = value;
		},
		//更新用户收到的系统信息
		requestSystemInfo(state, value) {
			state.userInfos = value;
		},
		//更新用户收到的回复信息
		requestUserMessage(state, value) {
			state.userMessages = value;
		},
	},
	state: {
		//当前是否登录
		isLogin: false,
		//头像路径
		userImgUrl: require('../assets/conroy_img/qq.jpg'),
		//用户名
		userName: "秋子夜",
		//用户昵称
		userNick: "秋子夜",
		//用户性别
		userSex: '男',
		//用户邮箱
		userEmail: '2399891646@qq.com',
		//用户生日
		userBirthday: '2002-01-13',
		//用户id
		userId: "1",
		//用户个性签名
		userSignature: "爱没有技巧,真诚才是必杀技",
		//用户简介
		userDesc: '',
		//用户收到的新回复数量
		userReplyNum: '',
		//用户收到的新系统消息数量+管理员消息数量
		userMessageNum: '',
		//用户收到的新点赞数量
		userGoodNum: '',
		//用户消息中心的回复邮件数组
		userMessages: [
			{
				id: 1,
				imagePath: require('../assets/conroy_img/qq.jpg'),
				name: '秋子夜',
				reply: '家人们无语啦无语啦,它居然是个男人,家人们,大无语事件呀,啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
				time: '2023年6月4日 17:51',
				comment: '江南第一深情吴一凡邀请你共进晚餐,希望你不要不识抬举.',
			},
			{
				id: 4,
				imagePath: require('../assets/conroy_img/xw.jpg'),
				name: '溪午',
				reply: '支持支持',
				time: '2023年6月5日 14:51',
				comment: '朔间零太帅啦.',
			},
			{
				id: 3,
				imagePath: require('../assets/conroy_img/czx.jpg'),
				name: 'Arksuzuran',
				reply: '不是,不知道你在装什么捏',
				time: '2023年6月3日 11:21',
				comment: '我是最吊的,不服来干',
			},
			{
				id: 2,
				imagePath: require('../assets/conroy_img/adk.jpg'),
				name: 'ADK',
				reply: '不想学os啦,不想搓软工啦!!!!!!!!',
				time: '2023年6月4日 17:51',
				comment: '大方承认吧,北航,您最爱的大专.',
			},
		],
		//用户消息中心的收到点赞邮件数组
		userGoods: [
			{
				id: 1,
				imagePath: require('../assets/conroy_img/qq.jpg'),
				name: '秋子夜',
				time: '2023年6月4日 17:51',
				comment: '江南第一深情吴一凡邀请你共进晚餐,希望你不要不识抬举.',
			},
			{
				id: 4,
				imagePath: require('../assets/conroy_img/xw.jpg'),
				name: '溪午',
				time: '2023年6月5日 14:51',
				comment: '朔间零太帅啦.',
			},
			{
				id: 3,
				imagePath: require('../assets/conroy_img/czx.jpg'),
				name: 'Arksuzuran',
				time: '2023年6月3日 11:21',
				comment: '我是最吊的,不服来干',
			},
			{
				id: 2,
				imagePath: require('../assets/conroy_img/adk.jpg'),
				name: 'ADK',
				time: '2023年6月4日 17:51',
				comment: '大方承认吧,北航,您最爱的大专.',
			},
		],
		//用户消息中心的系统通知邮件数组
		userInfos: [
			{
				id: 1,
				name: '豆瓣酱隐私政策的修订通知',
				time: '2023年6月4日 17:51',
				text: '亲爱的用户，根据业务开展的实际情况，哔哩哔哩近期更新了《哔哩哔哩隐私政策》中的相关内容。你可以前往哔哩哔哩客户端【我的-设置-隐私政策-哔哩哔哩隐私政策全文】查看更新后的主要提示以及全部内容。',
			},
			{
				id: 4,
				name: '正在直播MSI总决赛：BLG vs JDG',
				time: '2023年6月5日 14:51',
				text: 'LPL队伍历史首次在国际赛事会师决赛，谁将为赛区捧起第五座MSI冠军奖杯？看直播参与天选抽奖，华为P50 Pocket、Matebook13、大会员权益等你来拿！上B站看MSI，让我们共同见证冠军诞生！',
			},
			{
				id: 3,
				name: '终于！你的B站专属年度报告来了！',
				time: '2023年6月3日 11:21',
				text: '2022你最关注的TA是？哪些视频让你N刷不断？又是什么被你刻入了DNA？戳链接，回顾你和B站的2022>>',
			},
			{
				id: 2,
				name: '您的评论违规，已被管理员删除',
				time: '2023年6月4日 17:51',
				text: '您的评论‘曹尼玛的北航真傻逼’涉嫌违规，已经被管理员删除，希望您理性评论！',
			},
		],
		//用户消息中心的管理信息邮件数组
		userManages: [
			{
				id: 1,
				title: 'ADK太吊了,北航不允许这么牛逼的人存在',
				text: '家人们,GodA你听过吗?不得了啊,不得了啊,他一个小时写完挑战性任务,软工前后端全栈,国奖什么的都是小意思,paper遍地走,nature得管他叫爹,院士得喊他哥,女人们都想做他的学术妲己,男人们都想做他的GGBoy!',
				handled: 0,
			},
			{
				id: 2,
				title: '涉黄信息、有害信息、网络暴力',
				text: '我,李一博实名举报江南第一深情吴一凡聚众pc!',
				handled: 1,
			},
			{
				id: 3,
				title: '过度内卷,校园毒瘤',
				text: '只能说这个人太过分了,怎么能这样卷软工捏,你让同行怎么活,必须严惩,学霸们自重吧 别把身边的学渣逼急了 因为学渣可能会用身高鄙视你 用身材藐视你 用滑板拍死你 用画笔戳死你 用乐器砸死你 用篮球扔死你 用歌喉亮死你 德玛西亚虐死你 我们喜欢会教题的学霸而不是秀优越的学霸.',
				handled: 0,
			},
			{
				id: 4,
				title: 'emo了家人们',
				text: '越来越觉得似乎恋爱没那么重要了 把自己彻底交给一个人开始懂得权衡利弊了 打得一手好防御 每当这时候我就觉得我大概也不是那么需要爱情了 以前觉得安全感是秒回的信息 她的早安晚安每一个承诺 温暖好脾气的话语 而现在安全感唯有明媚阳光的好天气 繁华路口人行道的绿灯 出门时口袋里的钱包和钥匙 手机里显示的满格电 因为那点安全感寄托于她人身上 难免会令我疼到失望 我甚至开始讨厌一些人的出现打乱我的生活 但我又希望有人可以陪我 怎么会有我这么矛盾的人 想要爱却在爱来临时闪躲.',
				handled: 2,
			},
			{
				id: 5,
				title: 'ADK太吊了,北航不允许这么牛逼的人存在',
				text: '家人们,GodA你听过吗?不得了啊,不得了啊,他一个小时写完挑战性任务,软工前后端全栈,国奖什么的都是小意思,paper遍地走,nature得管他叫爹,院士得喊他哥,女人们都想做他的学术妲己,男人们都想做他的GGBoy!',
				handled: 2,
			},
		],
	},
	getters: {

	},
}