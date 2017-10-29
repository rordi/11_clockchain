<template>
  <div id="app">
    <div class="wrapper">
      <div class="main-content">
        <router-view class="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>

@import '../node_modules/notie/dist/notie.min.css';

* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  margin-top: 50px;
  color: #2c3e50;
  text-align: center;
}
</style>
