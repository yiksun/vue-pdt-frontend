<!-- 模板: html结构 -->
<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="container">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<!-- 行为: 逻辑处理 -->
<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components: {
    appHeader: Header, // or use "app-header": Header
    appFooter: Footer
  }
}
</script>

<!-- 样式: 解决样式 -->
<style>
.container {
  /* width: 1280px; */
  /* width: 95vw; */
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
