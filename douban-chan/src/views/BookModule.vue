<template>
    <div class="book-module-block">
        <el-container>
            <el-header style="margin-top: 20px;">
                <div style="margin-left: 1%;">
                    <i class="fa-solid fa-book-open book-logo" style="color: #004ac2;"></i>
                    <div style="float: left; display: inline-block; margin-left: 5px;width: 1300px;">
                        <span
                            style="float: left;margin-left: 5px;font-size: 40px; font-weight: bold;color: #000000;">图书栏目</span>
                        <button class="for-more">更多<i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </el-header>
            <el-main>
                <div class="card-container">
                    <BookCard v-for="book in bookList" :key="book.id" :ChildType="book.type" :ChildYear="book.year"
                        :ChildName="book.name" :ChildRate="book.rate" :ChildPage="book.page" :ChildFrom="book.from"
                        :ChildDir="book.dir" :ChildStar="book.star" :ChildText="book.text"
                        :ChildImage="require(`../assets/conroy_img/${book.image}`)">
                    </BookCard>
                </div>
            </el-main>
            <!-- <MiniCard></MiniCard> -->
            <!-- <ScrollingScreenCard></ScrollingScreenCard> -->
            <!-- <CollectionCard></CollectionCard> -->
        </el-container>
    </div>
</template>

<script>
import BookCard from '../components/BookCard.vue';
import MiniCard from '../components/MiniCard.vue';
import ScrollingScreenCard from '../components/ScrollingScreenCard.vue';
import CollectionCard from '../components/CollectionCard.vue';
import NavBar from '../components/NavBar.vue'
export default {
    components: {
        BookCard, // 注册子组件
        MiniCard,
        ScrollingScreenCard,
        CollectionCard,
        NavBar,
    },
    data() {
        return {
            bookList: [
                {
                    id: 1,
                    name: '斗破苍穹',
                    image: 'doupo.png',
                    rate: 9.4,
                    year: 2020,
                    page: '1459页',
                    from: '漂亮国',
                    type: '言情 / 冒险 / 科幻',
                    dir: '天蚕土豆',
                    star: '萧炎 美杜莎 萧薰儿',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 2,
                    name: '伦菲尔德',
                    image: '1.jpg',
                    rate: 9.4,
                    year: 2020,
                    page: '2037页',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 3,
                    name: '伦菲尔德',
                    image: '2.jpg',
                    rate: 9.4,
                    year: 2020,
                    page: '5337页',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 4,
                    name: '伦菲尔德',
                    image: '3.jpg',
                    rate: 9.4,
                    year: 2020,
                    page: '4096页',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 5,
                    name: '伦菲尔德',
                    image: '4.jpg',
                    rate: 9.4,
                    year: 2020,
                    page: '1024页',
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
@import '~@fortawesome/fontawesome-free/css/all.css';

.book-module-block {
    margin-right: 1%;
    width: 1420px;
    margin-top: 50px;
    margin-left: 1%;
    border-radius: 10px;
    border: 0px solid #d2c7c7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f3f3f3;
}

.card-container {
    margin-left: 1%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: transparent;
}

.UniversalCard {
    width: calc(16.6667% - 7px);
    /* 每行六个卡片，间距为 10px */
    flex: 0 0 auto;
    /* 禁止卡片自动扩展 */
}

.book-logo {
    float: left;
    font-size: 50px;
    margin-top: 5px;
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

.for-more {
    margin-top: 5px;
    border: none;
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    float: right;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #000000;
    border-radius: 4px;
    padding: 8px 16px;
    transition: background-color 0.3s ease;
}

.for-more:hover {
    color: #ff8c20;
}
</style>