import { getCookie, deleteCookie } from "./js/authentication";
import router from "./router";
import { post, get, _delete } from "./requests";
import store from "./store"; //might be a circular import
import notify from "./utilities/notify";
import { colors } from "./utilities/branding";

const api = {
  fetchDatasets(pageNumber = 0) {
    return get(`/dataset/list/${pageNumber}`)
      .then(response => {
        if (pageNumber == 0) { store.commit("setDatasets", { datasets: response.data, append: false }) }
        else {
          store.commit("setDatasets", { datasets: response.data, append: true })
        }
      })
      .catch(() => {
        notify("Error fetching datasets", colors.red);
      });
  },
  fetchDatasetInfo(id) {
    return get(`/dataset/metadata/${id}`);
  },
  fetchPrimaryDatasetObjects(id) {
    return get(`/dataset/objects/primary/${id}`);
  },
  fetchSubsequentDatasetObjects(cacheId) {
    return get(`/dataset/objects/subsequent/${cacheId}`);
  },
  evictDatasetFromCache(cacheId) {
    return get(`/dataset/objects/evict/${cacheId}`)
  },
  uploadDataset(file, name, tags, permissions, type) {
    let newDataset = new FormData();
    newDataset.append("file", file);
    newDataset.append("name", name);
    newDataset.append("tags", tags);
    newDataset.append("permissions", permissions);
    newDataset.append("type", type);
    return post("/upload/", newDataset, true);
  },
  filterDatasets(searchQuery) {
    if (searchQuery == undefined || searchQuery == "" || searchQuery == " ") {
      store.dispatch("fetchDatasets");
    } else {
      get(`/dataset/search/${searchQuery}`)
        .then(response => {
          if (response.data.type == "user") {
            store.commit("setUserDatasets", response.data.datasets)
          } else {
            store.commit("setDatasets", { datasets: response.data.datasets, append: false })
          }
        })
        .catch(() => notify("Error filtering datasets", colors.red));
    }
  },
  logout() {
    post("/auth/logout", { sessionId: getCookie("SID") })
      .then(() => {
        deleteCookie("SID");
        store.commit("setLoggedInFalse");
        router.push("/");
        notify("User logged out", colors.green);
      })
      .catch(() => {
        notify("Unable to logout. Please try again later. ", colors.red);
      });
  },
  login(username, password, redirect) {
    post("/auth/login", { email: username, password: password })
    .then(() => {
      store.commit("setUser", username);
      store.commit("setLoggedInTrue");
      store.commit("setIsSubmitting", false); 
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/browse");
      }
      notify("Successfully logged in", colors.green);
    })
    .catch((error) => {
      store.commit("setIsSubmitting", false); 
      notify(error.response.data.message);
      if (error.response.data.message == "You must confirm your account to log in.") {
        router.push(`/resend-confirmation-email/${username}`)
      }
    });
  },
  fetchUserDatasets() {
    get("/dataset/user/")
      .then(response => store.commit("setUserDatasets", response.data))
      .catch(() => {
        notify("Error fetching your datasets", colors.red);
      });
  },
  fetchPopularDatasets() {
    get("/dataset/popular/")
      .then(response => store.commit("setPopularDatasets", response.data))
      .catch(() => {
        notify("Error fetching datasets", colors.red);
      });
  },
  fetchRecentDatasets() {
    get("/dataset/recent/")
      .then(response => store.commit("setRecentDatasets", response.data))
      .catch(() => {
        notify("Error fetching recent datasets", colors.red);
      });
  },
  fetchNewDatasets() {
    return get("/dataset/new/")
      .then(response => store.commit("setNewDatasets", response.data))
      .catch(() => {
        notify("Error fetching new datasets", colors.red);
      });
  },
  deleteDataset(id) {
    return _delete(`/dataset/${id}`)
      .then(() => this.fetchUserDatasets())
      .catch(() => {
        notify("Error deleting dataset", colors.red);
      });
  },
  downloadDataset(id) {
    return get(`/dataset/download/${id}`)
  },
  verifyLogin() {
    return post("/auth/verifySession", { sessionId: getCookie("SID") })
      .then(() => {
        return {isValidSession: true, error: null};
      })
      .catch((error) => {
        return {isValidSession: false, error: error.response.data.message};
      })
  },
  fetchTags(datasetType) {
    return get(`/upload/getTags/${datasetType}`);
  },
  updatePassword(data) {
    const SID = getCookie("SID");
    post('/admin/account', {
      sessionID: SID, 
      submit: "password",
      inputCurrentPassword: data.forms.password.fields.currentPassword.input,
      inputPassword: data.forms.password.fields.newPassword.input,
      inputConfirmPassword: data.forms.password.fields.confirmNewPassword.input
    })
    .then(() => {
        data.forms.password.show = false //close dialog

        //Send snackbar
        data.$store.commit("setSnackbar", {
          message: "Password Updated",
          show: true,
          color: "#4CAF50"
        });


      })
      .catch(err => {
        
        if(err.response.data["message"] == "Wrong password"){
          data.forms.password.fields.currentPassword.state = true
          data.forms.password.fields.currentPassword.error.push("Incorrect Password")
        } else{
          console.log("ERROR")
        }

      });
  },
  updateEmail(data) {
    const SID = getCookie("SID");
    post('/admin/account', {
    sessionID: SID, 
    submit: "email",
    inputCurrentPassword: data.forms.email.fields.password.input,
    inputEmail: data.forms.email.fields.email.input
  })
  .then(() => {  
      data.forms.email.show = false //close dialog

      //send snackbar saying that the email was updated
      data.$store.commit("setSnackbar", {
        message: "Email Updated",
        show: true,
        color: "#4CAF50"
      });

    })
    .catch(err => {
      if(err.response.data["message"] == "Wrong password"){
        data.forms.email.fields.password.state = true
        data.forms.email.fields.password.error.push("Incorrect Password")
      } else if(err.response.data["message"] == "Email is already in use"){
        data.forms.email.fields.email.state = true
        data.forms.email.fields.email.error.push("There is already exists an account with this email")
      }

    });
  },
  requestPasswordResetCode(data) {
    data.loading = true;
      post("/auth/forgot-password", {
        email: document.getElementById("inputText").value
      })
        .then(res => {
          data.loading = false;
          data.emailSent = true;
          data.emailMessage = res.data.message;
        })
        .catch(err => {
          data.loading = false;
          data.$store.commit("setSnackbar", {
            message: err.response.data.message,
            show: true,
            color: "#F44336"
          });
        });
  },
  signup(data){
    post("/auth/signup", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      organization: data.inputOrganization,
      location: data.inputLocation,
      userType: data.selectedType.type
    })
      .then(res => {
        data.$store.commit("setIsSubmitting", false); 
        data.$router.push("resend-confirmation-email/"+data.email);
        data.$store.commit("setSnackbar", {
          message: res.data.message,
          show: true,
          color: "#4CAF50"
        });
      })
      .catch(err => {
        data.$store.commit("setIsSubmitting", false); 
        data.$store.commit("setSnackbar", {
          message: err.response.data.message,
          show: true,
          color: "#F44336"
        });
      });
  },
  resendConfirmationEmail(email) {
    post(`/auth/resend-confirmation-email/${email}`, {})
    .then(() => {
      notify("New confirmation email sent.", colors.green)
    })
    .catch((error) => {
      notify(error.response.data.message, colors.red);
    });
  },
  resetPassword(data) {
    post(`/auth/reset-password/${data.$route.params.id}`, {
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("password2").value
    })
    .then(res => {
      data.showLinkError = false;
      data.$store.commit("setSnackbar", {
        message: res.data.message,
        show: true,
        color: "#4CAF50"
      });
      data.$router.push("/login");
    })
    .catch(err => {
      if (
        err.response.data.message ===
        "Your password reset link is either invalid or expired. Please request a new one."
      ) {
        data.showLinkError = true;
      }
      data.$store.commit("setSnackbar", {
        message: err.response.data.message,
        show: true,
        color: "#F44336"
      });
    });
  },
  confirmUserEmail(confirmationId) {
    return post(`/auth/confirm-user/${confirmationId}`, {})
  },
  deleteAccount() {
    post("/auth/delete-account", {sessionId: getCookie("SID")})
    .then(() => {
      deleteCookie("SID");
      store.commit("setLoggedInFalse");
      router.push("/");
      notify("Account deleted", colors.green);
    })
    .catch((error) => {
      notify(error.response.data.message, colors.red);
    });
  }
};

export default api;
