<template>
  <div>
    <Calendar></Calendar>
  </div>
</template>

<script>
import Calendar from './Calender'

export default {
   components: {
    Calendar
  },
  name: 'CalendarPage',
  data () {
    return {
      msg: 'Welcome to Your Family Helper App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
