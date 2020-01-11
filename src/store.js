import Vue from "vue";
import Vuex from "vuex";
import { post } from "./requests";
import { addCookie, wasAlreadyLoggedIn } from "./js/authentication";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //Initial state
    loggedIn: wasAlreadyLoggedIn(),
    errorMessage: "",
    showError: false,
    datasets: [],
    dataset: []
  },
  mutations: {
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
    fetchDatasets(state, payload) {
      post("/dataset/filter", payload)
        .then(response => {
          this.commit("setDatasets", response.data);
          this.commit("setErrorMessage", "");
        })
        .catch(store.commit("setErrorMessage", "Unable to get datasets."));
    },
    fetchDataset(state, payload) {
      post("/dataset/data", payload)
        .then(response => {
          this.commit("setDataset", response.data);
          this.commit("setErrorMessage", "");
        })
        .catch(
          store.commit("setErrorMessage", "Unable to get data for dataset.")
        );
    }
  }
});

export default store;
