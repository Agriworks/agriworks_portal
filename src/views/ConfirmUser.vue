<template>
<v-row>
  <LeftView />
  <v-col lg="6" sm="12">
    <v-container fluid fill-height>
      <v-row align="center" justify="start">
        <v-col lg="6" sm="12">
          <v-row align="start" justify="start" no-gutters>
            <v-col>
               <p class="text">{{ confirmationStatus }}</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="!this.hideLoadingIndicator" no-gutters>
            <v-col>
               <LoadingIndicator />
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="this.errorReply" no-gutters>
            <v-col>
               <p class="text route">{{ this.errorReply }}</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="this.errorReply" no-gutters>
            <v-col>
               <v-btn color="#96D34A" :outlined="true" @click="resendConfirmationEmail()">Request New Code</v-btn>
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
import LeftView from "./LeftView"
import Footer from "./Footer"
import LoadingIndicator from "../components/LoadingIndicator"

export default {
  data() {
    return {
      confirmationStatus: "Validating confirmation code...",
      hideLoadingIndicator: false,
      errorReply: "",
    }
  },
  components: {
    LeftView,
    Footer,
    LoadingIndicator
  },
  created(){
    api.confirmUserEmail(this.$route.params.id)
    .then(res => {
      this.hideLoadingIndicator = true;
      this.$router.push("/login");
      this.$store.commit("setSnackbar", {
        message: res.data.message,
        show: true,
        color: "#4CAF50"
      });
    })
    .catch(err => {
      this.confirmationStatus = "Invalid confirmation code";
      this.hideLoadingIndicator = true;
      this.errorReply = err.response.data.message
    });
  }
};
</script>
<style scoped>
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