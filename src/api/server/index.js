import axios from "axios"

export default {
    fetchDatasets () {
        return axios.get('https://jsonplaceholder.typicode.com/posts').then(response => response.data)
    }
}