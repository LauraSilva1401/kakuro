<template>

    <section class="vh-100 gradient-custom">

        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <form @submit.prevent="updatePassword">

                                    <h2 class="fw-bold mb-2 text-uppercase">Reset password</h2>
                                    <p class="text-white-50 mb-5">Please enter your new password!</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" id="password" name="password" class="form-control form-control-lg" v-model="password" required/>
                                        
                                        <label class="form-label" for="typeEmailX">New Password</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" id="password2" name="password2" class="form-control form-control-lg" v-model="password2" required/>
                                        
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
  mounted() {

    this.preview();

  },
  data() {
    return {
      token: "",
      password: "",
      password2: "",
      type:2,
    };
  },
    methods: {

        preview() {
            try{

                if (this.$route.params.id == 1) {

                    if (localStorage.getItem('KakuroToken')) {

                        this.token = localStorage.getItem('KakuroToken');

                    }else{
                        //notoken
                        this.$router.push('/login');
                    }                 

                }else if (this.$route.params.id) {

                    this.token = this.$route.params.id;
                    this.type = 1;
                    console.log(this.token);

                }else{

                    this.$router.push('/login');

                }

            }catch(error){

                console.log(error);

            }
        },
        async updatePassword(){

            try {
                
                if( this.validatePasswords() ){

                    const url = (this.type == 1)?"https://espacionebula.com:8000/recover-l-password" : "https://espacionebula.com:8000/recover-password";

                    const dataf = {
                      password: this.password,
                    };

                    if(this.type == 2){

                        const _userId = localStorage.getItem("CupidConnectId");
                        dataf = { ...dataf, userId: _userId};

                    }

                    const response = await axios.post(
                        url,
                        dataf,
                          {
                                headers: {
                                  "Access-Control-Allow-Origin": "*",
                                  Authorization: `Bearer ${this.token}`,
                                },
                                mode: "cors",
                          }
                    );

                    if (response.data.success) {

                        this.$router.push("/login");
                      
                    } else {
                        
                        console.log("There was an error with the user : " + response.data.message);

                    }
                }


            } catch (error) {

                console.log(error);

            }

        },
        validatePasswords() {

            if (this.password === "" || this.password2 === "") {

                alert("Passwords cannot be empty");
                return false;

            }
            if (this.password !== this.password2) {

                alert("Passwords must be the same");
                return false;

            }
            if (this.password.length < 8 || this.password.length > 20) {

                alert("Password must be between 8 and 20 characters");
                return false;

            }

            alert("Password has been successfully updated. You will now be redirected to our login page");

            return true; 

        }

    },
  setup() {},
});




</script>