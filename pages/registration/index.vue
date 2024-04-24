<template>

    <section class="vh-100 gradient-custom">

        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                            <form @submit.prevent="registration">

                                <h2 class="fw-bold mb-2 text-uppercase">registration</h2>
                                <p class="text-white-50 mb-5">Please enter the information below to register!</p>

                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="firstName" name="firstName" class="form-control form-control-lg" v-model="firstName" required/>
                                    
                                    <label class="form-label" for="firstName">First Name</label>
                                </div>

                                 <div class="form-outline form-white mb-4">
                                    <input type="text" id="lastName" name="lastName" class="form-control form-control-lg" v-model="lastName" required/>
                                    
                                    <label class="form-label" for="lastName">Last Name</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="email" name="email" class="form-control form-control-lg" v-model="email" required/>
                                    
                                    <label class="form-label" for="email">Email</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="username" name="username" class="form-control form-control-lg" v-model="username" required/>
                                    
                                    <label class="form-label" for="username">Username</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="password" name="password" class="form-control form-control-lg" v-model="password" required />
                                    <label class="form-label" for="password">Password</label>
                                </div>

                                <div v-if="wrongPass" class="alert alert-success mt-3">
                                              {{ error }}
                                </div>

                                <div v-if="success" class="alert alert-success mt-3">
                                      You have successfully registered. Wait a few seconds to be redirected to our login page.
                                </div>

                                <div v-if="password.length > 0 && !isPasswordValid" class="alert alert-success mt-3">
                                  Password must be between 8 and 20 characters.
                                </div>
                              

                                <button class="btn btn-outline-light btn-lg px-5" type="submit" >Register</button>

                                

                            </form>

                            </div>

                            <div>
                            <p class="mb-0">Already have an account? <a href="/login" class="text-white-50 fw-bold">Go to Login</a>
                            </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
import { useUserStore } from "../../stores/users";
import axios from "axios";
 
export default defineComponent({
  components: {},
  created() {},
  mounted() {},
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      wrongPass: false,
      success: false,
      error: "",
      userData: useUserStore(),
    };
  },
  methods: {
    async registration() {
      try {
        
        console.log("Mensaje");
        
        
        const data = {
          email: this.email,
          username: this.username,
          fname: this.firstName,
          lname: this.lastName,
          password: this.password,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/registration",
          data,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
          }
        );
        debugger
        if (response.data.success) {
 
          this.wrongPass = false;
          this.success = true;

          setTimeout(() => {

            this.$router.push('/login');

          }, 5000);
          
 
          
        } else {
          this.wrongPass = true;
          this.error = response.data.error;
          console.log(response.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  setup() {},
  computed: {
    
    isPasswordValid() {
      return this.password.length >= 8 && this.password.length <= 20;
    }
  }
});




</script>

<style scoped>

.vh-100 {
  margin-bottom: 200px;
}


</style>