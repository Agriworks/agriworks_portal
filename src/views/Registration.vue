<template>
  <b-container>
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-10 mx-auto" id="singupFormContainer">
        <v-card class="rounded-card" :elevation="5">
          <div class="card-body">
            <h3 class="card-title text-center">Sign Up</h3>
              <v-form @submit.prevent="signup" class="form-signin">
                <v-row>
                  <v-col cols="12" sm="6">
                    <label for="firstName">First Name</label>
                    <v-text-field
                      v-model="firstName"
                      name="firstName"
                      type="text"
                      placeholder
                      required
                      autofocus
                    />
                    <label for="lastName">Last Name</label>
                    <v-text-field
                      v-model="lastName"
                      name="lastName"
                      type="text"
                      placeholder
                      required
                      autofocus
                    />
                    <label for="inputEmail">Email</label>
                    <v-text-field
                      v-model="email"
                      name="email"
                      type="email"
                      placeholder
                      required
                      autofocus
                    />
                    <p></p>
                    <label for="inputPassword">Password</label>
                    <v-text-field
                      v-validate="'required|'"
                      v-model="password"
                      name="password"
                      type="password"
                      placeholder
                      required
                    />
                    <label for="confirmPassword">Confirm Password</label>
                    <v-text-field
                      v-validate="'required|confirmed:password'"
                      v-model="confirmPassword"
                      name="password_confirmation"
                      type="password"
                      placeholder
                      required
                    />
                    <div class="form-label-group custom-control custom-checkbox mb-3">
                      <input type="checkbox" class="custom-control-input" id="customCheck1" />
                      <label class="custom-control-label" for="customCheck1">Remember password</label>
                    </div>
                  </v-col>
                  <v-col cols="6" sm="6">
                    <label for="organization">Organization</label>
                    <v-text-field
                      v-model="inputOrganization"
                      name="organization"
                      type="text"
                      placeholder
                      required
                      autofocus
                    />
                    <label for="userType">What kind of user are you?</label>
                    <v-select
                      v-model="selectedType"
                      :items = "items"
                      label="Select"
                      item-text="type"
                      return-object
                      placeholder
                      required
                      outlined
                    ></v-select>
                  </v-col>
                  <div align="center">
                    <v-btn color="success" :outlined="true" @click="signup" id="submitButton">Sign Up</v-btn>
                  </div>
                </v-row>
              </v-form>
              <div align="center">
                <div class="custom-control custom-checkbox mb-3">
                  <p>Already have an Account? Press <a href="/login">here</a> to login. </p>
                </div>
              </div>
          </div>
        </v-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import { post } from "../requests";

export default {
  data: () => ({
    items: [
      {type: 'Researcher'},
      {type: 'Policy Maker'},
      {type: 'Activist'},
      {type: 'Concerned Citizen'}
    ],
    selectedType: null
  }),
  methods: {
    // should probably move this to store
    signup() {
      post("/auth/signup", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        organization: this.inputOrganization,
        userType: this.selectedType.type
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
