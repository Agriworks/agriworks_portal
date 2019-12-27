import Vue from 'vue'
import Vuex from 'vuex'
import { post } from './requests';
import { addCookie, wasAlreadyLoggedIn } from './js/authentication';
import client from "api-client"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //Initial state
    loggedIn: wasAlreadyLoggedIn(), 
    errorMessage: "", 
    showError: false,
    datasets: []
  },
  mutations: {
    setLoggedInTrue(state) {
      state.loggedIn = true;
    }, 
    setErrorMessage (state, error) {
      state.errorMessage = error; 
    }, 
    setShowError (state, val) {
      state.showError = val; 
    },
    setDatasets (state, datasets) {
      state.datasets = datasets
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return state.loggedIn
    }, 
    getErrorMessage: (state) => {
      return state.errorMessage
    }, 
    getShowError: (state) => {
      return state.showError
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
    fetchDatasets ({commit}) {
      return client.fetchDatasets().then(datasets => commit('setDatasets', datasets))
    }
  }
})

export default store;