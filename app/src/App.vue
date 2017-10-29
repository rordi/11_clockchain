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
    color: #2c3e50;
    max-width: 500px;
    margin: 0 auto;
  }

  .container {
    margin-top: 50px;
  }

  .el-row {
    margin: 1em 0;
  }

</style>
