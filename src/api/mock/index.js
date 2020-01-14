import datasets from "./data/datasets"
import dataset from "./data/dataset"

const fetch = (mockData) => {
    return new Promise((resolve) => {
        resolve(mockData);
    })
}

export default {
    fetchDatasets () {
        return fetch(datasets)
    },
    fetchDataset () {
        return fetch(dataset)
    }
}