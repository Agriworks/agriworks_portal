<template>
  <div>
    <div class="container" v-if="this.validSessionId">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h3 class="card-title text-center">Change Password</h3>
              <h6 class="card-title text-center">Please enter a new password</h6>
              <form
                class="form-signin"
                @submit.prevent="submit"
                oninput="password2.setCustomValidity(password2.value != password.value ? 'Passwords do not match.' : '')"
              >
                <div class="form-label-group">
                  <input
                    name="password"
                    id="password"
                    type="text"
                    class="form-control"
                    placeholder="Enter your new password"
                    required
                    autofocus
                  />
                </div>
                <div class="form-label-group">
                  <input
                    name="password2"
                    id="password2"
                    type="text"
                    class="form-control"
                    placeholder="Confirm your new password"
                    required
                    autofocus
                  />
                </div>
                <div class="custom-control custom-checkbox mb-3 text-center" style="padding:0">
                  <button
                    class="btn btn-md btn-primary"
                    type="submit"
                    style="margin:0"
                  >Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h3 class="card-title text-center">Invalid link</h3>
              <h6
                class="card-title text-center"
              >Your password reset link is invalid or is expired. Please head to the password reset page to request another link.</h6>
              <div class="custom-control custom-checkbox mb-3 text-center" style="padding:0">
                <button
                  class="btn btn-md btn-primary text-center"
                  v-on:click="redirect"
                  style="margin:0"
                >Reset Password</button>
              </div>
            </div>
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
      validSessionId: true
    };
  },
  methods: {
    redirect() {
      this.$router.push("/forgot-password");
    },
    submit() {
      post(`/auth/reset-password/${this.$route.params.id}`, {
        password: document.getElementById("password").value
      })
        .then(res => {
          this.$store.commit("setSnackbar", {
            message: res.data.message,
            show: true,
            color: "#4CAF50"
          });
        })
        .catch(err => {
          this.$store.commit("setSnackbar", {
            message: err.response.data.message,
            show: true,
            color: "#F44336"
          });
        });
    }
  },
  created() {
    post(`/auth/reset-password/${this.$route.params.id}`, {
      initial: "initialCheck"
    })
      .then(res => {
        this.validSessionId = true;
        this.$store.commit("setSnackbar", {
          message: res.data.message,
          show: false,
          color: "#4CAF50"
        });
      })
      .catch(err => {
        this.validSessionId = false;
        this.$store.commit("setSnackbar", {
          message: err.response.data.message,
          show: true,
          color: "#F44336"
        });
      });
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