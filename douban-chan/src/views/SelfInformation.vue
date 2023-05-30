<template>
    <div class="self-info-block">
        <div class="self-info-menu-left">
            <div class="self-info-menu-left-select">
                <ChoiceMenu></ChoiceMenu>
            </div>
        </div>
        <div class="self-info-menu-right">
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
                            <input type="radio" id="man" name="value-radio" value="man" v-model="form.sex">
                            <label for="man">男</label>
                            <input type="radio" id="woman" name="value-radio" value="woman" v-model="form.sex">
                            <label for="woman">女</label>
                            <input type="radio" id="secret" name="value-radio" value="secret" v-model="form.sex">
                            <label for="secret">保密</label>
                        </div>
                    </div>
                    <div style="height: 25px;"></div>
                    <el-form-item label="出生日期">
                        <el-col :span="15">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                                style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <div style="height: 7px;"></div>
                    <el-form-item label="个人简介" prop="desc">
                        <el-input type="textarea" placeholder="填写个人简介更有利于交友哟qwq" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div class="save">
                <button>
                    保存
                </button>
            </div>
        </div>
        <!-- <ChoiceMenu></ChoiceMenu> -->
    </div>
</template>

<script>
import ChoiceMenu from './ChoiceMenu.vue';
import SelfInfoChoice from './SelfInfoChoice.vue';
export default ({
    components: {
        ChoiceMenu,
        SelfInfoChoice,
    },
    data() {
        return {
            form: {
                name: '秋子夜',
                saying: 'letting go',
                date: '2002-01-13',
                sex: 'secret',
                desc: '',
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
})
</script>

<style scoped>
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
    width: 70%;
    margin-left: 15%;
    height: 700px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
}

.self-info-menu-left {
    width: 20%;
    height: 700px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.self-info-menu-left-select {
    width: 50%;
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
    border: 1px solid #ccc;
    background-color: #ffffff;
    border-radius: 5px;
    margin-right: 12px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease-in-out;
}

.radio-input label:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #ccc;
    transition: all 0.3s ease-in-out;
}

.radio-input input[type="radio"]:checked+label:before {
    background-color: rgb(255, 106, 0);
    top: 0;
}

.radio-input input[type="radio"]:checked+label {
    background-color: rgb(255, 223, 223);
    color: #685151;
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
</style>