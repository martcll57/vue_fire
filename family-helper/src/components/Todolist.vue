<template>
  <div>
    <todoList :todos="todos"></todoList>
  </div>
</template>

<script>
import db from '@/firebase/init'
import todoList from './todo-list/todo-list'

export default {
     components: {
    todoList
  },
  name: 'ToDoList',
  data () {
    return {
      msg: 'Welcome to Your Family Helper App',
      todos: []
    }
  },
  created(){
		//fetch date from firestore
		
		db.collection('todolist').onSnapshot(snapshot => {
			const testCollection = [];
			snapshot.forEach(doc => {				
				console.log(doc.data())
				let item = doc.data()
				item.id = doc.id
				testCollection.push(item)
			})
		this.todos = testCollection;
		console.log(this.todos);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.tasks {
  width: 100%;
  max-width: 45rem;
  padding: 1em;
  margin: 1em auto;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0px 0.25rem 1rem rgba(0,0,0,0.25);
}
.tasks__list {
  clear: both;
}
.tasks__item {
  margin-bottom: 0.5em;
  position: relative;
}
.tasks__item__toggle {
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 0.85em 2.25em 0.85em 1em;
  background-color: rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
}
.tasks__item__toggle:hover {
  background-color: rgba(0,0,0,0.1);
  border-color: rgba(0,0,0,0.15);
}
.tasks__item__toggle--completed {
  text-decoration: line-through;
  background-color: rgba(0,128,0,0.15);
  border-color: rgba(0,128,0,0.2);
}
.tasks__item__toggle--completed:hover {
  background-color: rgba(0,128,0,0.25);
  border-color: rgba(0,128,0,0.3);
}
.tasks__item__remove {
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}
.tasks__item__remove i {
  vertical-align: middle;
}

</style>
