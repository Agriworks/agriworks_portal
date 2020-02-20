import axios from "axios"
import { addCookie, deleteCookie } from "./js/authentication";
import router from "./router";
import { post, get } from "./requests";
import store from "./store"; //might be a circular import
import notify from "./utilities/notify";
import { colors } from "./utilities/branding";

const apiUrl = "http://localhost:4000";
const useCredentials = {withCredentials: true}; // Automatically embeds cookie with request. Use for all authenticated requests.

const api = {
    fetchDatasets () {
        return get("/dataset/")
        .then(response => store.commit("setDatasets", response.data))
        .catch(err => {
            notify("Error fetching datasets", colors.red);
        })
    },
    fetchDataset (id) {
        return get(`/dataset/${id}`)
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
            .catch(err =>  notify("Error filtering datasets", colors.red))
          }
    },
    logout(sessionId){
        post("/auth/logout", { sessionId: sessionId })
        .then(res => {
          deleteCookie("SID");
          store.commit("setLoggedInFalse");
          router.push("/");
          notify("User logged out", colors.green);
        })
        .catch(err => {
            notify("Unable to logout. Please try again later. ", colors.red);
        });
    }, 
    getSessionID(username, password){
        post("/auth/login", {email: username, password: password})
            .then(response => {
                addCookie(
                    response.data.key,
                    response.data.value,
                    response.data.expires
                );
                if (response.data.admin == true){
                    store.commit("setIsAdmin");
                }
                store.commit("setUser", this.email);
                store.commit("setLoggedInTrue");
                router.push("/browse");
                notify("Successfully logged in", colors.green);
            })
            .catch(error => {
                notify("Incorrect username or password. Please try again", colors.red);
            })
        }
}


export default api;