<template>
    <div>
      <i data-v-250a314a="" class="fa-solid fa-star" style="color: rgb(255, 221, 0);"></i>
      <span class="rateNum">{{ score }} / </span><span class="ten">10</span> 
    </div>
  </template>
  
  <script>
  export default {
      name: 'RateWithNumber_M',
      props: ['score'],
  }
  </script>
  
  <style scoped>
  .rateNum{
      font-size: 16px;
      color: orange;
      font-weight: bold;
  }
  .ten{
      font-size:16px;
      color: gray;
  }
  </style>