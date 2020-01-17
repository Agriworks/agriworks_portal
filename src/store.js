import Vue from "vue";
import Vuex from "vuex";
import { post, get } from "./requests";
import { addCookie, wasAlreadyLoggedIn } from "./js/authentication";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //Initial state
    loggedIn: wasAlreadyLoggedIn(),
    errorMessage: "",
    showError: false,
    datasets: [],
    dataset: [],
    user: ""
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
    },
    setUser(state, email){
      state.user = email
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
      if (searchQuery == undefined || searchQuery == "" || searchQuery == " ") {
        this.dispatch("fetchDatasets");
      } else {
        get(`/dataset/search/${searchQuery}`)
          .then(response => {
            this.commit("setDatasets", response.data);
            this.commit("setErrorMessage", "");
          })
          .catch(
            store.commit(
              "setErrorMessage",
              "Unable to find datasets with given parameter(s)."
            )
          );
      }
    }
  }
});

export default store;
