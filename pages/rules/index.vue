<template>
  <div class="container">
    <div class="kakuro-rules">
      <h1>Kakuro Rules</h1>
      <p class="par">Kakuro or Kakkuro is a kind of logic puzzle that is often referred to as a mathematical 
        transliteration of the crossword. Kakuro puzzles are regularly featured in many math and 
        logic puzzle publications.</p>
      <div class="content">
        <ul>
          <li>Kakuro puzzles are similar to crosswords, but instead of letters, numbers are used.</li>
          <li>The objective is to fill all of the blank squares in the grid with only the numbers 1-9 so that the sum of each horizontal block equals the clue on its left, and the sum of each vertical block equals the clue on its top.</li>
          <li>No number may be used in the same block more than once.</li>
          <li>The numbers in each horizontal and vertical region must add up to the sum indicated for that region.</li>
        </ul>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    head() {
      return {
        title: 'Kakuro Rules',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn the rules of the famous Kakuro game.' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    min-height: 80vh; /* Full screen height */
    padding-top: 50px; /* Reduced padding for smaller screens */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .kakuro-rules {
    max-width: 90%; /* Use a percentage-based width for responsiveness */
    padding: 20px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
    margin: 20px;
  }
  
  .kakuro-rules h1 {
    text-align: center;
    color: #343a40;
    margin-bottom: 20px; /* Reduced margin */
    font-size: 1.75rem; /* Larger font size for readability */
  }
  
  .par {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .content {
    text-align: justify;
  }
  
  .kakuro-rules ul {
    list-style-type: none;
    padding: 0;
  }
  
  .kakuro-rules li {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 10px;
    border-left: 5px solid #007bff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
    .container {
      min-height: 80vh; 
      padding-top: 20px; 
    }
  
    .kakuro-rules {
      padding: 10px;
      margin: 10px;
    }
  
    .kakuro-rules h1 {
      font-size: 1.5rem; 
    }
  
    .par, .content {
      font-size: 0.9rem; 
    }
  }

  @media (max-width: 500px) {

   

    .kakuro-rules {
      padding:10px;
      margin: 10px;
      margin-top: 70px;
    }

  }


  @media (max-width: 300px) {

   

    .kakuro-rules {
      padding:10px;
      margin: 10px;
      margin-top: 100px;
      margin-bottom: 40px;
    }

}
  </style>
  
  