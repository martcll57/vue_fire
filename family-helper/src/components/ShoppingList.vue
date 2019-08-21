<template>
  <div>
    <taskList :tasks="tasks"></taskList>
  </div>
</template>

<script>
import db from '@/firebase/init'
import taskList from './shop-list/task-list'

export default {
     components: {
    taskList
  },
  name: 'ShoppingList',
  data () {
    return {
      msg: 'Welcome to Your Family Helper App',
      tasks: []
    //   {
    //     title: 'Make todo list',
    //     completed: true
    //   },
    //   {
    //     title: 'Go skydiving',
    //     completed: false
    //   }
    // ]
    }
  },
  created(){
		//fetch date from firestore
		
		db.collection('shoplist').onSnapshot(snapshot => {
			const testCollection = [];
			snapshot.forEach(doc => {				
				console.log(doc.data())
				let item = doc.data()
				item.id = doc.id
				testCollection.push(item)
				
				// this.events.push({								
				// startDate: new Date(doc.data().startDate.seconds * 1000),
                // endDate: new Date(doc.data().endDate.seconds * 1000),
                // classes: doc.data().classes,
				// title: doc.data().title,
				// id: doc.data().id
				// })

				//this.eventLength = this.events.length;
			})
		this.tasks = testCollection;
		console.log(this.tasks);
		})
		
		//console.log(this.eventsTest);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* body {
  background-color: #abc;
}
*,
h1,
button {
  font-family: 'Nunito', sans-serif;
} */
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
