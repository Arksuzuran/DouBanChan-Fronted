//用户信息管理
import qs from 'qs'
import axios from 'axios'
export default {
	namespaced: true,
	actions:{
		
	},
	mutations:{
		//转换为已登录
		LOGIN(state,value){
			console.log('user mutations中的LOGIN被调用了')
			state.isLogin = true
		},
		//转换为登出
		LOGOUT(state,value){
			console.log('user mutations中的LOGOUT被调用了')
			state.isLogin = false
		},
	},
	state:{
		//当前是否登录
        isLogin: true,
		//头像路径
		userImgUrl: require("../assets/user-image-1.jpg"),
		//用户昵称
		userName: "羽毛笔",
		//用户id
		userId: 1,
	},
	getters:{

	},
}