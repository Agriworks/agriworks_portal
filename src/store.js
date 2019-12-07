import Vue from 'vue'
import Vuex from 'vuex'
import { post } from './requests';
import { addCookie, wasAlreadyLoggedIn } from './js/authentication';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //Initial state
    loggedIn: wasAlreadyLoggedIn()
  },
  mutations: {
    setLoggedInTrue(state) {
      state.loggedIn = true;
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return state.loggedIn
    }
  },
  actions: {
    retrieveSessionID(state, payload) {
      return new Promise((resolve, reject) => {
        post("/auth/login", payload)
          .then(response => {
            addCookie(response.data.key, response.data.value, response.data.expires);
            store.commit("setLoggedInTrue");
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          })
      })
    },
  }
})

export default store;