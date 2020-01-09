import axios from "axios"

const apiUrl = "http://localhost:4000";

export default {
    fetchDatasets () {
        return axios
        .get(apiUrl+"/download/5e0a499571ff58b1a02b3237")
        .then(response => response.data)
    }
}