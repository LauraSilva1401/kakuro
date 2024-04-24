<template>
  <div class="container">
  <div class="kakuro-board">
    <table class="table table-bordered">
      <tr v-for="(row, rowIndex) in board[0]" :key="`row-${rowIndex}`">
        <td
          v-for="(cell, cellIndex) in row"
          :key="`cell-${rowIndex}-${cellIndex}`"
          :class="{'bg-dark text-white': cell === 'black', 'bg-light': cell !== 'black'  }"
        >
          <!-- Cell with numbers -->
          <div v-if="Array.isArray(cell)" class="number-cell">
            <div class="bottom-left-number">{{ cell[0] !== 0 ? cell[0] : '' }}</div>
            <div class="bottom-right-number">{{ cell[1] !== 0 ? cell[1] : '' }}</div>
          </div>
          <!-- Editable cell (for user input) -->
          
          <input v-if="cell === 'white'" type="text" class="form-control"
             :class="getColorClass(rowIndex, cellIndex)" @input="validateInput($event)" @blur="handleCellInput($event, rowIndex, cellIndex)"/>
          <input v-else-if="cell !== 'white' && cell !== 'gray'&& cell !== 'black' &&  !isNaN(cell)" :value="cell" type="text" class="form-control"
             :class="getColorClass(rowIndex, cellIndex)" @input="validateInput($event)" @blur="handleCellInput($event, rowIndex, cellIndex)"/>

        </td>
      </tr>
    </table>
  </div>

  <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
  </div>

  <div class="level-button p-5">

    <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="stopGame">Stop</button>
    <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="saveGame">Save</button>
    <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="validateGame">Validate</button>


  </div>

  </div>

  

</template>

<script>
 import axios from "axios";

export default {
  
   mounted() {
     if (!localStorage.getItem('KakuroToken')) {
       this.$router.push('/login');
     } else {

      this.isLogin = true; 

     }
   },
   data() {
    return {
      gameBoard: [],
      isLogin: false,
      colorUpdates: [],
      successMessage: '',
    };
  },
  props: {
    board: {
      type: Array,
      required: true
    },
    levelName: {
      type: String,
      required: true
    },
  },
  methods: {
    
    validateInput(event) {
      
      const inputValue = event.target.value;
      const isValid = /^\d$/.test(inputValue) && inputValue !== '0';

      if (!isValid) {
        event.target.value = ''; 
      }

    },
    handleCellInput(event, rowIndex, cellIndex) {
      const value = event.target.value;
      //console.log(`Valor ingresado en la celda (${rowIndex}, ${cellIndex}): ${value}`);
      if (value != "") {

        if (this.gameBoard.length === 0) {//here we validate that gameboard is empty, to put the first time the actual game
          this.gameBoard = this.board;
        }

        this.gameBoard[0][rowIndex][cellIndex] = value;
        //console.log(this.gameBoard[0]);
        //llamar a validar movimiento
        this.evaluateMove(rowIndex, cellIndex);


      }else {
        this.gameBoard[0][rowIndex][cellIndex] = value;
      }

      
    },
    async evaluateMove(row, column) {
       try {
         
          
          //const { user_id, Actualgame, row, column } = req.body;
          const userId = localStorage.getItem('KakuroId');
          const token = localStorage.getItem("KakuroToken");

          const dataf = { user_id: userId,
                          Actualgame: this.gameBoard,
                          row: row, 
                          column: column
                        }

          const response = await axios.post("https://espacionebula.com:8000/evaluate-move", dataf,{
              headers: {
              "Access-Control-Allow-Origin": "*",
              "Authorization": `Bearer ${token}`,
            },

            mode: "cors"
          });

          const data = response.data
        

          if (response.data.success) {
            console.log(data.game);
            //this.board = data.game; 
            //aca mandar a pintar los colores
            this.colorUpdates = data.game[1];
            this.board[1] = data.game[1];
            
          } else {
            
            if (response.data.error === "This user is not the owner of the account."){

              localStorage.removeItem('KakuroToken');
              localStorage.removeItem('KakuroUsername');
              localStorage.removeItem('KakuroId');
              this.$router.push('/login');

              } else if (response.data.error === "User does not have an existing game!")
              {
                this.$router.push('/home');
              }


              console.log("There was an error with the user:" + response.data.error );

          }


       }catch (error) {
        this.error = error;
        console.log(this.error);
       }

      },
      async stopGame(){

        try {
         
          const userId = localStorage.getItem('KakuroId');
          const token = localStorage.getItem("KakuroToken");

          const dataf = { 
                          user_id: userId
                        }

          const response = await axios.post("https://espacionebula.com:8000/stop-game", dataf,{
              headers: {
              "Access-Control-Allow-Origin": "*",
              "Authorization": `Bearer ${token}`,
            },

            mode: "cors"
          });

          const data = response.data
        

          if (response.data.success) {

            this.$router.push('/home');
            
          } else {
            
            if (response.data.error === "This user is not the owner of the account."){

              localStorage.removeItem('KakuroToken');
              localStorage.removeItem('KakuroUsername');
              localStorage.removeItem('KakuroId');
              this.$router.push('/login');

            } else if (response.data.error === "User does not have an existing game!") {

                this.$router.push('/home');

            }
          
            
            console.log("There was an error with the user:" + response.data.error );

          }


       }catch (error) {
        this.error = error;
        console.log(this.error);
       }

      },
      async saveGame(){

        try {

          const userId = localStorage.getItem('KakuroId');
          const token = localStorage.getItem("KakuroToken");

          const dataf = { 
                          user_id: userId,
                          Actualgame: this.board
                        }

          const response = await axios.post("https://espacionebula.com:8000/save-game", dataf,{
              headers: {
              "Access-Control-Allow-Origin": "*",
              "Authorization": `Bearer ${token}`,
            },

            mode: "cors"
          });

          const data = response.data
        

          if (response.data.success) {

            this.$router.push('/home');
            
          } else {

            if (response.data.error === "This user is not the owner of the account."){

              localStorage.removeItem('KakuroToken');
              localStorage.removeItem('KakuroUsername');
              localStorage.removeItem('KakuroId');

              this.$router.push('/login');

            } else if (response.data.error === "User does not have an existing game!") {

                this.$router.push('/home');

            }
            
            console.log("There was an error with the user:" + response.data.error );

          }


       }catch (error) {
        this.error = error;
        console.log(this.error);
       }

      },
      async validateGame(){

        try {

          const userId = localStorage.getItem('KakuroId');
          const token = localStorage.getItem("KakuroToken");

          const dataf = { 
                          user_id: userId,
                          Actualgame: this.board,
                          level: this.levelName
                        }

          const response = await axios.post("https://espacionebula.com:8000/validate-game", dataf,{
              headers: {
              "Access-Control-Allow-Origin": "*",
              "Authorization": `Bearer ${token}`,
            },

            mode: "cors"
          });

          const data = response.data
        

          if (response.data.success) {
            this.successMessage = response.data.msg;
            setTimeout(() => {

              this.$router.push('/home');
              
            }, 5000);
            
            
          } else {
            if (response.data.error){
                  if (response.data.error === "This user is not the owner of the account."){

                    localStorage.removeItem('KakuroToken');
                    localStorage.removeItem('KakuroUsername');
                    localStorage.removeItem('KakuroId');

                    this.$router.push('/login');

                  } else if (response.data.error === "User does not have an existing game!") {

                    this.$router.push('/home');

                  }

                  console.log("There was an error with the user:" + response.data.error );

            }else{
              
              this.successMessage = response.data.msg;
            }
          }


       }catch (error) {
        this.error = error;
        console.log(this.error);
       }

      },
      getColorClass(rowIndex, cellIndex) {

        if( this.colorUpdates.length == 0 ){
          this.colorUpdates = this.board[1];
        }
        
        if (this.colorUpdates.length > 0 && this.colorUpdates[rowIndex][cellIndex] === 'red') {
          return 'text-danger'; // Clase de Bootstrap para texto rojo
        }
        return '';
      }
  }
};
</script>

<style scoped>


.kakuro-board {
  display: flex;
  justify-content: center;
  max-width: 300px;
  margin: 0 auto;
  
}

table {
  table-layout: fixed; 
  width: 100%; 
}

td {
  width: 60px; 
  height: 60px; 
  overflow: hidden; 
  vertical-align: middle; 
  text-align: center; 
}

.number-cell {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #D3D3D3; 
}

.top-left-number,
.bottom-right-number {
  position: absolute;
  font-size: 0.75rem;
}


.bottom-left-number {
  position: absolute;
  font-size: 0.75rem; 
  bottom: 2px; 
  left: 2px; 
}

.top-left-number {
  top: 0;
  left: 0;
}

.bottom-right-number {
  bottom: 0;
  right: 0;
}

.form-control {
  width: 100%; 
  height: 100%; 
  border: none; 
  padding: 0; 
  text-align: center; 
}

.btn {

  
  margin-right: 20px;
  font-size: 35px;
  width: 150px;
  height: 100px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;

}


@media (max-width: 768px) {
    .btn {

      font-size: 25px;
      width: 100px;
      height: 50px;
      
     }
}

@media (max-width: 503px) {
    .btn {

      font-size: 20px;
      width: 90px;
      height: 60px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
     }
}

@media (max-width: 473px) {
    .btn {

      font-size: 20px;
      width: 80px;
      height: 60px;
    }
}

@media (max-width: 443px) {
  .btn{
    font-size: 0.8rem; 
    width: 15vw; 
    height: 50px;
  }
}


@media (max-width: 370px) {

.square {
  width: 12vw; 
  height: 12vw; 
  margin: 0.9vw; 
 
}
.btn {
  font-size: 1rem; 
  width:30vw; 
  margin-top: 10px;
  
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
