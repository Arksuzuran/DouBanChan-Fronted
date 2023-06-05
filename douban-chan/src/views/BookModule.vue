<template>
    <div class="book-module-block">
        <el-container>
            <el-header style="margin-top: 20px;">
                <div style="margin-left: 1%;">
                    <i class="fa-solid fa-book-open book-logo" style="color: #004ac2;"></i>
                    <div style="float: left; display: inline-block; margin-left: 5px;width: 90%;">
                        <span
                            style="float: left;margin-left: 5px;font-size: 40px; font-weight: bold;color: #000000;">图书栏目</span>
                        <div class="book-check-out" @click="updateTempBookList(index + 6)">
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
                    <BookCard v-for="book in tempBookList" :key="book.id" :book="book">
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
import ButtonForMore from './ButtonForMore.vue';
export default {
    components: {
        BookCard, // 注册子组件
        MiniCard,
        ScrollingScreenCard,
        CollectionCard,
        NavBar,
        ButtonForMore,
    },
    data() {
        return {
            bookList: [
                {
                    id: 1,
                    name: '斗破苍穹',
                    image: require(`../assets/conroy_img/doupo.png`),
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
                    id: 6,
                    name: '斗破苍穹',
                    image: require(`../assets/conroy_img/doupo.png`),
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
                    image: require(`../assets/conroy_img/1.jpg`),
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
                    image: require(`../assets/conroy_img/2.jpg`),
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
                    image: require(`../assets/conroy_img/3.jpg`),
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
                    image: require(`../assets/conroy_img/4.jpg`),
                    rate: 9.4,
                    year: 2020,
                    page: '1024页',
                    from: '漂亮国',
                    type: '动作 / 冒险 / 科幻',
                    dir: '诺兰',
                    star: '吴亦凡 李易峰 郑爽',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
                {
                    id: 10,
                    name: '伦菲尔德',
                    image: require(`../assets/conroy_img/1.jpg`),
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
                    id: 9,
                    name: '伦菲尔德',
                    image: require(`../assets/conroy_img/2.jpg`),
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
                    id: 8,
                    name: '斗破苍穹',
                    image: require(`../assets/conroy_img/doupo.png`),
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
                    id: 7,
                    name: '斗破苍穹',
                    image: require(`../assets/conroy_img/doupo.png`),
                    rate: 9.4,
                    year: 2020,
                    page: '1459页',
                    from: '漂亮国',
                    type: '言情 / 冒险 / 科幻',
                    dir: '天蚕土豆',
                    star: '萧炎 美杜莎 萧薰儿',
                    text: '伦菲尔德 (Renfield) 是德古拉 (Dracula) 的追随者，也是疯人院几十年来的囚犯，他渴望远离伯爵、他的各种要求以及随之而来的所有流血事件。',
                },
            ],
            tempBookList: [],
            index: 0,
        }
    },
    methods: {
        updateTempBookList(newIndex) {
            this.index += 6;
            const bookListLength = this.bookList.length;
            const adjustedIndex = newIndex % bookListLength;
            const tempBookList = [];

            for (let i = adjustedIndex; i < adjustedIndex + 6; i++) {
                const book = this.bookList[i % bookListLength];
                tempBookList.push(book);
            }

            this.tempBookList = tempBookList;
        }
    },
    created() {
        this.updateTempBookList(0); // 初始化 tempMovieList，取前6个元素
    },
}
</script>
<style scoped>
@import '~@fortawesome/fontawesome-free/css/all.css';

.button-for-more {
    float: right;
    margin-top: 10px;
}

.book-module-block {
    margin-right: 1%;
    width: 85%;
    margin-top: 50px;
    margin-left: 7.5%;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #f9f9f9;
}

.card-container {
    margin-left: 1%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: transparent;
}

.book-logo {
    float: left;
    font-size: 50px;
    margin-top: 5px;
}

.book-check-out {
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

.book-check-out:hover {
    background-color: #333;
}

.book-check-out svg {
    display: inline;
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 0.75rem;
    color: white;
}

.book-film-check-out:focus svg {
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