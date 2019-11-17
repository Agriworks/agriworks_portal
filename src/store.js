import Vue from 'vue'
import Vuex from 'vuex'
import {post} from './requests';
// import getCookie from './static/script';
import {addCookie, getCookie, deleteCookie} from './static/script';

Vue.use(Vuex)

const apiConfig = {
  url: "http://localhost:4000",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*"
  }
}


var cookie = document.cookie.match('(^|;) ?SID=([^;]*)(;|$)');

const store = new Vuex.Store({
  state: {
    cookie: cookie ? cookie[2] : null
  },
  mutations: {

  },

  actions: {
    retrieveSessionID(state, payload) {
      //return post("/auth/login", payload);
      post("/auth/login", payload)
      .then(response => {
        console.log(response);
        addCookie(response.data.key, response.data.value, response.data.expires);
        this.dispatch("forwardToDashboard");
    })
  },
    forwardToDashboard(state) {
      //Fix push
      this.$router.push('/dashboard');
    }
  }
})

export default store;