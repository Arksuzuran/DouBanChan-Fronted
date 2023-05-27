<template>
    <div>
        <div class="cards">
            <div class="card" v-for="(topicItem,index) in topicItems" :key="index">
                <p class="tip"><span class="jing-hao">#</span>{{topicItem.topicContent}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopicCard',
    props: ['topicItems'],
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
}
.cards .card {
  margin: 5px 0px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 30px;
  width: 250px;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  transition: 400ms;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.cards .card p.tip {
  font-size: 15px;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: .7em;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}

.jing-hao{
  font-size: 20px;
  color: black;
  font-weight: bold;
}
</style>