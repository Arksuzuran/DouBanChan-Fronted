<template>
  <div>
    <i data-v-250a314a="" class="fa-solid fa-star" style="color: rgb(255, 221, 0);"></i>
    <span class="rateNum">{{ score }} / </span><span class="ten">10</span> 
  </div>
</template>

<script>
export default {
    name: 'RateWithNumber',
    props: ['score'],
}
</script>

<style scoped>
.rateNum{
    font-size: 16px;
    color: orange;
}
.ten{
    font-size:14px;
    color: gray;
}
</style>