<template>
    <button>
        <i class="fa-solid fa-image"></i> 修改头像
    </button>
</template>

<style scoped>
button {
    color: rgb(0, 0, 0);
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