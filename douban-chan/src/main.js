import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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

Vue.config.productionTip = false

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
