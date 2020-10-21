<template>
<v-row>
  <LeftView />
  <v-col lg="6" sm="12">
    <v-container fluid fill-height>
      <v-row align="center" justify="start">
        <v-col lg="6" sm="12">
          <v-row align="start" justify="start" v-if="showLinkError" no-gutters>
            <v-col>
               <p class="text">Invalid link</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="showLinkError" no-gutters>
            <v-col>
               <p class="text route">Your password reset link is invalid or is expired. Please head to the password reset page to request another link.</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="showLinkError" no-gutters>
            <v-col>
               <v-btn color="#96D34A" :outlined="true" @click="redirect" :loading="loading">Request new link</v-btn>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="!showLinkError" no-gutters>
            <v-col>
               <p class="text">Change Password</p>
            </v-col>
          </v-row>
          <v-form v-model="valid" @submit.prevent="signup" class="form-signin">
            <v-row align="start" justify="start" v-if="!showLinkError" no-gutters>
              <v-col>
                <v-text-field
                    ref="password"
                    v-model="password"
                    name="password"
                    label="New password"
                    :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passwordVisible ? 'text' : 'password'"
                    @click:append="passwordVisible = !passwordVisible"
                    :rules="passwordRules"
                    placeholder
                    required
                    color="#96D34A"
                    outlined
                    dense
                />
              </v-col>
            </v-row>
            <v-row align="start" justify="start" v-if="!showLinkError" no-gutters>
              <v-col>
                <v-text-field
                  v-model="confirmPassword"
                  name="password_confirmation"
                  label="Confirm new password"
                  :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordVisible ? 'text' : 'password'"
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  @click:append="passwordVisible = !passwordVisible"
                  placeholder
                  required
                  color="#96D34A"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
          </v-form>
          <v-row align="start" justify="start" v-if="!showLinkError" no-gutters>
              <v-col>
                <v-btn color="#96D34A" :outlined="true" @click="submit" :disabled="!valid">Reset Password</v-btn>
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
import api from "../api.js";
import LeftView from "./LeftView"
import Footer from "./Footer"
export default {
  components: {
    LeftView,
    Footer
  },
  data() {
    return {
      showLinkError: false,
      valid: true,
      password: "",
      confirmPassword: "",
      passwordVisible: false,
      passwordRules: [v => !!v || "Password is required"],
      confirmPasswordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    submit() {
      api.resetPassword(this);
    },
    redirect() {
      this.$router.push("/forgot-password");
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    }
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