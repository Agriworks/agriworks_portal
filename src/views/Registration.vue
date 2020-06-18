<template>
  <b-container>
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-10 mx-auto" id="signupFormContainer">
        <v-card class="rounded-card" :elevation="5">
          <div class="card-body">
            <h3 class="card-title text-center">Sign Up</h3>
            <v-form v-model="valid" @submit.prevent="signup" class="form-signin">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    :rules="[required('First name')]"
                    placeholder
                    required
                    autofocus
                  />
                  <v-text-field
                    v-model="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    :rules="[required('Last name')]"
                    placeholder
                    required
                  />
                  <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                    placeholder
                    required
                  />
                  <v-select
                    v-model="selectedType"
                    :items = "items"
                    label="What kind of user are you?"
                    item-text="type"
                    placeholder
                    required
                    :rules="[required('User Type')]"
                  ></v-select>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-text-field
                    v-model="inputOrganization"
                    name="organization"
                    label="Organization (optional)"
                    type="text"
                    placeholder
                  />
                  <v-text-field
                    v-model="inputLocation"
                    name="location"
                    label="Location (optional)"
                    type="text"
                    placeholder
                  />
                  <v-text-field
                  ref="password"
                  v-model="password"
                  name="password"
                  label="Password"
                  :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordVisible ? 'text' : 'password'"
                  @click:append="passwordVisible = !passwordVisible"
                  :rules="passwordRules"
                  placeholder
                  required
                  />
                  <v-text-field
                  v-model="confirmPassword"
                  name="password_confirmation"
                  label="Confirm Password"
                  :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordVisible ? 'text' : 'password'"
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  @click:append="passwordVisible = !passwordVisible"
                  placeholder
                  required
                  />
                  
                </v-col>
                <v-flex align-center>
                  <div align="center">
                    <v-btn color="success" :outlined="true" @click="signup" :disabled="!valid" id="submitButton">Sign Up</v-btn>
                  </div>
                </v-flex>
              </v-row>
            </v-form>
            <div align="center">
              <div class="custom-control custom-checkbox mb-3">
                <p>Already have an Account? <router-link to="/login"> Login </router-link> </p>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import api from "../api.js";

export default {
  data: () => ({
      valid: true,
      firstName: "",
      lastName: "",
      items: [
      {type: 'Researcher'},
      {type: 'Policy Maker'},
      {type: 'Activist'},
      {type: 'Concerned Citizen'}
      ],
      required(propertyType) {
        return v => v && v.length > 0 || propertyType+' is required'
      },
      selectedType: "",
      inputOrganization: "", 
      inputLocation: "",  
      email: "",
      emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      confirmPassword: "",
      passwordVisible: false,
      passwordRules: [v => !!v || "Password is required"],
      confirmPasswordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    // should probably move this to store
    signup() {
      api.signup(this)
    }, 
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
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

#logo {
  margin-top: 2rem;
}
</style>
