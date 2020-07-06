<template>
<v-row>
  <LeftView />
  <v-col lg="6" sm="12">
    <v-container fluid fill-height class="pl-10">
      <v-row align="center" justify="start">
        <v-col lg="6" sm="12">
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <p class="text">Confirmation Email Sent</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <p class="text route">To complete registration, click the link in the confimation email we have sent you.</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <v-btn color="#96D34A" :outlined="true" @click="resendConfirmationEmail()" id="submitButton" :loading="loading">Resend Email</v-btn>
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
import LeftView from "./LeftView"
import Footer from "./Footer"
import api from "../api.js";
export default {
  components: {
    LeftView,
    Footer
  },
  methods: {
    resendConfirmationEmail() {
      api.resendConfirmationEmail(this.$route.params.email)
    }
  }
};

</script>

<style scoped>
#submitButton {
  margin-top: 1rem;
}
.text {
  font-size: 15px;
}
.text.route {
  color:#96D34A;
}

p.button:hover { cursor: pointer; }
p.padding  { padding:0; margin-top:20px;}
p.padding.btm {margin-top: -20px;}

p {
  display: inline-block;
}
</style>