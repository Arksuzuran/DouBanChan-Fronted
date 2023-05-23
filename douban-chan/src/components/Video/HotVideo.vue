<template>
    <div class="movie-ranking">
      <div class="board-title">{{ title }}</div>
      <ul>
        <li v-for="(movie, index) in movies" :key="movie.id">
          <span class="rank">{{ index + 1 }}</span>
          <span class="title">{{ movie.title }}</span>
          <span class="score">{{ movie.score }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HotVideo',
    props: {
      title: {
        type: String,
        required: true
      },
      movies: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .movie-ranking {
    max-width: 600px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    margin: 0 auto;
  }
  
  .board-title{
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    padding: 6px 0;
  }
  
  .rank {
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .title {
    flex-grow: 1;
    font-size: 14px;
  }
  
  .score {
    font-size: 14px;
    font-weight: bold;
  }
  </style>