<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" class="card">
            <div class="flag">
                <button class="favorite-button" @click="wantFav">
                    <span class="fa-layers fa-fw" style="background:transparent position: absolute; top: 0px; left: 0px;">
                        <i v-if="!movie.is_fav" class="fas fa-bookmark" style="opacity: 0.3 font-size: 30px;"></i>
                        <i v-if="!movie.is_fav" class="fa-duotone fa-plus fa-xs"
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-55%, -300%); color: #ffffff; font-size: 30px;"></i>
                        <i v-if="movie.is_fav" class="fas fa-bookmark"
                            style="opacity: 0.3 font-size: 30px; color: #ff8b32;"></i>
                        <i v-if="movie.is_fav" class="fa-solid fa-check fa-xs"
                            style="position: absolute; top: 50%; left: 55%; transform: translate(-55%, -300%); color: #000000; font-size: 24px;"></i>
                    </span>
                </button>
            </div>
            <div class="image-container" @click="toDetailPage(movie.m_id)">
                <img :src="movie.m_profile_photo" class="image">
            </div>
            <div class="content">
                <i class="fa-solid fa-star" style="color: #ffdd00;"></i>
                <span style="letter-spacing: -0.5px; vertical-align: middle;margin-left: 3px;color: #ffffff;">{{
                    movie.m_rate
                }}</span>
                <button class="star-button" @click="showRate">
                    <i class="fa-solid fa-star star-button-color-1"></i>
                </button>
            </div>
            <div style="margin-top: -15px;text-align: left;margin-left: 10px;">
                <span class="card-name" style="display: inline-block;">{{ movie.m_name }}</span>
            </div>
            <el-button type="info" plain
                style="border: none;margin-left: 10px;margin-top: 0px;color:#003899; float: left;width: 180px; font-weight: bold;">
                <i class="fa-solid fa-magnifying-glass" style="color: #003899;"></i>
                &nbsp 查看详情
            </el-button>
            <div style="float: left;width: 200px;margin-top: 5px;">
                <el-button type="info" plain
                    style="border: none;margin-left: 10px;margin-top: 0px;color:#003899; width: 110px;font-weight: bold;float: left;"><i
                        class="fa-solid fa-play"> </i>&nbsp
                    预告片
                </el-button>
                <el-button circle style="border: none;margin-top: -3px;background-color:#002333;" @click="showModal"><i
                        class="fa-solid fa-circle-info custom-icon"></i></el-button>
            </div>
        </el-card>

        <!-- 详情弹窗 -->
        <div v-if="isModalVisible" class="modal">
            <div class="modal-overlay" @click="closeModal"></div> <!-- 遮罩层 -->
            <div class="modal-content">
                <div>
                    <img :src="movie.m_profile_photo" class="image-modal">
                </div>
                <button class="modal-name">{{ movie.m_name }}</button>
                <button class="close-button" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-detail">
                    <div class="modal-info-1">
                        <span class="info-value-1"><i class="fa-solid fa-calendar-days"></i> {{ movie.m_year }} &nbsp<i
                                class="fa-solid fa-clock"></i> {{ movie.m_duration }} &nbsp<i
                                class="fa-solid fa-location-dot"></i>
                            {{ movie.m_region }}</span>
                    </div>
                    <div class="modal-info-2">
                        <span class="info-value-2"><i class="fa-solid fa-film"> </i>
                            {{ movie.m_genre }}</span>
                    </div>
                </div>
                <div class="modal-rate">
                    <i class="fa-solid fa-star" style="color: #ffdd00;"></i>
                    <span style="letter-spacing: -0.5px; vertical-align: middle;margin-left: 3px;">{{ movie.m_rate }}</span>
                    <span
                        style="letter-spacing: -0.5px; vertical-align: middle;margin-left: 2px;color: rgba(0, 0, 0, 0.5);">/10</span>
                    <button class="modal-rating" @click="showRate"><i class="fa-solid fa-star" style="color: #dcdde0;"></i>
                        <span class="text-rating"> 打分</span></button>
                </div>
                <div class="modal-introduction">
                    <span class="modal-introduction-text">
                        {{ movie.m_description }}
                    </span>
                </div>
                <div class="modal-people-d">
                    <span>
                        导演：<span class="modal-people-d-text">{{ movie.m_director }}</span>
                    </span>
                </div>
                <div class="modal-people-s">
                    <span>
                        主演：<span class="modal-people-s-text">{{ movie.m_actor }}</span>
                    </span>
                </div>
                <el-button type="info" plain
                    style="border: none;margin-top: 70%;float: left;color:#003899; width: 320px;font-weight: bold;">
                    <i class="fa-solid fa-magnifying-glass" style="color: #003899;"></i> &nbsp 查看详情
                </el-button>
                <el-button type="info" plain
                    style="border: none;margin-top: 70%;float: right;color:#003899; width: 120px;font-weight: bold;">
                    <i class="fa-solid fa-pen-to-square"></i>
                    &nbsp 写影评
                </el-button>
            </div>
        </div>

        <!-- 评分弹窗 -->
        <div v-if="isRateVisible" class="rate">
            <div class="rate-overlay" @click="closeRate"></div> <!-- 遮罩层 -->
            <div class="rate-content">
                <div class="Transparent-plate"></div>
                <button class="close-button" @click="closeRate"><i class="fa-solid fa-xmark"></i></button>
                <div class="not-Transparent-plate">
                    <div class="rate-icon-container">
                        <i class="fa-solid fa-star fa-2xl rate-custom-icon"
                            :style="{ color: '#669eff', fontSize: starSize }"></i>
                        <span v-if="value" class="rate-count">{{ value }}</span>
                        <span v-if="!value" class="rate-count">?</span>
                    </div>
                    <div class="rate-block">
                        <span class="rate-this">RATE THIS</span>
                        <span class="rate-name">{{ movie.m_name }}</span>
                        <!-- <span class="demonstration">区分颜色</span> -->
                        <el-rate style="margin-top: 3%;" v-model="value" :colors="colors" :max="10">
                        </el-rate>
                        <button class="universal-rate-button" :disabled="value === 0" :class="{ 'disabled': value === 0 }"
                            @click="rate()">打分</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
export default {
    props: ['movie'],
    data() {
        return {
            tempMark: false,
            isModalVisible: false, // 控制弹窗的显示与隐藏
            isRateVisible: false,
            value: 0,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        };
    },
    methods: {
        showModal() {
            this.isModalVisible = true; // 显示弹窗
            document.body.style.overflow = 'hidden'; // 隐藏滚动条
            document.addEventListener('scroll', this.disableScroll, { passive: false }); // 禁用滚动事件
        },
        rate() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                    m_id: this.movie.m_id,
                    rate: this.value,
                }),
                url: "/media/rate_media/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data.msg)
                    if (res.data.msg === 0) {
                        this.closeRate()
                        this.$Notify.success({
                            title: 'Success',
                            message: '评分成功！',
                            showClose: false,
                        })
                    }
                })
                .catch((err) => {
                    this.$message.error("网络出错QAQ")
                });
        },
        closeModal() {
            this.isModalVisible = false;
            document.body.style.overflow = 'auto'; // 恢复滚动条
            document.removeEventListener('scroll', this.disableScroll); // 移除禁用滚动事件
        },
        disableScroll(event) {
            event.preventDefault();
            event.stopPropagation();
        },
        showRate() {
            if (!this.isLogin) {
                this.favError();
                return;
            }
            this.isRateVisible = true;
            if (!this.isModalVisible)
                document.body.style.overflow = 'hidden'; // 隐藏滚动条
            document.addEventListener('scroll', this.disableScroll, { passive: false }); // 禁用滚动事件
        },
        closeRate() {
            this.value = 0;
            this.isRateVisible = false;
            if (!this.isModalVisible)
                document.body.style.overflow = 'auto'; // 恢复滚动条
            document.removeEventListener('scroll', this.disableScroll); // 移除禁用滚动事件
        },
        toDetailPage(videoId) {
            this.$router.push({ name: 'videoDetail', params: { id: videoId } })
        },
        //当前用户想要收藏或者取消收藏
        wantFav() {
            //提醒用户先登录
            if (!this.isLogin) {
                this.favError();
                return;
            }
            this.tempMark = !this.movie.is_fav;
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                    m_id: this.movie.m_id,
                    op: this.tempMark ? 1 : 0,
                }),
                url: "/media/set_favourite/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    if (this.tempMark) {
                        if (res.data.msg == 0) {
                            this.movie.is_fav = !this.movie.is_fav;
                            this.favSuccess();
                        } else {
                            this.favFail();
                        }
                    } else {
                        if (res.data.msg == 0) {
                            this.movie.is_fav = !this.movie.is_fav;
                            this.cancelSuccess();
                        } else {
                            this.cancelFail();
                        }
                    }
                })
                .catch((err) => {
                    this.error();
                    this.$message.error("网络出错QAQ");
                });
        },
        favSuccess() {
            this.$Notify.success({
                title: 'Success',
                message: '恭喜你订阅成功！',
                showClose: false,
            })
        },
        cancelSuccess() {
            this.$Notify.success({
                title: 'Success',
                message: '取消订阅成功！',
                showClose: false,
            })
        },
        favError() {
            this.$Notify.error({
                title: 'Error',
                message: '请您先登录',
                showClose: false,
            })
        },
        favFail() {
            this.$Notify.error({
                title: 'Error',
                message: '订阅失败,请您重新尝试',
                showClose: false,
            })
        },
        cancelFail() {
            this.$Notify.error({
                title: 'Error',
                message: '取消订阅失败，请你重新尝试',
                showClose: false,
            })
        },
    },
    computed: {
        ...mapState('userAbout', ['userId', 'isLogin']),
        starSize() {
            return this.value * 2 + 100 + 'px';
        },
    },
    mounted() {
    },
};
</script>

<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

.modal-introduction-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
}

.card {
    width: 200px;
    height: 400px;
    display: flex;
    flex-direction: column;
    position: relative;
    border: none;
    background-color: #002333;
    cursor: pointer;
}

.card-name {
    font-family: "Montserrat", sans-serif;
    font-size: 25px;
    font-weight: bold;
    color: #f2f2f2;
}

.flag {
    position: absolute;
    top: 3px;
    left: 1px;
    height: 40px;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
}

.favorite-button {
    position: relative;
    top: 0px;
    margin-left: -1px;
    left: 0px;
    background-color: transparent;
    border: none;
    font-size: 45px;
    color: #333333;
    cursor: pointer;
    padding: 0px;
}

.image-container {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
    background-color: transparent;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    z-index: 1;
}

.content {
    text-align: left;
    padding: 5px;
    position: relative;
    padding-left: 12px;
    z-index: 1;
    margin-top: -5px;
    font-size: 16px;
    max-height: 70px;
}

.text {
    padding: 8px;
    padding-left: 12px;
    position: relative;
    z-index: 1;
    font-size: 18px;
    margin-top: -7px;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0px;
    border-radius: 20px;
    float: right;
}

.star-button {
    font-size: 13px;
    border: none;
    margin-left: 80px;
    background-color: transparent;
    padding: 10px 10px;
    border-radius: 30px;
    /* 调整按钮的宽度和高度 */
}

.star-button:hover {
    background-color: #159A9C;
    /* 设置悬停状态下的背景色 */
}

.star-button-color-1 {
    color: #dcdde0;
}

.star-button:hover .star-button-color-1 {
    color: #faa328;
}

.custom-icon {
    font-size: 20px;
    /* 设置图标的大小 */
}

.custom-icon-arrow {
    font-size: 27px;
    /* 调整图标大小 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    /* 添加文本阴影效果来增加饱满感 */
    color: rgb(0, 0, 0);
    /* 改变图标颜色 */
    position: absolute;
    top: 7%;
    left: 50%;
}

.rate {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.rate-content {
    width: 500px;
    height: 300px;
    position: relative;
    background-color: transparent;
    padding: 20px;
    border-radius: 5px;
    z-index: 8;
    /* 弹窗内容的样式，可以根据需要进行调整 */
}

.rate-icon-container {
    position: relative;
}

.rate-block {
    position: absolute;
    width: 100%;
    height: 80%;
    bottom: 0%;
    background-color: transparent;
}

.rate-count {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    font-family: "Helvetica", sans-serif;
    color: #f2f2f2;
    font-weight: bold;
    z-index: 10;
}


.Transparent-plate {
    position: absolute;
    width: 100%;
    height: 20%;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: transparent;
}

.not-Transparent-plate {
    position: absolute;
    width: 100%;
    height: 80%;
    align-items: center;
    justify-content: center;
    top: 20%;
    left: 0;
    background-color: #303030;
    border-radius: 5px;
}

.rate-this {
    margin-top: 5%;
    text-align: center;
    font-size: 15px;
    color: #fd9351;
    display: block;
}

.rate-name {
    text-align: center;
    color: #f2f2f2;
    display: block;
    margin-top: 2%;
    font-family: "Helvetica", sans-serif;
    font-size: 32px;
    font-weight: bold;
}

.el-rate .el-rate__icon {
    font-size: 27px;
    /* 设置星星的大小为 27px */
}

.universal-rate-button {
    display: block;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    height: 40px;
    font-weight: bold;
    background-color: #fac234;
    color: #000000;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.universal-rate-button.disabled {
    /* 按钮的禁用状态样式 */
    background-color: #ccc;
    color: #999;
    /* 其他样式设置 */
    display: block;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    height: 40px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    pointer-events: none;
}

.universal-rate-button:hover {
    background-color: #faa328;
}

.rate-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    background-color: transparent;
}

.modal {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 98;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    background-color: transparent;
    /* 透明背景 */
}

.modal-content {
    width: 500px;
    height: 400px;
    position: relative;
    background-image: linear-gradient(to right, #f2f2f2 20%, #ddf0f6 60%);
    padding: 20px;
    border-radius: 5px;
    z-index: 5;
    /* 弹窗内容的样式，可以根据需要进行调整 */
}

.image-modal {
    width: 20%;
    height: 35%;
    object-fit: cover;
    position: absolute;
    top: 5%;
    left: 3%;
    /* 图片样式，可以根据需要进行调整 */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    color: #000000;
    font-size: 30px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 关闭按钮样式，可以根据需要进行调整 */
}

.modal-name {
    position: absolute;
    top: 4%;
    left: 25%;
    width: 40%;
    height: 7%;
    background-color: transparent;
    border: none;
    color: #000000;
    font-size: 30px;
    cursor: pointer;
    display: flex;
    text-align: left;
    /* 关闭按钮样式，可以根据需要进行调整 */
}

.el-icon-arrow-right {
    position: absolute;
    top: 25%;
    left: 75%;
    width: 40%;
    height: 10%;
    size: 35px;
}

.modal-info-1 {
    position: absolute;
    top: 15%;
    left: 25%;
    width: 55%;
    height: 15%;
    font-size: 16px;
    display: flex;
    align-items: left;
    text-align: left;
    padding-left: 1.5%;
    background-color: transparent;
    justify-content: flex-start;
}

.modal-info-2 {
    position: absolute;
    top: 20%;
    left: 25%;
    width: 55%;
    height: 15%;
    font-size: 16px;
    font-weight: bold;
    /* 设置字体加粗 */
    display: flex;
    align-items: left;
    text-align: left;
    padding-left: 1.5%;
    align-items: center;
    background-color: transparent;
    justify-content: flex-start;
}

.info-value-1 {
    background-color: transparent;
    color: #333;
}

.info-value-2 {
    background-color: transparent;
    color: #333;
}

.modal-rate {
    text-align: left;
    padding: 10px;
    position: absolute;
    z-index: 3;
    top: 32%;
    left: 25%;
    width: 55%;
    height: 5%;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    padding-left: 1.2%;
}

.modal-rating {
    border: none;
    background-color: transparent;
    position: absolute;
    z-index: 3;
    top: 2%;
    left: 35%;
    width: 35%;
    height: 100%;
    font-size: 15px;
    text-align: center;
    padding: 24px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-rating:hover {
    background-color: #a5a5a5;
    /* 设置悬停状态下的背景色 */
}

.text-rating {
    font-weight: bold;
    font-size: 15px;
    color: rgb(0, 3, 7);
}

.modal-rating:hover .text-rating {
    color: rgb(255, 255, 255);
}

.modal-introduction {
    position: absolute;
    top: 45%;
    left: 2%;
    width: 90%;
    max-height: 20%;
    text-align: left;
    padding-left: 1.5%;
    display: inline-block;
}

.modal-people-d {
    position: absolute;
    margin-top: 10px;
    top: 65%;
    left: 2%;
    width: 90%;
    max-height: 15%;
    text-align: left;
    padding-left: 1.5%;
    display: inline-block;
}

.modal-people-d-text {
    font-weight: bold;
    font-size: 16px;
    color: rgb(0, 73, 168);
}

.modal-people-s {
    position: absolute;
    top: 75%;
    left: 2%;
    width: 90%;
    max-height: 15%;
    text-align: left;
    padding-left: 1.5%;
    display: inline-block;
}

.modal-people-s-text {
    font-weight: bold;
    font-size: 16px;
    color: rgb(0, 73, 168);
}
</style>
