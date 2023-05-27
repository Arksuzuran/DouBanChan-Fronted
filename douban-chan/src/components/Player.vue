<template>
    <div id="app">
        <div class="player-container">
            <vue-core-video-player :src="videoSource" :cover="cover" :title="title" :controls=true autoplay loop="true" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            videoSource: [{
                src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
                resolution: 360,
            }, {
                src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                resolution: 720,
            }, {
                src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
                resolution: 1080
            }],
            cover: "https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png",
            title: "你的名字"
        }
    },
    methods: {
        play() {
            console.log("play");
        },
        pause() {
            console.log("pause");
        }
    }
}
</script>
<style scoped>
.player-container {
    width: 800px;
}
</style>