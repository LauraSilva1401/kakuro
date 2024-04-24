<template>
    <div class="container">
      <h1 class="title">{{levelName}} Level - Rank</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Level</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in histories" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.username }}</td>
            <td><NuxtLink :to="`/ranking/${item.id}`">{{ item.level }}</NuxtLink></td>
            <td>{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>


  

  </template>
  
  <script>
  import axios from "axios";
 
  
  export default defineComponent({
    data() {
      return {
        histories: [],
        levelName: '',
        
      };
    },
    mounted() {
      if (!localStorage.getItem('KakuroToken')) {
        this.$router.push('/login');
      } else {

        this.levelName = this.$route.query.level; 
        
        this.getHistories();
      }
    },
    methods: {
      async getHistories() {
        try {

          /* const userId = localStorage.getItem('KakuroId'); */
          
          const levelName = this.$route.query.level;
          const token = localStorage.getItem("KakuroToken");
          const level_Id = localStorage.getItem('KakuroLevelId');

          const dataf = { level: levelName,
                        }

          const response = await axios.post("https://espacionebula.com:8000/get-records", dataf,{
            headers: {
            "Access-Control-Allow-Origin": "*",
              "Authorization": `Bearer ${token}`,
            },

            mode: "cors"
          });

          console.log(response); 

          
          const data = response.data
          
          if (response.data.success) {
            
            this.histories = data.histories.map(item => {
              return {
                ...item,
                time: this.convertToMinutesAndSeconds(item.time)
              }
            })
            
            console.log(this.histories);
            
          } else {

            
            
            console.log("There was an error with the user:" + response.data.error );
            

          }
        } catch (error) {
          this.error = error.toString();
          console.error(error);
        }
      },
      convertToMinutesAndSeconds(decimalMinutes) {
          
            const totalSeconds = decimalMinutes * 60;
            
            
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.round(totalSeconds % 60);

            return `${minutes} minutes ${seconds} seconds`;
      },
    }
  });
  </script>
  
  <style scoped>

.title {
    margin-top: 200px;
    margin-bottom: 50px;
    font-size: 80px;
    color: #4000ff; 
    font-family: 'Your-Pixel-Font', sans-serif;
    font-weight: bold;
    align-items: center;
  }

  

  .container {
    min-height: 100vh;
  }

  @media (max-width: 767px) {

   
  .title {
    font-size: 40px; 
  }
}

  @media (max-width: 500px) {
  .title {
    font-size: 3rem;
  }
  
 
}

@media (max-width: 250px) {
  .title {
    font-size: 2rem;
  }
  
 
}


  
  </style>
  