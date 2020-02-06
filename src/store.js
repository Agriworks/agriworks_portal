import Vue from "vue";
import Vuex from "vuex";
import { getCookie, wasAlreadyLoggedIn} from "./js/authentication";
import api from './api'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //Initial state
    loggedIn: wasAlreadyLoggedIn(),
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
  actions: {
    logout() {
      api.logout(getCookie("SID")); 
    },
    retrieveSessionID(state, payload) {
      api.getSessionID(payload); 
    },
    fetchOneDataset(datasetId) {
      api.fetchDataset(datasetId);
    },
    fetchDatasets() {
      api.fetchDatasets();
    },
    filterDatasets(searchQuery) {
      api.filterDatasets(searchQuery)
    }
  }
});

export default store;
