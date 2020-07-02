<template>
<div class="row mb-0">
    <LeftView />
    <div class="col-lg-6 col-sm-12 right" id="infoContainer">
      <v-container class="pl-8">
        <div v-row>
          <div class="col-lg-6 col-sm-12">
            <div v-row align="start" justify="start">
               <p class="text">Enter your user account's email address and we will send you a
                password reset link.</p>
            </div>
            <div v-row align="center" justify="start">
              <v-form v-model="valid"  @submit.prevent="submit">
                <div class="form-label-group">
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
                />
                </div>
              </v-form>
            </div>
            <div v-row align="center" justify="start">
              <div v-row align="start" justify="start">
                <v-btn color="#96D34A" :outlined="true" @click="submit" :disabled="!valid" id="submitButton">Send reset link</v-btn>
              </div>
            </div>
            <div v-row align="start" justify="start">
              <p class="text route button padding"  @click="login()">Go to login</p>
            </div>
            <div v-row align="start" justify="start">
              <p class="text route button padding btm" @click="registration()">Go to registration</p>
            </div>
          </div>
        </div>
      </v-container>
      <Footer />
    </div>
</div>
  <!-- <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <div v-if="emailSent">
              <h6 class="card-title text-center">{{emailMessage}}</h6>
              <h6 class="card-title text-center">
                <router-link to="/forgot-password">
                  <a href @click="resetForm">Didn't receive the email?</a>
                </router-link>
              </h6>
            </div>
            <div v-else>
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
  </div> -->
</template>

<script>
import api from "../api.js";
import LeftView from "./LeftView"
import Footer from "./Footer"
  
export default {
  components: {
    LeftView,
    Footer
  },
  data() {
    return {
      valid: true,
      loading: false,
      emailSent: false,
      emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      emailMessage: ""
    };
  },
  methods: {
    submit() {
      api.requestPasswordResetCode(this);
    },
    resetForm() {
      this.emailSent = false;
    },
    login() {
      this.$router.push("/login");
    },
    registration()  {
      this.$router.push("/registration");
    },
  }
};
</script>
<style scoped>
#infoContainer {
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text {
  font-size: 15px;
}
.text.route {
  color:#96D34A;
}

p.button:hover { cursor: pointer; }
p.padding  { padding:0; margin-top:10px;}
p.padding.btm {margin-top:-10px;}

</style>
