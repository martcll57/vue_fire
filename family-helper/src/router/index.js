import Vue from 'vue'
import Router from 'vue-router'
import CalendarPage from '@/components/CalendarPage'
import ShoppingList from '@/components/ShoppingList'
import Member from '@/components/Member'
import Todolist from '@/components/Todolist'
import Home from '@/components/Home'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Calendar',
      name: 'CalendarPage',
      component: CalendarPage
    },
    {
      path: '/ShoppingList',
      name: 'ShoppingList',
      component: ShoppingList
    },
    {
      path: '/Todolist',
      name: 'Todolist',
      component: Todolist
    },
    {
      path: '/Members',
      name: 'Member',
      component: Member
    }
  ]
})
