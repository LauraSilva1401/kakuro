<template>
    <div class="kakuro-board">
      <div v-for="(row, rowIndex) in board" :key="`row-${rowIndex}`" class="kakuro-row">
        <div v-for="(cell, cellIndex) in row" :key="`cell-${rowIndex}-${cellIndex}`" class="kakuro-cell" :class="`kakuro-cell-${cell.type}`">
          <template v-if="cell.type === 'gray'">
            <div class="kakuro-number">
              <span v-if="cell.value[0]">{{ cell.value[0] }}</span>
              <span v-if="cell.value[1]">{{ cell.value[1] }}</span>
            </div>
          </template>
          <template v-else-if="cell.type === 'white'">
            <input type="text" class="kakuro-input" />
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      board: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .kakuro-board {
    display: flex;
    flex-direction: column;
  }
  .kakuro-row {
    display: flex;
  }
  .kakuro-cell {
    width: 50px;
    height: 50px;
    border: 1px solid #000;
  }
  .kakuro-cell-white {
    background-color: #fff;
  }
  .kakuro-cell-gray {
    background-color: #ccc;
  }
  .kakuro-cell-black {
    background-color: #000;
  }
  .kakuro-number {
    display: flex;
    justify-content: space-between;
    color: #fff;
  }
  .kakuro-input {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  </style>
  