<template>
    <div class="container py-5">

      <div class="col-md-12 text-center game">

        <h1 class="logo mb-4">{{ levelName }} Level - {{ boardSize }} * {{ boardSize }}</h1>  
        
        <h1 class="timer">{{ displayTime }}</h1>
      
        <KakuroBoard :board="board" :levelName="levelName"/>

       


      </div>
    
    </div>
  </template>
  

<script>
 import axios from "axios";
 
  
 export default defineComponent({
   data() {
     return {
      board: [],
      isLogin: false,
      levelName:"",
      displayTime: "00:00",
      boardSize: 0,
       
     };
   },
   mounted() {
     if (!localStorage.getItem('KakuroToken')) {
       this.$router.push('/login');
     } else {

      this.isLogin = true;
      //this.levelName = this.$route.query.level; 
      //console.log(levelName); 
       
      this.getBoard().then(() => {

        this.startTimer();
        this.gameDifficulty();

      });

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
          debugger
          if (response.data.success) {
            debugger
            this.board = data.game.game;
            this.time = data.game.time 
            this.startTime = new Date(this.time).getTime();
            this.boardSize = data.game.game[0].length
            
          } else if (data.error === "User already has an existing game!") {
            debugger
            this.board = data.game; 
            this.time = data.time
            this.startTime = new Date(this.time).getTime();
            this.boardSize = data.game[0].length
            
          }else if( data.error = "Invalid token"){

            localStorage.removeItem('KakuroToken');
            localStorage.removeItem('KakuroUsername');
            localStorage.removeItem('KakuroId');

            this.$router.push('/login');

          } else {
            
            console.log("There was an error with the user:" + response.data.error );
            

          }


       }catch (error) {
          this.error = error;
          console.log(this.error);
        }
      },

      startTimer() {
        this.timer = setInterval(()=>{
          const currentTime = Date.now();
          const diff = currentTime - this.startTime;
          this.elapsedTime = Math.floor(diff / 1000);
          this.formatTime();
        }, 1000)
      },
      formatTime() {
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = this.elapsedTime % 60;
        this.displayTime = `${this.padTime(minutes)}:${this.padTime(seconds)}`;
      },
      padTime(time) {
        return time.toString().padStart(2, '0');
      },

      gameDifficulty(){

        if (this.boardSize === 3) {
          this.levelName = 'Easy'
        } else if (this.boardSize === 5) {
          this.levelName = 'Medium'
        } else if (this.boardSize === 9) {
          this.levelName = 'Hard'
        }

      },

      
    }
  });

</script>


<style scoped>

.logo {
    font-size: 65px;
    color: #4000ff; 
    font-family: 'Your-Pixel-Font', sans-serif;
    font-weight: bold;
    align-items: center;
  }

  


  

  
</style>

