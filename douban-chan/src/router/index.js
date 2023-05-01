import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookHomeView from '../views/BookHomeView.vue'
import TopicHomeView from '../views/TopicHomeView.vue'
import GroupHomeView from '../views/GroupHomeView.vue'
import UserHomeView from '../views/UserHomeView.vue'
import LoginView from '../views/LoginView.vue'
import VideoHomeView from "../views/VideoHomeView.vue";

import UserHomeFavlist from "../views/User/Favlist.vue";
import UserHomeGroup from "../views/User/Group.vue";
import UserHomeHome from "../views/User/Home.vue";
import UserHomeMessage from "../views/User/Message.vue";
import UserHomePost from "../views/User/Post.vue";
import UserHomeSubscribe from "../views/User/Subscribe.vue";

import VideoDetail from "../views/Video/VideoDetail.vue"

Vue.use(VueRouter);

const routes = [
  //网站主页
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  //电影版块主页
  {
    path: '/videoHome',
    name: 'videoHome',
    component: VideoHomeView,
  },
  //电影详情页
  {
    path: '/videoDetail',
    name: 'videoDetail',
    component: VideoDetail,
  },
  //图书版块主页
  {
    path: "/bookHome",
    name: "bookHome",
    component: BookHomeView,
  },
  //话题版块主页
  {
    path: "/topicHome",
    name: "topicHome",
    component: TopicHomeView,
  },
  //小组版块主页
  {
    path: "/groupHome",
    name: "groupHome",
    component: GroupHomeView,
  },
  //用户个人账户主页
  {
    path: "/userHome",
    name: "userHome",
    component: UserHomeView,
    children: [
      //主页
      {
        path: "home",
        name: "userpageHome",
        component: UserHomeHome,
      },
      //收藏
      {
        path: "favlist",
        name: "userpageFavlist",
        component: UserHomeFavlist,
      },
      //订阅
      {
        path: "subscribe",
        name: "userpageSubscribe",
        component: UserHomeSubscribe,
      },
      //小组
      {
        path: "group",
        name: "userpageGroup",
        component: UserHomeGroup,
      },
      //帖子
      {
        path: "post",
        name: "userpagePost",
        component: UserHomePost,
      },
      //消息
      {
        path: "message",
        name: "userpageMessage",
        component: UserHomeMessage,
      },
    ],
  },
  //登录界面
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };


export default router;
