<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h3 class="card-title text-center">Reset Password</h3>
            <h6 class="card-title text-center">
              Enter your user account's email address and we will send you a
              password reset link.
            </h6>
            <form class="form-signin" @submit.prevent="submit">
              <div class="form-label-group">
                <input
                  name="email"
                  type="text"
                  id="inputText"
                  class="form-control"
                  placeholder="Enter your email address"
                  required
                  autofocus
                />
              </div>
              <div class="custom-control custom-checkbox mb-3 text-center" style="padding:0">
                <v-btn
                  color="success"
                  :outlined="true"
                  type="submit"
                  style="margin:0"
                  :loading="loading"
                >Reset Password</v-btn>
              </div>
              <div class="text-center">
                <v-btn to="/login" color="success" :text="true">Return to login</v-btn>|
                <v-btn to="/registration" color="success" :text="true">Create new account</v-btn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../requests";
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      post("/auth/forgot-password", {
        email: document.getElementById("inputText").value
      })
        .then(res => {
          this.loading = false;
          this.$store.commit("setSnackbar", {
            message: res.data.message,
            show: true,
            color: "#4CAF50",
            timeout: 0
          });
        })
        .catch(err => {
          this.loading = false;
          this.$store.commit("setSnackbar", {
            message: err.response.data.message,
            show: true,
            color: "#F44336"
          });
        });
    }
  }
};
</script>
<style scoped>
.form-label-group {
  margin: 35px 10px;
}
h3 {
  margin: 20px 15px;
}
button {
  margin: 15px 15px;
}
</style>
