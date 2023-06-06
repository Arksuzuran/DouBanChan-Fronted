<template>
    <div class="sub-list-block">
        <div style="margin-top: 5px;"></div>
        <div class="sub-list">
            <span class="sub-list-text">我的订阅</span>
            <div class="switch-for-list">
                <div class="radio-inputs">
                    <label class="radio">
                        <input type="radio" name="radio" value="all" checked="" v-model="selectedOption">
                        <span class="name">全部</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="radio" value="movie" v-model="selectedOption">
                        <span class="name">影视</span>
                    </label>

                    <label class="radio">
                        <input type="radio" name="radio" value="book" v-model="selectedOption">
                        <span class="name">图书</span>
                    </label>
                </div>
            </div>
            <div v-if="selectedOption == 'all'" class="sub-list-for-switch">
                <SubscribeCard v-for="subscribe in subscribes" :key="subscribe.id" :subscribe="subscribe">
                </SubscribeCard>
            </div>
            <div v-if="selectedOption == 'movie'" class="sub-list-for-switch">
                <SubscribeCard v-for="subscribe in movies" :key="subscribe.id" :subscribe="subscribe">
                </SubscribeCard>
            </div>
            <div v-if="selectedOption == 'book'" class="sub-list-for-switch">
                <SubscribeCard v-for="subscribe in books" :key="subscribe.id" :subscribe="subscribe">
                </SubscribeCard>
            </div>
        </div>
    </div>
</template>

<script>
import CollectionCard from '../../components/CollectionCard.vue';
import SubscribeCard from '../../components/SubscribeCard.vue';
export default {
    components: {
        CollectionCard,
        SubscribeCard,
    },
    data() {
        return {
            selectedOption: 'all', // 初始选中的值，默认为 'all'
            subscribes: [
                {
                    id: 1,
                    name: '斗破苍穹',
                    class: 'book',
                    image: require('../../assets/conroy_img/snake.jpg'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
                {
                    id: 2,
                    name: '斗破苍穹迦南学院',
                    class: 'film',
                    image: require('../../assets/conroy_img/doupo.png'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
                {
                    id: 3,
                    name: '偶像梦想祭',
                    class: 'book',
                    image: require('../../assets/conroy_img/OM.jpg'),
                    text: '为什么ta会出现在这儿，只有你知道',
                    star: '朔间零 北斗',
                },
                {
                    id: 4,
                    name: '只狼 影逝二度',
                    class: 'book',
                    image: require('../../assets/conroy_img/shadowdie.jpg'),
                    text: '不死斩,斩灭不死,为了大日本帝国而战！',
                    star: '狼 弦一郎 苇名一心',
                },
                {
                    id: 5,
                    name: '斗破苍穹',
                    class: 'film',
                    image: require('../../assets/conroy_img/snake.jpg'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
                {
                    id: 6,
                    name: '斗破苍穹迦南学院',
                    class: 'film',
                    image: require('../../assets/conroy_img/doupo.png'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
                {
                    id: 7,
                    name: '偶像梦想祭',
                    class: 'film',
                    image: require('../../assets/conroy_img/OM.jpg'),
                    text: '为什么ta会出现在这儿，只有你知道',
                    star: '朔间零 北斗',
                },
                {
                    id: 8,
                    name: '只狼 影逝二度',
                    class: 'book',
                    image: require('../../assets/conroy_img/shadowdie.jpg'),
                    text: '不死斩,斩灭不死,为了大日本帝国而战！',
                    star: '狼 弦一郎 苇名一心',
                },
                {
                    id: 9,
                    name: '斗破苍穹',
                    class: 'film',
                    image: require('../../assets/conroy_img/snake.jpg'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
                {
                    id: 10,
                    name: '偶像梦想祭',
                    class: 'film',
                    image: require('../../assets/conroy_img/OM.jpg'),
                    text: '为什么ta会出现在这儿，只有你知道',
                    star: '朔间零 北斗',
                },
                {
                    id: 11,
                    name: '只狼 影逝二度',
                    class: 'book',
                    image: require('../../assets/conroy_img/shadowdie.jpg'),
                    text: '不死斩,斩灭不死,为了大日本帝国而战！',
                    star: '狼 弦一郎 苇名一心',
                },
                {
                    id: 12,
                    name: '斗破苍穹',
                    class: 'film',
                    image: require('../../assets/conroy_img/snake.jpg'),
                    text: '三十年河东三十年河西，莫欺少年穷！',
                    star: '萧炎 美杜莎 萧薰儿',
                },
            ],
        }
    },
    computed: {
        movies() {
            return this.subscribes.filter(item => item.class === 'film');
        },
        books() {
            return this.subscribes.filter(item => item.class === 'book');
        },
    },
}
</script>

<style scoped>
.sub-list-block {
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.sub-list-block>div {
    margin-top: 10px;
    margin-bottom: 10px;
}

.sub-list {
    width: 95%;
    margin-left: 1.9%;
    background-color: transparent;
    display: flex;
    align-items: left;
    flex-direction: column;
}

.sub-list-text {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
}

.radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(100, 100, 100, 0.06);
    padding: 0.25rem;
    width: 300px;
    font-size: 14px;
}

.radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
}

.radio-inputs .radio input {
    display: none;
}

.radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: .5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked+.name {
    background-color: #cdcdcd;
    font-weight: 600;
}

.switch-for-list {
    position: absolute;
    margin-left: 150px;
    margin-top: -5px;
}

.sub-list-for-switch {
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 在一行中放置两列 */
    gap: 15px;
}
</style>