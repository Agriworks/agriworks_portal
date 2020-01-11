import axios from "axios"

const apiUrl = "http://localhost:4000";


export default {
    fetchDatasets () {
        return axios
        .get(apiUrl+"/download")
        .then(response => response.data)
    },
    fetchDataset () {
        return axios
        .get(apiUrl+"/download/5e15143d2712c8cab0956112")
        .then(response => response.data)
    }
}