import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {

  state: () => ({

    id: '',
    username: '',
    isAuthenticated: !!localStorage.getItem('KakuroToken'),
  }),

  actions: {

    setuserId(id) {
      this.id = id;
      this.isAuthenticated = true;
    },
    setUsername(username) {
      this.username = username;
    },

    logOutUser(){
      localStorage.removeItem('KakuroUsername');
      localStorage.removeItem('KakuroToken');
      localStorage.removeItem('KakuroId');
      this.isAuthenticated = false;
    }
  },
})