<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import Home from './components/home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px 20px;
}
</style>
