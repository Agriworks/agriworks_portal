<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-10 mx-auto">
        <v-card class="shadow rounded">
          <div class="card-body">
            <h3 class="card-title text-center">Sign Up</h3>
            <form @submit.prevent="signup" class="form-signin">
            <v-row >
            <v-col cols="12" sm="6">
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
                  v-validate="'required|confirmed:password'"
                  name="password_confirmation"
                  type="password"
                  id="confirmPassword"
                  data-vv-as="password"
                  class="form-control"
                  placeholder
                  required
                />
              </div>
              <div class="form-label-group custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
            </v-col>
            <v-col cols="6" sm="6">
              <div class="form-label-group">
                <label for="organization">Organization</label>
                <input
                  name="organization"
                  type="text"
                  id="organization"
                  class="form-control"
                  placeholder
                  required
                  autofocus
                />
              </div>
              <label for="userType">What kind of user are you?</label>
              <v-select
                :items = "items"
                label="Select"
                outlined
              ></v-select>
            </v-col>
            <div align="center">
              <div class="custom-control custom-checkbox mb-3">
                <v-btn color="success" :outlined="true" type="submit">Sign Up</v-btn>
                <p>Already have an Account? Press <a href="/login">here</a> to login. </p>
              </div>
              </div>
              </v-row>
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
  data: () => ({
    items: ['Researcher', 'Policy Maker', 'Activist', 'Concerned Citizen'],
  }),
  methods: {
    // should probably move this to store
    signup() {
      post("/auth/signup", {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value
        //, comfirmPassword: document.getElementByID("comfirmPassword").value (needs to be done in backend)
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
