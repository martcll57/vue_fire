<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10">
        </div>
        <div class="col-md-2">
              <img src="./assets/logo1.png" style="float:right; padding: 5px;" height="102" width="102">
          </div>
        </div>
      </div>
    <Slide>
      <router-link to="/" class="navbar navbar-dark navbar-brand bg-primary">
      <h2 style="color: white;">FAMILY HELPER</h2>
      </router-link>
      <router-link to="/Calendar" style="text-decoration:none;">
        <span><i class="fa fa-calendar fa-fw"></i> Calendar</span>  
      </router-link> 
      <router-link to="/ShoppingList" style="text-decoration:none;">
        <span><i class="fa fa-shopping-cart fa-fw"></i> Shopping List</span>  
      </router-link>
      <router-link to="/Todolist" style="text-decoration:none;">
        <span><i class="fa fa-list-ul fa-fw"></i> To-do List</span>  
      </router-link>
      <router-link to="/Members" style="text-decoration:none;">
        <span><i class="fa fa-user fa-fw"></i> Members</span>  
      </router-link> 
    </Slide>
    
    <router-view/>

</div>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
  components: {
        Slide
  },
  name: 'App',
  
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


