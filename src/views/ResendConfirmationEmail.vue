<template>
  <b-container>
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-7 mx-auto" id="resendEmailFormContainer">
        <v-card v-if=emailSent class="rounded-card" :elevation="5">
          <div class="card-body">
            <h3 class="card-title text-center">Confirmation Email Sent</h3>
            <div class="col-sm-9 col-md-7 col-lg-10 mx-auto" >
              <center> 
                To complete registration, click the link in the confimation email we have sent you.
              </center>
            </div>
            <v-flex align-center>
                  <div align="center">
                    <v-btn color="success" :outlined="true" @click="resendConfirmationEmail" :disabled="!valid" id="resendEmailButton">Resend Email</v-btn>
                  </div>
                </v-flex>
          </div>
        </v-card>
      </div>
    </div>
</b-container>
</template>

<script>
import api from "../api.js";
export default {
    data: () => ({
      email = this.$route.params.email
  }),
    methods: {
        resendConfirmationEmail() {
            //api.resendConfirmationEmail(this)
            print(this.$route.params.email)
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
.rounded-card {
  border-radius: 2% !important;
}

#logo {
  margin-top: 2rem;
}
</style>