<template>
  <div>
    
    <section>
        <v-parallax src="../assets/landing_banner.jpeg" height="650">
        <div class="text-right">
          <v-btn class="ma-2" rounded="">Sign Up</v-btn>
          <v-btn class="ma-2" color="#96D34A" rounded @click="mockSignIn()">Sign In</v-btn>
        </div>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <img class="mr-3" :src="require('../assets/logo_transparent_2.png')" height="200"/>
          </v-col>
        </v-row>
        </v-parallax>
    </section>
    <section>
      <v-layout
        column
        wrap
        class="my-12"
        align-center
      >
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="headline" style="color:#96D34A">Transform the Agricultural Landscape with Data</h2>
            <span class="subheading">
              Agriworks enables researchers, policymakers, and common citizens to explore and act on agricultural data in an effort to better their local communities.
            </span>
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
      signedIn : true,
    }
  },
  methods: {
    mockSignIn(signedIn) {
      this.$emit('signedIn', signedIn);
    }
  }
};
</script>

<style scoped>
</style>
