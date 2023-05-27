<template>
    <div class="card">

        <div class="textBox">
            <div class="textContent">
                <p class="h1">#为什么到现在你都没有谈恋爱#</p>
            </div>
            <div class="container">
                <p class="text">可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？
                    你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？可以讲一讲，你为什么到现在都没有谈恋爱吗？ 你为什么到现在都没有谈恋爱吗？</p>
            </div>
            <div class="num">
                <span class="span1">阅读:140万</span>
                <span class="span2">讨论:498</span>
            </div>

        </div>
        <div class="img"></div>
    </div>
</template>

<script></script>

<style scoped>
.card {
    width: 100%;
    max-width: 600px;
    height: 110px;
    background: #e9e9e9;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
    backdrop-filter: blur(10px);
    transition: 0.5s ease-in-out;
}

.card:hover {
    cursor: pointer;
    transform: scale(1.03);
}

.img {
    width: 95px;
    height: 95px;
    margin-left: 10px;
    border-radius: 10px;
    background-image: url('../assets/conroy_img/login-back.jpg');
    background-size: cover;
    background-position: center;
}

.card:hover>.img {
    transition: 0.5s ease-in-out;
    /* background: linear-gradient(#9198e5, #712020); */
}

.textBox {
    width: 460px;
    height: 90px;
    margin-left: 20px;
    color: rgb(184, 184, 184);
    font-family: 'Poppins' sans-serif;

}

.textContent {
    max-width: 450px;
    max-height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.num {
    margin-top: 3px;
    width: 180px;
    max-height: 20px;
    display: flex;
    justify-content: space-between;
}

.span1 {
    font-size: 12px;
    align-self: flex-start;
}

.span2 {
    font-size: 12px;
    align-self: flex-start;
}


.h1 {
    font-size: 22px;
    font-weight: bold;
    color: rgb(0, 0, 0);
}

.container {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 450px;
}

.container p {
    margin-top: 2px;
    max-width: 450px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: lighter;
    text-align: left;
    font-size: 15px;
    color: rgb(110, 110, 110);
}
</style>