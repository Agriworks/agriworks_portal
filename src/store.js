import Vue from 'vue'
import Vuex from 'vuex'
import {post} from './requests';
import {addCookie, getCookie, deleteCookie} from './static/script';
import { resolve } from 'any-promise';
import { isContext } from 'vm';

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
    loggedIn: false
  },
  mutations: {
    setLoggedInTrue (state) {
      state.loggedIn = true;
    }
  },
  getters: {
    isLoggedIn:  (state) => {
      return state.loggedIn
    }
  },
  actions: {
    retrieveSessionID(state, payload) {
      //return post("/auth/login", payload);
      return new Promise((resolve,reject) => {
        post("/auth/login", payload)
        .then(response => {
          addCookie(response.data.key, response.data.value, response.data.expires);
          store.commit("setLoggedInTrue");
          resolve();
        })
        .error(error => {
          console.log(error);
          reject();
        })
      })
  },
  }
})

export default store;