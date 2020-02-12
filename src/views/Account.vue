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
                    v-on:click="openEmailDialog"
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
                          type="password"
                          id="inputCurrentPassword"
                          label="Current Password"
                          required
                          autofocus
                          v-model="passwordEmail"
                          :rules="enterPasswordRules"
                          >
                        </v-text-field>
                        <v-text-field
                          type="email"
                          id="inputEmail"
                          label="New Email"
                          required
                          autofocus
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
                    v-on:click="openPasswordDialog"
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
                          type="password"
                          id="inputCurrentPassword"
                          placeholder="Current Password"
                          required
                          autofocus
                          v-model="passwordPassword"
                          :rules="enterPasswordRules"
                        ></v-text-field>
                        <v-text-field
                          type="password"
                          id="inputPassword"
                          placeholder="New Password"
                          required
                          autofocus
                          v-model="newPassword"
                          :rules="enterNewPasswordRules"
                        ></v-text-field>
                        <v-text-field
                          type="password"
                          id="inputConfirmPassword"
                          placeholder="Confirm New Password"
                          required
                          autofocus
                          v-model="confirmNewPassword"
                          :rules="enterPasswordRules"
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
    openEmailDialog() {
      this.emailDialog = true
      //only works when you have opened the form before, should be the opposite
      this.$refs.changeEmailForm.resetValidation() //without this line the there is a bug where it says that you need to input the email and turns red even though you have not clicked on the enter email box yet
    },
    openPasswordDialog() {  
      this.passwordDialog = true
      //only works if you have opened the form before, should be the opposite
      this.$refs.changePasswordForm.resetValidation() //same function as the openEmailDialog method and resetValidaiton line
    }
  },
  
}
</script>


<style scoped>

.emailDiv button {
    float: right; 
} 


</style>