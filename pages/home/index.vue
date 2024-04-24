<template>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <h1 class="logo mb-4">KAKURO+</h1>
          <div class="pixel-art">
            
            <div class="d-inline-block bg-gray square"></div>
            
            <div class="d-inline-block bg-gray square"></div>
          </div>

          <div class="pixel-art figure">
            
            <div class="d-inline-block bg-gray square"></div>
            <div class="d-inline-block bg-orange square"></div>
            <div class="d-inline-block bg-orange square"></div>
            <div class="d-inline-block bg-gray square"></div>
          </div>

          <div class="pixel-art">
            
            <div class="d-inline-block bg-gray square"></div>
            
            <div class="d-inline-block bg-gray square"></div>
          </div>
          
          <h2 class="text-center my-4 select">Select Game Difficulty</h2>
          <div class="d-flex justify-content-center but">
             
            <div v-for="level in levels" :key="level._id" class="level-button p-2">
                <button type="button" class="btn btn-success" @click="goToGame(level.name, level._id)">{{ level.name }}</button>
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

         const response = await axios.get(
           "https://espacionebula.com:8000/get-levels",
           
           {
             headers: {
               "Access-Control-Allow-Origin": "*",
             },
             mode: "cors",
           }
         );

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
     
     goToGame(levelName, levelId) {
      localStorage.setItem("KakuroLevelId", levelId);
      this.$router.push({ path: `/game`});
    },

   },
   setup() {},
   
 });
  
  </script>
  
  <style scoped>

  
 
  .logo {
    font-size: 150px;
    color: #4000ff; 
    font-family: 'Your-Pixel-Font', sans-serif;
    font-weight: bold;
  }
  
  
  
  .square {
    width: 70px;
    height: 70px;
    background-color: #ff5722;
    margin-right: 8px;
  }

  .my-4 {

    font-size: 50px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
    font-weight: bold;

  }

  .btn {
    font-size: 35px;
    width: 150px;
    height: 100px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
  }
  
  .bg-orange {
    background-color: #ff5722; 
  }

  .bg-gray {
    background-color: #3f514c; 
  }

  .container {
    height: 750px;
    
  }

 

  
  @media (max-width: 768px) {
  .logo {
   margin-top: 20px;
   font-size: 5rem; 
  }

  .select {
    font-size: 40px;
  }

  .square {
    width: 10vw; 
    height: 10vw; 
  }

  .btn {
    font-size: 1rem; 
    
  }
}

@media (max-width: 500px) {
  .logo {
    font-size: 4rem;
    margin-top: 90px;
   
  }

  .btn {
    font-size: 1rem; 
    width: 30vw; 
    height: 16vw; 
  }



}

@media (max-width: 335px) {
  .logo {
    font-size: 4rem;
    margin-top: 90px;
   
  }

  .btn {

    width: 25vw; 

  }



}
  
  </style>
  