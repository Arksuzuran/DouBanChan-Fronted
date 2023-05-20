<template>
  <div>
    <navigation-bar></navigation-bar>
    <home-module></home-module>
    <film-module></film-module>
    <!-- <universal-card></universal-card> -->
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '../components/NavigationBar.vue';
import HomeModule from './HomeModule.vue';
import FilmModule from './FilmModule.vue';
import UniversalCard from "../components/UniversalCard";
export default {
  name: 'HomeView',
  components: {
    NavigationBar,
    HomeModule,
    FilmModule,
    UniversalCard,
  }
}
</script>
