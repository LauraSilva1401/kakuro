import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {

  state: () => ({

    id: '',
    username: '',

  }),

  actions: {

    setuserId(id) {
      this.id = id;
    },
    setUsername(username) {
      this.username = username;
    },

    logOutUser(){
      localStorage.removeItem('CupidConnectEmail');
      localStorage.removeItem('CupidConnectuser');
      localStorage.removeItem('CupidConnectToken');
      localStorage.removeItem('CupidConnectType');
      localStorage.removeItem('CupidConnectId');
    }
  },
})