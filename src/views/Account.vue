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
                    color="blue"
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
                          required
                          autofocus
                          v-model="passwordEmail"
                          :rules="enterPasswordRules"
                          :append-icon="emailPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (emailPasswordVisibility = !emailPasswordVisibility)"
                          :type="emailPasswordVisibility ? 'text' : 'password'"
                          >
                        </v-text-field>
                        <v-text-field
                          type="email"
                          id="inputEmail"
                          label="New Email"
                          required
                          v-model="newEmail"
                          :rules="emailRules"
                        >
                        </v-text-field>
                      </div>
                    </v-form>
                  
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="emailDialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" text v-on:click="submitEmail">Save</v-btn>
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
                    color="blue"
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
                          placeholder="Current Password"
                          required
                          autofocus
                          v-model="passwordPassword"
                          :rules="enterPasswordRules"
                          :append-icon="passwordPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordPasswordVisibility = !passwordPasswordVisibility)"
                          :type="passwordPasswordVisibility ? 'text' : 'password'"
                        ></v-text-field>
                        <v-text-field
                          id="inputPassword"
                          placeholder="New Password"
                          required
                          v-model="newPassword"
                          :rules="enterNewPasswordRules"
                          :append-icon="passwordNewPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordNewPasswordVisibility = !passwordNewPasswordVisibility)"
                          :type="passwordNewPasswordVisibility ? 'text' : 'password'"
                        ></v-text-field>
                        <v-text-field
                          id="inputConfirmPassword"
                          placeholder="Confirm New Password"
                          required
                          v-model="confirmNewPassword"
                          :rules="enterPasswordRules"
                          :append-icon="passwordConfirmPasswordVisibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (passwordConfirmPasswordVisibility = !passwordConfirmPasswordVisibility)"
                          :type="passwordConfirmPasswordVisibility ? 'text' : 'password'"
                        ></v-text-field>
                      </div>
                    </v-form>      

                  </v-card-text>

                  <!-- <v-divider></v-divider> -->

                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="passwordDialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" text v-on:click="submitPassword">Save</v-btn>
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
      
      this.emailDialog = false //closes dialog
    },
    submitPassword(){

      
      this.passwordDialog = false //closes dialog
    },
  },
  
}
</script>


<style scoped>

.emailDiv button {
    float: right; 
} 


</style>