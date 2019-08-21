<template>
    <section class="tasks">
      <h1>
        <i class="fa fa-list-ul"></i> To-Do List  
        <transition name="fade">
          <small v-if="incomplete">({{ incomplete }})</small>
        </transition>
        
      </h1>
      <div class="tasks__new input-group" style="width:70%; padding-bottom:20px;">
        <input type="text"
               class="input-group-field form-control"
               v-model="newTodo"
               @keyup.enter="addTodo"
               placeholder="New To-Do"
               
        >
        <span class="input-group-button" style="padding-left:10px;">
          <b-button variant="info" @click="addTodo" 
          >
            + Add
          </b-button>
        </span>
      </div>

      <div class="tasks__clear button-group pull-right" style="padding-bottom:20px;">
        <b-button variant="warning" class="button warning small"
                @click="clearTodoCompleted"
        >
          <i class="fa fa-check"></i> Clear Completed
        </b-button>
        <b-button variant="danger"
                @click="clearTodoAll"
        >
          <i class="fa fa-trash"></i> Clear All
        </b-button>
      </div>
      
      <transition-group name="fade" tag="ul" class="tasks__list no-bullet">
          <todoItem v-for="(todo, index) in todos"
                     @removeit="removeTodo(todo.id)"
                     @completeit="completeTodo(todo)"
                     :index="index"
                     :todo="todo"
                     :key="todo.id"
          ></todoItem>
      </transition-group>
    </section>
</template>

<script>
import todoItem from './todo-item'
import db from '@/firebase/init'

export default {
       components: {
    todoItem
  },
  name: 'TodoList',
  props: {
    todos: {default: []}
  },
  data() {
    return {
      newTodo: ''
    };
  },
  computed: {
    incomplete() {
      return this.todos.filter(this.inProgress).length;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        // this.tasks.push({
        //   title: this.newTask,
        //   completed: false
        // });
        // this.newTask = '';
        db.collection('todolist').add(
					{
						title: this.newTodo,
						completed: false
						// 	"e" +
						// 	Math.random()
						// 		.toString(36)
						// 		.substr(2, 10),
					}
        )
        this.newTodo = '';
      }
    },
    completeTodo(todo) {
      console.log(todo.id);
      db.collection("todolist").doc(todo.id).update({
          completed: todo.completed = ! todo.completed
      });
    },
    removeTodo(todoid) {
     // this.tasks.splice(index, 1);
      console.log(todoid)
      db.collection('todolist').doc(todoid).delete()
		  .then(() => {
			  this.todos = this.todos.filter(todo =>{
				  return todo.id != todoid
			  })
		  })
    },
    clearTodoCompleted() {
     this.todos = this.todos.filter(this.inProgress);
      // var shoplist_ref = db.collection('shoplist').where('completed','==',true);
      // let batch = firestore.batch();

      // shoplist_ref
      //   .get()
      //   .then(snapshot => {
      //     snapshot.docs.forEach(doc => {
      //       batch.delete(doc.ref);
      //     });
      //     return batch.commit();
      //   })
      var todolist_query = db.collection('todolist').where('completed','==',true);
      todolist_query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      }).then(() =>{
        this.todos = this.tasks.filter(this.inProgress);
      });
    },
    clearTodoAll() {
      var todolist_query = db.collection('todolist');
      todolist_query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      }).then(() =>{
        this.todos = [];
      });
      
    },
    
    inProgress(todo) {
      return ! this.isCompleted(todo);
    },
    isCompleted(todo) {
      return todo.completed;
    }
  }
  
}
</script>

<style>

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