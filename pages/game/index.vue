<template>
  <div class="container py-5">
      
        <KakuroBoard :board="board" />
    
    </div>
  </template>
  

<script>
 import axios from "axios";
 
  
 export default defineComponent({
   data() {
     return {
       board: [],
       
     };
   },
   mounted() {
     if (!localStorage.getItem('KakuroToken')) {
       this.$router.push('/login');
     } else {

      const levelName = this.$route.query.level; 
      console.log(levelName); 
       
      this.getBoard();

     }
   },
   methods: {
     async getBoard() {
       try {
          debugger;
          console.log("Mensaje");
          debugger;

          const userId = localStorage.getItem('KakuroId');
          const level_Id = '65fa4569603eb122ebd9435f';
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

          console.log(response); 

          
          const data = response.data
          debugger;
          if (response.data.success) {
            
            this.board = data.boards;
            console.log(this.board);
            
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

