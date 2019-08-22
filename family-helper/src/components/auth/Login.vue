<template>
  <div class="login container">
    <div class="card border-primary mb-3" style="max-width: 20rem;">
                <div class="card-header"><h2 class="center deep-purple-text">Login</h2></div>
                <div class="card-body">
                      <form class="card-panel" @submit.prevent="login">
      
      <div class="field" style="text-align:right; padding-right:4rem;">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" >
      </div>
      <div class="field" style="text-align:right; padding-right:4rem;">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center" style="text-align:right;">
        <button class="btn btn-outline-primary">Login</button>
      </div>
    </form>
                </div>
              </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data(){
    return{
      email: null,
      password: null,
      feedback: null,
      user: null
    }
  },
  methods: {
    login(){
      if(this.email && this.password){
        this.feedback = null
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          //console.log(user)
          this.$router.push({ name: 'Home' })
        }).catch(err => {
          this.feedback = err.message
        })
      } else {
        this.feedback = 'Please fill in both fields'
      }
    }
  }
}
</script>

<style>
.login{
  max-width: 400px;
  margin-top: 60px;
}
.login h2{
  font-size: 2.4em;
}
.login .field{
  margin-bottom: 16px;
}
</style>