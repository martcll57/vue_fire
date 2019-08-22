<template>
  <div class="row" style="margin:0; padding-bottom:10px;">
    <div class="col-md-1"></div>
    <div class="col-md-10">
        <b-jumbotron header="Family Helper" lead="Organiser">
          
    <p>Built by Martin Collins 2019 😧</p>
  </b-jumbotron>
  <div class="row" style="margin:0;">
    <div class="col-md-1"></div>
    <div class="col-md-10">
  <b-card-group columns class="text-center">
    <router-link to="/Calendar" style="text-decoration:none;">
    <b-card title="Calendar" :img-src="require('../assets/paper.jpg')" img-height="200" img-width="200" img-alt="Image" img-top>
      <b-card-text>
        Add upcoming events
      </b-card-text>
    </b-card>
    </router-link>
    <router-link to="/ShoppingList" style="text-decoration:none;">
    <b-card title="Shopping List" :img-src="require('../assets/shoplist.jpg')" img-height="200" img-width="200" img-alt="Image" img-top>
      <b-card-text>
       Make a Shopping List ...Kathy
      </b-card-text>
    </b-card>
    </router-link>
    <router-link to="/Todolist" style="text-decoration:none;">
    <b-card title="To-Do List" :img-src="require('../assets/list.jpg')" img-height="200" img-width="200" img-alt="Image" img-top>
      <b-card-text>
        Family To-Do List, get to work.
      </b-card-text>
    </b-card>
    </router-link>
  </b-card-group>
  </div>
  <div class="col-md-1"></div>
</div>
    </div>
    <div class="col-md-1"></div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Family Helper App',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
