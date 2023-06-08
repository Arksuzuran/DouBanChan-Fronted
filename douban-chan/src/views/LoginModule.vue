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
                    <el-input v-model="inputAccount" autocomplete="off" name="text" class="input"
                        prefix-icon="el-icon-user-solid" placeholder="请输入用户名">
                    </el-input>
                    <br>
                    <br>
                    <el-input placeholder="请输入密码" v-model="inputPassword" prefix-icon="el-icon-lock" show-password>
                    </el-input>
                </div>
                <div v-if="notHideButtons" class="login-module-button">
                    <el-button plain class="login-module-button-sign-up" @click="clickToSignUp">注 册</el-button>
                    <el-button :disabled="isLoginDisabled" type="primary" class="login-module-button-login"
                        @click="handleButtonClick"> 登 录
                    </el-button>
                </div>
                <div v-if="notHideButtons" class="login-module-radio">
                    <el-checkbox v-model="remember" class="login-module-radio-remember" size="mini">记住密码</el-checkbox>
                    <span class="login-module-radio-forget" @click="forgetPassword">忘记密码?</span>
                </div>
                <div v-if="notHideButtons" class="login-module-text">
                    <span>欢迎使用豆瓣酱</span>
                </div>
            </div>
            <div class="login-module-right-content">
                <div class="login-module-right-container">
                    <swiper :options="swiperOption" ref="mySwiper" id="mySwiper">
                        <swiper-slide class="swiper_slide_item">
                            <LoginBackImage :imageUrl="imageUrl_4"></LoginBackImage>
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
            <!-- 注册界面 -->
            <div :class="['login-module-right-enroll', { 'notTransparent': isNotTransparent, 'toHighIndex': toHighIndex }]">
                <div class="login-module-logo" style="margin-top: -50px;">
                    <div class="login-module-logo-image"></div>
                </div>
                <div class="login-module-backToLogin">
                    <el-button type="text" @click="backToLogin"><i class="fa-solid fa-arrow-left"></i> 回到登录</el-button>
                </div>
                <div class="login-module-input" style="margin-top: -55px;">
                    <el-input v-model="inputEnrollAccount" prefix-icon="el-icon-user-solid" placeholder="请输入用户名">
                    </el-input>
                    <div style="height: 10px;"></div>
                    <el-input v-model="inputEnrollEmail" prefix-icon="el-icon-message" placeholder="请输入邮箱">
                    </el-input>
                    <div style="height: 10px;"></div>
                    <el-input v-model="inputEnrollPassword_1" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password>
                    </el-input>
                    <div style="height: 10px;"></div>
                    <el-input v-model="inputEnrollPassword_2" prefix-icon="el-icon-lock" placeholder="请确认密码" show-password>
                    </el-input>
                </div>
                <el-button :disabled="disableClick" @click="clickToTransparent" class="login-module-button-right-enroll">
                    注 册
                </el-button>
                <div class="login-module-right-enroll-radio">
                    <el-checkbox v-model="agreeAll" class="login-module--right-enroll-fbd" size="mini">
                        <span class="login-module-right-enroll-radio-long-text">同意我们的服务条款、隐私政策等</span>
                    </el-checkbox>
                </div>
                <div class="login-module-right-enroll-text">
                    <span>欢迎加入豆瓣酱</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginBackImage from './LoginBackImage.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import qs from 'qs'
export default ({
    components: {
        LoginBackImage,
    },
    data() {
        return {
            inputEnrollAccount: '',
            inputEnrollPassword_1: '',
            inputEnrollPassword_2: '',
            inputEnrollEmail: '',
            imageUrl_1: 'login3.jpg',
            imageUrl_2: 'login2.jpg',
            imageUrl_3: 'login1.jpg',
            imageUrl_4: 'login-back.jpg',
            inputAccount: '',
            inputPassword: '',
            moveLeft: false,
            fadeOut: false,
            moveRight: false,
            notHideButtons: true,
            remember: false,//是否记住密码
            agreeAll: false,
            isNotTransparent: false,
            toHighIndex: false,
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
            },
        };
    },
    //计算属性
    computed: {
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId']),
        swiper() {
            return this.$refs.mySwiper.$swiper;
        },
        isLoginDisabled() {
            return this.inputAccount === '' || this.inputPassword === '';
        },
        disableClick() {
            if (this.inputEnrollAccount === '' || this.inputEnrollPassword_1 === '' || this.inputEnrollPassword_2 === '' || this.inputEnrollEmail === '' || this.agreeAll == false)
                return true;
            else return false;
        }
    },
    methods: {
        ...mapMutations('userAbout', ['LOGIN', 'LOGOUT']),
        forgetPassword() {
            if (this.inputAccount === '') {
                this.$Notify.error({
                    title: '请输入用户名',
                    showClose: false,
                })
                return;
            }
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_name: this.inputAccount,
                }),
                url: "/sender/find/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data)
                    this.$Notify.success({
                        title: 'Success!',
                        message: '请查看邮箱',
                        showClose: false,
                    })
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ");
                });
        },
        handleButtonClick() {
            this.start();//开始捏
            this.moveLeft = !this.moveLeft;
            this.fadeOut = false;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.fadeOut = true;
                    this.moveRight = !this.moveRight;
                }, 1000);
            });
            this.requestLogin();
        },
        clickToTransparent() {
            this.start();
            const userNamePattern = /^[a-zA-Z0-9_]{4,12}$/;
            if (!userNamePattern.test(this.inputEnrollAccount)) {
                // 用户名不合法，执行相应的逻辑
                this.invalidUserName();
                this.error();
                return;
            }
            const emailPattern = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
            if (!emailPattern.test(this.inputEnrollEmail)) {
                // 邮箱地址不合法，执行相应的逻辑
                this.invalidEmail();
                this.error();
                return;
            }
            if (!(this.inputEnrollPassword_1 === this.inputEnrollPassword_2)) {
                this.errorPasswordMatch();
                this.error();
                return;
            }
            this.requestSignUp();
        },
        backToLogin() {
            this.start();
            this.toHighIndex = false;
            this.isNotTransparent = false;
            this.moveLeft = false;
            this.fadeOut = false;
            this.moveRight = false;
            this.finish();
        },
        clickToSignUp() {
            // 点击按钮事件处理
            this.toHighIndex = true;
            this.isNotTransparent = true; // 将模块设置为透明
            this.moveLeft = !this.moveLeft;
            this.fadeOut = false;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.fadeOut = true;
                    this.moveRight = !this.moveRight;
                }, 1000);
            });
        },
        loginSuccess() {
            this.$Notify.success({
                title: '登录成功',
                message: '祝您畅游豆瓣酱~',
                showClose: false,
            })
        },
        signUpSuccess() {
            this.$Notify.success({
                title: '注册成功',
                message: '恭喜你注册成功,请查看邮件',
                showClose: false,
            })
        },
        loginFail() {
            this.$Notify.error({
                title: '密码错误',
                message: '请重新输入密码',
                showClose: false,
            })
        },
        errorAccount() {
            this.$Notify.error({
                title: '账号错误',
                message: '请重新输入账号',
                showClose: false,
            })
        },
        invalidUserName() {
            this.$Notify.error({
                title: '用户名不合法',
                message: '合法用户名格式为4到12位(字母,数字,下划线)',
                showClose: false,
            })
        },
        errorPassword() {
            this.$Notify.error({
                title: '密码错误',
                message: '请重新输入密码',
                showClose: false,
            })
        },
        notOnlyUserName() {
            this.$Notify.error({
                title: '用户名已存在',
                message: '请重新输入用户名',
                showClose: false,
            })
        },
        errorPasswordMatch() {
            this.$Notify.error({
                title: '密码不一致',
                message: '请重新输入密码',
                showClose: false,
            })
        },
        invalidEmail() {
            this.$Notify.error({
                title: 'Error!',
                message: '邮箱格式不正确',
                showClose: false,
            })
        },
        start() {
            this.$Loading.start()
        },
        finish() {
            this.$Loading.finish()
        },
        error() {
            this.$Loading.error()
        },
        update() {
            this.$Loading.update(1000)
        },
        requestSignUp() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    username: this.inputEnrollAccount,
                    password: this.inputEnrollPassword_1,
                    email: this.inputEnrollEmail,
                }),
                url: "/user/register/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data)
                    // 使用 find 方法查找数组中是否存在指定 key 的元素
                    const foundElement = res.data.msg;
                    // const foundElement = this.accounts.find(item => item.account === this.inputEnrollAccount);
                    if (foundElement != 0) {
                        this.notOnlyUserName();
                        this.error();
                        return;
                    }
                    this.signUpSuccess();
                    this.finish();
                    this.inputAccount = this.inputEnrollAccount;
                    this.inputPassword = this.inputEnrollPassword_1;
                    this.remember = false;//是否记住呢

                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.toHighIndex = false;
                            this.isNotTransparent = false;
                            this.moveLeft = false;
                            this.fadeOut = false;
                            this.moveRight = false;
                        }, 500);
                    });
                })
                .catch((err) => {
                    this.error();
                    this.$message.error("网络出错QAQ");
                    this.toHighIndex = false;
                    this.isNotTransparent = false;
                    this.moveLeft = false;
                    this.fadeOut = false;
                    this.moveRight = false;
                });
        },
        requestLogin() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    username: this.inputAccount,
                    password: this.inputPassword,
                }),
                url: "/user/login/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    // 验证账号和密码
                    const isCredentialsValid = res.data.msg;
                    if (isCredentialsValid == 0) {
                        if (this.remember) {
                            // 如果用户选择记住密码，保存账号和密码到本地存储
                            localStorage.setItem('inputAccount', this.inputAccount);
                            localStorage.setItem('inputPassword', this.inputPassword);
                        } else {
                            // 如果用户取消记住密码，移除本地存储中的密码
                            localStorage.removeItem('inputPassword');
                        }
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.LOGIN(res.data.user);
                                this.loginSuccess();
                                this.finish();
                            }, 2000);
                        });
                    } else {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.loginFail();
                                this.error();
                                this.moveLeft = false;
                                this.fadeOut = false;
                                this.moveRight = false;
                                this.inputPassword = '';//清空密码
                                this.remember = false;
                            }, 2500);
                        });
                    }
                })
                .catch((err) => {
                    this.error();
                    this.$message.error("网络出错QAQ");
                    this.moveLeft = false;
                    this.fadeOut = false;
                    this.moveRight = false;
                    this.inputPassword = '';//清空密码
                    this.remember = false;
                });
        },
    },
    mounted() {
        // 检查本地存储中是否存在记住的账号和密码
        const savedUsername = localStorage.getItem('inputAccount');
        const savedPassword = localStorage.getItem('inputPassword');
        if (savedUsername && savedPassword) {
            this.inputAccount = savedUsername;
            this.inputPassword = savedPassword;
            this.remember = true;
        }
        if (savedUsername) {
            this.inputAccount = savedUsername;
        }
        if (this.inputPassword == '') {
            this.remember = false;
        }
    },


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

.login-module-backToLogin {
    position: absolute;
    width: 40px;
    height: 40px;
    font-size: 30px;
    top: 10px;
    left: 250px;
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

.login-module-right-enroll-radio {
    position: absolute;
    width: 250px;
    height: 150px;
    top: 350px;
    left: 45px;
}

.login-module-radio-forget {
    margin-right: 8px;
    float: right;
    font-size: 14px;
    cursor: pointer;
}

.login-module-radio-forget :hover {
    color: #0015ff;
}

.login-module--right-enroll-fbd {
    margin-left: 8px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-module-text {
    position: absolute;
    width: 270px;
    height: 20px;
    top: 450px;
    left: 45px;
    font-size: 7px;
    color: #d8d8d8;
    opacity: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-module-right-enroll-text {
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
    transform: translateX(-380px);
    /* 控制向左移动的动画效果 */
}

.login-module-left-content.fade-out {
    background-color: rgb(255, 255, 255);
    z-index: 90;
}

.login-module-left-content.move-right {
    transform: translateX(0px);
    opacity: 0.8;
    border: 0px solid transparent;
    background-color: rgb(77, 84, 88);
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

.login-module-right-enroll {
    position: absolute;
    width: 360px;
    height: 500px;
    left: 50%;
    background-color: rgb(255, 255, 255);
    z-index: 85;
    opacity: 0;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    transform: z-index 2s ease;
    transition: transform 2s ease;
}

.login-module-button-right-enroll {
    position: relative;
    top: 390px;
    left: 90px;
    width: 180px;
    height: 40px;
    border-color: #0099DD;
    color: #0099DD;
    font-weight: 500;
    font-size: 18px;
    z-index: 85;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: z-index 2s ease;
    transition: transform 1.5s ease;
}

.login-module-right-enroll-radio-long-text {
    white-space: pre-wrap;
    font-size: 10px;
}

.login-module-right-enroll.notTransparent {
    opacity: 1;
    /* 设置透明度 */
    /* 设置 z-index */
    transition: opacity 2s ease;
    /* 添加过渡效果 */
}


.login-module-right-enroll.toHighIndex {
    z-index: 95;
}

.login-module-button-right-enroll.toHighIndex {
    z-index: 95;
}
</style>