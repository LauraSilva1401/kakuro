<template>
 
      

          <navbar class="navbar"/>

          <NuxtPage class="nuxt-page"/>


          <footer1/>

      
 
</template>

<script>
  
  import navbar from './components/navbar.vue';
  import footer from './components/footer1.vue';

  export default defineComponent ({
    components: {
      navbar,
      footer
    },
  })

</script>

<style>

    body {
      background-color: #193b60; 
    }

    .container {
        margin-top: 300px;
        margin-bottom: 300px;
    }

</style>