import { getCookie, deleteCookie } from "./js/authentication";
import router from "./router";
import { post, get, _delete } from "./requests";
import store from "./store"; //might be a circular import
import notify from "./utilities/notify";
import { colors } from "./utilities/branding";

const api = {
  fetchDatasets(pageNumber = 0) {
    return get(`/dataset/list/${pageNumber}`)
      .then(response => {
        if (pageNumber == 0) { store.commit("setDatasets", { datasets: response.data, append: false }) }
        else {
          store.commit("setDatasets", { datasets: response.data, append: true })
        }
      })
      .catch(() => {
        notify("Error fetching datasets", colors.red);
      });
  },
  fetchDatasetInfo(id) {
    return get(`/dataset/metadata/${id}`);
  },
  fetchPrimaryDatasetObjects(id) {
    return get(`/dataset/objects/primary/${id}`);
  },
  fetchSubsequentDatasetObjects(cacheId) {
    return get(`/dataset/objects/subsequent/${cacheId}`);
  },
  evictDatasetFromCache(cacheId) {
    return get(`/dataset/objects/evict/${cacheId}`)
  },
  uploadDataset(file, name, tags, permissions, type) {
    let newDataset = new FormData();
    newDataset.append("file", file);
    newDataset.append("name", name);
    newDataset.append("tags", tags);
    newDataset.append("permissions", permissions);
    newDataset.append("type", type);
    return post("/upload/", newDataset, true);
  },
  filterDatasets(searchQuery) {
    if (searchQuery == undefined || searchQuery == "" || searchQuery == " ") {
      store.dispatch("fetchDatasets");
    } else {
      get(`/dataset/search/${searchQuery}`)
        .then(response => {
          if (response.data.type == "user") {
            store.commit("setUserDatasets", response.data.datasets)
          } else {
            store.commit("setDatasets", { datasets: response.data.datasets, append: false })
          }
        })
        .catch(() => notify("Error filtering datasets", colors.red));
    }
  },
  logout() {
    post("/auth/logout", { sessionId: getCookie("SID") })
      .then(() => {
        deleteCookie("SID");
        store.commit("setLoggedInFalse");
        router.push("/");
        notify("User logged out", colors.green);
      })
      .catch(() => {
        notify("Unable to logout. Please try again later. ", colors.red);
      });
  },
  login(username, password, redirect) {
    post("/auth/login", { email: username, password: password })
    .then(() => {
      store.commit("setUser", username);
      store.commit("setLoggedInTrue");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/browse");
      }
      notify("Successfully logged in", colors.green);
    })
    .catch((error) => {
      notify(error.response.message.data);
    });
  },
  fetchUserDatasets() {
    get("/dataset/user/")
      .then(response => store.commit("setUserDatasets", response.data))
      .catch(() => {
        notify("Error fetching your datasets", colors.red);
      });
  },
  fetchPopularDatasets() {
    get("/dataset/popular/")
      .then(response => store.commit("setPopularDatasets", response.data))
      .catch(() => {
        notify("Error fetching datasets", colors.red);
      });
  },
  fetchRecentDatasets() {
    get("/dataset/recent/")
      .then(response => store.commit("setRecentDatasets", response.data))
      .catch(() => {
        notify("Error fetching recent datasets", colors.red);
      });
  },
  fetchNewDatasets() {
    return get("/dataset/new/")
      .then(response => store.commit("setNewDatasets", response.data))
      .catch(() => {
        notify("Error fetching new datasets", colors.red);
      });
  },
  deleteDataset(id) {
    return _delete(`/dataset/${id}`)
      .then(() => this.fetchUserDatasets())
      .catch(() => {
        notify("Error deleting dataset", colors.red);
      });
  },
  downloadDataset(id) {
    return get(`/dataset/download/${id}`)
  },
  verifyLogin() {
    return post("/auth/verifySession", { sessionId: getCookie("SID") })
      .then(() => {
        return {isValidSession: true, error: null};
      })
      .catch((error) => {
        return {isValidSession: false, error: error};
      })
  },
  fetchTags(datasetType) {
    return get(`/upload/getTags/${datasetType}`);
  }
};

export default api;
