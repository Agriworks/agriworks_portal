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
                <input type="email" id="inputEmail" class="form-control" v-model="email" autofocus />
              </div>
              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  v-model="password"
                  autofocus
                />
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <button class="btn btn-lg btn-primary" type="submit">Login</button>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <router-link to="/registration" class="btn btn-link">Register</router-link>|
                <router-link to="/registration" class="btn btn-link">Forgot Password?</router-link>
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
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <a href="#!">
            <div class="mask rgba-white-slight"></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // email: "mdesilva@bu.edu",
      // password: "password",
      email: "",
      password: ""
    };
  },

  methods: {
    // should probably move this to store
    login() {
      this.$store
        .dispatch("retrieveSessionID", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          //no setUser in store
          this.$store.commit("setUser", this.email);
          this.$router.push("/dashboard");
        })
        .catch(error => {
          console.log(error);
          this.$store.commit(
            "setErrorMessage",
            "Incorrect Username or Password"
          );
          this.$store.commit("setShowError", true);
          this.$forceUpdate;
        });
    }
  }
};
</script>

<style scoped>
.rounded-card{
    border-radius:2% !important;
}
</style>