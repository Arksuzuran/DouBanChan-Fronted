<template>
    <div>
        <div class="main">
            <div class="left">
                <span class="left-status">{{ statusName }}</span>
                <div v-if="avatar != ''" class="cropper-pre">
                    <img :src="avatar" alt="">
                </div>
                <div v-if="avatar == ''" class="image-now">
                    <img :src="userImgUrl" alt="">
                </div>
            </div>
            <div class="right">
                <div class="cropper-con">
                    <vue-cropper ref="cropper" :img="option.img" :outputSize="option.outputSize"
                        :outputType="option.outputType" :info="option.info" :canScale="option.canScale"
                        :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight" :fixed="option.fixed" :fixedNumber="option.fixedNumber"
                        :full="option.full" :fixedBox="option.fixedBox" :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox"
                        :height="option.height" :infoTrue="option.infoTrue" :maxImgSize="option.maxImgSize"
                        :enlarge="option.enlarge" :mode="option.mode" @realTime="realTime" @imgLoad="imgLoad">
                    </vue-cropper>
                </div>
                <div class="btn">
                    <input id="upload" type="file" @change="selectImg">
                    <label for="upload" class="icon-btn add-btn">
                        <div class="add-icon"></div>
                        <div class="btn-txt">{{ buttonName }}</div>
                    </label>
                    <div class="save" @click="saveUserImg">
                        <button>
                            确认更换
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: "CropperImage",
    components: {
        VueCropper
    },
    data() {
        return {
            previews: {},
            avatar: '',
            option: {
                img: '',             //裁剪图片的地址
                outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
                outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
                info: true,          //图片大小信息
                canScale: true,      //图片是否允许滚轮缩放
                autoCrop: true,      //是否默认生成截图框
                autoCropWidth: 145,  //默认生成截图框宽度
                autoCropHeight: 145, //默认生成截图框高度
                fixed: true,         //是否开启截图框宽高固定比例
                fixedNumber: [1, 1], //截图框的宽高比例
                full: false,         //false按原比例裁切图片，不失真
                fixedBox: true,      //固定截图框大小，不允许改变
                canMove: false,      //上传图片是否可以移动
                canMoveBox: true,    //截图框能否拖动
                original: false,     //上传图片按照原始比例渲染
                centerBox: false,    //截图框是否被限制在图片里面
                height: true,        //是否按照设备的dpr 输出等比例图片
                infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
                maxImgSize: 3000,    //限制图片最大宽度和高度
                enlarge: 1,          //图片根据截图框输出比例倍数
                mode: '150px 150px'  //图片默认渲染方式
            }
        };
    },
    methods: {
        ...mapMutations('userAbout', ['ModifyUserImgUrl']),
        saveUserImg() {
            if (this.option.img == '') {
                this.modifyError();
                return;
            }
            this.uploadImg();
        },
        modifySuccess() {
            this.$Notify.success({
                title: 'Success!',
                message: '头像更新成功！',
                showClose: false,
            })
        },
        modifyError() {
            this.$Notify.error({
                title: 'Error!',
                message: '请选择图片上传！',
                showClose: false,
            })
        },
        uploadError() {
            this.$Notify.error({
                title: 'Error!',
                message: '图片上传失败，请重新上传',
                showClose: false,
            })
        },
        //初始化函数
        imgLoad(msg) {
            console.log('载入成功...')
        },
        //实时预览函数
        realTime(data) {
            console.log(data)
            this.previews = data;
            this.$refs.cropper.getCropData(async (data) => {
                this.avatar = data
            })
        },
        //选择图片
        selectImg(e) {
            let file = e.target.files[0]
            if (!file) {
                return false
            }
            if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
                alert("图片类型要求:jpeg、jpg、png")
                return false
            }
            //转化为blob
            let reader = new FileReader()
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                this.option.img = data
            }
            //转化为base64
            reader.readAsDataURL(file)
        },
        //上传图片
        uploadImg() {
            //获取截图的blob数据
            this.$refs.cropper.getCropBlob(async (data) => {
                let formData = new FormData();
                formData.append('p_content', data, "userImage.jpg")
                formData.append("u_id", this.userId)
                console.log('data:', data);
                // 上传到服务端
                this.$axios({
                    method: "post",
                    data: formData,
                    url: "/user/update_profile/",
                    headers: { "content-type": " multipart/form-data" },
                })
                    .then((res) => {
                        console.log(res.data);
                        const uploadSuccess = res.data.msg;
                        if (uploadSuccess != 0) {
                            this.uploadError();
                            return;
                        }
                        this.ModifyUserImgUrl(this.option.img);
                        this.modifySuccess();
                        this.avatar = '';
                    })
                    .catch((err) => {
                        this.$message({
                            type: "error",
                            message: "网络出错QAQ",
                        });
                    });
            })
        },
    },
    computed: {
        statusName() {
            if (this.avatar == '') {
                return '当前头像'
            } else return '预览头像'
        },
        ...mapState('userAbout', ['userImgUrl']),
        buttonName() {
            if (this.option.img == '') {
                return '上传图片'
            } else return '重新选择'
        },
        ...mapState('userAbout', ['isLogin', 'userId']),
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.header .title {
    font-size: 18px;
    font-weight: 550;
}

.main {
    display: flex;
    height: 100%;
    width: 100%;
}

.left {
    width: 250px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.image-now {
    position: absolute;
    width: 250px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.left img {
    margin-top: 30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.right {
    flex: 1;
    display: flex;
    margin-left: 17.5px;
    margin-top: 25px;
}

.cropper-con {
    width: 200px;
    height: 200px;
    margin-right: 50px;
    margin-top: -30px;
}

.btn {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 240px;
    margin-left: -160px;
}

.btn #upload {
    display: none;
}

.icon-btn {
    width: 50px;
    height: 50px;
    border: 1px solid #cdcdcd;
    background: white;
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    transition: width 0.2s ease-in-out;
    font-weight: 500;
    font-family: inherit;
}

.add-btn:hover {
    width: 120px;
}

.add-btn::before,
.add-btn::after {
    transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
    content: "";
    position: absolute;
    height: 4px;
    width: 10px;
    top: calc(50% - 2px);
    background: rgb(0, 0, 0);
}

.add-btn::after {
    right: 14px;
    overflow: hidden;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
}

.add-btn::before {
    left: 14px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
}

.icon-btn:focus {
    outline: none;
}

.btn-txt {
    opacity: 0;
    transition: opacity 0.2s;
    margin-top: 14px;
}

.add-btn:hover::before,
.add-btn:hover::after {
    width: 4px;
    border-radius: 2px;
}

.add-btn:hover .btn-txt {
    opacity: 1;
}

.add-icon::after,
.add-icon::before {
    transition: all 0.2s ease-in-out;
    content: "";
    position: absolute;
    height: 20px;
    width: 2px;
    top: calc(50% - 10px);
    background: rgb(0, 0, 0);
    overflow: hidden;
}

.add-icon::before {
    left: 22px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
}

.add-icon::after {
    right: 22px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
}

.add-btn:hover .add-icon::before {
    left: 15px;
    height: 4px;
    top: calc(50% - 2px);
}

.add-btn:hover .add-icon::after {
    right: 15px;
    height: 4px;
    top: calc(50% - 2px);
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
    margin-left: 120px;
    margin-top: -50px;
}
</style>