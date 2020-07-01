<template>
  <div class="row mb-0">
    <LeftView />
    <div class="col-lg-6 col-sm-12 right" id="infoContainer">
      <v-container class="pl-8">
        <div v-row>
          <div class="col-lg-6 col-sm-12">
            <div v-row align="center" justify="start">
              <v-text-field
                  label="Email"
                  v-model="email"
                  type="email"
                  outlined
                  autofocus
                  required
                  dense
                  color="#96D34A"
              ></v-text-field>
          </div>
          <div v-row align="center" justify="start">
            <v-text-field
                v-model="password"
                label="Password"
                :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwordVisible ? 'text' : 'password'"
                @click:append="passwordVisible = !passwordVisible"
                color="#96D34A"
                required
                outlined
                dense
            ></v-text-field>
          </div>
          <div v-row align="start" justify="start">
            <p class="forgotText button padding" @click="forgot()">Forgot your username or password?</p>
          </div>
          <div v-row align="start" justify="start">
            <p class="forgotText button padding" @click="registration()">Need an account?</p>
          </div>
          <div v-row align="start" justify="start">
            <v-btn color="#96D34A" :outlined="true" @click="login()" id="submitButton" :loading="loading">Sign In</v-btn>
          </div>
        </div>
      </div>
      </v-container>
      <!-- <h2> Transform your Agricultural Landscape with Data </h2>
      <ul id="bulletPoints">
        <li class="bulletPoint"> <v-icon medium color="#96D34A">mdi-hammer-screwdriver</v-icon> Create and share datasets </li>
        <li class="bulletPoint"> <v-icon medium color="#96D34A">mdi-graph</v-icon> Visualize your datasets </li>
        <li class="bulletPoint"> <v-icon medium color="#96D34A">mdi-send</v-icon> Formulate dataset templates for data collection </li>
      </ul> -->
      <Footer/>
    </div>
  </div>
</template>

<script>
import api from "../api";
import Footer from "./Footer"
import LeftView from "./LeftView"

export default {
  components: {
    Footer,
    LeftView
  },
  data() {
    return {
      email: "",
      password: "",
      passwordVisible: false,
      loading: false
    };
  },

  methods: {
    login() {
        this.loading = true
        api.login(this.email, this.password, this.$route.query.redirect);
        setTimeout(() => (this.loading = false), 1500);
    },
    forgot() {
      this.$router.push("/forgot-password");
    },
    registration() {
      this.$router.push("/registration");
    },
    handleEnterPress() {
      if (event.keyCode === 13) { 
        this.login()
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.handleEnterPress)
  },
  destroyed() {
    window.removeEventListener('keyup', this.handleEnterPress) 
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

#submitButton {
  margin-top: 1rem;
}

#alternateOptionsRow {
  margin-top: 1rem;
}

#infoContainer {
  min-height: 100vh;
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
.forgotText {
  font-size: 15px;
  color:#96D34A;
}

p.button:hover { cursor: pointer; }
p.padding  { padding:0; margin:0;}
</style>
