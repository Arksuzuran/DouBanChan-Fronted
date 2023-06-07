<template>
    <div class="home-module-container-new">
        <div class="home-module-scroll-movie-new">
            <el-carousel :interval="4000" arrow="never" trigger="hover" :style="{ height: '480px', width: '850px' }">
                <el-carousel-item v-for="item in 6" :key="item">
                    <ScrollingScreenCard :scrollCard="scrollCards[item - 1]"></ScrollingScreenCard>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="home-module-collection-book">
            <span class="home-module-collection-book-list"><i class="fa-brands fa-hotjar" style="color: #ff7032;">
                </i> 书香之选</span>
            <div class="home-module-collection-book-check" @click="refresh()">
                <RefreshButton></RefreshButton>
            </div>
            <div class="home-module-collection-book-show">
                <div v-for="card in  3 " class="home-module-collection-book-card">
                    <CollectionCard :collectionCard="getCollectionCard(card)"></CollectionCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollingScreenCard from '../components/ScrollingScreenCard.vue';
import CollectionCard from '../components/CollectionCard.vue';
import RefreshButton from './RefreshButton.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    data() {
        return {
            index_card: 0,
            collectionCards: [
                {
                    id: 1,
                    image: require(`../assets/conroy_img/doupo.png`),
                    rate: '95%',
                    name: '斗破苍穹',
                    star: '萧炎 萧薰儿 美杜莎',
                    text: '三十年河东三十年河西，莫欺少年穷！',
                },
                {
                    id: 2,
                    image: require(`../assets/conroy_img/login-back.jpg`),
                    rate: '90%',
                    name: '芭比娃娃',
                    text: '我，迷人吗？',
                    star: '粉色女郎',
                },
                {
                    id: 3,
                    image: require(`../assets/conroy_img/shadowdie.jpg`),
                    rate: '97%',
                    name: '只狼 影逝二度',
                    star: '弦一郎',
                    text: '不死斩，斩灭不死！',
                },
                {
                    id: 4,
                    image: require(`../assets/conroy_img/image.jpg`),
                    rate: '98%',
                    name: '偶像梦想祭',
                    text: '浓度很高，but this is for u！',
                    star: '朔间零',
                },
            ],
        };
    },
    methods: {
        refresh() {
            this.index_card += 3;
        },
        getCollectionCard(card) {
            // 根据索引获取特定的元素
            const index = (this.index_card + card) % this.collectionCards.length;
            return this.collectionCards[index];
        },
        hoverMovie(movie) {
            movie.isHover = !movie.isHover;
        },
        changeMovieList() {
            this.currentPage++;
            if (this.currentPage > this.maxPage) this.currentPage = 1;
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = this.currentPage * this.pageSize;
            this.displayedMovieList = this.movieList.slice(startIndex, endIndex);
        },
    },
    components: {
        ScrollingScreenCard,
        CollectionCard,
        RefreshButton,
    },
    computed: {
        ...mapState('userAbout', ['userName', 'userImgUrl', 'isLogin', 'userId', 'scrollCards']),
    }
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@500&family=Zhi+Mang+Xing&display=swap');


.el-carousel__container {
    height: 100% !important;
}

.home-module-scroll-movie-new {
    width: 70%;
    margin-left: 1%;
    min-height: 100%;
    border: none;
}

.home-module-container-new {
    cursor: pointer;
    width: 85%;
    margin-left: 7.5%;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: 480px;
    margin-top: 20px;
}

.home-module-collection-book {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 480px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
}

.home-module-collection-book-list {
    position: absolute;
    font-size: 24px;
    color: black;
    margin-top: 10px;
    margin-left: 30px;
    font-family: 'Noto Serif SC', serif;
}

.home-module-collection-book-check {
    margin-top: 15px;
    margin-left: 180px;
    font-size: 24px;
}

.home-module-collection-book-show {
    flex: 1;
    margin-top: 1%;
    margin-left: 3%;
    width: 90%;
    height: 440px;
    background-color: transparent;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

.home-module-collection-book-card {
    transition: transform 0.3s, box-shadow 0.3s;
}

.home-module-collection-book-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
