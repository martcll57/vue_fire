<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10">
        </div>
        <div class="col-md-2 text-center">
              <!-- <li v-if="user"><a @click="logout">Logout</a></li> -->
              <ul style="list-style-type:none;">
                  <li v-if="user" style="text-align:right;"><a @click="logout">Logout <i class="fa fa-sign-out fa-fw"></i></a></li>
                  <li>
                      <img src="../assets/logo1.png" style="float:right; padding: 5px;" height="102" width="102">
                  </li>
              </ul>
          </div>
        </div>
      </div>
    <Slide v-if="user">
      <router-link to="/Home" class="navbar navbar-dark navbar-brand bg-primary">
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

</div>
</template>

<script>
import firebase from 'firebase'
import { Slide } from 'vue-burger-menu'

export default {
  components: {
        Slide
  },
  name: 'Nav',
    data(){
    return{
      user: null
    }
    },
    created(){
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })    
  },
  methods: {
     logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>

<style>


</style>