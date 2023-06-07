<template>
    <button>
        <i class="fa-solid fa-user" style="color:#ff742e"></i>个人信息
    </button>
</template>

<style scoped>
button {
    color: #ff742e;
    text-decoration: none;
    font-size: 25px;
    border: none;
    background: none;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
}

button::before {
    margin-left: auto;
}

button::after,
button::before {
    content: '';
    width: 0%;
    height: 2px;
    background: #ff742e;
    display: block;
    transition: 0.5s;
}

button:hover::after,
button:hover::before {
    width: 100%;
}
</style>