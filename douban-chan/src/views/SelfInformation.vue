<template>
    <div class="self-info-block">
        <div class="self-info-menu-left">
            <div class="self-info-menu-left-select">
                <ChoiceMenu @option-selected="handleOptionSelected"></ChoiceMenu>
            </div>
        </div>
        <div v-if="choice == 1" class="self-info-menu-right">
            <div class="self-info-menu-right-choice">
                <SelfInfoChoice></SelfInfoChoice>
            </div>
            <el-divider></el-divider>
            <div class="self-info-menu-right-true">
                <el-form ref="form" :model="form" label-width="80px">
                    <div class="inputGroup">
                        <input type="text" required="" autocomplete="off" v-model="form.name">
                        <label for="name">昵称</label>
                    </div>
                    <div style="height: 5px;"></div>
                    <div class="inputGroup">
                        <input type="text" required="" autocomplete="off" v-model="form.saying">
                        <label for="name">个性签名</label>
                    </div>
                    <div style="height: 7px;"></div>
                    <div class="sex">
                        <label>性别</label>
                        <div class="radio-input">
                            <input type="radio" id="man" name="value-radio" value="男" v-model="form.sex">
                            <label for="man">男</label>
                            <input type="radio" id="woman" name="value-radio" value="女" v-model="form.sex">
                            <label for="woman">女</label>
                            <input type="radio" id="secret" name="value-radio" value="保密" v-model="form.sex">
                            <label for="secret">保密</label>
                        </div>
                    </div>
                    <div style="height: 25px;"></div>
                    <el-form-item label="出生日期">
                        <el-col :span="15">
                            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.date"
                                style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <div style="height: 7px;"></div>
                    <el-form-item label="个人简介" prop="desc">
                        <el-input type="textarea" placeholder="填写个人简介更有利于交友哟" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div class="save" @click="saveInfo">
                <button>
                    保存
                </button>
            </div>
        </div>
        <div v-if="choice == 2" class="self-info-menu-right-2">
            <div class="self-info-menu-right-choice-2">
                <changeImage></changeImage>
            </div>
            <el-divider></el-divider>
            <div class="self-info-menu-right-true-2">
                <div class="changeImage">
                    <UploadImage></UploadImage>
                </div>
            </div>
        </div>
        <div v-if="choice == 3" class="self-info-menu-right-3">
            <div class="self-info-menu-right-choice-3">
                <changePassword></changePassword>
            </div>
            <el-divider></el-divider>
            <div class="self-info-menu-right-true-3">
                <el-form ref="form" :model="form" label-width="80px">
                    <div style="height: 20px;"></div>
                    <div class="inputGroup">
                        <input type="text" required="" autocomplete="off" v-model="changePassword.email">
                        <label for="name">邮箱</label>
                    </div>
                    <div style="height: 5px;"></div>
                    <div style="height: 5px;"></div>
                    <div class="inputGroup">
                        <input type="password" required="" autocomplete="off" v-model="changePassword.newPassword1">
                        <label for="name">新密码</label>
                    </div>
                    <div style="height: 5px;"></div>
                    <div class="inputGroup">
                        <input type="password" required="" autocomplete="off" v-model="changePassword.newPassword2">
                        <label for="name">确认密码</label>
                    </div>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div :class="{ 'save': true, 'disabled': isButtonDisabled }" @click="submitChange">
                <button>
                    确认更改
                </button>
            </div>
        </div>
        <!-- <ChoiceMenu></ChoiceMenu> -->
    </div>
</template>

<script>
import ChoiceMenu from './ChoiceMenu.vue';
import SelfInfoChoice from './SelfInfoChoice.vue';
import UploadImage from '../components/UploadImage.vue'
import changePassword from './ChangePassword.vue';
import changeImage from './ChangeImage.vue';
import qs from 'qs';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default ({
    components: {
        ChoiceMenu,
        SelfInfoChoice,
        UploadImage,
        changePassword,
        changeImage,
    },
    data() {
        return {
            imagePath: require('../assets/conroy_img/qq.jpg'),
            choice: 1,
            form: {
                name: '秋子夜',
                saying: 'letting go',
                date: '2002-01-13',
                sex: '保密',
                desc: '',
            },
            changePassword: {
                email: '',
                newPassword1: '',
                newPassword2: '',
            },
        }
    },
    methods: {
        //提交给后端信息表单
        submitInfo() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                    u_nickname: this.form.name,
                    u_gender: this.form.sex,
                    u_birthday: this.form.date,
                    u_signature: this.form.saying,
                    u_desc: this.form.desc,
                }),
                url: "/user/change_profile/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data.user);
                    const submitSuccess = res.data.msg;
                    if (submitSuccess != 0) {
                        this.saveError();
                        return;
                    }
                    this.ModifyInfo(this.form);
                    this.saveSuccess();
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ")
                });
        },
        ...mapMutations('userAbout', ['ModifyInfo', 'LOGOUT']),
        //提交修改密码
        submitChange() {
            // 非下划线的单词字符 + 2个以上单词字符 + @ + 2位以上单词字符域名 + .2位以上小写字母做域名后缀 + (.2位以上二重域名后缀)?
            // var reg = /^(用户名)@(组织名)\.(一级域名后缀)(二级域名后缀)?$/
            const emailPattern = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
            if (!emailPattern.test(this.changePassword.email)) {
                // 邮箱地址不合法，执行相应的逻辑
                this.invalidEmailWarning();
                return;
            }
            if (this.changePassword.email != this.userEmail) {
                this.emailError();
                return;
            }

            if (this.changePassword.newPassword1 != this.changePassword.newPassword2) {
                this.errorPassword();
                return;
            }
            //检测密码是否合法
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
            if (!passwordPattern.test(this.changePassword.newPassword1)) {
                // 密码不合法，执行相应的逻辑
                this.invalidPassword();
                this.error();
                return;
            }
            this.emailSuccess();
            //这里需要调用后端的部分
            this.$nextTick(() => {
                setTimeout(() => {
                    this.submitPassword();
                }, 1000);
            });
        },
        invalidPassword() {
            this.$Notify.error({
                title: '密码不合法',
                message: '合法密码格式为8到16位(至少一个大写字母,小写字母,数字,其他任意)',
                showClose: false,
            })
        },
        //提交给后端信息表单
        submitPassword() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                    new_password: this.changePassword.newPassword1,
                }),
                url: "/user/change_password/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    const submitSuccess = res.data.msg;
                    if (submitSuccess != 0) {
                        this.passwordError();
                        return;
                    }
                    this.passwordSuccess();
                    this.LOGOUT();
                    this.$router.push('/');//退出登录回到主页
                    localStorage.removeItem('inputPassword');
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ")
                });
        },
        handleOptionSelected(option) {
            if (option == '个人信息') {
                this.choice = 1;
            } else if (option == '修改头像') {
                this.choice = 2;
            } else if (option == '修改密码') {
                this.choice = 3;
            }
            // 在这里处理选中的选项
        },
        saveInfo() {
            if (this.form.name == '') {
                this.nameError();
                return;
            }
            this.submitInfo();
        },
        saveSuccess() {
            this.$Notify.success({
                title: 'Success!',
                message: '您的信息修改成功',
                showClose: false,
            })
        },
        saveError() {
            this.$Notify.error({
                title: 'Error!',
                message: '修改失败，请尝试重新修改！',
                showClose: false,
            })
        },
        nameError() {
            this.$Notify.error({
                title: 'Error!',
                message: '昵称不能为空',
                showClose: false,
            })
        },
        emailWarning() {
            this.$Notify.warning({
                title: 'Warning!',
                message: '请输入邮箱地址',
                showClose: false,
            })
        },
        emailError() {
            this.$Notify.error({
                title: 'Error!',
                message: '邮箱地址错误！',
                showClose: false,
            })
        },
        invalidEmailWarning() {
            this.$Notify.warning({
                title: 'Warning!',
                message: '邮箱格式不合法',
                showClose: false,
            })
        },
        emailSuccess() {
            this.$Notify.success({
                title: 'Success!',
                message: '验证码发送成功,请查看邮箱！',
                showClose: false,
            })
        },
        emailErrorSb() {
            this.$Notify.error({
                title: 'Error!',
                message: '是不是有病？发完验证码还改邮箱？',
                showClose: false,
            })
        },
        errorPassword() {
            this.$Notify.error({
                title: 'Error!',
                message: '密码不一致',
                showClose: false,
            })
        },
        passwordSuccess() {
            this.$Notify.success({
                title: 'Success!',
                message: '密码修改成功!请重新登录',
                showClose: false,
            })
        },
        passwordError() {
            this.$Notify.error({
                title: 'Error!',
                message: '密码修改失败!请重新尝试',
                showClose: false,
            })
        },
    },
    computed: {
        updatedImagePath() {
            return this.imagePath;
        },
        isButtonDisabled() {
            if (this.changePassword.email == '' || this.changePassword.newPassword1 == '' || this.changePassword.newPassword2 == '') {
                return true;
            }
            else return false;
        },
        ...mapState('userAbout', ['userId', 'userNick', 'userSignature', 'userSex', 'userBirthday', 'userDesc', 'userEmail']),
    },
    mounted() {
        this.form.name = this.userNick;
        this.form.saying = this.userSignature;
        if (this.userBirthday == '保密') this.form.date = null;
        else this.form.date = this.userBirthday;
        this.form.sex = this.userSex;
        this.form.desc = this.userDesc;
    }
})
</script>

<style scoped>
.disabled {
    pointer-events: none;
    /* 禁用按钮作用在 .save 元素上 */
    opacity: 0.5;
    /* 设置透明度为 0.5 */
}

.save button {
    background-color: white;
    color: black;
    border-radius: 10em;
    font-size: 16px;
    font-weight: 600;
    padding: 0.8em 2em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 1px solid black;
    box-shadow: 0 0 0 0 black;
}

.save button:hover {
    transform: translateY(-4px) translateX(-2px);
    box-shadow: 2px 5px 0 0 black;
}

.save button:active {
    transform: translateY(2px) translateX(1px);
    box-shadow: 0 0 0 0 black;
}

.save {
    width: 100%;
}

.sex {
    margin-left: 12px;
    display: flex;
    align-items: center;
}

.self-info-block {
    display: flex;
    flex-direction: row;
    width: 80%;
    margin-left: 15%;
    height: 600px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
}

.self-info-menu-left {
    width: 20%;
    height: 600px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.self-info-menu-left-select {
    width: 60%;
    height: 300px;
    /* background-color: black; */
    display: flex;
    /* justify-content: center; */
    /* 水平居中 */
    align-items: center;
    margin-top: 10%;
    margin-left: 25%;
    transform: scale(1.4);
    /* 垂直居中 */
}

.self-info-menu-right {
    margin-left: 4%;
    margin-right: 2%;
    width: 65%;
    height: 600px;
    background-color: transparent;
}

.self-info-menu-right-choice {
    width: 95%;
    margin-top: 10px;
    height: 50px;
    display: flex;
    align-items: center;
}

.self-info-menu-right-true {
    width: 50%;
    margin-left: 5%;
    height: 360px;
}

.inputGroup {
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0 1em 0;
    max-width: 250px;
    position: relative;
}

.inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
}

.inputGroup label {
    font-size: 100%;
    position: absolute;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
}

.inputGroup :is(input:focus, input:valid)~label {
    transform: translateY(-50%) scale(.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background: #f9f9f9;
}

.inputGroup :is(input:focus, input:valid) {
    border-color: rgb(150, 150, 200);
}

.radio-input {
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    font-weight: 600;
}

.radio-input input[type="radio"] {
    display: none;
}

.radio-input label {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #ffffff;
    border-radius: 5px;
    margin-right: 12px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease-in-out;
}




.radio-input input[type="radio"]:checked+label {
    background-color: #393939;
    color: #ffffff;
    border-color: rgb(1, 1, 1);
    animation: radio-translate 0.5s ease-in-out;
}

@keyframes radio-translate {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateX(0);
    }
}

.self-info-menu-right-2 {
    margin-left: 4%;
    margin-right: 2%;
    width: 65%;
    height: 600px;
    background-color: transparent;
}

.self-info-menu-right-choice-2 {
    width: 95%;
    margin-top: 10px;
    height: 50px;
    display: flex;
    align-items: center;
}

.self-info-menu-right-true-2 {
    width: 90%;
    margin-left: 5%;
    height: 250px;
}

.changeImage {
    margin-top: 120px;
    margin-left: 50px;
}

.self-info-menu-right-3 {
    margin-left: 4%;
    margin-right: 2%;
    width: 65%;
    height: 600px;
    background-color: transparent;
}

.self-info-menu-right-choice-3 {
    width: 95%;
    margin-top: 10px;
    height: 50px;
    display: flex;
    align-items: center;
}

.self-info-menu-right-true-3 {
    width: 50%;
    margin-left: 5%;
    height: 300px;
}

.forKey {
    --primary-color: #645bff;
    --secondary-color: #fff;
    --hover-color: #111;
    --arrow-width: 10px;
    --arrow-stroke: 2px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    color: var(--secondary-color);
    padding: 1em 1.8em;
    background: var(--primary-color);
    display: flex;
    transition: 0.2s background;
    align-items: center;
    gap: 0.6em;
    font-weight: bold;
    position: absolute;
    margin-left: 270px;
    margin-top: -222px;
}

.forKey .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.forKey .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
}

.forKey .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
}

.forKey:hover {
    background-color: var(--hover-color);
}

.forKey:hover .arrow {
    background: var(--secondary-color);
}

.forKey:hover .arrow:before {
    right: 0;
}
</style>