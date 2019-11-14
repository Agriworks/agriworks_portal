import Vue from 'vue'
import Vuex from 'vuex'
// import getCookie from './static/script';
import axios from 'axios'
import addCookie from './static/script';

Vue.use(Vuex)

var cookie = document.cookie.match('(^|;) ?SID=([^;]*)(;|$)');
const store = new Vuex.Store({
  state: {
    cookie: cookie ? cookie[2] : null
  },
  mutations: {

  },
  actions: {
    retrieveSessionID() {
      console.log("Attempting to send login data");
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: 'http://localhost:4000/auth/login',
          data: {
            email: "mdesilva@bu.edu",
            password: "password"
          },
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then(response => {
            addCookie(response.data.key, response.data.value, response.data.expires)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

  }
})

export default store;