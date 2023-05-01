<template>
  <div>
    <navigation-bar></navigation-bar>
    <home-module></home-module>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '../components/NavigationBar.vue';
import HomeModule from './HomeModule.vue';
export default {
  name: 'HomeView',
  components: {
    NavigationBar,
    HomeModule,
  }
}
</script>
