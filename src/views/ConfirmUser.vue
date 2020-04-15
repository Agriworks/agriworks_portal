<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h4 class="card-title text-center">Please confirm your account:</h4>
              <form
                class="form-signin"
                @submit.prevent="submit"
                oninput="password2.setCustomValidity(password2.value != password.value ? 'Passwords do not match.' : '')"
              >
                <div class="custom-control custom-checkbox mb-3 text-center" style="padding:0">
                  <v-btn
                    color="success"
                    :outlined="true"
                    type="submit"
                    style="margin:0; text-decoration:none"
                  >Confirm</v-btn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../requests";
export default {
  data() {
    return {
      showLinkError: false
    };
  },
  methods: {
    submit() {
      post(`/auth/confirm-user/${this.$route.params.id}`, {
      })
        .then(res => {
          this.$store.commit("setSnackbar", {
            message: res.data.message,
            show: true,
            color: "#4CAF50"
          });
          this.$router.push("/login");
        })
        .catch(err => {
          if (
            err.response.data.message ===
            "Your password reset link is either invalid or expired. Please request a new one."
          ) {
            this.showLinkError = true;
          }
          this.$store.commit("setSnackbar", {
            message: err.response.data.message,
            show: true,
            color: "#F44336"
          });
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