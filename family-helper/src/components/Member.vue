<template>
  <div>
    <h5>member page</h5>
    <p><i class="fa fa-tools fa-fw"></i>Under construction</p>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Member',
  data () {
    return {
      msg: 'Welcome to Your Family Helper App',
      Members: [],
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
		
		// db.collection('shoplist').onSnapshot(snapshot => {
		// 	const testCollection = [];
		// 	snapshot.forEach(doc => {				
		// 		console.log(doc.data())
		// 		let item = doc.data()
		// 		item.id = doc.id
		// 		testCollection.push(item)
				
		// 		// this.events.push({								
		// 		// startDate: new Date(doc.data().startDate.seconds * 1000),
    //             // endDate: new Date(doc.data().endDate.seconds * 1000),
    //             // classes: doc.data().classes,
		// 		// title: doc.data().title,
		// 		// id: doc.data().id
		// 		// })

		// 		//this.eventLength = this.events.length;
		// 	})
		// this.tasks = testCollection;
		// console.log(this.tasks);
		// })
		
		//console.log(this.eventsTest);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
