<template>
  <div id="app">
    <nav>
      <router-link to="/">主页</router-link> |
      <router-link to="/videoHome">电影</router-link> |
      <router-link to="/bookHome">图书</router-link> |
      <router-link to="/topicHome">话题</router-link> |
      <router-link to="/groupHome">小组</router-link> |
      <router-link to="/userHome">个人主页</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
export default {
  name: 'App',
  components: { NavigationBar }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
