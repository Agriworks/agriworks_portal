<template>
<v-row>
  <LeftView />
  <v-col lg="6" sm="12">
    <v-container fluid fill-height class="pl-10">
      <v-row align="center" justify="start">
        <v-col lg="6" sm="12">
          <v-row align="start" justify="start" v-if="!emailSent" no-gutters>
            <v-col>
               <p class="text">Enter your user account's email address and we will send you a
                password reset link.</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="!emailSent" no-gutters>
            <v-col>
               <v-form v-model="valid"  @submit.prevent="submit">
                <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                    placeholder
                    required
                    color="#96D34A"
                    outlined
                    dense
                />
              </v-form>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="!emailSent" no-gutters>
            <v-col>
               <v-btn color="#96D34A" :outlined="true" @click="submit()" :disabled="!valid">Send reset link</v-btn>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="!emailSent" no-gutters>
            <v-col>
               <p class="text route button padding"  @click="login()">Go to login</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="!emailSent" no-gutters>
            <v-col>
               <p class="text route button padding btm" @click="registration()">Go to registration</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="emailSent" no-gutters>
            <v-col>
              <p class="text">{{emailMessage}}</p>
            </v-col>
          </v-row>
          <v-row align="start" justify="start" v-if="emailSent" no-gutters>
            <v-col>
               <p class="text route button padding"  @click="resetForm()">Didn't receive the email?</p>
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
      valid: true,
      loading: false,
      emailSent: false,
      email: "",
      emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      emailMessage: ""
    };
  },
  methods: {
    submit() {
      api.requestPasswordResetCode(this);
    },
    resetForm() {
      this.emailSent = false;
      this.email=""
    },
    login() {
      this.$router.push("/login");
    },
    registration()  {
      this.$router.push("/registration");
    },
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
p.padding  { padding:0; margin-top:10px;}
p.padding.btm {margin-top:-10px;}

</style>
