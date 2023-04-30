<template>
    <div>
      <navigation-bar></navigation-bar>
      <home-page-module></home-page-module>
    </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '../components/NavigationBar.vue';
import HomePageModule from './HomePageModule.vue';
export default {
  name: 'HomeView',
  components: {
    NavigationBar,
    HomePageModule
  }
}
</script>
