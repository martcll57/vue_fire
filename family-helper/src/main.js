// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/bootstrap.min.css'
import App from './App'
import router from './router'
import moment from 'moment'
import firebase from 'firebase'

Vue.prototype.moment = moment

Vue.use(BootstrapVue)
Vue.config.productionTip = false

let app = null;

firebase.auth().onAuthStateChanged(() => {
/* eslint-disable no-new */
if(!app){
app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
}

})