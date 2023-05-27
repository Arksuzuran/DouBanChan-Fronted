<template>
    <div class="card">
        <span>秋子夜</span>
        <p class="info">爱没有技巧，真诚才是必杀技</p>
        <button class="reply"> 消息 <i class="replyNum"> &nbsp 99+</i></button>
        <br>
        <button class="learn-more">
            <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
            </span>
            <span class="button-text">个人中心</span>
        </button>
        <button class="learn-more">
            <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
            </span>
            <span class="button-text">我的收藏</span>
        </button>
        <button class="quit">退出登录</button>
    </div>
</template>

<script>
export default ({
    data() {
        return {

        }
    }

})
</script>
<style scoped>
.reply {
    font-family: PlusJakartaSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Cantarell, Helvetica Neue, Ubuntu, sans-serif;
    font-size: 1rem;
    align-items: center;
    width: 150px;
    height: 45px;
    border-radius: 0.4rem;
    font-weight: 600;
    padding: 0 1.2rem;
    color: #ffffff;
    border: none;
    box-shadow: 0 .5rem 1rem rgba(143, 142, 142, 0.15) !important;
    background: #000000;
}

.replyNum {
    font-size: 0.8rem;
    color: #f7750cc6;
}

.reply:hover {
    background: #2b2a2a;
}

.card {
    width: 17em;
    height: 22.5em;
    background: #ccb8a0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    transition: 1s ease-in-out;
    clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 水平居中 */
    justify-content: space-between;
    /* 上下间距 */
    padding: 10px;
    /* 间距大小，根据需要调整 */
}

.card span {
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-align: center;
    display: block;
    font-size: 1em;
    margin-top: 25px;
}

.card .info {
    font-weight: 400;
    color: rgb(0, 0, 0);
    display: block;
    text-align: center;
    font-size: 0.72em;
    margin: 1em;
}

.card .share {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    gap: 1em;
}

.card a {
    color: white;
    transition: .4s ease-in-out;
}

.card a:hover {
    color: red;
}

.quit {
    padding: 0.8em 1.7em;
    display: block;
    margin-top: 5px;
    border-radius: 25px;
    border: none;
    font-weight: bold;
    background: #ffffff;
    color: rgb(0, 0, 0);
    transition: .4s ease-in-out;
}

.quit:hover {
    background: red;
    color: white;
    cursor: pointer;
}

button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
}

button.learn-more {
    width: 12rem;
    height: auto;
    padding-top: 5px;
}

button.learn-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #282936;
    border-radius: 1.625rem;
}

button.learn-more .circle .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
}

button.learn-more .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
}

button.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
}

button.learn-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: #282936;
    font-weight: 600;
    line-height: 1.6;
    text-transform: uppercase;
}

button:hover .circle {
    width: 100%;
}

button:hover .circle .icon.arrow {
    background: #fff;
    transform: translate(1rem, 0);
}

button:hover .button-text {
    color: #fff;
}
</style>