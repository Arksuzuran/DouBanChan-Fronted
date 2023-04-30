import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookHomeView from '../views/BookHomeView.vue'
import FilmHomeView from '../views/FilmHomeView.vue'
import TopicHomeView from '../views/TopicHomeView.vue'
import GroupHomeView from '../views/GroupHomeView.vue'
import UserHomeView from '../views/UserHomeView.vue'

Vue.use(VueRouter)

const routes = [
  //网站主页
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  //电影版块主页
  {
    path: '/filmHome',
    name: 'filmHome',
    component: () => import('../views/Video/VideoHome.vue')
  },
  //图书版块主页
  {
    path: '/bookHome',
    name: 'bookHome',
    component: BookHomeView
  },
  //话题版块主页
  {
    path: '/topicHome',
    name: 'topicHome',
    component: TopicHomeView
  },
  //小组版块主页
  {
    path: '/groupHome',
    name: 'groupHome',
    component: GroupHomeView
  },
  //用户个人账户主页
  {
    path: '/userHome',
    name: 'userHome',
    component: UserHomeView
  },
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
