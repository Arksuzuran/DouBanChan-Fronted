<template>
    <div class="movie-ranking">
      <h2>{{ title }}</h2>
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
  
  <style>
  .movie-ranking {
    max-width: 600px;
    margin: 0 auto;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  
  .rank {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .title {
    flex-grow: 1;
    font-size: 16px;
    margin-right: 10px;
  }
  
  .score {
    font-size: 16px;
    font-weight: bold;
  }
  </style>