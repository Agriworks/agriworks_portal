<template>
  <div>
    <div class="main">
      <div class="container">
        <div class="row">
          <h1 align="center">Account settings</h1>
        </div>
        <v-card class="shadow rounded">
          <div class="card-body">
          <div class="row">
            <div class="col-auto">
              <strong>Email Address: </strong>
            </div>
            <div class="col">
              <span> {{ email }} </span>
            </div>
            <div class="col text-right">
              <v-dialog
                v-model="emailDialog"
                width="500"
              >

                <template v-slot:activator="{ on }">
                  <v-btn
                    color="green"
                    dark
                    v-on="on"
                  >
                    Change
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline"
                    primary-title
                  >
                    Change Email
                  </v-card-title>

                  <v-card-text>
                    <v-form 
                    class="form-signin"
                    ref="changeEmailForm">
                      <div class="form-label-group">
                        <v-text-field
                          id="inputCurrentPassword"
                          label="Current Password"
                          ref="emailPassword"
                          required
                          autofocus
                          v-model="passwordEmail"
                          :rules="enterPasswordRules"
                          :append-icon="emailPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (emailPasswordVisibility = !emailPasswordVisibility)"
                          :type="emailPasswordVisibility ? 'text' : 'password'"
                          color = "green"
                          :error="emailEnterPasswordState"
                          :error-messages="emailEnterPasswordError"
                          >
                        </v-text-field>
                        <v-text-field
                          type="email"
                          id="inputEmail"
                          label="New Email"
                          ref="emailEmail"
                          required
                          v-model="newEmail"
                          :rules="emailRules"
                          color = "green"
                          :error="emailEnterEmailState"
                          :error-messages="emailEnterEmailError"
                        >
                        </v-text-field>
                      </div>
                    </v-form>
                  
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn color="green" text @click="emailDialog = false">Close</v-btn>
                      <v-btn color="green" text v-on:click="submitEmail">Save</v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>

 


            </div>
          </div>
          <div class="row">
            <div class="col-auto"> 
              <strong>Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
            </div>
            <div class="col">
            </div>
            <div class="col text-right">
              
               <v-dialog
                v-model="passwordDialog"
                width="500"
              >

                <template v-slot:activator="{ on }">
                  <v-btn
                    color="green"
                    dark
                    v-on="on"
                  >
                    Change
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline"
                    primary-title
                  >
                    Change Password
                  </v-card-title>

            <!--     <v-divider></v-divider> -->

                  <v-card-text>
                    
                    <v-form class="form-signin"
                      ref="changePasswordForm"
                    >
                      <div class="form-label-group">
                        
                        <v-text-field
                          id="inputCurrentPassword"
                          label="Current Password"
                          required
                          autofocus
                          v-model="passwordPassword"
                          :rules="enterPasswordRules"
                          :append-icon="passwordPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordPasswordVisibility = !passwordPasswordVisibility)"
                          :type="passwordPasswordVisibility ? 'text' : 'password'"
                          color = "green"
                          :error="passwordEnterPasswordState"
                          :error-messages="passwordEnterPasswordError"
                        ></v-text-field>
                        <v-text-field
                          id="inputPassword"
                          label="New Password"
                          required
                          v-model="newPassword"
                          :rules="enterNewPasswordRules"
                          :append-icon="passwordNewPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordNewPasswordVisibility = !passwordNewPasswordVisibility)"
                          :type="passwordNewPasswordVisibility ? 'text' : 'password'"
                          color = "green"
                          :error="passwordEnterNewPasswordState"
                          :error-messages="passowrdEnterNewPasswordError"
                        ></v-text-field>
                        <v-text-field
                          id="inputConfirmPassword"
                          label="Confirm New Password"
                          required
                          v-model="confirmNewPassword"
                          :rules="enterPasswordRules"
                          :append-icon="passwordConfirmPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordConfirmPasswordVisibility = !passwordConfirmPasswordVisibility)"
                          :type="passwordConfirmPasswordVisibility ? 'text' : 'password'"
                          color = "green"
                          :error="passwordConfirmNewPasswordState"
                          :error-messages="passwordConfirmNewPasswordError"
                        ></v-text-field>
                      </div>
                    </v-form>      

                  </v-card-text>

                  <!-- <v-divider></v-divider> -->

                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn color="green" text @click="passwordDialog = false">Close</v-btn>
                      <v-btn color="green" text v-on:click="submitPassword">Save</v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>

            </div>
          </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>


<script>

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { post } from "../requests";
import {
  getCookie
} from "../js/authentication";


export default {

  computed: {
      email() {
        return this.$store.state.user
      }
  }, 

  data () {
    return {
      emailDialog: false,
      passwordDialog: false,
      passwordEmail: "", //The password when changing email
      newEmail: "", //The new email when changing email
      passwordPassword: "",//the current password when changing password
      newPassword: "", //The new password when changing password
      confirmNewPassword: "", //Confirming new pasword

      emailPasswordVisibility: false,
      passwordPasswordVisibility: false,
      passwordNewPasswordVisibility: false,
      passwordConfirmPasswordVisibility: false,

      errorMessage: "", // if they put the wrong password e

      emailEnterPasswordState: false,
      emailEnterEmailState: false,

      passwordEnterPasswordState: false,
      passwordEnterNewPasswordState: false,
      passwordConfirmNewPasswordState: false,

      emailEnterPasswordError: [],
      emailEnterEmailError: [],

      passwordEnterPasswordError: [],
      passowrdEnterNewPasswordError: [],
      passwordConfirmNewPasswordError: [],

      

      //Rules that the inputs must conform to
      emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid', //must have @ sign
    ],
    //Rules for entering current password, used in both dialogs
    enterPasswordRules: [
      v => !!v || 'Password is required'
    ],
    //Rules for entering new password. Currently nothing but could make it a min length or a max length or have an uppercase letter ect.
    enterNewPasswordRules: [
      v => !!v || 'Password is required'
    ]
    }
  },
  
  methods: {
    submitEmail() {

      if(!(this.$refs["emailPassword"].hasError || this.$refs["emailEmail"].hasError)) //if the inputs do not conform to the rules, don't even submit it
      {
        const SID = getCookie("SID");
          post('/admin/account', {
          sessionID: SID, 
          submit: "email",
          inputCurrentPassword: this.passwordEmail,
          inputEmail: this.newEmail
        })
        .then(res => {  
            this.emailDialog = false //close dialog

            //send snackbar saying that the email was updated
            this.$store.commit("setSnackbar", {
            message: "Email Updated",
            show: true,
            color: "#4CAF50"
          });

            console.log("Good")
          })
          .catch(err => {
            console.log(err.response)
            console.log(err.response.data["message"])

            if(err.response.data["message"] == "Wrong Password"){
              this.emailEnterPasswordState = true
              this.emailEnterPasswordError.push("Incorrect Password")
            } else if(err.response.data["message"] == "Email is already in use"){
              this.emailEnterEmailState = true
              this.emailEnterEmailError.push("There is already exists an account with this email")
            }

          });
      }
      
    },
    submitPassword(){

      

      if(this.newPassword != this.confirmNewPassword){
        console.log("This runs")
        this.passwordConfirmNewPasswordState = true
        this.passwordConfirmNewPasswordError.push("Confirm password does not match the new password")
      }
      else {
        const SID = getCookie("SID");
        post('/admin/account', {
        sessionID: SID, 
        submit: "password",
        inputCurrentPassword: this.passwordPassword,
        inputPassword: this.newPassword,
        inputConfirmPassword: this.confirmNewPassword
      })
      .then(res => {
          console.log("Good")
        })
        .catch(err => {
          console.log("Bad")
        });
      }
    },
  },
  
}
</script>


<style scoped>

.emailDiv button {
    float: right; 
} 


</style>