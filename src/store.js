import Vue from "vue";
import Vuex from "vuex";
import api from "./api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //Initial state
    isAdmin: false,
    loggedIn: "unset",
    snackbar: {
      message: "",
      show: false,
      color: ""
    },
    datasets: [],
    dataset: [],
    popularDatasets: [],
    recentDatasets: [],
    newDatasets: [],
    user: "", //the email address of the user,
    userDatasets: [],
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
    setPopularDatasets(state, datasets) {
      state.popularDatasets = datasets;
    },
    setRecentDatasets(state, datasets) {
      state.recentDatasets = datasets;
    },
    setNewDatasets(state, datasets) {
      state.newDatasets = datasets;
    },
    setUser(state, email) {
      state.user = email;
      state.loggedIn = true;
    },
    setUserDatasets(state, datasets) {
      state.userDatasets = datasets
    }

  },
  getters: {
    isAdmin: state => {
      return state.isAdmin;
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
      api.fetchDataset(id);
    },
    fetchUserDatasets(state) {
      api.fetchUserDatasets();
    },
    fetchPopularDatasets(state) {
      api.fetchPopularDatasets();
    },
    fetchRecentDatasets(state) {
      api.fetchRecentDatasets();
    },
    fetchNewDatasets(state) {
      api.fetchNewDatasets();
    },
    filterDatasets(state, searchQuery) {
      api.filterDatasets(searchQuery);
    },
    deleteDataset(state, id) {
      api.deleteDataset(id);
    },
    logout(state) {
      api.logout();
    }
  }
});

export default store;
