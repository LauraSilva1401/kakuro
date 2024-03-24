<template>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <h1 class="logo mb-4">KAKURO+</h1>
          <div class="pixel-art">
            
            <div class="d-inline-block bg-gray square"></div>
            
            <div class="d-inline-block bg-gray square"></div>
          </div>

          <div class="pixel-art">
            
            <div class="d-inline-block bg-gray square"></div>
            <div class="d-inline-block bg-orange square"></div>
            <div class="d-inline-block bg-orange square"></div>
            <div class="d-inline-block bg-gray square"></div>
          </div>

          <div class="pixel-art">
            
            <div class="d-inline-block bg-gray square"></div>
            
            <div class="d-inline-block bg-gray square"></div>
          </div>
          
          <h2 class="text-center my-4">Select Game Difficulty</h2>
          <div class="d-flex justify-content-center">
             
            <div v-for="level in levels" :key="level._id" class="level-button p-2">
                <button type="button" class="btn btn-success" @click="goToGame(level.name)">{{ level.name }}</button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

import axios from "axios";
 
 export default defineComponent({
   components: {},
   created() {},
   mounted() {

    if(!localStorage.getItem('KakuroToken')){
            this.$router.push('/login');
        }   

        this.getLevels(); // async funct

   },
   data() {
     return {
       levels: []
     };
   },
   methods: {
     async getLevels() {
       try {
         debugger;
         console.log("Mensaje");
         debugger;
         
         const response = await axios.get(
           "https://espacionebula.com:8000/get-levels",
           
           {
             headers: {
               "Access-Control-Allow-Origin": "*",
             },
             mode: "cors",
           }
         );
         debugger;
         if (response.data.success) {

            this.levels = response.data.levels

         
         } else {
           
           this.error = response.data.error;
           console.log(response.data.error);
         }
       } catch (error) {
         console.error(error);
       }
     },

     goToGame(levelName) {
      this.$router.push({ path: `/game`, query: { level: levelName } });
    },

   },
   setup() {},
   
 });
  
  </script>
  
  <style scoped>

 
  .logo {
    font-size: 100px;
    color: #4000ff; 
    font-family: 'Your-Pixel-Font', sans-serif;
  }
  
  .pixel-art {
    
  }
  
  .square {
    width: 50px;
    height: 50px;
    background-color: #ff5722;
    margin: 2px;
  }
  
  .bg-orange {
    background-color: #ff5722; 
  }

  .bg-gray {
    background-color: #3f514c; 
  }
  
  </style>
  