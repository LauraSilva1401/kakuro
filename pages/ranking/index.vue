<template>
    <div class="container">
      <h1 class="title">{{levelName}} Level - Rank</h1>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Level</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in histories" :key="index">
            <td>{{ index + 1 }}</td>
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

          debugger
          const data = response.data
          debugger
          if (response.data.success) {
            
            this.histories = data.histories;
            console.log(this.histories);
            
          } else {
            
            console.log("There was an error with the user:" + response.data.error );
            

          }
        } catch (error) {
          this.error = error.toString();
          console.error(error);
        }
      },
    }
  });
  </script>
  
  <style scoped>

.title {
    margin-top: 200px;
    margin-bottom: 50px;
    font-size: 65px;
    color: #4000ff; 
    font-family: 'Your-Pixel-Font', sans-serif;
    font-weight: bold;
    align-items: center;
  }

  

  .container {
    height: 620px;
  }


  
  </style>
  