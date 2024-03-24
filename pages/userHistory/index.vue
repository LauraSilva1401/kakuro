<template>
    <div class="container">
      <h1>User History</h1>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Level</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in history" :key="index">
            <td>{{ index + 1 }}</td>
            <td><NuxtLink :to="`/game/${item.id}`">{{ item.level }}</NuxtLink></td>
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
        history: [],
        
      };
    },
    mounted() {
      if (!localStorage.getItem('KakuroToken')) {
        this.$router.push('/login');
      } else {
        
        this.getHistory();
      }
    },
    methods: {
      async getHistory() {
        try {

          debugger;
          console.log("Mensaje");
          debugger;

          const userId = localStorage.getItem('KakuroId');
          

          const token = localStorage.getItem("KakuroToken");

          const dataf = { user_id: userId,
                        }

          const response = await axios.post("https://espacionebula.com:8000/get-user-history", dataf,{
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
            
            this.history = data.histories;
            console.log(this.history);
            
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
  
  </style>
  