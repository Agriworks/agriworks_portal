import Vue from "vue";
import Vuex from "vuex";
import { post, get } from "./requests";
import {
  getCookie,
  addCookie,
  wasAlreadyLoggedIn,
  deleteCookie
} from "./js/authentication";
import api from './api'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //Initial state
    loggedIn: wasAlreadyLoggedIn(),
    errorMessage: "",
    showError: false,
    datasets: [],
    dataset: [],
    user: "" //the email address of the user
  },
  mutations: {
    setLoggedInFalse(state) {
      state.loggedIn = false;
    },
    setLoggedInTrue(state) {
      state.loggedIn = true;
    },
    setErrorMessage(state, error) {
      state.errorMessage = error;
    },
    setShowError(state, val) {
      state.showError = val;
    },
    setDatasets(state, datasets) {
      state.datasets = datasets;
    },
    setDataset(state, dataset) {
      state.dataset = dataset;
    },
    setUser(state, email) {
      state.user = email;
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn;
    },
    getErrorMessage: state => {
      return state.errorMessage;
    },
    getShowError: state => {
      return state.showError;
    }
  },
  actions: {
    logout(state) {
      const SID = getCookie("SID");
      api.logout(SID); 
    },
    retrieveSessionID(state, payload) {
      api.getSessionID(payload); 
    },
    fetchOneDataset(state, datasetId) {
      get(`/dataset/${datasetId}`)
        .then(response => {
          this.commit("setDataset", response.data);
          this.commit("setErrorMessage", "");
        })
        .catch(err => {
          store.commit(
            "setErrorMessage",
            "Unable to retrieve data for dataset"
          );
        });
    },
    fetchDatasets(state) {
      get("/dataset/")
        .then(response => {
          this.commit("setDatasets", response.data);
          this.commit("setErrorMessage", "");
        })
        .catch(store.commit("setErrorMessage", "Unable to get datasets."));
    },
    filterDatasets(state, searchQuery) {
      api.filterDataset(searchQuery)
    }
  }
});

export default store;
