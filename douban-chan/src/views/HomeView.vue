<template>
  <div>
    <!-- <nav-bar-back-ground></nav-bar-back-ground> -->
    <home-module></home-module>
    <film-module></film-module>
    <book-module></book-module>
    <!-- <nav-bar-cartoon></nav-bar-cartoon> -->
    <!-- <individual-mini-card></individual-mini-card> -->
    <!-- <universal-card></universal-card> -->
    <!-- <login-module></login-module> -->
    <topic-group-module></topic-group-module>
    <div class="test1">
      <self-information></self-information>
      <!-- <choice-menu></choice-menu> -->
    </div>
    <br>
    <br>
    <br>
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
import IndividualMiniCard from './IndividualMiniCard.vue';
import NavBarCartoon from '../components/NavBarCartoon.vue';
import TopicGroupModule from './TopicGroupModule.vue';
import GroupShowCard from './GroupShowCard.vue';
import Player from '../components/Player.vue';
import SelfInformation from './SelfInformation.vue';
import ChoiceMenu from './ChoiceMenu.vue';
export default {
  name: 'HomeView',
  components: {
    HomeModule,
    FilmModule,
    BookModule,
    NavBar,
    NavBarBackGround,
    LoginModule,
    IndividualMiniCard,
    NavBarCartoon,
    TopicGroupModule,
    GroupShowCard,
    Player,
    ChoiceMenu,
    SelfInformation,
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

.test1 {
  margin-top: 100px;
  /* margin-left: 100px; */
}
</style>