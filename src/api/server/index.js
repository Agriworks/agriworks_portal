import axios from "axios"

const apiUrl = "http://localhost:4000";
const useCredentials = {withCredentials: true}; // Automatically embeds cookie with request. Use for all authenticated requests.

export default {
    fetchDatasets () {
        return axios
        .get(apiUrl+"/dataset")
        .then(response => response.data)
    },
    fetchDataset (id) {
        return axios
        .get(apiUrl+"/dataset/"+id)
        .then(response => response.data)
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
        .then(() => {
            //#TODO: display success message to user
            console.log('Successfully uploaded new dataset!');
        })
        .catch(error => {
            //#TODO: display error message to user
            console.log(error);
            console.log(error.body);
            console.log('Failure uploading dataset');
        });
    }
}