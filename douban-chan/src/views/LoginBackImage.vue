<template>
    <div class="login-back-image-block">
        <div class="login-back-image" :style="{ backgroundImage: `url(${require(`../assets/conroy_img/${imageUrl}`)})` }">
        </div>
    </div>
</template>

<script>
export default ({
    props: {
        imageUrl: {
            type: String,
            required: true
        }
    },
})
</script>

<style scoped>
.login-back-image-block {
    width: 720px;
    height: 500px;
    border-radius: 50px;
    background-color: transparent;
}

.login-back-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-image: url("../assets/conroy_img/login-back.jpg"); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>