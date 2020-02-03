<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h3 class="card-title text-center">Change Password</h3>
            <h6 class="card-title text-center">Please enter a new password</h6>
            <form class="form-signin" @submit.prevent="submit">
              <div class="form-label-group">
                <input
                  name="password1"
                  type="text"
                  class="form-control"
                  placeholder="Enter your new password"
                  required
                  autofocus
                />
              </div>
              <div class="form-label-group">
                <input
                  name="password2"
                  type="text"
                  class="form-control"
                  placeholder="Confirm your new password"
                  required
                  autofocus
                />
              </div>
              <div class="custom-control custom-checkbox mb-3 text-center" style="padding:0">
                <button class="btn btn-md btn-primary" type="submit" style="margin:0">Reset Password</button>
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
      email: ""
    };
  },

  methods: {
    submit() {}
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