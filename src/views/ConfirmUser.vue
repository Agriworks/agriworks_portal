<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 card" style="text-align:center;">
            <div class="card-body">
              <h4> {{ confirmationStatus }} </h4>
              <div v-if="!this.receivedReply">
                  <LoadingIndicator/>
              </div>
              <div v-if="this.errorReply">
                <p> {{ this.errorReply }} </p>
                <Button title="Request New Code"/>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { post } from "../requests";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";

export default {
  data() {
    return {
      confirmationStatus: "Validating confirmation code...",
      receivedReply: false,
      errorReply: "",
    }
  },
  components: {
    LoadingIndicator: LoadingIndicator,
    Button: Button
  },
  created(){
    post(`/auth/confirm-user/${this.$route.params.id}`, {
    })
      .then(res => {
        this.receivedReply = true;
        this.$router.push("/login");
        this.$store.commit("setSnackbar", {
          message: res.data.message,
          show: true,
          color: "#4CAF50"
        });
      })
      .catch(err => {
        this.confirmationStatus = "Invalid confirmation code";
        this.receivedReply = true;
        this.errorReply = err.response.data.message
      });
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