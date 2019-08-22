import Vue from 'vue'
import Router from 'vue-router'
import CalendarPage from '@/components/CalendarPage'
import ShoppingList from '@/components/ShoppingList'
import Member from '@/components/Member'
import Todolist from '@/components/Todolist'
import Home from '@/components/Home'
// import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Calendar',
      name: 'CalendarPage',
      component: CalendarPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ShoppingList',
      name: 'ShoppingList',
      component: ShoppingList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Todolist',
      name: 'Todolist',
      component: Todolist,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Members',
      name: 'Member',
      component: Member,
      meta: {
        requiresAuth: true
      }
    }
    // {
    //   path: '/signup',
    //   name: 'Signup',
    //   component: Signup
    // }
  ]
})

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    
    if (user) {
      // User is signed in. Proceed to route
      next()
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'Login'        
      })
    }
  } else {
    // if route is not guarded by auth, proceed 
    let userCheck = firebase.auth().currentUser
    if(userCheck && to.name == 'Login')
    {
      next({
        name: 'Home'        
      })
    }
    else
    {
      next()
    }
    
  }
})

export default router
