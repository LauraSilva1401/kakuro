<template>
    <div class="level-name">
      <h1>{{ $route.query.level }}</h1>
    </div>
  </template>
  

<script>
export default {
  mounted() {
    
    const levelName = this.$route.query.level; 
    console.log(levelName); 
  }
}
</script>


<style scoped>

</style>

