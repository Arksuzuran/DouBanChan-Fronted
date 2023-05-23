<template>
  <div>
    <nav-bar-back-ground></nav-bar-back-ground>
    <home-module></home-module>
    <film-module></film-module>
    <book-module></book-module>

    <!-- <universal-card></universal-card> -->
    <!-- <login-module></login-module> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HomeModule from './HomeModule.vue';
import FilmModule from './FilmModule.vue';
import BookModule from './BookModule.vue';
import NavBar from '../components/NavBar.vue';
import NavBarBackGround from '../components/NavBarBackGround.vue';
import LoginModule from './LoginModule.vue';
export default {
  name: 'HomeView',
  components: {
    HomeModule,
    FilmModule,
    BookModule,
    NavBar,
    NavBarBackGround,
    LoginModule,
  }
}
</script>
<style>
body {
  background: #ffffff;
  /* background: linear-gradient(25deg, rgba(158, 145, 76, 1) 13%, rgba(156, 107, 57, 1) 28%, rgba(135, 105, 33, 1) 42%, rgba(136, 100, 12, 1) 58%, rgba(120, 43, 43, 1) 72%, rgba(112, 59, 59, 1) 85%); */
  background-repeat: repeat-y;
  background-size: 100% auto;
}
</style>