<template>

    <section class="vh-100 gradient-custom">

        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <form action="https://formsubmit.co/joshrs23@gmail.com" method="POST">

                                    <h2 class="fw-bold mb-2 text-uppercase">Reset password</h2>
                                    <p class="text-white-50 mb-5">Please enter your new password!</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" id="password" name="password" class="form-control form-control-lg" v-model="password" required/>
                                        
                                        <label class="form-label" for="typeEmailX">New Password</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" id="password" name="password" class="form-control form-control-lg" v-model="password" required/>
                                        
                                        <label class="form-label" for="typeEmailX">Confirm New Password</label>
                                    </div>

                                    <button class="btn btn-outline-light btn-lg px-5" type="submit" >Update Password</button>

                                </form>

                            </div>

                            <div>
                              <p class="mb-0">Don't have an account? <a href="/registration" class="text-white-50 fw-bold">Sign Up</a> </p>
                              <p class="mb-0">Do you have an account? <a href="/login" class="text-white-50 fw-bold">Log in</a> </p>
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
      username: "",
      password: "",
      wrongPass: false,
      error: "",
      userData: useUserStore(),
    };
  },
  methods: {
    async login() {
      try {
        
        console.log("Mensaje");
        
        
        const data = {
          username: this.username,
          password: this.password,
        };
        const response = await axios.post(
          "https://espacionebula.com:8000/sign-in",
          data,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
          }
        );
        if (response.data.success) {
 
          this.wrongPass = false;
          localStorage.setItem("KakuroToken", response.data.token);
          localStorage.setItem("KakuroUsername", response.data.user.username);
         
          
          localStorage.setItem("KakuroId", response.data.user._id);
          this.userData.setUsername(localStorage.getItem("KakuroUsername"));
          this.userData.setuserId(localStorage.getItem("KakuroId"));
 
          this.$router.push("/game");
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
});




</script>