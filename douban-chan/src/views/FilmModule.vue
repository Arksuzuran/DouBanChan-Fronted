<template>
    <el-container>
        <el-header style="margin-top: 40px;">
            <div style="float: left; margin-left: 1%;">
                <h4 style="font-size: 25px; font-weight: bold; margin: 0;">影视栏目</h4>
            </div>
        </el-header>
        <el-main>
            <div class="card-container">
                <UniversalCard v-for="movie in movieList" :key="movie.id" :ChildType="movie.type" :ChildYear="movie.year"
                    :ChildName="movie.name" :ChildRate="movie.rate" :ChildTime="movie.time" :ChildFrom="movie.from"
                    :ChildDir="movie.dir" :ChildStar="movie.star" :ChildText="movie.text">
                </UniversalCard>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import UniversalCard from "../components/UniversalCard";
export default {
    components: {
        UniversalCard, // 注册子组件
    },
    data() {
        return {
            ParentName: '伦菲尔德',
            ParentRate: 9.4,
            ParentYear: 2020,
            ParentTime: '2h13min',
            ParentFrom: '漂亮国',
            ParentType: '动作 / 冒险 / 科幻',
            ParentDir: '诺兰',
            ParentStar: '吴亦凡 李易峰 郑爽',
            ParentText: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
            movieList: [
                {
                    id: 1,
                    name: '伦菲尔德',
                    rate: 9.4,
                    year: 2020,
                    time: '2h13min',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 2,
                    name: '伦菲尔德',
                    rate: 9.4,
                    year: 2020,
                    time: '2h13min',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 3,
                    name: '伦菲尔德',
                    rate: 9.4,
                    year: 2020,
                    time: '2h13min',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 4,
                    name: '伦菲尔德',
                    rate: 9.4,
                    year: 2020,
                    time: '2h13min',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 5,
                    name: '伦菲尔德',
                    rate: 9.4,
                    year: 2020,
                    time: '2h13min',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 6,
                    name: '伦菲尔德',
                    rate: 9.4,
                    year: 2020,
                    time: '2h13min',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
            ],
        }
    }
}
</script>
<style>
.card-container {
    margin-left: 1%;
    margin-top: -20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

}

.UniversalCard {
    width: calc(16.6667% - 7px);
    /* 每行六个卡片，间距为 10px */
    flex: 0 0 auto;
    /* 禁止卡片自动扩展 */
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