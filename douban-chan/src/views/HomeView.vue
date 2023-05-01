<template>
  <div>
    <navigation-bar></navigation-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from '../components/NavigationBar.vue';
export default {
  name: 'HomeView',
  components: {
    NavigationBar,
  }
}
</script>
