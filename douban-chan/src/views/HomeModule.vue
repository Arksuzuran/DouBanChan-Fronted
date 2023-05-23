<template>
    <div class="home-module-container-new">
        <div class="home-module-scroll-movie-new">
            <el-carousel :interval="4000" arrow="never" trigger="hover" :style="{ height: '540px', width: '960px' }">
                <el-carousel-item v-for="item in 6" :key="item">
                    <ScrollingScreenCard></ScrollingScreenCard>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="home-module-collection-book">
            <span class="home-module-collection-book-list"><i class="fa-brands fa-hotjar" style="color: #ff7032;">
                </i> 书香之选</span>
            <div class="home-module-collection-book-check"><i class="fa-solid fa-rotate-right"></i></div>
            <div class="home-module-collection-book-show">
                <div v-for="card in 3" class="home-module-collection-book-card">
                    <CollectionCard></CollectionCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollingScreenCard from '../components/ScrollingScreenCard.vue';
import CollectionCard from '../components/CollectionCard.vue';
export default {
    data() {
        return {
            images: [
                '1.jpg',
                "2.jpg",
                "3.jpg",
                "4.jpg",
                "5.jpg",
                "6.jpg",
            ],
            images_random: [
                "1.jpg",
                "2.jpg",
                "3.jpg",
                "4.jpg"
            ],
            movieList: [
                {
                    name: "电影1",
                    img: "1.jpg",
                    score: 7.5,
                    desc: "电影1的描述",
                },
                {
                    name: "电影2",
                    img: "2.jpg",
                    score: 8.1,
                    desc: "电影2的描述",
                },
                {
                    name: "电影3",
                    img: "3.jpg",
                    score: 9.0,
                    desc: "电影3的描述",
                },
                {
                    name: "电影4",
                    img: "4.jpg",
                    score: 6.8,
                    desc: "电影4的描述",
                },
                {
                    name: "电影5",
                    img: "5.jpg",
                    score: 7.2,
                    desc: "电影5的描述",
                },
                {
                    name: "电影6",
                    img: "6.jpg",
                    score: 8.4,
                    desc: "电影6的描述",
                },
                {
                    name: "电影7",
                    img: "1.jpg",
                    score: 7.9,
                    desc: "电影7的描述",
                },
                {
                    name: "电影8",
                    img: "2.jpg",
                    score: 8.7,
                    desc: "电影8的描述",
                },
            ],
            displayedMovieList: [{
                name: "电影1",
                img: "1.jpg",
                score: 7.5,
                desc: "电影1的描述",
            },
            {
                name: "电影2",
                img: "2.jpg",
                score: 8.1,
                desc: "电影2的描述",
            },
            {
                name: "电影3",
                img: "3.jpg",
                score: 9.0,
                desc: "电影3的描述",
            },
            {
                name: "电影4",
                img: "4.jpg",
                score: 6.8,
                desc: "电影4的描述",
            },],
            pageSize: 4,
            currentPage: 1,
            maxPage: 2,
        };
    },
    methods: {
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
    },
}
</script>

<style>
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
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: 540px;
    margin-top: 20px;
}

.home-module-collection-book {
    margin-right: 1%;
    border: 0px solid #d2c7c7;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 540px;
    background-color: #f3f3f3;
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
    margin-top: 10px;
    margin-left: 320px;
    font-size: 24px;
    color: black;
    transition: transform 0.2s ease-in-out;

}

.home-module-collection-book-check:hover {
    transform: scale(1.1);
    color: rgb(254, 132, 45);
}

.home-module-collection-book-show {
    flex: 1;
    margin-top: 1%;
    margin-left: 3%;
    width: 90%;
    height: 500px;
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
