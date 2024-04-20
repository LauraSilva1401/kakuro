<template>
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
          <input v-else-if="cell === 'white' || !isNaN(cell)" type="text" class="form-control"
             :class="getColorClass(rowIndex, cellIndex)" @input="validateInput($event)" @blur="handleCellInput($event, rowIndex, cellIndex)"/>
        </td>
      </tr>
    </table>
  </div>

  <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="stopGame">Stop</button>
  <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="saveGame">Save</button>
  <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="valdiateGame">Validate</button>

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
    };
  },
  props: {
    board: {
      type: Array,
      required: true
    }
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
            
            console.log("There was an error with the user:" + response.data.error );
            

          }


       }catch (error) {
          this.error = error;
          console.log(this.error);
        }
      },
      async stopGame(){

      },
      async saveGame(){

      },
      async Validate(){

      },
      getColorClass(rowIndex, cellIndex) {

        if(typeof this.colorUpdates === 'undefined'){
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
  max-width: 300px;
  margin: 0 auto;
}

table {
  table-layout: fixed; /* Ensures the table respects set widths */
  width: 100%; /* Adjust based on your requirements */
}

td {
  width: 60px; /* Square size width */
  height: 60px; /* Square size height */
  overflow: hidden; /* Keeps content from spilling out */
  vertical-align: middle; /* Centers content vertically */
  text-align: center; /* Centers content horizontally */
}

.number-cell {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #D3D3D3; /* Sets gray background for number cells */
}

.top-left-number,
.bottom-right-number {
  position: absolute;
  font-size: 0.75rem;
}

/* Adjustments for number positioning */
.bottom-left-number {
  position: absolute;
  font-size: 0.75rem; /* Adjust size as needed */
  bottom: 2px; /* Positions at the bottom of the cell */
  left: 2px; /* Positions at the left of the cell */
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
  width: 100%; /* Ensures the input fits in the cell */
  height: 100%; /* Ensures the input covers the cell */
  border: none; /* Optional: removes border */
  padding: 0; /* Removes padding to prevent overflow */
  text-align: center; /* Centers text */
}
</style>
