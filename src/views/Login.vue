<template>
<v-row>
  <LeftView />
  <v-col lg="6" sm="12">
    <v-container fluid fill-height class="pl-10">
      <v-row align="center" justify="start">
        <v-col lg="6" sm="12">
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <v-text-field
                  label="Email"
                  v-model="email"
                  type="email"
                  outlined
                  autofocus
                  required
                  dense
                  color="#96D34A"
                />
            </v-col>
          </v-row>
          <v-row align="start" justify="start" no-gutters>
            <v-col>
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
                />
            </v-col>
          </v-row>
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <p class="text button padding" @click="forgot()">Forgot your username or password?</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <p class="text button padding" @click="registration()">Need an account?</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <v-btn color="#96D34A" :outlined="true" @click="login()" id="submitButton" :loading="loading">Sign In</v-btn>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <v-btn color="#96D34A" :outlined="true" @click="loginWithGoogle()" id="submitButton">Sign in with Google</v-btn>
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
    loginWithGoogle() {
        api.oauth()
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
#submitButton {
  margin-top: 1rem;
}
.text {
  font-size: 15px;
  color:#96D34A;
}

p.button:hover { cursor: pointer; }
p.padding  { padding:0; margin:0;}
p {
  display: inline-block;
}
</style>
