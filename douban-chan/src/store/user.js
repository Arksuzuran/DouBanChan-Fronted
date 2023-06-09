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
			state.userId="1";
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
		],
		//用户消息中心的收到点赞邮件数组
		userGoods: [
		],
		//用户消息中心的系统通知邮件数组
		userInfos: [
		],
	},
	getters: {

	},
}