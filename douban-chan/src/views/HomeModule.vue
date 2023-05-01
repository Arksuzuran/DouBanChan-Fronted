<template>
    <div class="home-module-container">
        <div class="scroll-movie">
            <el-carousel :interval="4000" type="card" :style="{ height: '450px' }">
                <el-carousel-item v-for="(item, index) in  images " :key="index" :style="{ height: '450px' }">
                    <img :src="require(`@/assets/conroy_img/${item}`)" alt="" class="scroll-img">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 在父容器上添加样式，使其横向排列，且与走马灯对齐 -->
        <div style="display: flex; align-items: flex-start; width: 30vw;height: 100%; margin-right: 3%; margin-top: -15px;">
            <div style="flex: 1; margin-right: 3%;">
                <!-- 电影影评标题和换一批按钮 -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h2 style="font-size: 16px; font-weight: bold; margin: 0;">今日精选</h2>
                    <el-button type="primary" size="small" @click="changeMovieList" style="font-size: 12px;">换一批</el-button>
                </div>
                <!-- 电影影评列表 -->
                <div class="movie-list">
                    <div v-for="( movie, index ) in  displayedMovieList " :key="index" class="movie-card">
                        <img :src="require(`@/assets/conroy_img/${movie.img}`)" alt="" class="movie-img">
                        <div class="movie-info">
                            <div class="movie-name">
                                {{ movie.name }}</div>
                            <div class="movie-score">
                                {{ movie.score }}分</div>
                        </div>
                        <div class="movie-overlay">
                            <el-button type="primary" size="small">查看详情</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                "1.jpg",
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
}
</script>
  
<style>
.el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
}

.scroll-movie {
    width: 70vw;
    margin-left: 3%;
    min-height: 100%;
}

.scroll-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.el-carousel__indicators {
    display: none;
}

.home-module-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: 450px;
    margin-top: 30px;
}

.home-module-container>div:first-child {
    width: 70vw;
    margin-left: 3%;
}

.home-module-container>div:last-child {
    width: 30vw;
    margin-left: 3%;
}


.movie-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    height: 100%;
    /* 将高度设为100% */
}

.movie-card {
    width: 40%;
    height: 200px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-card:nth-child(1),
.movie-card:nth-child(2) {
    margin-bottom: 0px;
}

.movie-card:nth-child(3),
.movie-card:nth-child(4) {
    margin-top: 0px;
}

.movie-img {
    /* width: 80px;
    height: 120px; */
    width: 100%;
    height: 65%;
    object-fit: cover;
}

.movie-info {
    flex-direction: column;
    justify-content: center;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: #f5f5f5;
    font-size: 14px;
    font-weight: bold;
}

.movie-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.movie-score {
    color: #FF9900;
    font-size: 16px;
    font-weight: bold;
}

.movie-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.movie-card:hover .movie-overlay {
    opacity: 1;
}
</style>