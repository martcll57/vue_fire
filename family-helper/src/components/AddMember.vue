<template>
  <div class="add-member container z-depth-1">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addmember">
      <div class="field title">
        <label for="title">Member Name:</label>
        <input type="text" name="name" v-model="name">
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient">
      </div>
      <div class="field center-align">
        <button class="btn pink">Add Member</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddMember',
  data(){
    return{
      name: null,
      ingredients: []
    }
  },
  methods: {
    addSmoothie(){
      console.log(this.title)
    }
  }
}
</script>

<style>
.add-member{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-member h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-member .field{
  margin: 20px auto;
}
</style>