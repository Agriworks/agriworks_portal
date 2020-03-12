<template>
<b-container>
  <div class="row mt-12">
    <div class="col-md-6" id="loginFormContainer">
      <v-card class="rounded-card" :elevation="5">
          <div class="card-body">
            <img
            class="card-img center"
            src="../assets/logo_transparent_cropped.png"
            alt="Card image cap"
            align="middle"
            id="logo"
          />
            <v-form>
              <v-text-field
              v-model="email"
              label="Username"
              type="email"
              autofocus
              required
              />
              <v-text-field
              v-model="password"
              label="Password"
              :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordVisible ? 'text' : 'password'"
              @click:append="passwordVisible = !passwordVisible"
              required
              />
              <v-btn color="success" :outlined="true" @click="login" block id="submitButton">Login</v-btn>
            </v-form>
              <div class="custom-control custom-checkbox mb-3" id="alternateOptionsRow">
                <v-btn to="/registration" color="success" :text="true">Register</v-btn>|
                <v-btn to="/forgot-password" color="success" :text="true">Forgot Password?</v-btn>
              </div>
          </div>
        </v-card>

    </div>
    <div class="col-md-6" id="infoContainer">
      <h2> Transform the Agricultural Landscape with Data </h2>
      <ul id="bulletPoints">
        <li class="bulletPoint"> <v-icon medium color="#96D34A">mdi-hammer-screwdriver</v-icon> Create and share datasets </li>
        <li class="bulletPoint"> <v-icon medium color="#96D34A">mdi-graph</v-icon> Visualize your datasets </li>
        <li class="bulletPoint"> <v-icon medium color="#96D34A">mdi-send</v-icon> Formulate dataset templates for data collection </li>
      </ul>
      <div id="h4iStampContainer">
        <h5> Proudly built by  <a href="https://www.hack4impactbu.com/index.html" target="_blank"><img src="../assets/hack4impactlogo.png" width="35%"/></a></h5>
      </div>
    </div>
  </div>
</b-container> 
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordVisible: false
    };
  },

  methods: {
    login() {
      console.log("method");
      api.getSessionID(this.email, this.password)
    }
  }
};
</script>

<style scoped>
.rounded-card {
  border-radius: 2% !important;
}

#logo {
  width: 75%;
  margin-bottom:2rem;
}

#loginFormContainer {
  text-align: center;
}

#submitButton {
  margin-top: 1rem;
}

#alternateOptionsRow {
  margin-top: 1rem;
}

#infoContainer {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#bulletPoints {
  list-style: none;
  text-align: center;
  margin-top: 1rem;
}

.bulletPoint {
  padding: 10px;
}

#h4iStampContainer {
  margin-top: 2rem;
}
</style>
