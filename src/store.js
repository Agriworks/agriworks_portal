import Vue from 'vue'
import Vuex from 'vuex'
import { post } from './requests';
import { addCookie, wasAlreadyLoggedIn } from './js/authentication';
import client from "api-client" //TODO: check config value 
import server from "./api/server/index"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: true, 
    errorMessage: "", 
    showError: false,
    datasets: [],
    dataset: {},
    user: ""
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
      state.datasets = datasets;
    },
    setDataset(state, dataset) {
      state.dataset = dataset;
    },
    setUser(state, user) {
      state.user = user;
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
    },
    getUser: (state) => {
      return state.user 
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
      return server.fetchDatasets().then(datasets => commit('setDatasets', datasets))
    },
    fetchDataset ({commit}, data) {
      return server.fetchDataset(data.id).then(dataset => commit('setDataset', dataset)) 
    },
    uploadDataset ({commit}, newDataset) {
      return server.uploadDataset(newDataset.file, newDataset.name, newDataset.tags, newDataset.permissions, newDataset.type)//TODO: correctly return success/error message
    }
  }
})

export default store;