<template>
  <div class="container py-5">
      
        <KakuroBoard :board="board" />

        <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="stopGame">Stop</button>
    
    </div>
  </template>
  

<script>
 import axios from "axios";
 
  
 export default defineComponent({
   data() {
     return {
      board: [],
      isLogin: false,
       
     };
   },
   mounted() {
     if (!localStorage.getItem('KakuroToken')) {
       this.$router.push('/login');
     } else {

      this.isLogin = true;
      const levelName = this.$route.query.level; 
      console.log(levelName); 
       
      this.getBoard();

     }
   },
   methods: {
     async getBoard() {
       try {
         
          

          const userId = localStorage.getItem('KakuroId');
          const level_Id = localStorage.getItem('KakuroLevelId');
          const token = localStorage.getItem("KakuroToken");

          const dataf = { user_id: userId,
                          levelId: level_Id
                        }

          const response = await axios.post("https://espacionebula.com:8000/create-game", dataf,{
              headers: {
              "Access-Control-Allow-Origin": "*",
              "Authorization": `Bearer ${token}`,
            },

            mode: "cors"
          });

          const data = response.data
        

          if (response.data.success) {
            
            this.board = data.game.game; 
            
          } else if (data.error = "User already has an existing game!") {
            
            this.board = data.game; 
            
          } else {
            
            console.log("There was an error with the user:" + response.data.error );
            

          }


       }catch (error) {
          this.error = error.response.toString();
          console.error(error);
        }
      },
    }
  });

</script>


<style scoped>

</style>

