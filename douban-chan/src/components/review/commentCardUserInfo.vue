<template>
    <div class="postcard-userinfo-container">
        <img :src="info.imageUrl" class="lz-image" @click="jumpToUserHome" />
        <div class="lz-name" @click="jumpToUserHome">
            {{ info.name }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['info'],
    methods: {
        // 点击用户昵称或者头像即可跳转到其主页
        jumpToUserHome() {
            this.$router.push({
                name: 'userHome',
            })
        },
    }
}
</script>

<style scoped>
.postcard-userinfo-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.lz-image {
    width: 40px;
    height: 40px;
    border-radius: 18px;
    margin: 8px;
    /* 边框 */
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    z-index: 6;

    cursor: pointer;
}

.lz-name {
    margin: 10px 10px 10px 0;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
}

.post-time {
    margin: 10px 0 8px 10px;
    font-size: 16px;
    font-weight: 400;
    color: #424242;
    text-align: center;
}</style>