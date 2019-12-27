import datasets from "./data/datasets"

const fetch = (mockData) => {
    return new Promise((resolve) => {
        resolve(mockData);
    })
}

export default {
    fetchDatasets () {
        return fetch(datasets)
    }
}