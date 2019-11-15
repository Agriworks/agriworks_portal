import Vue from 'vue'
import Vuex from 'vuex'
// import getCookie from './static/script';
// import axios from 'axios'
// import addCookie from './static/script';

Vue.use(Vuex)

/*
const axiosConfig = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*"
  }
};
*/


var cookie = document.cookie.match('(^|;) ?SID=([^;]*)(;|$)');

const store = new Vuex.Store({
  state: {
    cookie: cookie ? cookie[2] : null
  },
  mutations: {

  },
  actions: {
    retrieveSessionID(state, payload) {
      
      console.log("Attempting to send login data for email " + payload.email + " and password " + payload.password);
      /*
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/auth/login', JSON.stringify(
          {
            email: email,
            password: password,
          }), axiosConfig)
          .then(response => {
            console.log(response);
            addCookie(response.data.key, response.data.value, response.data.expires);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
      }) 
      */
    },

  }
})

export default store;