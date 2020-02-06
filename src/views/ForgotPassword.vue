<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h3 class="card-title text-center">Reset Password</h3>
            <h6
              class="card-title text-center"
            >Enter your user account's email address and we will send you a password reset link.</h6>
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
                <button class="btn btn-md btn-primary" type="submit" style="margin:0">Reset Password</button>
              </div>
              <div class="custom-control custom-checkbox mb-3 text-center">
                <router-link to="/login" class="btn btn-link">Return to login</router-link>|
                <router-link to="/register" class="btn btn-link">Create new account</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../requests";
export default {
  methods: {
    submit() {
      post("/auth/forgot-password", {
        email: document.getElementById("inputText").value
      })
        .then(res => {
        })
        .catch(err => {
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
</style>