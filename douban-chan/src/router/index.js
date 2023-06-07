import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookHomeView from '../views/BookHomeView.vue'
import TopicHomeView from '../views/Topic/TopicHomeView.vue'
import GroupHomeView from '../views/Group/GroupHomeView.vue'
import UserHomeView from '../views/UserHomeView.vue'
import LoginView from '../views/LoginView.vue'
import VideoHomeView from "../views/Video/VideoHomeView.vue";


import UserHomeFavlist from "../views/User/Favlist.vue";
import UserHomeGroup from "../views/User/Group.vue";
import UserHomeHome from "../views/User/Home.vue";
import UserHomeMessage from "../views/User/Message.vue";
import UserHomePost from "../views/User/Post.vue";
import UserHomeSubscribe from "../views/User/Subscribe.vue";
import UserHomeSetting from "../views/User/Setting.vue";

//影视
import VideoDetail from "../views/Video/VideoDetail.vue"
import VideoRankBoard from "../views/Video/VideoRankBoard.vue"
import VideoCategory from "../views/Video/VideoCategory.vue"
import VideoDefault from "../views/Video/VideoDefault.vue"
//小组
import GroupPage from "../views/Group/GroupPage.vue";
import GroupPostList from "../views/Group/GroupPostList.vue";
//帖子
import Post from "../views/Post/Post.vue";
import reviewView from "../views/Review/ReviewView.vue";
//话题
import TopicHomePostGroupList from '../views/Topic/TopicHomePostGroupList.vue';
import TopicHomeTopicSquare from '../views/Topic/TopicHomeTopicSquare.vue';
import TopicHomeTodaysHot from '../views/Topic/TopicHomeTodaysHot.vue';
import TopicPage from '../views/Topic/TopicPage.vue';
import TopicPostList from '../views/Topic/TopicPostList.vue';
import TopicPageDefault from '../views/Topic/TopicPageDefault.vue';
//搜索界面
import SearchView from '../views/Search/SearchView.vue';
import SearchBook from '../views/Search/SearchBook.vue';
import SearchVideo from '../views/Search/SearchVideo.vue';
import SearchPost from '../views/Search/SearchPost.vue';
import SearchGroup from '../views/Search/SearchGroup.vue';
import SearchTopic from '../views/Search/SearchTopic.vue';

//写影评
import WriteReview from "../views/Review/WriteReview.vue"

Vue.use(VueRouter);

const routes = [
  //网站主页
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  //图书版块主页
  {
    path: "/bookHome",
    name: "bookHome",
    component: BookHomeView,
  },
  //全站搜索页面
  {
    path: "/search",
    name: "search",
    component: SearchView,
    children: [
      {
        path: '/search/video',
        name: "searchVideo",
        component: SearchVideo,
      },
      {
        path: '/search/book',
        name: "searchBook",
        component: SearchBook,
      },
      {
        path: '/search/post',
        name: "searchPost",
        component: SearchPost,
      },
      {
        path: '/search/group',
        name: "searchGroup",
        component: SearchGroup,
      },
      {
        path: '/search/topic',
        name: "searchTopic",
        component: SearchTopic,
      },
    ]
  },
  //话题版块主页
  {
    path: "/topicHome",
    component: TopicHomeView,
    children: [
      //默认的二级路由 帖子小组列表
      {
        path: '',
        name: "topicHome",
        component: TopicHomePostGroupList,
      },
      //话题广场
      {
        path: '/topicHome/topicSquare',
        name: 'topicSquare',
        component: TopicHomeTopicSquare
      },
      //热榜
      {
        path: '/topicHome/todaysHot',
        name: 'todaysHot',
        component: TopicHomeTodaysHot
      },
    ]
  },
  //某话题的主页
  {
    path: "/topic",
    component: TopicPage,
    children: [
      {
        path: "",
        name: "topic",
        component: TopicPageDefault,
      },
      // 帖子的页面
      {
        path: '/topic/post',
        name: 'topicPost',
        component: Post
      },
      //
    ]
  },
  //小组版块主页
  {
    path: "/groupHome",
    name: "groupHome",
    component: GroupHomeView,
  },
  //影视主页
  {
    path: "/video",
    name: "videoHome",
    component: VideoHomeView,
    children: [
      {
        path: 'home',
        name: 'videoDefault',
        component: VideoDefault
      },
      {
        path: "rankboard",
        name: "rankBoard",
        component: VideoRankBoard
      },
      {
        path: "category",
        name: "videoCategory",
        component: VideoCategory
      },
      {
        path: '',
        redirect: 'home' // 设置空路由路径的重定向到默认子路由
      }
    ]
  },
  //某小组的主页
  {
    path: "/group",
    component: GroupPage,
    children: [
      //默认的二级路由
      {
        path: '',
        name: "group",  //让默认二级路由设置name
        component: GroupPostList,
      },
      // 帖子的页面
      {
        path: '/group/post',
        name: 'groupPost',
        component: Post
      },
      //groupTopicList
      {
        path: '/group/postList',
        name: 'groupTopicList',
        component: TopicHomeTopicSquare
      },
      // 成员列表页面
      // {
      //   path:'/group/memberList',
      //   name:'groupMemberList',
      //   component: TopicHomeTopicSquare
      // },
    ]
  },
  //影视详情页面
  {
    path: "/video/detail/:id",
    name: "videoDetail",
    component: VideoDetail,
  },
  //写影评页面
  {
    path: "/video/detail/:id/write_review",
    name: "writeReview",
    component: WriteReview,
  },
  //评论详情页面
  {
    path: "/video/review/:id",
    name: "review",
    component: reviewView,
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
      //修改资料
      {
        path: "setting",
        name: "userpageSetting",
        component: UserHomeSetting,
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
  scrollBehavior: () => ({ y: 0 }), //自动滚动到顶端
  routes,
});

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push/replace
//第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call/apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文(this）一次‘
//不同点：call/apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}


export default router;
