<template>
    <div class="film-module-block">
        <el-container>
            <el-header style="margin-top: 20px;">
                <div style="margin-left: 1%;">
                    <i class="fa-brands fa-youtube movie-logo" style="color: #004ac2;"></i>
                    <div style="float: left; display: inline-block; margin-left: 5px;width: 90%;">
                        <span
                            style="float: left;margin-left: 5px;font-size: 40px; font-weight: bold;color: #000000;">影视栏目</span>
                        <div class="film-check-out" @click="requestMovieList()">
                            <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z">
                                </path>
                                <path
                                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                                    fill-rule="evenodd"></path>
                            </svg>
                            换一批
                        </div>

                        <div class="button-for-more">
                            <ButtonForMore></ButtonForMore>
                        </div>
                    </div>
                </div>
            </el-header>
            <el-main>
                <div class="card-container">
                    <UniversalCard v-for="movie in movieList" :key="movie.id" :movie="movie"></UniversalCard>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import UniversalCard from "../components/UniversalCard";
import ButtonForMore from './ButtonForMore.vue';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import qs from 'qs';
export default {
    components: {
        UniversalCard, // 注册子组件
        ButtonForMore,
        VueSlickCarousel,
    },
    data() {
        return {
            settings: {
                "infinite": true,
                "speed": 500,
                "slidesToShow": 6,
                "slidesToScroll": 6,
                "initialSlide": 0,
            },
            movieList: [

            ],
            index: 0,
        }
    },
    computed: {
        ...mapState('userAbout', ['userId']),
    },
    methods: {
        //请求影视栏目数据
        requestMovieList() {
            this.$axios({
                method: "post",
                data: qs.stringify({
                    u_id: this.userId,
                }),
                url: "/base/col_media_series/",
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then((res) => {
                    console.log(res.data);
                    this.movieList = res.data.list;
                })
                .catch((err) => {
                    this.error();
                    this.$message.error("网络出错QAQ");
                });
        },
    },
    mounted() {
        this.requestMovieList();
    },
}
</script>
<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';


.button-for-more {
    float: right;
    margin-top: 10px;
}

.film-module-block {
    margin-right: 1%;
    width: 85%;
    margin-top: 50px;
    margin-left: 7.5%;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
}

.carousel-container {
    margin-left: 1%;
}

.card-container {
    margin-left: 1%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: transparent;
}

.movie-logo {
    float: left;
    font-size: 50px;
    margin-top: 5px;
}

.film-check-out {
    margin-left: -600px;
    margin-top: 7px;
    cursor: pointer;
    color: white;
    background-color: #222;
    font-weight: 500;
    border-radius: 2rem;
    font-size: 1rem;
    line-height: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.6rem;
    text-align: center;
    margin-right: 0.5rem;
    display: inline-flex;
    align-items: center;
    border: none;
}

.film-check-out:hover {
    background-color: #333;
}

.film-check-out svg {
    display: inline;
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 0.75rem;
    color: white;
}

.film-check-out:focus svg {
    animation: spin_357 0.5s linear;
}

@keyframes spin_357 {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>