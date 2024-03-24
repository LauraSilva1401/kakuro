<template>

    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center">

                        <div class="mb-md-5 mt-md-4 pb-5">

                            <form @submit.prevent="login">

                                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                <p class="text-white-50 mb-5">Please enter your login and password!</p>

                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="username" name="username" class="form-control form-control-lg" v-model="username" required/>
                                  
                                    <label class="form-label" for="typeEmailX">Username</label>
                                </div>

                                 <div class="form-outline form-white mb-4">
                                    <input type="password" id="password" name="password" class="form-control form-control-lg" v-model="password" required />
                                    <label class="form-label" for="typePasswordX">Password</label>
                                </div>

                                 <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="/password">Forgot password?</a></p>

                                <button class="btn btn-outline-light btn-lg px-5" type="submit" >Login</button>

                                <div v-if="wrongPass" class="text-red-500 text-center my-4">
                                     {{ error }}
                                </div>

                            </form>

                        </div>

                        <div>
                            <p class="mb-0">Don't have an account? <a href="/registration" class="text-white-50 fw-bold">Sign Up</a></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { useUserStore } from "../../stores/users";
import axios from "axios";
 
export default defineComponent({
    components: {},
    created() {},
    mounted() {

        if (localStorage.getItem('KakuroToken')) {

            this.$router.push('/home');
            
        }

    },
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

                this.$router.push("/home");

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