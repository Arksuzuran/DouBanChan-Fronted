<template>
    <div :class="{ 'menu-wrapper': true, 'navbar-scroll': true, 'scrolled': navbarClass, 'reset': !navbarClass }">
        <div class="logo-wrapper">
            <img height="40px" src="https://cdn.worldvectorlogo.com/logos/barbie-brand-1.svg" alt="logo" />
        </div>
        <div class="menu-items">
            <div v-for="item in menuItems" :key="item.value" class="menu-item"
                :class="{ active: item.value === menuValue, 'menu-item-hovered': item === hoveredItem }"
                @click="handleMenuClick(item.value)" @mouseover="handleMenuItemHover(item)">
                {{ item.label }}
            </div>
        </div>
        <!-- 搜索 -->
        <div class="menu-search">
            <Search></Search>
        </div>
        <div class="Navbar-image-block-position" @mouseleave="hideIndividualBlock">
            <!-- 头像 -->
            <div class="NavBar-block cartoon-big" @mouseover="showIndividualBlock" @click="gotoUserHome" v-if="isLogin"
                :style="animationStyle">
                <el-avatar :size="60" :src="userImgUrl"></el-avatar>
            </div>
            <div class="NavBar-block" @click="showLogin" v-if="!isLogin">
                <el-avatar :size="60" :src="image"></el-avatar>
            </div>
            <!-- 个人简介弹窗 -->
            <div v-if="isLogin && showIndividual" class="NavBar-individual-block"
                :style="{ opacity: individualBlockOpacity, transition: 'opacity 0.5s' }">
                <IndividualMiniCard></IndividualMiniCard>
            </div>
        </div>
        <!-- 登录弹窗 -->
        <div v-if="clickLogin" class="NavBar-login-block">
            <div class="NavBar-login-overlay" @click="closeLogin"></div>
            <LoginModule></LoginModule>
        </div>
        <div class="cartoon">
            <NavBarCartoon></NavBarCartoon>
        </div>
    </div>
</template>

<script>
// 在需要使用vuex的场合下引入vuex
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import { defineComponent } from 'vue';
import LoginModule from '../views/LoginModule.vue';
import IndividualMiniCard from '../views/IndividualMiniCard.vue';
import Search from '../views/Search.vue'
import NavBarCartoon from '../components/NavBarCartoon.vue';
export default {
    components: {
        LoginModule,
        IndividualMiniCard,
        Search,
        NavBarCartoon,
    },
    data() {
        return {
            hoveredItem: null, // 当前被悬浮的菜单项
            showIndividual: false,
            individualBlockOpacity: 0, // 初始透明度为 0
            clickLogin: false,
            image: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            menuItems: [
                { label: '主页', value: 'item1', index: "" },
                { label: '电影', value: 'item2', index: "video" },
                { label: '图书', value: 'item3', index: "book" },
                { label: '小组', value: 'item4', index: "groupHome" },
                { label: '话题', value: 'item5', index: "topicHome" },
            ],
            restaurants: [],
            state: '',
            homePath: ['/'],
            videoPath: ['videoHome', 'videoDefault', 'rankBoard', 'videoCategory', 'videoDetail', 'writeReview', 'videoReview'],
            bookPath: ['bookHome', 'bookDefault', 'bookRankBoard', 'bookCategory','bookDetail', 'writeBookReview', 'bookReview'],
            groupPath: ['groupHome', 'group', 'groupPost', 'groupTopicList'],
            topicPath: ['topicHome', 'topicSquare', 'todaysHot', 'topicPost'],
            scrollDistance: 0,
        };
    },
    methods: {
        handleScroll() {
            this.scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        },
        handleMenuItemHover(item) {
            this.hoveredItem = item;
        },
        showIndividualBlock() {
            this.showIndividual = true;
            this.individualBlockOpacity = 1; // 鼠标悬停时将透明度设置为 1
        },
        hideIndividualBlock() {
            this.individualBlockOpacity = 0; // 鼠标离开时将透明度恢复为 0
            this.showIndividual = false;

        },
        showLogin() {
            this.clickLogin = true; // 显示弹窗
            document.body.style.overflow = 'hidden'; // 隐藏滚动条
            document.addEventListener('scroll', this.disableScroll, { passive: false }); // 禁用滚动事件
        },
        closeLogin() {
            this.clickLogin = false;
            document.body.style.overflow = 'auto'; // 恢复滚动条
            document.removeEventListener('scroll', this.disableScroll); // 移除禁用滚动事件
        },
        gotoUserHome() {
            if (this.isLogin) {
                this.$router.push('/userHome/home')
            }
        },
        handleMenuClick(value) {
            // 路由跳转
            const selectedItem = this.menuItems.find(item => item.value === value);
            if (selectedItem) {
                this.$router.push({
                    path: '/' + selectedItem.index,
                });
            }
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                { "value": "钱记", "address": "上海市长宁区天山西路" },
                { "value": "壹杯加", "address": "上海市长宁区通协路" },
                { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                { "value": "浏阳蒸菜", "address": "天山西路430号" },
                { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
            ];
        },
    },
    computed: {
        navbarClass() {
            if (this.scrollDistance > 0) return true;
            else if (this.scrollDistance == 0) return false;
        },
        menuValue() {
            const currentRoute = this.$route.name;
            if (this.$route.path === "/") {
                return 'item1';
            } else if (this.videoPath.includes(currentRoute)) {
                return 'item2';
            } else if (this.bookPath.includes(currentRoute)) {
                return 'item3';
            } else if (this.groupPath.includes(currentRoute)) {
                return 'item4';
            } else if (this.topicPath.includes(currentRoute)) {
                return 'item5';
            } else {
                return '';
            }
        },
        animationStyle() {
            if (this.showIndividual) {
                return 'transition: transform 0.5s;transform: scale(1.3) translateY(10px);';
            } else {
                return 'transition: transform 0.5s; transform: scale(1) translateY(0);';
            }
        },
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
    },
    mounted() {
        this.restaurants = this.loadAll();
    },
    watch: {
        isLogin(newValue) {
            if (newValue) {
                this.closeLogin();
            }
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<style scoped>
.menu-item-hovered {
    animation: jumpAnimation 0.5s;
}

@keyframes navbarAnimation {
    from {
        height: 100px;
        border-radius: 0px;
        background-image: url('../assets/conroy_img/backImage.png');
    }

    to {
        height: 70px;
        border-radius: 10px;
        background-color: #f2f2f2;
        background-image: none;
    }
}


.navbar-scroll.scrolled {
    animation: navbarAnimation 0.5s forwards;
}

@keyframes navbarResetAnimation {
    from {
        height: 70px;
        border-radius: 10px;
        background-color: #f2f2f2;
        background-image: none;
    }

    to {
        height: 100px;
        border-radius: 0px;
        background-image: url('../assets/conroy_img/backImage.png');
    }
}

@keyframes jumpAnimation {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }
}


.navbar-scroll.reset {
    animation: navbarResetAnimation 0.5s forwards;
}

.scrolled {
    animation: none;
    height: 120px;
    border-radius: 0px;
}


.cartoon {
    margin-left: 30px;
}

.menu-search {
    margin-left: 75px;
}

.NavBar-individual-block {
    width: 17em;
    height: 22.5em;
    background-color: transparent;
    border-radius: 10px;
    position: absolute;
    margin-top: -10px;
    margin-left: -78px;
    clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    /* 初始透明度为 0 */
    transition: opacity 0.5s ease;
    opacity: 0;
    z-index: 49;
}

.NavBar-block {
    cursor: pointer;
    position: relative;
    margin-left: 16.5%;
    z-index: 50;
}

.Navbar-image-block-position {
    position: relative;
    margin-left: 16.5%;
    z-index: 50;
}

.el-icon-search {
    color: #000;
    font-size: large;
}

.menu-wrapper {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    background-image: url('../assets/conroy_img/backImage.png');
    border: none;
    padding: 10px;
}

.logo-wrapper {
    margin-left: 30px;
}

.menu-items {
    margin-left: 45px;
    display: flex;
}

.menu-item {
    padding: 15px 30px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 20px;
    color: rgb(104, 104, 104);
    transition: background-color 0.3s;
}

.menu-item.active {
    background-color: #734623;
    color: #fff;
}

.menu-item:hover {
    color: #ff6200;
}

.my-autocomplete {
    line-height: normal;
    padding: 7px;
}

.name {
    text-overflow: ellipsis;
    overflow: hidden;
}

.addr {
    font-size: 12px;
    color: #b4b4b4;
}

.highlighted .addr {
    color: #ddd;
}

.NavBar-login-block {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 81;
    background-color: rgba(0, 0, 0, 0.65);
}

.NavBar-login-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 80;
    background-color: transparent;
}
</style>
