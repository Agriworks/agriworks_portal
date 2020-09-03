<template>
<v-row>
  <LeftView />
  <v-col lg="6" sm="12">
    <v-container fluid fill-height class="pl-10">
      <v-row align="center" justify="start">
        <v-col lg="6" sm="12">
          <v-form v-model="valid" @submit.prevent="signup" class="form-signin">
            <v-row align="start" justify="start" no-gutters>
              <v-col>
                <v-text-field
                      v-model="firstName"
                      name="firstName"
                      label="First Name"
                      type="text"
                      :rules="[required('First name')]"
                      placeholder
                      required
                      color="#96D34A"
                      outlined
                      dense
                      disabled
                />
              </v-col>
            </v-row>
            <v-row align="start" justify="start" no-gutters>
              <v-col>
                <v-text-field
                      v-model="lastName"
                      name="lastName"
                      label="Last Name"
                      type="text"
                      :rules="[required('Last name')]"
                      placeholder
                      required
                      color="#96D34A"
                      outlined
                      dense
                      disabled
                />
              </v-col>
            </v-row>
            <v-row align="start" justify="start" no-gutters>
              <v-col>
                <v-text-field
                      v-model="email"
                      name="email"
                      label="Email"
                      type="email"
                      :rules="emailRules"
                      placeholder
                      required
                      color="#96D34A"
                      outlined
                      dense
                      disabled
                />
              </v-col>
            </v-row>
            <v-row align="start" justify="start" no-gutters>
              <v-col>
                <v-select
                      v-model="selectedType"
                      :items = "items"
                      label="What kind of user are you?"
                      item-text="type"
                      placeholder
                      required
                      outlined
                      color="#96D34A"
                      dense
                      :rules="[required('User Type')]"
                />
              </v-col>
            </v-row>
            <v-row align="start" justify="start" no-gutters>
              <v-col>
                <v-text-field
                      v-model="inputOrganization"
                      name="organization"
                      label="Organization (optional)"
                      type="text"
                      placeholder
                      color="#96D34A"
                      outlined
                      dense
                />
              </v-col>
            </v-row>
            <v-row align="start" justify="start" no-gutters>
              <v-col>
                <v-text-field
                      v-model="inputLocation"
                      name="location"
                      label="Location (optional)"
                      type="text"
                      placeholder
                      color="#96D34A"
                      outlined
                      dense
               />
              </v-col>
            </v-row>
          </v-form>
          <v-row align="start" justify="start" no-gutters>
              <v-col>
                <v-btn color="#96D34A" :outlined="true" @click="signup" :disabled="!valid" id="submitButton">Sign Up</v-btn>
              </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </v-col>
</v-row>
</template>
<script>
import api from "../api.js";
import Footer from "./Footer"
import LeftView from "./LeftView"

export default {
  components: {
    Footer,
    LeftView
  },
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
      password: "",
      confirmPassword: "",
      emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
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
  mounted() {
      this.email = this.$store.state.registeringUser.email;
      this.firstName = this.$store.state.registeringUser.firstName;
      this.lastName = this.$store.state.registeringUser.lastName;
  },
  computed: {
  }
};
</script>

<style scoped>
#submitButton {
  margin-top: 1rem;
}

.text {
  font-size: 15px;
  color:#96D34A;
}

p.button:hover { cursor: pointer; }
p.padding  { padding:0; margin-top:20px;}
p {
  display: inline-block;
}
</style>
