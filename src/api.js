import axios from "axios"
import { addCookie, deleteCookie } from "./js/authentication";
import router from "./router";
import { post, get } from "./requests";
import store from "./store"; //might be a circular import

const apiUrl = "http://localhost:4000";
const useCredentials = {withCredentials: true}; // Automatically embeds cookie with request. Use for all authenticated requests.

const api = {
    fetchDatasets () {
        return get("/dataset/").then(response => store.commit("setDatasets", response.data));
    },
    fetchDataset (id) {
        return get(`/dataset/${id}`).then(response => store.commit("setDataset", response.data));
    },
    uploadDataset (file, name, tags, permissions, type) {
        let newDataset = new FormData();
        newDataset.append('file', file);
        newDataset.append('name', name);
        newDataset.append('tags', tags);
        newDataset.append('permissions', permissions);
        newDataset.append('type', type);
        return axios.post(
            apiUrl+"/upload/",
            newDataset,
            useCredentials,
        )
    }, 
    filterDatasets(searchQuery) {
        if (searchQuery == undefined || searchQuery == "" || searchQuery == " ") {
            store.dispatch("fetchDatasets");
        } else {
            get(`/dataset/search/${searchQuery}`)
            .then(response => store.commit("setDatasets", response.data))
            .catch(error => console.log(error))
          }
    },
    logout(sessionId){
        post("/auth/logout", { sessionId: sessionId })
        .then(res => {
          deleteCookie("SID");
          store.commit("setLoggedInFalse");
          router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }, 
    getSessionID(payload){
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
    }
}

export default api;