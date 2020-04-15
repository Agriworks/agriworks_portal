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
                v-model="forms.email.show"
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
                          v-model="forms.email.fields.password.input"
                          :rules="forms.email.fields.password.rules"
                          :append-icon="forms.email.fields.password.visibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (forms.email.fields.password.visibility = !forms.email.fields.password.visibility)"
                          :type="forms.email.fields.password.visibility ? 'text' : 'password'"
                          color = "green"
                          :error="forms.email.fields.password.state"
                          :error-messages="forms.email.fields.password.error"
                          >
                        </v-text-field>
                        <v-text-field
                          type="email"
                          id="inputEmail"
                          label="New Email"
                          ref="emailEmail"
                          required
                          v-model="forms.email.fields.email.input"
                          :rules="forms.email.fields.email.rules"
                          color = "green"
                          :error="forms.email.fields.email.state"
                          :error-messages="forms.email.fields.email.error"
                        >
                        </v-text-field>
                      </div>
                    </v-form>
                  
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn color="green" text @click="forms.email.show = false">Close</v-btn>
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
                v-model="forms.password.show"
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
                          ref="passwordCurrent"
                          required
                          autofocus
                          v-model="forms.password.fields.currentPassword.input"
                          :rules="forms.password.fields.currentPassword.rules"
                          :append-icon="forms.password.fields.currentPassword.visibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (forms.password.fields.currentPassword.visibility = !forms.password.fields.currentPassword.visibility)"
                          :type="forms.password.fields.currentPassword.visibility ? 'text' : 'password'"
                          color = "green"
                          :error="forms.password.fields.currentPassword.state"
                          :error-messages="forms.password.fields.currentPassword.error"
                        ></v-text-field>
                        <v-text-field
                          id="inputPassword"
                          label="New Password"
                          ref="passwordNewPassword"
                          required
                          v-model="forms.password.fields.newPassword.input"
                          :rules="forms.password.fields.newPassword.rules"
                          :append-icon="forms.password.fields.newPassword.visibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (forms.password.fields.newPassword.visibility = !forms.password.fields.newPassword.visibility)"
                          :type="forms.password.fields.newPassword.visibility ? 'text' : 'password'"
                          color = "green"
                          :error="forms.password.fields.newPassword.state"
                          :error-messages="forms.password.fields.newPassword.error"
                        ></v-text-field>
                        <v-text-field
                          id="inputConfirmPassword"
                          label="Confirm New Password"
                          ref="passwordConfirmPassword"
                          required
                           v-model="forms.password.fields.confirmNewPassword.input"
                          :rules="forms.password.fields.confirmNewPassword.rules"
                          :append-icon="forms.password.fields.confirmNewPassword.visibility ? 'visibility' : 'visibility_off'"
                          @click:append="() => (forms.password.fields.confirmNewPassword.visibility = !forms.password.fields.confirmNewPassword.visibility)"
                          :type="forms.password.fields.confirmNewPassword.visibility ? 'text' : 'password'"
                          color = "green"
                          :error="forms.password.fields.confirmNewPassword.state"
                          :error-messages="forms.password.fields.confirmNewPassword.error"
                        ></v-text-field>
                      </div>
                    </v-form>      

                  </v-card-text>


                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn color="green" text @click="forms.password.show = false">Close</v-btn>
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
import {
  getCookie
} from "../js/authentication";
import api from "../api.js";


export default {


  computed: {
      email() {
        return this.$store.state.user
      }
  }, 


  data () {
    return {


      forms: {
        email: {

          show: false,

          fields: {
            password: {
              input: "",
              visibility: false,
              state: false, //if error or not 
              error: [],
              rules: [
                v => !!v || 'Password is required'
              ]
            },
            email: {
              input: "",
              state: false, //if error or not state: false,
              error: [],
              rules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid', //must have @ sign
              ]
            }
          }
        },
        password: {

          show: false,

          fields: {
            currentPassword: {
              input: "",
              visibility: false,
              state: false, //if error or not 
              error: [],
              rules: [
                v => !!v || 'Password is required'
              ]
            },
            newPassword: {
              input: "",
              visibility: false,
              state: false, //if error or not 
              error: [],
              rules: [
                v => !!v || 'Password is required'
              ]
            },
            confirmNewPassword: {
              input: "",
              visibility: false,
              state: false, //if error or not 
              error: [],
              rules: [
                v => !!v || 'Confirm Password is required'
              ]
            }

          }
        }
      },
    }
  },
  
  methods: {

    submitEmail() {

      var passPassword = false; //for some reason it takes two tries to submit the form if you got the password wrong last time, this bypasses that error

      //Maybe in the future as soon as they changed what was in box, the error goes away
      if(this.forms.email.fields.password.error.length == 1){ //if the only error is that the password was wrong last time, clear it
        const error = this.forms.email.fields.password.error.pop()
        if(error == "Incorrect Password") { //if the error was wrong password clear it
          passPassword = true 
          this.forms.email.fields.password.state = false;
        }else{
          this.forms.email.fields.password.error.push(error) //if it wasn't put it back
        }
      }

      //basically do the same thing but if they had a repeating email
      var passEmail = false; //for some reason it takes two tries to submit the form if you got the password wrong last time, this bypasses that error

      //Maybe in the future as soon as they changed what was in box, the error goes away
      if(this.forms.email.fields.email.error.length == 1){ //if the only error is that the password was wrong last time, clear it
        const error = this.forms.email.fields.email.error.pop()
        if(error == "There is already exists an account with this email") { //if the error was wrong password clear it
          passEmail = true 
          this.forms.email.fields.email.state = false;
          this.$refs["emailEmail"].resetValidation()
        }else{
          this.forms.email.fields.email.error.push(error) //if it wasn't put it back
        }
      }




      if(!((this.$refs["emailPassword"].hasError && !passPassword)|| (this.$refs["emailEmail"].hasError && !passEmail))) //if the inputs do not conform to the rules, don't even submit it
      {
        api.postPassword(this);
      }
      
    },
    submitPassword(){


      var passCurrent = false

      //Maybe in the future as soon as they changed what was in box, the error goes away
      if(this.forms.password.fields.currentPassword.error.length == 1){ //if the only error is that the password was wrong last time, clear it
        const error = this.forms.password.fields.currentPassword.error.pop()
        if(error == "Incorrect Password") { //if the error was wrong password clear it 
          this.forms.password.fields.currentPassword.state = false;
          passCurrent = true
        }else{
          this.forms.password.fields.currentPassword.error.push(error) //if it wasn't put it back
        }
      }


      var passConfirm = false

      //Maybe in the future as soon as they changed what was in box, the error goes away
      if(this.forms.password.fields.confirmNewPassword.error.length == 1){ //if the only error is that the password was wrong last time, clear it
        const error = this.forms.password.fields.confirmNewPassword.error.pop()
        if(error == "Confirm password does not match the new password") { //if the error was wrong password clear it 
          this.forms.password.fields.confirmNewPassword.state = false;
          passConfirm = true
        }else{
          this.forms.password.fields.confirmNewPassword.error.push(error) //if it wasn't put it back
        }
      }


      
      

      //make sure that there are no errors before continuing
      if(!((this.$refs["passwordCurrent"].hasError && !passCurrent) || this.$refs["passwordNewPassword"].hasError || (this.$refs["passwordConfirmPassword"].hasError && !passConfirm)))
      {
        if(this.forms.password.fields.newPassword.input != this.forms.password.fields.confirmNewPassword.input){
          this.forms.password.fields.confirmNewPassword.state = true
          this.forms.password.fields.confirmNewPassword.error.push("Confirm password does not match the new password")
        }
        else {
          api.postPassword(this);
        }
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