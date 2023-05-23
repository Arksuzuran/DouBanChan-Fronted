<template>
    <div class="login-module-big-block">
        <div class="login-module-block">
            <div
                :class="['login-module-left-content', { 'move-left': moveLeft, 'fade-out': fadeOut, 'move-right': moveRight }]">
                <div class="login-module-small-logo">
                    <i class="fa-brands fa-instagram"></i>
                </div>
                <div class="login-module-logo">
                    <div class="login-module-logo-image"></div>
                </div>
                <div v-if="notHideButtons" class="login-module-input">
                    <el-input v-model="inputAccount" placeholder="请输入账号"></el-input>
                    <br>
                    <br>
                    <el-input placeholder="请输入密码" v-model="inputPassword" show-password></el-input>
                </div>
                <div v-if="notHideButtons" class="login-module-button">
                    <el-button plain class="login-module-button-sign-up">注 册</el-button>
                    <el-button type="primary" class="login-module-button-login" @click="handleButtonClick"> 登 录 </el-button>
                </div>
                <div v-if="notHideButtons" class="login-module-radio">
                    <el-checkbox v-model="checked" class="login-module-radio-remember" size="mini">记住密码</el-checkbox>
                    <span class="login-module-radio-forget">忘记密码?</span>
                </div>
                <div v-if="notHideButtons" class="login-module-text">
                    <span>这一枪，叫温柔</span>
                </div>
            </div>
            <div div class=" login-module-right-content">
                <div class="login-module-right-container">
                    <swiper :options="swiperOption" ref="mySwiper" id="mySwiper">
                        <swiper-slide class="swiper_slide_item">
                            <LoginBackImage :imageUrl="imageUrl_1"></LoginBackImage>
                        </swiper-slide>
                        <swiper-slide class="swiper_slide_item">
                            <LoginBackImage :imageUrl="imageUrl_2"></LoginBackImage>
                        </swiper-slide>
                        <swiper-slide class="swiper_slide_item">
                            <LoginBackImage :imageUrl="imageUrl_3"></LoginBackImage>
                        </swiper-slide>
                        <!-- <swiper-slide class="swiper_slide_item">
                            <LoginBackImage :imageUrl="imageUrl_4"></LoginBackImage>
                        </swiper-slide> -->
                        <!--分页器-->
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginBackImage from './LoginBackImage.vue';
export default ({
    components: {
        LoginBackImage,
    },
    data() {
        return {
            imageUrl_1: 'login-back.jpg',
            imageUrl_2: 'OM.jpg',
            imageUrl_3: 'shadowdie2.jpg',
            inputAccount: '',
            inputPassword: '',
            moveLeft: false,
            fadeOut: false,
            moveRight: false,
            notHideButtons: true,
            //swiperOption：swiper配置项信息，需要绑定在swiper标签的 :option 属性中
            swiperOption: {
                //幻灯片放映方向
                direction: 'vertical', //通常不与左右按钮一同使用

                //分页器配置项
                pagination: {
                    el: ".swiper-pagination", //分页器的类名
                    clickable: true, // 点击分页器跳切换到相应的幻灯片
                    type: 'bullets',//小圆点
                    dynamicBullets: true,  //动态小圆点(type:'bullets'时)
                    //自定义分页器，需设置样式
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom ${index === this.activeIndex ? 'active' : ''}">${index + 1}</span>`;
                    },
                },
                //幻灯片播放配置项
                loop: true, //是否循环播放
                speed: 1000, // 发生页面切换动画时，动画的切换速度
                autoplay: {
                    delay: 8000, // 幻灯片停留时间
                    disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
                    stopOnLastSlide: false, // 切换到最后一个slide时是否停止自动切换。（loop模式下无效）。
                },
                on: {
                    slideChangeTransitionEnd: function () {
                        console.log(this.activeIndex); //每次切换结束时，在控制台打印现在是第几个slide
                    },
                },
            },
        };
    },
    //计算属性
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper;
        },
    },
    methods: {
        handleButtonClick() {
            this.moveLeft = !this.moveLeft;
            this.fadeOut = false;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.fadeOut = true;
                    this.moveRight = !this.moveRight;
                }, 1000);
                // setTimeout(() => {
                //     this.notHideButtons = !this.notHideButtons;
                // }, 1025)
                setTimeout(() => {
                    this.moveLeft = false;
                    this.fadeOut = false;
                    this.moveRight = false;//后续会修改成登录失败后返回
                    // this.notHideButtons = !this.notHideButtons;
                }, 5000);
            });
        },
        handleButtonClick2() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.moveLeft = false;
                    this.fadeOut = false;
                    this.moveRight = false;//后续会修改成登录失败后返回
                }, 1000);
            });
        },
    }
})
</script>

<style scoped>
.login-module-big-block {
    width: 750px;
    height: 520px;
    border-radius: 50px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(77, 84, 88);
    z-index: 89;
}

.login-module-small-logo {
    position: absolute;
    width: 40px;
    height: 40px;
    font-size: 30px;
    top: 20px;
    left: 20px;
}

.login-module-logo {
    position: absolute;
    width: 100px;
    height: 60px;
}

.login-module-logo-image {
    position: absolute;
    top: 120px;
    left: 130px;
    width: 100%;
    height: 100%;
    background-image: url("https://cdn.worldvectorlogo.com/logos/barbie-brand-1.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.login-module-input {
    position: absolute;
    width: 270px;
    height: 150px;
    top: 200px;
    left: 45px;
}

.login-module-button-sign-up {
    float: left;
    width: 120px;
    height: 40px;
    border-color: #0099DD;
    color: #0099DD;
    font-weight: 450;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-module-button-login {
    float: right;
    width: 120px;
    height: 40px;
    font-weight: 450;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-module-button {
    position: absolute;
    width: 270px;
    height: 50px;
    top: 310px;
    left: 45px;
}

.login-module-radio {
    position: absolute;
    width: 270px;
    height: 150px;
    top: 370px;
    left: 45px;
}

.login-module-radio-remember {
    margin-left: 8px;
    float: left;
}

.login-module-radio-forget {
    margin-right: 8px;
    float: right;
    font-size: 14px;
}

.login-module-text {
    position: absolute;
    width: 270px;
    height: 20px;
    top: 450px;
    left: 45px;
    font-size: 7px;
    color: #d8d8d8;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-module-block {
    width: 720px;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border-radius: 50px;
    display: flex;
    z-index: 90;
}

.login-module-left-content {
    position: absolute;
    width: 360px;
    height: 500px;
    right: 50%;
    opacity: 1;
    background-color: rgb(255, 255, 255);
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    z-index: 92;
    transform: z-index 2s ease;
    transition: transform 1.5s ease;
    /* 添加过渡效果 */
}

.login-module-left-content.move-left {
    transform: translateX(-365px);
    /* 控制向左移动的动画效果 */
}

.login-module-left-content.fade-out {
    background-color: rgb(255, 255, 255);
    z-index: 90;
}

.login-module-left-content.move-right {
    transform: translateX(0px);
    opacity: 0.8;
    border: 0px solid rgb(77, 84, 88);
    /* 控制向右移动的动画效果 */
}

.login-module-right-content {
    position: absolute;
    width: 720px;
    height: 500px;
    background-color: transparent;
    z-index: 91;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    overflow: hidden;
}


#mySwiper {
    position: absolute;
    width: 100%;
    height: 500px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: transparent;
    overflow: hidden;
}

.swiper-slide.swiper_slide_item {
    height: 300px;
    background-color: transparent;
}

#mySwiper /deep/ .swiper-pagination-bullet-custom {
    background-color: transparent !important;
}
</style>