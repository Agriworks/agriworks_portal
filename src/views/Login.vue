<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>
            <form class="form-signin" @submit.prevent="login"> 
              <div class="form-label-group">
                <label for="inputEmail">Username</label>
                <input type="email" id="inputEmail" class="form-control" v-model="email" autofocus />
              </div>
              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" class="form-control" v-model="password" autofocus />
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <button class="btn btn-lg btn-primary" type="submit" id="loginSubmit">Login</button>
                <router-link to="/register" class="btn btn-link">Register</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "mdesilva@bu.edu",
      password: "password"
    }
  },
  methods: {
    login() {
      this.$store.dispatch("retrieveSessionID", {
          email: this.email,
          password: this.password
        })
      .then(response => {
        this.$router.push("/dashboard")
      })
      .catch(error => {
        alert("Incorrect username or password");
      })
      }
    }
}
</script>