<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-md-1"></div> -->
      <div class="col-md-6">
        <v-card class="rounded-card">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>
            <form class="form-signin" @submit.prevent="login">
              <div class="form-label-group">
                <label for="inputEmail">Username</label>
                <input
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  v-model="email"
                  autofocus
                  required
                />
              </div>
              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  v-model="password"
                  required
                  autofocus
                />
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <v-btn color="success" :outlined="true" type="submit">Login</v-btn>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <v-btn to="/registration" color="success" :text="true">Register</v-btn>|
                <v-btn to="/forgot-password" color="success" :text="true">Forgot Password?</v-btn>
              </div>
            </form>
          </div>
        </v-card>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-5">
        <div class="placeholder">
          <img
            class="card-img center"
            src="../assets/Welcome.png"
            alt="Card image cap"
            align="middle"
          />
          <p>
            Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Vestibulum id ligula porta felis euismod semper.
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh, ut fermentum massa justo sit amet risus.
          </p>
          <a href="#!">
            <div class="mask rgba-white-slight"></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    // should probably move this to store
    login() {
      api.getSessionID(this.email, this.password)
    }
  }
};
</script>

<style scoped>
.rounded-card {
  border-radius: 2% !important;
}
</style>
