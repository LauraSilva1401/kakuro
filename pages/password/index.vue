<template>

    <section class="vh-100 gradient-custom">

        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <form @submit.prevent="resetPassword">

                                    <h2 class="fw-bold mb-2 text-uppercase">Reset password</h2>
                                    <p class="text-white-50 mb-5">Please enter your email to recover your password!</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" id="email" name="email" class="form-control form-control-lg" v-model="email" required/>
                                        
                                        <label class="form-label" for="typeEmailX">Email</label>
                                    </div>

                                    <button class="btn btn-outline-light btn-lg px-5" type="submit" >Recover</button>

                                    <div v-if="errorEmail" class="alert alert-success mt-3">
                                        {{ error }}
                                    </div>

                                    <div v-if="success" class="alert alert-success mt-3">
                                      If your email is in our data base, you should receive a reset password email soon.
                                    </div>

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
        email: "",
        errorEmail: false,
        error: "",
        success: false,
    };
  },
  methods: {
    async resetPassword() {

        try {

            const data = {
              email: this.email
            };
            const response = await axios.post(

              "https://espacionebula.com:8000/email-password",
              data,
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
                mode: "cors",
              }

            );
            if (response.data.success) {

              this.success = true;
              this.errorEmail = false;
     
                setTimeout(() => {

                this.$router.push('/login');

                }, 5000);

            } else {

              this.errorEmail = true;
              this.success = false;
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