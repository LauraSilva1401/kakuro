<template>
  <div class="kakuro-board">
    <table class="table table-bordered">
      <tr v-for="(row, rowIndex) in board[0]" :key="`row-${rowIndex}`">
        <td
          v-for="(cell, cellIndex) in row"
          :key="`cell-${rowIndex}-${cellIndex}`"
          :class="{'bg-dark text-white': cell === 'black', 'bg-light': cell === 'white' || Array.isArray(cell)}"
          @click="openCellMenu(cell, rowIndex, cellIndex)"
        >
          <!-- Cell with numbers -->
          <div v-if="Array.isArray(cell)" class="number-cell">
            <div class="bottom-left-number">{{ cell[0] !== 0 ? cell[0] : '' }}</div>
            <div class="bottom-right-number">{{ cell[1] !== 0 ? cell[1] : '' }}</div>
          </div>
          <!-- Editable cell (for user input) -->
          <input v-else-if="cell === 'white'" type="text" class="form-control" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Array,
      required: true
    }
  },
  methods: {
    openCellMenu(cell, rowIndex, cellIndex) {
      if (cell === 'white') {
        // logic to open menu, potentially using Bootstrap Vue's b-popover or similar
        console.log(`Opening menu for cell at row ${rowIndex}, column ${cellIndex}`);
      }
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
