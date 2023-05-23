import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import TDesign from 'tdesign-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';
Vue.use(TDesign);

import AtComponents from 'at-ui'
import 'at-ui-style'    // 引入组件样式

// import 'at-ui-style/src/index.scss'      // 或者引入未构建版本的 scss 样式
Vue.use(AtComponents)

Vue.config.productionTip = false
Vue.prototype.$qs = qs
axios.defaults.baseURL = 'http://10.193.245.41:8000'
// 把axios挂到Vue实例对象上
Vue.prototype.$axios = axios

new Vue({
  //注册路由
  router,

  //注册vuex
  store,

  //render
  render: h => h(App),

  //注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },

}).$mount('#app')
