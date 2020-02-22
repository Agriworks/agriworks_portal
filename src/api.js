import axios from "axios"

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
    downloadDataset (id) {
        return axios({
            method: 'get',
            url: apiUrl + "/dataset/download/" + id,
            responseType: 'blob'
        })
    }

}

export default api;