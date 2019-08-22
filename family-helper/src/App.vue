<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>

</div>
</template>

<script>
import Nav from './components/Nav'
import Router from 'vue-router'

export default {
  components: {
        Nav
  },
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');


#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}


