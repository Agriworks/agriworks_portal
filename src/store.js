import Vue from "vue";
import Vuex from "vuex";
import { getCookie, wasAlreadyLoggedIn} from "./js/authentication";
import api from './api'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //Initial state
    isAdmin: false,
    loggedIn: wasAlreadyLoggedIn(),
    snackbar: {
      message: "",
      show: false,
      color: ""
    },
    datasets: [],
    dataset: [],
    user: "", //the email address of the user
    tagsOfChosenType: []
  },
  mutations: {
    setIsAdmin(state) {
      state.isAdmin = true; 
    },
    setLoggedInFalse(state) {
      state.loggedIn = false;
    },
    setLoggedInTrue(state) {
      state.loggedIn = true;
    },
    setSnackbar(state, snackbar) {
      state.snackbar.message = snackbar.message;
      state.snackbar.show = snackbar.show;
      state.snackbar.color = snackbar.color;
    },
    setDatasets(state, datasets) {
      state.datasets = datasets;
    },
    setDataset(state, dataset) {
      state.dataset = dataset;
    },
    setUser(state, email) {
      state.user = email;
      state.loggedIn = true;
    },
    setTags(state, tags) {
      state.tagsOfChosenType = tags;
    }

  },
  getters: {
    isAdmin: state => {
      return state.isAdmin
    },
    isLoggedIn: state => {
      return state.loggedIn;
    },
    getErrorMessage: state => {
      return state.snackbar.errorMessage;
    },
    getShowError: state => {
      return state.snackbar.showError;
    },
    getSuccessMessage: state => {
      return state.snackbar.successMessage;
    },
    getShowSuccess: state => {
      return state.snackbar.showSuccess;
    }
  },
  actions: {
    fetchDatasets(state) {
      api.fetchDatasets();
    },
    fetchDataset(state, id) {
      console.log(id);
      api.fetchDataset(id);
    },
    fetchTags(state, type) {
      api.fetchTags(type);
    },
    filterDatasets(state,searchQuery) {
      api.filterDatasets(searchQuery);
    },
    logout(state){
      api.logout(getCookie("SID"));
    }
  }
});

export default store;
