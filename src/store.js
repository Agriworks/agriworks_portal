import Vue from "vue";
import Vuex from "vuex";
import { post, get } from "./requests";

import {
  getCookie,
  addCookie,
  wasAlreadyLoggedIn,
  deleteCookie
} from "./js/authentication";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //Initial state
    loggedIn: wasAlreadyLoggedIn(),
    snackbar: {
      message: "",
      show: false,
      color: ""
    },
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
    }
  },
  getters: {
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
    logout(state) {
      const SID = getCookie("SID");
      post("/auth/logout", { sessionId: SID })
        .then(res => {
          deleteCookie("SID");
          store.commit("setLoggedInFalse");
          state.commit("setSnackbar", {
            message: res.data.message,
            show: true,
            color: "#4CAF50"
          });
        })
        .catch(err => {
          state.commit("setSnackbar", {
            message: err.response.data.message,
            show: true,
            color: "#F44336"
          });
        });
    },
    retrieveSessionID(state, payload) {
      return new Promise((resolve, reject) => {
        post("/auth/login", payload)
          .then(response => {
            addCookie(
              response.data.key,
              response.data.value,
              response.data.expires
            );
            store.commit("setLoggedInTrue");
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    fetchOneDataset(state, datasetId) {
      get(`/dataset/${datasetId}`)
        .then(response => {
          this.commit("setDataset", response.data);
          state.commit("setSnackbar", {
            message: "",
            show: false,
            color: "#00ACC1"
          });
        })
        .catch(err => {
          state.commit("setSnackbar", {
            message: err.response.data.message,
            show: true,
            color: "#F44336"
          });
        });
    },
    fetchDatasets(state) {
      get("/dataset/")
        .then(response => {
          this.commit("setDatasets", response.data);
          state.commit("setSnackbar", {
            message: "",
            show: false,
            color: "#00ACC1"
          });
        })
        .catch(err => {
          state.commit("setSnackbar", {
            message: err.response.data.message,
            show: true,
            color: "#F44336"
          });
        });
    },
    filterDatasets(state, searchQuery) {
      if (searchQuery == undefined || searchQuery == "" || searchQuery == " ") {
        this.dispatch("fetchDatasets");
      } else {
        get(`/dataset/search/${searchQuery}`)
          .then(response => {
            this.commit("setDatasets", response.data);
            state.commit("setSnackbar", {
              message: "",
              show: false,
              color: "#00ACC1"
            });
          })
          .catch(err => {
            state.commit("setSnackbar", {
              message: err.response.data.message,
              show: true,
              color: "#F44336"
            });
          });
      }
    }
  }
});

export default store;
