<template>
 
      
  <navbar class="navbar"/>

  <NuxtPage class="nuxt-page"/>

  <Footer/>

 
</template>

<script>
  
    import navbar from './components/navbar.vue';
    import Footer from './components/Footer.vue';

    export default defineComponent ({
        components: {
            navbar,
        },
    })

</script>

<style>

    body {
        background-color: #193b60; 
    }

    .container {
        margin-top: 5%;
        margin-bottom: 5%;
    }

</style>