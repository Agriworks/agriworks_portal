import { getCookie, deleteCookie } from "./js/authentication";
import router from "./router";
import { post, get, _delete } from "./requests";
import store from "./store"; //might be a circular import
import notify from "./utilities/notify";
import { colors } from "./utilities/branding";

const api = {
  fetchDatasets() {
    return get("/dataset/")
      .then(response => store.commit("setDatasets", response.data))
      .catch(() => {
        notify("Error fetching datasets", colors.red);
      });
  },
  fetchDataset(id) {
    return get(`/dataset/${id}`);
  },
  fetchDatasetSize(id){
    return get(`/dataset/${id}/size`);
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
        .then(response => store.commit("setDatasets", response.data))
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
  getSessionID(username, password) {
    post("/auth/login", { email: username, password: password })
      .then(() => {
        /*
        if (response.data.admin == true) {
          store.commit("setIsAdmin");
        }
        */
        store.commit("setUser", username);
        store.commit("setLoggedInTrue");
        router.push("/browse");
        notify("Successfully logged in", colors.green);
      })
      .catch(() => {
        notify("Incorrect username or password. Please try again", colors.red);
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
  downloadDataset (id) {
    return get(`/dataset/download/${id}`)
  },
  verifyLogin() {
    const sessionId = getCookie("SID");
    if (!sessionId) {
      store.commit("setLoggedInFalse");
      router.push("/");
      return false;
    }
    return post("/auth/verifySession", {sessionId: sessionId})
      .then(() => {
        store.commit("setLoggedInTrue");
        router.push("/browse");
        return true;
      })
      .catch((error) => {
        deleteCookie("SID");
        store.commit("setLoggedInFalse");
        router.push("/login");
        notify(error.response.data.message, colors.red);
        return false;
      })
  }
};

export default api;
