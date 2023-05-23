<template>
  <div id="app">
    <div class="navbar-wrapper navbar-scroll">
      <nav-bar></nav-bar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'app',
  components: {
    NavBar,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbarWrapper = document.querySelector('.navbar-scroll');
      if (window.pageYOffset > 100) {
        navbarWrapper.style.backgroundColor = 'white';
        navbarWrapper.style.borderRadius = '10px';
        // navbarWrapper.style.height = '50px';
        // navbarContainer.style.marginTop = '0px';
        setTimeout(() => {
          navbarWrapper.style.marginTop = '0px'; // 设置较小的 margin-top 值
        }, 10);
      } else {
        navbarWrapper.style.backgroundColor = 'transparent'; // 恢复默认的背景色
        navbarWrapper.style.borderRadius = '0px';
        // navbarWrapper.style.height = '80px';
        navbarWrapper.style.marginTop = '20px';
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
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

.navbar-wrapper {
  margin-top: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 15;
  /* 添加其他样式设置，例如背景颜色、高度等 */
  background-color: transparent;
}
</style>
