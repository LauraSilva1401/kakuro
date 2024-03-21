<template>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <h1 class="logo mb-4">KAKURO+</h1>
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
          
          <h2 class="text-center my-4">Select Game Difficulty</h2>
          <div class="d-flex justify-content-center">
            <div class="p-2">
              <nuxt-link to="/easy">
                <button type="button" class="btn btn-success">Easy</button>
              </nuxt-link>
            </div>
            <div class="p-2">
              <nuxt-link to="/medium">
                <button type="button" class="btn btn-warning">Medium</button>
              </nuxt-link>
            </div>
            <div class="p-2">
              <nuxt-link to="/hard">
                <button type="button" class="btn btn-danger">Hard</button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  </script>
  
  <style scoped>

 
  .logo {
    font-size: 100px;
    color: #4000ff; 
    font-family: 'Your-Pixel-Font', sans-serif;
  }
  
  .pixel-art {
    
  }
  
  .square {
    width: 50px;
    height: 50px;
    background-color: #ff5722;
    margin: 2px;
  }
  
  .bg-orange {
    background-color: #ff5722; 
  }

  .bg-gray {
    background-color: #3f514c; 
  }
  
  </style>
  