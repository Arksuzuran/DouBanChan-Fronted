import Vue from 'vue'
import Vuex from 'vuex'

//在此导入所需的模块化vuex .js文件
import userOptions from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  //在此注册vuex模块
  modules:{
    userAbout:userOptions,
    
  }
})
