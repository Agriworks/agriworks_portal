<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <v-card class="shadow rounded">
          <div class="card-body">
            <h3 class="card-title text-center">Sign Up</h3>
            <form @submit.prevent="signup" class="form-signin"
            oninput="password2.setCustomValidity(password2.value != password.value ? 'Passwords do not match.' : '')">
              <div class="form-label-group">
                <label for="firstName">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  id="firstName"
                  class="form-control"
                  placeholder
                  required
                  autofocus
                />
              </div>
              <div class="form-label-group">
                <label for="lastName">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  id="lastName"
                  class="form-control"
                  placeholder
                  required
                  autofocus
                />
              </div>
              <div class="form-label-group">
                <label for="inputEmail">Email</label>
                <input
                  name="email"
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder
                  required
                  autofocus
                />
              </div>
              <p></p>
              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input
                  v-validate="'required|'"
                  name="password"
                  type="password"
                  id="inputPassword"
                  ref="password"
                  class="form-control"
                  placeholder
                  required
                />
              </div>
              <div class="form-label-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  v-validate="'required|'"
                  name="password2"
                  type="password"
                  id="password2"
                  data-vv-as="password"
                  class="form-control"
                  placeholder
                  required
                />
              </div>
              <v-btn color="success" :outlined="true" type="submit">Sign Up</v-btn>
              <p>Already have an Account? Press <a href="/login">here</a> to login. </p>
            </form>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../requests";

export default {
  methods: {
    // should probably move this to store
    signup() {
      post("/auth/signup", {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value
      })
        .then(res => {
          this.$router.push("login");
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
.rounded-card {
  border-radius: 2% !important;
}
</style>
