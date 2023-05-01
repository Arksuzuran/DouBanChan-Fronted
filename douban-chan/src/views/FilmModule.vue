<template>
    <el-container>
        <el-header style="margin-top: 40px;">
            <div style="float: left; margin-left: 3%;">
                <h4 style="font-size: 25px; font-weight: bold; margin: 0;">影视栏目</h4>
            </div>
        </el-header>
        <el-main>
            <!-- 这里是电影卡片列表 -->
            <div class="movie-card-list">
                <div v-for="( movie, index ) in  movieList " :key="index" class="movie-card-1">
                    <img :src="require(`@/assets/conroy_img/${movie.img}`)" alt="" class="movie-img-1">
                    <div class="movie-info-1">
                        <div class="movie-name-1">
                            {{ movie.name }}</div>
                        <div class="movie-score-1">
                            {{ movie.score }}分</div>
                    </div>
                    <div class="movie-overlay-1">
                        <el-button type="primary" size="small">查看详情</el-button>
                    </div>
                </div>
            </div>
        </el-main>
        <el-footer>
            <div style="float: right; margin-right: 5%;">
                <a href=# class="my-button">了解更多</a>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
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
        }
    }
}
</script>
<style>
.movie-card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    height: 100%;
    /* 将高度设为100% */
}

.movie-card-1 {
    width: 10%;
    height: 200px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-img-1 {
    /* width: 80px;
    height: 120px; */
    width: 100%;
    height: 65%;
    object-fit: cover;
}

.movie-info-1 {
    flex-direction: column;
    justify-content: center;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: #f5f5f5;
    font-size: 14px;
    font-weight: bold;
}

.movie-name-1 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.movie-score-1 {
    color: #FF9900;
    font-size: 16px;
    font-weight: bold;
}

.movie-overlay-1 {
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

.movie-card-1:hover .movie-overlay-1 {
    opacity: 1;
}


/* 按下效果 */
.my-button:active {
    background-color: #66b1ff;
    color: #fff;
}

/* 阴影效果 */
.my-button {
    display: inline-block;
    position: relative;
    overflow: hidden;
    padding: 0.5rem 1rem;
    background-color: #409eff;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
}

/* 点击扩散效果 */
.my-button:active:before {
    width: 100%;
    height: 100%;
    opacity: 1;
}
</style>