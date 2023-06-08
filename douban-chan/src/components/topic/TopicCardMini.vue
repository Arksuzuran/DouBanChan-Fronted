<!-- 话题card -->
<template>
    <div class="card" @click="enterTopic">
        <div class="textBox">
            <div class="textTitle">
                <div class="topiccard-no" :class="topiccardNoClass" v-if="!notInHotList">
                    <i class="fa-sharp fa-solid fa-fire-flame-curved topiccard-no-icon" :class="topiccardIconClass"
                        v-if="!notHot"></i>
                    <div class="topiccard-no-no" :class="topiccardNoClass">
                        <div :style="topiccardNoOffset">{{ hotNo }}</div>
                    </div>
                </div>
                <div class="topiccard-title">#{{ topic.topicName }}#</div>
            </div>
            <div class="container">
                <p class="topiccard-intro">{{ topic.topicIntro }}</p>
            </div>
            <div class="num">
                <span class="span1">参与人数:{{ topic.follow }}</span>
                <span class="span2">讨论:{{ topic.post }}</span>
            </div>
        </div>
        <img class="img" :src="topic.topicAvatarUrl" v-if="topic.topicAvatarUrl"/>
    </div>
</template>

<script>
export default {
    name: 'TopicCardMini',
    props: ['topic', 'hotNo'],
    computed: {
        notInHotList(){
            return !this.hotNo
        },
        notHot(){
            return !this.hotNo || this.hotNo > 3
        },
        topiccardIconClass() {
            return this.notHot ? '' : 'topiccard-no-icon-' + this.hotNo
        },
        topiccardNoClass() {
            return this.notHot ? 'topiccard-no-0' : 'topiccard-no-' + this.hotNo
        },
        topiccardNoOffset(){
            return this.notHot ? '' : 'margin-left: 12px;'
        }
    },
    methods:{
        enterTopic(){
            this.$router.push({
                name:'topic',
                query:{
                    topicId: this.topic.topicId
                },
            })
        },
    },
}
</script>

<style scoped>

.card {
    min-width: 440px;
    margin: 20px;
    /* max-width: 600px; */
    height: 125px;
    background: #ffe7e7;
    border: 1px solid rgba(241, 232, 232, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(227, 16, 16, 0.2);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
    /* backdrop-filter: blur(10px); */
    transition: 0.5s ease-in-out;

    position: relative;
}
.card:hover {
    cursor: pointer;
    background: #f8aeae;
    color: white;
    transform: scale(1.03);
}
.topiccard-no-icon {
    position: absolute;
    left: -9px;
    bottom: 0;
    font-size: 32px;
    text-shadow: -1px -1px 0 #ff9393, 1px -1px 0 #fed9d9, -1px 1px 0 #ff9c9c, 1px 1px rgb(248, 190, 190);
    border: 2px 2px 2 2px solid rgba(255, 255, 255);
}
.topiccard-no-icon-1 {
    left: -9px;
    font-size: 32px;
    color: rgb(255, 0, 0);
}
.topiccard-no-icon-2 {
    left: -9px;
    font-size: 30px;
    color: rgb(255, 48, 48);
}
.topiccard-no-icon-3 {
    left: -8px;
    font-size: 28px;
    color: rgb(250, 126, 25);
}
.topiccard-no {
    transform: skewx(-10deg);
    position: relative;
    margin: 2px 10px 2px 2px;
    width: 40px;
    height: 22px;
    border-radius: 3px;
}
.topiccard-no-no {
    border-radius: 7px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
}
.topiccard-no-0 {
    /* margin-left: 12px; */
    background-color: rgb(203, 180, 180);
    color: rgb(255, 255, 255);
}
.topiccard-no-1 {
    /* margin-left: 12px; */
    background-color: rgba(254, 41, 41, 0.8);
    color: rgb(255, 255, 255);
}
.topiccard-no-2 {
    /* margin-left: 12px; */
    background-color: rgb(255, 146, 58, 0.8);
    color: rgb(255, 255, 255);
}

.topiccard-no-3 {
    background-color: rgb(255, 189, 134, 0.8);
    color: rgb(255, 255, 255);
}


.img {
    position: absolute;
    right: 10px;

    width: 90px;
    height: 90px;

    border-radius: 8px;
    background-size: cover;
    background-position: center;
    object-fit: cover;
}

.card:hover>.img {
    transition: 0.5s ease-in-out;
    /* background: linear-gradient(#9198e5, #712020); */
}

.textBox {
    max-width: 320px;
    height: 90px;
    margin-left: 20px;
    color: rgb(184, 184, 184);
    font-family: 'Poppins' sans-serif;

    display: flex;
    flex-flow: column;
    justify-content: space-between;
}

.textTitle {
    width: 200px;
    max-height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
}

.topiccard-title {
    margin: 5px;
    font-size: 20px;
    font-weight: 700;
    color: rgb(0, 0, 0);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.num {
    margin-top: 2px;
    margin-bottom: -5px;
    width: 160px;
    max-height: 20px;
    display: flex;
    justify-content: space-between;
}

.span1 {
    font-size: 11px;
    align-self: flex-start;
}

.span2 {
    font-size: 11px;
    align-self: flex-start;
}

.container {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 文字过多的处理方式 */
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
.topiccard-intro{
    font-size: 13px;
}
.container p {
    margin-top: 2px;
    max-width: 600px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: lighter;
    text-align: left;
    font-size: 15px;
    color: rgb(87, 87, 87);
}</style>