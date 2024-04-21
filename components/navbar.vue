
import type { setBlockTracking } from 'vue';


<template>

    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
            
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                <li v-if="isLogin" class="nav-item">
                    <NuxtLink to="/home" class="nav-link active" @click.native="collapseNavbar" aria-current="page">Home</NuxtLink>
                </li>

                <li v-if="isLogin" class="nav-item">
                    <NuxtLink to="/userHistory" class="nav-link active" @click.native="collapseNavbar" aria-current="page">My History</NuxtLink>
                </li>

                <li v-if="isLogin" class="nav-item">
                    <NuxtLink to="/globalRanking" class="nav-link active" @click.native="collapseNavbar" aria-current="page">Global Ranking</NuxtLink>
                </li>

                <li v-if="!isLogin" class="nav-item">
                    <NuxtLink to="/login" class="nav-link active" @click.native="collapseNavbar" aria-current="page">Log in</NuxtLink>
                </li>

                <li class="nav-item">
                    <NuxtLink to="/rules" class="nav-link active" @click.native="collapseNavbar" aria-current="page">Kakuro Rules</NuxtLink>
                </li>
                
                
            </ul>
            
            <button v-if="isLogin" class="btn btn-outline-success" type="button" @click="logOutUser">Logout</button>
    
            
            </div>
        </div>
    </nav>


</template>

<script>
import { useUserStore } from "../../stores/users";

export default {
    data() {
    return {
        isLogin: false,
        cargo: false,
    };
  },
  created() {
    //this.checkAuthentication();
  },
  mounted() {
    if (localStorage.getItem("KakuroToken")) {
        this.isLogin = true;
    }
    this.cargo = true;
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.checkAuthentication();
      },
    },
  },
    methods: {
        collapseNavbar() {
            if (window.innerWidth < 992) { 
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('#navbarSupportedContent');

                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        },
        checkAuthentication() {

            if (this.cargo) {
                if (localStorage.getItem("KakuroToken")) {
                    this.isLogin = true;
                }else{
                    this.isLogin = false;
                }
            }

        },
        logOutUser(){
        localStorage.removeItem('KakuroToken');
        localStorage.removeItem('KakuroUsername');
        localStorage.removeItem('KakuroId');

        this.$router.push('/login');
        }
    }
};
</script>

<style scoped>

.navbar {
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white !important;
}

.btn {
    color: rgb(0, 0, 0) !important;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
    border-color:  rgb(0, 0, 0) !important;
    
}

.navbar-nav{
  margin:auto;
}

.nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
    font-size: 20px;
    margin-right: 30px;
    margin-left: 30px;
}

.nav-item:hover {
    color: #648bcd !important;
}

</style>