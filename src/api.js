import axios from "axios"
import {
    addCookie,
    deleteCookie
  } from "./js/authentication";
import router from "./router";

import store from "./store"
import { post, get } from "./requests";



const apiUrl = "http://localhost:4000";
const useCredentials = {withCredentials: true}; // Automatically embeds cookie with request. Use for all authenticated requests.

const api = {
    fetchDatasets () {
        return axios
        .get(apiUrl+"/download")
    },
    fetchDataset (id) {
        return axios
        .get(apiUrl+"/download/"+id)
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
    filterDataset(searchQuery) {
        if (searchQuery == undefined || searchQuery == "" || searchQuery == " ") {
            store.dispatch("fetchDatasets");
          } else {
            get(`/dataset/search/${searchQuery}`)
              .then(response => {
                store.commit("setDatasets", response.data);
                store.commit("setErrorMessage", "");
              })
              .catch(
                store.commit(
                  "setErrorMessage",
                  "Unable to find datasets with given parameter(s)."
                )
              );
          }
    },
    logout(SID){
        post("/auth/logout", { sessionId: SID })
        .then(res => {
          deleteCookie("SID");
          store.commit("setLoggedInFalse");
          router.push("/");
          // window.location.reload();
        })
        .catch(err => {
          store.commit("setErrorMessage", "Unable to logout");
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