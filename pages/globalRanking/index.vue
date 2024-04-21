<template>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 text-center figure">
          
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
          
          <h2 class="text-center my-4">Select Game Difficulty for Global Ranking</h2>
          <div class="d-flex justify-content-center">
             
            <div v-for="level in levels" :key="level._id" class="level-button p-2">
                <button type="button" class="btn btn-success" @click="goToRanking(level.name, level._id)">{{ level.name }}</button>
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
     
     goToRanking(levelName, levelId) {
      localStorage.setItem("KakuroLevelId", levelId);
      this.$router.push({ path: `/ranking`, query: { level: levelName} });
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
    min-height: 75vh;
    
  }

  .figure{
    margin-top: 5%;
  }

  


@media (max-width: 768px) {

  .container {
    min-height: 77vh;
    
  }
  .square {
    width: 6vw; 
    height: 6vw; 
    margin: 0.5vw; 
  }

  .btn {
    font-size: 1rem; 
    width: 20vw; 
    height: 12vw; 
  }

  .my-4 {
    font-size: 2rem; 
  }

  .figure{
    padding-top: 50px;
  }
}


@media (max-width: 600px) {

.container {
  min-height: 80vh;
  
}
.square {
  margin: 0.4vw; 
  margin-top: -1px;
}

.figure{
  padding-top: 100px;
}
}

@media (max-width: 400px) {


.figure{
  padding-top: 160px;
}
}

@media (max-width: 340px) {

  .square {
    width: 10vw; 
    height: 10vw; 
   
  }
  .btn {
    font-size: 0.8rem; 
    
  }

}

@media (max-width: 340px) {

.square {
  width: 12vw; 
  height: 12vw; 
  margin: 0.9vw; 
 
}
.btn {
  font-size: 0.8rem; 
  width: 24vw; 
  
  
}

}

@media (max-width: 260px) {

.square {
  width: 14vw; 
  height: 14vw; 
  margin: 0.9vw; 
 
}
.btn {
  font-size: 0.8rem; 
  width: 28vw; 
  
  
}

}
  
  </style>
  