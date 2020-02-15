import store from "../store"; 

const notify = (message, color) => {
    store.commit("setSnackbar", { message: message, show: true, color: color})
}

export default notify;