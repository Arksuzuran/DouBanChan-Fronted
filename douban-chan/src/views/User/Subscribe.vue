<template>
    <div class="sub-list-block">
        <div style="margin-top: 5px;"></div>
        <div class="sub-list">
            <span class="sub-list-text">我的订阅</span>
            <div class="switch-for-list">
                <div class="radio-inputs">
                    <label class="radio">
                        <input type="radio" name="radio" checked="">
                        <span class="name">全部</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="radio">
                        <span class="name">影视</span>
                    </label>

                    <label class="radio">
                        <input type="radio" name="radio">
                        <span class="name">图书</span>
                    </label>
                </div>
            </div>
            <div class="sub-list-for-switch">
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
                <CollectionCard></CollectionCard>
            </div>
        </div>
    </div>
</template>

<script>
import CollectionCard from '../../components/CollectionCard.vue';
export default {
    components: {
        CollectionCard,
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
    background-color: #ffeded;
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