<template>
  <div>
    <section>
      <v-parallax src="../assets/landing_banner.jpeg" height="780">
        <div id="nav">
          <v-toolbar flat color="transparent" fixed="top">
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!-- changed flat flag to text because vuetify says so -->
              <v-btn text tile color="#ffffff" @click="signUp">Sign Up</v-btn>
              <v-btn text tile color="#ffffff" @click="mockSignIn()">Sign In</v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </div>
        <v-layout column align-center justify-center class="white--text">
          <img class="mr-3" :src="require('../assets/logo_transparent_2.png')" height="200" />
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="headline">Transform the Agricultural Landscape with Data</h2>
            <span
              class="subheading"
            >Agriworks enables researchers, policymakers, and common citizens to explore and act on agricultural data in an effort to better their local communities.</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large color="#96D34A">mdi-magnify</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Researchers</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large color="#96D34A">mdi-scale-balance</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Policy Makers</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large color="#96D34A">mdi-account-group</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Citizens</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
export default {
  name: "Landing",
  data() {
    return {
      signedIn: true
    };
  },
  methods: {
    
    mockSignIn(signedIn) {
      this.$emit("signedIn", signedIn);
    },
    signUp() {
      this.mockSignIn(this.signedIn);
      this.$router.push("registration");
    }
  }
};
</script>

<style>

#nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: transparent;
  position: fixed;
  top: 0;
}

</style>